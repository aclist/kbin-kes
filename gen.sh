#!/usr/bin/env bash

get_owner(){
    local raw=$(git config --get remote.origin.url)
    local raw=$(git config --get remote.origin.url)
    local owner=$(<<< "$raw" awk -F[:,/] '{print $2}')
    echo "$owner"
}

name=KES
author=aclist
license=MIT
version=$(cat VERSION)
desc="Kbin Enhancement Suite"
branch=$(git name-rev --name-only HEAD)
[[ -n $1 ]] && branch=$1
base_file="kes.user.js"
manifest="./helpers/manifest.json"
owner=$(get_owner)
slug="${owner}/kbin-kes"

instances=(
    "https://kbin.social/*"
    "https://lab2.kbin.pub/*"
    "https://lab3.kbin.pub/*"
    "https://fedia.io/*"
    "https://karab.in/*"
    "https://kbin.cafe/*"
)
grants=(
    "addStyle"
    "getResourceText"
    "xmlhttpRequest"
    "info"
    "getValue"
    "setValue"
    "getResourceText"
    "setClipboard"
)
gen_line(){
	printf "// @%s\t%s\n" "$1" "$2"
}
gen_meta(){
    cat <<-EOF
		// @name	$name
		// @namespace	https://github.com/$author
		// @license	$license
		// @version	$version
		// @description	$desc
		// @author	$author
	EOF
}
gen_instances(){
    for (( i = 0; i < ${#instances[@]}; i++ )); do
        gen_line "match" "${instances[$i]}"
    done
}
gen_grants(){
    for (( i = 0; i < ${#grants[@]}; i++ )); do
        local str="GM_${grants[$i]}"
        gen_line "grant" "$str"
    done
    for (( i = 0; i < ${#grants[@]}; i++ )); do
        local grant=${grants[$i]}
        [[ $grant == "xmlhttpRequest" ]] && grant="xmlHttpRequest"
        [[ $grant == "getResourceText" ]] && continue
        local str="GM.${grant}"
        gen_line "grant" "$str"
    done
}
gen_extra(){
cat<<-EOF
	// @icon	https://kbin.social/favicon.svg
	// @connect	raw.githubusercontent.com
	// @connect	github.com
EOF
}
gen_requires(){
    prefix="https://github.com/$slug/raw/$branch/"
    deps=(
        "safegm.user.js"
    )
    external=(
        "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"
        "http://code.jquery.com/jquery-3.4.1.min.js"
    )
    declare -A resources=([kes_layout]=ui.json [kes_css]=kes.css [kes_json]=manifest.json)

    readarray -t mods < <(ls -1 $PWD/mods)
    for (( i = 0; i < ${#deps[@]}; i++ )); do
        local str="${prefix}helpers/${deps[$i]}"
        gen_line "require" "$str"
    done
    for (( i = 0; i < ${#external[@]}; i++ )); do
        gen_line "require" "${external[$i]}"
    done
    for (( i = 0; i < ${#mods[@]}; i++ )); do
        local str="${prefix}mods/${mods[$i]}"
        gen_line "require" "$str"
    done
    for i in "${!resources[@]}"; do
        local str="$i ${prefix}helpers/${resources[$i]}"
        gen_line "resource" "$str"
    done
    gen_line "downloadURL" "${prefix}${base_file}"
    gen_line "updateURL" "${prefix}${base_file}"
}

gen_consts(){
	cat<<-EOF
		const version = safeGM("info").script.version;
		const tool = safeGM("info").script.name;
		const repositoryURL = "https://github.com/$slug/";
		const branch = "$branch"
		const helpersPath = "helpers/"
		const branchPath = repositoryURL + "raw/" + branch + "/"
		const versionFile = branchPath + "VERSION";
		const updateURL = branchPath + "kes.user.js";
		const bugURL = repositoryURL + "issues"
		const changelogURL = repositoryURL + "blob/" + branch + "/CHANGELOG.md"
		const magURL = "https://kbin.social/m/enhancement"

		//resource URLs used by legacy GM. API
		const manifest = branchPath + helpersPath + "manifest.json"
		const cssURL = branchPath + helpersPath + "kes.css"
		const layoutURL = branchPath + helpersPath + "ui.json"

	EOF
}
gen_object(){
    echo "const funcObj = {"
    for (( i = 0; i < ${#funcs[@]}; i++ )); do
        if [[ $i -lt $((${#funcs[@]}-1)) ]]; then
            comma=","
        else
            unset comma
        fi
        printf "    %s: %s%s\n" "${funcs[$i]}" "${funcs[$i]}" "$comma"
    done
    echo "};"
}
columnize(){
    gen_meta
    gen_instances
    gen_grants
    gen_extra
    gen_requires
}
main(){
    echo "// ==UserScript=="
    columnize | column -t -s$'\t' -o"  "
    echo "// ==/UserScript=="
    echo ""
    echo "//START AUTO MASTHEAD"
    wrap=$(printf "%s, " "${funcs[@]}" | sed 's/, $//')
    printf "/* global %s */\n\n" "$wrap"
    gen_consts
    gen_object
    echo "//END AUTO MASTHEAD"
    awk 'x==1 {print $0} /END AUTO MASTHEAD/{x=1}' $base_file.bak
}
readarray -t funcs < <(< $manifest awk -F\" '/entrypoint/ {print $4}' | sort)
cp $base_file $base_file.bak
main > $base_file

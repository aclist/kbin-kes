#!/usr/bin/env bash

name=KES
author=aclist
license=MIT
version=$(cat VERSION)
desc="Kbin Enhancement Suite"
branch=$(git name-rev --name-only HEAD)
[[ $branch != "main" ]]  && branch="testing"
slug="${author}/kbin-kes"

instances=(
	"https://kbin.social/*"
	"https://lab2.kbin.pub/*"
	"https://lab3.kbin.pub/*"
	"https://fedia.io/*"
	"https://karab.in/*"
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
	printf "// @%s         %s\n" "$1" "$2"
}
gen_meta(){
	cat <<-EOF
	// ==UserScript==
	// @name          $name
	// @namespace     https://github.com/$author
	// @license       $license
	// @version       $version
	// @description   $desc
	// @author        $author
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
	// @icon          https://kbin.social/favicon.svg
	// @connect       raw.githubusercontent.com
	// @connect       github.com
EOF
}
gen_requires(){
	prefix="https://raw.githubusercontent.com/$slug/$branch/"
	deps=(
		"safegm.user.js"
		)
	external=(
		"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"
		"http://code.jquery.com/jquery-3.4.1.min.js"
	)
	declare -A resources=([kes_layout]=ui.json [kes_css]=kes.css)
	readarray -t mods < <(ls -1 $PWD/mods)
	for (( i = 0; i < ${#deps[@]}; i++ )); do
		local str="${prefix}${deps[$i]}"
		gen_line "require" "$str"
	done
	for (( i = 0; i < ${#external[@]}; i++ )); do
		gen_line "require" "${external[$i]}"
	done
	for (( i = 0; i < ${#mods[@]}; i++ )); do
		local str="${prefix}mods/${mods[$i]}"
		gen_line "require" "$str"
	done
	for i in ${!resources[@]}; do
		local str="$i ${prefix}${resources[$i]}"
		gen_line "resource" "$str"
	done
	gen_line "downloadURL" "${prefix}kes.user.js"
	gen_line "updateURL" "${prefix}kes.user.js"
}

gen_consts(){
cat<<-EOF
	const version = safeGM("info").script.version;
	const tool = safeGM("info").script.name;
	const repositoryURL = "https://github.com/$slug/";
	const branch = repositoryURL + "raw/$branch/"
	const manifest = branch + "manifest.json"
	const ui = branch + "ui.json"
	const versionFile = branch + "VERSION";
	const updateURL = branch + "kes.user.js";
	const bugURL = repositoryURL + "issues"
	const magURL = "https://kbin.social/m/enhancement"
	const changelogURL = repositoryURL + "blob/$branch/CHANGELOG.md"
EOF
}
gen_object(){
manifest=manifest.json
readarray -t funcs < <(<$manifest jq -r '.[].entrypoint' | sort)
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
gen_meta
gen_instances
gen_grants
gen_extra
gen_requires
echo "==/UserScript=="
echo "//START AUTO MASTHEAD"
gen_consts
gen_object
echo "//END AUTO MASTHEAD"

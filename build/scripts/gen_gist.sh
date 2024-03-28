#used to generate ephemeral version of funcs.js when prototyping local changes
#TODO: add token creation tutorial to docs
file="helpers/funcs.js"
kes="kes.user.js"
id="build/scripts/.gist_id"
gist="KEStestfuncs.js"

error(){
    echo "ERROR: $1"
    exit 1
}

[[ -z $KES_GIST_GEN ]] && error "KES_GIST_GEN not set"

delete(){
    local gist_id="$1"
    curl -L \
      -X DELETE \
      -H "Accept: application/vnd.github+json" \
      -H "Authorization: Bearer $KES_GIST_GEN" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      https://api.github.com/gists/$gist_id
}

post(){
    json=$(jq --raw-input --slurp '{files: {"KEStestfuncs.js": {content: .}}}' $file | \
        curl -s -L \
          -X POST \
          -H "Accept: application/vnd.github+json" \
          -H "Authorization: Bearer $KES_GIST_GEN" \
          -H "X-GitHub-Api-Version: 2022-11-28" \
          https://api.github.com/gists \
          --data @-)
    echo "$json"
}
main(){
    if [[ -f "$id" ]]; then
        local gist_id=$(cat $id)
        delete "$gist_id"
    fi

    json=$(post)

    if [[ $(<<< "$json" jq '.message') =~ "Bad credentials" ]]; then
        error "Invalid GitHub token"
    fi

    <<< "$json" jq -r '.id' > "$id"
    url=$(<<< "$json" jq -r --arg filename "$gist" '.files[$filename].raw_url')

    sed "/favicon.svg/a \/\/ @connect      gist.githubusercontent.com" "$kes" | \
    sed "/funcs.js/c \/\/ @require      $url" | xclip -selection c
    echo "Copied kes.user.js to clipboard"
}

main

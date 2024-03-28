#TODO: add token creation tutorial to docs

error(){
    echo "ERROR: $1"
    exit 1
}

[[ -z $KES_GIST_GEN ]] && error "KES_GIST_GEN not set"

#TODO: if previous file exists, delete

file="../../helpers/funcs.js"
kes="../../kes.user.js"
gist="KEStestfuncs.js"
json=$(jq --raw-input --slurp '{files: {"KEStestfuncs.js": {content: .}}}' $file | \
    curl -L \
      -X POST \
      -H "Accept: application/vnd.github+json" \
      -H "Authorization: Bearer $KES_GIST_GEN" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      https://api.github.com/gists \
      --data @-)

if [[ $(<<< "$json" jq '.message') =~ "Bad credentials" ]]; then
    error "Invalid GitHub token"
fi

url=$(<<< "$json" jq -r --arg filename "$gist" '.files[$filename].raw_url')

#TODO: insert @connect gist.githubusercontent.com
sed "/funcs.js/c \/\/ @require        $url" "$kes"
#TODO: copy to clipboard prompt

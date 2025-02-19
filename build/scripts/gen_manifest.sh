#!/usr/bin/env bash
if [[ ! $(git rev-parse --show-toplevel 2>/dev/null) == "$PWD" ]]; then
    echo "Must be run from repository root"
    exit 1
fi

file="helpers/manifest.json"
[[ $2 == "local" ]] && file="tmp/helpers/manifest.json"
validate(){
    for i in $(find $PWD/mods -name "*.json"); do
        < "$i" jq empty 2>/dev/null || { printf "ERROR: %s is malformed JSON\n" "$i"; exit 1; }
    done
    gen
}
gen(){
    for i in $(find $PWD/mods -name "*.json"); do
        cat $i
    done | jq -s > $PWD/$file
}

validate
printf "Wrote manifest to '%s'\n" "$PWD/$file"

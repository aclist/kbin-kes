#!/usr/bin/env bash
file="manifest.json"
validate(){
    for i in $(find $PWD/mods -name "*.json"); do
        < "$i" jq empty 2>/dev/null || { printf "ERROR: %s is malformed JSON\n" "$i"; exit 1; }
    done
    gen
}
gen(){
    for i in $(find $PWD/mods -name "*.json"); do
        cat $i
    done | jq -s > $PWD/helpers/$file
}

validate
printf "Wrote manifest to '%s'\n" "$PWD/helpers/$file"

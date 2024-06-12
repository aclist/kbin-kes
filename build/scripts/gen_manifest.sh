#!/usr/bin/env bash
file="manifest.json"
for i in $(find $PWD/mods -name "*.json"); do
    cat $i
done | jq -s > $PWD/helpers/$file

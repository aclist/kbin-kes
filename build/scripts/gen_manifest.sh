#!/usr/bin/env bash
parent=$(dirname $(dirname $PWD))
file="manifest.json"
for i in $(find $parent/mods -name *.json); do 
    cat $i
done | jq -s > $parent/helpers/$file

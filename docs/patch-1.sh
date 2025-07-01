#!/usr/bin/env bash

title="Patch 1: Deduplicate attribute cross-references"
sed -i '/Mbin.Thread.COMMENTS/ s/id15/id9/' build/html/funcs.html
printf "Applied %s\n" "$title"

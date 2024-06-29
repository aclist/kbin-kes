#!/usr/bin/env bash
build_dir="build/scripts"
kes="kes.user.js"
alt="${kes}.alt"
prefix="https://raw.githubusercontent.com/aclist/kbin-kes/testing/helpers/"
lcl="http://127.0.0.1:8080/helpers/"

build(){
    "$build_dir/gen_kes.sh" && echo "Finished building KES"
    "$build_dir/gen_manifest.sh" && echo "Finished building manifest"
    "$build_dir/concat_funcs" build && echo "Finished building funcs file"
}
escape(){
    <<< "$1" sed 's@/@\\/@g'
}

build
< $kes sed \
    -e "s/\(\/\/ @require *\)\($(escape $prefix)\)\(.*\)/\1$(escape $lcl)\3/g" \
    -e "s/\(\/\/ @resource *\)\(.*\) \($(escape $prefix)\)\(.*\)/\1\2 $(escape $lcl)\4/g" > $alt &&
    
    echo "Wrote mock KES file with local resource paths to $alt"

python3 -m http.server 8080 --bind 127.0.0.1

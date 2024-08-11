#!/usr/bin/env bash
build_dir="build/scripts"
kes="kes.user.js"
alt="${kes}.alt"
prefix="https://raw.githubusercontent.com/aclist/kbin-kes/testing/helpers/"
lcl="http://127.0.0.1:8080/helpers/"

build(){
    "$build_dir/gen_kes.sh"
    "$build_dir/gen_manifest.sh"
    "$build_dir/concat_funcs"
}
escape(){
    <<< "$1" sed 's@/@\\/@g'
}

build
< $kes sed \
    -e "s/\(\/\/ @require *\)\($(escape $prefix)\)\(.*\)/\1$(escape $lcl)\3/g" \
    -e "s/\(\/\/ @resource *\)\(.*\) \($(escape $prefix)\)\(.*\)/\1\2 $(escape $lcl)\4/g" > $alt &&
    
    echo "Wrote mock KES script with local resource paths to '$alt'"

printf "Initializing local server. Keyboard interrupt terminates\n"
python3 -m http.server 8080 --bind 127.0.0.1

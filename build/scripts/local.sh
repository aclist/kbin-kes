#!/usr/bin/env bash
if [[ ! $(git rev-parse --show-toplevel 2>/dev/null) == "$PWD" ]]; then
    echo "Must be run from repository root"
    exit 1
fi

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

function abort(){
    kill -9 $pid
    log cleanup
    rm "$alt"
}

trap abort EXIT SIGINT INT

echo
build
< $kes sed \
    -e "s/\(\/\/ @require *\)\($(escape $prefix)\)\(.*\)/\1$(escape $lcl)\3/g" \
    -e "s/\(\/\/ @resource *\)\(.*\) \($(escape $prefix)\)\(.*\)/\1\2 $(escape $lcl)\4/g" > $alt &&
    echo "Copy the contents of '$alt' into your *monkey extension to use local resources"
    echo

printf "Initializing local server. Type 'q' to terminate\n"
python3 -m http.server 8080 --bind 127.0.0.1 &
pid=$!
read -rsn1 key
if [[ $key == "q" ]]; then
    kill -9 $pid
    abort
fi

#!/usr/bin/env bash

build_dir="build/scripts"
kes="tmp/kes.user.js"
alt="${kes}.alt"
prefix="https://raw.githubusercontent.com/aclist/kbin-kes/testing/helpers/"
lcl="http://127.0.0.1:8080/tmp/helpers/"

build(){
    "$build_dir/gen_kes.sh" "testing" "local"
    "$build_dir/gen_manifest.sh" "testing" "local"
    "$build_dir/concat_funcs" "testing" "local"
}
escape(){
    <<< "$1" sed 's@/@\\/@g'
}

function abort(){
    kill -9 $pid
    rm -rf tmp
    exit
}

check_pyver(){
    local pyver=$(python3 --version | awk '{print $2}')
    if [[ -z $pyver ]] || [[ ${pyver:0:1} -lt 3 ]]; then
        local msg="Requires Python >= 3.0.0"
        printf "%s\n" "$msg"
        exit 1
    fi
}

test_executable(){
    local f="$1"
    [[ ! -x "$f" ]] && abort "Test '$f' is not executable"
}

run_tests(){
    readarray -t tests < <(find $PWD/tests -type f)
    for ((i=0; i <${#tests[@]}; ++i)); do
        test_executable "${tests[$i]}"
        inc=$((i+1))
        name=$(awk -F\" '/TEST_NAME/ {print $2}' "${tests[$i]}")
        printf "Test %s/%s: %s\n" "$inc" "${#tests[@]}" "$name"
        ${tests[$i]}
        result "$?"
    done
}

result(){
    local res="$1"
    case "$res" in
        0)
            printf "Result: \e[0;32mOK\n"
            printf "\e[0m"
            return 0
            ;;
        1)
            printf "Result: \e[0;31mFAIL\n"
            printf "\e[0m"
            exit 1
            ;;
    esac
}

trap abort SIGINT INT

if [[ ! $(git rev-parse --show-toplevel 2>/dev/null) == "$PWD" ]]; then
    echo "Must be run from repository root"
    exit 1
fi

check_pyver
run_tests

echo
[[ ! -d tmp ]] && mkdir tmp
cp -R helpers tmp

build
< $kes sed \
    -e "s/\(\/\/ @require *\)\($(escape $prefix)\)\(.*\)/\1$(escape $lcl)\3/g" \
    -e "s/\(\/\/ @resource *\)\(.*\) \($(escape $prefix)\)\(.*\)/\1\2 $(escape $lcl)\4/g" > $alt &&
    echo "Copy the contents of '$PWD/$alt' into your *monkey extension to use local resources"
    echo

printf "Initializing local server. Type 'q' to terminate\n"
python3 -m http.server 8080 --bind 127.0.0.1 &
pid=$!
while true; do
    read -rsn1 key
    if [[ $key == "q" ]]; then
        abort
        break
    fi
done

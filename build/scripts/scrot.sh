#!/usr/bin/env bash

dir="../../images"
echo $dir
exit
name="example.png"
scrot="$dir/$name"
url=https://kbin.social/m/kbinstyles

firefox "$url"
wmctrl -a Firefox
wid=$(xdotool getactivewindow)
sleep 4s
xdotool keydown ctrl keydown shift keydown question
sleep 0.1s
scrot -a 1080,120,2560,1320 -o "$scrot"
xdotool keyup ctrl keyup shift keyup question
feh "$scrot" &
wmctrl -a feh

read -p "satisfactory? " resp
case $resp in
    y)
        #kickoff script
        ;;
    n)
        rm "$scrot"
        exit
        ;;
esac

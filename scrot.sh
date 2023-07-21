#!/usr/bin/env bash

dir=$PWD/images
url=https://kbin.social/m/kbinstyles
firefox "$url"
i3-msg workspace 2
sleep 3s
xdotool mousemove 2600 1000
sleep 0.1s
xdotool keydown ctrl keydown shift keydown question
sleep 0.1s
scrot -a 1080,120,2560,1320 $dir/testimg.png
sleep 0.1s
xdotool keyup ctrl keyup shift keyup question

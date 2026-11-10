#!/bin/sh
# Generates the demo render used for screenshots: six 8-second "shots" with hard cuts,
# 1920x1080, 24 fps, with a quiet tone as audio. Needs ffmpeg with the lavfi sources.
set -eu
out="${1:-screenshots/.work/demo.mp4}"
[ -f "$out" ] && exit 0
mkdir -p "$(dirname "$out")"
S=1920x1080
D=8
ffmpeg -hide_banner -loglevel error -y \
  -f lavfi -i "gradients=s=$S:r=24:d=$D:c0=0x0b1d3a:c1=0xff8a3d:c2=0x1f4e79:n=3:speed=0.02:seed=11" \
  -f lavfi -i "gradients=s=$S:r=24:d=$D:c0=0x102a43:c1=0x2bb3c0:n=2:type=radial:speed=0.015:seed=4" \
  -f lavfi -i "mandelbrot=s=$S:r=24:end_scale=0.3:inner=convergence" \
  -f lavfi -i "gradients=s=$S:r=24:d=$D:c0=0x3a0b2e:c1=0xe8559a:c2=0xf5b92f:n=3:type=circular:speed=0.01:seed=7" \
  -f lavfi -i "life=s=$S:r=24:mold=10:ratio=0.1:death_color=#1b2b4b:life_color=#31b86a" \
  -f lavfi -i "gradients=s=$S:r=24:d=$D:c0=0x0d0d12:c1=0x3d7fff:c2=0x8a63d2:n=3:speed=0.02:seed=21" \
  -f lavfi -i "sine=frequency=220:sample_rate=48000:duration=48" \
  -filter_complex "[0:v]trim=duration=$D,setpts=PTS-STARTPTS,format=yuv420p[a];\
[1:v]trim=duration=$D,setpts=PTS-STARTPTS,format=yuv420p[b];\
[2:v]trim=duration=$D,setpts=PTS-STARTPTS,format=yuv420p[c];\
[3:v]trim=duration=$D,setpts=PTS-STARTPTS,format=yuv420p[d];\
[4:v]trim=duration=$D,setpts=PTS-STARTPTS,format=yuv420p[e];\
[5:v]trim=duration=$D,setpts=PTS-STARTPTS,format=yuv420p[f];\
[a][b][c][d][e][f]concat=n=6:v=1:a=0[v];[6:a]volume=0.05[au]" \
  -map "[v]" -map "[au]" -c:v libx264 -preset veryfast -crf 23 -c:a aac -b:a 128k -movflags +faststart "$out"

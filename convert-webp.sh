#!/bin/bash

# PARAMS=('-m 6 -q 70 -mt -af -progress')
PARAMS=('-q 50')

if [ $# -ne 0 ]; then
  PARAMS=$@;
fi

cd $(pwd)

shopt -s nullglob nocaseglob extglob

for FILE in *.@(jpg|jpeg|tif|tiff|png); do 
  cwebp $PARAMS "$FILE" -o "${FILE}".webp;
done

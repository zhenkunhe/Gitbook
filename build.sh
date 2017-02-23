#!/bin/bash

cp books/$1/book.json .
rm -r books/$1/html
gitbook build
mv _book books/$1/html
rm book.json

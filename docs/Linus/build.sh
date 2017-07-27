#!/bin/bash

cp books/$1/book.json .
rm -r docs/$1
gitbook build
mv _book docs/$1
rm book.json

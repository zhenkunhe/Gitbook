#!/bin/bash

cp books/$1/book.json .
gitbook serve
rm book.json

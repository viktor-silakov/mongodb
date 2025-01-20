#!/bin/bash

if [[ "$(uname)" == "Linux" ]]; then
    echo "Linux Detected, running tests in headless mode (xvfb-run)"
    CMD="xvfb-run sh -c \"$@\""
else
    echo "Not Linux, running tests in normal mode"
    CMD="sh -c \"$@\""
fi

echo "👉 Running command: $CMD"
eval $CMD
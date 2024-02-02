#!/bin/bash

# Read the current package.json file
PACKAGE_JSON="package.json"

# Extract the current value of "name" field
CURRENT_NAME=$(jq -r .name $PACKAGE_JSON)

# Modify the "name" field
NEW_NAME="@justindhillon/$CURRENT_NAME"

# Update the "name" field in package.json
jq ".name=\"$NEW_NAME\"" $PACKAGE_JSON > tmpfile && mv tmpfile $PACKAGE_JSON

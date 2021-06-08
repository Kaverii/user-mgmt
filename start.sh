#!/bin/bash

for keyval in $(grep -E '": [^\{]' ./assets/config.test.json | sed -e 's/: /=/' -e "s/\(\,\)$//"); do
    echo "export $keyval"
    eval export $keyval
done

#!/bin/bash
# while read line; do export "$line";
# done <source .env

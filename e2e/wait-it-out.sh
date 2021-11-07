#!/bin/bash

# Based on answer here: https://stackoverflow.com/a/50583452

attempt_counter=0
max_attempts=5

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -t|--target) target="$2"; shift ;;
        -c|--command) command="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

echo ${target}

until $(curl --output /dev/null --silent --head --fail ${target}); do
    if [ ${attempt_counter} -eq ${max_attempts} ];then
      echo "Max attempts reached"
      exit 1
    fi

    printf "."
    attempt_counter=$(($attempt_counter+1))
    sleep 5
done

# If target up then run command
printf "Success!\n"
exec ${command}
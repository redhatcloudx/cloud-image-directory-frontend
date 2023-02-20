#!/bin/bash

gcloud beta compute images list --filter="name~'rhel'" --format json
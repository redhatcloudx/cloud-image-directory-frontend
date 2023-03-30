#!/bin/bash

REGIONS=$(aws ec2 describe-regions --query "Regions[].{Name:RegionName}" --output text)
MAJOR_VERSIONS=( 7 8 9 )
REPORT=[]
for version in "${MAJOR_VERSIONS[@]}"; do
 for region in $REGIONS; do
   echo "Checking for RHEL${version} releases in ${region}"
   IMAGE_REPORT="{\"majorRelease\": \"$version\", \"region\": \"$region\", \"images\": $(aws ec2 describe-images --owners 309956199498 --query 'sort_by(Images, &CreationDate)' --filters "Name=name,Values=RHEL-SAP-${version}*" --region ${region} --output json)}"
   IMAGE_REPORT_LENGTH=$(echo "$IMAGE_REPORT" | jq '.images | length')
   if [ "$IMAGE_REPORT_LENGTH" -gt "0" ]; then
     echo "Images found!"
     REPORT=$(echo $REPORT | jq --arg imageReport "$(echo $IMAGE_REPORT | jq .)" '. += [$imageReport]')
   fi
   done
done
echo "$REPORT" | jq . | sed 's/\\n/\n/g; s/\\//g; s/"{/{/g; s/}"/}/g' > "./output.json"

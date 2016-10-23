#!/bin/sh
#
# sync local synchronized.server with S3
#
# install with `pip install awscli`
#
# first run `aws configure` to setup your API keys
#

cd "$(dirname "$0")"

LOCAL="./build"
BUCKET="www.synchronized.tv"
DRYRUN=""

if [ "$1" == "dryrun" ]; then
  DRYRUN="--dryrun"
fi


# fix relative paths
sed -i.bak s/\\/static/static/g build/index.html

echo "▶ sync /build to S3 $BUCKET"
aws s3 sync $DRYRUN --acl public-read --exclude "*.DS_Store" --region eu-west-1 "$LOCAL" s3://$BUCKET/mashup


echo "▶ sync finished"

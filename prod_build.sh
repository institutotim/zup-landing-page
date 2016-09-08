#!/usr/bin/env bash
NODE_ENV=production
gulp

sed -i '' "s@CITY_NAME@$CITY_NAME@g" ./dist/index.html

if [ -z "$PAGE_TITLE" ]; then
        sed -i '' "s@PAGE_TITLE@ZUP@g" ./dist/index.html
else
        sed -i '' "s@PAGE_TITLE@$PAGE_TITLE@g" ./dist/index.html
fi

if [ -z "$APPLICATION_NAME" ]; then
        sed -i '' "s@APPLICATION_NAME@ZUP@g" ./dist/index.html
else
        sed -i '' "s@APPLICATION_NAME@$APPLICATION_NAME@g" ./dist/index.html
fi

sed -i '' "s@API_URL@$API_URL@g" ./dist/scripts/main.js
if [ -z "$IOS_APP_LINK" ]; then
        sed -i '' "s@HAS_IOS_APP_LINK@none@g" ./dist/styles/main.css
else
        sed -i '' "s@IOS_APP_LINK@$IOS_APP_LINK@g" ./dist/index.html
        sed -i '' "s@HAS_IOS_APP_LINK@block@g" ./dist/styles/main.css
fi

if [ -z "$ANDROID_APP_LINK" ]; then
        sed -i '' "s@HAS_ANDROID_APP_LINK@none@g" ./dist/styles/main.css
else
        sed -i '' "s@ANDROID_APP_LINK@$ANDROID_APP_LINK@g" ./dist/index.html
        sed -i '' "s@HAS_ANDROID_APP_LINK@block@g" ./dist/styles/main.css
fi

if [ -z "$WEB_APP_LINK" ]; then
        sed -i '' "s@HAS_WEB_APP_LINK@none@g" ./dist/styles/main.css
else
        sed -i '' "s@WEB_APP_LINK@$WEB_APP_LINK@g" ./dist/index.html
        sed -i '' "s@HAS_WEB_APP_LINK@block@g" ./dist/styles/main.css
fi

[ -f terms.html ] && TERMS_AND_CONDITIONS_HTML=`cat terms.html`

if [ -z "$TERMS_AND_CONDITIONS_HTML" ]; then
        sed -i '' "s@HAS_TERMS_AND_CONDITIONS@none@g" ./dist/styles/main.css
else
        perl -i -pe "s@TERMS_AND_CONDITIONS_HTML@$TERMS_AND_CONDITIONS_HTML@g" ./dist/index.html
        sed -i '' "s@HAS_TERMS_AND_CONDITIONS@block@g" ./dist/styles/main.css
fi

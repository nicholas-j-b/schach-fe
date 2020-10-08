#! /bin/bash

ng-openapi-gen \
--input https://raw.githubusercontent.com/nicholas-j-b/schachfish-api/master/schach-be/src/main/resources/openapi.yml \
--output /home/nick/ws-web/games/schach/temp-fe/schach-fe/src/app/api/

#!/bin/bash

npm run build-dev
scp -r ~/Projects/PPDB/PPDB-frontend/www/* root@117.53.47.43:/home/ppdb/frontend
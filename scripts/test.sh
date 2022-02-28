#!/bin/bash

cd ./public/data/
python -m SimpleHTTPServer 8000 &
cd ../../
node scripts/test.js --projects=e2e.jest.config.js -- src/containers/releaseNotes/CategoryReleaseNotes.e2e.ts

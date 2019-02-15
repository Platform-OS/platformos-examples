docker run --rm -v $PWD/tests/e2e:/tests -e "MP_URL=$MP_URL" testcafe/testcafe 'chromium:headless --no-sandbox' --screenshots-on-fails /tests/

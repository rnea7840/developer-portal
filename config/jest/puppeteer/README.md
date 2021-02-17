# TODO

Putting this at the top so it's not missed.

Right now, it appears the basics for the node environment and accessing the puppeteer page are there. However, we need to add the options to configure our test server at the appropriate host (our config assumes localhost:4444 at the moment) and have it run the dev portal. We originally had this set up in jest-puppeteer.config.js.

Since this is our own implementation, maybe we don't need a config at that level, but we do need to figure out how to start that server at the correct place in order to actually start testing.

# What is this folder?

We originally used jest-puppeteer to achieve this result, but that library has no active maintainers. The jest documentation describes how to connect puppeteer to jest ourselves. These files are based heavily on the documentation on the jest website, listed below.
- https://jestjs.io/docs/en/puppeteer

Most of the logic was moved into puppeteer-helper.js in order to keep clear file paths that are common between them as well as the global variables and overall logic.

# Why JS over TS?

*Short Version: We can convert to typescript later*

I had these written in typescript at one point but converted back, due to my uncertainty over how jest handles the global variable types.


# browserstack-spawn-browser-with-url

Allows to spawn a browser on BrowserStack and open a provided URL in it.

You need to have `BROWSER_STACK_USERNAME` & `BROWSER_STACK_ACCESS_KEY` environment variables set.

## Usage:

First, install dependencies:

```
npm install
```

```
./index.js 'BROWSER_JSON_DATA' URL
```

where `BROWSER_JSON_DATA` is a partial browser data as returned by BrowserStack, e.g.:

```
./index.js '{"browser": "opera", "browser_version": "88.0"}' https://example.com
```

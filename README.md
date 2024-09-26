# browserstack-spawn-browser-with-url

Allows to spawn a browser on BrowserStack and open a provided URL in it.

You need to have `BROWSERSTACK_USERNAME` & `BROWSERSTACK_ACCESS_KEY` environment variables set.

## Usage:

First, install dependencies:

```
npm install
```

```
./index.js 'BROWSER_JSON_DATA' URL
```

where `BROWSER_JSON_DATA` is a full browser data as returned by BrowserStack, e.g.:

```
./index.js '{"os":"Windows", "os_version":"11", "browser":"chrome", "browser_version":"128.0"}' https://example.com
```

or:

```
./index.js '{"os": "ios", "os_version": "18", "device": "iPhone 16"}' https://example.com
```

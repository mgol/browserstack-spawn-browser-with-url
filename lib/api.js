/**
 * Browserstack API is documented at
 * https://github.com/browserstack/api
 */

const browserstackApi = 'https://api.browserstack.com';
const apiVersion = 5;

const username = process.env.BROWSERSTACK_USERNAME;
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;

const textEncoder = new TextEncoder();

function createAuthHeader(username, accessKey) {
	const encoded = textEncoder.encode(`${username}:${accessKey}`);
	const base64 = btoa(String.fromCodePoint.apply(null, encoded));
	return `Basic ${base64}`;
}

async function fetchAPI(path, options = {}, versioned = true) {
	if (!username || !accessKey) {
		throw new Error(
			'BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY environment variables must be set.',
		);
	}
	const init = {
		method: 'GET',
		...options,
		headers: {
			authorization: createAuthHeader(username, accessKey),
			accept: 'application/json',
			'content-type': 'application/json',
			...options.headers,
		},
	};
	console.log(
		'fetch params',
		`${browserstackApi}${versioned ? `/${apiVersion}` : ''}${path}`,
		init,
	);
	const response = await fetch(
		`${browserstackApi}${versioned ? `/${apiVersion}` : ''}${path}`,
		init,
	);
	if (!response.ok) {
		console.log(
			`\n${init.method} ${path}`,
			response.status,
			response.statusText,
		);
		throw new Error(`Error fetching ${path}`);
	}
	return response.json();
}

/**
 * =============================
 * Workers API
 * =============================
 */

/**
 * A browser object may only have one of `browser` or `device` set;
 * which property is set will depend on `os`.
 *
 * `options`: is an object with the following properties:
 *   `os`: The operating system.
 *   `os_version`: The operating system version.
 *   `browser`: The browser name.
 *   `browser_version`: The browser version.
 *   `device`: The device name.
 *   `url` (optional): Which URL to navigate to upon creation.
 *   `timeout` (optional): Maximum life of the worker (in seconds). Maximum value of `1800`. Specifying `0` will use the default of `300`.
 *   `name` (optional): Provide a name for the worker.
 *   `build` (optional): Group workers into a build.
 *   `project` (optional): Provide the project the worker belongs to.
 *   `resolution` (optional): Specify the screen resolution (e.g. "1024x768").
 *   `browserstack.local` (optional): Set to `true` to mark as local testing.
 *   `browserstack.video` (optional): Set to `false` to disable video recording.
 *   `browserstack.localIdentifier` (optional): ID of the local tunnel.
 */
export function createWorker(options) {
	return fetchAPI('/worker', {
		method: 'POST',
		body: JSON.stringify(options),
	});
}

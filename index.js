#!/usr/bin/env node

'use strict';

const browserstackUser = process.env.BROWSER_STACK_USERNAME;
const browserstackAccessKey = process.env.BROWSER_STACK_ACCESS_KEY;

if (!browserstackUser || !browserstackAccessKey) {
	console.error(
		'Environment variables BROWSER_STACK_USERNAME & BROWSER_STACK_ACCESS_KEY need to be set',
	);
	process.exitCode = 1;
	return;
}

const [, , browserJsonStringifiedData, url] = process.argv;

if (!browserJsonStringifiedData || !url) {
	console.error(
		"Usage (see README for more details):\n./index.js 'BROWSER_JSON_DATA' URL",
	);
	process.exitCode = 1;
	return;
}

let browserJsonData;
try {
	browserJsonData = JSON.parse(browserJsonStringifiedData);
} catch (e) {
	console.error('Incorrect browser JSON data');
	process.exitCode = 1;
	return;
}

const main = async () => {
	const { promisify } = require('util');
	const browserstack = require('browserstack');

	const client = browserstack.createClient({
		version: 4,
		username: browserstackUser,
		password: browserstackAccessKey,
	});

	// const getBrowsers = promisify(client.getBrowsers.bind(client));
	const createWorker = promisify(client.createWorker.bind(client));

	const browserSettings = {
		url,
		timeout: 60,
		...browserJsonData,
	};

	const worker = await createWorker(browserSettings);
	console.log('Worker spawned:', worker);
};

main().catch((err) => {
	console.error('An error occurred');
	console.error(err);
	process.exitCode = 1;
});

#!/usr/bin/env node

import { randomBytes } from 'node:crypto';
import { createWorker } from './lib/api.js';

const main = async () => {
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

	const runId = randomBytes(20).toString('hex').slice(0, 8);

	const options = {
		url: encodeURI(url),
		project: 'mgol-browserstack-test',
		build: `Run mgol ${runId}`,
		timeout: 60,
		...browserJsonData,
	};

	const worker = await createWorker(options);
	console.log('Worker spawned:', worker);
};

main().catch((err) => {
	console.error('An error occurred');
	console.error(err);
	process.exitCode = 1;
});

// const { JSDOM } = require('jsdom');
// const { document } = new JSDOM(html).window;

import { promises } from 'fs';
import request from 'request-promise';
import * as cheerio from 'cheerio';

async function saveHtml() {
	try {
		const response = await request.get('https://www.codingwithstefan.com/table-example/');
		await promises.writeFile('./index.html', response);
	} catch (err) {
		console.error(err);
	}
}

async function parse() {
	// Save the page
	// await saveHtml();

	// Parse
	const html = await promises.readFile('./index.html', 'utf8');
	const $ = cheerio.load(html);
	const data = [];

	$('body > table > tbody > tr').each((i, el) => {
		if (i === 0) return;

		const tds = $(el).find('td');

		const company = $(tds[0]).text();
		const contact = $(tds[1]).text();
		const country = $(tds[2]).text();

		data.push({ company, contact, country });
	});

	console.log(data);
}

parse();

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
	const tableHeaders = [];

	$('body > table > tbody > tr').each((i, el) => {
		if (i === 0) {
			$(el)
				.find('th')
				.each((_, el) => {
					tableHeaders.push($(el).text());
				});

			return;
		}

		const tds = $(el).find('td');
		let row = {};

		tds.each((i, el) => {
			row[tableHeaders[i]] = $(el).text();
		});

		data.push(row);
		row = {};
	});

	console.log(data);
}

parse();

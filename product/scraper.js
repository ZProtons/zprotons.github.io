const cheerio = require('cheerio');
const unirest = require('unirest');

async function scrapeAmazon() {
  const amazonUrl = 'https://www.amazon.in/dp/B011GOY6HG/';
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
  };

  const response = await unirest.get(amazonUrl).headers(headers);

  const $ = cheerio.load(response.body);
  const result = {};

  $('h1#title').each((i, el) => {
    result.title = $(el).text().trim();
  });

  $('span.a-price').each((i, el) => {
    result.price = $(el).find('span').first().text();
  });

  return result;
}

scrapeAmazon().then((data) => {
  console.log('Title:', data.title);
  console.log('Price:', data.price);
});

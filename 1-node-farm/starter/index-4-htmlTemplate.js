// Routing (e.g. http://127.0.0.1:8000)

const fs = require('fs');
const http = require('http');
const url = require('url');
// ** External/third party modules dependencies install
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

// ?id=0 --> i want to like /avgado-product (It is called slug)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

const slugs = productData.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log('Request URL:', query.id);
  // const pathName = req.url;

  //   Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    const cardHtml = productData
      .map((el) => replaceTemplate(templateCard, el))
      .join('');

    // console.log("cardHtml", cardHtml);
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardHtml);

    res.end(output);

    //   Product Page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    const product = productData[query.id];
    const output = replaceTemplate(templateProduct, product);

    console.log('cardHtml', output);
    res.end(output);

    //   Api
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'my-own-header':
        'hello-world (koi zarurt nahi hai ap ko server pr hit krny ki!!)',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server is running on port 8000');
});

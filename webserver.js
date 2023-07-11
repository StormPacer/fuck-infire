const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const express = require('express');
const apicache = require('apicache');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const cache = apicache.middleware;

app.get('/api/torrents', cache('1 hour'), async (req, res) => {
    const pageIndex = req.query.page;
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    await page.goto('https://infire.si');

    const cookies = [
        {
            name: "hashx",
            value: process.env.HASHX
        },
        {
            name: "pass",
            value: process.env.PASS
        },
        {
            name: "uid",
            value: process.env.UID
        }
    ];

    await page.setCookie(...cookies);

    await page.goto(`https://infire.si/torrents.php?page=${pageIndex}`);

    const content = await page.content();
    const $ = cheerio.load(content);

    const torrents = [];
    const torrent = {
        image: '',
        name: '',
        category: '',
        uploaded: '',
        size: '',
        seeders: '',
        leechers: '',
        completed: '',
        link: ''
    };

    $('.lista').children().first().children().each((index, element) => {
        if (index > 4) {
            if ($(element).attr('class') !== 'a') return;
            $(element).children().each((index, element) => {

                if (index == 0) {
                    torrent.image = $(element).find('img').attr('src');
                }
                else if (index == 1) {
                    torrent.name = $(element).find('a').text();
                }
                else if (index == 2) {
                    torrent.category = $(element).find('a').text().split(' ').join(' / ');
                }
                else if (index == 5) {
                    torrent.uploaded = $(element).text();
                }
                else if (index == 6) {
                    const size = $(element).text().split(' ');
                    if (size[1] == 'MiB') {
                        torrent.size = (parseFloat(size[0]) * 1.049).toFixed(2) + ' MB';
                    }
                    else if (size[1] == 'GiB') {
                        torrent.size = (parseFloat(size[0]) * 1.074).toFixed(2) + ' GB';
                    }
                    else if (size[1] == 'KiB') {
                        torrent.size = (parseFloat(size[0]) * 1.024).toFixed(2) + ' KB';
                    }
                    else {
                        torrent.size = $(element).text();
                    }
                }

                else if (index == 8) {
                    torrent.seeders = $(element).find('a').text();
                }

                else if (index == 9) {
                    torrent.leechers = $(element).find('a').text();
                }

                else if (index == 10) {
                    const el = $(element).find('a');
                    if (el.length == 0) {
                        torrent.completed = "Brez podatka";
                    }
                    else {
                        torrent.completed = el.text();
                    }
                }

                else if (index == 11) {
                    torrent.link = `https://infire.si/${$(element).find('a').attr('href')}`;
                }
            });

            torrents.push(JSON.parse(JSON.stringify(torrent)));
        }
    });

    await browser.close();

    res.json({
        message: 'success',
        torrents: torrents
    });
});

app.get('/api/torrents/search', cache('10 hours'), async (req, res) => {
    const search = req.query.search;
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    await page.goto('https://infire.si');

    const cookies = [
        {
            name: "hashx",
            value: process.env.HASHX
        },
        {
            name: "pass",
            value: process.env.PASS
        },
        {
            name: "uid",
            value: process.env.UID
        }
    ];

    await page.setCookie(...cookies);

    await page.goto(`https://infire.si/torrents.php?search=${search}`);

    const content = await page.content();
    const $ = cheerio.load(content);

    const torrents = [];
    const torrent = {
        image: '',
        name: '',
        category: '',
        uploaded: '',
        size: '',
        seeders: '',
        leechers: '',
        completed: '',
        link: ''
    };

    $('.lista').children().first().children().each((index, element) => {
        if (index > 4) {
            if ($(element).attr('class') !== 'a') return;
            $(element).children().each((index, element) => {

                if (index == 0) {
                    torrent.image = $(element).find('img').attr('src');
                }
                else if (index == 1) {
                    torrent.name = $(element).find('a').text();
                }
                else if (index == 2) {
                    torrent.category = $(element).find('a').text().split(' ').join(' / ');
                }
                else if (index == 5) {
                    torrent.uploaded = $(element).text();
                }
                else if (index == 6) {
                    const size = $(element).text().split(' ');
                    if (size[1] == 'MiB') {
                        torrent.size = (parseFloat(size[0]) * 1.049).toFixed(2) + ' MB';
                    }
                    else if (size[1] == 'GiB') {
                        torrent.size = (parseFloat(size[0]) * 1.074).toFixed(2) + ' GB';
                    }
                    else if (size[1] == 'KiB') {
                        torrent.size = (parseFloat(size[0]) * 1.024).toFixed(2) + ' KB';
                    }
                    else {
                        torrent.size = $(element).text();
                    }
                }

                else if (index == 8) {
                    torrent.seeders = $(element).find('a').text();
                }

                else if (index == 9) {
                    torrent.leechers = $(element).find('a').text();
                }

                else if (index == 10) {
                    const el = $(element).find('a');
                    if (el.length == 0) {
                        torrent.completed = "Brez podatka";
                    }
                    else {
                        torrent.completed = el.text();
                    }
                }

                else if (index == 11) {
                    torrent.link = `https://infire.si/${$(element).find('a').attr('href')}`;
                }
            });

            torrents.push(JSON.parse(JSON.stringify(torrent)));
        }
    });

    await browser.close();

    res.json({
        message: 'success',
        torrents: torrents
    });
});

app.get('/', (req, res) => {
    const file = String(fs.readFileSync('./public/html/index.html'));
    res.send(file);
});

app.listen(process.env.PORT || 3000, () => console.log(`Lokalni strežnik je zagnan na http://localhost:${process.env.PORT || 3000} !`));
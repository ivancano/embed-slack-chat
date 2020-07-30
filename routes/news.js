var express = require('express');
var router = express.Router();

// XML Reader
const https = require('https');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

/* GET users listing. */
router.get('/:provider', function(req, res, next) {

    const VALID_PROVIDERS = [
        { id: 'blog_swiggy', url: 'https://blog.swiggy.com/feed/' },
        { id: 'bytes_swiggy', url: 'https://bytes.swiggy.com/feed' },
        { id: 'deliveryhero', url: 'https://www.deliveryhero.com/blog/feed/' },
    ];
    const PROVIDER = VALID_PROVIDERS.find((e) => e.id == req.params.provider);
    if(!PROVIDER)
        throw new Error('No valid provider. Possible values: [' + VALID_PROVIDERS.map((i) => i.id).join(',') + ']');

    const RESULTS = [];

    let promises = [];
    // Getting xml from external forums

    promises.push(new Promise((resolve, reject) => {
        https.get(PROVIDER.url, (res) => {
            let data = '';
            res.on('data', (stream) => {
                data += stream;
            });
            res.on('end', () => {
                parser.parseString(data, (error, result) => {
                    if(error === null) {
                        resolve(result.rss.channel[0].item);
                    }
                });
            });
        });
    }));

    Promise.all(promises).then((results) => {
        res.json({
            success: true,
            results
        });
    });
});

module.exports = router;

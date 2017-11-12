const fs = require('fs');
const extras = require('../extras');
const logs = exports;

logs.send = function (req, res, payload, cb) {
    cb(null, JSON.parse(fs.readFileSync(extras.getCurrentLogFilename(), "utf8", (err) => {
        if (err) {
            console.error("Error occured during log read");
        }
    }) + "]"));
};
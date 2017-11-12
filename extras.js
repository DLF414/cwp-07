const fs = require('fs');
const extras = exports;

let seed = 0;

extras.generateId = function () {
    return Date.now() + seed++;
}

extras.saveArticles = function (data) {
    fs.writeFile("articles.json", JSON.stringify(data), "utf8", (err) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log("articles updated");
        }
    });
};
extras.logRequest = function (url, body, time) {
    let result = {
        "time" : time,
        "url" : url,
        "body" : body
    };
    let filename = extras.getCurrentLogFilename();
    fs.appendFile(filename,
        fs.existsSync(filename) ? "," + JSON.stringify(result, null, "\t") : "[" + JSON.stringify(result, null, "\t"),
        (err) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log("log updated");
            }
        });
};

extras.getCurrentLogFilename = function () {
    return "Logs/" + new Date().toISOString().slice(0,10).replace(/-/g,"") + ".txt";
};
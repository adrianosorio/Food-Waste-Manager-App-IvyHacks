const fs = require("fs");
const { TesseractWorker } = require("tesseract.js");
const worker = new TesseractWorker();

fs.readFile(`./screenshot.jpg`, (err, data) => {
    if(err) return console.log('This is your error', err)

    // Worker for tesseract
    worker
    .recognize(data, "eng")
    .progress(progress => {
        // Printing out progress
        console.log(progress);
    })
    .then(result => {
        // Desire result
        console.log(result.text);
    })
    //.finally(() => worker.terminate());
});
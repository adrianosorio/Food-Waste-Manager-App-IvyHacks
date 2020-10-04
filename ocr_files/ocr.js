const fs = require("fs");

// Tesseract constructor
const { TesseractWorker } = require("tesseract.js");
const worker = new TesseractWorker();

/* Call to tesseract */
fs.readFile(`./receipt1.jpg`, (err, data) => {
    if(err) return console.log('This is your error', err)

    // Worker for tesseract
    worker
    .recognize(data, "eng")
    .progress(progress => {
        // Printing out progress
        console.log(progress);
    })
    .then(result => {
        // Desired result being passed to the parsing function
        parseResult(result.text);
    })
});

/* Quick Test of parsing */
// var fh = "bread $5.00\nTax 3323";
// parseResult(fh);

/* Parsing fucntion */
function parseResult(result) {
    // Splitting the lines up so they will be inputted together
    var temp_lines = result.split("\n");

    // Variables used for cleaning
    var new_list = [];
    var i;
    var j;
    var add;

    // Loop through the lines
    for (i = 0; i < temp_lines.length; i++) {
        line = temp_lines[i].split(" ");
        add = true;

        // Loop through the words for each line
        for (j = 0; j < line.length; j++) {
            // Break if tax or tax: are found as we are at the end of items
            if (line[j].toUpperCase() === "TAX" || line[j].toUpperCase() === "TAX:") {
                add = false;
                break;
            }
        }

        // Add the line if it should be added else full break as tax has been seen
        if (add) {
            var last_length = line[j-1].length + 1;
            var term = temp_lines[i].slice(0,-last_length);
            if (term.length > 0) {
                new_list.push(term);
            }
        } else {
            break;
        }
    }

    // Currently just printing it to console.log but can be directed elsewhere
    console.log(new_list);
}
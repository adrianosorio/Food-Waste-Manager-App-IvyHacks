const fs = require("fs");
const { TesseractWorker } = require("tesseract.js");
const worker = new TesseractWorker();

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
        // Desire result
        //console.log(result.text);
        parseResult(result.text);
    })
    //.finally(() => worker.terminate());
});

// var fh = "LONG BEACH CA 90815\nGROCERY\nSIG BREAD FLOUR AC 99s\nSIG SYRUP ORIGINALAC Jnda Ss\nTAX 0.00\n*x%%% BALANCE 5.98";
// parseResult(fh);

function parseResult(result) {

    var temp_lines = result.split("\n");

    var new_list = [];
    var i;
    var j;
    var add;
    for (i = 0; i < temp_lines.length; i++) {
        line = temp_lines[i].split(" ");
        add = true;
        for (j = 0; j < line.length; j++) {
            if (line[j].toUpperCase() === "TAX" || line[j].toUpperCase() === "TAX:") {
                add = false;
                break;
            }
        }
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
    console.log(new_list);
}
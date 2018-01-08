'use strict';

/*
 * IMPORTS
 */

const fs = require('fs');
const readline = require('readline');



/*
 * PARSING
 */

const completeReadFile = function() {
    const filename = "input";
    try {
        const file = fs.readFileSync(filename);
        const result = file.toString().split("\n");
        /* We need to slice the last element since it's always the empty
           string element. */
        return result.slice(0, -1);
    } catch(e) {
        console.error("Unable to read the file.");
        process.exit(1);
    }
}

const Parser = {
    singleLine: function(map) {
        return function() {
            const lines = completeReadFile();

            if (lines.length !== 1) {
                console.error("The file does not contain exactly one line.");
                process.exit(1);
            }

            return map(lines[0]);
        }
    },

    mapLines: function(map) {
        return function() {
            const lines = completeReadFile();
            return lines.map(map);
        }
    },

    allLines: function() {
        return completeReadFile();
    }
}

module.exports.Parser = Parser;



/*
 * SOLVER PART
 */

const solve = function(config) {
    /* Start the timer */
    const start = process.hrtime();

    /* Solve the problem */
    const input = config.parse();
    const result = config.solve(input);

    /* End the timer */
    const elapsed = process.hrtime(start);
    const elapsedMs = (elapsed[0] * 1000) + (elapsed[1] / 1000000);

    /* Displat results */
    console.log("Execution time: " + elapsedMs);
    console.log(result);
}

/* Exports functions */
module.exports.solve = solve;

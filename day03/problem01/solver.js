'use strict';

/*
 * IMPORTS
 */

const aoclib = require('../../common-libs/aoclib.js')
const aocsolver = require('../../common-libs/aocsolver.js')


/*
 * INPUT
 */

const pattern = /(\d+)\W+(\d+)\W+(\d+)/

const extractValues = function(line) {
    const result = pattern.exec(line);
    return [
        parseInt(result[1]),
        parseInt(result[2]),
        parseInt(result[3])
    ];
}


const parse = aocsolver.Parser.reduceLines(0, function(acc, line) {
    const sides = extractValues(line);
    const length = sides.length;

    for (var i = 0; i < length; i++) {
        const side1 = sides[(i + 1) % length];
        const side2 = sides[(i + 2) % length];
        if (side1 + side2 <= sides[i]) {
            return acc;
        }
    }

    return acc + 1;
})

aocsolver.solve({
    parse: parse,
    solve: function(input) {
        return input;
    }
})

'use strict';

/*
 * IMPORTS
 */

const aoclib = require('../../common-libs/aoclib.js')
const aocsolver = require('../../common-libs/aocsolver.js')


/*
 * DATATYPE
 */

const TrianglesCounter = class {
    constructor() {
        this.triangle1 = [];
        this.triangle2 = [];
        this.triangle3 = [];
        this.result = 0;
    }

    evaluateTriangle(triangle) {
        var ok = true;
        for (var i = 0; i < 3; i++) {
            const side1 = triangle[(i + 1) % 3];
            const side2 = triangle[(i + 2) % 3];
            if (side1 + side2 <= triangle[i]) {
                ok = false;
                break;
            }
        }

        if (ok) this.result++;
    }

    clean() {
        this.triangle1 = [];
        this.triangle2 = [];
        this.triangle3 = [];
    }

    pushTriangleSides(sides) {
        this.triangle1.push(sides[0]);
        this.triangle2.push(sides[1]);
        this.triangle3.push(sides[2]);

        if (this.triangle1.length >= 3) {
            for (const triangle of [ this.triangle1, this.triangle2,
                                     this.triangle3 ]) {
                this.evaluateTriangle(triangle);
            }
            this.clean();
        }
    }
}


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

const parserCallback = function(acc, line) {
    const sides = extractValues(line);
    acc.pushTriangleSides(sides);
    return acc;
}


const parse = aocsolver.Parser.reduceLines(new TrianglesCounter(),
                                           parserCallback);

aocsolver.solve({
    parse: parse,
    solve: function(input) {
        return input.result;
    }
})

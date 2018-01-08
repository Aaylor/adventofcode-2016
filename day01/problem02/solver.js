'use strict';

/*
 * IMPORTS
 */

const aoclib = require('../../common-libs/aoclib.js')
const aocsolver = require('../../common-libs/aocsolver.js')



/*
 * DATATYPES
 */

const MOVE = Object.freeze({ LEFT: "LEFT", RIGHT: "RIGHT" });

const Move = class {
    constructor(move, steps) {
        this.move = move;
        this.steps = steps;
    }

    isLeft() {
        return this.move == MOVE.LEFT;
    }
}

const DIRECTION = Object.freeze({
    NORTH: "North",
    SOUTH: "South",
    EAST: "East",
    WEST: "West"
});



/*
 * SOLVER
 */

var direction = DIRECTION.NORTH;
var coordinate = { x: 0, y: 0 };

const nextDirection = function(move) {
    switch(direction) {
    case DIRECTION.NORTH:
        direction = move.isLeft() ? DIRECTION.WEST : DIRECTION.EAST;
        break;
    case DIRECTION.SOUTH:
        direction = move.isLeft() ? DIRECTION.EAST : DIRECTION.WEST;
        break;
    case DIRECTION.EAST:
        direction = move.isLeft() ? DIRECTION.NORTH : DIRECTION.SOUTH;
        break;
    case DIRECTION.WEST:
        direction = move.isLeft() ? DIRECTION.SOUTH : DIRECTION.NORTH;
        break;
    }
}

const nextCoordinate = function(move, seen) {
    for (var i = 0; i < move.steps; i++) {
        /* ES6 Sets does not easily allow custom types since we can't
           provide a custom compare function.
           Just translate all coordinates to a string value, and use it
           as a key... */
        const flat = [ coordinate.x, coordinate.y ].toString();

        if (seen.has(flat)) {
            return true;
        }

        switch(direction) {
        case DIRECTION.NORTH:
            coordinate.y += 1;
            break;
        case DIRECTION.SOUTH:
            coordinate.y -= 1;
            break;
        case DIRECTION.EAST:
            coordinate.x += 1;
            break;
        case DIRECTION.WEST:
            coordinate.x -= 1;
            break;
        }

        seen.add(flat);
    }

    return false;
}

const steps = function() {
    return Math.abs(coordinate.x) + Math.abs(coordinate.y);
}

const solve = function(moves) {
    var seen = new Set();
    for (const move of moves) {
        nextDirection(move);
        if (nextCoordinate(move, seen)) break;
    }
    return steps();
}



/*
 * INPUT
 */

const parse = aocsolver.Parser.singleLine(function(line) {
    const moves = line.split(', ');
    return moves.map(function(rawMove) {
        const result = /([A-Z])(\d+)/.exec(rawMove);
        const steps = parseInt(result[2]);

        var move;
        switch(result[1]) {
        case 'L':
            move = new Move(MOVE.LEFT, steps);
            break;
        case 'R':
            move = new Move(MOVE.RIGHT, steps);
            break;
        default:
            console.error("Unknown move: " + result[0]);
            process.exit(1);
        }

        move.steps = parseInt(result[2]);
        return move;
    });
})

aocsolver.solve({
    parse: parse,
    solve: solve
});

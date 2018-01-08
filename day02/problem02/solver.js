'use strict';

/*
 * IMPORTS
 */

const aoclib = require('../../common-libs/aoclib.js')
const aocsolver = require('../../common-libs/aocsolver.js')



/*
 * DATATYPES
 */

const MOVE = Object.freeze({
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    UP: "UP",
    DOWN: "DOWN"
});



/*
 * SOLVER
 */

const board =
      [ [ null, null, 1, null, null ],
        [ null, 2, 3, 4, null ],
        [ 5, 6, 7, 8, 9 ],
        [ null, 'A', 'B', 'C', null ],
        [ null, null, 'D', null, null ] ]

const maxX = board.length - 1
const maxY = board[0].length - 1 // Assume that this is always a square board.

var coordinate = { x: 2, y: 0 };

const applyMove = function(move) {
    let nextX = coordinate.x;
    let nextY = coordinate.y;
    switch(move) {
    case MOVE.LEFT:
        nextY = coordinate.y > 0 ? coordinate.y - 1 : 0;
        break;
    case MOVE.RIGHT:
        nextY = coordinate.y < maxY ? coordinate.y + 1 : maxY;
        break;
    case MOVE.UP:
        nextX = coordinate.x > 0 ? coordinate.x - 1 : 0;
        break;
    case MOVE.DOWN:
        nextX = coordinate.x < maxX ? coordinate.x + 1 : maxX;
        break;
    default:
        console.error("Unknown move " + move);
        process.exit(1);
    }

    if (board[nextX][nextY] !== null) {
        coordinate.x = nextX;
        coordinate.y = nextY;
    }
}

const solve = function(moves) {
    var code = []
    for (const move of moves) {
        for (const m of move) {
            applyMove(m);
        }
        code += board[coordinate.x][coordinate.y];
    }
    return code;
}



/*
 * INPUT
 */

const parse = aocsolver.Parser.mapLines(function(line) {
    var moves = [];
    for (var i = 0; i < line.length; i++) {
        switch(line.charAt(i)) {
        case 'L':
            moves.push(MOVE.LEFT);
            break;
        case 'R':
            moves.push(MOVE.RIGHT);
            break;
        case 'U':
            moves.push(MOVE.UP);
            break;
        case 'D':
            moves.push(MOVE.DOWN);
            break;
        default:
            console.error("Unknown character.");
            process.exit(1)
        }
    }
    return moves;
})

aocsolver.solve({
    parse: parse,
    solve: solve
});

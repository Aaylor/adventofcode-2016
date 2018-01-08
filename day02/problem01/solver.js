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
      [ [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ] ]

var coordinate = { x: 1, y: 1 };

const applyMove = function(move) {
    switch(move) {
    case MOVE.LEFT:
        coordinate.y = coordinate.y > 0 ? coordinate.y - 1 : 0;
        break;
    case MOVE.RIGHT:
        coordinate.y = coordinate.y < 2 ? coordinate.y + 1 : 2;
        break;
    case MOVE.UP:
        coordinate.x = coordinate.x > 0 ? coordinate.x - 1 : 0;
        break;
    case MOVE.DOWN:
        coordinate.x = coordinate.x < 2 ? coordinate.x + 1 : 2;
        break;
    default:
        console.error("Unknown move " + move);
        process.exit(1);
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

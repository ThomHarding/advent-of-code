const {readFileSync, promises =  fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
//   console.log(arr);
  return arr;
}

let file = syncReadFile('./day12.txt');

let map = [];
let startingPosition = {};
let endingPosition = {};

for (let y = 0; y < file.length; y++) {
    let row = [];
    for (let x = 0; x < file[y].length; x++) {
        let letterHeight = file[y][x].charCodeAt(0);
        //node height progresses linearly with alphabet progression so just use character codes
        if (file[y][x] === 'S') {
            //our starting position that has the same height as a node marked 'a'
            startingPosition = {x,y};
            letterHeight = 'a'.charCodeAt();
        }
        if (file[y][x] === 'E') {
            //our ending position that has the same height as a node marked 'z'
            endingPosition = {x,y};
            letterHeight = 'z'.charCodeAt();
        }
        row.push(letterHeight);
    }
    map.push(row);
}
const toId = (x, y) => `${x},${y}`;

function getNeighbors(x, y) {
    //quick way to get the possible movement options of any given point
    return [
        { x: x, y: y - 1 },
        { x: x - 1, y: y },
        { x: x + 1, y: y },
        { x: x, y: y + 1 },
    ].filter((coord) => typeof map[coord.y]?.[coord.x] !== 'undefined'); //only include points actually on the map
}

function buildFrontier(startingX, startingY) {
    const frontier = [];
    //frontier marks potentially explorable points, initialized to the starting point
    //it is an array of objects with parameters of x and y coordinates
    frontier.push({ x: startingX, y: startingY });
    const came_from = new Map();
    //came_from is the path from the starting point to the end point
    //it is initialized as the starting point alone
    //it is of the format (pointA, pointB) where in our given path, point A was travelled to by point B and A is later on the path
    came_from.set(toId(startingX, startingY), null);
    while (frontier.length > 0) {
        const current = frontier.shift();
        const current_val = map[current.y][current.x];
        //look at where we currently are in the map
        let neighbors = getNeighbors(current.x, current.y);
        for (let next of neighbors) {
            //look at each of its neighbors
            const next_cell = map[next.y][next.x];
            const nextId = toId(next.x, next.y);
            //if the neighbor is at or below our elevation (value) or at most 1 above and *hasn't been visited yet*, move there
            if (next_cell - current_val > 1 || came_from.has(nextId)) {
                continue;
            }
            const currentId = toId(current.x, current.y);
            frontier.push(next);
            console.log(frontier);
            //if we move there, add it to the list of places we've been to on the path and set its key to our current position
            came_from.set(nextId, currentId);
        }
        //effectively, for every point we move to, we mark that we've been there and how we got there, then plan to move to its neighbors
        //we now have a way to get to every point and the path we took to get there
        //and due to our way of creating the paths, they will all be the shortest possible
    }
    return came_from;
}

function getShortestPath(startingX, startingY, endingX, endingY) {
    //dijkstra's, for shorthand
    const startingId = toId(startingX, startingY);
    const endingId = toId(endingX, endingY);
    const came_from = buildFrontier(startingX, startingY);
    let current = endingId;

    let path = [];
    while (current !== undefined && current !== startingId) {
        //as all our paths started from the starting point
        //if we go backwards on our end point path, we'll find the start eventually
        path.push(current);
        current = came_from.get(current);
    }

    //as we worked backwards to find our path, reverse it at the end to make it more readable
    path.reverse();
    return path;
}

const path = getShortestPath(startingPosition.x, startingPosition.y, endingPosition.x, endingPosition.y);
console.log(path.length);
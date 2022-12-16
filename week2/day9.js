//https://gitlab.com/fabianolothor/advent-of-code-solutions/-/blob/main/2022/day9.js
const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
//   console.log(arr);
  return arr;
}

let file = syncReadFile('./day9.txt');
let tails = 9;
let visitedPositions = {};
let knots = [{ x: 0, y: 0 } ]; //each knot is an object in the array that follows one index before it

// Move the head in one of the four directions

function moveHead(direction) {
  switch (direction) {
    case 'U': // UP
      ++knots[0].y;
      break;
    case 'L': // LEFT
      --knots[0].x;
      break;
    case 'R': // RIGHT
      ++knots[0].x;
      break;
    case 'D': // DOWN
      --knots[0].y;
      break;
  }

  moveTail(1);
}

// Move the tails according to the described rules
// @param knot - the position of the knot we move - 1 is just after the head(1 down)
function moveTail(knot) {
  if (knot < 1 || knot > tails) { //the head isn't a tail and we don't move tails we don't have
    return;
  }
  
  if (!knots[knot]) {
    knots[knot] = { x: 0, y: 0 };
    recordVisit(knot);
  }

  let head = knots[knot - 1];
  let tail = knots[knot];
  
  let isDiagonal = head.x !== tail.x && head.y !== tail.y;
  let isTopLeft = head.x < tail.x && head.y > tail.y;
  let isTopRight = head.x > tail.x && head.y > tail.y;
  let isBottomLeft = head.x < tail.x && head.y < tail.y;
  let isBottomRight = head.x > tail.x && head.y < tail.y;

  if (head.x - tail.x < -1) {
    if (isDiagonal) {
      moveTailDiagonally(tail, isTopLeft, isTopRight, isBottomLeft, isBottomRight);
    } else {
      tail.x -= 1;
    }

    recordVisit(knot);
    moveTail(knot + 1);

    return;
  }

  if (head.x - tail.x > 1) {
    if (isDiagonal) {
      moveTailDiagonally(tail, isTopLeft, isTopRight, isBottomLeft, isBottomRight);
    } else {
      tail.x += 1;
    }

    recordVisit(knot);
    moveTail(knot + 1);
    
    return;
  }

  if (head.y - tail.y < -1) {
    if (isDiagonal) {
      moveTailDiagonally(tail, isTopLeft, isTopRight, isBottomLeft, isBottomRight);
    } else {
      tail.y -= 1;
    }

    recordVisit(knot);
    moveTail(knot + 1);
    
    return;
  }

  if (head.y - tail.y > 1) {
    if (isDiagonal) {
      moveTailDiagonally(tail, isTopLeft, isTopRight, isBottomLeft, isBottomRight);
    } else {
      tail.y += 1;
    }

    recordVisit(knot);
    moveTail(knot + 1);
    
    return;
  }
  
  moveTail(knot + 1);
}

// Move the tail diagonally according with the direction

function moveTailDiagonally(tail, ...directions) {
  [isTopLeft, isTopRight, isBottomLeft, isBottomRight] = directions;

  if (isTopLeft + isTopRight + isBottomLeft + isBottomRight > 1) {
    throw 'invalid input';
  }

  if (isTopLeft) {
    tail.x -= 1;
    tail.y += 1;
  }

  if (isTopRight) {
    tail.x += 1;
    tail.y += 1;
  }

  if (isBottomLeft) {
    tail.x -= 1;
    tail.y -= 1;
  }

  if (isBottomRight) {
    tail.x += 1;
    tail.y -= 1;
  }
}

// Record the visited positions

function recordVisit(knot) {
  if (!visitedPositions[knot]) {
    visitedPositions[knot] = {};
  }

  let position = knots[knot].x + '|' + knots[knot].y;
  
  if (Math.abs(knots[knot - 1].x - knots[knot].x) > 1 || Math.abs(knots[knot - 1].y - knots[knot].y) > 1) {
    throw 'invalid input for the knot ' + knot;
  }

  visitedPositions[knot][position] = true;
}

// Execute the movements
for (let i = 0; i < file.length; i++) {
    [direction, movements] = file[i].split(' ');

    for (let index = 0; index < parseInt(movements); ++index) {
        moveHead(direction);
    }
}

//you can simulate all 9 tails for both
//and for part 1, you track the second knot as if it were the tail
let answer1 = Object.keys(visitedPositions['1']).length;
let answer2 = Object.keys(visitedPositions['9']).length;

console.log(answer1, answer2);

const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

//   console.log(arr);

  return arr;
}

let file = syncReadFile('./day4.txt');
let overlapCount = 0;
for (let i = 0; i < file.length - 1; i++) {
    let elves = file[i].split(',');
    let firstStart = Number(elves[0].split('-')[0]);
    let firstEnd = Number(elves[0].split('-')[1]);
    let secondStart = Number(elves[1].split('-')[0]);
    let secondEnd = Number(elves[1].split('-')[1]);
    //part one code
    // if ((firstStart <= secondStart && firstEnd >= secondEnd) || (firstStart >= secondStart && firstEnd <= secondEnd)) {
        // overlapCount++
    // }
    //part two code
    //to be honest: i don't really understand this logic
    //i have the starting and ending numbers and checking for overlaps seems trivial but the actual greater thans and just don't make sense
    //no real idea why
    if ((firstStart <= secondStart && firstEnd >= secondEnd)
    || (firstStart >= secondStart && firstEnd <= secondEnd)
    || (firstStart <= secondEnd && secondStart <= firstEnd)) {
        overlapCount++;
  }
}

console.log('overlaps:', overlapCount);
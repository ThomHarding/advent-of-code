const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  return arr;
}

let file = syncReadFile('./input2.txt');
let matches = [];
let currMatch = [];
for (let i = 0; i < file.length + 1; i++) {
    if (file[i] === '') {
        matches.push(currMatch);
        currMatch = [];
    } else {
        currMatch.push(file[i]);
    }
}
let score = 0;


for (let i = 0; i < matches[0].length; i++) {
    console.log('da match', matches[0][i])
    if (matches[0][i][2] === 'X') { //lose
        score += 0;
        if (matches[0][i][0] === 'A') { //rock
            score += 3; //scissors
        }
        if (matches[0][i][0] === 'B') { //paper
            score += 1; //rock
            //lose
        }
        if (matches[0][i][0] === 'C') { //scissors
            score += 2;//win
        }
    }
    if (matches[0][i][2] === 'Y') { //draw
        score += 3;
        if (matches[0][i][0] === 'A') { //rock
            score += 1;//rock
        }
        if (matches[0][i][0] === 'B') { //paper
            score += 2; //paper
        }
        if (matches[0][i][0] === 'C') { //scissors
            score += 3; //scissors
            //lose
        }
    }
    if (matches[0][i][2] === 'Z') { //win
        score += 6;
        if (matches[0][i][0] === 'A') { //rock
            score += 2; //paper
            //lose
        }
        if (matches[0][i][0] === 'B') { //paper
            score += 3;//scissors
        }
        if (matches[0][i][0] === 'C') { //scissors
            score += 1; //rock
        }
    }
}
//matches.sort(function(a, b){return b-a}); descending sort
console.log(score);
// console.log(Math.max(...matches));
// console.log('da answer', (matches[0]+matches[1]+matches[2]))
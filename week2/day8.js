const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents;

//   console.log(arr);

  return arr;
}

let file = syncReadFile('./day8.txt');
let data = [];
let tempData = [];
for (let i = 0; i < file.length; i++) {
    if (file[i] == '\n') {
        data.push(tempData);
        tempData = [];
    } else {
        tempData.push(file[i]);
    }
}
tempData.pop();
data.push(tempData);
//as there's no new row marker after the last row,
//it finishes looping before the last row is in data so push in the last bit of temp data

//we can now navigate by row and column; data[column][row] = the height of index X across and index Y down

function checkVisible(x,y) {
    let value = Number(data[y][x]);
    //check left
    let checker = x - 1; //the x coordinate of the spot to the left we're comparing height to
    while (checker >= 0) {
        if (Number(data[y][checker]) >= value) {
            //if it's taller, there's no point going any further, it's not visible left
            break;
        } else {
            if (checker == 0) { //if we're at index 0, we're at the treeline, and it's visible
                return true;
            } // else we have a bit more to check so we look one space further to the left
            checker--;
        }
    }
    //check right
    checker = x + 1;
    while (checker <= data.length - 1) {
        if (Number(data[y][checker]) >= value) {
            break;
        } else {
            if (checker == data.length - 1) {
                return true;
            }
            checker++;
        }
    }
    //check up
    checker = y - 1;
    while (checker >= 0) {
        if (Number(data[checker][x]) >= value) {
            break;
        } else {
            if (checker == 0) {
                return true;
            }
            checker--;
        }
    }
    //check down
    checker = y + 1;
    while (checker <= data.length - 1) { //this took me longer than it had any reason to. writing -1 is hard. genuinely over an hour. help
        if (Number(data[checker][x]) >= value) {
            break;
        } else {
            if (checker == data.length - 1) {
                return true;
            }
            checker++;
        }
    }
    return false;
}


//all trees on the outside will be visible. thus, we can start with the top row, the bottom row, and the left and right columns minus the corners
let visible = (data.length * 2) + (data[0].length * 2) - 4;

// from there, i will just check every tree to see if it is visible. o(n) which could be worse
for (let i = 1; i < data.length - 1; i++) { //each row. starting at 1 because we know about the outside
    for (let j = 1; j < data[i].length - 1; j++) { //each column in that row
        if (checkVisible(i,j)) {
            visible++;
        }
    }
}
console.log('total visible: ', visible);

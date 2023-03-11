const {readFileSync} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
//   console.log(arr);
  return arr;
}

let file = syncReadFile('./day13.txt');
let rightOrderPairs = 0;

for (let i = 0; i < file.length; i = i + 3) {
    //for every 3 lines, the first is the first packet, the second is the second, and then a blank line
    let leftList = JSON.parse(file[i]);
    let rightList = JSON.parse(file[i+1]);
    if (compare(leftList, rightList)) {
        rightOrderPairs++;
    }
}

function compare (leftList, rightList) {
    //if the size of the lists are different, no need to compare the values within
    if (leftList.length > rightList.length) {
        return true;
    } else if (leftList.length < rightList.length) {
        return false;
    }
    for (let i = 0; i < leftList.length; i++) {
        let left = leftList[i];
        let right = rightList[i];


        }
    //for each, they're in the right order if:
        if (typeof left === 'number' && typeof right === 'number') {
        //if both integers:
            if (left < right) {
                //the left number should be bigger than the right
                return true;
            } else if (left > right) {
                return false;
            } else {
                continue;
            }
            //if both are lists
            if (Array.isArray(li) && Array.isArray(ri)) {
                //recursion time, compare each of the items inside the lists
                let substep = compare(li, ri,);
                if (substep !== null) {
                    return substep;
                }
            //if only one is an integer
            } else if (Array.isArray(left) && !Array.isArray(right)) { 
                //recur, but look inside the one that's an array to compare   
                let substep = compare(left, [right]);
                if (substep !== null) {
                    return substep;
                }
            
            } else if (!Array.isArray(left) && Array.isArray(right)) {   
                let substep = compare([left], right);
                if (substep !== null) {
                    return substep;
                }
            }
        //else they're somehow even. this shouldn't happen i think
        return null;
    }
}


console.log('part 2: ');
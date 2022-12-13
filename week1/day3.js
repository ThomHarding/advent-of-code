const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

//   console.log(arr);

  return arr;
}

let file = syncReadFile('./day3.txt');
let rucksacks = [];
//the rucksacks(each line) have two compartments: the first half and second half
// so each is an array of two arrays of components
let currSack = [];
for (let i = 0; i < file.length - 1; i++) {
    //for each rucksack
    let half_length = Math.ceil(file[i].length / 2);    
    let leftComponent = file[i].slice(0,half_length);
    let rightComponent = file[i].slice(half_length, file[i].length);
    currSack[0] = leftComponent;
    currSack[1] = rightComponent;
    rucksacks.push(currSack);
    currSack = [];
}
//each of these has a "priority" of its letter value + 26 if capital
//'a' = 1, 'A' = 27, 'b', = 2, 'B' = 28, etc
let prioritySum = 0;

function getPriorityOfLetter(num) {
    let abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w',
                        'x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    return abc.indexOf(num) + 1;
}

function findCommonChars(strings) {
    //given an input array of strings named 'strings'
    //returns basically the first array filtered to only
    //what other strings in the input also contain
    let res = [...strings[0]]; //pick the first element of the array
    for (let i = 1; i < strings.length; i++) {
      res = res.filter(c => { //filter each letter unless it's contained in strings[i]
        const previousLength = strings[i].length;
        strings[i] = strings[i].replace(c, "");
        return previousLength > strings[i].length;
      });
    }
    return res[0];
  };

for (let i = 0; i < rucksacks.length; i++) {
    //step one: find the item
    let commonCharacter = findCommonChars(rucksacks[i]);
    prioritySum += getPriorityOfLetter(commonCharacter);
}

console.log('part 1 answer', prioritySum);
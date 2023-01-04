const {readFileSync, promises =  fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
//   console.log(arr);
  return arr;
}

let file = syncReadFile('./day11.txt');

let monkeys = [];

for (let i = 0; i < file.length; i+=7) {
    let newMonkey = {};

    newMonkey.items = file[i + 1].replace('Starting items: ', '').split(', ').map(itemWorryLevel => parseInt(itemWorryLevel)),
    newMonkey.operation =  file[i + 2].replace('  Operation: new = ', ''),
    newMonkey.isDivisibleBy =  parseInt(file[i + 3].replace('Test: divisible by ', '')),
    newMonkey.isTrueMonkey =  parseInt(file[i + 4].replace('If true: throw to monkey ', '')),
    newMonkey.isFalseMonkey =  parseInt(file[i + 5].replace('If false: throw to monkey ', '')),
    newMonkey.itemsInspected =  0,

    monkeys.push(newMonkey)
    // console.log(newMonkey)
}

function operate(operation, item) {
   return eval(operation.replace(/old/g, item))
   //monkey.operation is a string that spells out the math we want and eval() lets us run that string as a math operation
}

function inspectItem(monkey, itemValue) {
    let all_divisors = monkeys.map((monkey) => monkey.isDivisibleBy).reduce((a, b) => a * b, 1);
    //this line makes my brain hurt. thank you advent of code reddit and u/heyitsmattwade in particular
    //so a couple thousand rounds in, the numbers start getting too large to calculate and the divisible by math breaks down.
    //heyitsmattwade breaks it down better but effectively, we know that a % n = a at some point early on we want to shrink numbers.
    //a is our current item value and n is the lowest common multiple of all our items. (I think. I might be wrong)
    //despite being equivalent, a % n is a much smaller number than just a and we can save just the remainder, the math still works out
    //we just do this 'modular arithmetic' to every 'congruent relation' (scare quotes intentional) every time we look at an item to keep item values low.
    //the end result is that every time we inspect an item, we run item value = item value mod lowest common multiple and it lowers it to reasonable levels
    let item = Math.floor(operate(monkey.operation, itemValue)); //divide by 3 for part 1 isntead of this 35 and 44
    item = item % all_divisors;
    if ((item % monkey.isDivisibleBy) === 0) {
        //beyond this, just pass to trueMonkey if itemvalue is divisble by the monkey's divisibleBy score, and pass to falseMonkey if it isn't
        monkeys[monkey.isTrueMonkey].items.push(item);
    } else {
        monkeys[monkey.isFalseMonkey].items.push(item);
    }
}

for (let i = 0; i < 10000; i++) { //i < 20 for p1
    for (let j = 0; j < monkeys.length; j++) { //check every item of every monkey
        for (let t = 0; t < monkeys[j].items.length; t++) {
            monkeys[j].itemsInspected++; //count every time a monkey inspects for answer purposes
            inspectItem(monkeys[j], monkeys[j].items[t]); //the big math
        }
        monkeys[j].items = []; //monkey will always throw away all his items midround but i don't want to change the list while going through it
    }
}

monkeys.sort((m1, m2) => m2.itemsInspected - m1.itemsInspected);
// console.log(monkeys);
console.log(monkeys[0].itemsInspected * monkeys[1].itemsInspected)
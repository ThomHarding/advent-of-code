const { match } = require('assert');
const {readFileSync, promises =  fsPromises} = require('fs');
const { type } = require('os');

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
}

function inspectItem(monkey, itemValue) {
    let item = Math.floor(operate(monkey.operation, itemValue) / 3);
    if ((item % monkey.isDivisibleBy) === 0) {
        monkeys[monkey.isTrueMonkey].items.push(item);
    } else {
        monkeys[monkey.isFalseMonkey].items.push(item);
    }
}

for (let i = 0; i < 20; i++) { //i < 20
    for (let j = 0; j < monkeys.length; j++) {
        for (let t = 0; t < monkeys[j].items.length; t++) {
            monkeys[j].itemsInspected++;
            inspectItem(monkeys[j], monkeys[j].items[t]);
        }
        monkeys[j].items = []; //monkey will always throw away all his items midround but i don't want to change the list while going through it
    }
}

monkeys.sort((m1, m2) => m2.itemsInspected - m1.itemsInspected);
// console.log(monkeys);
console.log(monkeys[0].itemsInspected * monkeys[1].itemsInspected)
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
    console.log(newMonkey)
}

function operate(operation, item) {
    // console.log('operation being done', operation.replace(/old/g, item), operation, item)
   return eval(operation.replace(/old/g, item))
}

function inspectItem(monkey, itemIndex) {
    let item = monkey.items[itemIndex];
    console.log('item?', item)
    item = operate(monkey.operation, item);
    item = Math.floor(item / 3);
    if ((item % monkey.isDivisibleBy) === 0) {
        monkeys[monkey.isTrueMonkey].items.push(item);
        // console.log('true monkey', monkeys[monkey.isTrueMonkey]);
    } else {
        monkeys[monkey.isFalseMonkey].items.push(item);
        // console.log('false monkey', monkeys[monkey.isFalseMonkey]);
    }
    monkey.items.splice(itemIndex, 1);
}

for (let i = 0; i < 20; i++) {
    for (let j = 0; j < monkeys.length; j++) {
        console.log(monkeys[j].items)
        for (let t = 0; t < monkeys[j].items.length; t++) {
            console.log('what', t, monkeys[j].items, monkeys[j].items.length)
            //they're only inspecting the first item?
            monkeys[j].itemsInspected++;
            inspectItem(monkeys[j], t);
        }
        console.log('monkey ', j, ' done')
    }
    console.log('round ',i,' done')
}

monkeys.sort((m1, m2) => m2.itemsInspected - m1.itemsInspected);

console.log(monkeys[0].itemsInspected * monkeys[1].itemsInspected)
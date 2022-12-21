const { match } = require('assert');
const {readFileSync, promises: fsPromises} = require('fs');
const { type } = require('os');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
//   console.log(arr);
  return arr;
}

let file = syncReadFile('./day10.txt');
let cycle = 1;
let x = 1;
let strength = 0;
let totalStrength = 0;

let screen = [];

for (let j = 0; j < 6; j++) {
    let row = [];
    for (let i = 0; i < 40; i++) {
        row.push(' ')
    }
    screen.push(row);
}
//screen is a 40x6 of empty pixels

function addCycle() {
    if (Math.abs(x - ((cycle - 1) % 40)) <= 1) {
        screen[Math.ceil(cycle/40) - 1][((cycle - 1) % 40)] = '█';
    }
    setSignalStrength();
    if ((cycle === 20) || (cycle === 60) || (cycle === 100) || (cycle === 140) || (cycle === 180) || (cycle === 220)) {
        totalStrength += strength;
    }
    cycle++;
}

function setSignalStrength() {
    strength = cycle * x;
}

function addX(v) {
    addCycle();
    addCycle();
    x += v;
}

function noop() {
    addCycle();
}

for (let i = 0; i < file.length; i++) {
    if (file[i].startsWith('noop')) {
        noop();
    } else {
        addX(Number(file[i].substring(5, file[i].length)))
    }
}

console.log('total: '+totalStrength)
let readout = screen.join('\n').replaceAll(',', '');
console.log(readout);
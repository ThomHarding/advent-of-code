const {readFileSync, promises: fsPromises} = require('fs');

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

function addCycle() {
    setSignalStrength();
    if ((cycle === 20) || (cycle === 60) || (cycle === 100) || (cycle === 140) || (cycle === 180) || (cycle === 220)) {
        // console.log('x at ', cycle, ' = ',x)
        // console.log('signal strength at ', cycle, ' = ',strength);
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
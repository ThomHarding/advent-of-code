const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

//   console.log(arr);

  return arr;
}

const PACKET_LENGTH = 14; // 4 in part 1

let markerIndex = 0;

let file = syncReadFile('./day6.txt')[0];

for (let i = 0; i < file.length - 1; i++) {
    let potentialMarker = [];
    for (let j = 0; j < PACKET_LENGTH; j++) { //check the next PACKET_LENGTH amount of numbers using potentialMarker
        potentialMarker.push(file[i + j]);
    }
    let setMarker = new Set(potentialMarker); //sets can only be unique, so if we make a set of our array, it will shrink unless already unique
    if (potentialMarker.length == setMarker.size)  {
        markerIndex = i + PACKET_LENGTH;
        //so we can just record the index we found and stop everything
        break
      }
    }

console.log('marker index:', markerIndex);

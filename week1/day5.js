const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    //console.log(arr);
    return arr;
}

let file = syncReadFile('./day5.txt');

let crane = ""
let result = ""
let stack = [[], []] // representing all columns of crates
let counter = 1 // rather than 0

function createStack() { //creates the initial state of the stack representing the creates
    file.forEach(line => {
        counter = 1 // reset counter
            for (c = 0; c < line.length; c+=4) { // c+=4 each column is 4 characters wide
                if (line[c+1] !== " " && isNaN(Number(line[c+1]))) { // ignore empty and numbered lines
                    stack[counter].push(line[c+1]) // add crate
                }
                if (stack[0][0] == null)  {
                    stack.push([])
                } // create a new empty column
                counter++
            }
    })
    let stackFiltered = stack.filter(e => { // remove empty crates
        return e != null && e != '' && e != []
    })
    return stackFiltered;
}

// function part1Movements(stack) { 
//     for (let i = 11; i < file.length - 1; i++) {
//         let details = file[i].split(" ")
//         let quantity = details[1]; // how many crates to move
//         let from = details[3]; // from where
//         let to = details[5]; // to where
//         for (j = 0; j < quantity; j++) {
//           crane = stack[from-1].shift() // remove from top of current column
//           stack[to-1].unshift(crane) // add to top of new column
//         }
//     }

//     for (i = 0; i < stack.length; i++) { // get top crate from each column
//         result += stack[i].shift()
//     }

//     console.log("Part 1 answer: ", result)
// }

function part2Movements(stack) {
    //basically: part 1 movement but multiple things stored in temp at once
    //still shift to stack crates in reverse, but use .reverse to pretend they're moved in order
    for (i = 0; i < file.length; i++) { // get top crate from each row
        let details = file[i].split(" ");
        let quantity = details[1]; // how many crates to move
        let from = details[3]; // from where
        let to = details[5]; // to where
        for (j = 0; j < quantity; j++) {
            // console.log(stack[from-1])
            crate = stack[from-1].shift() // remove from top of current row
            if (crate !== "" || crate !== undefined) {
                crane += crate // add crates to crane
                crate = "" // reset
            }
            if (j == quantity -1) { // when full, add crane to stack
                crane = crane.split("").reverse().join("") // reverse order of crane before adding to new stack
                crane.split("").forEach(crate => {
                    stack[to-1].unshift(crate) // add to top of new row
                })
                crane = "" // reset
            }
        }
    }
    file.forEach(line => {
      if (line[0] == "m") { // example: move 1 from 4 to 1
        
        }
    })
    for (i = 0; i < stack.length; i++) { // get top crate from each row
        result += stack[i].shift()
    }
    console.log("Part 2 answer: ", result)
}

// part1Movements(createStack())
part2Movements(createStack())
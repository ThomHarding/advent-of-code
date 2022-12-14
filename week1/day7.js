const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'day7.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

//there are two main classes in this 'computer' we're building: directories and files

//files exist with a name, size, and a way to access the size
class File {
	constructor(name, size) {
		this.name = name;
		this.filesize = size;
	}

	getSize() {
		return this.filesize;
	}
}

//directories have their parents, children, and a calculation of their total size
//those parents will be directories but the children can be directories or files
class Directory {
	constructor(name, parentDir) {
		this.isDir = true;
		this.parentDir = parentDir;
		this.name = name;
		this.children = [];
	}

	getSize(ignore) {
        //either returns a number or nothing if ignore is true(so it's a directory and has no innate size)
		if (ignore === this) {
			return 0;
		}

		return this.children.map((v) => v.getSize(ignore)).reduce((a, b) => a + b, 0);
        //Map looks over each element and reduce adds the result of their getSizes together
        //so we end up with one total sum that is the result of running getSize on every element
	}
}

//the actual implementation of all the instructions we get
//one root directory and a way to build out the subdirectories
class Filesystem {
	constructor(instructions) {
		this.rootDir = new Directory('/', null);
		this.build(instructions);
	}

	getSize(ignore) {
        //rootDir, being a Dir, has a getSize we can call to get the whole tree
		return this.rootDir.getSize(ignore);
	}

	build(instructions) {
		let currentDir = this.rootDir;
		for (let line of instructions) {
            //there are two instructions we will get and the line will start with: cd and ls. everything else is output
			if (line.startsWith('$ cd')) {
                //move our currentDir to wherever cd tells us so children we insert will be accurate
				const [, dir] = /\$ cd (.+)$/.exec(line);
				if (dir === '/') {
					currentDir = this.rootDir;
				} else if (dir === '..') {
					currentDir = currentDir.parentDir;
				} else {
					currentDir = currentDir.children.find((v) => v.isDir && v.name === dir);
				}
			} else if (line.startsWith('$ ls')) {
				continue;
                //'move to the next line' and we know it will be output
			} else {
            //all of this is ls output
				if (line.startsWith('dir ')) {
                    //each dir only gets displayed once so if we get a dir display we must make it and insert it into the filesystem
					const [, dirName] = /dir (.+)$/.exec(line);
					const newDir = new Directory(dirName, currentDir);
					currentDir.children.push(newDir);
				} else {
					//if it's not a dir, it's a file, which we also have to make
					let [, size, fileName] = /(\d+) (.+)$/.exec(line);
					size = parseInt(size, 10);

					const newFile = new File(fileName, size);
					currentDir.children.push(newFile);
				}
			}
		}
	}

    //This is a generator function that tells us how to parse through a Filesystem
    //Effectively: give whatever is iterating over us all our children, and if our child is a directory,
        //recursively iterate over its children too
	static *walk(dir) {
		for (let c of dir.children) {
			yield c;
			if (c.isDir) {
				yield* Filesystem.walk(c);
			}
		}
	}
    //this bit is the section you recur over

	*[Symbol.iterator]() {
		yield* Filesystem.walk(this.rootDir);
	}
    //this bit is the base that starts by looking at rootDir
}

const drive = new Filesystem(input);
const dirs = [...drive].filter((v) => v.isDir);

// Part one: looking for the sum of all directories with size over 100000
let smallDirsSum = 0;
for (let item of dirs) {
	let size = item.getSize();
	if (size <= 100000) {
		smallDirsSum += size;
	}
}

// Part two: looking for the smallest directory that is at least 30000000 size
let couldWork = new File('dummy', Number.MAX_VALUE);
const DRIVE_SIZE = 70000000;
for (let someDir of dirs) {
	const sizeWithoutSomeDir = drive.getSize(someDir);
	const unusedSpace = DRIVE_SIZE - sizeWithoutSomeDir;
	if (unusedSpace >= 30000000) {
		if (someDir.getSize() < couldWork.getSize()) {
			couldWork = someDir;
		}
	}
}

console.log('Part One:', smallDirsSum);
console.log('Part Two:', couldWork.getSize());

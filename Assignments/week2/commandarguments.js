// How to get arguments form the command line when execturing js script

let args = process.argv;


let request = args[2];

if (request == "hello"){
    console.log('Hello to you too')
}
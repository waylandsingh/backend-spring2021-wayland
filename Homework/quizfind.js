// Find function 
// Using strict equals (===) to avoid '1' match 1 and similar


let quizFind = (valueArray, target, verbose=false) => {
    if (typeof valueArray === 'object'){
        
        if (verbose) {console.log('searching for target in the value array');}     
        
        let found = -1
        for (let i = 0; i < valueArray.length; i++) {
            if (valueArray[i] === target) { // type coercion issues?
                found = i
                return found
            } 
        }
        
        return found;
    }

    else {
        console.log('Please try again with a proper array of values')
    }
}
// making sure quizFind works ok ( no weird type situations yet)
// quizFind([0,0,0,0,1,2], 1)
// quizFind([0,0,0,0,1,2], '1')

let quizLotto = () => {
    // console.log('quizlotto working');
    let ticket = [0, 0, 0, 0, 0, 0];

    let balls = [...Array(60).keys()];
    balls.shift();
    // console.log(balls);

    // occasional undefined behavior (length of array not updating in sync?)
    // for (let i = 0; i < 5; i++) {
    //     let draw = Math.floor(Math.random() * balls.length + 1)
    //     console.log(draw)
    //     ticket[i] = balls.splice(draw, 1)[0];
    // }

    let j = 0;
    let draw = -1;
    let drawVal = -1;
    while (ticket[4] === 0){
        draw = Math.floor(Math.random() * 60 + 1);
        drawVal = balls[draw]

        if (!(quizFind(balls, drawVal) == -1)) {
            ticket[j] = drawVal
        }

        j += 1;
    }

    ticket[5] = Math.floor(Math.random() * (35) + 1);

    return ticket;
}


console.log(quizLotto());
console.log(quizLotto());
console.log(quizLotto());
console.log(quizLotto());
console.log(quizLotto());
console.log(quizLotto());
console.log(quizLotto());
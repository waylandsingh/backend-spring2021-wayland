class Vehicle {
    constructor(make, model, year, color) {
        this.make = make;
        this.model = model;
        this.year = year; //Note integer type implied here
        this.color = color; 
    }
}

class Car extends Vehicle {
    constructor(make, model, year, color, mpg, mileage, monthsServicedAgo) {
        super(make, model, year, color); // calls the parent class with params
        this.mpg = mpg;
        this.mileage = mileage;
        this.monthsServicedAgo = monthsServicedAgo;
    }

    nextService() {
        console.log(`Your next service should be in ${6 - this.monthsServicedAgo} months`)
    }

    getService() {
        console.log('Months since last sevice:')
        console.log(this.monthsServicedAgo)
    }

    //use this to modify service instead of modifying directly below
    setService(newMonths) {
        this.monthsServicedAgo = parseFloat(newMonths);
    }

    travel(miles) {
        // sanitize this input?
        this.mileage += miles;
        console.log(`${this.make} ${this.model} has traveled ${miles} bringing its mileage to ${this.mileage}`)
    }
}

let car1 =  new Car('Honda','Fit', 2009, 'silver', 27, 100000, 1);
car1.nextService();
car1.setService(12);
car1.getService();
// Exercise: Implement a simple class hierarchy with inheritance

// Base class
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        return `${this.make} ${this.model} has started.`;
    }

    stop() {
        this.isRunning = false;
        return `${this.make} ${this.model} has stopped.`;
    }

    getInfo() {
        return `${this.year} ${this.make} ${this.model}`;
    }
}

// Subclass inheriting from Vehicle
class Car extends Vehicle {
    constructor(make, model, year, doors = 4) {
        // Call the parent constructor
        super(make, model, year);
        this.doors = doors;
        this.type = 'car';
        this.wheels = 4;
    }

    // Override parent method
    getInfo() {
        return `${super.getInfo()}, ${this.doors}-door ${this.type}`;
    }

    // New method specific to Car
    honk() {
        return "Beep beep!";
    }
}

// Another subclass inheriting from Vehicle
class Motorcycle extends Vehicle {
    constructor(make, model, year, hasWindshield = false) {
        super(make, model, year);
        this.hasWindshield = hasWindshield;
        this.type = 'motorcycle';
        this.wheels = 2;
    }

    // Override parent method
    getInfo() {
        const windshieldInfo = this.hasWindshield ? "with" : "without";
        return `${super.getInfo()}, ${this.type} ${windshieldInfo} windshield`;
    }

    // New method specific to Motorcycle
    revEngine() {
        return "Vroom vroom!";
    }
}

// Third-level inheritance - specialized motorcycle
class SportBike extends Motorcycle {
    constructor(make, model, year, topSpeed, hasWindshield = false) {
        super(make, model, year, hasWindshield);
        this.topSpeed = topSpeed;
        this.type = 'sport bike';
    }

    // Override method from Motorcycle
    getInfo() {
        return `${super.getInfo()}, capable of ${this.topSpeed} mph`;
    }

    // Override method from Motorcycle
    revEngine() {
        return "VROOOOM! VROOOOM!";
    }
}


// use the classes like below

// Create instances of each class
const genericVehicle = new Vehicle("Generic", "Transport", 2023);
const sedan = new Car("Toyota", "Camry", 2022);
const coupe = new Car("Honda", "Civic", 2023, 2);
const cruiser = new Motorcycle("Harley-Davidson", "Street Glide", 2021, true);
const sportBike = new SportBike("Kawasaki", "Ninja", 2023, 186, false);

// Test the inheritance
console.log(genericVehicle.getInfo());
// Output: "2023 Generic Transport"

console.log(sedan.getInfo());
// Output: "2022 Toyota Camry, 4-door car"

console.log(coupe.getInfo());
// Output: "2023 Honda Civic, 2-door car"

console.log(cruiser.getInfo());
// Output: "2021 Harley-Davidson Street Glide, motorcycle with windshield"

console.log(sportBike.getInfo());
// Output: "2023 Kawasaki Ninja, sport bike without windshield, capable of 186 mph"

// Test method inheritance
console.log(sedan.start());
// Output: "Toyota Camry has started."

// Test class-specific methods
console.log(sedan.honk());
// Output: "Beep beep!"

console.log(cruiser.revEngine());
// Output: "Vroom vroom!"

console.log(sportBike.revEngine());
// Output: "VROOOOM! VROOOOM!"

// Check that instanceof works properly
console.log(sportBike instanceof SportBike);    // true
console.log(sportBike instanceof Motorcycle);   // true
console.log(sportBike instanceof Vehicle);      // true
console.log(sedan instanceof Motorcycle);       // false
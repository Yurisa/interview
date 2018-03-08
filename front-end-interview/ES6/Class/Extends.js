class Animal{
    constructor(name){
        this.name = name;
    }

    eat(){
        console.log(`${this.name} eat`);
    }
}

class Dog extends Animal{
    constructor(name){
        super(name);
        this.name = name;
    }

    say(){
        console.log(`${this.name} say` );
    }
}

const d = new Dog("hashiqi");
console.log(d.eat())
console.log(d.say())
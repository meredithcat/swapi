class Planet {
  constructor(json) {
    this.name = json.name;
  }

  getName() {
    return `my name is ${this.name}`;
  }
}

class Something {
  getX() {return 1;}
  getY() {return 2;}
}

let p = new Planet({name: 'tatooine'});
p = "hello";

const intFuncs = [];

intFuncs.push((x) => 2*x);
intFuncs.push((x) => x*x);

//intFuncs.push((x) => x.toString());

let total = intFuncs.reduce((acc, func) => acc + func(10));
console.log(total);

let z;
z = new Planet({});
z.
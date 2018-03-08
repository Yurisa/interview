class MathHandle{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(){
        return this.x + this.y;
    }

    test(){
        return 100;
    }
}
console.log(MathHandle);
console.log(MathHandle === MathHandle.prototype.constructor);
console.log(MathHandle.prototype.test());
var a = new MathHandle(1, 2);
console.log(a.add());
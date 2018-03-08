(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var util = {
    a: 100
};

function fn1() {
    alert("fn1");
}

function fn2() {
    alert("fn2");
}

console.log(util);
fn1();
fn2();

})));

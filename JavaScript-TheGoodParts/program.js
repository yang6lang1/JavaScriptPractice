document.writeln('Hello World!');

Function.prototype.method = function (name, func) {
	if(!this.prototype[name]){
		this.prototype[name] = func;
	}
};

var add = function(a, b){
	return a + b;
}

//Do some testing
var o1 = {
	attr1 : "hello",
	attr2 : "world",
	attr4 : {
		superman1: "Alex"
	}
}

try{
	document.writeln(o1.attr3.superman);	
}
catch(e){
	document.writeln(e.name+":");
	document.writeln(e.message);
};
document.writeln();


if(typeof Object.create !== 'function'){
	Object.create = function(o){
		var F = new function(){};
		F.prototype = o;
		return new F();
	};
}

var another_o1 = Object.create(o1);
document.writeln(o1.attr1);
document.writeln(o1.attr2);
document.writeln();

if(typeof another_o1.attr1 === 'undefined'){
	document.writeln("this attribute does not exist");
}
else{
	document.writeln("this attribute exists");	
	if(another_o1.hasOwnProperty("attr1")){
		document.writeln("attr1 is the object's own property.");
	}
	else{
		document.writeln("attr1 is not the object's own property.");
	}
}
document.writeln();

for(name in another_o1){
	if(typeof another_o1[name] !== 'function'){
		document.writeln(name + ": "+ another_o1[name]);
	}
}
document.writeln();

another_o1.attr1 = "another hello";
document.writeln(another_o1.attr1);
delete another_o1.attr1;
document.writeln(another_o1.attr1);
another_o1.attr1 = "another hello";
delete o1.attr1;
document.writeln(another_o1.attr1);
delete another_o1.attr1;
document.writeln(another_o1.attr1);
document.writeln();


//The method invocation pattern
var myObject = {
	value: 0,
	increment: function(inc){
		this.value += typeof inc === 'number'? inc : 1;
	},
	getValue: function(){
		return this.value;
	}
};
document.writeln(myObject.value);
myObject.increment();
document.writeln(myObject.value);
myObject.increment(3);
document.writeln(myObject.value);
document.writeln();


//The function invocation pattern
myObject.double = function(){
	var that = this;
	var helper = function(){
		that.value = add(that.value, that.value);
	};

	helper(); //invoke helper as a function
};
myObject.double();
document.writeln(myObject.getValue());
document.writeln();


//The constructor invocation pattern
//Create a constructor function called Quo
//It makes an object with a status proeprty
var Quo = function(string){
	this.status = string;
};

//Give all instances of Quo a public method
//called get_status
Quo.prototype.get_status = function(){
	return this.status;
}

//make an instance of Quo
var myQuo = new Quo("confused");
document.writeln(myQuo.get_status());
document.writeln();



//***Important***
//The apply invocation pattern
var array = [3, 4];
var sum = add.apply(null, array);

//Make an object with a staus member.
var statusObject = {
	status : "OK"
};

//statusObject does not inherit from Quo.prototype,
//but we can invoke the get_status method on
//statusObject even though statusObject does not have
//a get_status method.
var status = Quo.prototype.get_status.apply(statusObject);
document.writeln(status);
document.writeln();


//Arguments
//Make a function that adds a lot of stuff
var sum = function(){
	var i, sum = 0;
	for(i = 0; i < arguments.length; i++){
		sum += arguments[i];
	}
	return sum;
};
document.writeln(sum(1,2,3,4,5));
document.writeln();


//Exception
var add2 = function(a, b){
	if (typeof a !== 'number' || typeof b !== 'number'){
		throw {
			name: 'TypeError',
			message: 'Add function needs numbers'
		};
	}
	return a + b;
};

var try_add2 = function(){
	try{
		add2('a', 'b');
	}
	catch(e){
		//we can inpect the name of the exception to determine its type
		document.writeln(e.name + ": "+e.message);
	}
};
try_add2();
document.writeln();


//augmenting types
//Add an integer method to Number.prototype which extract the integer part of a number
Number.method('integer', function(){
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});

document.writeln((-10 / 3).integer());

//remove spaces from the ends of a string. It uses regular expression
String.method('trim', function(){
	return this.replace(/^\s+|\s+$/g, '');
});
document.writeln('"' + "    neat     ".trim() + '"');
document.writeln();


//Recursion
var walk_the_DOM = function walk(node, func){
	func(node);
	node = node.firstChild;
	while(node){
		walk(node, func);
		node = node.nextSibling;
	}
};

var getElementsByAttribute = function (att, value){
	var results = [];

	walk_the_DOM(document.body, function (node){
		var actual = node.nodeType === 1 && node.getAttribute(att);
		if(typeof actual === 'string' && (actual === value || typeof value !== 'string')){
			results.push(node);
		}
	});

	return results;
};
getElementsByAttribute('alex','yang')[0].parentNode.onclick = function(){console.log("body adawd")};

//tail recursion
var factorial = function factorial(i, a){
	a = a || 1;
	if(i < 2){
		return a;
	}
	return factorial(i-1, a*i);
};
document.writeln(factorial(4));
document.writeln();



//Scope:
var foo = function(){
	var a = 3, b = 5;

	var bar = function(){
		var b = 7, c = 11;
		//at this point, a = 3, b= 7, c = 11
		a+= b + c;
		//at this point, a = 21, b = 7, c = 11
	};

	//at this point, a = 3, b = 5, c is not defined
	bar();
	//at this point, a = 21, b = 5, c = 11
};


//Closure: hiding information
//we are not assiging a function to my2ndObject. We are assigning the 
//result of invoking that function
var my2ndObject = function(){
	var value = 0;

	return {
		increment: function(inc){
			value += typeof inc === 'number'? inc : 1;
		},
		getValue: function(){
			return value;
		}
	};
}();
document.writeln(my2ndObject.getValue());
my2ndObject.increment(5);
document.writeln(my2ndObject.getValue());

var Quo2 = function(status){
	return {
		get_status: function(){
			return status;
		}
	};
};
var myQuo2 = Quo2("amazed");
document.writeln(myQuo2.get_status());
document.writeln();



document.writeln('Hello World!');

Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
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



//***Importanta***
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
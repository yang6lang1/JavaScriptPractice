document.writeln('Hello World!');

Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
};

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



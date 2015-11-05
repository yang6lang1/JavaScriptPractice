document.writeln('Hello World!');

Function.prototype.method = function (name, func) {
	if(!this.prototype[name]){
		this.prototype[name] = func;
		return this;
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
var myQuo3 = Quo2("somethingelse");
document.writeln(myQuo3.get_status());
document.writeln(myQuo2.get_status());


//define a function that sets a Dom nodes's color
//to yellow and then fades it to white.
var fade = function(node){
	var level = 0;
	var change = 2;
	var step = function(){
		var hex = level.toString(16); //Integer.toString(radix)
		if(level < 16){
			node.style.backgroundColor = '#FFFF0' +hex;	
		}
		else{
			node.style.backgroundColor = '#FFFF' +hex;
		}
		if(level<255){
			level += change;
			if(level >= 254 || level <= 0){
				change = -change;
			}
			setTimeout(step,50);//wait for 100ms then run step
		}
	};
	setTimeout(step, 50);//first time calling step
}

fade(document.body);

//Make a function that assigns event handler functions to an array
//of nodes
//when a node is clicked, an alert box will display the ordinal of node
var add_the_handlers = function(nodes){
	var i;
	for(i = 0; i < nodes.length; i++){
		nodes[i].onclick = function(i){
			return function(){
				alert(i);
			}
		}(i);
	}
};
//add_the_handlers([document.body]);
document.writeln();


//Module:
//A module is a function or onject that presents an interface but hides
//its state and implementation
String.method('deentityify',function(){
	//The entity table. It maps entity names to characters
	var entity = {
		quot: '"',
		lt: '<',
		gt: '>'
	};

	//return the deentityify method.
	return function(){
		//This is the deentityify method. It calls the string
		//replace method, looking for substrings that start 
		//with '&' and end with ';'. If the characters in
		//between are in the entity table, then replace the
		//entity with the character from the table. It uses
		//a regular expression(Chapter 7)
		return this.replace(/&([^&;]+);/g,
			function(a,b){
				var r = entity[b];
				return typeof r === 'string'? r:a;
			}
		);
	};
}());
document.writeln('&lt;&quot;&gt;'.deentityify());

//Make an object that produces a serial number
var serial_maker = function(){
	//produce an object that produces unique strings. A
	//unique string is made up of two parts: a prefix
	//and a sequence number. The object comes with
	//methods for setting the prefix and sequence
	//number, and a gensym method that produces unique
	//strings
	var prefix = '';
	var seq = 0;
	return{
		set_prefix : function(p){
			prefix = String(p);
		},
		set_seq : function(s){
			seq = s;
		},
		gensym : function(){
			var result = prefix + seq;
			seq += 1;
			return result;
		}
	};
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();
document.writeln(unique);
document.writeln(seqer.gensym());
document.writeln(seqer.gensym());
document.writeln(seqer.gensym());
// if we passed seqer.gensym to a third party's function, that function
// would be able to generate unique strings, but would be unable to 
// change the prefix or seq
document.writeln();



//Curry:
//Currying allows us to profuce a new function by combining a function
//and an argument
Function.method('curry',function(){
	//arguments is an Array-like object but not exactly an array object
	//so it does not have 'concat' method
	var slice = Array.prototype.slice,
	args = slice.apply(arguments),
	that = this;
	return function(){
		return that.apply(null, args.concat(slice.apply(arguments)));
	};
});

var add1 = add.curry(1);
document.writeln(add1(6));
document.writeln();



//***Memoization***
//Functions can use objects to remember the results of previous
//operations (like cache), making it possible to avoid unnecessary work.
//Example: memoized version of fibonacci number
var fibonacci = function(){
	var memo = [0,1];
	var fib = function(n){
		var result = memo[n];
		if(typeof result != 'number'){
			result = fib(n-1) + fib(n-2);
			memo[n] = result;
		}
		return result;
	};
	return fib;
}();
for(var k = 0; k <= 10; k++){
	document.writeln(fibonacci(k));
}

//alternative way: applicable to other situation
//input:
//-	memo: memoizer array
//-	funcdamental: fundamental function
var memoizer = function(memo, fundamental){
	var shell = function(n){
		var result = memo[n];
		if(typeof result !== 'number'){ 
			//assume number is the result of the fundamental function
			result = fundamental(shell, n);
			memo[n] = result;
		}
		return result;
	};
	return shell;
};
var fibonacci2 = memoizer([0, 1], function(shell, n){
	return shell(n-1) + shell(n-2);
});
document.writeln("another fibonacci");
for(var k = 0; k <= 10; k++){
	document.writeln(fibonacci2(k));
}

var factorial2 = memoizer([1, 1], function(shell, n){
	return n * shell(n-1);
});
document.writeln("factorial");
for(var k = 0; k <= 10; k++){
	document.writeln(factorial2(k));
}
document.writeln();



//Chapter 5: - Inheritance -
//define a constructor and augment its prototype:
var Mammal = function(name){
	this.name = name;
};
Mammal.prototype.get_name=function(){
	return this.name;
};
Mammal.prototype.says = function(){
	return this.saying || '';
};

var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name();
document.writeln(name);

//We can make another pseudoclass that inherits from Mammal by defining
//its constructor function and replacing its prototype with an instance
//of Mammal
var Cat = function(name){
	this.name = name;
	this.saying = 'meow';
};

//Replace Cat.prototype with a new instance of Mammal
Cat.prototype = new Mammal(); //this is ugly?
Cat.prototype.purr = function(n){
	var i, s = '';
	for(i = 0; i < n; i++){
		if(s){
			s += '-';
		}
		s += 'r'
	}
	return s;
};
//method overriding
Cat.prototype.get_name = function(){
	return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Kitty');
document.writeln(myCat.says());
document.writeln(myCat.purr(5));
document.writeln(myCat.get_name());


//Prototypal inheritance
//start by using an object literal to make a useful object:
var myMammal2 = {
	name : 'Herb the Mammal2',
	get_name : function(){
		return this.name;
	},
	says : function(){
		return this.saying || '';
	}
};

//Once we have an object we like, we can make more instances with
//the Object.create method from Chapter 3. We can then customize
//the new instances:
var myCat2 = Object.create(myMammal2);
myCat2.name = 'KittyCat2';
myCat2.saying = 'meooowwww';
myCat2.purr = function(n){
	var i, s = '';
	for(i = 0; i < n; i++){
		if(s){
			s += '-';	
		}
		s += 'raww';	
	}
	return s;
}
myCat2.get_name = function(){
	return this.says() + ' ' + this.name + ' ' + this.says();
};
document.writeln(myCat2.says());
document.writeln(myCat2.purr(5));
document.writeln(myCat2.get_name());
document.writeln();
//This is called differential inheritance. By custimizing a new objeect,
//we specify the differences from the object on which it is based.



//Functional
var mammal = function(spec) {
	var that = {};

	that.get_name = function() {
		return spec.name;
	};

	that.says = function(){
		return spec.saying || '';
	};

	return that;
};
var myMammalFunc = mammal({name : 'HerbFunc'});
document.writeln(myMammalFunc.get_name());
document.writeln(myMammalFunc.says());

var cat = function(spec){
	spec.saying = spec.saying || 'meow';
	var that = mammal(spec);
	that.purr = function(n){
		var i, s = '';
		for(i = 0; i < n; i++){
			if(s){
				s += '-';	
			}
			s += 'rrrraw';	
		}
		return s;
	};
	that.get_name = function(){
		return that.says() + ' ' + spec.name + ' ' + that.says();
	}
	return that;
}
var myCatFunc = cat({name: 'KittyFunc'});
document.writeln(myCatFunc.get_name());
document.writeln(myCatFunc.purr(4));
document.writeln(myCatFunc.says());

//The functional pattern also gives us a way to deal with super methods
//We will make a superior method that takes a method name and returns
//a function that invokes that method. The function will invoke the
//original method even if the property is changes:
Object.method('superior',function(name){
	var that = this, method = that[name];
	return function(){
		return method.apply(that.arguments);
	};
});
var coolcat = function(spec){
	var that = cat(spec),
		super_get_name = that.superior('get_name');
		that.get_name = function(){
			return 'like ' + super_get_name() + ' baby';
		};
		return that;
};
var myCoolCat = coolcat({name : 'Jinx'});
document.writeln(myCoolCat.get_name());



//parts
//We can compose objects out of sets of parts
var eventuality = function(that) {
	var registry = {};

	that.fire = function(event){
		//fire an even on an object. The even can be either
		//a string containing the name of the event or an
		//object containing a type property containing the
		//name of the event. Handlers registered by the 'on'
		//method that match the even name will be invoked.
		var array, func, handler, i,
			type = typeof event === 'string' ?
					event : event.type;
		//If an array of handlers exist for this event, then
		//loop through it and execute the handlers in order.
		if(registry.hasOwnProperty(type)){
			array = registry[type];
			for(i = 0; i < array.length; i++){
				handler = array[i];

				//A handler record contains a method that an optional
				//array of parameters. If the method is a name, look
				//up the function
				func = handler.method;
				if(typeof func = 'string'){
					func = this[func];
				}

				//Invoke a handler. If the record contained
				//parameters, then pass them. Otherwise, pass the
				//event object.
				func.apply(this, handler.parameters || [event]);
			}
		}
		return this;
	};

	that.on = function(type, method, parameters){
		//Register an event. Make a handler record. Put it
		//in a handler array, making one if it doesn't yet
		//exist for this type.
		var handler = {
			method: method,
			parameters: parameters
		};
		if(registry.hasOwnProperty(type)){
			registry[type].push(handler);
		}
		else{
			registry[type] = [handler];
		}
		return this;
	};

	return that;
};

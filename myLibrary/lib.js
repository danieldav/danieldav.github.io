/*

Lists of handy functions

https://davidwalsh.name/essential-javascript-functions
https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know?utm_source=javascriptweekly&utm_medium=email
*/
================================================================================
//from: https://github.com/h5bp/Front-end-Developer-Interview-Questions#coding-questions

//Question: How would you make this work?

//add(2, 5); // 7
//add(2)(5); // 7

//Answer:
// See the following article on currying
//https://medium.com/@kbrainwave/currying-in-javascript-ce6da2d324fe#.bwkweasdz

var sum = function(a,b) {
  if(b) return a+b;
  else {
    return function(b) {
      return a + b;
    }
  }
}

//========================================================================
//see http://stackoverflow.com/q/2901102/703717
/// How to print a number with commas as thousands separators in JavaScript

function numberWithCommas(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

OR

You could use toLocaleString:

var number = 1557564534;
number.toLocaleString(); // "1,557,564,534"
Or NumberFormat:

var nf = new Intl.NumberFormat();
nf.format(number); // "1,557,564,534"

========================
Currying
========================
https://medium.com/@kbrainwave/currying-in-javascript-ce6da2d324fe#.bll52juks

Currying is not a pattern that is native to javascript, so it is often handy
to write a (currier) utility function
that can transform any given function into a curried version of itself.

Now we can apply currying to any function by passing the function as the first argument to currier.

And that’s it for currying. I hope you have learned something new about
this powerful technique! Do you have an example of currying that you’d like
to share? If so, please leave it as a gist in the comments.

===============================
Make a Copy of an Array
===============================
Fromhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

Example: An object copy function

The following code creates a copy of a given object.
There are different ways to create a copy of an object, the following is just one way and
is presented to explain how Array.prototype.forEach() works by using
ECMAScript 5 Object.* meta property functions.

function copy(o) {
  var copy = Object.create(Object.getPrototypeOf(o));
  var propNames = Object.getOwnPropertyNames(o);

  propNames.forEach(function(name) {
    var desc = Object.getOwnPropertyDescriptor(o, name);
    Object.defineProperty(copy, name, desc);
  });

  return copy;
}

var o1 = { a: 1, b: 2 };
var o2 = copy(o1); // o2 looks like o1 now
===========================================================
//page 197
//-------

// Return the Greatest Common Divisor of two integers, using the Euclidian
// algorithm: http://en.wikipedia.org/wiki/Euclidean_algorithm
function gcd(a,b) { // Type checking for a and b has been omitted
  var t; // Temporary variable for swapping values
  if (a < b) t=b, b=a, a=t; // Ensure that a >= b
  while(b != 0) t=b, b = a%b, a=t; // This is Euclid's algorithm for GCD
  return a;
}
var gcdmemo = memoize(gcd);
gcdmemo(85, 187) // => 17
===========================================================
//Simulatiing Object.create() in ECMAScript 3
// Definitive Guide page 119

//Example 6-1. Creating a new object that inherits from a prototype

// inherit() returns a newly created object that inherits properties from the
// prototype object p. It uses the ECMAScript 5 function Object.create() if
// it is defined, and otherwise falls back to an older technique.
function inherit(p) {
  if (p == null) throw TypeError(); // p must be a non-null object
  if (Object.create) // If Object.create() is defined...
    return Object.create(p); // then just use it.
  var t = typeof p; // Otherwise do some more type checking
  if (t !== "object" && t !== "function") throw TypeError();
  function f() {}; // Define a dummy constructor function.
  f.prototype = p; // Set its prototype property to p.
  return new f(); // Use f() to create an "heir" of p.
}
/*
> var p = {x:1}
undefined
> var obj = inherit(p)
undefined
> obj.x
1
> p.isPrototypeOf(obj)
true
*/
=========================================================
page 200-201
---------
// A Class built with factory functions
// VS
// A Class built with a constructor function.


// A Range class using a factory function

function range(from, to) {
  // Use the inherit() function to create an object that inherits from the
  // prototype object defined below. The prototype object is stored as
  // a property of this function, and defines the shared methods (behavior)
  // for all range objects.
  var r = inherit(range.methods);
  // Store the start and end points (state) of this new range object.
  // These are noninherited properties that are unique to this object.
  r.from = from;
  r.to = to;
  // Finally return the new object
  return r;
}
// This prototype object defines methods inherited by all range objects.
range.methods = {
  // Return true if x is in the range, false otherwise
  // This method works for textual and Date ranges as well as numeric.
  includes: function(x) { return this.from <= x && x <= this.to; },
  // Invoke f once for each integer in the range.
  // This method works only for numeric ranges.
  foreach: function(f) {
    for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
  },
  // Return a string representation of the range
  toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};
/*
// Here are example uses of a range object.
var r = range(1,3); // Create a range object
r.includes(2); // => true: 2 is in the range
r.foreach(function(x) {console.log(x);}); // Prints 1 2 3
console.log(r); // Prints (1...3)
*/

// A Range class using a constructor


// This is a constructor function that initializes new Range objects.
// Note that it does not create or return the object. It just initializes this.
function Range(from, to) {
  // Store the start and end points (state) of this new range object.
  // These are noninherited properties that are unique to this object.
  this.from = from;
  this.to = to;
}
// All Range objects inherit from this object.
// Note that the property name must be "prototype" for this to work.
Range.prototype = {
  // Return true if x is in the range, false otherwise
  // This method works for textual and Date ranges as well as numeric.
  includes: function(x) { return this.from <= x && x <= this.to; },
  // Invoke f once for each integer in the range.
  // This method works only for numeric ranges.
  foreach: function(f) {
    for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
  },
  // Return a string representation of the range
  toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};
// Here are example uses of a range object
/*
var r = new Range(1,3); // Create a range object
r.includes(2); // => true: 2 is in the range
r.foreach(function(x) {console.log(x);}); // Prints 1 2 3
console.log(r); // Prints (1...3)
*/
=========================================================
//see http://stackoverflow.com/a/9220317
function getPrototypeLevel(obj1,obj2) {
  //if(!(obj1 instanceof obj2)) return 0; // this works but is a little clumsy
  if(!obj2.isPrototypeOf(obj1)) return 0;
  return 1 + getPrototypeLevel(Object.getPrototypeOf(obj1),obj2)
}

// eg: getPrototypeLevel([1],Object.prototype) // 2
============================================================
http://michalbe.blogspot.co.il/2013/03/javascript-less-known-parts-bitwise.html

// RGB to HEX
var rgb2hex = function(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).substr(1);
}
====================================================================
//technique to convert array-like objects to real arrays.

// see http://stackoverflow.com/questions/2125714/explanation-of-slice-call-in-javascript

[].slice.call(document.querySelectorAll('a'), 0)

//OR

Array.prototype.call(document.querySelectorAll('a'), 0) //('Better')
===============================================================================

// A function that returns the class of any object you pass it.
//Definitive Guide page 136

function classof(o) {
  if (o === null) return "Null";
  if (o === undefined) return "Undefined";
  return Object.prototype.toString.call(o).slice(8,-1);
}

//> classof({x:1})
//< "Object"
======================================================================
/*

Get the max number in an array
http://stackoverflow.com/questions/1669190/javascript-min-max-array-values/30834687#30834687

*/

var max_of_array = Math.max.apply(Math, array);
=======================================================================

// Fibonacci without recursion - 'Iterative fibonacci'
//see https://jsperf.com/recursive-vs-iterative-fibonacci/3

function iterativeFibonacci(n){
  var fibs = [];
  fibs.push(0,1);

  for(var i=0; i<n; i++){
    fibs.push(fibs[0] + fibs[1]);
    fibs.shift();
  }
  return fibs[0];
}

/*
> var a = [1,2,3,4]
undefined
> a.shift()
1
> a
[2, 3, 4]

*/
---------------------------------------

//Recursive functions: Fibonacci

function fib(n) {
  if(n < 1) { return 0; }
  //else if (n == 1) {
    //return 1;
  //} else { return fib(n-1) + fib(n-2); }
  return n != 1 ? fib(n-1) + fib(n-2) : 1;
}

=============================================
//Javascript Memoization Explanation?
// from http://stackoverflow.com/questions/8548802/javascript-memoization-explanation

// This implementation caches the results as they go.

var fibonacci = (function () {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
}());
==============================================
// Factorial without using recursion (!!) [Definitive Guide page 106]

function factorial(x) {
  // If the input argument is invalid, throw an exception!
  if (x < 0) throw new Error("x must not be negative");
  // Otherwise, compute a value and return normally
  for(var f = 1; x > 1; f *= x, x--) /* empty */ ;
  return f;
}

--------------

// Factorial using recursion

function factorial(x) {
  return x > 0 ? x*factorial(x-1) : 1;
}
================================================
//Javascript - The definitive guide page 787:

/*The JSON.stringify() function converts Date objects to strings, and you can use a reviver
function to reverse this transformation. The example below also filters property names and
returns undefined to remove certain properties from the result object:
*/

var data = JSON.parse(text, function(name, value) {
// Remove any values whose property name begins with an underscore
if (name[0] == '_') return undefined;
// If the value is a string in ISO 8601 date format convert it to a Date.
if (typeof value === "string" &&
/^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(value))
return new Date(value);
// Otherwise, return the value unchanged
return value
});

/*
Usage:
======

> var text = JSON.stringify(new Date())
undefined
> text
""2015-11-10T09:40:04.598Z""
> var data = JSON.parse(text, function(name, value) {
// Remove any values whose property name begins with an underscore
if (name[0] == '_') return undefined;
// If the value is a string in ISO 8601 date format convert it to a Date.
if (typeof value === "string" &&
/^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(value))
return new Date(value);
// Otherwise, return the value unchanged
return value
});
undefined
> data
Tue Nov 10 2015 11:40:04 GMT+0200 (Jerusalem Standard Time)
> typeof data
"object"
> data instanceof Date
true
*/
//=========================================================================
//Pascal's Triangle

function Pascal(n) {
  var arr = [];
  if(n < 1) { throw new Error('Pascal numbers < 1 are undefined'); }
  if(n==1) { return [1]; }
  else {
    arr.push(1);
    for(var k=0;k<n-2;k++) { //if n==2 - then this loop will not be executed
      arr.push(Pascal(n-1)[k] + Pascal(n-1)[k+1]);
    }
    arr.push(1);
    return arr;
  }
}
//==============================================================================
// Bitwise NOT ~ : ~n returns -n - 1

> ~-2
1
> ~10
-11
> ~-10
9
> ~-136
135

> ~-n
n - 1
============================================
//Definitive page 164

/ Print the name and value of each property of o. Return undefined.
function printprops(o) {
  for(var p in o)
  console.log(p + ": " + o[p] + "\n");
}
=============================================
//Find most frequent element (mode) in array
// see also http://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
// and
// http://stackoverflow.com/questions/3783950/get-the-item-that-appears-the-most-times-in-an-array

function mode(arr) {
  var obj = {};
  var highest = arr[0];
  var maxCount = 1;
  for(var i=0;i<arr.length;i++) {
    var current = arr[i];
    if(obj[current] == undefined) {
      obj[current] = 1;
    } else {
      obj[current]++;
    }
    if(obj[current] > maxCount) {
      highest = current;
      maxCount = obj[current];
    }
  }
  console.log(JSON.stringify(obj));
  return highest;
}

//and
 /*
 var store = ['1','2','2','3','4'];
 var frequency = {};  // array of frequency.
 var max = 0;  // holds the max frequency.
 var result;   // holds the max frequency element.
 for(var v in store) {
         frequency[store[v]]=(frequency[store[v]] || 0)+1; // increment frequency.
         if(frequency[store[v]] > max) { // is this frequency > max so far ?
                 max = frequency[store[v]];  // update max.
                 result = store[v];          // update result.
         }
 }
*/
================================================
//Definitive Guide p157

// Find all occurrences of a value x in an array a and return an array
// of matching indexes
function findall(a, x) {
  var results = [], // The array of indexes we'll return
  len = a.length, // The length of the array to be searched
  pos = 0; // The position to search from
  while(pos < len) { // While more elements to search...
    pos = a.indexOf(x, pos); // Search
    if (pos === -1) break; // If nothing found, we're done.
    results.push(pos); // Otherwise, store index in array
    pos = pos + 1; // And start next search at next element
  }
  return results; // Return array of indexes
}
=================================================
//Absolute value
function abs(x)  { return x > 0 ? x : -x; }

====================================================
/* copy the names of all
object properties into an array: */

var o = {x:1, y:2, z:3};
var a = [], i = 0;
for(a[i++] in o) /* empty */;

//returns: ["x", "y", "z"]

===================================================
outer:
for (var i = 0; i < 10; i++)
{
  console.log('i = ' + i)
      for (var j = 0; j < 10; j++) {  // inner loop
        console.log('j = ' + j)
        if (j > 5)
             break; // inner
        else
             continue outer;  // it will go to next iteration of outer loop (same as break in this context)
      }
}
i = 0
j = 0
i = 1
j = 0
i = 2
j = 0
i = 3
j = 0
i = 4
j = 0
i = 5
j = 0
i = 6
j = 0
i = 7
j = 0
i = 8
j = 0
i = 9
j = 0

/* If you used continue without the 'outer' label, it would go to the next
iteration of inner for loop. That's why there is a need for labels in Javascript.

*/
==============================================================
/*
Determine if strict mode is in use:
see http://stackoverflow.com/a/11496488/703717
*/

function isStrictMode(){
    return !this;
}
//returns false, since 'this' refers to global object and '!this' becomes false


/// OR: Definitive Guide page 111 :
var hasStrictMode = (function() { "use strict"; return this===undefined}());

=====================================================================
//overwrite console.log() so you can see the console output
//see http://stackoverflow.com/a/29558498/703717
console.log = function(msg) {document.body.innerHTML += '<p>' + msg + '</p>';};
===========================================================================
Definitive Guide page 124-128

Example 6-2. Object utility functions that enumerate properties
/*
* Copy the enumerable properties of p to o, and return o.
* If o and p have a property by the same name, o's property is overwritten.
* This function does not handle getters and setters or copy attributes.
*/
function extend(o, p) {
  for(prop in p) { // For all props in p.
  o[prop] = p[prop]; // Add the property to o.
}
return o;
}

/* Example 6-2 included an extend() function that copied properties from one object to
another. That function simply copied the name and value of the properties and ignored
their attributes. Furthermore, it did not copy the getter and setter methods of accessor
properties, but simply converted them into static data properties. Example 6-3 shows
a new version of extend() that uses Object.getOwnPropertyDescriptor() and
Object.defineProperty() to copy all property attributes. Rather than being written as
a function, this version is defined as a new Object method and is added as a nonenumerable
property to Object.prototype. */

/*
* Add a nonenumerable extend() method to Object.prototype.
* This method extends the object on which it is called by copying properties
* from the object passed as its argument. All property attributes are
* copied, not just the property value. All own properties (even non-
* enumerable ones) of the argument object are copied unless a property
* with the same name already exists in the target object.
*/
Object.defineProperty(Object.prototype,"extend", // Define Object.prototype.extend
{
  writable: true,
  enumerable: false, // Make it nonenumerable
  configurable: true,
  value: function(o) { // Its value is this function
  // Get all own props, even nonenumerable ones
    var names = Object.getOwnPropertyNames(o);
    // Loop through them
    for(var i = 0; i < names.length; i++) {
      // Skip props already in this object
      if (names[i] in this) continue;
      // Get property description from o
      var desc = Object.getOwnPropertyDescriptor(o,names[i]);
      // Use it to create property on this
      Object.defineProperty(this, names[i], desc);
    }
  }
});
/*
* Copy the enumerable properties of p to o, and return o.
* If o and p have a property by the same name, o's property is left alone.
* This function does not handle getters and setters or copy attributes.
*/
function merge(o, p) {
  for(prop in p) { // For all props in p.
    if (o.hasOwnProperty[prop]) continue; // Except those already in o.
    o[prop] = p[prop]; // Add the property to o.
  }
  return o;
}
/*
* Remove properties from o if there is not a property with the same name in p.
* Return o.
*/
function restrict(o, p) {
  for(prop in o) { // For all props in o
    if (!(prop in p)) delete o[prop]; // Delete if not in p
  }
  return o;
}
/*
* For each property of p, delete the property with the same name from o.
* Return o.
*/
function subtract(o, p) {
  for(prop in p) { // For all props in p
    delete o[prop]; // Delete from o (deleting a
    // nonexistent prop is harmless)
  }
  return o;
}
/*
* Return a new object that holds the properties of both o and p.
* If o and p have properties by the same name, the values from o are used.
*/
function union(o,p) { return extend(extend({},o), p); }
/*
* Return a new object that holds only the properties of o that also appear
* in p. This is something like the intersection of o and p, but the values of
* the properties in p are discarded
*/
function intersection(o,p) { return restrict(extend({}, o), p); }
/*
* Return an array that holds the names of the enumerable own properties of o.
*/
function keys(o) {
  if (typeof o !== "object") throw TypeError(); // Object argument required
  var result = []; // The array we will return
  for(var prop in o) { // For all enumerable properties
    if (o.hasOwnProperty(prop)) // If it is an own property
    result.push(prop); // add it to the array.
  }
  return result; // Return the array.
}
==============================================================================
/* Case Insensitive sort */
//-------------------------
//Definitive Guide page 150

a = ['ant', 'Bug', 'cat', 'Dog']
//a.sort(); // case-sensitive sort: ['Bug','Dog','ant',cat']
a.sort(function(s,t) { // Case-insensitive sort
  var a = s.toLowerCase();
  var b = t.toLowerCase();
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}); // => ['ant','Bug','cat','Dog']
===========================================================
/* My version of the Array.reduce method */

Array.prototype.myReduce = function(f,start) {
  if(this.length == 0) { throw "myReduce: Uncaught TypeError: Reduce of empty array with no initial value"; }
  var newArr = this.slice(); // make a copy of the original array
  if(start) { newArr.splice(0,0,start)}
  while(newArr.length > 1) {
     newArr.splice(0,2,f(newArr[0],newArr[1]));
     //console.log(newArr);
  }
  return newArr.pop();
}

/* myReduceRight */

Array.prototype.myReduceRight = function(f,start) {
  if(this.length == 0) { throw "myReduce: Uncaught TypeError: Reduce of empty array with no initial value"; }
  var newArr = this.slice(); // make a copy of the original array
  if(start) { newArr.splice(newArr.length,0,start)}
  while(newArr.length > 1) {
     newArr.splice(newArr.length-2,2,f(newArr[newArr.length-1],newArr[newArr.length-2]));
     //console.log(newArr);
  }
  return newArr.pop();
}

//OR

Array.prototype.myReduceRight = function(f,start) {
  if(this.length == 0) { throw "myReduce: Uncaught TypeError: Reduce of empty array with no initial value"; }
  var newArr = this.slice().reverse(); // make a copy of the original array
  if(start) { newArr.splice(0,0,start)}
  while(newArr.length > 1) {
     newArr.splice(0,2,f(newArr[0],newArr[1]));
     //console.log(newArr);
  }
  return newArr.pop();
}

============================================================
SOmething new;

/*jslint white: true, undef: true, newcap: true, nomen: true, regexp: true, plusplus: true, bitwise: true, maxerr: 50, indent: 4 */
/*global window, module, test, ok, equals */

module("Objects");

var ThisTestObject = function () {
    this.thisCounter = 42;
};

test("Forgetting new keyword causes instance variables to be put in the global namespace", function () {
    var objectWithNew = new ThisTestObject();
    ok(typeof objectWithNew === "object", "The object has been created.");
    ok(objectWithNew.thisCounter === 42, "The counter is part of the object.");
    ok(!hasOwnProperty('thisCounter'), "Variable thisCounter has not leaked into the global namespace.");

    var objectWithoutNew = ThisTestObject();
    ok(objectWithoutNew === undefined, "No object has been created.");
    ok(hasOwnProperty('thisCounter'), "Variable thisCounter has leaked into the global namespace.");
});

test("This can be used in the prototype methods.", function () {
    var TestObject = function () {
        this.counter = 42;
    };

    TestObject.prototype.increment = function () {
        this.counter += 1;
    };

    var obj = new TestObject();
    equals(obj.counter, 42);
    obj.increment();
    equals(obj.counter, 43);
});

test("Inner functions don't have access to the object using this.", function () {
    var TestObject = function () {
        this.myCounter = 42;
    };

    TestObject.prototype.badIncrement = function () {
        var incrementingFunction = function () {
            // Here, this points to the window global again.
            // "Incrementing" this counter will put NaN (not a number) into the global namespace.
            this.myCounter += 1;
        };
        incrementingFunction();
    };

    TestObject.prototype.goodIncrement = function () {
        var that = this;
        var incrementingFunction = function () {
            // Thanks to closures, "that" points our TestObject.
            that.myCounter += 1;
        };
        incrementingFunction();
    };

    var obj = new TestObject();
    equals(obj.myCounter, 42);
    obj.badIncrement();
    equals(obj.myCounter, 42, "Bad increment doesn't actually increment, it leaks.");
    ok(hasOwnProperty("myCounter"), "Variable myCounter has leaked into the global namespace.");
    obj.goodIncrement();
    equals(obj.myCounter, 43);
});
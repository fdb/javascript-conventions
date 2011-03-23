/*jslint white: true, undef: true, newcap: true, nomen: true, regexp: true, plusplus: true, bitwise: true, maxerr: 50, indent: 4 */
/*global window, module, test, ok, equals */

module("Scoping");

var objectExists = function (name, message) {
    message = message ? message : "Object " + name + " should exist.";
    ok(hasOwnProperty(name), message);
};

var objectDoesNotExist = function (name, message) {
    message = message ? message : "Object " + name + " should not exist.";
    ok(!hasOwnProperty(name), message);
};

var scopingAlpha = {};
scopingAlpha.scopingAlphaFunction = function () {

};

(function (window) {
    var scopingBeta = {};
}(this));

(function (window) {
    var scopingGamma = {
    };
    window.scopingGamma = scopingGamma;
}(this));

test("Test for leaks", function () {
    objectExists('scopingAlpha');
    objectDoesNotExist('scopingAlphaFunction');
});

test("Block scoping does not exist", function () {
    for (var i = 0; i < 10; i += 1) {
        var tmp = i;
    }
    equals(i, 10, "The i variable is still accessible.");
    equals(tmp, 9, "The tmp variable is still accessible.");
});

test("Function scoping", function () {
    objectDoesNotExist('scopingBeta', 'Because scopingBeta is put in a function scope, it does not leak.');
    objectExists('scopingGamma', 'Because scopingGamma is explicitly assigned to the window, it becomes available.');
});


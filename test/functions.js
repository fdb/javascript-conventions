/*jslint white: true, undef: true, newcap: true, nomen: true, regexp: true, plusplus: true, bitwise: true, maxerr: 50, indent: 4 */
/*global window, module, test, ok, equals */

module("Functions");

test("A semicolon is inserted if you start the return value on the next line.", function () {
    var badReturn = function () {
        // Because the return statement is on a line of its own, the JavaScript parser considers this line finished
        // and inserts a semicolon. This means that the return statement returns nothing.
        return
        { success: true  };
    };

    var goodReturn = function () {
        return {
            success: true
        };
    };

    var badResult = badReturn();
    ok(badResult === undefined, "badReturn returns nothing because the return statement is on a line of its own.");

    var goodResult = goodReturn();
    ok(typeof goodResult === "object", "goodReturn returns the desired object.");
    ok(goodResult.success === true, "goodReturn returned object contains the success member.");
});
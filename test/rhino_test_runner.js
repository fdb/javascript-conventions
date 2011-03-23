load('qunit/qunit.js');

QUnit.init();

QUnit.log = function (args) {
    if (args.result === false) {
        print("  FAIL " + " " + result.message);
    }
};

QUnit.done = function (args) {
    print(args.passed + " tests of " + args.total + " passed, " + args.failed + " failed.");
    print("Tests completed in " + args.runtime + " milliseconds.");
};

load('functions.js');
load('objects.js');
load('scoping.js');

QUnit.start();

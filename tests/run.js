var testrunner = require("qunit");

testrunner.setup({
    log: {
        tests: true,
        errors: true,
    }
});

var logger = function(report) {
   console.log(report);
}

// one code and tests file
testrunner.run(
    {
        code: "./modules/geometryExtensions.js",
        tests: "./tests/geometry.js" 
    });
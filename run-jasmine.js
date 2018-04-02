//https://github.com/bcaudan/jasmine-spec-reporter/blob/master/docs/jasmine-npm-configuration.md
var Jasmine = require('jasmine');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var noop = function() {};

var jrunner = new Jasmine();
jrunner.configureDefaultReporter({print: noop});    // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter());   // add jasmine-spec-reporter
jrunner.loadConfig({
    spec_dir: 'dist/test',
    spec_files: [
        '**/*[sS]pec.js',
    ],
    stopSpecOnExpectationFailure: false,
    random: false,
});
jrunner.execute();

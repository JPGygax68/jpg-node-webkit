"use strict";

exports.description = "My (Jean-Pierre Gygax') node-webkit boilerplate";

exports.warnOn = "*";

exports.template = function(grunt, init, done) {
  
  init.process({type: 'jquery'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title', function(value, data, done) {
      // Fix jQuery capitalization.
      value = value.replace(/jquery/gi, 'jQuery');
      done(null, value);
    }),
    init.prompt('description', 'A new node-webkit application'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url')
    
  ], function(err, props) {
  
    // A few additional properties.
    props.jqueryjson = props.name + '.jquery.json';
    props.dependencies = {jquery: props.jquery_version || '>= 1'};

    props.keywords = [];

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: 'libs/**'});

    // Distribution dependencies
    var dependencies = {
    };
    
    // Development dependencies
    var devDependencies = {
      'grunt-contrib-jade'   : '*',
      'grunt-contrib-stylus' : '*',
      'grunt-contrib-copy'   : '*',
      'grunt-browserify'     : '*',
      'grunt-contrib-jshint' : '*',
      'grunt-contrib-qunit'  : '*',
      'grunt-contrib-concat' : '*',
      'grunt-contrib-uglify' : '*',
      'grunt-contrib-watch'  : '*',
      'grunt-contrib-clean'  : '*',
      'debowerify'           : '*'
    }
    
    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: props.name,
      version: props.version,
      main: 'main.html',
      //npm_test: 'mocha',
      dependencies: dependencies,
      devDependencies: devDependencies
    }, function(pkg, props) {
      pkg.window = { width: 1600, height: 900 }
      return pkg;
    });

    done();
    
  });

}
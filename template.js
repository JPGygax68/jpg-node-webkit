"use strict";

var npm = require('npm');

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

    // Development dependencies
    var devDependencies = {
      'grunt-contrib-jshint': '*',
      'grunt-contrib-qunit' : '*',
      'grunt-contrib-concat': '*',
      'grunt-contrib-uglify': '*',
      'grunt-contrib-watch' : '*',
      'grunt-contrib-clean' : '*'
    }
    
    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: props.name,
      version: props.version,
      //npm_test: 'mocha',
      devDependencies: devDependencies
    }, function(pkg, props) {
      pkg.window = { width: 1600, height: 900 }
      return pkg;
    });

    npm.load( { 'save-dev': 'true', 'silent': true }, function(err) {
    
      if (err) throw new Error(err);
      
      var devDepNames = [];
      for (var pname in devDependencies) devDepNames.push(pname);
      
      var i = 0;      
      installNextDevDependency();
      
      function installNextDevDependency() {
        var pkg_name = devDepNames[i++];
        npm.commands.install([pkg_name], function(err, data) {
          if (err) throw new Error('Failed to install "'+pkg_name+'": ' + err);
          if (i < devDepNames.length) installNextDevDependency(); else done();
        })
      }
    })
    
    });

}
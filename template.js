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

    // Distribution dependencies
    var dependencies = {
    };
    
    // Development dependencies
    var devDependencies = {
      'grunt-contrib-jade'   : '*',
      'grunt-contrib-stylus' : '*',
      'grunt-browserify'     : '*',
      'grunt-contrib-jshint' : '*',
      'grunt-contrib-qunit'  : '*',
      'grunt-contrib-concat' : '*',
      'grunt-contrib-uglify' : '*',
      'grunt-contrib-watch'  : '*',
      'grunt-contrib-clean'  : '*'
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

    installDependencies( dependencies, { 'save': true }, 
      function() { installDependencies( devDependencies, { 'save-dev': true }, done ) } );
    
    //----------------
    
    function installDependencies(deps, options, cb) {      
      
      var depNames = [];
      for (var pname in deps) depNames.push(pname);
      if (depNames.length === 0) { cb(); return; }
      
      npm.load( options, function(err) {    
        if (err) throw new Error(err);      
      
        var idep = 0;      
        installNextDependency();
        
        function installNextDependency() {
          var pkg_name = depNames[idep];
          console.log(idep, pkg_name);
          idep++;
          npm.commands.install([pkg_name], function(err, data) {
            if (err) throw new Error('Failed to install "'+pkg_name+'": ' + err);
            if (idep < depNames.length) installNextDependency(); else cb();
          })
        }
      })
    }
    
  });

}
"use strict";

/* TODO: this should probably be replaced by a full list of bower modules, not just those that must be shim'd.
 */
var browserify_shims = {
	// jQuery attaches itself to the window as '$' so we assign the exports accordingly
  // TODO: how to install and update jQuery? with or without version number ?
	jquery      : { path: './lib/jquery-2.0.3.min.js', exports: '$' }
}

module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),    
    
    jade: {
      dist: {
        files: { 'build/main.html': [ 'main.jade' ] },
        options: {
          client: false
        }
      }
    },
    
    stylus: {
      dist: {
        options: {
          paths: [ 'dist' ]
        },
        files: {
          'build/style.css': 'src/style.styl'
        }
      }
    },
    
    browserify: {
      dist: {
        files: {
          'build/client-bundle.js': [ 'src/client/main.js' ]
        },
        options: {
          shim: browserify_shims,
          debug: true
        }
      }
    },

    copy: {
      dist: {
        files: [
          { expand: true, cwd: 'src/node/', src: '*.js', dest: 'build/' },
          { dest: 'build/package.json', src: ['src/package.json'] },
        ],
        options: {
          shim: browserify_shims,
          debug: true
        }
      }
    },
    
    watch: {
      files: [ 'src/**', 'Gruntfile.js' ],
      tasks: [ 'default' ]
    }
  })
  
  grunt.registerTask('build', ['jade', 'stylus', 'browserify', 'copy']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('all', ['build', 'watch']);
  
  // TODO: also launch node-webkit ?
  //grunt.registerTask('test', ['jade:testapp', 'stylus:testapp', 'browserify:testapp', 'copy:testapp']);
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
}

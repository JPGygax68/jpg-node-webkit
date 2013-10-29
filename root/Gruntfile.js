"use strict";

module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),    
    
    jade: {
      dist: {
        files: { 'build/main.html': [ 'src/main.jade' ] },
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
          transform: ['debowerify' ],
          debug: true
        }
      }
    },

    copy: {
      dist: {
        files: [
          { expand: true, cwd: 'src/node/', src: '*.js', dest: 'build/' },
          { dest: 'build/package.json', src: ['package.json'] }
        ]
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
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
}

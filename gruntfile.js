module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            main: {
                src: [
                  //  'js/inc/*/*.js',
                    'js/models/todo.js',
                    'js/collections/todos.js',
                    'js/views/todos.js',
                    'js/views/app.js',
                    'js/models/todo.js',
                    'js/routers/router.js',
                    'js/app.js'
                ],
                dest: 
                    'packed/js/main.js'                 
            },
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/underscore/underscore.js',
        			'bower_components/backbone/backbone.js',
                    'bower_components/backbone.localStorage/backbone.localStorage.js',
        		],
        		dest:
                    'packed/js/components.js'
            }
        },
        uglify: {
            components: {
                src: 'packed/js/components.js',
                dest: 'packed/js/components.min.js'
            },
            main: {
                src: 'packed/js/main.js',
                dest: 'packed/js/main.min.js'
            }
        },
        cssmin: {
            target: {
                files: {
                    'packed/css/style.min.css': ['css/reset.css', 'css/style.css']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};


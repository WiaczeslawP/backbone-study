module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            dist: {
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    transform: [
                        ['babelify', {
                            optional: 'runtime',
                            loose: ['all']
                        }]
                    ]
                },
                files: {
                    'js/dist.js': ['js/app.js']
                }
            }
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'js/es5/todosView.js': 'js/todosView.js',
                    'js/es5/todosCollection.js': 'js/todosCollection.js',
                    'js/es5/todoModel.js': 'js/todoModel.js',
                    'js/es5/appView.js': 'js/appView.js',
                    'js/es5/router.js': 'js/router.js',
                    'js/es5/app.js': 'js/app.js'
                }
            }
        },

        concat: {
            main: {
                src: [
                    'js/es5/todosView.js',
                    'js/es5/todosCollection.js',
                    'js/es5/todoModel.js',
                    'js/es5/appView.js',
                    'js/es5/router.js',
                    'js/es5/app.js'
                ],
                dest: 
                    'tmp/js/main.js'                 
            },
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/underscore/underscore.js',
        			'bower_components/backbone/backbone.js',
                    'bower_components/backbone.localStorage/backbone.localStorage.js',
        		],
        		dest:
                    'tmp/js/components.js'
            }
        },
        uglify: {
            components: {
                src: 'tmp/js/components.js',
                dest: 'packed/js/components.min.js'
            },
            main: {
                src: 'tmp/js/main.js',
                dest: 'packed/js/main.min.js'
            }
        },
        cssmin: {
            target: {
                files: {
                    'packed/css/style.min.css': ['css/reset.css', 'css/style.css']
                }
            }
        },
        clean:
            ['tmp']
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['babel', 'concat', 'cssmin']);
    grunt.registerTask('br', ['browserify']);

};


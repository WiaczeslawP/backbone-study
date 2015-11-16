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
                    'packed/js/main.min.js': ['js/app.js']
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
            components: {
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
            ['tmp'],
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['browserify',  'cssmin']);
    grunt.registerTask('br', ['browserify']);
    grunt.registerTask('karma', ['karma']);

};


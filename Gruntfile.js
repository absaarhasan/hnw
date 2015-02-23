module.exports = function(grunt) {


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.config('concat', {
        scripts: {
            src: ['bower_components/angular/angular.js',
                'js/app.js'],
            dest: 'tmp/app.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.config('uglify', {
        scripts: {
            files: {
                'assets/app.js' : 'tmp/app.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.config('sass', {
        app: {
            files: {
                'tmp/app.css': ['sass/style.scss']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.config('cssmin', {
        app: {
            files: {
                'assets/app.css': ['tmp/app.css']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.config('watch', {
        scripts: {
            files: ['js/**/*.js'],
            tasks: ['concat:scripts', 'uglify'],

            options: {
                spawn: false
            }
        },
        styles: {
            files: ['sass/**/*.scss'],
            tasks: ['sass', 'cssmin'],
            options: {
                spawn: false
            }
        },
        interface: {
            files: ['index.html']
        },
        options: {
            livereload: true
        }
    });

    grunt.registerTask('build', "Builds the application.",
        ['concat:scripts', 'sass', 'cssmin', 'uglify' ]);


};


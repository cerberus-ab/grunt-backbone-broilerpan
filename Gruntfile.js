/**
 * Gruntfile
 *
 */
module.exports = function(grunt) {
    'use strict';

    var _target = 'build';

    require('time-grunt')(grunt);

    // load npm tasks
    require('load-grunt-tasks')(grunt, {
        pattern: [
            'grunt-contrib-*',
            'grunt-env',
            'grunt-sass',
            'grunt-preprocess',
            'grunt-gitinfo',
            'grunt-concurrent',
            'grunt-extend',
            'grunt-web-server'
        ]
    });

    // init config
    grunt.initConfig({
        env: {
            dev: {
                NODE_ENV: 'development'
            },
            prod: {
                NODE_ENV: 'production'
            }
        }
    });

    // clean task
    grunt.config('clean', {
        dev: [
            'src/assets/*.html',
            'src/assets/css',
            'src/assets/sass/components/icon/font-awesome',
            'src/assets/fonts/fontawesome-webfont.*',
            'src/assets/fonts/FontAwesome.*'
        ],
        prod: [
            _target
        ]
    });

    // preprocess task
    grunt.config('preprocess', {
        dev: {
            src: ['src/assets/index/*.html'],
            dest: 'src/assets',
            ext: '.html',
            expand: true,
            flatten: true
        },
        prod: {
            src: ['src/assets/index/*.html'],
            dest: _target + '/assets',
            ext: '.html',
            expand: true,
            flatten: true
        }
    });

    // sass task
    grunt.config('sass', {
        options: {
            style: 'expanded'
        },
        compile: {
            files: {
                'src/assets/css/index.css': 'src/assets/sass/index.scss'
            }
        }
    });

    // jshint task
    grunt.config('jshint', {
        options: {
            force: true,
            jshintrc: 'grunt/.jshintrc',
            reporter: require('jshint-stylish'),
            reporterOutput: null,
            ignores: []
        },
        all: [
            // task-manager
            'Gruntfile.js',
            'grunt/**/*.js',
            // sources
            'src/assets/js/**/*.js'
        ]
    });

    // requirejs task
    grunt.config('requirejs', {
        options: {
            baseUrl: 'src/assets/js',
            mainConfigFile: 'grunt/require.conf.js',
            optimize: 'uglify'
        },
        index: {
            options: {
                name: 'index',
                out: _target + '/assets/js/index.min.js'
            }
        }
    });

    // uglify task
    grunt.config('uglify', {
        options: {
            mangle: false
        },
        prod: {
            files: {
                'build/assets/js/lib/require.min.js': ['node_modules/requirejs-browser/require.js']
            }
        }
    });

    // copy task
    grunt.config('copy', {
        'font-awesome': {
            files: [{
                expand: true,
                flatten: true,
                src: ['node_modules/font-awesome/fonts/*.{otf,eot,svg,ttf,woff,woff2}'],
                dest: 'src/assets/fonts/'
            }, {
                expand: true,
                flatten: true,
                src: ['node_modules/font-awesome/scss/*'],
                dest: 'src/assets/sass/components/icon/font-awesome/'
            }]
        },
        prod: {
            files: [{
                expand: true,
                flatten: true,
                src: ['src/assets/fonts/*'],
                dest: _target + '/assets/fonts/'
            }]
        }
    });

    // cssmin task
    grunt.config('cssmin', {
        options: {
            shorthandCompacting: false,
            roundingPrecision: -1
        },
        prod: {
            files: [{
                expand: true,
                cwd: 'src/assets/css',
                src: ['*.css'],
                dest: _target + '/assets/css',
                ext: '.min.css'
            }]
        }
    });

    // imagemin task
    grunt.config('imagemin', {
        options: {
            optimizationLevel: 3
        },
        prod: {
            files: [{
                expand: true,
                cwd: 'src/assets/img',
                src: ['**/*.{png,jpg,gif,svg,ico}'],
                dest: _target + '/assets/img'
            }]
        }
    });

    // watch task
    grunt.config('watch', {
        css: {
            files: ['src/assets/sass/**/*.scss'],
            tasks: ['sass']
        },
        js: {
            files: ['src/assets/js/**/*.js'],
            tasks: ['jshint']
        },
        index: {
            files: ['src/assets/index/*.html'],
            tasks: ['preprocess:dev']
        }
    });

    // concurrent task
    grunt.config('concurrent', {
        options: {
            logConcurrentOutput: true
        },
        dev: ['watch:css', 'watch:index']
    });

    // web server config
    grunt.config('web_server', {
        options: {
            cors: true,
            port: 8008,
            nevercache: true,
            logRequests: true
        },
        foo: 'bar'
    });

    /**
     * Default task
     *
     */
    grunt.registerTask('default', [
        'jshint'
    ]);

    /**
     * Watchers for development
     *
     */
    grunt.registerTask('keeper', [
        'concurrent:dev'
    ]);

    /**
     * Build development
     *
     */
    grunt.registerTask('development', [
        'env:dev',
        'clean:dev',
        'preprocess:dev',
        'copy:font-awesome',
        'jshint',
        'sass'
    ]);

    /**
     * Build production
     *
     */
    grunt.registerTask('production', [
        'env:prod',
        'clean:prod',
        'preprocess:prod',
        'copy:font-awesome',
        'copy:prod',
        'jshint',
        'requirejs',
        'sass',
        'uglify',
        'cssmin',
        'imagemin'
    ]);

};

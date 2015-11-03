// Ejemplo-Bower
'use strict';

module.exports = function( grunt ) {

    // Carga los plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-google-cdn');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-newer');

    // Configuración de rutas de la aplicación
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Configura las tareas de Grunt
    grunt.initConfig({

        // Configuración del proyecto
        config: appConfig,

        // Revisa los cambios en los archivos y ejecuta tareas de
        // acuerdo al archivo modificado
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            }
        },

        // Inyecta automáticamente los componentes Bower
        // en la aplicación
        wiredep: {
            app: {
                src: ['<%= config.app %>/index.html'],
                ignorePath:  /\.\.\//
            }
        },

        // Revisa el estilo del código Javascript
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/js/{,*/}*.js'
            ]
        },

        // Renombra los archivos para el cache del navegador
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/js/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= config.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        // Minificación del código
        useminPrepare: {
            html: '<%= config.app %>/index.html',
            options: {
                dest: '<%= config.dist %>'
            }
        },

        // Reescribe el HTML para usar el código minificado
        usemin: {
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= config.dist %>']
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/**/*',
                        '!<%= config.dist %>/.git{,*/}*'
                    ]
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '*.html',
                        'js/{,*/}*.*',
                        'views/{,*/}*.html',
                        'bower_components/**/*',
                        'images/{,*/}*.{webp}',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: 'fonts/*',
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: 'bower_components',
                    src: '**/*',
                    dest: '<%= config.dist %>/bower_components'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Remplazar referencias a Google CDN
        cdnify: {
            dist: {
                html: ['<%= config.dist %>/*.html']
            }
        }

    });

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'copy:styles',
        'autoprefixer',
        'copy:dist',
        'cdnify',
        'uglify',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

}
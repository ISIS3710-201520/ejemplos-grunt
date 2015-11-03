// Ejemplo-Bower
'use strict';

module.exports = function( grunt ) {

    // Carga los plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-google-cdn');

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
        'copy:dist',
        'copy:styles',
        'cdnify'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

}
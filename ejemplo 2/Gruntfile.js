// Ejemplo-Bower
'use strict';

module.exports = function( grunt ) {

    // Carga los plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Configuración de rutas de la aplicación
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Configura las tareas de Grunt
    grunt.initConfig({

        // Configuración del proyecto
        config: appConfig,

        // Borra las carpetas
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
        }

    });

    grunt.registerTask('build', [
        'clean:dist',
        'copy:dist',
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

}
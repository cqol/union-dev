module.exports = function (grunt) {
    var timestamp = grunt.template.today("mmddHHMM");
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        lib:{
            jq:'js/lib/jquery.min.js',
            tmpl:'js/lib/jquery.tmpl.min.js',
            ttsui:'js/lib/ttsui.min.js'
        },
        build:{
            file:{
                js:'build/tts_union_media.js',
                css:'build/p4p-2.0.css',
                img:'build/',
                center:'build/tts_union_center.js',
                bubble:'build/tts_union_bubble.js',
                slides:'build/tts_union_slides.js'
            },
            //debug:'build/debug/tts_union_media.js'
            debug:{
                media:'build/debug/tts_union_media.js',
                slides:'build/debug/tts_union_slides.js'
            }
        },
        union:{
            file:{
                js:'js/tts_union_media.source.js',
                img:'img/',
                css:'css/p4p-2.0.css'
            }
        },
        center:{
            file:{
                js:'js/tts_union_center.js'
            }
        },
        bubble:{
            file:{
                js:'js/tts_union_bubble.js'
            }
        },
        slides:{
            file:{
                js:'js/tts_union_slides.js'
            }
        },
        concat:{
            lib:{
                options:{
                    banner:'/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                src:['<%= lib.jq %>', '<%= lib.tmpl %>'],
                dest:'<%= lib.ttsui %>'
            },
            union:{
                options:{
                    banner:'/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd_HH_MM_ss") %> */'
                },
                src:['<%= lib.ttsui %>', '<%= union.file.js %>'],
                dest:'<%= build.debug.media %>'
            },
            tmt:{
                options:{
                    banner:'/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd_HH_MM_ss") %> */'
                },
                src:['<%= lib.ttsui %>', 'js/insetTmt.js'],
                dest:'build/debug/insetTmt.js'
            }
            /*slides:{
                src:['<%= lib.ttsui %>', '<%= slides.file.js %>'],
                dest:'<%= build.debug.slides %>'
            }*/
        },
        uglify:{
            options:{
                banner:'/*! <%= pkg.name %> - by cqol_77 <%= grunt.template.today("yyyy-mm-dd_HH_MM_ss") %> */\n'
            },
            lib:{
                options:{
                    banner:'/*!  <%= pkg.name %> -  by cqol_77 <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files:{
                    '<%= lib.ttsui %>':'<%= lib.ttsui %>'
                }
            },
            union:{
                options:{
                    banner:'/*! <%= pkg.name %> - by cqol_77 <%= grunt.template.today("yyyy-mm-dd_HH_MM_ss") %> */\n'
                },
                files:{
                    '<%= build.file.js %>':'<%= build.debug.media %>'
                }
            },
            center:{
                options:{
                    banner:'/*! <%= pkg.name %> - by cqol_77 <%= grunt.template.today("yyyy-mm-dd_HH_MM_ss") %> */\n'
                },
                files:{
                    'dist/tts_union_center.js':'<%= center.file.js %>'
                }
            },
            bubble:{
                options:{
                    banner:'/*! <%= pkg.name %> - by cqol_77 <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files:{
                    '<%= build.file.bubble %>':'<%= bubble.file.js %>'
                }
            },
            slides:{
                files:{
                    '<%= build.file.slides %>':'<%= slides.file.js %>'
                }
            },
            tmt:{
                files: {
                    'build/insetTmt.js': 'build/debug/insetTmt.js'
                }
            }
        },
        jshint:{
            options:{
                jshintrc:'.jshintrc'
            },
            union:{
                options:{
                    jshintrc:'.jshintrc'
                },
                files:{
                    src:['<%= union.file.js %>']
                }
            },
            center:{
                options:{
                    jshintrc:'.jshintrc'
                },
                files:{
                    src:['<%= center.file.js %>']
                }
            },
            bubble:{
                options:{
                    jshintrc:'.jshintrc'
                },
                files:{
                    src:['<%= bubble.file.js %>']
                }
            },
            slides:{
                options:{
                    jshintrc:'.jshintrc'
                },
                files:{
                    src:['<%= slides.file.js %>']
                }
            },
            tmt:{
                options:{
                    jshintrc:'.jshintrc'
                },
                files:{
                    src:['js/insetTmt.js']
                }
            }
        },
        replace:{
            options:{
                variables:{
                    'timestamp':timestamp
                }
            },
            union:{
                files:[
                    {src:['<%= build.debug.media %>'], dest:'<%= build.debug.media %>'}
                ]
            },
            center:{
                files:[
                    {src:['dist/tts_union_center.js'], dest:'dist/tts_union_center.js'}
                ]
            },
            tmt:{
                files:[
                    {src:['build/debug/insetTmt.js'], dest:'build/debug/insetTmt.js'}
                ]
            }
        },
        copy:{
            union:{
                files:[
                    {expand:true, cwd:'<%= union.file.img %>', src:'*', dest:'<%= build.file.img %>'}
                ]
            },
            tmt: {
                files:[
                    {expand: true, cwd: 'img/', src: '*', dest: 'build/'}
                ]
            }
        },
        cssmin:{
            options:{
                banner:'/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            combine:{
                files:{
                    '<%= build.file.css %>':['<%= union.file.css %>'],
                    'build/insetTmt.css':['css/insetTmt.css'],
                    'build/p4p-2.0.css':['css/p4p-2.0.css']
                }
            }
        },
        compress: {
            tmt: {
                options: {
                    archive: 'dist/img.taotaosou.cn-browser-static-tmt<%= grunt.template.today("yyyy-mm-dd_HH_MM_ss") %>.tar',
                    mode: 'tar'
                },
                files: [
                    {expand: true, cwd: 'build/', src: ['**'], dest: 'tmt/'}
                ]
            }
        },
        clean: {
            base: {
                src: ['copy', 'build', 'dist/tmt', 'dist/qzone', 'dist/taotaolink']
            },
            compress: {
                src: ['dist/*.tar']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-htmlmin');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('union', 'tts union', function () {
        grunt.task.run('jshint:union');
        grunt.task.run('concat:union');
        grunt.task.run('replace:union');
        grunt.task.run('uglify:union');
    });
    grunt.registerTask('tmt', 'tts tmt', function () {
        grunt.task.run('clean');
        grunt.task.run('cssmin');
        //grunt.task.run('jshint:tmt');
        grunt.task.run('concat:tmt');
        grunt.task.run('replace:tmt');
        grunt.task.run('uglify:tmt');

        grunt.task.run('jshint:union');
        grunt.task.run('concat:union');
        grunt.task.run('replace:union');
        grunt.task.run('uglify:union');

        grunt.task.run('jshint:bubble');
        grunt.task.run('uglify:bubble');

        grunt.task.run('copy:tmt');
        grunt.task.run('compress:tmt');

        grunt.task.run('jshint:center');
        grunt.task.run('uglify:center');
        grunt.task.run('replace:center');

        grunt.task.run('clean:base');
    });
    grunt.registerTask('lib', 'tts union', function () {
        //grunt.task.run('jshint:union');
        grunt.task.run('concat:lib');
        grunt.task.run('uglify:lib');
    });
    grunt.registerTask('center', 'tts union', function () {
        //grunt.task.run('jshint:union');
        grunt.task.run('jshint:center');
        grunt.task.run('uglify:center');
        grunt.task.run('replace:center');
    });
    grunt.registerTask('bubble', 'tts union', function () {
        grunt.task.run('jshint:bubble');
        grunt.task.run('uglify:bubble');
    });
    grunt.registerTask('slides', 'tts union', function () {
        grunt.task.run('jshint:slides');
        grunt.task.run('uglify:slides');
    });
    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};
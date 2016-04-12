module.exports = function(grunt){
	grunt.initConfig({
		dalek:     {
			options: {
				browser:   ['phantomjs'], // generate an html & an jUnit report
				reporter:  ['html', 'junit'], // don't load config from an Dalekfile
				dalekfile: false
				// Task-specific options go here.
			}, dist: {
				src: ['test/dalek/*.js']
			}
		},
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			scripts: {
				files:   ['src/js/*.js', 'src/*/js/*.js', 'src/css/*.scss', 'src/*/css/*.scss'],
				tasks:   ['devbuild'],
				options: {
					spawn: true
				}
			}
		},
		concat: {
			options: {
				separator: '\n\n'
			}, js:   {
				src:  ['node_modules/clipboard/dist/clipboard.min.js', 'vendor/components/jquery/jquery.min.js', 'vendor/components/jqueryui/jquery-ui.min.js', 'vendor/twbs/bootstrap/dist/js/bootstrap.min.js', 'vendor/lightball/LightballApplication/src/js/*.js', 'src/*/js/*.js'],
				dest: 'web/js/main.js'
			}, css:  {
				src:  ['vendor/twbs/bootstrap/dist/css/bootstrap.min.css', 'vendor/fortawesome/font-awesome/css/font-awesome.min.css', 'vendor/lightball/LightballApplication/src/css/style.css', 'src/*/css/*.css', 'vendor/components/jqueryui/themes/base/jquery-ui.min.css', 'vendor/components/jqueryui/themes/smoothness/theme.css'],
				dest: 'web/css/style.css'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			}, js:   {
				files: {
					'web/js/main.min.js': ['<%= concat.js.dest %>']
				}
			}
		},
		cssmin: {
			options:   {
				shorthandCompacting: false, roundingPrecision: -1
			}, target: {
				files: {
					'web/css/style.min.css': ['web/css/style.css']
				}
			}
		},
		sass:   {
			module: {
				files: [{
					expand: true, src: ['vendor/lightball/LightballApplication/src/css/style.scss', 'src/*/css/style.scss'], ext: '.css'
				}]
			}
		}, clean:  {
			css: ['src/*/css/style.css', 'vendor/lightball/LightballApplication/src/css/style.css', 'src/*/css/style.css.map', 'vendor/lightball/LightballApplication/src/css/style.css.map']
		},php: {
			dist: {
				options: {
					port: 8080,
					keepalive: true,
					open: true,
					base: 'web'
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-php');
	grunt.loadNpmTasks('grunt-dalek');
	// A very basic default task.
	grunt.registerTask('default', 'Log some stuff.', function(){
		grunt.task.run(['dalek'])
		grunt.log.write('Logging some stuff...').ok();
	});
	grunt.registerTask('build', ['sass', 'concat', 'uglify', 'cssmin', 'clean']);
	grunt.registerTask('devbuild', ['sass', 'concat', 'clean']);
	grunt.registerTask('server', ['php']);
};


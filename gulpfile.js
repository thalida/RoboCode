var gulp = require('gulp'),
    gutil = require("gulp-util"),
    fs = require('fs'),
    rename = require("gulp-rename"),
    modify = require('gulp-modify'),
    yargs = require('yargs'),
    argv = require('yargs').argv;

// =============================================================================
//
// CREATE
//
// -----------------------------------------------------------------------------
var escapeRegExp = function (str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

var replaceAll = function (str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

var capsFirstChar = function( str ){
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// http://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
var camelCase = function( str ){
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
};

var create = {
    config: {
        appName: 'app',
        view: {
            folder: 'views',
            demoDir: '__builder/views/__example'
        },
        component: {
            folder: 'components',
            demoDir: '__builder/components/__exampleComponent'
        },
        directive: {
            folder: 'components',
            demoDir: '__builder/components/__exampleDirective'
        },
        service: {
            folder: 'services',
            demoDir: '__builder/services/__example'
        }
    },

    run: function( args ){
        var self = this;

        self.args = args;
        var appPath = './app'

        return fs.access(appPath, fs.F_OK, function( err ){
            self.createStructure('component', self.args);
            self.createStructure('directive', self.args);
            self.createStructure('service', self.args);
            self.createStructure('view', self.args);
        });
    },

    createStructure: function( type, args ){
        var self = this;

        var appName = self.config.appName;
        var typeConfig = self.config[type];

        var pluralType = type + 's';
        var items = (typeof args[type] === 'string') ? [args[type]] : args[type];
        var origPath = typeConfig.demoDir;

        if( !items ){
            gutil.log(gutil.colors.yellow(capsFirstChar(pluralType)), gutil.colors.red('SKIPPING'));
            return;
        }

        items.forEach(function(name, index){
            var itemPath = './' + appName + '/' + typeConfig.folder + '/' + name;
            fs.access(itemPath, fs.F_OK, function( err ){
                var foundFile = !err;

                if( foundFile ){
                    return gutil.log(gutil.colors.yellow(capsFirstChar(pluralType)), gutil.colors.red('ERROR ' + name + ' ' + type + ' ALREADY EXISTS!'));
                }

                gulp.src( origPath + '/**/*')
                    .pipe(modify({
                        fileModifier: function(file, contents) {
                            contents = replaceAll(contents, '{{appname}}', appName);
                            contents = replaceAll(contents, '{{appName}}', camelCase( appName ));
                            contents = replaceAll(contents, '{{Appname}}', capsFirstChar( appName ));

                            contents = replaceAll(contents, '__exampleCamelCase', camelCase( name ));
                            contents = replaceAll(contents, '__ExampleCamelCase', capsFirstChar(camelCase( name )));

                            contents = replaceAll(contents, '__example', name);
                            contents = replaceAll(contents, '__Example', capsFirstChar( name ));
                            return contents;
                        }
                    }))
                    .pipe(rename(function( path ){
                        path.basename = replaceAll(path.basename, '__exampleDirective', name);
                        path.basename = replaceAll(path.basename, '__exampleComponent', name);
                        path.basename = replaceAll(path.basename, '__example', name);
                    }))
                    .pipe(gulp.dest( itemPath ))
                    .on('end', function(){
                        gutil.log(gutil.colors.yellow(capsFirstChar(pluralType)), gutil.colors.green('CREATED ' + name + ' ' + type));
                    });
            });
        });
    }
};

gulp.task('create', function(callback){
    var createArgs = yargs
        .usage('gulp create [--component|--directive|--service|--view <name>] ')
        .options({
            'component': {
                alias: 'c',
                describe: 'Creates a component with the given name',
                type: 'string',
                requiresArg: true,
            },
            'directive': {
                alias: 'd',
                describe: 'Creates a directive with the given name',
                type: 'string',
                requiresArg: true,
            },
            'service': {
                alias: 's',
                describe: 'Creates a service with the given name',
                type: 'string',
                requiresArg: true,
            },
            'view': {
                alias: 'v',
                describe: 'Creates a view with the given name',
                type: 'string',
                requiresArg: true,
            }
        })
        .help('help')
        .alias('help', 'h')
        .strict()
        .argv

    return create.run( createArgs );
});

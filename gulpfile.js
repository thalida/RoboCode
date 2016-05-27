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

var pascalCase = function( str ){
    return capsFirstChar( camelCase(str) );
};

var create = {
    config: {
        appName: 'app',
        view: {
            folder: 'views',
            demoDir: '__builder/views/__example-structure__'
        },
        component: {
            folder: 'components',
            demoDir: '__builder/components/__example-component__'
        },
        directive: {
            folder: 'components',
            demoDir: '__builder/components/__example-directive__'
        },
        service: {
            folder: 'services',
            demoDir: '__builder/services/__example-structure__'
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
                            contents = replaceAll(contents, '__app-name__', appName);
                            contents = replaceAll(contents, '__App-name__', capsFirstChar( appName ));
                            contents = replaceAll(contents, '__appName__', camelCase( appName ));
                            contents = replaceAll(contents, '__AppName__', pascalCase( appName ));

                            contents = replaceAll(contents, '__example-structure__', name);
                            contents = replaceAll(contents, '__Example-structure__', capsFirstChar( name ));
                            contents = replaceAll(contents, '__exampleStructure__', camelCase( name ));
                            contents = replaceAll(contents, '__ExampleStructure__', pascalCase( name ));

                            return contents;
                        }
                    }))
                    .pipe(rename(function( path ){
                        path.basename = replaceAll(path.basename, '__example-directive__', name);
                        path.basename = replaceAll(path.basename, '__example-component__', name);
                        path.basename = replaceAll(path.basename, '__example-structure__', name);
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

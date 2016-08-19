interface IModuleOptions {
    element?: (string | Element | Document);
    name: string;
    imports: string[];
    declarations: any[];
    bootstrap: any;
}

// from https://github.com/angular/angular.js/blob/v1.3.10/src/Angular.js#L1447-L1453
var SNAKE_CASE_REGEXP = /[A-Z]/g;
function snakeCase(name, separator) {
    separator = separator || '_';

    return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
        return (pos ? separator : '') + letter.toLowerCase();
    });
}

export function Module(options: IModuleOptions) {
    return function(target: any) {
        let module: ng.IModule;
        target.$name = options.name;

        module = angular.module(options.name, options.imports || []);

        if (angular.isString(options.bootstrap)) {
            module.config(["$urlRouterProvider", ($urlRouterProvider) => {
                $urlRouterProvider.otherwise(options.bootstrap);
            }]);
        }
        else if (angular.isFunction(options.bootstrap)) {
            module.config(["$urlRouterProvider", ($urlRouterProvider) => {
                $urlRouterProvider.otherwise(options.bootstrap.$$stateOptions.url);
            }]);
        }

        Object.keys(target.prototype).forEach(function(element, index, array) {
            var property = target.prototype[element];
            if (typeof(property) === "function" && property.$$type) {
                switch (property.$$type) {
                    case "config":
                        module.config(property)
                        break;
                    case "run":
                        module.config(property)
                        break;
                    case "constant":
                        module.constant(property.$$options.name, property())
                        break;
                    case "value":
                        module.value(property.$$options.name, property())
                        break;
                }
            }
            
            delete property.$$options;
            delete property.$$type;
        });

        for (var index = 0; index < options.declarations.length; index++) {
            const dependency = options.declarations[index];

            switch (dependency.$$type) {
                case "component":
                    module.component(dependency.$$options.name, angular.extend(dependency.$$options || {}, { controller: dependency }));

                    if (dependency.$$stateOptions) {
                        module.config(["$stateProvider", ($stateProvider: ng.ui.IStateProvider) => {
                            $stateProvider.state(
                                dependency.$$stateOptions.name 
                                    ? dependency.$$stateOptions.name 
                                    : dependency.$$options.name, 
                                angular.extend({
                                    template: "<" + snakeCase(dependency.$$options.name, "-") + " />"
                                }, dependency.$$stateOptions));
                        }]);
                    }

                    break;
                case "controller":
                    module.controller(dependency.$$options.name, dependency);
                    break;
                case "directive":
                    module.directive(dependency.$$options.name, function() {
                        return angular.extend(dependency.$$options || {}, dependency);
                    });
                    break;
                case "factory":
                    module.factory(dependency.$$options.name, dependency);
                    break;
                case "filter":
                    module.filter(dependency.$$options.name, dependency);
                    break;
                case "provider":
                    module.provider(dependency.$$options.name, dependency);
                    break;
                case "service":
                    module.service(dependency.$$options.name, dependency);
                    break;
            }

            // delete dependency.$$options;
            // delete dependency.$$type;
        }
    };
}

export function Inject(dependency: string) {
   return function(target: any, key: string, index: number) {
      target = key ? target[key] : target;
      target.$inject = target.$inject || [];
      target.$inject[index] = dependency;
   };
}

export function State(options: any) {
    return function(target: any) {
        target.$$stateOptions = options;
    };
}

export function Component(options: any) {
    return function(target: any) {
        target.$$type = "component";
        target.$$options = options;
    };
}

export function Controller(options: any) {
    return function(target: any) {
        target.$$type = "controller";
        target.$$options = options;
    };
}

export function Filter(options: any) {
    return function(target: any, key: string) {
        target = key ? target[key] : target;
        target.$$type = "filter";
        target.$$options = options;
    };
}

export function Provider(options: any) {
    return function(target: any) {
        target.$$type = "provider";
        target.$$options = options;
    };
}

export function Service(options: any) {
    return function(target: any) {
        target.$$type = "service";
        target.$$options = options;
    };
}

export function Directive(options?: ng.IDirective) {
    return function(target: any) {
        target.$$type = "directive";
        target.$$options = options;
    };
}

export function Config() {
   return function(target: any, key: string) {
        target = key ? target[key] : target;
        target.$$type = "config";
        target.$$options = {};
   };
}

export function Run() {
   return function(target: any, key: string) {
        target = key ? target[key] : target;
        target.$$type = "run";
        target.$$options = {};
   };
}

export function Constant(name: string) {
   return function(target: any, key: string) {
        target = key ? target[key] : target;
        target.$$type = "constant";
        target.$$options = {
            name: name
        };
   };
}

export function Value(name: string) {
   return function(target: any, key: string) {
        target = key ? target[key] : target;
        target.$$type = "value";
        target.$$options = {
            name: name
        };
   };
}
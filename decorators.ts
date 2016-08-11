interface INgModuleOptions {
    element?: (string | Element | Document);
    name: string;
    imports: string[];
    declarations: any[];
}

export function NgModule(options: INgModuleOptions) {
    return function(target: any) {
        let module: ng.IModule;
        target.$name = options.name;

        module = angular.module(options.name, options.imports || []);

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
            var dependency = options.declarations[index];

            switch (dependency.$$type) {
                case "component":
                    module.component(dependency.$$options.name, angular.extend(dependency.$$options || {}, { controller: dependency }));
                    break;
                case "controller":
                    console.log("Adding controller to app:", dependency, target);
                    module.controller(dependency.$$options.name, dependency);
                    break;
                case "directive":
                    console.log("Adding directive to app:", dependency, target);
                    module.directive(dependency.$$options.name, function() {
                        return angular.extend(dependency.$$options || {}, dependency);
                    });
                    break;
                case "factory":
                    console.log("Adding factory to app:", dependency, target);
                    module.factory(dependency.$$options.name, dependency);
                    break;
                case "filter":
                    console.log("Adding filter to app:", dependency, target);
                    module.filter(dependency.$$options.name, dependency);
                    break;
                case "provider":
                    console.log("Adding provider to app:", dependency, target);
                    module.provider(dependency.$$options.name, dependency);
                    break;
                case "service":
                    module.service(dependency.$$options.name, dependency);
                    break;
            }

            delete dependency.$$options;
            delete dependency.$$type;
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
        console.log("Controller:", target, target.$$type, target.$$options);
    };
}

export function Factory(options: any) {
    return function(target: any) {
        target.$$type = "factory";
        target.$$options = options;
        console.log("Factory:", target, target.$$type, target.$$options);
    };
}

export function Filter(options: any): MethodDecorator {
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
        console.log("Provider:", target, target.$$type, target.$$options);
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
        console.log("Directive:", target, target.$$type, target.$$options);
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
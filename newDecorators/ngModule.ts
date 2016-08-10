interface INgModuleOptions {
    element?: (string | Element | JQuery | Document);
    name: string;
    imports: (string | ng.IModule)[];
    declarations: any[];
}

/**
 * Declare angular module with given name.
 * Use @Requires to declare requirements.
 * Note: @Requires decorator should be put next line to the @App.
 * Note: If module already defined it will be used to bootstrap aplication.
 * Note: angular module instance will be passed to constructor.
 * @param {string} name - name of module.
 * @returns {ClassDecorator}
 */
export function NgModule(options: INgModuleOptions) {
    return function(target: any) {
        let module: ng.IModule;
        target.$name = options.name;

        try {
            module = angular.module(options.name);
        } catch (err) {
            module = angular.module(options.name, target.$inject || []);
        }

        function bootstrap() {
            angular.bootstrap(options.element, [target.$name]);
        }

        if ((window as any).$bootstrap) {
            (window as any).$bootstrap.then(bootstrap);
        } else {
            angular.element(options.element).ready(bootstrap);
        }

        for (var index = 0; index < options.declarations.length; index++) {
            var dependency = options.declarations[index];

            if (dependency.$$type === "component") {
                module.component(name, angular.extend(dependency.$options || {}, { controller: dependency }));
            }
        }
    };
}
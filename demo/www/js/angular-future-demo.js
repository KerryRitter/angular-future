var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
System.register("decorators", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function NgModule(options) {
        return function (target) {
            var module;
            target.$name = options.name;
            module = angular.module(options.name, options.imports || []);
            Object.keys(target.prototype).forEach(function (element, index, array) {
                var property = target.prototype[element];
                if (typeof (property) === "function" && property.$$type) {
                    switch (property.$$type) {
                        case "config":
                            module.config(property);
                            break;
                        case "run":
                            module.config(property);
                            break;
                        case "constant":
                            module.constant(property.$$options.name, property());
                            break;
                        case "value":
                            module.value(property.$$options.name, property());
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
                        module.directive(dependency.$$options.name, function () {
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
    exports_1("NgModule", NgModule);
    function Inject(dependency) {
        return function (target, key, index) {
            target = key ? target[key] : target;
            target.$inject = target.$inject || [];
            target.$inject[index] = dependency;
        };
    }
    exports_1("Inject", Inject);
    function Component(options) {
        return function (target) {
            target.$$type = "component";
            target.$$options = options;
        };
    }
    exports_1("Component", Component);
    function Controller(options) {
        return function (target) {
            target.$$type = "controller";
            target.$$options = options;
            console.log("Controller:", target, target.$$type, target.$$options);
        };
    }
    exports_1("Controller", Controller);
    function Factory(options) {
        return function (target) {
            target.$$type = "factory";
            target.$$options = options;
            console.log("Factory:", target, target.$$type, target.$$options);
        };
    }
    exports_1("Factory", Factory);
    function Filter(options) {
        return function (target, key) {
            target = key ? target[key] : target;
            target.$$type = "filter";
            target.$$options = options;
        };
    }
    exports_1("Filter", Filter);
    function Provider(options) {
        return function (target) {
            target.$$type = "provider";
            target.$$options = options;
            console.log("Provider:", target, target.$$type, target.$$options);
        };
    }
    exports_1("Provider", Provider);
    function Service(options) {
        return function (target) {
            target.$$type = "service";
            target.$$options = options;
        };
    }
    exports_1("Service", Service);
    function Directive(options) {
        return function (target) {
            target.$$type = "directive";
            target.$$options = options;
            console.log("Directive:", target, target.$$type, target.$$options);
        };
    }
    exports_1("Directive", Directive);
    function Config() {
        return function (target, key) {
            target = key ? target[key] : target;
            target.$$type = "config";
            target.$$options = {};
        };
    }
    exports_1("Config", Config);
    function Run() {
        return function (target, key) {
            target = key ? target[key] : target;
            target.$$type = "run";
            target.$$options = {};
        };
    }
    exports_1("Run", Run);
    function Constant(name) {
        return function (target, key) {
            target = key ? target[key] : target;
            target.$$type = "constant";
            target.$$options = {
                name: name
            };
        };
    }
    exports_1("Constant", Constant);
    function Value(name) {
        return function (target, key) {
            target = key ? target[key] : target;
            target.$$type = "value";
            target.$$options = {
                name: name
            };
        };
    }
    exports_1("Value", Value);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("demo/ts/myService", ["decorators"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var decorators_1;
    var MyService;
    return {
        setters:[
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            }],
        execute: function() {
            MyService = (function () {
                function MyService(_httpService) {
                    this._httpService = _httpService;
                }
                MyService.prototype.getStuff = function () {
                    return "service value";
                };
                MyService = __decorate([
                    decorators_1.Service({
                        name: "myService"
                    }),
                    __param(0, decorators_1.Inject("$http")), 
                    __metadata('design:paramtypes', [Object])
                ], MyService);
                return MyService;
            }());
            exports_2("MyService", MyService);
        }
    }
});
System.register("demo/ts/myFactory", ["decorators"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var decorators_2;
    var MyFactory;
    return {
        setters:[
            function (decorators_2_1) {
                decorators_2 = decorators_2_1;
            }],
        execute: function() {
            MyFactory = (function () {
                function MyFactory() {
                }
                MyFactory.myFactoryValue = "myFactoryValue";
                MyFactory = __decorate([
                    decorators_2.Factory({
                        name: "myFactory"
                    }), 
                    __metadata('design:paramtypes', [])
                ], MyFactory);
                return MyFactory;
            }());
            exports_3("MyFactory", MyFactory);
        }
    }
});
System.register("demo/ts/myComponent", ["decorators", "demo/ts/myService"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var decorators_3, myService_1;
    var MyComponent;
    return {
        setters:[
            function (decorators_3_1) {
                decorators_3 = decorators_3_1;
            },
            function (myService_1_1) {
                myService_1 = myService_1_1;
            }],
        execute: function() {
            MyComponent = (function () {
                function MyComponent(myService, myFactory, myConstant, myValue) {
                    this.myService = myService;
                    this.myFactory = myFactory;
                    this.myConstant = myConstant;
                    this.myValue = myValue;
                }
                MyComponent = __decorate([
                    decorators_3.Component({
                        name: "myComponent",
                        template: "\n        <h2>Example</h2>\n        <ul>\n            <li>Service Value: {{$ctrl.myService.getStuff()}}</li>\n            <li>Factory Value: {{$ctrl.myFactory.getStuff()}}</li>\n            <li>Constant: {{$ctrl.myConstant}}</li>\n            <li>Value: {{$ctrl.myValue}}</li>\n            <li my-directive>My decorator turns this red</li>\n        </ul>\n    "
                    }),
                    __param(0, decorators_3.Inject("myService")),
                    __param(1, decorators_3.Inject("myFactory")),
                    __param(2, decorators_3.Inject("myConstant")),
                    __param(3, decorators_3.Inject("myValue")), 
                    __metadata('design:paramtypes', [myService_1.MyService, myService_1.MyService, String, String])
                ], MyComponent);
                return MyComponent;
            }());
            exports_4("MyComponent", MyComponent);
        }
    }
});
System.register("demo/ts/myDirective", ["decorators"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var decorators_4;
    var MyDirective;
    return {
        setters:[
            function (decorators_4_1) {
                decorators_4 = decorators_4_1;
            }],
        execute: function() {
            MyDirective = (function () {
                function MyDirective($scope) {
                    this.$scope = $scope;
                }
                MyDirective.link = function (scope, element, attrs) {
                    element.css({
                        "color": "red"
                    });
                };
                MyDirective = __decorate([
                    decorators_4.Directive({
                        name: "myDirective",
                        restrict: "A"
                    }),
                    __param(0, decorators_4.Inject('$scope')), 
                    __metadata('design:paramtypes', [Object])
                ], MyDirective);
                return MyDirective;
            }());
            exports_5("MyDirective", MyDirective);
        }
    }
});
System.register("demo/ts/app", ["decorators", "demo/ts/myComponent", "demo/ts/myService", "demo/ts/myFactory", "demo/ts/myDirective"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var decorators_5, myComponent_1, myService_2, myFactory_1, myDirective_1;
    var MyModule;
    return {
        setters:[
            function (decorators_5_1) {
                decorators_5 = decorators_5_1;
            },
            function (myComponent_1_1) {
                myComponent_1 = myComponent_1_1;
            },
            function (myService_2_1) {
                myService_2 = myService_2_1;
            },
            function (myFactory_1_1) {
                myFactory_1 = myFactory_1_1;
            },
            function (myDirective_1_1) {
                myDirective_1 = myDirective_1_1;
            }],
        execute: function() {
            MyModule = (function () {
                function MyModule() {
                }
                MyModule.prototype.config = function (provide) {
                    // Config!
                };
                MyModule.prototype.run = function (provide) {
                    // Run!
                };
                MyModule.prototype.myConstant = function () {
                    return "my constant";
                };
                MyModule.prototype.myValue = function () {
                    return "my value";
                };
                __decorate([
                    decorators_5.Config(),
                    __param(0, decorators_5.Inject("$provide")), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MyModule.prototype, "config", null);
                __decorate([
                    decorators_5.Run(),
                    __param(0, decorators_5.Inject("$provide")), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MyModule.prototype, "run", null);
                __decorate([
                    decorators_5.Constant("myConstant"), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', String)
                ], MyModule.prototype, "myConstant", null);
                __decorate([
                    decorators_5.Value("myValue"), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', String)
                ], MyModule.prototype, "myValue", null);
                MyModule = __decorate([
                    decorators_5.NgModule({
                        name: "app",
                        imports: [],
                        declarations: [myComponent_1.MyComponent, myService_2.MyService, myFactory_1.MyFactory, myDirective_1.MyDirective]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MyModule);
                return MyModule;
            }());
        }
    }
});

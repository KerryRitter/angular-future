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
    var SNAKE_CASE_REGEXP;
    function snakeCase(name, separator) {
        separator = separator || '_';
        return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
            return (pos ? separator : '') + letter.toLowerCase();
        });
    }
    function Module(options) {
        return function (target) {
            var module;
            target.$name = options.name;
            module = angular.module(options.name, options.imports || []);
            if (angular.isString(options.bootstrap)) {
                module.config(["$urlRouterProvider", function ($urlRouterProvider) {
                        $urlRouterProvider.otherwise(options.bootstrap);
                    }]);
            }
            else if (angular.isFunction(options.bootstrap)) {
                module.config(["$urlRouterProvider", function ($urlRouterProvider) {
                        $urlRouterProvider.otherwise(options.bootstrap.$$stateOptions.url);
                    }]);
            }
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
            var _loop_1 = function() {
                var dependency = options.declarations[index];
                switch (dependency.$$type) {
                    case "component":
                        module.component(dependency.$$options.name, angular.extend(dependency.$$options || {}, { controller: dependency }));
                        if (dependency.$$stateOptions) {
                            module.config(["$stateProvider", function ($stateProvider) {
                                    $stateProvider.state(dependency.$$stateOptions.name
                                        ? dependency.$$stateOptions.name
                                        : dependency.$$options.name, angular.extend({
                                        template: "<" + snakeCase(dependency.$$options.name, "-") + " />"
                                    }, dependency.$$stateOptions));
                                }]);
                        }
                        break;
                    case "controller":
                        module.controller(dependency.$$options.name, dependency);
                        break;
                    case "directive":
                        module.directive(dependency.$$options.name, function () {
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
            };
            for (var index = 0; index < options.declarations.length; index++) {
                _loop_1();
            }
        };
    }
    exports_1("Module", Module);
    function Inject(dependency) {
        return function (target, key, index) {
            target = key ? target[key] : target;
            target.$inject = target.$inject || [];
            target.$inject[index] = dependency;
        };
    }
    exports_1("Inject", Inject);
    function State(options) {
        return function (target) {
            target.$$stateOptions = options;
        };
    }
    exports_1("State", State);
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
        };
    }
    exports_1("Controller", Controller);
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
            // from https://github.com/angular/angular.js/blob/v1.3.10/src/Angular.js#L1447-L1453
            SNAKE_CASE_REGEXP = /[A-Z]/g;
        }
    }
});
System.register("demo/ts/services/myService", ["decorators"], function(exports_2, context_2) {
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
                    __metadata('design:paramtypes', [Function])
                ], MyService);
                return MyService;
            }());
            exports_2("MyService", MyService);
        }
    }
});
System.register("demo/ts/components/myComponent", ["decorators", "demo/ts/services/myService"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var decorators_2, myService_1;
    var MyComponent;
    return {
        setters:[
            function (decorators_2_1) {
                decorators_2 = decorators_2_1;
            },
            function (myService_1_1) {
                myService_1 = myService_1_1;
            }],
        execute: function() {
            MyComponent = (function () {
                function MyComponent(myService, myConstant, myValue) {
                    this.myService = myService;
                    this.myConstant = myConstant;
                    this.myValue = myValue;
                }
                MyComponent = __decorate([
                    decorators_2.Component({
                        name: "myComponent",
                        template: "\n        <h2>Bindings</h2>\n        <div>\n            {{$ctrl.message}}\n        </div>\n        <hr />\n        <h2>Injections</h2>\n        <ul>\n            <li>Service Value: {{$ctrl.myService.getStuff()}}</li>\n            <li>Constant: {{$ctrl.myConstant}}</li>\n            <li>Value: {{$ctrl.myValue}}</li>\n            <li my-directive>My decorator turns this red</li>\n        </ul>\n    ",
                        bindings: {
                            message: "@"
                        }
                    }),
                    __param(0, decorators_2.Inject("myService")),
                    __param(1, decorators_2.Inject("myConstant")),
                    __param(2, decorators_2.Inject("myValue")), 
                    __metadata('design:paramtypes', [myService_1.MyService, String, String])
                ], MyComponent);
                return MyComponent;
            }());
            exports_3("MyComponent", MyComponent);
        }
    }
});
System.register("demo/ts/components/index", ["demo/ts/components/myComponent"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters:[
            function (myComponent_1_1) {
                exports_4({
                    "MyComponent": myComponent_1_1["MyComponent"]
                });
            }],
        execute: function() {
        }
    }
});
System.register("demo/ts/services/index", ["demo/ts/services/myService"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters:[
            function (myService_2_1) {
                exports_5({
                    "MyService": myService_2_1["MyService"]
                });
            }],
        execute: function() {
        }
    }
});
System.register("demo/ts/directives/myDirective", ["decorators"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var decorators_3;
    var MyDirective;
    return {
        setters:[
            function (decorators_3_1) {
                decorators_3 = decorators_3_1;
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
                    decorators_3.Directive({
                        name: "myDirective",
                        restrict: "A"
                    }),
                    __param(0, decorators_3.Inject('$scope')), 
                    __metadata('design:paramtypes', [Object])
                ], MyDirective);
                return MyDirective;
            }());
            exports_6("MyDirective", MyDirective);
        }
    }
});
System.register("demo/ts/directives/index", ["demo/ts/directives/myDirective"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    return {
        setters:[
            function (myDirective_1_1) {
                exports_7({
                    "MyDirective": myDirective_1_1["MyDirective"]
                });
            }],
        execute: function() {
        }
    }
});
System.register("demo/ts/pages/home", ["decorators"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var decorators_4;
    var HomePage;
    return {
        setters:[
            function (decorators_4_1) {
                decorators_4 = decorators_4_1;
            }],
        execute: function() {
            HomePage = (function () {
                function HomePage(_stateService) {
                    this._stateService = _stateService;
                }
                HomePage.prototype.goToTestPage = function (messageForTestPage) {
                    this._stateService.go("test", { message: messageForTestPage });
                };
                HomePage = __decorate([
                    decorators_4.Component({
                        name: "home",
                        template: "\n        <h1>Home Page</h2>\n\n        <button ng-click=\"$ctrl.goToTestPage('param message 1')\">\n            Pass 'param message 1' to the test page\n        </button>\n\n        <button ng-click=\"$ctrl.goToTestPage('param message 2')\">\n            Pass 'param message 2' to the test page\n        </button>\n\n        <my-component message=\"Hello there, from the home page!\" />\n    "
                    }),
                    decorators_4.State({
                        url: "/home",
                        params: {}
                    }),
                    __param(0, decorators_4.Inject("$state")), 
                    __metadata('design:paramtypes', [Object])
                ], HomePage);
                return HomePage;
            }());
            exports_8("HomePage", HomePage);
        }
    }
});
System.register("demo/ts/pages/test", ["decorators"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var decorators_5;
    var TestPage;
    return {
        setters:[
            function (decorators_5_1) {
                decorators_5 = decorators_5_1;
            }],
        execute: function() {
            TestPage = (function () {
                function TestPage(_stateService) {
                    this._stateService = _stateService;
                    this.messageFromParams = _stateService.params["message"];
                }
                TestPage = __decorate([
                    decorators_5.Component({
                        name: "test",
                        template: "\n        <h1>Test Page</h2>\n\n        <my-component message=\"{{$ctrl.messageFromParams}}\" />\n    "
                    }),
                    decorators_5.State({
                        url: "/test?message",
                        params: {
                            message: {
                                value: "default message"
                            }
                        }
                    }),
                    __param(0, decorators_5.Inject("$state")), 
                    __metadata('design:paramtypes', [Object])
                ], TestPage);
                return TestPage;
            }());
            exports_9("TestPage", TestPage);
        }
    }
});
System.register("demo/ts/pages/index", ["demo/ts/pages/home", "demo/ts/pages/test"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters:[
            function (home_1_1) {
                exports_10({
                    "HomePage": home_1_1["HomePage"]
                });
            },
            function (test_1_1) {
                exports_10({
                    "TestPage": test_1_1["TestPage"]
                });
            }],
        execute: function() {
        }
    }
});
/// <reference path="../typings/index.d.ts" />
System.register("demo/ts/app", ["decorators", "demo/ts/components/index", "demo/ts/services/index", "demo/ts/directives/index", "demo/ts/pages/index"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var decorators_6, index_1, index_2, index_3, index_4;
    var MyModule;
    return {
        setters:[
            function (decorators_6_1) {
                decorators_6 = decorators_6_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
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
                    decorators_6.Config(),
                    __param(0, decorators_6.Inject("$provide")), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MyModule.prototype, "config", null);
                __decorate([
                    decorators_6.Run(),
                    __param(0, decorators_6.Inject("$provide")), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MyModule.prototype, "run", null);
                __decorate([
                    decorators_6.Constant("myConstant"), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', String)
                ], MyModule.prototype, "myConstant", null);
                __decorate([
                    decorators_6.Value("myValue"), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', String)
                ], MyModule.prototype, "myValue", null);
                MyModule = __decorate([
                    decorators_6.Module({
                        name: "app",
                        imports: ["ui.router"],
                        declarations: [
                            index_1.MyComponent,
                            index_2.MyService,
                            index_3.MyDirective,
                            index_4.HomePage,
                            index_4.TestPage
                        ],
                        bootstrap: index_4.HomePage
                    }), 
                    __metadata('design:paramtypes', [])
                ], MyModule);
                return MyModule;
            }());
        }
    }
});

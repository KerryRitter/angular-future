/// <reference path="typings/index.d.ts" />
var angularFuture = angular.module("angular-future", ["ui.router"]);
angularFuture.service("navController", []);
angularFuture.service("navParams", []);
angularFuture.service("stateHistory", []);
angularFuture.run(["stateHistory", function (stateHistory) {
        stateHistory.setupRunWatcher();
    }]);

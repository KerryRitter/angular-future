/// <reference path="typings.d.ts" />

const angularFuture = angular.module("angular-future", ["ui.router"]);

angularFuture.service("navController", NavController);
angularFuture.service("navParams", NavParams);
angularFuture.service("stateHistory", StateHistory);

angularFuture.run(["stateHistory", (stateHistory: StateHistory) => {
    stateHistory.setupRunWatcher();
}]);
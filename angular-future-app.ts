/// <reference path="typings/index.d.ts" />

import {NavController} from "./services/navController";
import {NavParams} from "./services/navParams";
import {StateHistory} from "./services/stateHistory";

const angularFuture = angular.module("angular-future", ["ui.router"]);

angularFuture.service("navController", NavController);
angularFuture.service("navParams", NavParams);
angularFuture.service("stateHistory", StateHistory);

angularFuture.run(["stateHistory", (stateHistory: StateHistory) => {
    stateHistory.setupRunWatcher();
}]);
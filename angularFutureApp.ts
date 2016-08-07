angular.module("angular-future", ["ui.router"])

    .service("navController", NavController)
    .service("navParams", NavParams)
    .service("stateHistory", StateHistory)

    .run(["stateHistory", (stateHistory: StateHistory) => {
        stateHistory.setupRunWatcher();
    }]);
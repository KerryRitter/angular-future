/// <reference path="../typings.d.ts" />
var NavController = (function () {
    function NavController(_logService, state, _stateHistory) {
        this._logService = _logService;
        this.state = state;
        this._stateHistory = _stateHistory;
    }
    NavController.prototype.push = function (page, params) {
        this.state.go(angular.isString(page) ? page : page.__stateName, params);
    };
    NavController.prototype.pop = function (params) {
        this._stateHistory.back(params);
    };
    NavController.$inject = ["$log", "$state", "stateHistory"];
    return NavController;
}());
/// <reference path="../typings.d.ts" />
var NavParams = (function () {
    function NavParams(_stateService) {
        this._stateService = _stateService;
    }
    NavParams.prototype.get = function (parameter) {
        return this._stateService.params[parameter];
    };
    NavParams.$inject = ["$state"];
    return NavParams;
}());
/// <reference path="../typings.d.ts" />
var StateHistory = (function () {
    function StateHistory(_rootScopeService, _stateService, _qService) {
        this._rootScopeService = _rootScopeService;
        this._stateService = _stateService;
        this._qService = _qService;
        this._history = [];
        this._isHistoryLocked = false;
    }
    StateHistory.prototype.setLastState = function (st) {
        this._history.unshift(st);
    };
    StateHistory.prototype.getLastState = function () {
        return this._history.length > 0 ? this._history[0] : false;
    };
    StateHistory.prototype.hasLastState = function () {
        var lastSt = this.getLastState();
        if (lastSt && lastSt.state && lastSt.state.name === '') {
            this.clear();
            lastSt = this.getLastState();
        }
        return (lastSt && lastSt.state && lastSt.state.name !== '');
    };
    StateHistory.prototype.lockHistory = function () {
        this._isHistoryLocked = true;
    };
    StateHistory.prototype.unlockHistory = function () {
        this._isHistoryLocked = false;
    };
    StateHistory.prototype.isHistoryLocked = function () {
        return this._isHistoryLocked;
    };
    StateHistory.prototype.getItem = function (stateName) {
        var state;
        angular.forEach(this._history, function (item) {
            if (item.state.name === stateName) {
                state = item;
            }
        });
        return state;
    };
    StateHistory.prototype.removeItem = function (stateName) {
        var item = this.getItem(stateName);
        if (!item) {
            return false;
        }
        var index = this.getItemIndex(item);
        this._history.splice(index, 1);
        return true;
    };
    StateHistory.prototype.removeLastItem = function () {
        var lastItem = this.getLastState();
        return this.removeItem(lastItem.state.name);
    };
    StateHistory.prototype.back = function (defaultStateParams) {
        var _this = this;
        if (!this.isHistoryLocked()) {
            this.lockHistory();
        }
        var lastState = this.getLastState();
        if (lastState) {
            return this._stateService.go(lastState.state.name, defaultStateParams ? defaultStateParams : lastState.params).then(function () {
                _this._history.splice(_this._history.indexOf(lastState), 1);
                _this.unlockHistory();
            });
        }
    };
    StateHistory.prototype.clear = function () {
        this._history = [];
    };
    StateHistory.prototype.getHistory = function () {
        return this._history;
    };
    StateHistory.prototype.getItemIndex = function (item) {
        return this._history.indexOf(item);
    };
    StateHistory.prototype.setupRunWatcher = function () {
        var _this = this;
        this._rootScopeService.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
            if (_this.isHistoryLocked()) {
                return _this.unlockHistory();
            }
            if (!fromState.abstract) {
                _this.setLastState({
                    state: fromState,
                    params: fromParams
                });
            }
        });
    };
    StateHistory.$inject = ["$rootScope", "$state", "$q"];
    return StateHistory;
}());
var angularFuture = angular.module("angular-future", ["ui.router"]);
angularFuture.service("navController", NavController);
angularFuture.service("navParams", NavParams);
angularFuture.service("stateHistory", StateHistory);
angularFuture.run(["stateHistory", function (stateHistory) {
        stateHistory.setupRunWatcher();
    }]);

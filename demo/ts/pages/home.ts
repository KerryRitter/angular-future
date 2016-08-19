import { Inject, Component, State } from "../../../decorators";
import { MyService } from "../services/myService";

@Component({
    name: "home",
    template: `
        <h1>Home Page</h2>

        <button ng-click="$ctrl.goToTestPage('param message 1')">
            Pass 'param message 1' to the test page
        </button>

        <button ng-click="$ctrl.goToTestPage('param message 2')">
            Pass 'param message 2' to the test page
        </button>

        <my-component message="Hello there, from the home page!" />
    `
})
@State({
    url: "/home",
    params: {}
})
export class HomePage {
    public constructor(
        @Inject("$state") private _stateService: ng.ui.IStateService
    ) {
    }

    public goToTestPage(messageForTestPage: string) {
        this._stateService.go("test", { message: messageForTestPage });
    }
}
import { Inject, Component, State } from "../../../decorators";
import { MyService } from "../services/myService";

@Component({
    name: "test",
    template: `
        <h1>Test Page</h2>

        <my-component message="{{$ctrl.messageFromParams}}" />
    `
})
@State({
    url: "/test?message",
    params: {
        message: { 
            value: "default message"
        }
    }
})
export class TestPage {
    public messageFromParams: string;

    public constructor(
        @Inject("$state") private _stateService: ng.ui.IStateService
    ) {
        this.messageFromParams = _stateService.params["message"];
    }
}
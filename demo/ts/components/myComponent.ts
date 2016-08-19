import { Inject, Component } from "../../../decorators";
import { MyService } from "../services/myService";

@Component({
    name: "myComponent",
    template: `
        <h2>Bindings</h2>
        <div>
            {{$ctrl.message}}
        </div>
        <hr />
        <h2>Injections</h2>
        <ul>
            <li>Service Value: {{$ctrl.myService.getStuff()}}</li>
            <li>Constant: {{$ctrl.myConstant}}</li>
            <li>Value: {{$ctrl.myValue}}</li>
            <li my-directive>My decorator turns this red</li>
        </ul>
    `,
    bindings: {
        message: "@"
    }
})
export class MyComponent {
    public message: string;

    public constructor(
        @Inject("myService") public myService: MyService,
        @Inject("myConstant") public myConstant: string,
        @Inject("myValue") public myValue: string
    ) {
    }
}
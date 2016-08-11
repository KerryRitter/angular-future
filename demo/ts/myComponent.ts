import { Inject, Component } from "../../decorators";
import { MyService } from "./myService";
import { MyFactory } from "./myFactory";

@Component({
    name: "myComponent",
    template: `
        <h2>Example</h2>
        <ul>
            <li>Service Value: {{$ctrl.myService.getStuff()}}</li>
            <li>Factory Value: {{$ctrl.myFactory.getStuff()}}</li>
            <li>Constant: {{$ctrl.myConstant}}</li>
            <li>Value: {{$ctrl.myValue}}</li>
            <li my-directive>My decorator turns this red</li>
        </ul>
    `
})
export class MyComponent {
    public constructor(
        @Inject("myService") public myService: MyService,
        @Inject("myFactory") public myFactory: MyService,
        @Inject("myConstant") public myConstant: string,
        @Inject("myValue") public myValue: string
    ) {
    }
}
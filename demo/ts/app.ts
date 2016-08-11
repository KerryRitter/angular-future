import { 
    NgModule, 
    Inject, 
    Config, 
    Run,
    Constant,
    Value
} from "../../decorators";
import { MyComponent } from "./myComponent";
import { MyService } from "./myService";
import { MyFactory } from "./myFactory";
import { MyDirective } from "./myDirective";

@NgModule({
    name: "app",
    imports: [],
    declarations: [MyComponent, MyService, MyFactory, MyDirective]
})
class MyModule {
    @Config()
    public config(
        @Inject("$provide") provide: any
    ) {
        // Config!
    } 

    @Run()
    public run(
        @Inject("$provide") provide: any
    ) {
        // Run!
    }

    @Constant("myConstant")
    public myConstant(): string {
        return "my constant";
    }

    @Value("myValue")
    public myValue(): string {
        return "my value";
    }
}
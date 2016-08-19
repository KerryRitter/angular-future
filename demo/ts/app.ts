/// <reference path="../typings/index.d.ts" />

import { 
    Module, 
    Inject, 
    Config, 
    Run,
    Constant,
    Value
} from "../../decorators";
import { MyComponent } from "./components/index";
import { MyService } from "./services/index";
import { MyDirective } from "./directives/index";
import { HomePage, TestPage } from "./pages/index";

@Module({
    name: "app",
    imports: ["ui.router"],
    declarations: [
        MyComponent,
        MyService,
        MyDirective,
        HomePage, 
        TestPage
    ],
    bootstrap: HomePage
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
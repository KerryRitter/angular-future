import { Inject, Factory } from "../../decorators";

@Factory({
    name: "myFactory"
})
export class MyFactory {
    public static myFactoryValue: string = "myFactoryValue";
}
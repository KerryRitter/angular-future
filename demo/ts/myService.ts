import { Inject, Service } from "../../decorators";

@Service({
    name: "myService"
})
export class MyService {
    public constructor(
        @Inject("$http") private _httpService: ng.IHttpService
    ) {
    }

    public getStuff(): string {
        return "service value";
    }
}
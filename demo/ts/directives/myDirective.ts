import { Inject, Directive } from "../../../decorators";
import { MyService } from "../services/myService";

@Directive({
    name: "myDirective",
    restrict: "A"
})
export class MyDirective {
    constructor(
        @Inject('$scope') private $scope: ng.IScope
    ) {
    }

    public static link = (scope: ng.IScope, element: any, attrs: any) => {
        element.css({
            "color": "red"
        });
    }
}
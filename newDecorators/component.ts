import resolveModule from "../resolveModule";

export function Component(name: string, component?: ng.IComponentOptions) {
    return function(target: any) {
        target.$$type = "component";
        target.$$options = component;
    };
}

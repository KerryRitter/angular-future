export interface IPage {
    __stateName?: string;
}

export abstract class PageBase implements IPage {
    public constructor(
        private scope: ng.IScope
    ) {
    }
}
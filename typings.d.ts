/// <reference path="typings/index.d.ts" />

declare namespace af {
    interface IPage {
        __stateName?: string;
    }

    interface INavController {
        pop(params?: any);
        push(page: af.IPage|string, params?: any);
    }

    interface INavParams {
        get(parameter: string);
    }
}
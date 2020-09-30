export var __esModule: boolean;
declare var _default: typeof CustomMask | undefined;
export default _default;
declare const CustomMask_base: any;
declare class CustomMask extends CustomMask_base {
    [x: string]: any;
    static getType(): string;
    static getDefaultTranslation(): {
        9: (val: any) => any;
        A: (val: any) => any;
        S: (val: any) => any;
        '*': (val: any) => any;
    };
    getKeyboardType(): string;
    getValue(value: any, settings: any): any;
    getRawValue(maskedValue: any, settings: any): any;
    validate(value: any, settings: any): any;
}

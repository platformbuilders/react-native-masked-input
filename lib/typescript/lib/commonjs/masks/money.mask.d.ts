export var __esModule: boolean;
declare var _default: typeof MoneyMask | undefined;
export default _default;
declare const MoneyMask_base: any;
declare class MoneyMask extends MoneyMask_base {
    [x: string]: any;
    static getType(): string;
    getValue(value: any, settings: any): any;
    handleBlur(maskedValue: any, settings: any): {
        maskedText: any;
        rawText: number;
    };
    handleChange(value: any, settings: any): {
        maskedText: any;
        rawText: number;
    };
    handleFocus(maskedValue: any, settings: any): {
        maskedText: any;
        rawText: number;
    };
    normalizeValue(maskedValue: any, settings: any): any;
    getRawValueForMask(maskedValue: any, settings: any): any;
    getRawValue(maskedValue: any, settings: any): number;
    validate(value: any, settings: any): boolean;
    _sanitize(value: any, settings: any): any;
    _insert(text: any, index: any, string: any): any;
}

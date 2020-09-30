export var __esModule: boolean;
declare var _default: typeof DatetimeMask | undefined;
export default _default;
declare const DatetimeMask_base: any;
declare class DatetimeMask extends DatetimeMask_base {
    [x: string]: any;
    static getType(): string;
    getValue(value: any, settings: any): any;
    getRawValue(maskedValue: any, settings: any): any;
    validate(value: any, settings: any): any;
    _getMergedSettings(settings: any): any;
    getMask(value: any, settings: any): string;
}

export var __esModule: boolean;
declare var _default: typeof ZipCodeMask | undefined;
export default _default;
declare const ZipCodeMask_base: any;
declare class ZipCodeMask extends ZipCodeMask_base {
    [x: string]: any;
    static getType(): string;
    getValue(value: any, settings: any): any;
    getRawValue(maskedValue: any, settings: any): any;
    validate(value: any, settings: any): boolean;
    getMask(value: any, settings: any): string;
}

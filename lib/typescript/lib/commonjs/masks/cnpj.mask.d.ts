export var __esModule: boolean;
declare var _default: typeof CnpjMask | undefined;
export default _default;
export var validateCnpj: ((cnpj: any) => boolean) | undefined;
export var CNPJ_MASK: string | undefined;
declare const CnpjMask_base: any;
declare class CnpjMask extends CnpjMask_base {
    [x: string]: any;
    static getType(): string;
    getValue(value: any, settings: any): any;
    getRawValue(maskedValue: any, settings: any): any;
    validate(value: any, settings: any): boolean;
    getMask(value: any, settings: any): string;
}

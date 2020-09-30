export var __esModule: boolean;
declare var _default: typeof CpfMask | undefined;
export default _default;
export var validateCPF: ((cpf: any) => boolean) | undefined;
export var CPF_MASK: string | undefined;
declare const CpfMask_base: any;
declare class CpfMask extends CpfMask_base {
    [x: string]: any;
    static getType(): string;
    getValue(value: any, settings: any): any;
    getRawValue(maskedValue: any, settings: any): any;
    validate(value: any, settings: any): boolean;
    getMask(value: any, settings: any): string;
}

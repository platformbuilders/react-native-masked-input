export const CNPJ_MASK: "99.999.999/9999-99";
export function validateCnpj(cnpj: any): boolean;
export default class CnpjMask extends BaseMask {
    static getType(): string;
    getValue(value: any, settings: any): any;
    validate(value: any, settings: any): boolean;
}
import BaseMask from "./_base.mask";

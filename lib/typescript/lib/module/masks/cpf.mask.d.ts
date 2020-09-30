export const CPF_MASK: "999.999.999-99";
export function validateCPF(cpf: any): boolean;
export default class CpfMask extends BaseMask {
    static getType(): string;
    getValue(value: any, settings: any): any;
    validate(value: any, settings: any): boolean;
}
import BaseMask from "./_base.mask";

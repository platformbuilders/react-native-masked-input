export default class OnlyNumbersMask extends BaseMask {
    static getType(): string;
    getValue(value: any, settings: any): any;
    validate(value: any, settings: any): boolean;
}
import BaseMask from "./_base.mask";

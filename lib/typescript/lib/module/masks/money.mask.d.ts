export default class MoneyMask extends BaseMask {
    static getType(): string;
    getValue(value: any, settings: any): string;
    handleBlur(maskedValue: any, settings: any): {
        maskedText: any;
        rawText: number;
    };
    handleChange(value: any, settings: any): {
        maskedText: string;
        rawText: number;
    };
    handleFocus(maskedValue: any, settings: any): {
        maskedText: any;
        rawText: number;
    };
    normalizeValue(maskedValue: any, settings: any): any;
    getRawValueForMask(maskedValue: any, settings: any): any;
    validate(value: any, settings: any): boolean;
    _sanitize(value: any, settings: any): any;
    _insert(text: any, index: any, string: any): any;
}
import BaseMask from "./_base.mask";

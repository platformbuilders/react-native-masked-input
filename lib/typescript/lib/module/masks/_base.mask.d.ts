export default class BaseMask {
    getKeyboardType(): string;
    mergeSettings(obj1: any, obj2: any): any;
    getRawValue(maskedValue: any, settings: any): any;
    getDefaultValue(value: any): any;
    getMask(value: any, settings: any): void;
    removeNotNumbersForMoney(text: any): any;
    removeNotNumbers(text: any): any;
    removeWhiteSpaces(text: any): any;
    removeNotLeters(text: any): any;
}

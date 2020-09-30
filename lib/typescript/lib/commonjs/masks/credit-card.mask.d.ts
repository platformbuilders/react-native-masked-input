export var __esModule: boolean;
declare var _default: typeof CreditCardMask | undefined;
export default _default;
declare const CreditCardMask_base: any;
declare class CreditCardMask extends CreditCardMask_base {
    [x: string]: any;
    static getType(): string;
    getValue(value: any, settings: any): any;
    validate(value: any): any;
    getRawValue(maskedValue: any, settings: any): any;
    getMask(value: any, settings?: {}): string;
    getCardType(value: any): any;
}

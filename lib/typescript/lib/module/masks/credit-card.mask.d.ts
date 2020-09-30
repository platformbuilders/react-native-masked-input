export default class CreditCardMask extends BaseMask {
    static getType(): string;
    getValue(value: any, settings: any): any;
    validate(value: any): any;
    getCardType(value: any): any;
}
import BaseMask from "./_base.mask";

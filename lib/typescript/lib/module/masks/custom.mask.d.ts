export default class CustomMask extends BaseMask {
    static getType(): string;
    static getDefaultTranslation(): {
        9: (val: any) => any;
        A: (val: any) => any;
        S: (val: any) => any;
        '*': (val: any) => any;
    };
    getValue(value: any, settings: any): any;
    validate(value: any, settings: any): any;
}
import BaseMask from "./_base.mask";

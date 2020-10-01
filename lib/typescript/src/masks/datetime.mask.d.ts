export default class DatetimeMask extends BaseMask {
    static getType(): string;
    getValue(value: any, settings: any): any;
    validate(value: any, settings: any): any;
    _getMergedSettings(settings: any): any;
}
import BaseMask from "./_base.mask";

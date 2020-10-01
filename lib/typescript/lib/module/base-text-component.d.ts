export default class BaseTextComponent extends PureComponent<any, any, any> {
    constructor(props: any);
    updateValue(text: any): {
        maskedText: any;
        rawText: any;
    };
    isValid(): any;
    getRawValueFor(value: any): any;
    getRawValue(): any;
    _getOptions(): any;
    _mustUpdateValue(newValue: any): boolean;
    _resolveMaskHandler(): void;
    _maskHandler: any;
    _bindProps(nextProps: any): void;
    _getDefaultMaskedValue(value: any): any;
    _getMaskedValue(value: any): any;
    _getDefaultValue(value: any): any;
}
import { PureComponent } from "react";

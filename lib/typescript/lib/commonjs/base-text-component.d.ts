export var __esModule: boolean;
declare var _default: typeof BaseTextComponent | undefined;
export default _default;
declare class BaseTextComponent extends React.PureComponent<any, any, any> {
    constructor(props: any);
    updateValue(text: any): {
        maskedText: any;
        rawText: any;
    };
    isValid(): any;
    getRawValueFor(value: any): any;
    getRawValue(): any;
    getDisplayValueFor(value: any): any;
    _getOptions(): any;
    _mustUpdateValue(newValue: any): boolean;
    _resolveMaskHandler(): void;
    _maskHandler: any;
    _bindProps(nextProps: any): void;
    _getDefaultMaskedValue(value: any): any;
    _getMaskedValue(value: any): any;
    _getDefaultValue(value: any): any;
}

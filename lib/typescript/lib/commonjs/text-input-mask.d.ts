export var __esModule: boolean;
declare var _default: typeof TextInputMask | undefined;
export default _default;
declare const TextInputMask_base: any;
declare class TextInputMask extends TextInputMask_base {
    [x: string]: any;
    constructor(props: any);
    _handleFocus(e: any): void;
    _handleBlur(e: any): void;
    _inputElement: any;
    _onChangeText(text: any): void;
    getElement(): any;
    getDisplayValueFor(value: any): any;
    _handleChange(text: any): any;
    _trySetNativeProps(maskedText: any): void;
    _checkText(text: any): any;
    _getKeyboardType(): any;
    render(): any;
}

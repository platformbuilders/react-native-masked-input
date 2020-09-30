export default class TextInputMask extends BaseTextComponent {
    constructor(props: any);
    _handleFocus(e: any): void;
    _handleBlur(e: any): void;
    _inputElement: React.RefObject<any>;
    _onChangeText(text: any): void;
    getElement(): React.RefObject<any>;
    _trySetNativeProps(maskedText: any): void;
    _checkText(text: any): any;
    _getKeyboardType(): any;
}
import BaseTextComponent from "./base-text-component";
import React from "react";

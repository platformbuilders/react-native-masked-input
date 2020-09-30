import { TextInput, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import BaseTextComponent from './base-text-component';
import type { TextInputMaskProps, ValueType } from '../index';
import type { ReactText, RefObject } from 'react';
export default class TextInputMask extends BaseTextComponent<TextInputMaskProps> {
    _inputElement: RefObject<TextInput>;
    constructor(props: TextInputMaskProps);
    getElement(): RefObject<TextInput>;
    setContent: (maskedText: ReactText, rawText: number) => void;
    _onChangeText(text: string): void;
    _handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
    _handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
    _trySetNativeProps(maskedText: ValueType): void;
    _checkText(text: ValueType): boolean;
    _getKeyboardType(): string;
    render(): JSX.Element;
}

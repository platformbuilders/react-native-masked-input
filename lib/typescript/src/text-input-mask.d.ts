import { TextInput, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import BaseTextComponent from './base-text-component';
import type { TextInputMaskProps, TextInputOptionBaseInterface, ValueType } from './types';
import type { ReactText, RefObject } from 'react';
export default class TextInputMask<Options extends TextInputOptionBaseInterface> extends BaseTextComponent<TextInputMaskProps<Options>> {
    _inputElement: RefObject<TextInput>;
    constructor(props: TextInputMaskProps<Options>);
    getElement(): RefObject<TextInput>;
    setContent: (maskedText: ReactText, rawText: number) => void;
    getDisplayValueFor(value: ValueType): string;
    _handleChange(text: ValueType): import("./types").MaskHandlerReturnType;
    _onChangeText(text: string): void;
    _handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
    _handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
    _trySetNativeProps(maskedText: ValueType): void;
    _checkText(text: ValueType): boolean;
    _getKeyboardType(): string;
    render(): JSX.Element;
}

import {
  TextInput,
  Platform,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  KeyboardTypeOptions,
} from 'react-native';
import BaseTextComponent from './base-text-component';
import type {
  TextInputMaskProps,
  TextInputOptionBaseInterface,
  ValueType,
} from './types';
import type { ReactText, RefObject } from 'react';
import React from 'react';

export default class TextInputMask<
  Options extends TextInputOptionBaseInterface
> extends BaseTextComponent<TextInputMaskProps<Options>> {
  _inputElement!: RefObject<TextInput>;

  constructor(props: TextInputMaskProps<Options>) {
    super(props);

    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._inputElement = React.createRef<TextInput>();
    this._onChangeText = this._onChangeText.bind(this);
  }

  getElement() {
    return this._inputElement;
  }

  setContent = (maskedText: ReactText, rawText: number) => {
    if (this.props.onChangeText) {
      this._trySetNativeProps(maskedText);
      this.props.onChangeText(maskedText, rawText);
    }
  };

  getDisplayValueFor(value: ValueType) {
    return this._handleChange(value).maskedText;
  }

  _handleChange(text: ValueType) {
    return this._maskHandler.handleChange
      ? this._maskHandler.handleChange(text, this._getOptions())
      : this.updateValue(text);
  }

  _onChangeText(text: string) {
    if (!this._checkText(text)) {
      return;
    }

    const { maskedText, rawText } = this._handleChange(text);

    this.setContent(maskedText, rawText);
  }

  _handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    if (this._maskHandler.handleBlur) {
      const { maskedText, rawText } = this._maskHandler.handleBlur(
        this.props.value,
        this.props.options
      );

      this.setContent(maskedText, rawText);
    }

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  _handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    if (this._maskHandler.handleFocus) {
      const { maskedText, rawText } = this._maskHandler.handleFocus(
        this.props.value,
        this.props.options
      );
      this.setContent(maskedText, rawText);
    }

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  _trySetNativeProps(maskedText: ValueType) {
    if (typeof maskedText === 'number') {
      maskedText = maskedText.toString();
    }
    try {
      const element = this.getElement();

      element.current?.setNativeProps &&
        element.current.setNativeProps({ text: maskedText });
    } catch (error) {
      // silent
    }
  }

  _checkText(text: ValueType) {
    if (this.props.checkText) {
      return this.props.checkText(this.props.value, text);
    }

    return true;
  }

  _getKeyboardType() {
    return (
      this.props.keyboardType ||
      (this._maskHandler.getKeyboardType
        ? this._maskHandler.getKeyboardType()
        : 'default')
    );
  }

  render() {
    let Input = TextInput;
    let customTextInputProps = {};

    if (this.props.customTextInput) {
      Input = this.props.customTextInput;
      customTextInputProps = this.props.customTextInputProps || {};
    }

    return (
      <Input
        ref={this._inputElement}
        keyboardType={
          (Platform.OS !== 'web'
            ? this._getKeyboardType()
            : 'default') as KeyboardTypeOptions
        }
        {...this.props}
        {...customTextInputProps}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        onChangeText={this._onChangeText}
        value={this.getDisplayValueFor(this.props.value)}
      />
    );
  }
}

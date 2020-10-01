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

type State = {
  focused: boolean;
};

export default class TextInputMask<
  Options extends TextInputOptionBaseInterface
> extends BaseTextComponent<TextInputMaskProps<Options>, State> {
  _inputElement!: RefObject<TextInput>;

  constructor(props: TextInputMaskProps<Options>) {
    super(props);

    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._inputElement = React.createRef<TextInput>();
    this._onChangeText = this._onChangeText.bind(this);

    this.state = {
      focused: false,
    };
  }

  get getElement() {
    return this._inputElement;
  }

  setContent = (maskedText: ReactText, rawText: number) => {
    if (this.props.onChangeText) {
      this._trySetNativeProps(maskedText);
      this.props.onChangeText(maskedText, rawText);
    }
  };

  /**
   * if focused use handleFocus if available
   * @param value
   */
  getDisplayValueFor(value: ValueType) {
    if (this.state.focused && this._maskHandler.handleFocus) {
      const { maskedText } = this._maskHandler.handleFocus(
        this._getDefaultValue(this.props.value),
        this.props.options
      );

      return maskedText;
    }

    return this._maskHandler.handleBlur
      ? this._maskHandler.handleBlur(
          this._getDefaultValue(this.props.value),
          this.props.options
        ).maskedText
      : this._handleChange(value).maskedText;
  }

  _handleChange(text: ValueType) {
    return this._maskHandler.handleChange
      ? this._maskHandler.handleChange(
          this._getDefaultValue(text),
          this._getOptions()
        )
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
    this.setState({
      focused: false,
    });

    if (this._maskHandler.handleBlur) {
      const { maskedText, rawText } = this._maskHandler.handleBlur(
        this._getDefaultValue(this.props.value),
        this.props.options
      );

      this.setContent(maskedText, rawText);
    }

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  _handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    this.setState({
      focused: true,
    });

    if (this._maskHandler.handleFocus) {
      const { maskedText, rawText } = this._maskHandler.handleFocus(
        this._getDefaultValue(this.props.value),
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
      const element = this.getElement;

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

    if (this.props.customTextInput) {
      Input = this.props.customTextInput;
    }

    let displayValue = this.getDisplayValueFor(this.props.value);
    console.log(this.props, displayValue);

    return (
      <Input
        ref={this._inputElement}
        keyboardType={
          (Platform.OS !== 'web'
            ? this._getKeyboardType()
            : 'default') as KeyboardTypeOptions
        }
        {...this.props}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        onChangeText={this._onChangeText}
        value={displayValue}
      />
    );
  }
}

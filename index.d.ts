/**
 * Type Definition.
 *
 * Using with Typescript development.
 *
 * Definitions by: Italo Izaac <https://github.com/iiandrade>
 */

import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import type { ReactText, Ref } from 'react';

// Type prop of TextInputMask.
export type TextInputMaskTypeProp =
  | 'credit-card'
  | 'cpf'
  | 'cnpj'
  | 'zip-code'
  | 'only-numbers'
  | 'money'
  | 'cel-phone'
  | 'datetime'
  | 'custom'
  | 'only-letters';

export type MaskHandlerReturnType = { maskedText: string; rawText: number };

export type ValueType = ReactText;

export interface MaskHandlerInterface<Settings> {
  getMask: (value: ValueType, settings: Settings) => string;
  getRawValue: (maskedValue: ValueType, settings: Settings) => number;
  validate: (value: ValueType, settings?: Settings) => void;
  getValue: (value: ValueType, settings: Settings) => string;
  handleBlur?: (value: ValueType, settings: Settings) => MaskHandlerReturnType;
  handleFocus?: (value: ValueType, settings: Settings) => MaskHandlerReturnType;
  handleChange?: (
    value: ValueType,
    settings: Settings
  ) => MaskHandlerReturnType;
  getKeyboardType?: () => string;
}

export interface TextInputMoneyMaskOptions {
  // Money type.
  precision?: number;
  separator?: string;
  delimiter?: string;
  unit?: string;
  suffixUnit?: string;
  zeroCents?: boolean;
}

export interface TextInputMoneyPhoneOptions {
  withDDD?: boolean;
  dddMask?: string;
  maskType?: 'BRL' | 'INTERNATIONAL';
}

export type SupportedCreditCardIssuers =
  | 'visa-or-mastercard'
  | 'diners'
  | 'amex'
  | 'visa'
  | 'american-express'
  | 'diners-club'
  | 'discover'
  | 'jcb'
  | 'unionpay'
  | 'maestro'
  | 'elo'
  | 'mir'
  | 'hiper'
  | 'hipercard';

export interface TextInputMoneyDatetimeOptions {
  format?: string;
}

export interface TextInputCreditCardOptions {
  obfuscated?: boolean;
  issuer?: SupportedCreditCardIssuers;
}

export interface TextInputCustomMaskOptions {
  mask?: string;
  validator?: (value: string, settings: TextInputMaskOptionProp) => boolean;
  getRawValue?: (value: string, settings: TextInputMaskOptionProp) => any;
  translation?: { [s: string]: (val: string) => string | null | undefined };
}

// Option prop of TextInputMask.
export type TextInputMaskOptionProp = TextInputOptionBaseInterface &
  TextInputMoneyMaskOptions &
  TextInputMoneyDatetimeOptions &
  TextInputCreditCardOptions &
  TextInputCustomMaskOptions;

export interface TextInputOptionBaseInterface {}

// TextInputMask Props
export interface TextInputMaskProps<
  Options extends TextInputOptionBaseInterface = TextInputMaskOptionProp
> extends Pick<TextInputProps, Exclude<keyof TextInputProps, 'onChangeText'>> {
  type: TextInputMaskTypeProp;
  options?: Options;
  checkText?: (previous: ValueType, next: ValueType) => boolean;
  onChangeText?: (maskedText: ValueType, rawValue: number) => void;
  refInput?: Ref<TextInput>;
  customTextInput?: any;
  customTextInputProps?: Object;
  value: ValueType;
}

// TextInputMask Component
export class TextInputMask extends React.Component<TextInputMaskProps> {}

// TextMask
export class TextMask extends React.Component<TextInputMaskProps> {}

// MaskService
declare namespace MaskService {
  declare function toMask(
    type: TextInputMaskTypeProp,
    value: string,
    options?: TextInputMaskOptionProp
  ): string;

  declare function toRawValue(
    type: TextInputMaskTypeProp,
    maskedValue: string,
    options?: TextInputMaskOptionProp
  ): string;

  declare function isValid(
    type: TextInputMaskTypeProp,
    value: string,
    options?: TextInputMaskOptionProp
  ): boolean;
}

// TextInputMaskMethods
export class TextInputMaskMethods {
  getElement(): TextInput;

  getRawValue(): string;

  isValid(): boolean;
}

// TextInputMasked
export type TextInputMasked = TextInputMaskMethods | null;

// TextMaskMethods
export class TextMaskMethods {
  getElement(): TextInput;
}

// TextMaskInstance
export type TextMaskInstance = TextMaskMethods | null;

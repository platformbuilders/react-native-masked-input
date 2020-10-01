/**
 * Type Definition.
 *
 * Using with Typescript development.
 *
 * Definitions by: Italo Izaac <https://github.com/iiandrade>
 */

import type { TextInput, TextInputProps } from 'react-native';
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

export interface TextInputPhoneOptions {
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

export interface TextInputDatetimeOptions {
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
  TextInputDatetimeOptions &
  TextInputCreditCardOptions &
  TextInputPhoneOptions &
  TextInputCustomMaskOptions;

export interface TextInputOptionBaseInterface {}

type TextInputPropsWithoutValue = Pick<
  TextInputProps,
  Exclude<keyof TextInputProps, 'value'>
>;
// TextInputMask Props
export interface TextInputMaskProps<
  Options extends TextInputOptionBaseInterface = TextInputMaskOptionProp
> extends Pick<
    TextInputProps,
    Exclude<keyof TextInputPropsWithoutValue, 'onChangeText'>
  > {
  type: TextInputMaskTypeProp;
  options?: Options;
  checkText?: (previous: ValueType, next: ValueType) => boolean;
  onChangeText?: (maskedText: ValueType, rawValue: number) => void;
  refInput?: Ref<TextInput>;
  customTextInput?: any;
  customTextInputProps?: Object;
  value: ValueType;
}

// TextMaskMethods
interface TextMaskMethods {
  getElement(): TextInput;
}

// TextMaskInstance
export type TextMaskInstance = TextMaskMethods | null;

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

export interface MaskHandlerInterface<
  Options extends TextInputOptionBaseInterface
> {
  getMask: (value: ValueType, settings?: Options) => string;
  getRawValue: (maskedValue: ValueType, settings: Options) => number;
  validate: (value: ValueType, settings?: Options) => void;
  getValue: (value: ValueType, settings?: Options) => string;
  handleBlur?: (value: ValueType, settings?: Options) => MaskHandlerReturnType;
  handleFocus?: (value: ValueType, settings?: Options) => MaskHandlerReturnType;
  handleInit?: (
    value: ValueType,
    settings: Options
  ) => MaskHandlerInterface<any>;
  handleChange?: (value: ValueType, settings: Options) => MaskHandlerReturnType;
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
  value: ValueType;
}

// TextMaskMethods
interface TextMaskMethods {
  getElement(): TextInput;
}

// TextMaskInstance
export type TextMaskInstance = TextMaskMethods | null;

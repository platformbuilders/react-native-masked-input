/**
 * Type Definition.
 *
 * Using with Typescript development.
 *
 * Definitions by: Italo Izaac <https://github.com/iiandrade>
 */

import * as React from 'react'
import {TextInput, TextInputProps} from 'react-native'

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
    | 'only-letters'


export interface TextInputMoneyMaskOptions {
    // Money type.
    precision?: number
    separator?: string
    delimiter?: string
    unit?: string
    suffixUnit?: string
    zeroCents?: boolean
}

export interface TextInputMoneyPhoneOptions {
    withDDD?: boolean
    dddMask?: string
    maskType?: 'BRL' | 'INTERNATIONAL'
}

export type SupportedCreditCardIssuers = 'visa-or-mastercard'
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
    |'hipercard'

export interface TextInputMoneyDatetimeOptions {
    format?: string
}

export interface TextInputCreditCardOptions {
    obfuscated?: boolean
    issuer?: SupportedCreditCardIssuers
}

export interface TextInputCustomMaskOptions {
    mask?: string
    validator?: (value: string, settings: TextInputMaskOptionProp) => boolean
    getRawValue?: (value: string, settings: TextInputMaskOptionProp) => any
    translation?: { [s: string]: (val: string) => string | null | undefined }
}

// Option prop of TextInputMask.
export type TextInputMaskOptionProp = TextInputMoneyMaskOptions
    & TextInputMoneyDatetimeOptions
    & TextInputCreditCardOptions
    & TextInputCustomMaskOptions



// TextInputMask Props
export interface TextInputMaskProps extends Pick<TextInputProps, Exclude<keyof TextInputProps, 'onChangeText'>> {
    type: TextInputMaskTypeProp
    options?: TextInputMaskOptionProp
    checkText?: (previous: string, next: string) => boolean
    onChangeText?: (text: string, rawText?: string) => void
    refInput?: (ref: any) => void
    customTextInput?: any
    customTextInputProps?: Object
    includeRawValueInChangeText?: boolean
}

// TextInputMask Component
export class TextInputMask extends React.Component<TextInputMaskProps> {
}

// TextMask
export class TextMask extends React.Component<TextInputMaskProps> {
}

// MaskService
export namespace MaskService {
    function toMask(
        type: TextInputMaskTypeProp,
        value: string,
        options?: TextInputMaskOptionProp
    ): string

    function toRawValue(
        type: TextInputMaskTypeProp,
        maskedValue: string,
        options?: TextInputMaskOptionProp
    ): string

    function isValid(
        type: TextInputMaskTypeProp,
        value: string,
        options?: TextInputMaskOptionProp
    ): boolean
}

// TextInputMaskMethods
export class TextInputMaskMethods {
    getElement(): TextInput

    getRawValue(): string

    isValid(): boolean
}

// TextInputMasked
export type TextInputMasked = TextInputMaskMethods | null

// TextMaskMethods
export class TextMaskMethods {
    getElement(): TextInput
}

// TextMaskInstance
export type TextMaskInstance = TextMaskMethods | null

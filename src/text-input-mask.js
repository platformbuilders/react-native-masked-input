import React from 'react'
import {TextInput, Platform} from 'react-native'
import BaseTextComponent from './base-text-component'

export default class TextInputMask extends BaseTextComponent {
    constructor(props) {
        super(props);
        this._handleFocus = this._handleFocus.bind(this)
        this._handleBlur = this._handleBlur.bind(this)
    }
    getElement() {
        return this._inputElement
    }

    _onChangeText(text) {
        if (!this._checkText(text)) {
            return
        }

        const {maskedText, rawText} = this.updateValue(text)

        if (this.props.onChangeText) {
            this._trySetNativeProps(maskedText)
            this.props.onChangeText(maskedText, rawText)
        }
    }

    _handleBlur() {
        console.log(this._maskHandler.handleBlur);
        if (this._maskHandler.handleBlur) {
            const value = this._maskHandler.handleBlur(this.props.value)
            console.log(value);

            this._onChangeText(value)
        }

        if (this.props.onBlur) {
            this.props.onBlur()
        }
    }

    _handleFocus() {
        console.log(this._maskHandler.handleFocus);
        if (this._maskHandler.handleFocus) {
            const value = this._maskHandler.handleFocus(this.props.value)
            console.log(value);

            this._onChangeText(value)
        }

        if (this.props.onFocus) {
            this.props.onFocus()
        }
    }

    _trySetNativeProps(maskedText) {
        try {
            const element = this.getElement()
            element.setNativeProps && element.setNativeProps({text: maskedText})
        } catch (error) {
            // silent
        }
    }

    _checkText(text) {
        if (this.props.checkText) {
            return this.props.checkText(this.props.value, text)
        }

        return true
    }

    _getKeyboardType() {
        return this.props.keyboardType || this._maskHandler.getKeyboardType()
    }

    render() {
        let Input = TextInput
        let customTextInputProps = {}

        if (this.props.customTextInput) {
            Input = this.props.customTextInput
            customTextInputProps = this.props.customTextInputProps || {}
        }

        return (
            <Input
                ref={ref => {
                    if (ref) {
                        this._inputElement = ref

                        if (typeof this.props.refInput === 'function') {
                            this.props.refInput(ref)
                        } else if (this.props.refInput && typeof this.props.refInput === 'object') {
                            this.props.refInput.current = ref
                        }
                    }
                }}
                keyboardType={Platform.OS !== 'web' ? this._getKeyboardType() : undefined}
                {...this.props}
                {...customTextInputProps}
                onFocus={this._handleFocus}
                onBlur={this._onBlur}
                onChangeText={text => this._onChangeText(text)}
                value={
                    this.getDisplayValueFor(
                        this.props.value
                    )
                }
            />
        )
    }
}

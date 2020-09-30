"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

var _baseTextComponent = _interopRequireDefault(require("./base-text-component"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TextInputMask extends _baseTextComponent.default {
  constructor(props) {
    super(props);

    _defineProperty(this, "_inputElement", void 0);

    _defineProperty(this, "setContent", (maskedText, rawText) => {
      if (this.props.onChangeText) {
        this._trySetNativeProps(maskedText);

        this.props.onChangeText(maskedText, rawText);
      }
    });

    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._inputElement = /*#__PURE__*/_react.default.createRef();
    this._onChangeText = this._onChangeText.bind(this);
  }

  getElement() {
    return this._inputElement;
  }

  _onChangeText(text) {
    if (!this._checkText(text)) {
      return;
    }

    const {
      maskedText,
      rawText
    } = this.updateValue(text);
    this.setContent(maskedText, rawText);
  }

  _handleBlur(e) {
    if (this._maskHandler.handleBlur) {
      const {
        maskedText,
        rawText
      } = this._maskHandler.handleBlur(this.props.value, this.props.options);

      this.setContent(maskedText, rawText);
    }

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  _handleFocus(e) {
    if (this._maskHandler.handleFocus) {
      const {
        maskedText,
        rawText
      } = this._maskHandler.handleFocus(this.props.value, this.props.options);

      this.setContent(maskedText, rawText);
    }

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  _trySetNativeProps(maskedText) {
    try {
      var _element$current;

      const element = this.getElement();
      ((_element$current = element.current) === null || _element$current === void 0 ? void 0 : _element$current.setNativeProps) && element.current.setNativeProps({
        text: maskedText
      });
    } catch (error) {// silent
    }
  }

  _checkText(text) {
    if (this.props.checkText) {
      return this.props.checkText(this.props.value, text);
    }

    return true;
  }

  _getKeyboardType() {
    return this.props.keyboardType || (this._maskHandler.getKeyboardType ? this._maskHandler.getKeyboardType() : 'default');
  }

  render() {
    let Input = _reactNative.TextInput;
    let customTextInputProps = {};

    if (this.props.customTextInput) {
      Input = this.props.customTextInput;
      customTextInputProps = this.props.customTextInputProps || {};
    }

    return /*#__PURE__*/_react.default.createElement(Input, _extends({
      ref: this._inputElement,
      keyboardType: _reactNative.Platform.OS !== 'web' ? this._getKeyboardType() : 'default'
    }, this.props, customTextInputProps, {
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
      onChangeText: this._onChangeText,
      value: this.getDisplayValueFor(this.props.value)
    }));
  }

}

exports.default = TextInputMask;
//# sourceMappingURL=text-input-mask.js.map
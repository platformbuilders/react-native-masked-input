"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _maskResolver = _interopRequireDefault(require("./mask-resolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BaseTextComponent extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_maskHandler", void 0);

    this._resolveMaskHandler();
  }

  componentDidMount() {
    this._bindProps(this.props);
  }

  componentDidUpdate(prevProps) {
    this._bindProps(prevProps);
  }

  updateValue(text) {
    let maskedText = this._getMaskedValue(text);

    const rawText = this.getRawValueFor(maskedText);
    return {
      maskedText,
      rawText
    };
  }

  isValid() {
    return this._maskHandler.validate(this._getDefaultValue(this.props.value), this._getOptions());
  }

  getRawValueFor(value) {
    return this._maskHandler.getRawValue(this._getDefaultValue(value), this._getOptions());
  }

  getRawValue() {
    return this.getRawValueFor(this.props.value);
  }

  getDisplayValueFor(value) {
    return this._getMaskedValue(value);
  }

  _getOptions() {
    return this.props.options;
  }

  _mustUpdateValue(newValue) {
    return this.props.value !== newValue;
  }

  _resolveMaskHandler() {
    this._maskHandler = _maskResolver.default.resolve(this.props.type);
  }

  _bindProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this._resolveMaskHandler();
    }
  }

  _getDefaultMaskedValue(value) {
    if (this._getDefaultValue(value) === '') {
      return '';
    }

    return this._getMaskedValue(value);
  }

  _getMaskedValue(value) {
    const defaultValue = this._getDefaultValue(value);

    if (defaultValue === '') {
      return '';
    }

    return this._maskHandler.getValue(defaultValue, this._getOptions());
  }

  _getDefaultValue(value) {
    if (value === undefined || value === null) {
      return '';
    }

    return value;
  }

}

exports.default = BaseTextComponent;
//# sourceMappingURL=base-text-component.js.map
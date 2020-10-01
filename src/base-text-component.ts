import { PureComponent } from 'react';
import MaskResolver from './mask-resolver';
import type {
  MaskHandlerInterface,
  MaskHandlerReturnType,
  TextInputMaskProps,
  ValueType,
} from '../index';

export default class BaseTextComponent<
  T extends TextInputMaskProps
> extends PureComponent<T> {
  _maskHandler!: MaskHandlerInterface<any>;
  constructor(props: T) {
    super(props);
    this._resolveMaskHandler();
  }

  componentDidMount() {
    this._bindProps(this.props);
  }

  componentDidUpdate(prevProps: T) {
    this._bindProps(prevProps);
  }

  updateValue(text: ValueType): MaskHandlerReturnType {
    let maskedText = this._getMaskedValue(text);
    const rawText = this.getRawValueFor(maskedText);

    return {
      maskedText,
      rawText,
    };
  }

  isValid() {
    return this._maskHandler.validate(
      this._getDefaultValue(this.props.value as any),
      this._getOptions()
    );
  }

  getRawValueFor(value: ValueType) {
    return this._maskHandler.getRawValue(
      this._getDefaultValue(value),
      this._getOptions()
    );
  }

  getRawValue() {
    return this.getRawValueFor(this.props.value as any);
  }

  _getOptions() {
    return this.props.options;
  }

  _mustUpdateValue(newValue: ValueType) {
    return this.props.value !== newValue;
  }

  _resolveMaskHandler() {
    this._maskHandler = MaskResolver.resolve(this.props.type);
  }

  _bindProps(nextProps: T) {
    if (this.props.type !== nextProps.type) {
      this._resolveMaskHandler();
    }
  }

  _getDefaultMaskedValue(value: ValueType) {
    if (this._getDefaultValue(value) === '') {
      return '';
    }

    return this._getMaskedValue(value);
  }

  _getMaskedValue(value: ValueType) {
    const defaultValue = this._getDefaultValue(value);
    if (defaultValue === '') {
      return '';
    }

    return this._maskHandler.getValue(defaultValue, this._getOptions());
  }

  _getDefaultValue(value: ValueType) {
    if (value === undefined || value === null) {
      return '';
    }

    return value;
  }
}

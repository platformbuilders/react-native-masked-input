function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Text } from 'react-native';
import BaseTextComponent from './base-text-component';
const TEXT_REF = '$text';
export default class TextMask extends BaseTextComponent {
  constructor(props) {
    super(props);
  }

  getElement() {
    return this.refs[TEXT_REF];
  }

  render() {
    return /*#__PURE__*/React.createElement(Text, _extends({
      ref: TEXT_REF
    }, this.props), this.getDisplayValueFor(this.props.value));
  }

}
//# sourceMappingURL=text-mask.js.map
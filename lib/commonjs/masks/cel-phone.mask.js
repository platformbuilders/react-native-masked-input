"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("./_base.mask"));

var _custom = _interopRequireDefault(require("./custom.mask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PHONE_8_MASK = '9999-9999';
const PHONE_9_MASK = '99999-9999';
const PHONE_INTERNATIONAL = '+999 999 999 999';
const MASK_TYPES = {
  BRL: 'BRL',
  INTERNATIONAL: 'INTERNATIONAL'
};
const CEL_PHONE_SETTINGS = {
  maskType: MASK_TYPES.BRL,
  withDDD: true,
  dddMask: '(99) '
};

class CelPhoneMask extends _base.default {
  static getType() {
    return 'cel-phone';
  }

  getValue(value, settings) {
    let cleanedValue = super.removeNotNumbers(value);
    let mask = this.getMask(cleanedValue, settings);
    return _custom.default.shared.getValue(cleanedValue, {
      mask
    });
  }

  getRawValue(maskedValue, settings) {
    return super.removeNotNumbers(maskedValue);
  }

  validate(value, settings) {
    let valueToValidate = super.getDefaultValue(value);
    valueToValidate = this.getValue(value, settings);
    let mask = this.getMask(value, settings);
    return valueToValidate.length === mask.length;
  }

  getMask(value, settings) {
    let mergedSettings = super.mergeSettings(CEL_PHONE_SETTINGS, settings);

    if (mergedSettings.maskType === MASK_TYPES.INTERNATIONAL) {
      return PHONE_INTERNATIONAL;
    }

    let numbers = super.removeNotNumbers(value);
    let mask = PHONE_8_MASK;

    let use9DigitMask = (() => {
      if (mergedSettings.withDDD) {
        let numbersDDD = super.removeNotNumbers(mergedSettings.dddMask);
        let remainingValueNumbers = numbers.substr(numbersDDD.length);
        return remainingValueNumbers.length >= 9;
      } else {
        return numbers.length >= 9;
      }
    })();

    if (use9DigitMask) {
      mask = PHONE_9_MASK;
    }

    if (mergedSettings.withDDD) {
      mask = "".concat(mergedSettings.dddMask).concat(mask);
    }

    return mask;
  }

}

exports.default = CelPhoneMask;
//# sourceMappingURL=cel-phone.mask.js.map
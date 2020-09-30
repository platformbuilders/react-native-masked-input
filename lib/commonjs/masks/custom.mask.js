"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("./_base.mask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDefaultTranslation() {
  return {
    '9': function (val) {
      return val.replace(/[^0-9]+/g, '');
    },
    'A': function (val) {
      return val.replace(/[^a-zA-Z]+/g, '');
    },
    'S': function (val) {
      return val.replace(/[^a-zA-Z0-9]+/g, '');
    },
    '*': function (val) {
      return val;
    }
  };
}

function toPattern(value, mask, translation) {
  let result = '';
  let maskCharIndex = 0;
  let valueCharIndex = 0;

  while (true) {
    // if mask is ended, break.
    if (maskCharIndex === mask.length) {
      break;
    } // if value is ended, break.


    if (valueCharIndex === value.length) {
      break;
    }

    let maskChar = mask[maskCharIndex];
    let valueChar = value[valueCharIndex]; // value equals mask, just set

    if (maskChar === valueChar) {
      result += maskChar;
      valueCharIndex += 1;
      maskCharIndex += 1;
      continue;
    } // apply translator if match


    const translationHandler = translation[maskChar];

    if (translationHandler) {
      const resolverValue = translationHandler(valueChar || '');

      if (resolverValue === '') {
        //valueChar replaced so don't add it to result, keep the mask at the same point and continue to next value char
        valueCharIndex += 1;
        continue;
      } else if (resolverValue !== null) {
        result += resolverValue;
        valueCharIndex += 1;
      } else {
        result += maskChar;
      }

      maskCharIndex += 1;
      continue;
    } // not masked value, fixed char on mask


    result += maskChar;
    maskCharIndex += 1;
    continue;
  }

  return result;
}

const DEFAULT_TRANSLATION = getDefaultTranslation();

class CustomMask extends _base.default {
  static getType() {
    return 'custom';
  }

  static getDefaultTranslation() {
    return getDefaultTranslation();
  }

  getKeyboardType() {
    return 'default';
  }

  getValue(value, settings) {
    if (value === '') {
      return value;
    }

    let {
      mask
    } = settings;
    let translation = this.mergeSettings(DEFAULT_TRANSLATION, settings.translation);
    var masked = toPattern(value, mask, translation);
    return masked;
  }

  getRawValue(maskedValue, settings) {
    if (!!settings && settings.getRawValue) {
      return settings.getRawValue(maskedValue, settings);
    }

    return maskedValue;
  }

  validate(value, settings) {
    if (!!settings && settings.validator) {
      return settings.validator(value, settings);
    }

    return true;
  }

}

exports.default = CustomMask;

_defineProperty(CustomMask, "shared", new CustomMask());
//# sourceMappingURL=custom.mask.js.map
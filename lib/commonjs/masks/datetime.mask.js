"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("./_base.mask"));

var _custom = _interopRequireDefault(require("./custom.mask"));

var _dateAndTime = _interopRequireDefault(require("date-and-time"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DATETIME_MASK_SETTINGS = {
  format: 'DD/MM/YYYY HH:mm:ss'
};

class DatetimeMask extends _base.default {
  static getType() {
    return 'datetime';
  }

  getValue(value, settings) {
    let mergedSettings = this._getMergedSettings(settings);

    let mask = this.getMask(value, mergedSettings);
    return _custom.default.shared.getValue(value, {
      mask
    });
  }

  getRawValue(maskedValue, settings) {
    let mergedSettings = this._getMergedSettings(settings);

    return _dateAndTime.default.parse(maskedValue, mergedSettings.format);
  }

  validate(value, settings) {
    let maskedValue = this.getValue(value, settings);

    let mergedSettings = this._getMergedSettings(settings);

    let isValid = _dateAndTime.default.isValid(maskedValue, mergedSettings.format);

    return isValid;
  }

  _getMergedSettings(settings) {
    return super.mergeSettings(DATETIME_MASK_SETTINGS, settings);
  }

  getMask(value, settings) {
    let mask = '';

    for (let i = 0; i < settings.format.length; i++) {
      mask += settings.format[i].replace(/[a-zA-Z]+/g, '9');
    }

    return mask;
  }

}

exports.default = DatetimeMask;
//# sourceMappingURL=datetime.mask.js.map
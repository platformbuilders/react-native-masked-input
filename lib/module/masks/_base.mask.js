export default class BaseMask {
  getKeyboardType() {
    return 'numeric';
  }

  mergeSettings(obj1, obj2) {
    var obj3 = {};

    for (var attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }

    for (var attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }

    return obj3;
  }

  getRawValue(maskedValue, settings) {
    return maskedValue;
  }

  getDefaultValue(value) {
    if (value === undefined || value === null) {
      return '';
    }

    return value;
  }

  getMask(value, settings) {
    throw new Error('getCurrentMask is not implemented');
  }

  removeNotNumbersForMoney(text) {
    return typeof text === 'number' ? text : text.replace(/[^.,0-9]+/g, '');
  }

  removeNotNumbers(text) {
    return text.replace(/[^0-9]+/g, '');
  }

  removeWhiteSpaces(text) {
    return (text || '').replace(/\s/g, '');
  }

  removeNotLeters(text) {
    return text.replace(/\d/g, '');
  }

}
//# sourceMappingURL=_base.mask.js.map
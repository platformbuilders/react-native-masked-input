import MaskResolver from './mask-resolver';
export default class MaskService {
  static toMask(type, value, options) {
    return MaskResolver.resolve(type).getValue(value, options);
  }

  static toRawValue(type, maskedValue, options) {
    return MaskResolver.resolve(type).getRawValue(maskedValue, options);
  }

  static isValid(type, value, options) {
    return MaskResolver.resolve(type).validate(value, options);
  }

  static getMask(type, value, options) {
    return MaskResolver.resolve(type).getMask(value, options);
  }

}
//# sourceMappingURL=mask-service.js.map
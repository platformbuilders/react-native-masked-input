import MaskResolver from './mask-resolver';
import type { TextInputMaskOptionProp, TextInputMaskTypeProp } from './types';

export default class MaskService {
  static toMask(
    type: TextInputMaskTypeProp,
    value: string,
    options?: TextInputMaskOptionProp
  ) {
    return MaskResolver.resolve(type).getValue(value, options);
  }

  static toRawValue(
    type: TextInputMaskTypeProp,
    maskedValue: string,
    options?: TextInputMaskOptionProp
  ) {
    return MaskResolver.resolve(type).getRawValue(maskedValue, options);
  }

  static isValid(
    type: TextInputMaskTypeProp,
    value: string,
    options?: TextInputMaskOptionProp
  ) {
    return MaskResolver.resolve(type).validate(value, options);
  }

  static getMask(
    type: TextInputMaskTypeProp,
    value: string,
    options?: TextInputMaskOptionProp
  ) {
    return MaskResolver.resolve(type).getMask(value, options);
  }
}

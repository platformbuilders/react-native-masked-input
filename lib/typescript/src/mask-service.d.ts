import type { TextInputMaskOptionProp, TextInputMaskTypeProp } from './types';
export default class MaskService {
    static toMask(type: TextInputMaskTypeProp, value: string, options?: TextInputMaskOptionProp): any;
    static toRawValue(type: TextInputMaskTypeProp, maskedValue: string, options?: TextInputMaskOptionProp): any;
    static isValid(type: TextInputMaskTypeProp, value: string, options?: TextInputMaskOptionProp): any;
    static getMask(type: TextInputMaskTypeProp, value: string, options?: TextInputMaskOptionProp): any;
}

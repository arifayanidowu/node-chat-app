const expect = require('expect');

let { isRealString } = require('./validation');


describe('isRealString', () => {
    it('should reject non-string values', () => {
        let res = isRealString(1);
        expect(res).toNotExist();
    });

    it('should reject string with only spaces', () => {
        let res = isRealString('  ');
        expect(res).toNotExist();
    });

    it('should allow string with non-space characters', () => {
        let res = isRealString(' Big Jim ');
        expect(res).toBeTruthy();
    });
});
import isEven from './math';

describe('isEven', () => {
    it('should return true if given an even number', () => {
        // Functional under test (SUT)
        const result = isEven(2);
        expect(result).toBeTruthy();
    });

    it('should return false if given an odd number', () => {
        const result = isEven(1);
        expect(result).toBeFalsy();
    });
});

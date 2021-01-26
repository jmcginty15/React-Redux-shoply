const { add, remove, applyDiscount, removeDiscount } = require('./actions.js');

describe('add function', function () {
    it('is a function', function () {
        expect(typeof add).toBe('function');
    });

    it('returns the correct action object', function () {
        expect(add('1', 5)).toEqual({
            type: 'ADD',
            payload: {
                id: '1',
                qty: 5
            }
        });
        
        expect(add('58dafds', 1)).toEqual({
            type: 'ADD',
            payload: {
                id: '58dafds',
                qty: 1
            }
        })
    });
});

describe('remove function', function () {
    it('is a function', function () {
        expect(typeof remove).toBe('function');
    });

    it('returns the correct action object', function () {
        expect(remove('1', 5)).toEqual({
            type: 'REMOVE',
            payload: {
                id: '1',
                qty: 5
            }
        });
        
        expect(remove('58dafds', 1)).toEqual({
            type: 'REMOVE',
            payload: {
                id: '58dafds',
                qty: 1
            }
        })
    });
});

describe('applyDiscount function', function () {
    it('is a function', function () {
        expect(typeof applyDiscount).toBe('function');
    });

    it('returns the correct action object', function () {
        expect(applyDiscount('REMOVE10')).toEqual({
            type: 'APPLY_DISCOUNT',
            payload: {
                discountPercent: 0.1
            }
        });

        expect(applyDiscount('REMOVE20')).toEqual({
            type: 'APPLY_DISCOUNT',
            payload: {
                discountPercent: 0.2
            }
        });

        expect(applyDiscount('REMOVE30')).toEqual({
            type: 'APPLY_DISCOUNT',
            payload: {
                discountPercent: 0.3
            }
        });
    });

    it('returns null for an invalid discount code', function () {
        expect(applyDiscount('invalidcode')).toBe(null);
    });
});

describe('removeDiscount function', function () {
    it('is a function', function () {
        expect(typeof removeDiscount).toBe('function');
    });

    it('returns the correct action object', function () {
        expect(removeDiscount()).toEqual({
            type: 'APPLY_DISCOUNT',
            payload: {
                discountPercent: 0
            }
        });
    });
});
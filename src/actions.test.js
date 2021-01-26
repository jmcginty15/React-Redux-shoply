const { add, remove } = require('./actions.js');

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
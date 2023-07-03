import { describe, expect, it } from '@jest/globals'
import { formatTextValues,formatMessageWithValues } from './index'

const variables = {
    name: 'Victor',
    lib: 'pigeon-lft',
};

const transform = {
    name: (text) => text.padStart(3,' '),
    lib: (text) => {
        return text.toUpperCase()
    },
};

const message = 'hello, my name is {{name}} this library name is {{lib}}';


describe("Testing index.js formatTextValues ",function(){
    it("should format text without transform",() => {
        expect(formatTextValues(message, {variables})).toBe('hello, my name is Victor this library name is pigeon-lft')
    })

    it("should format text with transform",() => {
        expect(formatTextValues(message, {variables, transform})).toBe('hello, my name is Victor this library name is PIGEON-LFT')
    })

    it("should format text with transform",() => {
        expect(formatTextValues(message, {variables, transform})).toBe('hello, my name is Victor this library name is PIGEON-LFT')
    })

    it("should return empty on variable undefined",() => {
        const variables = {
            name: "",
        }
        expect(formatTextValues(message, {variables})).toBe('hello, my name is  this library name is ')
    })

    describe("testing custom regex",function(){
        it("should not format",() => {
            const message = 'hello, my name is {{name}} this library name is {{lib}}';
            expect(formatTextValues(message, {variables, match: /\[[^\d!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~][\w]+\]/})).toBe('hello, my name is {{name}} this library name is {{lib}}')
        })

        it("should format weirdly",() => {
            const message = 'hello, my name is {[name]} this library name is {[lib]}';
            expect(formatTextValues(message, {variables, match: /\[[^\d!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~][\w]+\]/})).toBe('hello, my name is {Victor} this library name is {[lib]}')
        })

        it("should format correct",() => {
            const message = 'hello, my name is {[name]} this library name is {[lib]}';
            expect(formatTextValues(message, {variables, match: /\[[^\d!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~][\w]+\]/g})).toBe('hello, my name is {Victor} this library name is {pigeon-lft}')
        })


        it("should not format weirdly",() => {
            const message = 'hello, my name is [name] this library name is [lib]';
            expect(formatTextValues(message, {variables, match: /\[[^\d!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~][\w]+\]/g})).toBe('hello, my name is Victor this library name is pigeon-lft')
        })
    })

    describe("testing default values",function(){
        it("should not format with default string value",() => {
            const message = 'hello, my name is {{name}} this library name is {{lib}}';
            expect(formatTextValues(message, {variables, defaultValue: "Default"})).toBe('hello, my name is Victor this library name is pigeon-lft')
        })

        it("should not format with default object value",() => {
            const message = 'hello, my name is {{name}} this library name is {{lib}}';
            expect(formatTextValues(message, {variables, defaultValue: { 'name': "Pigeon", lib: "lib" }})).toBe('hello, my name is Victor this library name is pigeon-lft')
        })

        it("should format with default string value",() => {
            const message = 'hello, my name is {{name}} this library name is {{lib}}';
            expect(formatTextValues(message, {defaultValue: "Default"})).toBe('hello, my name is Default this library name is Default')
        })

        it("should format with default object value",() => {
            const message = 'hello, my name is {{name}} this library name is {{lib}}';
            expect(formatTextValues(message, { defaultValue: { 'name': "Pigeon-LFT", lib: "Victor" }})).toBe('hello, my name is Pigeon-LFT this library name is Victor')
        })

        it("should format with default object value",() => {
            const message = 'hello, my name is {{name}} this library name is {{lib}}';
            expect(formatTextValues(message, { defaultValue: { lib: "Victor" }})).toBe('hello, my name is  this library name is Victor')
        })
    })
})

describe("Testing index.js formatMessageWithValues ",function(){
    it("should format text without transform",() => {
        expect(formatMessageWithValues(message, variables)).toBe('hello, my name is Victor this library name is pigeon-lft')
    })

    it("should format text without transform",() => {
        const message = 'hello, my name is {Victor} this library name is {pigeon-lft}';
        expect(formatMessageWithValues(message, variables)).toBe('hello, my name is {Victor} this library name is {pigeon-lft}')
    })

    it("should format text with transform",() => {
        const transform = {
            name: (text) => text.padStart(3,' '),
            lib: (text) => {
                return text.toUpperCase()
            },
        };
        expect(formatMessageWithValues(message, variables, transform)).toBe('hello, my name is Victor this library name is PIGEON-LFT')
    })

    it("should format text with transform",() => {
        expect(formatMessageWithValues(message, variables, transform)).toBe('hello, my name is Victor this library name is PIGEON-LFT')
    })

})
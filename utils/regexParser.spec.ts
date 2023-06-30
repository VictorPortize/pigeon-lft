import { regexParser } from './regexParser'
import { describe, expect, it } from '@jest/globals';

describe("testing regex parser", function(){
    it("should return a RegExp if send string regex",function(){
        const regexp = regexParser("/\D/");
        expect(regexp).toBeInstanceOf(RegExp);
    })

    it("should return a RegExp if RegExp",function(){
        const regexp = regexParser(/\D/);
        expect(regexp).toBeInstanceOf(RegExp);
    })

    it("should throw a error",function(){
        expect(() => regexParser("")).toThrow("RegExp not valid");
    })
})
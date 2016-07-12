/*global describe,it,objSetting,jQuery,expect,assert */
describe('objSetting defines static parameters: messages, labels, constants, templates', function () {
    "use strict";
    it('Returns an object', function () {
        assert.isObject(objSetting);
    });

    describe('objSetting.consts', function () {
        it('objSetting has "consts" property', function () {
            expect(objSetting).to.have.property('consts');
        });

        it(' "objSetting.consts" is an object', function () {
            assert.isObject(objSetting.consts);
            expect(objSetting.consts).to.have.property('maxDefaultArea');
            expect(objSetting.consts).to.have.property('tokenExpireHours');
            expect(objSetting.consts).to.have.property('tokenExpireMsec');
        });

        it('All values of the "objSetting.consts" properties are in numeric format', function () {
            assert.isNumber(objSetting.consts.maxDefaultArea);
            assert.isNumber(objSetting.consts.tokenExpireHours);
            assert.isNumber(objSetting.consts.tokenExpireMsec);
        });
    });

    describe('objSetting.inputNumeric', function () {
        it('objSetting has "inputNumeric" property', function () {
            expect(objSetting).to.have.property('inputNumeric');
        });

        it('objSettiing.inputNumeric is an array', function () {
            assert.isArray(objSetting.inputNumeric);
        });
    });

    describe('objSetting.inputTypes', function () {
        it('objSetting has "inputTypes" property', function () {
            expect(objSetting).to.have.property('inputTypes');
        });

        it('objSetting.inputTypes is an object', function () {
            assert.isObject(objSetting.inputTypes);
        });

        it('all properties of the objSetting.inputTypes are arrays', function () {
            jQuery.each(objSetting.inputTypes, function (key) {
                assert.isArray(objSetting.inputTypes[key], key + ' is not an array');
            });
        });
    });

    describe('objSetting.inputs', function () {
        it('objSetting has "inputs" property', function () {
            expect(objSetting).to.have.property('inputs');
        });
        it('objSetting.inputs is an object', function () {
            assert.isObject(objSetting.inputs);
        });
        it('all properties of the objSetting.inputs are objects', function () {
            jQuery.each(objSetting.inputs, function (key) {
                assert.isObject(objSetting.inputs[key]);
            });
        });
    });

    describe('objSetting.lbl', function () {
        it('objSetting has "lbl" property', function () {
            expect(objSetting).to.have.property('lbl');
        });
        it('objSetting.lbl is an object', function () {
            assert.isObject(objSetting.lbl);
        });

        it('All properties of the objSetting.lbl are arrays', function () {
            jQuery.each(objSetting.lbl, function (key) {
                assert.isArray(objSetting.lbl[key], key + ' is not an array');
            });
        });

    });

    describe('objSetting.msg', function () {
        it('TobjSetting has "msg" property', function () {
            expect(objSetting).to.have.property('msg');
        });
        it('objSetting.msg is an object', function () {
            assert.isObject(objSetting.msg);
        });

        it('All properties of the objSetting.msg are arrays', function () {
            jQuery.each(objSetting.msg, function (key) {
                assert.isArray(objSetting.msg[key], key + ' is not an array');
            });
        });
    });

    describe('objSetting.tmpl', function () {
        it('objSetting has "tmpl" property', function () {
            expect(objSetting).to.have.property('tmpl');
        });
        it('objSetting.tmpl is an object', function () {
            assert.isObject(objSetting.tmpl);
        });

        it('All properties of the objSetting.tmpl are strings', function () {
            jQuery.each(objSetting.tmpl, function (key) {
                assert.isString(objSetting.tmpl[key], key + ' is not a string');
            });
        });

    });
});
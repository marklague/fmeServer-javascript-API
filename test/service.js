/*global describe,it,objSetting,jQuery,expect,assert,objSetting,objConfig,objFME,localStorage,objGeneral,Mustache,objZone,turf,location,xit,localStorageTest */

describe('objFME: a set of functions for interaction with FME Server', function () {
    'use strict';
    var service = {
        "serviceID": "someId",
        "serverURL": "http://someurl.com",
        "repository": "testRepos",
        "serviceName": "test.fmw",
    };

    var user = {
        "username": "guest",
        "password": "guestPass"
    };

        var container = {
        "form": "formId",
        "messages": "messageId"
    };

      var setting = {
    "transformationService": "testTrans",
     "opt_showresult":  'testFalse',
     "opt_servicemode":  'testMode',
     "opt_responseformat": 'testFormat'
    };


    describe('#init sets parameters that are required to communicate with FME server and to build a user interface', function () {
        it('Input: user, service, setting, container, lng. Return: object with status success', function () {
            objFME.init(user, service, setting, container, 'fr');
            assert.isObject(objFME);
            expect(objFME).to.have.property('status', 'success');
            expect(objFME).to.have.property('token', '');
            expect(objFME).to.have.property('data');
            expect(objFME.data).to.have.property('setting');
            assert.isObject(objFME.data.setting);
            expect(objFME.data.setting).to.have.property('transformationService', 'testTrans');
            expect(objFME.data.setting).to.have.property('opt_showresult', 'testFalse');
            expect(objFME.data.setting).to.have.property('opt_servicemode', 'testMode');
            expect(objFME.data.setting).to.have.property('opt_responseformat', 'testFormat');
            expect(objFME.data).to.have.property('contForm','formId');
            expect(objFME.data).to.have.property('contMessages','messageId');
            expect(objFME.data).to.have.property('service');
            assert.isObject(objFME.data.service);
            expect(objFME.data.service).to.have.property('serviceID', 'someId');
            expect(objFME.data.service).to.have.property('repository', 'testRepos');
            expect(objFME.data.service).to.have.property('serverURL', 'http://someurl.com');
            expect(objFME.data.service).to.have.property('serviceName', 'test.fmw');
            expect(objFME.data).to.have.property('username', 'guest');
            expect(objFME.data).to.have.property('password', 'guestPass');
            expect(objFME.data).to.have.property('lng', 'fr');
        });

        it('if arguments "user", "service", "setting" or  "container" are not in object format, status = fail, data = error', function () {
            var setting = {};
            var container = {};
            objFME.init('user', service, setting, container);
            assert.isObject(objFME);
            expect(objFME).to.have.property('status', 'fail');

            objFME.init(user, 'service', setting, container);
            assert.isObject(objFME);
            expect(objFME).to.have.property('status', 'fail');

            objFME.init(user, service, 'setting', container);
            assert.isObject(objFME);
            expect(objFME).to.have.property('status', 'fail');
            expect(objFME).to.have.property('data');
        });


        it('if mandatory arguments (user and service) not passed, status = fail', function () {
            objFME.init();
            assert.isObject(objFME);
            expect(objFME).to.have.property('status', 'fail');
            expect(objFME).to.have.property('data');
            assert.isString(objFME.data);
        });
       

            it('if user and service passed as empty object, status = fail', function () {
            objFME.init({},{});
            assert.isObject(objFME);
            expect(objFME).to.have.property('status', 'fail');
            expect(objFME).to.have.property('data');
            assert.isString(objFME.data);
            });

            it('if the optional arguments (setting, container and language) are not passed, builds the object with default parameters', function () {
                objFME.init(user, service);
                assert.isObject(objFME);
                expect(objFME).to.have.property('status', 'success');
                assert.isObject(objFME.data.setting);
                expect(objFME.data.setting).to.have.property('transformationService');
                expect(objFME.data.setting).to.have.property('opt_showresult');
                expect(objFME.data.setting).to.have.property('opt_servicemode');
                expect(objFME.data.setting).to.have.property('opt_responseformat');
                expect(objFME.data).to.have.property('lng');
                expect(objFME.data).to.have.property('contForm');
                expect(objFME.data).to.have.property('contMessages');
            });

            it('if if lng parameter is not "en" or "fr", sets lng param = default ("en")', function () {
                objFME.init(user, service, {}, {}, 'someLang');
                assert.isObject(objFME);
                expect(objFME.data).to.have.property('lng', 'en');

            });

    });

    describe('#handleSuccessfulSubmit sends form data to getToken or sendRequest function', function () {
        it('if formType="login", calls getToken', function () {
            objFME.init(user, service);
            var spyGetToken = sinon.stub(objFME, "getToken");
            objFME.handleSuccessfulSubmit('someFormId', 'login');
            sinon.assert.called(spyGetToken);
            objFME.getToken.restore();
        });

        it('if formType="request", calls sendRequest function', function () {
            objFME.init(user, service);
            sinon.stub(objFME, "sendRequest");
            objFME.handleSuccessfulSubmit('someFormId', 'request');
            sinon.assert.called(objFME.sendRequest);
            objFME.sendRequest.restore();
        });
    });

    describe('#sendRequest converts form input into an URL and sends a request to the server', function () {

        it('calls objGeneral.getURLString method with five arguments', function () {
            var spyGetURLString = sinon.spy(objGeneral, "getURLString");
            objFME.init(user, service);
            objFME.sendRequest("serializedUserInput");
            sinon.assert.called(spyGetURLString);
            expect(spyGetURLString.args[0][0]).to.be.a('string');
            expect(spyGetURLString.args[0][0]).to.contain('http');
            expect(spyGetURLString.args[0][1]).to.be.instanceof(Array);
            expect(spyGetURLString.args[0][2]).to.be.a('string');
            expect(spyGetURLString.args[0][3]).to.be.a('string');;
            expect(spyGetURLString.args[0][4]).to.be.a('string');;
            objGeneral.getURLString.restore();
        });

        it('calls objGeneral.getAsync method with two arguments - url and callback', function () {
            var spyGetAsync = sinon.stub(objGeneral, "getAsync");
            objFME.init(user, service);
            objFME.sendRequest("serializedUserInput");
            sinon.assert.called(spyGetAsync);
            expect(spyGetAsync.args[0][0]).to.be.a('string');
            expect(spyGetAsync.args[0][0]).to.contain('http');
            assert.isFunction(spyGetAsync.args[0][1]);
            objGeneral.getAsync.restore();
        });

    });

    describe('#_displayMessage builds and displays on a page a message box', function () {

        it("if msgParams.status = danger, returns HTML code for an error message", function () {
            var errorObject = {
                message: "The user ID and/or password you entered are not correct.",
                status: "danger"
            };
            objFME.init(user, service);
            var result = objFME._displayMessage(errorObject, 'someBox');
            expect(result).to.be.ok;
            expect(result).to.be.a('string').to.contain('<section class="alert alert-danger"');
        });

        it("if msgParams.status = success, returns HTML code for a success message", function () {
            var successObject = {
                status: "success",
                message: "The result of your transformation will be sent ..."
            };
            objFME.init(user, service);
            var result = objFME._displayMessage(successObject, 'someBox');
            expect(result).to.be.ok;
            expect(result).to.be.a('string').to.contain('<section class="alert alert-success"');
        });

         it("if the first argument is not an object, throws error ", function () {
            expect(function () {
                    objFME._displayMessage('someText');
                }).to.throw(Error);
        });

        it("doesn't throw error if no arguments, or arguments are empty strings/objects, or undefined", function () {
            objFME.init(user, service);
            expect(objFME._displayMessage('', 'someBox')).to.be.ok;
            expect(objFME._displayMessage({
                    "status": "success",
                    "data": "some message"
                })).to.be.o;
            expect(objFME._displayMessage({}, {})).to.be.ok;
            expect(objFME._displayMessage()).to.be.ok;
            expect(objFME._displayMessage(undefined, undefined)).to.be.ok;
        });       
    });

    describe('#lookUpSessionToken checks if there is valid token in the local storage', function () {
        var serviceId = 'testServiceId';
        var storageKey = objSetting.tokenPrefix + serviceId;
        var isLocalStorage = false;
        objFME.init(user, service);
        //check if the local storage available
        try {
            var test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            isLocalStorage = true;
        } catch (e) {
            isLocalStorage = false;
        }

        it('Input: serviceId (string). Return: empty string if token for the service is not found', function () {
            //remove all items from the local storage

            if (isLocalStorage) {
                var i = localStorage.length;
                var key;
                while (i--) {
                    key = localStorage.key(i);
                    localStorage.removeItem(key);
                }
            }
            assert.equal(objFME.lookUpSessionToken(serviceId), '');
        });

        if (isLocalStorage) {
            it('Input: serviceId (string). Return: token (string) if it is found in the local storage', function () {
                var objToken = {};
                objToken.token = 'test token value';
                objToken.expirationDate = new Date(new Date()
                    .getTime() + objSetting.consts.tokenExpireMsec);
                //add an item to the local storage
                localStorage.setItem(storageKey, JSON.stringify(objToken));
                expect(objFME.lookUpSessionToken(serviceId)).to.have.length.above(5);
            });

            it('return an empty string if token is expired in the local storage', function () {
                var objToken = {};
                objToken.token = 'test token value';
                objToken.expirationDate = new Date(new Date()
                    .getTime() - objSetting.consts.tokenExpireMsec);
                //add an item to the local storage
                localStorage.setItem(storageKey, JSON.stringify(objToken));
                assert.equal(objFME.lookUpSessionToken(serviceId), '');
            });
        }

        if (!isLocalStorage) {
            it('return empty string if local storage is not available', function () {
                assert.equal(objFME.lookUpSessionToken(serviceId), '');
            });
        }

        it('Input: no argument passed. Return: empty string ', function () {
            assert.equal(objFME.lookUpSessionToken(), '');
        });
    });

    describe('#_displayRequestResult converts response from FME server to a message object.', function () {
        objFME.init(user, service);
        it('Input: no arguments. Result: throw error', function () {
            expect(function () {
                    _displayRequestResult();
                })
                .to.throw(Error);
        });
        it('Input: first argument is not an object. Result: throw error', function () {
            expect(function () {
                    _displayRequestResult('');
                })
                .to.throw(Error);
        });

        it('builds a message object for successful server response ', function (done) {
            var json = {
                "status": "success",
                "data": {
                    "serviceResponse": "test@gmail.com"
                }
            }
            objFME._displayRequestResult(json, 'en', function (data) {
                assert.isObject(data);
                expect(data).to.have.property('status', 'success');
                expect(data).to.have.property('message');
                assert.isString(data.message);
                done();
            });
        });

        it('builds a message object for fail/error server response ', function (done) {
            var json = {
                "status": "Unauthorized",
                "data": "some message"
            }
            objFME._displayRequestResult(json, 'en', function (data) {
                assert.isObject(data);
                expect(data).to.have.property('status', 'warning');
                expect(data).to.have.property('message');
                assert.isString(data.message);
                done();
            });
        });
    });

    describe('#_getInputTemplate returns template (HTML code) for the provided data type ', function () {
        objFME.init(user, service);
        var resultNoArgs = objFME._getInputTemplate();
        var resultEmptyString = objFME._getInputTemplate('');
        var resultTypeFound = objFME._getInputTemplate('TEXT');
        var resultTypeNotRound = objFME._getInputTemplate('notExists');

        it('returns object with two elements: template and type', function () {
            assert.isObject(resultNoArgs);
            expect(resultNoArgs)
                .to.have.property('template');
            expect(resultNoArgs)
                .to.have.property('type');

            assert.isObject(resultEmptyString);
            expect(resultEmptyString)
                .to.have.property('template');
            expect(resultEmptyString)
                .to.have.property('type');

            assert.isObject(resultTypeFound);
            expect(resultTypeFound)
                .to.have.property('template');
            expect(resultTypeFound)
                .to.have.property('type');

            assert.isObject(resultTypeNotRound);
            expect(resultTypeNotRound)
                .to.have.property('template');
            expect(resultTypeNotRound)
                .to.have.property('type');
        });

        it('returns template element = undefined if the argument is not passed or an empty string ', function () {
            expect(resultNoArgs)
                .to.have.property('template', undefined);
            expect(resultEmptyString)
                .to.have.property('template', undefined);
        });
        it('returns template element = undefined if the parameter does not have an associated input template', function () {
            expect(resultTypeNotRound)
                .to.have.property('template', undefined);
        });

        it('returns template element = some string, if the parameter has an associated input template', function () {
            var result = resultTypeFound.template;
            expect(result)
                .to.have.length.above(3);
        });

    });

    describe('#buildInput transforms server parameter (JSON) into a form input (HTML)', function () {
        var testInput = {
            "defaultValue": "10",
            "description": "<fr>Entier</fr><en>Integer</en>:",
            "model": "string",
            "name": "Integer",
            "type": "INTEGER"
        };
        var testCheckbox = {
            "defaultValue": [
                "<fr>aujourd'jui</fr><en>today</en>"
            ],
            "description": "<fr>Choix multiple</fr><en>Multiple choice</en>:",
            "featuregrouping": false,
            "listOptions": [{
                "caption": "<fr>aujourd'jui</fr><en>today</en>",
                "value": "<fr>aujourd'jui</fr><en>today</en>"
            }],
            "model": "list",
            "name": "Choice_multiple",
            "type": "LISTBOX"
        };

        objFME.init(user, service);

        it('if an argument is a valid object, returns a string with HTML', function () {
            var inputResult = objFME.buildInput(testInput);
            expect(inputResult)
                .to.be.a.string;
            expect(inputResult)
                .to.have.length.above(20);
            expect(inputResult)
                .to.contain('<');
            expect(inputResult)
                .to.contain('>');
        });
        it('if an argument is not a valid object, returns empty string', function () {
            var inputResult1 = objFME.buildInput();
            var inputResult2 = objFME.buildInput({});
            assert.equal(inputResult1, '');
            assert.equal(inputResult2, '');
        });

        it('calls objFME._getInputTemplate method', function () {
            var spyTemplate = sinon.spy(objFME, "_getInputTemplate");
            objFME.buildInput(testInput);
            sinon.assert.called(spyTemplate);
            expect(spyTemplate.args[0]).to.be.instanceof(Array);
            objFME._getInputTemplate.restore();
        });

        it('calls Mustache.to_html method', function () {
            var spyMustache = sinon.spy(Mustache, "to_html");
            objFME.buildInput(testInput);
            sinon.assert.called(spyMustache);
            Mustache.to_html.restore();
        });
        it('calls objGeneral.getLabel', function () {
            var spyLabel = sinon.spy(objGeneral, "getLangLabel");
            objFME.buildInput(testInput);
            sinon.assert.called(spyLabel);
            objGeneral.getLangLabel;
        });

        it('sends to Mustache.to_html a template as a first argument', function () {
            var spyMustache = sinon.spy(Mustache, "to_html");
            var result = objFME.buildInput(testInput);
            assert.isString(spyMustache.args[0][0]); 

            Mustache.to_html.restore();
        });

        it('sends to Mustache.to_html a valid input object as second argument', function () {
            var spyMustache = sinon.spy(Mustache, "to_html");
            var result = objFME.buildInput(testInput);
            var secondArg = spyMustache.args[0][1];
            //[0][1]second argument of the first call 
            assert.isObject(secondArg);
            expect(secondArg).to.have.property('defaultValue');
            expect(secondArg).to.have.property('description');
            expect(secondArg).to.have.property('model');
            expect(secondArg).to.have.property('name');
            expect(secondArg).to.have.property('requiredLabel');
            expect(secondArg).to.have.property('type');
            Mustache.to_html.restore();
        });

        it('if type = checkbox, sends to Mustache.to_html an input object with additional property - listOptoins', function () {
            var spyMustache = sinon.spy(Mustache, "to_html");
            var result = objFME.buildInput(testCheckbox);
            var secondArg = spyMustache.args[0][1];
            //[0][1]second argument of the first call 
            assert.isObject(secondArg);

            expect(secondArg).to.have.property('defaultValue');
            expect(secondArg).to.have.property('description');
            expect(secondArg).to.have.property('model');
            expect(secondArg).to.have.property('name');
            expect(secondArg).to.have.property('requiredLabel');
            expect(secondArg).to.have.property('type');
            expect(secondArg).to.have.property('listOptions');

            assert.isObject(secondArg.listOptions[0]);
            expect(secondArg.listOptions[0]).to.have.property('caption');
            expect(secondArg.listOptions[0]).to.have.property('id');
            expect(secondArg.listOptions[0]).to.have.property('selected');
            expect(secondArg.listOptions[0]).to.have.property('value');
            Mustache.to_html.restore();
        });

        it('description, default text values and captions should be cleaned from XML-like markup (<fr>/<en>)', function () {
            var spyMustache = sinon.spy(Mustache, "to_html");
            var result = objFME.buildInput(testCheckbox);
            var secondArg = spyMustache.args[0][1];
            var choiceCaption = secondArg.listOptions[0];

            expect(secondArg.defaultValue).not.to.contain('<en>');
            expect(secondArg.defaultValue).not.to.contain('<fr>');
            expect(secondArg.description).not.to.contain('<en>');
            expect(secondArg.description).not.to.contain('<fr>');
            expect(choiceCaption.caption).not.to.contain('<en>');
            expect(choiceCaption.caption).not.to.contain('<fr>');
            Mustache.to_html.restore();
        });
    });

    describe('#buildForm composes HTML code for a form and displays it in the designed div', function () {
        var json = {};
        var jsonFail = {};
        var inputObj = {
            "defaultValue": "10",
            "description": "<fr>Entier</fr><en>Integer</en>:",
            "model": "string",
            "name": "Integer",
            "type": "INTEGER"
        }
        json.status = 'success';
        json.data = [inputObj];

        jsonFail.status = 'fail';


        it('if no arguments, return false', function () {
            objFME.init(user, service);
            expect(objFME.buildForm()).to.be.false;
        });
        it('if the first argument is valid json, and json.status = success, returns true', function () {
            objFME.init(user, service);
            expect(objFME.buildForm(json)).to.be.true;

        });
        it('if the first argument is valid json, and json.status != success, returns false', function () {
            objFME.init(user, service);
            expect(objFME.buildForm(jsonFail)).to.be.false;

        });


        it('calls Mustache.to_html', function () {
            objFME.init(user, service);
            var spyMustache = sinon.spy(Mustache, "to_html");
            objFME.buildForm(json);
            sinon.assert.called(spyMustache);
            Mustache.to_html.restore();
        });
        it('calls objFME.buildInput with service parameter object', function () {
            objFME.init(user, service);
            var spyBuildInput = sinon.spy(objFME, "buildInput");
            objFME.buildForm(json);
            sinon.assert.called(spyBuildInput);
            var inputObj = spyBuildInput.args[0][0];

            assert.isObject(inputObj);
            expect(inputObj).to.have.property('defaultValue');
            expect(inputObj).to.have.property('description');
            expect(inputObj).to.have.property('model');
            expect(inputObj).to.have.property('name');
            expect(inputObj).to.have.property('requiredLabel');
            expect(inputObj).to.have.property('type');
            objFME.buildInput.restore();
        });
    });

    describe('#_localStorageTest checks if local storage is available', function () {
        it('returns true or false', function () {
            objFME.init(user, service);
            assert.isBoolean(objFME._localStorageTest());
        });
    });

    describe('#_cleanInterface removes content from HTML containers', function () {
        it('returns true', function () {
            objFME._cleanInterface();
            assert.isBoolean(objFME._localStorageTest(), 'returns true');
        });
    });

    describe('#buildLoginForm', function () {
        objFME.init(user, service);
        var spyBuildForm = sinon.spy(objFME, "buildForm");
        objFME.buildLoginForm('id');
        it('calls buildForm method', function () {
            sinon.assert.called(spyBuildForm);
        });
        it('sends to buildForm two arguments', function () {
            sinon.assert.called(spyBuildForm);
            var firstArg = spyBuildForm.args[0][0];
            expect(firstArg).to.be.an('object');
            expect(firstArg).to.have.property('status', 'success');
            expect(firstArg).to.have.property('data');
            expect(spyBuildForm.args[0][1]).to.equal('login');
        });
        objFME.buildForm.restore();
    });

    describe('#getWebServiceParam', function () {

        it('calls objGeneral.getURLString method with five parameters', function () {
            var spyGetURLString = sinon.spy(objGeneral, "getURLString");
            objFME.init(user, service);
            objFME.getWebServiceParam({}, 'token');
            sinon.assert.called(spyGetURLString);
            expect(spyGetURLString.args[0][0]).to.be.a('string');
            expect(spyGetURLString.args[0][0]).to.contain('http');
            expect(spyGetURLString.args[0][1]).to.be.instanceof(Array);
            expect(spyGetURLString.args[0][2]).to.be.a('string');
            expect(spyGetURLString.args[0][3]).to.be.a('string');;
            expect(spyGetURLString.args[0][4]).to.be.a('string');;
            objGeneral.getURLString.restore();
        });

        it('calls objGeneral.getAsync method with one arugment - url', function () {
            var spyGetAsync = sinon.stub(objGeneral, "getAsync");
            objFME.init(user, service);
            objFME.getWebServiceParam({}, 'token');
            sinon.assert.called(spyGetAsync);
            expect(spyGetAsync.args[0][0]).to.be.a('string');
            expect(spyGetAsync.args[0][0]).to.contain('http');;
            objGeneral.getAsync.restore();
        });
    });

    describe('#getToken gets token from localStorage or from FME server', function () {

        it('calls lookUpSessionToken', function () {
            var spyLookUpToken = sinon.stub(objFME, "lookUpSessionToken");
            objFME.init(user, service);
            objFME.getToken('lookupTest', 'uname', 'pass');
            sinon.assert.called(spyLookUpToken);
            objFME.lookUpSessionToken.restore();
        });

        it('if the token found in the local storage and callback is passed, sends token to the callback function', function (done) {
            var spyLookUpToken = sinon.stub(objFME, "lookUpSessionToken");
            objFME.init(user, service);
            spyLookUpToken.returns('testCallback');
            objFME.getToken('testCallbackId', 'uname', 'pass', function (data) {
                expect(data).to.equal('testCallback');
                objFME.lookUpSessionToken.restore();
                done();
            });
        });

        it('if token found in the local storage and callback is not passed, sends token to the getWebServiceParam function', function () {
            var spyGetServiceParams = sinon.spy(objFME, "getWebServiceParam");
            var spyLookUpToken = sinon.stub(objFME, "lookUpSessionToken");
            spyLookUpToken.returns("noCallbackTest");
            objFME.init(user, service);
            objFME.getToken('noCallbackTestID', 'uName', 'pass');
            sinon.assert.called(spyGetServiceParams);
            objFME.lookUpSessionToken.restore();
            objFME.getWebServiceParam.restore();
        });

        it('if no token found in the storage, creates URL for a token request  (calls getURLString) and passes it to jQuery.ajax', function () {
            var testURL = 'http://somedomain.com';
            var spyLookUpToken = sinon.stub(objFME, "lookUpSessionToken");
            var spyGetURLString = sinon.stub(objGeneral, "getURLString");
            spyGetURLString.returns(testURL);
            spyLookUpToken.returns('');
            objFME.init(user, service);

            var xhr = sinon.useFakeXMLHttpRequest();
            var requests = [];
            xhr.onCreate = function (xhr) {
                requests.push(xhr);
            }
            var callback = sinon.spy();
            objFME.getToken('noTokenFoundID', 'uname', 'pass', callback);
            sinon.assert.called(spyGetURLString);
            expect(requests[0].url).to.equal(testURL);

            xhr.restore();
            objFME.lookUpSessionToken.restore();
            objGeneral.getURLString.restore();

        });
        it('if authorization failed, returns empty string to the callback function', function () {
            var spyLookUpToken = sinon.stub(objFME, "lookUpSessionToken");
            var spyGetURLString = sinon.stub(objGeneral, "getURLString");
            spyGetURLString.returns('http://google.com');
            spyLookUpToken.returns('');
            var serviceID = 'servId';
            objFME.init(user, service);
            var xhr = sinon.useFakeXMLHttpRequest();
            var requests = [];
            xhr.onCreate = function (xhr) {
                requests.push(xhr);
            }
            var callback = sinon.spy();
            objFME.getToken('servId', 'uname', 'pass', callback);
            requests[0].respond(401, {
                    "Content-Type": "application/json"
                },
                ' {"status": "failure", "message": "COM.safe.fmeserver.api.FMEServerException: Authentication failed: Failed to login" }');
           assert(callback.calledWith(''));
           xhr.restore();
           objFME.lookUpSessionToken.restore();
           objGeneral.getURLString.restore();
        });
  it('if authorization failed, calls buildLoginForm', function () {
            var spyBuildLogin = sinon.spy(objFME, "buildLoginForm");
            var spyLookUpToken = sinon.stub(objFME, "lookUpSessionToken");
            var spyGetURLString = sinon.stub(objGeneral, "getURLString");
            spyGetURLString.returns('http://google.com');
            spyLookUpToken.returns('');
            var serviceID = 'buildFormTestId';
            objFME.init(user, service);
            var xhr = sinon.useFakeXMLHttpRequest();
            var requests = [];
            var callback = sinon.spy();
            xhr.onCreate = function (xhr) {
                requests.push(xhr);
            }

            objFME.getToken(serviceID, 'uname', 'pass', callback);
            requests[0].respond(401, {
                    "Content-Type": "application/json"
                },
                ' {"status": "failure", "message": "COM.safe.fmeserver.api.FMEServerException: Authentication failed: Failed to login" }');
           sinon.assert.called(spyBuildLogin);
           expect(spyBuildLogin.args[0][0]).to.equal(serviceID);
            xhr.restore();
            objFME.buildLoginForm.restore();
            objFME.lookUpSessionToken.restore();
            objGeneral.getURLString.restore();
        });

        it('authorization passed, returns token to the callback function', function () {
            var spyGetParam = sinon.spy(objFME, "getWebServiceParam");
            var spyLookUpToken = sinon.stub(objFME, "lookUpSessionToken");
            var spyGetURLString = sinon.stub(objGeneral, "getURLString");
            spyGetURLString.returns('http://google.com');
            spyLookUpToken.returns('');
            objFME.init(user, service);
            var xhr = sinon.useFakeXMLHttpRequest();
            var requests = [];
            xhr.onCreate = function (xhr) {
                requests.push(xhr);
            }
            var callback = sinon.spy();
            objFME.getToken('iii', 'uname', 'pass', callback);
            requests[0].respond(200, {
                    "Content-Type": "application/json"
                },
                '{"serviceResponse": {"token": "12346789-token",    "expirationDate": "2016-04-13 02:05:33",    "clientAddress": ""  }}');
            assert(callback.calledWith('12346789-token'));
            sinon.assert.notCalled(spyGetParam);
            xhr.restore();
            objFME.lookUpSessionToken.restore();
            objFME.getWebServiceParam.restore();
            objGeneral.getURLString.restore();
        });

      it('authorization passed and no callback, calls getWebServiceParam', function () {
            var spyGetParam = sinon.spy(objFME, "getWebServiceParam");
            var spyLookUpToken = sinon.stub(objFME, "lookUpSessionToken");
            var spyGetURLString = sinon.stub(objGeneral, "getURLString");
            spyGetURLString.returns('http://google.com');
            spyLookUpToken.returns('');
            objFME.init(user, service);
            var xhr = sinon.useFakeXMLHttpRequest();
            var requests = [];
            xhr.onCreate = function (xhr) {
                requests.push(xhr);
            }

            var callback = sinon.spy();
            objFME.getToken('ooo', 'uname', 'pass');
            requests[0].respond(200, {
                    "Content-Type": "application/json"
                },
                '{"serviceResponse": {"token": "12346789-token",    "expirationDate": "2016-04-13 02:05:33",    "clientAddress": ""  }}');
            sinon.assert.called(spyGetParam);
            xhr.restore();
            objFME.lookUpSessionToken.restore();
            objGeneral.getURLString.restore();
        });  
    });
});
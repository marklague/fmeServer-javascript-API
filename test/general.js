describe('objGeneral - a set of general functions', function() {

    describe('#packJSend builds object in JSEND format', function() {

        it('Input: status = success, data. Result: {status = success, data = {}}', function() {
            var resultSuccess = objGeneral.packJSend('success', {});
            assert.deepEqual({
                "status": "success",
                "data": {}
            }, resultSuccess);
           
        });
        it('Input: status, data, message, code. Result: JSEND {status = fail, data = message}}', function() {
            var resultFail = objGeneral.packJSend('fail', 'error message');
            assert.deepEqual({
                "status": "fail",
                "data": "error message"
            }, resultFail);
        });
        it('Input: status, message, code. Result: JSEND {status = error, message = message, code = code}}', function() {
            var resultError = objGeneral.packJSend('error', 'error message', '404');
            assert.deepEqual({
                "status": "error",
                "message": "error message",
                "code": "404"
            }, resultError);
        });
        
        it('Input: no arguments. Result: JSEND object {status: undefined; data: undefined}', function() {
                var resultNoArguments = objGeneral.packJSend();
                assert.deepEqual({
                    "status": undefined,
                    "data": undefined
                }, resultNoArguments);
        });
    });

    describe('#validateFile checks if the file name has a valid extension', function() {
        it('returns true, if the file extension in the list of allowed extensions', function() {
            assert.equal(true, objGeneral.validateFile('../test/file.txt', ["json", "txt"]));
            assert.equal(true, objGeneral.validateFile('file.json', ["json", "txt"]));
        });
        it('returns false, if the file extension not in the list of allowed extensions', function() {
            assert.equal(false, objGeneral.validateFile('file.jsont', ["json", "txt"]));
        });
            it('returns false, if no arguments passed', function() {
                assert.equal(false, objGeneral.validateFile());
            });
            it('uses default if the list of allowed file extensions is not passed', function() {
                assert.equal(true, objGeneral.validateFile('../test/file.txt'));
                assert.equal(true, objGeneral.validateFile('file.json'));
            });
    });
  
    describe('#validateEmail checks the email address if it is valid',
    function() {
        it('Input valid, Return: {status:true; message:""}', function() {
            var resultEmail = objGeneral.validateEmail('bruce.banner@avenger.com', 'en');
            assert.isObject(resultEmail);
            expect(resultEmail).to.have.property('status', true);
            expect(resultEmail).to.have.property('msg');
        });
        it('Input valid, Return: {status:true; message:""}', function() {
            var resultEmail = objGeneral.validateEmail('bruce.banner@avenger.hulk.com', 'en');
            assert.isObject(resultEmail);
            expect(resultEmail).to.have.property('status', true);
            expect(resultEmail).to.have.property('msg');
        });
        it('Input invalid, Return: {status:false; message:"Email address is invalid"}', function() {
            var resultEmail = objGeneral.validateEmail('bruce.banner@avenger', 'en');
            assert.isObject(resultEmail);
            expect(resultEmail).to.have.property('status', false);
            expect(resultEmail).to.have.property('msg');
        });
        it('Input invalid, Return: {status:false; message:"Email address is invalid"}', function() {
            var resultEmail = objGeneral.validateEmail('bruce.banner@.com', 'en');
            assert.isObject(resultEmail);
            expect(resultEmail).to.have.property('status', false);
            expect(resultEmail).to.have.property('msg');
        });
    });

    describe('#getLangLabel extracts a label for the selected language from an XML-like string.', function() {
        it('Input: xml-like string, language ("fr"/"en"). Result: a label for the language', function() {
            assert.equal('French label', objGeneral.getLangLabel('<fr>French label</fr><en>English label</en>', 'fr'));
            assert.equal('English label', objGeneral.getLangLabel('<fr>French label</fr><en>English label</en>', 'en'));
            assert.equal('English label', objGeneral.getLangLabel('<en>English label</en><fr>French label</fr>', 'en'));
        });

        it('if the label for the language not found, return string without <>', function() {
            assert.equal('French label', objGeneral.getLangLabel('<fr>French label</fr>', 'en'));
        });

            it('Input: no arguments passed. Result: empty string', function() {
                assert.equal('', objGeneral.getLangLabel(''));
            });

            it('Input: XML-like string, language is not passed. Result: a label for the default language (English)', function() {
                assert.equal('English label', objGeneral.getLangLabel('<fr>French label</fr><en>English label</en>'));
        });
    });

    describe('#getAsync handles async XMLHttpRequest request', function() {

        it('Server response - 200. Result: {status: success, data: json}', function() {
            xhr = sinon.useFakeXMLHttpRequest();
            var requests = [];
            xhr.onCreate = function (xhr) {
                requests.push(xhr);
            }
            var callback = sinon.spy();
            objGeneral.getAsync("", callback);
            requests[0].respond(200, { "Content-Type": "application/json" },
                                 '{}');

            assert(callback.calledWith({"status":"success", "data" : {}}));
            xhr.restore();
        });

        it('Server error 401. Return: {status: fail, data="Unauthorized", code=401}', function() {
            xhr = sinon.useFakeXMLHttpRequest();
            var requests = [];
            xhr.onCreate = function (xhr) {
                requests.push(xhr);
            }
            var callback = sinon.spy();
            objGeneral.getAsync("", callback);
            requests[0].respond(401, {"Content-Type": "application/json" },
                                 'error message');
            assert(callback.calledWith({"status":"fail", "data": "Unauthorized", "code":401}));
            xhr.restore();
        });
        it('Server error 404. Return: {status: fail, data="Not Found", code=404}', function() {
            xhr = sinon.useFakeXMLHttpRequest();
            var requests = [];
            xhr.onCreate = function (xhr) {
                requests.push(xhr);
            }
            var callback = sinon.spy();
            objGeneral.getAsync("", callback);
            requests[0].respond(404, {"Content-Type": "application/json" },
                                 'error message');
            assert(callback.calledWith({"status":"fail", "data": "Not Found", "code":404}));
            xhr.restore();
        });
    });

describe('#getSync handles sync XMLHttpRequest request', function() {

        it('Server response - 200. Return: {status: success, data: json} (object)', function() {

            var server = sinon.fakeServer.create();
            server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                '{}'
            ]);
            var result = objGeneral.getSync("");
            server.respond();
            assert.deepEqual({"status":"success", "data" : {}}, result);
            server.restore();
        });

       it('Server error - 401. Return: {status: fail, data: message} (object)', function() {

            var server = sinon.fakeServer.create();
            server.respondWith("GET", "", [
                401, 
                {"Content-Type": "application/json"}, 
                '{}'
            ]);
            var result = objGeneral.getSync("");
            server.respond();
            assert.deepEqual({"status":"fail", "data" : '401: Unauthorized'}, result);
            server.restore();
        });
    it('Server error - 404. Return: {status: fail, data: message} (object)', function() {

            var server = sinon.fakeServer.create();
            server.respondWith("GET", "", [
                404, 
                {"Content-Type": "application/json"}, 
                '{}'
            ]);
            var result = objGeneral.getSync("");
            server.respond();
            assert.deepEqual({"status":"fail", "data" : '404: Not Found'}, result);
            server.restore();
        });
    });
    describe('#getURLString: builds URL string', function() {

        it('Input: server, [dirs], item, file, params. Return: url (string)', function() {
            assert.equal('https://justserver5/dir1/dir2/item/file?param1=1&param2=2', objGeneral.getURLString('https://justserver5', ['dir1', 'dir2'], 'item', 'file', 'param1=1&param2=2'));
        });
            it('only one mandatory argument - server', function() {
                assert.equal('https://justserver1/', objGeneral.getURLString('https://justserver1'));
                assert.equal('https://justserver2/', objGeneral.getURLString('https://justserver2', '', '', '', ''));
            });

            it("should throw error if server is not passed or in wrong format", function() {
                expect(function() {
                    objGeneral.getURLString('someString');
                }).to.throw(Error);
                expect(function() {
                    getURLString();
                }).to.throw(Error);
        });

            it("should throw error if dir argument is not an array", function() {
                expect(function() {
                    objGeneral.getURLString('http://server', 'sdfasdf');
                }).to.throw(Error);
            });
    });
})
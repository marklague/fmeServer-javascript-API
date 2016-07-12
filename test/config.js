describe("objConfig initializes a configuration object and retrieves values of it's elements", function () {
    "use strict";
    var msgReturnFail = ' Return: {status = fail, data = an error message} (object)';
    var src = 'somefolder/cnf.txt';
    //var srcNotJson = 'test-files/cnfNotJSON.txt';
    var configJSON = {
  "GuestAccount":{
    "username":"guest",
    "password":"guest" 
  },
  "defaultSettings":{
    "transformationService":"fmedatadownload",
    "opt_showresult":"false",
    "opt_servicemode":"async",
    "opt_responseformat":"json"
  },   
  "fmeServices": 
  [
    {
      "serviceID": "fmeServer-pgis",
      "serverURL": "http://160.106.67.238",
      "repository": "test",
      "serviceName": "pgis2generic.fmw",
      "extractionZoneParamName": "EXTRACT_GEOMETRY",
      "maxAreaParamName": "SERVICE_MAX_EXTENT_AREA"
    }
  ],
  
"HTMLContainers":
    {
      "form": "FMENRCanFormSection",
      "messages": "FMENRCanMessageSection"
    }
  };

    describe('#init: initializes a configuration object', function () {
        describe('reads a configuration file and returns a configuration object', function () {

        it('if server response = 200, status= success and data in object format', function () {
                        var server = sinon.fakeServer.create();
            server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                '{}'
            ]);
            var result = objConfig.init(src);
            server.respond();
            assert.isObject(result);
            expect(result).to.have.property('status', 'success');
            expect(result).to.have.property('data');
            assert.isObject(result.data); 
             server.restore();
        });

        it('if lang argument is not passed, a language property of the configuration object  =  default value (en)', function () {
                        var server = sinon.fakeServer.create();
            server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                '{}'
            ]);
            var result = objConfig.init(src);
            server.respond();
            expect(result).to.have.deep.property('data.lng', 'en');
             server.restore();
        });
       
       it('if lang argument is passed, a language property of the configuration object  =  lang', function () {
                        var server = sinon.fakeServer.create();
            server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                '{}'
            ]);
            var result = objConfig.init(src, 'fr');
            server.respond();
            expect(result).to.have.deep.property('data.lng', 'fr');
             server.restore();
        });

        it('if lng argument is not in ["fr", "en"], language property of the configuration object =  default ("en")', function () {
             var server = sinon.fakeServer.create();
            server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                '{}'
            ]);
            var resultNotEnOrFr = objConfig.init(src, 'somelang');
            server.respond();
            assert.isObject(resultNotEnOrFr);
            expect(resultNotEnOrFr).to.have.property('status', 'success');
            expect(resultNotEnOrFr).to.have.property('data');
            expect(resultNotEnOrFr).to.have.deep.property('data.lng', 'en');
        });        
        });

    describe('if error reading a configuration file, returns an object with status = fail', function () {        
            it('Server error - 404. Return: {status: fail, data: message} ', function() {

            var server = sinon.fakeServer.create();
            server.respondWith("GET", "", [
                404, 
                {"Content-Type": "application/json"}, 
                '{}'
            ]);
            var result = objConfig.init(src);
            server.respond();
            assert.isObject(result);
            expect(result).to.have.property('status', 'fail');
            expect(result).to.have.property('data', '404: Not Found');
            server.restore();
        });

        it('configuration file contains not valid JSON. Returns {status: fail, data: message}', function () {
           var server = sinon.fakeServer.create();
            server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                'some text'
            ]);
            var result = objConfig.init(src);
            server.respond();
            assert.isObject(result);
            expect(result).to.have.property('status', 'fail');
            expect(result).to.have.property('data');
            expect(result.data).to.contain('SyntaxError:');
            server.restore();
        });

        });  

        describe('if src argument is not valid file, status = fail, data = error message', function () {

            it('Input: no arguments.' + msgReturnFail, function () {
                var resultNoSrc = objConfig.init();
                assert.isObject(resultNoSrc);
                expect(resultNoSrc).to.have.property('status', 'fail');
                expect(resultNoSrc).to.have.property('data');
                assert.isNotObject(resultNoSrc.data);
                expect(resultNoSrc.data).to.have.length.above(5);
            });

           it('Input: "src" argument in a wrong format.' + msgReturnFail, function () {
                var srcWrongExention = 'test-files/fme.notvalid';
                var resultWrongExention = objConfig.init(srcWrongExention);
                assert.isObject(resultWrongExention);
                assert.isNotObject(resultWrongExention.data);
                expect(resultWrongExention.data).to.have.length.above(5);
            });
        });
    });

    describe('#getConfigElement: returns value of an element of the configuration object', function () {      

      it('if the element found in the configuration object,  status = success and data = value of the element', function () {
             var server = sinon.fakeServer.create();
            server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                ' { "GuestAccount":{"username":"guest","password":"guest" }}'
            ]);
            var result = objConfig.init(src);
            server.respond();
           
            var resultLng = objConfig.getConfigElement('lng');
            var resultGuest = objConfig.getConfigElement('GuestAccount');

            assert.isObject(resultLng);
            expect(resultLng).to.have.property('status', 'success');
            expect(resultLng).to.have.property('data', 'en');

            assert.isObject(resultGuest);
            expect(resultGuest).to.have.property('status', 'success');
            expect(resultGuest).to.have.property('data');
            assert.isObject(resultGuest.data);
             server.restore();
        });

       it('if the element does not exist, status = fail and data = error message' , function () {
            var result =objConfig.getConfigElement('notExists');
            assert.isObject(result);
            expect(result).to.have.property('status', 'fail');
            expect(result).to.have.property('data');
            assert.isNotObject(result.data);
        });

        it('if the configuration object has an error, status = fail and data = error message', function () {

       var server = sinon.fakeServer.create();
            server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                'some text'
            ]);
            var result = objConfig.init(src);
            server.respond();
            var result = objConfig.getConfigElement('GuestAccount');
            assert.isObject(result);
            expect(result).to.have.property('status', 'fail');
            expect(result).to.have.property('data');
            assert.isNotObject(result.data);
             server.restore();
        });

       
            it('it does not throw error if no arguments passed', function () {
                var server = sinon.fakeServer.create();
                   server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                '{}'
            ]);
            var result = objConfig.init(src);
            server.respond();
            var result = objConfig.getConfigElement('GuestAccount');
            var resultNoArg = objConfig.getConfigElement();
            assert.isObject(resultNoArg);
            expect(resultNoArg).to.have.property('status', 'fail');
            expect(resultNoArg).to.have.property('data');
            assert.isNotObject(resultNoArg.data);
            server.restore();
        });
    });

    describe('#getConfigService: gets configuration service by id', function () {
        it('if service id found, status = success and object = server configuration object', function () {
           var server = sinon.fakeServer.create();
            server.respondWith("GET", "", [
            200, 
            {"Content-Type": "application/json"}, 
             '{"fmeServices": [ {"serviceID": "fmeServer-pgis", "serverURL": "http://160.106.67.238", "repository": "test", "serviceName": "pgis2generic.fmw", "extractionZoneParamName": "EXTRACT_GEOMETRY", "maxAreaParamName": "SERVICE_MAX_EXTENT_AREA" }]}'
            ]);
            
            objConfig.init(src);
            server.respond();
            var result = objConfig.getConfigService('fmeServer-pgis');
            assert.isObject(result);
            expect(result).to.have.property('status', 'success');
            expect(result).to.have.property('data');
            assert.isObject(result.data);
             expect(result.data).to.have.property('serviceID');
            server.restore();
        });

  it('if service id not found, status = fail and object = error message', function () {
            var server = sinon.fakeServer.create(); 
            server.respondWith("GET", "", [
            200, 
            {"Content-Type": "application/json"}, 
             '{}'
            ]);
            objConfig.init(src);
            server.respond();
            var result = objConfig.getConfigService('notExists');
            assert.isObject(result);
            expect(result).to.have.property('status', 'fail');
            expect(result).to.have.property('data');
            assert.isNotObject(result.data);
            server.restore();
        });


        it('if the configuration object is not valid object, status = fail and object = error message', function () {
           
             var server = sinon.fakeServer.create();
                server.respondWith("GET", "", [
            200, 
            {"Content-Type": "application/json"}, 
             'notValidJSON'
            ]);
                objConfig.init(src);
                server.respond();
                var result = objConfig.getConfigService('fmeServer-pgis');
                assert.isObject(result);
                expect(result).to.have.property('status', 'fail');
                expect(result).to.have.property('data');
                assert.isNotObject(result.data);
                server.restore();
        });

      
           it('it does not throw error if no arguments passed', function () {

             var server = sinon.fakeServer.create();
                   server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                '{}'
            ]);
            var result = objConfig.init(src);
            server.respond();
            var result = objConfig.getConfigService();
            assert.isObject(result);
            expect(result).to.have.property('status', 'fail');
            expect(result).to.have.property('data');
            assert.isNotObject(result.data);
            server.restore();
        });
    });

    describe('#_validateConfig checks if the element is in the JSON object', function () {
       
       it('if the element found, returns an empty string', function () {
            var server = sinon.fakeServer.create();
            server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                ' { "GuestAccount":{"username":"guest","password":"guest" }}'
            ]); 
            objConfig.init(src);  
            var result = objConfig._validateConfig('GuestAccount');        
            server.respond();

            expect(result).to.be.empty;
            server.restore();
            
        });

        it('if the element not found, returns an error message', function () {
            var server = sinon.fakeServer.create();
                   server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                '{}'
            ]);
            objConfig.init(src);
            server.respond();
            var result = objConfig._validateConfig('notExists');
            expect(result).to.have.length.above(3);
            server.restore();
        });

      it('it does not throw error if no arguments passed', function () {
            var server = sinon.fakeServer.create();
                   server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                '{}'
            ]);
            objConfig.init(src);
            server.respond();
            var result = objConfig._validateConfig();
            expect(result).to.have.length.above(3);
            server.restore();
        });

    });

});

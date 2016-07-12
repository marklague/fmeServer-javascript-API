describe('objZone has a set of methods to validate extraction zone', function () {
    "use strict";
    var strBBox = '[-180.0, -90.0, 180.0, 90.0]';
    var strGeoJSONInvalid = 'jjjjjjj{"type":"Polygon","coordinates":[[[-71.75,45.35],[-71.25,45.35],[-71.25,46.15],[-71.75,46.15],[-71.75,45.35]]]}'
    var strGeoJSON = '{"type":"Polygon","coordinates":[[[-71.75,45.35],[-71.25,45.35],[-71.25,46.15],[-71.75,46.15],[-71.75,45.35]]]}';
    var strWKT = 'POLYGON ((-71.75 45.35,-71.25 45.35,-71.25 46.15,-71.75 46.15,-71.75 45.35))';
     var maxSize = 100000000000000000000000000;

    describe('#_fromWKT2Json converts WKT string into geoJSON polygon', function () {

        it('Input: valid WKT. Return: geoJSON (object)', function () {
            var wkt = 'POLYGON ((-71.75 45.35,-71.25 45.35,-71.25 46.15,-71.75 46.15,-71.75 45.35))';
            var json = {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-71.75, 45.35],
                        [-71.25, 45.35],
                        [-71.25, 46.15],
                        [-71.75, 46.15],
                        [-71.75, 45.35]
                    ]
                ]
            };
            var result = objZone._fromWKT2Json(wkt);
            var msg = ' expected WKT string ' + JSON.stringify(wkt) + ' to be converted to JSON ' + JSON.stringify(json);
            assert.deepEqual(json, result, msg);
        });
    });

    describe('#_calcualteArea calculates area of an extraction zone', function () {
        it('Input: valid bounding Box. Return: area (numeric)', function () {
            assert.equal(511207893395811.06, objZone._calcualteArea(strBBox, 'boundingBox'));
        });

         it('Input: valid GeoJSON. Return: area (numeric)', function () {
            assert.equal(3458787757.8718095, objZone._calcualteArea(strGeoJSON, 'GeoJSON'));
        });

          it('Input: valid WKT. Return: area (numeric)', function () {
            assert.equal(3458787757.8718095, objZone._calcualteArea(strWKT, 'WKT'));
        }); 

          it('Input: invalid GeoJSON. Return: undefined', function () {
            assert.equal(undefined, objZone._calcualteArea(strGeoJSONInvalid, 'boundingBox'));
        });

    })
    describe('#_getType defines zone type', function () {
        it('Input: valid boundingBox. Return: "boundingBox" (string)', function () {
            assert.equal('boundingBox', objZone._getType(strBBox));
        });

        it('Input: valid GeoJSON. Return: "GeoJSON"  (string)', function () {
            assert.equal('GeoJSON', objZone._getType(strGeoJSON));
        });

        it('Input: valid WKT. Return: "WKT"  (string)', function () {
            assert.equal('WKT', objZone._getType(strWKT));
        });

        it('Input: valid URLGeoJSON. Return: "URLGeoJSON"  (string)', function () {
            var server = sinon.fakeServer.create();
                server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                 '{"type":"Polygon","coordinates":[[[-71.75,45.35],[-71.25,45.35],[-71.25,46.15],[-71.75,46.15],[-71.75,45.35]]]}'
                ]);
                var resultURL = objZone._getType('http://www.someserver.com/somefile.json');
                server.respond();    
                assert.equal('URLGeoJSON', resultURL);
                server.restore();
        });

        it('Input: argument is not provided, not a string, or in not valid format. Return: undefined', function () {
            expect(objZone._getType('notvalid')).to.be.an('undefined');
            expect(objZone._getType()).to.be.an('undefined');
            expect(objZone._getType({})).to.be.an('undefined');
            expect(objZone._getType(undefined)).to.be.an('undefined');
        });
    })
    describe('#validate validates zone format and size', function () {
        
        it('Input: valid Bounding Box. Return: {status: true; message: " "} (object)', function () {
            var resultBB = objZone.validate(strBBox, maxSize);

            assert.isObject(resultBB);
            expect(resultBB).to.have.property('status', true);
            expect(resultBB).to.have.property('msg', '');

        });

        it('Input: valid GeoJson. Return: {status: true; message: " "} (object)', function () {    
            var resultJson = objZone.validate(strGeoJSON, maxSize);

            assert.isObject(resultJson);
            expect(resultJson).to.have.property('status', true);
            expect(resultJson).to.have.property('msg', '');

        });

        it('Input: valid WKT. Return: {status: true; message: " "} (object)', function () {
            var resultWKT = objZone.validate(strWKT, maxSize);

            assert.isObject(resultWKT);
            expect(resultWKT).to.have.property('status', true);
            expect(resultWKT).to.have.property('msg', '');
        });

        it('Input: valid URL GeoJSON. Return: {status: true; message: " "} (object)', function () {
            
            var server = sinon.fakeServer.create();
                server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                 '{"type":"Polygon","coordinates":[[[-71.75,45.35],[-71.25,45.35],[-71.25,46.15],[-71.75,46.15],[-71.75,45.35]]]}'
                ]);
                var resultURL = objZone.validate('http://www.someserver.com/somefile.json', maxSize);
                server.respond();     
                assert.isObject(resultURL);
                expect(resultURL).to.have.property('status', true);
                expect(resultURL).to.have.property('msg', '');
                server.restore();
        });

        it('Input: URL GeoJSON: wrong link (404 error). Return: {status: false; message: an error message} (object)', function () {
            var server = sinon.fakeServer.create();
                server.respondWith("GET", "", [
                            404, 
                            {"Content-Type": "application/json"}, 
                             '{}'
                            ]);
                server.respond();
                var result404 = objZone.validate('http://www.someserver.com/somefile.json', maxSize);
                assert.isObject(result404);
                expect(result404).to.have.property('status', false);
                expect(result404).to.have.property('msg');
                expect(result404.msg).to.have.length.above(5);
                server.restore();
        });

    it('Input: URL GeoJSON: server returns invalid JSON. Return: {status: false; message: an error message} (object)', function () {
             var server = sinon.fakeServer.create();
                server.respondWith("GET", "", [
                            200, 
                            {"Content-Type": "application/json"}, 
                             '{}'
                            ]);
                server.respond();
                var resultWrongFormatJson = objZone.validate('http://www.someserver.com/somefile.json', maxSize);
                assert.isObject(resultWrongFormatJson);
                expect(resultWrongFormatJson).to.have.property('status', false);
                expect(resultWrongFormatJson).to.have.property('msg');
                expect(resultWrongFormatJson.msg).to.have.length.above(5);
                server.restore();
        });

    it('Input: string in not valid format. Return: {status: false; message: an error message} (object)', function () {
            
            var resultNotValid = objZone.validate('notvalid');
            
            assert.isObject(resultNotValid);
            expect(resultNotValid).to.have.property('status', false);
            expect(resultNotValid).to.have.property('msg');
            expect(resultNotValid.msg).to.have.length.above(5);
        });

     it('BBox exceeds maximum allowed size. Return: {status: false; message: an error message} (object)', function () {
            maxSize = 1;
            var resultBB = objZone.validate(strBBox, maxSize);
            assert.isObject(resultBB);
            expect(resultBB).to.have.property('status', false);
            expect(resultBB).to.have.property('msg');
            expect(resultBB.msg).to.have.length.above(5);
     });

      it('GeoJSON exceeds maximum allowed size. Return: {status: false; message: an error message} (object)', function () {
            maxSize = 1;
            var resultJson = objZone.validate(strGeoJSON, maxSize);
            assert.isObject(resultJson);
            expect(resultJson).to.have.property('status', false);
            expect(resultJson).to.have.property('msg');
            expect(resultJson.msg).to.have.length.above(5);
     });

      it('WKT exceeds maximum allowed size. Return: {status: false; message: an error message} (object)', function () {
            maxSize = 1;
            var resultWKT = objZone.validate(strWKT, maxSize);
            assert.isObject(resultWKT);
            expect(resultWKT).to.have.property('status', false);
            expect(resultWKT).to.have.property('msg');
            expect(resultWKT.msg).to.have.length.above(5);
     });

      it('URL GeoJSON exceeds maximum allowed size. Return: {status: false; message: an error message} (object)', function () {
            maxSize = 1;
            var server = sinon.fakeServer.create();
                server.respondWith("GET", "", [
                200, 
                {"Content-Type": "application/json"}, 
                 '{"type":"Polygon","coordinates":[[[-71.75,45.35],[-71.25,45.35],[-71.25,46.15],[-71.75,46.15],[-71.75,45.35]]]}'
                ]);
                var resultURL = objZone.validate('http://www.someserver.com/somefile.json', maxSize);
            server.respond(); 
            assert.isObject(resultURL);
            expect(resultURL).to.have.property('status', false);
            expect(resultURL).to.have.property('msg');
            expect(resultURL.msg).to.have.length.above(5);
            server.restore();
     });
    })
})
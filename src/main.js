//if it is test environment, private function will become public
try {
    var showPrivatFunc = isTestEnvironment || false;
} catch (e) {
    var showPrivatFunc = false;
}

/**
 * @module  objSetting - defines static parameters: messages, labels, constants, templates
 * @return {object} stng
 */
var objSetting = (function () {
    'use strict';
    var stng = {};

    stng.msg = {};
  
    stng.msg.email = [];
    stng.msg.email.en = 'Email address is invalid';
    stng.msg.email.fr = "L'adresse courriel est invalide";

    stng.msg.failedRead = [];
    stng.msg.failedRead.en = 'Failed to read the configuration file. ';
    stng.msg.failedRead.fr = 'Erreur de lecture du fichier de configuration. ';

    stng.msg.fileExt = [];
    stng.msg.fileExt.en = 'Configuration file location is not provided or in wrong format. Allowed file extensions are ".json" and ".txt"';
    stng.msg.fileExt.fr = 'Le fichier de configuration est introuvable ou son format n’est pas accepté, les formats acceptés sont ".json" et ".txt".';

    stng.msg.missingParam = [];
    stng.msg.missingParam.en = 'Missing Function Parameter(s): ';
    stng.msg.missingParam.fr = 'Argument manquant : ';

    stng.msg.missingElement = [];
    stng.msg.missingElement.en = 'Missing Element of the Configuration Object: ';
    stng.msg.missingElement.fr = 'Élément manquant sur l’objet Configuration : ';

    stng.msg.notObject = [];
    stng.msg.notObject.en = 'The following argument(s) has to be in JSON format: ';
    stng.msg.notObject.fr = 'The following argument(s) has to be in JSON format: ';

    stng.msg.success = [];
    stng.msg.success.en = 'The result of your transformation will be sent to the following email address: ';
    stng.msg.success.fr = 'Le résultat de votre transaction vous sera envoyé à l’adresse suivante : ';

    stng.msg.loginFailed = [];
    stng.msg.loginFailed.en = 'The user ID and/or password you entered are not correct.';
    stng.msg.loginFailed.fr = 'L\'ID utilisateur et/ou le mot de passe que vous avez entré sont inexacts.';

    stng.msg.storageEnable = [];
    stng.msg.storageEnable.en = 'Local Storage Access Required. Please enable Local storage in your browser setting to use this feature.';
    stng.msg.storageEnable.fr = 'L’accès à l’unité de mémoire locale est requise. Afin de profiter de cette fonctionnalité, veuillez activer cette option dans votre navigateur web.';

    stng.msg.zoneSize = [];
    stng.msg.zoneSize.en = 'The selected extraction zone exceeds maximum allowed area';
    stng.msg.zoneSize.fr = 'La superficie de la zone sélectionnée excède la valeur maximale permise  ';

    stng.msg.zoneFormat = [];
    stng.msg.zoneFormat.en = 'Wrong format of the extraction zone.';
    stng.msg.zoneFormat.fr = 'Format incorrect de la géométrie.';

    stng.msg.zoneURLErr0 = [];
    stng.msg.zoneURLErr0.en = 'The server is not accessible.';
    stng.msg.zoneURLErr0.fr = 'Le serveur est inaccessible.';

    stng.msg.zoneURLErr1 = [];
    stng.msg.zoneURLErr1.en = 'The server returns not valid GeoJSON.';
    stng.msg.zoneURLErr1.fr = 'Erreur de validation du GeoJSON, fichier invalide.';

    stng.ttl = {};

    stng.ttl.form = [];
    stng.ttl.form.en = '<h3>Data Extraction Form</h3>';
    stng.ttl.form.fr = '<h3>Formulaire d’extraction des données</h3>';

    stng.ttl.formLogin = [];
    stng.ttl.formLogin.en = '<h3>Login</h3>';
    stng.ttl.formLogin.fr = '<h3>Ouverture de session</h3>';

    stng.lbl = {};

    stng.lbl.required = [];
    stng.lbl.required.en = 'required';
    stng.lbl.required.fr = 'obligatoire';

    stng.lbl.submit = [];
    stng.lbl.submit.en = 'Submit';
    stng.lbl.submit.fr = 'Soumettre';

    stng.inputs = {};
    stng.inputs.email = {
        defaultValue: "",
        description: "<fr>Adresse électronique (votrenom@domaine.com)</fr><en>Email address (yourname@domain.com)</en>",
        model: "TEXT",
        name: "opt_requesteremail",
        type: "EMAIL"
    };

    stng.inputs.user = {
        defaultValue: "",
        description: "<fr>Nom d’utilisateur</fr><en>Username</en>",
        model: "string",
        name: "user",
        type: "TEXT"
    };

    stng.inputs.password = {
        defaultValue: "",
        description: "<fr>Mot de passe</fr><en>Password</en>",
        model: "string",
        name: "password",
        type: "PASSWORD"
    };

    stng.inputs.serviceID = {
        defaultValue: "",
        description: "",
        model: "string",
        name: "serviceID",
        type: "HIDDEN"
    };

    stng.inputs.callback = {
        defaultValue: "",
        description: "",
        model: "string",
        name: "callback",
        type: "HIDDEN"
    };

    stng.inputTypes = {};
    stng.inputTypes.textArea = ["TEXT_EDIT"];
    stng.inputTypes.text = ["STRING ", "TEXT", "COLOR_PICK", "COORDSYS", "INTEGER", "INT", "FLOAT", "PASSWORD"];
    stng.inputTypes.select = ["CHOICE", "LOOKUP_CHOICE"];
    stng.inputTypes.checkBox = ["LISTBOX", "LOOKUP_LISTBOX"];
    stng.inputTypes.dataList = ["FLOAT_OR_CHOICE", "STRING_OR_CHOICE", "INT_OR_CHOICE"];
    stng.inputTypes.hidden = ["HIDDEN"];
    stng.inputTypes.email = ["EMAIL"];

    stng.inputNumeric = ["INTEGER", "INT", "FLOAT", "FLOAT_OR_CHOICE", "INT_OR_CHOICE"];

    stng.consts = {};
    stng.consts.maxDefaultArea = 9984671 * 1000000; // area in sq.m. Default - Canada area
    stng.consts.tokenExpireHours = 24; //hours - token expiration time in session memory
    stng.consts.tokenExpireMsec = stng.consts.tokenExpireHours * 60 * 60 * 1000; //milliseconds - token expiration time;

    stng.tmpl = {};
    stng.tmpl.form = '<div class="wb-frmvld"><form action="{{action}}" method="get" id="{{formID}}">';
    stng.tmpl.message = '<section class="alert alert-{{status}}" ="fmeRspMsg"><p>{{message}}</p></section>';
    stng.tmpl.wrapper = ' <div class="form-group"><label for="{{name}}" class="required"><span class="field-name">{{description}}</span> <strong class="required">({{requiredLabel}})</strong></label>';
    stng.tmpl.wrapperCheckBox = '<fieldset><legend class="required"><span class="field-name">{{description}}</span> <strong class="required">({{requiredLabel}})</strong></legend>';
    stng.tmpl.text = '<input type="{{type}}" class="form-control" id="{{name}}" name="{{name}}" value="{{defaultValue}}" required="required" /></div>';
    stng.tmpl.email = '<input type="text" class="form-control" id="{{name}}" name="{{name}}" value="{{defaultValue}}" required="required" data-rule-email="true"/></div>';
    stng.tmpl.textArea = '<textarea class="form-control" id="{{name}}" name="{{name}}" rows="3" required="required"> {{defaultValue}}</textarea></div>';
    stng.tmpl.checkBox = '<fieldset><legend class="required"><span class="field-name">{{description}}</span> <strong class="required">({{requiredLabel}})</strong></legend> {{#listOptions}}<div class="checkbox"><label for="{{id}}"><input type="checkbox" id="{{id}}" name="{{name}}" value="{{value}}" required="required" {{selected}}/> {{caption}}</label></div>{{/listOptions}}<fieldset>';
    stng.tmpl.select = '<select class="form-control" id="{{name}}" name="{{name}}" required="required"><option value=""></option> {{#listOptions}}<option value="{{value}}" {{selected}}>{{caption}}</option>{{/listOptions}}</select></div>';
    stng.tmpl.dataList = ' <input type="text" class="form-control" id="{{name}}" name="{{name}}" value="{{defaultValue}}" required="required" list="suggestions_{{name}}" >   <datalist id="suggestions_{{name}}">  <!--[if lte IE 9]><select><![endif]--> {{#listOptions}}  <option value="{{value}}">{{value}}</option>   {{/listOptions}}  <!--[if lte IE 9]></select><![endif]-->   </datalist>   </div>';
    stng.tmpl.zone = '<textarea class="form-control" id="{{name}}" name="{{name}}" rows="3" required="required" data-rule-zone="true">{{defaultValue}}</textarea></div>';
    stng.tmpl.hidden = '<input type="hidden"  id="{{name}}" name="{{name}}" value="{{defaultValue}}">';
    stng.tmpl.button = '<button type="{{buttonType}}" class="btn btn-default" id="{{id}}" > {{label}}</button></div>';

    stng.tokenPrefix = 'FMENRCToken';

    return stng;
}());

/**
 * @module  {Object} objZone
 * @return {object}  - set of method to validate extraction zone type and size
 */
var objZone = (function () {
    'use strict';
    var zone = {};

    /** Converts Well Known Text to JSON for ESRI Geometry creation.
     * source: https://gist.github.com/mitch-cohen/9547514
     * @param {String} WKTstr - Well Known Text
     * @return {object} JSON
     */
    var _fromWKT2Json = function (WKTstr) {
        var mods = {};

        var convertToPointArray = function (ptArrayString) {
            var points = [],
                ptStringArray = ptArrayString.replace(/\)|\(/gi, "").split(",");
            ptStringArray.forEach(function (pt) {

                var splitpt = pt.trim().split(" "),
                    x = parseFloat(splitpt[0], 10),
                    y = parseFloat(splitpt[1], 10);

                points[points.length] = [x, y];
            });
            return points;
        };

        mods.POINT = function (tailStr) {
            ///point should be in the following format:
            //    (xxxx yyyy)
            var point = tailStr.replace(/\)|\(/gi, "")
                .trim()
                .split(" ");
            return {
                type: 'point',
                x: parseFloat(point[0], 10),
                y: parseFloat(point[1], 10)
            };
        };
        mods.MULTILINESTRING = function (tailStr) {
            //should be in the following format:
            //    MULTILINESTRING((10 10, 20 20), (15 15, 30 15))
            ///strip outermost parenthesis
            tailStr = tailStr.replace(/(\(\()|(\)\))/gi, '');
            //split on tailing parenthesis and comma
            var paths = [],
                pathsRaw = tailStr.split("),"); ///show now have ['(x1 y1, x2 y2,....)','(x1 y1, x2 y2,....)',...]

            pathsRaw.forEach(function (p) {
                paths[paths.length] = convertToPointArray(p);

            });
            return {
                type: 'polyline',
                paths: paths
            };
        };

        mods.POLYGON = function (tailStr) {
            var ml = mods.MULTILINESTRING(tailStr);
            //differences between this and multi-line is that the paths are rings
            return {
                type: 'Polygon',
                coordinates: ml.paths
            };
        };
        mods.MULTIPOLYGON = function (tailStr) {
            console.error('MULTIPOLYGON - not implemented');
        };
        mods.MULTIPOINT = function (tailStr) {
            return {
                type: 'multipoint',
                points: convertToPointArray(tailStr)
            };
        };
        mods.LINESTRING = function (tailStr) {
            //only close translation is multipoint
            return mods.MULTIPOINT(tailStr);

        };
        //chunk up the incoming geometry WKT string
        var geoArray = WKTstr.split("("),
            head = geoArray.shift().trim(), ///head should be the geometry type
            tail = '(' + (geoArray.join("(")
                .trim()); ///reconstitute the body
        return mods[head](tail);
    };

    /**
     * @method _calcualteArea calculates area of an extraction zone. Requires turf.js.
     * @param  {string} value  - polygon coordinates
     * @param  {string} areaType - BBox, GeoJSON or WKT
     * @return {number} - polygon area in area in sq.m.     
     */
    var _calcualteArea = function (value, areaType) {
        areaType = areaType || '';
        value = value || '';
        var poly;
        var area;
        try {
            switch (areaType) {
            case 'boundingBox':
                poly = turf.bboxPolygon(JSON.parse(value));
                break;
            case 'GeoJSON':
                poly = JSON.parse(value);
                break;
            case 'WKT':
                poly = _fromWKT2Json(value);
                break;
            }

            if (poly) {
                area = turf.area(poly);
            }
        } catch (err) {
            console.log(err);
        }
        return area;
    };

    /**
     * @method  _getType - defines zone type
     * @param  {string} toTest - zone definition/string with coordinates
     * @return {string} areaType - boundingBox/GeoJSON/URLGeoJSON/WKT/undefined
     */
    var _getType = function (toTest) {
        var patterns = {};
        patterns.boundingBox = /^\s*?\[\s*?(((-?\d+\.\d+\s*?,?\s*?-?\d+\.\d+)\s*?,?\s*?)+)\s?\]/;
        patterns.GeoJSON = /^\s*?\{\s*?("type")\s*?:\s*?("Polygon"|"MultiPolygon")\s*?,\s*?("coordinates")\s*?:\s*?\[{1,}[\[\s]+\s*?(((\[\s*?(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)\s*?\]\s*?)(\s*,\s*|\]\s*,\s*\[\s*)?)+)\s?\]{1,}[\]\s]+\s*?\}/i;
        patterns.URLGeoJSON = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
        patterns.WKT = /^\s*?(POLYGON)\s*?\(\s*?\(\s?(((-?\d+\.\d+\s-?\d+\.\d+),?)+)\s*?\)\s*?\)/i;
        var areaType;
        jQuery.each(patterns, function (index, value) {
            if (value.test(toTest)) {
                areaType = index;
            }
        });
        return areaType;
    };

    /**
     * @method  validate - validates zone format and size
     * @param  {string} value  - zone definition/string with coordinates
     * @param  {number} maxArea - maximum  allowed polygon area in area in sq.m.
     * @param  {string} lng  - language for the message ('fr' or 'en')
     * @return {object} result
     * @return {string} result.status - true / false
     * @return {string} result.msg - message
     */
    zone.validate = function (value, maxArea, lng) {
        value = value || null;
        maxArea = maxArea || objSetting.consts.maxDefaultArea;
        var areaType;
        var result = {};
        var area;
        lng = lng || 'en';
        result.status = true;
        result.msg = '';
        areaType = _getType(value);
        if (!areaType) {
            result.status = false;
            result.msg = objSetting.msg.zoneFormat[lng];
            return result;
        }

        if (areaType === 'URLGeoJSON') {
            var serverResponse = objGeneral.getSync(value);
            if (serverResponse.status !== 'success') {
                result.status = false;
                result.msg = objSetting.msg.zoneURLErr0[lng];
                return result;
            }
            //TEST: for the test title - serverResponse.data.geometry
            var zoneDef = serverResponse.data.geometry ? serverResponse.data.geometry : serverResponse.data;
            var strZoneDef = JSON.stringify(zoneDef);
            areaType = _getType(strZoneDef);
            if (_getType(strZoneDef) === 'GeoJSON') {
                value = strZoneDef;
            } else {
                result.status = false;
                result.msg = objSetting.msg.zoneURLErr1[lng];
            }
        }

        area = _calcualteArea(value, areaType);
        if (area !== undefined && area > maxArea) {
            result.status = false;
            result.msg = objSetting.msg.zoneSize[lng] + ' (' + maxArea + ')';
            return result;
        }
        return result;
    };

    if (showPrivatFunc) {
        zone._fromWKT2Json = _fromWKT2Json;
        zone._calcualteArea = _calcualteArea;
        zone._getType = _getType;
    }

    return zone;
}(jQuery));

/**@module objGeneral - a set of general functions
 * @return [object] fncts
 */
var objGeneral = (function () {
    'use strict';
    var fncts = {};

    /**@method packJSend - Packs object returned from functions into JSend format
     * @param  {String} status - 'success' / 'fail' / 'error'
     * @param  {Object} data - JSON data (for success) or message string (for fail or error)
     * @param  {String} code - error code (optional)
     * @return {Object} result - JSON in JSend format
     */
    fncts.packJSend = function (status, data, code) {
        var result = {};
        result.status = status;
        if (status !== 'error') {
            result.data = data;
        } else {
            result.message = data;
        }
        //error code is an optional key for status='error'
        if (code) {
            result.code = code;
        }
        return result;
    };

    /** @method validateFile - Validates file extension
     * @param  {String} file - File name to validate
     * @param  {Array} allowedTypes - Types of file extension
     * @return {Boolean}  isValid - True (Valid) / False (Not valid) 
     * */
    fncts.validateFile = function (file, allowedTypes) {
        var isValid = false;
        file = file || '';
        allowedTypes = allowedTypes || ["json", "txt"];
        var extension = file.substr(file.lastIndexOf('.') + 1);

        if (jQuery.inArray(extension, allowedTypes) > -1) {
            isValid = true;
        }
        return isValid;
    };
  
    /** @method validateEmail - Validates the email address
     * @param  {String} address - email address to validate
     * @param  {String} lng - language for the message ('fr' or 'en')
     * @return {object} result
     * @return {string} result.status - true / false
     * @return {string} result.msg - message 
     * */
    fncts.validateEmail = function (address, lng) {
        var result = {};
        result.status = false;
        result.msg = '';
        var pattern = new RegExp(/^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/);
        address = address.toUpperCase() || '';
        result.status = pattern.test(address);
        if(! result.status) {
          result.msg = objSetting.msg.email[lng];
        }
        return result;
    };

    /**
     * @method getLangLabel - Extracts a label for the selected language  from a XML-like string (e.g. extract "Text in Fr" from "<fr>Text in Fr</fr><en>Text in Eng</en>"). 
     * @param  {String} str - XML-like string with text in both languages
     * @param  {String} lng - language to extract ('fr' or 'en').
     * @return {String} result - Text for the specified language. If not exists, str without XML markup
     */
    fncts.getLangLabel = function (str, lng) {
        var result = '';
        lng = lng || 'en';
        str = str || '';
        str = str.toString();
        //everything in <>
        var regex = /(<([^>]+)>)/ig;
        //opening and closing tags for the language
        var strStart = "<" + lng + ">";
        var strEnd = "</" + lng + ">";
        var posStart = str.indexOf(strStart);
        var posEnd = str.indexOf(strEnd);

        //does a label for the language exist?
        if (!(posStart < 0)) {
            result = str.substring(posStart + 4, posEnd);
        } else {
            result = str.replace(regex, "");
        }
        return result;
    };

    /**
     * @method  getAsync - submits asynchronous request
     * @param  {string} url
     * @param  {Function} callback
     * @return {object} response - object in JSend format
     */
    fncts.getAsync = function (url, callback) {
        var data = {};
        var jqxhr = jQuery.ajax({
                url: url,
                dataType: 'json'
            })
            .done(function (data) {
                var response = fncts.packJSend('success', data);

                callback(response);
            })
            .fail(function (jqXHR) {
                if ((jqXHR.readyState === 4) && (jqXHR.status !== 200)) {
                    data.status = 'fail';
                    data.data = jqXHR.statusText;
                    try {
                        var messageObj = JSON.parse(jqXHR.responseText);
                    } catch (e) {
                        //error returned from the server
                        messageObj = fncts.packJSend('fail', e);
                    }
                    if (messageObj.message) {
                        data.data = data.data + '. ' + messageObj.message;
                    }
                    var response = fncts.packJSend('fail', data.data, jqXHR.status);

                    callback(response);
                }

            });
    };

    /**
     * @method  getSync - submits synchronous request
     * @param  {string} url
     * @param  {Function} callback
     * @return {object} response - object in JSend format
     */
    fncts.getSync = function (url) {
        var errorCode;
        var errorMsg = '';
        var data = {};
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.send(null);
        if (request.readyState === 4) {
            if (request.status !== 200) {
                data.status = 'fail';
                data.data = request.status + ': ' + request.statusText;
            }

            if (request.status === 200) {
                data.status = 'success';
                data.data = request.responseText;
                //return data in JSON format
                try {
                    data.data = jQuery.parseJSON(request.responseText);
                } catch (e) {
                    //error returned from the server
                    data = fncts.packJSend('fail', errorMsg + e);
                }
            }

        } else {

            errorCode = request.status;
            data = fncts.packJSend('error', errorMsg, errorCode);
        }

        return data;

    };
    /**
     * @method getURLString - builds URL string
     * @param  {string} server - protocol and domain name
     * @param  {array} dirs - array of directories
     * @param  {string} file - file (service) name
     * @param  {string} item
     * @param  {string} params - query string
     * @return {string} URL    - server/dirs/file/item?params
     */
    fncts.getURLString = function (server, dirs, file, item, params) {
        //URL: server/dirs/file/item?params
        var URL = '';

        server = server || undefined;
        dirs = dirs || [];
        file = file || undefined;
        item = item || '';
        params = params || '';

        if (!server || !(/^(f|ht)tps?:\/\//i)
            .test(server)) {
            throw new Error('The server is required and must be in a valid format, e.g. "http://servername".');
        }
        if (!Array.isArray(dirs)) {
            throw new Error('dir parameter is not a valid array.');
        }
        //URL - server
        URL = URL + server + '/';
        //URL - directories
        jQuery.each(dirs, function (i) {
            URL = URL + dirs[i] + '/';
        });
        //URL - file
        if (file) {
            URL = URL + file;
        }

        //URL - item
        if (item) {
            URL = URL + '/' + item;
        }
        //URL - parameters
        if (params) {
            URL = URL + '?' + params;
        }
        return URL;
    };

    return fncts;
}());

/**
 * @this objConfig
 * @return {objConfig} cnf - Server Configuration Object
 */
var objConfig = (function () {
    'use strict';
    var cnf = {};
    var rsp = {};
    var customErr = '';
    var lng = 'en';
    cnf.data = [];
    cnf.status = 'success';

    /**
     * @method _validateConfig - checks if the element is in the JSON object
     * @param  {string} element - element name
     * @param  {object} obj - object to check
     * @return {string} err - error message
     */
    var _validateConfig = function (element, obj) {
        element = element || '';
        obj = obj || cnf;
        var err = '';
        if (customErr.length === 0 && cnf.status !== 'success') {
            err = objSetting.msg.failedRead[lng];
        }
        if (err.length === 0 && !cnf.data.hasOwnProperty(element)) {
            err = objSetting.msg.missingElement[lng] + ' ' + element;
        }
        return err;
    };

    /**
     * @method  _getLanguage - gets language of the page  
     * @return {string} lang - language ('en' or 'fr')
     */
    var _getLanguage = function () {
        var lang = 'en';
        try {
            lang = (jQuery("html").attr('lang').indexOf('fr') === 0) ? 'fr' : 'en';
        } catch (e) {
            lang = 'en';
        }
        return lang;
    };

    /**
     * @method init - initializes a configuration object
     * @param  {string} src - path to the config file
     * @param  {string} lang - language ('en' or 'fr')
     * @return {object} cnf - configuration object
     * @return {string} cnf.status - success/fail
     * @return {object} cnf.data - configuration parameters
     */
    cnf.init = function (src, lng) {
        src = src || '';
        lng = lng || _getLanguage();
        var lngOptions = ['en', 'fr'];
        if (lngOptions.indexOf(lng.toLowerCase()) < 0) {
            lng = 'en';
        }
        customErr = '';

        var isValidFile = objGeneral.validateFile(src, ["json", "txt"]);
        if (isValidFile) {
            rsp = objGeneral.getSync(src);
            cnf.data = rsp.data;
            cnf.status = rsp.status;
        } else {
            cnf = objGeneral.packJSend('fail', objSetting.msg.failedRead[lng] + '' + objSetting.msg.fileExt[lng]);
        }

        if (cnf.status === 'success') {
            cnf.data.lng = lng;
        }
        return cnf;
    };

    /**
     * @method getConfigElement - returns value of the configuration object parameter 
     * @param {string} element - the element name
     * @return {object} serviceData 
     * @return {string} serviceData.status - success / fail 
     * @return {object} serviceData.data - string/object - value of the parameter 
     */
    cnf.getConfigElement = function (element) {
        customErr = _validateConfig(element);

        if (customErr.length > 0) {
            return objGeneral.packJSend('fail', customErr);
        }
        return objGeneral.packJSend('success', cnf.data[element]);
    };

    /**
     * @method getConfigService - gets service configuration object by service id
     * @param  {string} serviceId
     * @return {object} serviceData
     * @return {object} serviceData.status - success/fail
     * @return {object} serviceData - parameters of the service object
     */
    cnf.getConfigService = function (serviceId) {
        var services, serviceData;

        if (customErr.length === 0 && !serviceId) {
            customErr = objSetting.msg.missingParam[lng] + ' serviceId';
        }
        if (customErr.length > 0) {
            return objGeneral.packJSend('fail', customErr);
        }

        try {
            services = cnf.data.fmeServices;

            jQuery.each(services, function (key, data) {
                if (data.serviceID === serviceId) {
                    serviceData = objGeneral.packJSend('success', data);
                }
            });

            if (jQuery.isEmptyObject(serviceData)) {
                serviceData = objGeneral.packJSend('fail', objSetting.msg.missingElement[lng] + serviceId);
                return serviceData;
            }
        } catch (err) {
            return objGeneral.packJSend('fail', err.message);
        }

        return serviceData;
    };

    if (showPrivatFunc) {
        cnf._validateConfig = _validateConfig;
    }
    return cnf;
}());

/**@module objFME
 * @return {object} fmeService - object with configuration parameters and methods for interaction with FME Server
 */
var objFME = (function () {
    'use strict';
    //object to return
    var fmeService = {};

    fmeService.status = '';
    fmeService.data = '';
    fmeService.token = '';

    //object to keep all configuration info (fmeService.fmeConf)
    var fmeConf = {};

    //default values for the fmeConf parameters
    fmeConf.username = '';
    fmeConf.password = '';

    fmeConf.setting = {};
    fmeConf.setting.transformationService = 'fmedatadownload';
    fmeConf.setting.opt_showresult = 'false';
    fmeConf.setting.opt_servicemode = 'async';
    fmeConf.setting.opt_responseformat = 'json';

    fmeConf.service = {};
    fmeConf.service.serviceID = '';
    fmeConf.service.serviceTitle = {};
    fmeConf.service.serviceTitle.en = '';
    fmeConf.service.serviceTitle.fr = '';
    fmeConf.service.serverURL = '';
    fmeConf.service.repository = '';
    fmeConf.service.serviceName = '';
    fmeConf.service.maxAreaParamName = '';
    fmeConf.service.extractionZoneParamName = '';

    fmeConf.contForm = 'FMENRCanFormSection';
    fmeConf.contMessages = 'FMENRCanMessageSection';
    fmeConf.lng = 'en';
    var theForm = '';
    var contFormId = '';

    /**
     * @method _cleanInterface removes content from HTML containers
     * @return {boolean}  true
     */
    var _cleanInterface = function () {
        jQuery(fmeConf.theForm).remove();
        jQuery('#' + fmeConf.contMessages).html('');
        return true;
    };

    /**
     * @method _localStorageTest checks if local storage is available
     * @return {boolean}
     */
    var _localStorageTest = function () {
        try {
            var test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    };

    /**
     * @method _displayMessage displays success/fail message
     * @param  {object} msgParams - Message parameters object
     * @param  {string} msgParams.status - Success/Fail
     * @param  {string} msgParams.message - Message to display
     * @param  {string} [messageContainer] - Container ID (jQuery selector: ''#containerID')
     * @return {string} messageBox - HTML code for the message
     */
    var _displayMessage = function (msgParams, messageContainer) {

        msgParams = msgParams || {};

        if (jQuery.type(msgParams) !== 'object') {
            throw new Error('msgParams argument must be a valid JSON');
        }

        msgParams.status = msgParams.status || '';
        msgParams.message = msgParams.message || '';
        messageContainer = messageContainer || '#' + fmeConf.contMessages;
        var messageBox = Mustache.to_html(objSetting.tmpl.message, msgParams);
        jQuery(messageContainer).html(messageBox);
        jQuery(messageContainer).attr('tabindex', -1).focus();
        return messageBox;
    };

    /**
     * @method init - sets parameters that are required to communicate with FME server and to build user interface
     * @param {object} user - Login to the server
     * @param {string} user.username
     * @param {string} user.password
     * @param {object} service - Service configuration parameters
     * @param {string} service.serviceID
     * @param {object} [service.serviceTitle={}]
     * @param {string} [service.serviceTitle.fr='']
     * @param {string} [service.serviceTitle.en='']
     * @param {string} service.serverURL
     * @param {string} service.repository
     * @param {string} service.serviceName
     * @param {string} [service.maxAreaParamName] 
     * @param {string} [service.extractionZoneParamName]
     * @param {object} [setting] - Data download service configuration parameters
     * @param {string} [setting.transformationService='fmedatadownload']
     * @param {string} [setting.opt_showresult='false'] 
     * @param {string} [setting.opt_servicemode='async']
     * @param {string} [setting.opt_responseformat='json']
     * @param {object} [container]  - IDs of HTML elements that will be used as containers
     * @param {object} [container.form='FMENRCanFormSection']  - form container
     * @param {object} [container.messages= 'FMENRCanMessageSection']  -messages containers
     * @param {string} [lng='en']  - Language of the interface: 'en' / 'fr'
     * @return {object} fmeService
     */
    fmeService.init = function (user, service, setting, container, lng) {
        //check for mandatory arguments
        try {
            if (user === undefined || service === undefined) {
                throw new Error('Arguments user and service are mandatory');
            }

            if (
                user.username === undefined ||
                user.password === undefined ||
                service.serviceID === undefined ||
                service.repository === undefined ||
                service.serviceName === undefined ||
                service.serverURL === undefined
            ) {
                throw new Error(objSetting.msg.missingParam[lng] + ' user.username, user.password, service.serviceID, service.repository, service.serviceName, service.serverURL');
            }

            var isObject =
                (jQuery.type(user) === 'object') &&
                (jQuery.type(service) === 'object') &&
                (setting === undefined || jQuery.type(setting) === 'object') &&
                (container === undefined || jQuery.type(container) === 'object');
            if (!isObject) {
                throw new Error(objSetting.msg.notObject[lng] + ' user, service, setting and container');
            }
        } catch (err) {

            fmeService.status = 'fail';
            fmeService.data = err.message;
            return fmeService;
        }

        //clean token from the previous call
        fmeService.token = '';
        //clean form and messages from the previous call
        _cleanInterface();
        //initialize fmeConf with passed values
        user = user || {};
        setting = setting || {};
        service = service || {};
        container = container || {};

        fmeConf.username = user.username || fmeConf.username;
        fmeConf.password = user.password || fmeConf.password;

        fmeConf.service = service;
        fmeConf.service.serviceID = service.serviceID || fmeConf.service.serviceID;
        fmeConf.service.serviceTitle = service.serviceTitle || {};
        fmeConf.service.serviceTitle.en = service.serviceTitle.en || '';
        fmeConf.service.serviceTitle.fr = service.serviceTitle.fr || '';
        fmeConf.service.serverURL = service.serverURL || fmeConf.service.serverURL;
        fmeConf.service.repository = service.repository || fmeConf.service.repository;
        fmeConf.service.serviceName = service.serviceName || fmeConf.service.serviceName;
        fmeConf.service.maxAreaParamName = service.maxAreaParamName || fmeConf.service.maxAreaParamName;
        fmeConf.service.extractionZoneParamName = service.extractionZoneParamName || fmeConf.service.extractionZoneParamName;

        fmeConf.setting = setting;
        fmeConf.setting.transformationService = setting.transformationService || fmeConf.setting.transformationService;
        fmeConf.setting.opt_showresult = setting.opt_showresult || fmeConf.setting.opt_showresult;
        fmeConf.setting.opt_servicemode = setting.opt_servicemode || fmeConf.setting.opt_servicemode;
        fmeConf.setting.opt_responseformat = setting.opt_responseformat || fmeConf.setting.opt_responseformat;

        fmeConf.contForm = container.form || fmeConf.contForm;
        fmeConf.contMessages = container.messages || fmeConf.contMessages;

        //value of lng should be 'en' or 'fr'
        fmeConf.lng = lng || fmeConf.lng;
        var lngOptions = ['en', 'fr'];
        if (lngOptions.indexOf(fmeConf.lng.toLowerCase()) < 0) {
            fmeConf.lng = 'en';
        }

        // jQuery selector for the form: '#formSection form'
        theForm = '#' + fmeConf.contForm + ' form';
        // jQuery selector for the form container: '#formSection form'
        contFormId = '#' + fmeConf.contForm;

        fmeService.status = 'success';
        fmeService.data = fmeConf;

        return fmeService;
    };
    /**
     * @method getToken - retrieves a token from LocalStorage or from FME server
     * @param  {string} serviceID - service for which token has to be retrieved/generated
     * @param  {string} username - username to request token from the server
     * @param  {string} password - password to request token from the server
     * @param  {Function} [callback = getWebServiceParam | buildLoginForm | displayMessage ]
     * @param  {string} [serverURL] - server from which to request token
     * @return {string} - empty string or token 
     */
    fmeService.getToken = function (serviceID, username, password, callback, serverURL) {
        var objToken = {};
        var objMsg = {};
        var url = '';
        var sessionKey = '';
        serviceID = serviceID || fmeConf.service.serviceID;
        password = password || fmeConf.service.password;
        username = username || fmeConf.service.username;
        serverURL = serverURL || fmeConf.service.serverURL;
        //if a valid token in the local storage, send token to the callback
        var token = fmeService.lookUpSessionToken(serviceID);
        if (token !== '' && callback !== undefined) {
            callback(token);
            return false;
        } else if (token !== '' && callback === undefined) {
            fmeService.getWebServiceParam(fmeConf.service, token);
            return false;
        }

        sessionKey = objSetting.tokenPrefix + serviceID;
        var params = '&expiration=1&timeunit=day' + '&user=' + username + '&password=' + password;
        url = objGeneral.getURLString(serverURL, ["fmetoken"], 'generate.json', '', params);

        //request token from the FME server
        var promise = jQuery.ajax({
            url: url,
            dataType: 'json'
        });
        //authorization passed
        promise.done(function (json) {
            objToken.token = json.serviceResponse.token;
            objToken.expirationDate = new Date(new Date()
                .getTime() + objSetting.consts.tokenExpireMsec);
            if (_localStorageTest()) {
                localStorage.setItem(sessionKey, JSON.stringify(objToken));
            }

            fmeService.token = objToken.token;
            _cleanInterface();

            if (callback !== undefined) {
                callback(objToken.token);

            } else {
                fmeService.getWebServiceParam(fmeConf.service, objToken.token);
            }
        });
        //authorization failed
        promise.fail(function (data) {
            objMsg.message = objSetting.msg.loginFailed[fmeConf.lng];
            objMsg.status = 'danger';

            if (callback !== undefined) {
                callback('');
            }

            //if the form already on the page, display an error message
            if (jQuery('#FMENRCanLogin')
                .length) {
                _displayMessage(objMsg);
            }
            //if there is no login form on the page, build it
            else {

                fmeService.buildLoginForm(serviceID);
                return false;
            }
        });
    };
    /**
     * @method lookUpSessionToken - retrieves token from localStorage for the specified serviceID
     * @param  {string} serviceID 
     * @param  {string} [lng] - language of the message ('fr' or 'en')
     * @return {string} empty string, if token not found or token
     */
    fmeService.lookUpSessionToken = function (serviceID, lng) {
        lng = lng || fmeConf.lang;
        var token = '';
        if (!_localStorageTest()) {
            var objMsg = {};
            objMsg.message = objSetting.msg.storageEnable[lng];
            objMsg.status = 'danger';
            _displayMessage(objMsg);
            return token;
        }
        serviceID = serviceID || fmeConf.serviceID;

        var validSessionToken = false;
        var sessionKey = objSetting.tokenPrefix + serviceID;
        var sessionToken = localStorage.getItem(sessionKey);
        var sessionTokenObj = JSON.parse(sessionToken);
        //check if there is not expired token in the local storage
        if (JSON.parse(sessionToken) !== null) {
            //check if session is expired
            var now = new Date();
            var exparation = new Date(sessionTokenObj.expirationDate);
            validSessionToken = now.getTime() < exparation.getTime();
        }
        if (validSessionToken) {
            token = sessionTokenObj.token;
        }

        return token;
    };
    /**
     * @method getWebServiceParam - uses FME Server REST API to fetch all published parameters from a web service 
     * @param  {object}   [paramService =fmeConf.service] - service configuration parameters.
     * @param  {string}   [paramToken = fmeService.token]   - token 
     * @param  {Function} [callback=objFME.buildForm]   
     * @return {object}   - FME Web Service parameters
     */
    fmeService.getWebServiceParam = function (paramService, paramToken, callback) {
        callback = callback || fmeService.buildForm;
        paramService = paramService || fmeConf.service;
        var sessionKey = objSetting.tokenPrefix + paramService.serviceName;
        paramToken = paramToken || fmeService.token;
        var server = paramService.serverURL || fmeConf.service.serverURL;
        var dirs = ["fmerest", "v2", "repositories", paramService.repository, 'items'];
        var file = paramService.serviceName || fmeConf.service.serviceName;
        var item = 'parameters';
        var params = 'accept=json&detail=high&token=' + paramToken;
        var url = objGeneral.getURLString(server, dirs, file, item, params);
        objGeneral.getAsync(url, callback);
    };

    /**
     * @method  buildLoginForm - builds login form 
     * @param  {string} serviceID 
     */
    fmeService.buildLoginForm = function (serviceID) {
        var objForm = {};
        objSetting.inputs.serviceID.defaultValue = serviceID;
        objForm.status = 'success';
        objForm.data = [];
        objForm.data.push(objSetting.inputs.serviceID);
        objForm.data.push(objSetting.inputs.user);
        objForm.data.push(objSetting.inputs.password);
        fmeService.buildForm(objForm, 'login');
    };

    /**
     * @method buildForm - composes HTML code for a form and displays it in the designed div
     * @param  {object} json - JSON returned from FME Server - web service parameters
     * @param  {string} [formType = 'request'] - form type: request or login
     * @param  {string} formContainer - jQuery selector of the form HTML container ('#someId')
     * @param  {string} messageContainer - ID of the messages HTML container  
     * @param  {string} maxAreaName -  name of the service parameter that contains value of the maximum allowed area
     * @param  {string} [lng] - language ('fr' or 'en')
     * @return {boolean} - true
     */
    fmeService.buildForm = function (json, formType, formContainer, messageContainer, maxAreaName, lng) {
        json = json || {};
        json.status = json.status || 'fail';
        json.data = json.data || {};
        if (json.status !== 'success') {
            return false;
        }
        _cleanInterface();

        formContainer = formContainer || contFormId;
        messageContainer = messageContainer || fmeConf.contMessages;
        json = json.data;
        formType = formType || 'request';
        maxAreaName = maxAreaName || fmeConf.service.maxAreaParamName;
        lng = lng || fmeConf.lng;
        var formTitle = '',
            result = '',
            objForm = {},
            formHTML,
            inputHTML = '',
            objSubmitBtn,
            submitHTML,
            maxAreaVal = json[maxAreaName] || objSetting.consts.maxDefaultArea;
        if (formType === 'login') {
            objForm.formID = 'FMENRCanLogin';
            formTitle = objSetting.ttl.formLogin[lng];

        } else {
            //add email field to the form
            json.push(objSetting.inputs.email);
            objForm.formID = 'FMENRCanRequest';
            formTitle = objSetting.ttl.form[lng];
        }
        formTitle = '<h2>' + fmeConf.service.serviceTitle[lng] + '</h2> ' + formTitle;

        objForm.action = "javascript:objFME.handleSuccessfulSubmit('" + objForm.formID + "','" + formType + "')";

        formHTML = Mustache.to_html(objSetting.tmpl.form, objForm);

        //form inputs
        jQuery.each(json, function (index, val) {
            // don't display
            if (val.name !== maxAreaName) {
                inputHTML = inputHTML + fmeService.buildInput(val);
            } else {
                maxAreaVal = val.defaultValue;
            }
        });

        //submit button
        objSubmitBtn = {};
        objSubmitBtn.label = objSetting.lbl.submit[lng];
        objSubmitBtn.id = 'FMENRCanSubmit';

        submitHTML = Mustache.to_html(objSetting.tmpl.button, objSubmitBtn);

        // compose the form
        result = result + formHTML + inputHTML + submitHTML + '</form></div>';
        //display the form
        result = formTitle + result;
        jQuery(formContainer)
            .html(result);


        // in addition to the standard WET4 validation, add custom validation
        jQuery(".wb-frmvld")
            .on("wb-ready.wb-frmvld", function () {
                var validationResult = {};
                jQuery.validator.addMethod("zone", function (value) {
                    validationResult = objZone.validate(value, maxAreaVal, lng);
                    jQuery.extend(jQuery.validator.messages, {
                        zone: validationResult.msg
                    });
                    return validationResult.status;
                });
          
                jQuery.validator.addMethod("email", function (value) {
                    validationResult = objGeneral.validateEmail(value, lng);
                    jQuery.extend(jQuery.validator.messages, {
                        email: validationResult.msg
                    });
                    return validationResult.status;
                });

                //remove messages on form submit
                jQuery("#FMENRCanSubmit")
                    .bind('click', function () {
                        jQuery('#' + messageContainer)
                            .html('');
                    });
                //validation will initiated manually and only on submit
                jQuery(":input:not(:button), textarea, select")
                    .bind('keyup change focusout', function () {
                        jQuery('#' + messageContainer)
                            .html('');
                        return false;
                    });


            });
        //manually initialize the form validation
        jQuery(".wb-frmvld")
            .trigger("wb-init.wb-frmvld");
        return true;
    };

    /**
     * @method buildInput - transforms server parameter (JSON) into a form input (HTML)
     * @param  {object} inputParams - set of parameters of a singe FME server parameter
     * @param  {string} [lng] - language ('fr' or 'en')
     * @return {string} tmplHtml - HTML code for form input
     */
    fmeService.buildInput = function (inputParams, lng) {
        inputParams = inputParams || {};
        lng = lng || fmeConf.lng;
        var inputHTML = '';
        var tmplHtml = '';
        var templateObj = fmeService._getInputTemplate(inputParams.type);

        var inputTemplate = templateObj.template;
        inputParams.type = templateObj.type;
        if (inputTemplate === undefined) {
            return '';
        }
        // reset description and default value with text for the selected language
        inputParams.description = objGeneral.getLangLabel(inputParams.description, lng);
        inputParams.defaultValue = objGeneral.getLangLabel(inputParams.defaultValue, lng);

        // all not hidden fields are mandatory. Add the "required" label.
        if (inputTemplate !== 'hidden') {
            inputParams.requiredLabel = objSetting.lbl.required[lng];
        }
        if (inputParams.listOptions) {
            jQuery.each(inputParams.listOptions, function (index, value) {
                value.caption = objGeneral.getLangLabel(value.caption, lng);
                value.value = objGeneral.getLangLabel(value.value, lng);
                value.selected = '';
                value.id = inputParams.name + '' + index;
                if (value.value === inputParams.defaultValue) {
                    switch (inputTemplate) {
                    case 'checkBox':
                        value.selected = 'checked=/"checked/"';
                        break;
                    case 'select':
                        value.selected = 'selected=/"selected/"';
                        break;
                    }
                }
            });
        }

        if (inputParams.name === fmeConf.service.extractionZoneParamName) {
            inputTemplate = 'zone';
        }

        //get template
        tmplHtml = objSetting.tmpl[inputTemplate];
        //hidden input 
        if (inputTemplate !== 'checkBox' && inputTemplate !== 'hidden') {
            inputHTML = Mustache.to_html(objSetting.tmpl.wrapper, inputParams);
        }

        //populate the template with name, type, etc
        inputHTML = inputHTML + Mustache.to_html(tmplHtml, inputParams);
        return inputHTML;
    };
    /**
     * @method _getInputTemplate - returns template (HTML code) for the provided data type 
     * @param  {string} [dataType = ''] 
     * @return {object} input
     * @return {string} input.type - type of the input (text/number/password/etc.)
     * @return {string} input.template - Template - HTML code
     */
    fmeService._getInputTemplate = function (dataType) {
        dataType = dataType || '';
        var input = {};
        input.template = undefined;
        input.type = 'text';
        var toTestU = dataType.toUpperCase()
            .trim();
        var toTestL = dataType.toLowerCase()
            .trim();

        //find a template for the data type
        jQuery.each(objSetting.inputTypes, function (key, value) {
            if (jQuery.inArray(toTestU, value) > -1) {
                input.template = key;
            }
        });

        if (jQuery.inArray(toTestU, objSetting.inputNumeric) > -1) {
            input.type = 'number';
        }
        if (toTestL === 'password') {
            input.type = 'password';
        }
        if (toTestL === 'email') {
            input.type = 'email';
        }
        if (toTestL === 'hidden') {
            input.type = 'hidden';
        }
        return input;
    };

    /**
     * @method handleSuccessfulSubmit - sends form data to getToken or sendRequest function
     * @param  {string} formId  - ID of the submitted form
     * @param  {string} [formType='request'] - type of the form ('login' / 'request')
     */
    fmeService.handleSuccessfulSubmit = function (formId, formType) {
        formType = formType || 'request';
        jQuery(theForm + " .has-error").attr('class', 'form-group');
        jQuery('#' + fmeConf.contMessages).html('');
        if (formType === 'login') {
            var username = jQuery('#' + formId + ' #user').val();
            var password = jQuery('#' + formId + ' #password').val();
            var serviceID = jQuery('#' + formId + ' #serviceID').val();

            fmeService.getToken(serviceID, username, password);
        } else {
            fmeService.sendRequest(jQuery(theForm).serialize());
        }
        //return false;
    };

    /**
     * @method sendRequest - converts serialized form input into an URL and sends a request to the server.
     * @param  {string}   userInput - serialized form data
     * @param  {Function} [callback=_displayRequestResult]
     * @param  {string}   token 
     */
    fmeService.sendRequest = function (userInput, callback, token) {
        var url = '';
        var transService = 'transformationService';
        var objURL = {};
        userInput = userInput || '';
        callback = callback || _displayRequestResult;
        token = token || fmeService.token;
        var server = fmeConf.service.serverURL;
        var file = fmeConf.service.serviceName;
        var repository = fmeConf.service.repository;
        var item = '';
        var params = '';

        jQuery.each(fmeConf.setting, function (key, value) {

            if (key === 'transformationService') {
                transService = value;
            } else {
                objURL.params = objURL.params + '&' + key + '=' + value;
            }
        });
        var dirs = [transService, repository];
        params = objURL.params + '&token=' + token + '&' + userInput;
        url = objGeneral.getURLString(server, dirs, file, item, params);
        objGeneral.getAsync(url, callback);
    };

    /**
     * @method _displayRequestResult
     * @param  {object}   json  - JSON object returned from the FME server
     * @param  {string}   lng   - language ('fr' or 'en')
     * @param  {Function} [callback=_displayMessage]
     * @return {object} msgParams
     * @return {string} msgParams.status - success / fail
     * @return {string} msgParams.message - message to display
     */
    var _displayRequestResult = function (json, lng, callback) {
        var msgParams = {};
        lng = lng || fmeConf.lng;
        callback = callback || _displayMessage;
        if (jQuery.type(json) !== 'object') {
            throw new Error('json argument must be a valid JSON');
        }
        if (json.status === 'success') {
            msgParams.status = 'success';
            msgParams.message = objSetting.msg.success[lng] + json.data.serviceResponse.email;
        } else {
            msgParams.status = 'warning';
            msgParams.message = json.data;
        }
        callback(msgParams);
    };

    if (showPrivatFunc) {
        fmeService._localStorageTest = _localStorageTest;
        fmeService._displayMessage = _displayMessage;
        fmeService._displayRequestResult = _displayRequestResult;
        fmeService._cleanInterface = _cleanInterface;
    }

    return fmeService;
}());

/*global describe,it,objSetting,jQuery,wb,expect,assert,objSetting,objConfig,objFME,localStorage,objGeneral,Mustache,objZone,turf,location,xit,localStorageTest */

// detect language based on the "lang" template parameter
var lng = (jQuery("html")
    .attr('lang')
    .indexOf('en') === 0)
    ? 'en'
    : 'fr';
//
var serviceID = '';
var service = {};
var geometryField = 'EXTRACT_GEOMETRY';
var servicesLinks = '';
var linkTmpl = '<a href="{href}" id="{id}" class="list-group-item">{name}</a>';

//link to the configuration file
var src = '../sample/config/fmeCfg.txt';

// initiate configuration object
objConfig.init(src);

//get configuration objects, that are the same for all services
var user = objConfig.getConfigElement('GuestAccount').data;
var setting = objConfig.getConfigElement('defaultSettings').data;
var container = objConfig.getConfigElement('HTMLContainers').data;
var selectTitle = {};
selectTitle.en = 'Select Service';
selectTitle.fr = 'Sélectionnez service';
//get all services from the configuration file. 
var services = objConfig.getConfigElement('fmeServices').data;

//build links for each service in the configuration file
jQuery(document)
    .on("wb-ready.wb", function () {
        'use strict';
        jQuery.each(services, function (key, value) {
            var templ = linkTmpl;
            templ = templ.replace('{id}', value.serviceID);
            templ = templ.replace('{name}', value.serviceTitle[lng]);
            templ = templ.replace('{href}', value.serviceID);
            servicesLinks = servicesLinks + templ;
        });

        
        if (servicesLinks.length > 0) {
            //display the links to the service
            servicesLinks = '<ul class="list-group"><h2>' + selectTitle[lng] + ':</h2>' + servicesLinks + '</ul>';
            jQuery('#FMEServices')
                .append(servicesLinks);
            
            //add on click event to each Service link
            jQuery("#FMEServices a").click(function (event) {
                    serviceID = jQuery(this).attr('id');
                    jQuery("#FMENRCanMessageSection").html('');
                    jQuery("#FMENRCanFormSection").html('');
                    event.preventDefault();
                    //get configuration object for the selected service
                    service = objConfig.getConfigService(serviceID).data;
                    //name of the extraction zone field will be used for synchronization with 
                    geometryField = service.extractionZoneParamName;
                    //initiate service object
                    objFME.init(user, service, setting, container, lng);
                     //get service token
                    objFME.getToken(service.serviceID, user.username, user.password, proceedToken);
                });
        }

         //callback function for getToken function
        function proceedToken(token) {
            'use strict';
            //get service parameters
            if (token !=="")
            {
            objFME.getWebServiceParam(service, token, proceedServiceParam);
        }
        }

        //callback function for getWebServiceParam
        function proceedServiceParam(json) {
            'use strict';
            objFME.buildForm(json);
             jQuery('#FMENRCanFormSection')
                        .attr('tabindex', -1)
                        .focus();
        }   

    });

wb.doc.on("geomap.ready", function () {
    'use strict';
    var id = 'myGeoMap';
    //fix to the map fields layout
    jQuery('#geomap-aoi-myGeoMap .col-md-2')
        .attr('class', 'col-sm-3');
    jQuery('#geomap-aoi-myGeoMap .col-md-4')
        .attr('class', 'col-sm-5 mrgn-tp-md');
    //change EXTRACT_GEOMETRY form value when a new area selected on the map
    var $aoiExtentLonLat = jQuery("#geomap-aoi-extent-lonlat-" + id),
        bbox;
    $aoiExtentLonLat.on("change", function () {
        bbox = '[' + jQuery(this)
            .val() + ']';
        jQuery('#' + geometryField)
            .val(bbox);
    });
});

const util = require("./util");

/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    console.log('@-> Prev Screen:', session.currentScreen());
    if (session.currentScreen() !== 'finduser') {
        /**
            No need to save 'finduser' as a prev screen,
            because we will have some kind of looping
            between the 'New issue' and 'Find user' screens
        */
        vars.session.prevScreen = session.currentScreen();
        models.incident_newissue = {};
    }

    /**
       Remove prevScreen when we came form the screens with a back button,
       to prevent screens looping
    */
    if (['request_newrequest', 'articles_findarticle',
        'articles_viewarticle', 'tickets_viewincident'].includes(session.currentScreen())) {
        delete vars.session.prevScreen;
    }

    if (!vars.session.configItemDisplayNameFieldId || !vars.session.urgencyFieldId) {
        let requestData = await session.rest.cherwellapi.getBusinessObjectTemplate({
            access_token: vars.session.access_token,
            busObId: vars.session.incidentBusObId,
            includeRequired: true,
            includeAll: false
        });
        vars.session.configItemDisplayNameFieldId = util.getFieldId(requestData.body.fields, 'ConfigItemDisplayName');
        vars.session.urgencyFieldId = util.getFieldId(requestData.body.fields, 'Urgency');
    }
    if (!vars.session.urgencyMap) {
        let configItem = await session.rest.cherwellapi.getFieldValues({
            access_token: vars.session.access_token,
            busObId: vars.session.incidentBusObId,
            fieldId: vars.session.urgencyFieldId
        });
        vars.session.urgencyMap = util.createSelectFromFieldValues(configItem.body.values);
    }
    if (!models.incident_newissue.ConfigItemSelect) {
        let configItem = await session.rest.cherwellapi.getFieldValues({
            access_token: vars.session.access_token,
            busObId: vars.session.incidentBusObId,
            fieldId: vars.session.configItemDisplayNameFieldId
        });
        models.incident_newissue.ConfigItemSelect = util.createSelectFromFieldValues(configItem.body.values);
    }

    models.incident_newissue.byUser = models.incident_newissue.byUser || vars.session.user.FullName;
    models.incident_newissue.forUser = vars.session.forUser || models.incident_newissue.forUser || vars.session.user.FullName;
    models.incident_newissue.customerRecId = vars.session.customerRecId || models.incident_newissue.customerRecId || vars.session.user.RecID;
    models.incident_newissue.email = models.incident_newissue.email || vars.session.user.Email;
    models.incident_newissue.phone = models.incident_newissue.phone || vars.session.user.CellPhone || vars.session.user.Phone;
    models.incident_newissue.seat = models.incident_newissue.seat || vars.session.user.Office;
    models.incident_newissue.Description = models.incident_newissue.Description || `I need help with my ${ vars.session.selectedCatagoryLabel || '' } ${ vars.session.selectedCatagorySuffix || '' } ${ vars.session.selectedSubCatagoryLabel || '' }`;
    models.incident_newissue.Description = models.incident_newissue.Description.trim();
    models.incident_newissue.urgency = models.incident_newissue.urgency || JSON.parse(JSON.stringify(vars.session.urgencyMap));
    models.incident_newissue.urgency.selected = models.incident_newissue.urgency.selected || vars.session.urgencyDefaultValue;
    models.incident_newissue.footer = { active: 'newIssue' };
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onunload = async (session, models, vars) => {
    delete vars.session.serviceClassification;
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    if (vars.session.selectedSubCatagoryLabel) {
        await session.screen('incident_subcategories');
    } else {
        if (vars.session.selectedCatagoryLabel) {
            await session.screen('incident_categories');
        } else {
            await session.screen(vars.session.prevScreen || 'home');
        }
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.home = async (session, models, vars) => {
    await session.screen('home');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.submit = async (session, models, vars) => {
    let requestData = await session.rest.cherwellapi.getBusinessObjectTemplate({
        access_token: vars.session.access_token,
        busObId: vars.session.incidentBusObId,
        includeRequired: true,
        includeAll: true
    });

    let formattedType = models.incident_subcategories.category || 'Other';
    let formattedLocation = models.incident_newissue.seat ? `, LOCATION/SEAT: ${models.incident_newissue.seat}` : '';
    let formattedDescription = models.incident_newissue.Description ? `${models.incident_newissue.Description}, ` : '';
    let description = `${formattedDescription} TYPE: ${formattedType}${formattedLocation}`;

    if (!vars.session.serviceClassification) {
        vars.session.serviceClassification = vars.session.defaultServiceClassification;
    }

    let updateFields = {
        'Description': description,
        'CustomerRecID': models.incident_newissue.customerRecId,
        'Priority': models.incident_newissue.urgency.selected,
        'Source': 'Portal',
        'CallSource': 'Portal',
        'CustomerDisplayName': models.incident_newissue.forUser,
        'Service': vars.session.serviceClassification[0],
        'Category': vars.session.serviceClassification[1],
        'Subcategory': vars.session.serviceClassification[2],
        'SmartClassifySearchString': vars.session.serviceClassification[2]
    };

    if (models.incident_newissue.urgency.selected) {
        updateFields['Urgency'] = models.incident_newissue.urgency.selected;
    }
    if (models.incident_newissue.urgency.selected === '1') {
        updateFields['ConfigItemDisplayName'] = models.incident_newissue.ConfigItemSelect.selected;
    }

    let stringifiedFields = JSON.stringify(util.createUpdateFields(requestData.body.fields, updateFields));
    try {
        let result = await session.rest.cherwellapi.saveBusinessObject({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.incidentBusObId,
            fields: stringifiedFields
        });
        if (result.body.errorMessage) {
            models.incident_newissue.result.error = result.body.errorMessage;
        } else {
            if (result.body.busObPublicId) {
                models.incident_newissue.result.busObPublicId = result.body.busObPublicId;
                if (models.incident_newissue.photo) {
                    let data = await session.rest.cherwellapi.getIncidentBusObRecId({
                        busObPublicId: models.incident_newissue.result.busObPublicId,
                        access_token: vars.session.access_token,
                        incidentBusObId: vars.session.incidentBusObId
                    });
                    let incidentBusObRecId = data.body.busObRecId;
                    let offset = 0;
                    let file = models.incident_newissue.photo;
                    let filename = models.incident_newissue.filename;
                    let totalsize = models.incident_newissue.size;
                    console.log('Attach new file:')
                    await session.rest.cherwellapi.attachFile({
                        access_token: vars.session.access_token,
                        file: file,
                        filename: filename,
                        incidentBusObId: vars.session.incidentBusObId,
                        offset: offset,
                        totalsize: totalsize,
                        busobrecid: incidentBusObRecId
                    });
                }
            }
        }
    } catch (e) {
        try {
            let error = JSON.parse(e.message);
            models.incident_newissue.result.error = error.errorMessage;
        } catch (e) {
        }
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.search = async (session, models, vars) => {
    models.finduser.searchKey = models.incident_newissue.forUser;
    await session.screen('finduser');
};

/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.myTickets'] = async (session, models, vars) => {
    await session.screen('tickets_mytickets');
};/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.home'] = async (session, models, vars) => {
    await session.screen('home');
};

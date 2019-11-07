/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports.onload = async (session, models, vars) => {
    models.request_newrequest.byUser = models.request_newrequest.byUser || vars.session.byUser || 'Evan Employee';
    models.request_newrequest.forUser = models.request_newrequest.forUser || vars.session.forUser || 'Evan Employee';
    models.request_newrequest.email = 'evan.employee@acme.com';
    models.request_newrequest.phone = '6523455679';
    models.request_newrequest.shortDescription = models.request_newrequest.shortDescription || `I would like to order ${ vars.session.requestService }, ${ vars.session.requestCategory }, ${ vars.session.requestSubCategory }`;
    models.request_newrequest.urgency = models.request_newrequest.urgency || vars.session.urgencyMap;
    models.request_newrequest.urgency.selected = models.request_newrequest.urgency.selected || 2;
    models.request_newrequest.service = models.request_newrequest.service || vars.session.requestService;
    models.request_newrequest.category = models.request_newrequest.category || vars.session.requestCategory;
    models.request_newrequest.quantity = models.request_newrequest.quantity || 1;
    if (!vars.session.configItemDisplayNameFieldId) {
        let requestData = await session.rest.cherwellapi.getBusinessObjectTemplate({
            access_token: vars.session.access_token,
            busObId: vars.session.incidentBusObId,
            includeRequired: true,
            includeAll: false
        });
        let data = requestData.body;
        for (var i = 0; i < data.fields.length; i++) {
            if (data.fields[i].name === 'ConfigItemDisplayName') {
                vars.session.configItemDisplayNameFieldId = data.fields[i].fieldId;
                break;
            }
        }
    }
    if (!models.request_newrequest.ConfigItemSelect) {
        let configItem = await session.rest.cherwellapi.getConfigItemDisplayName({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.incidentBusObId,
            configItemDisplayNameFieldId: vars.session.configItemDisplayNameFieldId
        });
        let list = configItem.body.values;
        let options = [];
        list.map(item => {
            options.push({"label": item, "value": item})
        });
        models.request_newrequest.ConfigItemSelect = {"options": options, "selected": ""};
    }
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
    let template = requestData.body;
    for (var i = 0; i < template.fields.length; i++) {
        if (template.fields[i].name === 'Description') {
            let locationString = models.request_newrequest.seat ? `, LOCATION/SEAT: ${ models.request_newrequest.seat }` : '';
            let descriptionString = models.request_newrequest.description ? `, ${ models.request_newrequest.description }` : '';
            template.fields[i].value = `TYPE: ${ models.request_newrequest.service }, ${ models.request_newrequest.category }, ${ vars.session.requestSubCategory }${locationString}${descriptionString}`;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'ShortDescription') {
            template.fields[i].value = models.request_newrequest.shortDescription;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'Service') {
            template.fields[i].value = models.request_newrequest.service;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'Category') {
            template.fields[i].value = models.request_newrequest.category;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'Subcategory') {
            template.fields[i].value = vars.session.requestSubCategory;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'CustomerRecID') {
            template.fields[i].value = vars.session.customerRecId || '9451f6c8b5609372c4e86b440db32353b488fb4206';
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'Priority') {
            template.fields[i].value = models.request_newrequest.urgency.selected;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'Urgency' && models.request_newrequest.urgency.selected) {
            template.fields[i].value = models.request_newrequest.urgency.selected;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'GBP_generic_Quantity' && models.request_newrequest.quantity) {
            template.fields[i].value = models.request_newrequest.quantity;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'Source') {
            template.fields[i].value = 'Portal';
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'OwnedByTeam') {
            template.fields[i].value = 'Service Desk';
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'ConfigItemDisplayName' && models.request_newrequest.urgency.selected === '1') {
            template.fields[i].value = models.request_newrequest.ConfigItemSelect.selected;
            template.fields[i].dirty = true;
        }
    }
    let fields = JSON.stringify(template.fields);
    try {
        let result = await session.rest.cherwellapi.saveBusinessObject({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.incidentBusObId,
            fields: fields
        });
        if (result.body.errorMessage) {
            models.request_newrequest.result.error = result.body.errorMessage;
        } else if (result.body.busObPublicId) {
            models.request_newrequest.result.busObPublicId = result.body.busObPublicId;
            if (models.request_newrequest.photo) {
                let data = await session.rest.cherwellapi.getIncidentBusObRecId({
                    busObPublicId: models.request_newrequest.result.busObPublicId,
                    access_token: vars.session.access_token,
                    incidentBusObId: vars.session.incidentBusObId
                });
                let incidentBusObRecId = data.body.busObRecId;
                let offset = 0;
                let filename = models.request_newrequest.filename;
                let file = models.request_newrequest.photo;
                let totalsize = models.request_newrequest.size;
                let attachResult = await session.rest.cherwellapi.attachFile({
                    access_token: vars.session.access_token,
                    file: file,
                    filename: filename,
                    incidentBusObId: vars.session.incidentBusObId,
                    offset: offset,
                    totalsize: totalsize,
                    busobrecid: incidentBusObRecId
                });
                console.log(attachResult);
                console.log("incidentBusObRecId: " + incidentBusObRecId)
                let attachmentsResponse = await session.rest.cherwellapi.getAttachments({
                    incidentBusObId: vars.session.incidentBusObId,
                    busObPublicId: models.request_newrequest.result.busObPublicId,
                    access_token: vars.session.access_token
                });
                console.log(attachmentsResponse.body)
            }
        }
    } catch (e) {
        try {
            let error = JSON.parse(e.message);
            models.request_newrequest.result.error = error.errorMessage;
        } catch (e) {
        }
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports.back = async (session, models, vars) => {
    models.request_newrequest = {};
    await session.screen('request_subservices');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports.cancel = async (session, models, vars) => {
    models.request_newrequest = {};
    await session.screen('home');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports.search = async (session, models, vars) => {
    vars.session.newrequest = true;
    await session.screen('finduser');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports.home = async (session, models, vars) => {
    models.request_newrequest = {};
    await session.screen('home');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.myTickets'] = async (session, models, vars) => {
    models.request_newrequest = {};
    await session.screen('tickets_mytickets');
};/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.home'] = async (session, models, vars) => {
    models.request_newrequest = {};
    await session.screen('home');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.newIssue'] = async (session, models, vars) => {
    models.request_newrequest = {};
    await session.screen('incident_newissue');
};

/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports.clearData = async (session, models, vars) => {
    vars.session.urgencyMap.selected = '';
    vars.session.forUser = null;
    vars.session.customerRecId = null;
    models.request_newrequest.footer = { active: '' };
};

const fs = require('fs');
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports.onload = async (session, models, vars) => {
    models.request_newrequest = {};
    models.request_newrequest.byUser = vars.session.byUser || 'Evan Employee';
    models.request_newrequest.forUser = vars.session.forUser || 'Evan Employee';
    models.request_newrequest.email = 'evan.employee@acme.com';
    models.request_newrequest.phone = '6523455679';
    models.request_newrequest.shortDescription = `I need help`;
    models.request_newrequest.shortDescription = `I would like to order ${ vars.session.requestService }, ${ vars.session.requestCategory }, ${ vars.session.requestSubCategory }`;
    models.request_newrequest.urgency = vars.session.urgencyMap;
    models.request_newrequest.service = vars.session.requestService;
    models.request_newrequest.category = vars.session.requestCategory;
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
            template.fields[i].value = `TYPE: ${ models.request_newrequest.service }, ${ models.request_newrequest.category }, ${ vars.session.requestSubCategory }, LOCATION/SEAT: ${ models.request_newrequest.seat }, ${ models.request_newrequest.description }`;
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
                let filename = 'filename.png';
                let file = models.request_newrequest.photo;
                let fileData = fs.statSync(file);
                let totalsize = fileData.size;
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
        console.log("ERROR:", e);
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports.back = async (session, models, vars) => {
    vars.session.customerRecId = null;
    await session.screen('request_subservices');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports.cancel = async (session, models, vars) => {
    vars.session.customerRecId = null;
    vars.session.forUser = null;
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
    vars.session.customerRecId = null;
    await session.screen('home');
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
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.newIssue'] = async (session, models, vars) => {
    vars.session.selectedCatagoryLabel = '';
    vars.session.selectedCatagorySuffix = '';
    vars.session.selectedSubCatagoryLabel = '';
    await session.screen('incident_newissue');
};

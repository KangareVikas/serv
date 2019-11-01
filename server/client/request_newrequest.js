/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    if (!vars.session.problemBusObId) {
        let data = await session.rest.cherwellapi.getBusinessObjectSummaryRequest({ access_token: vars.session.access_token });
        vars.session.problemBusObId = data.body[0].busObId;
    }
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
        includeRequired: true,
        includeAll: true,
        incidentBusObId: vars.session.incidentBusObId
    });
    console.log(requestData.body);
    let template = requestData.body;
    for (var i = 0; i < template.fields.length; i++) {
        if (template.fields[i].name === 'Description') {
            template.fields[i].value = `TYPE: ${ models.request_newrequest.service }, ${ models.request_newrequest.category }, ${ models.request_newrequest.subCategory }, LOCATION/SEAT: ${ models.incident_newissue.seat }, ${ models.incident_newissue.description }`;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'ShortDescription') {
            template.fields[i].value = models.request_newrequest.shortDescription;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'Priority') {
            template.fields[i].value = models.request_newrequest.urgency.selected;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'Source') {
            template.fields[i].value = 'Unresolved Incident';
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
        if (template.fields[i].name === 'AffectedCI') {
            template.fields[i].value = 'ASM0002204 Iris 5875';
            template.fields[i].dirty = true;
        }
    }
    let fields = JSON.stringify(template.fields);
    try {
        let result = await session.rest.cherwellapi.saveBusinessObject({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.problemBusObId,
            fields: fields,
            persist: true
        });
        if (result.body.errorMessage) {
            models.request_newrequest.result = { error: result.body.errorMessage };
        } else {
            if (result.body.busObPublicId) {
                models.request_newrequest.result = { busObPublicId: result.body.busObPublicId };
            }
        }
    } catch (e) {
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    await session.screen('request_subservices');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.cancel = async (session, models, vars) => {
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
    await session.screen('home');
};
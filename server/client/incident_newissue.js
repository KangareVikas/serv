/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    models.incident_newissue = {};
    vars.session.selectionItemsMap.selected = '';
    vars.session.urgencyMap.selected = '';
    models.incident_newissue.byUser = vars.session.byUser || 'Evan Employee';
    models.incident_newissue.forUser = vars.session.forUser || 'Evan Employee';
    models.incident_newissue.email = 'evan.employee@acme.com';
    models.incident_newissue.phone = '6523455679';
    models.incident_newissue.shortDescription = `I need help with my ${ vars.session.selectedCatagoryLabel } ${ vars.session.selectedCatagorySuffix } ${ vars.session.selectedSubCatagoryLabel }`;
    models.incident_newissue.shortDescription = models.incident_newissue.shortDescription.trim();
    models.incident_newissue.urgency = vars.session.urgencyMap;
    if (vars.session.selectedCatagoryLabel) {
        vars.session.selectionItemsMap.selected = vars.session.selectedCatagoryLabel;
    }
    models.incident_newissue.urgency.selected = 2;
    models.incident_newissue.type = vars.session.selectionItemsMap;
    models.incident_newissue.footer = { active: 'newIssue' };
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
    let configItem = await session.rest.cherwellapi.getConfigItemDisplayName({
        access_token: vars.session.access_token,
        incidentBusObId: vars.session.incidentBusObId,
        configItemDisplayNameFieldId: vars.session.configItemDisplayNameFieldId
    });
    let list = configItem.body.values;
    let options = [];
    list.map(item => { options.push({ "label": item, "value": item }) });
    models.incident_newissue.ConfigItemSelect = { "options": options, "selected": "" };
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.cancel = async (session, models, vars) => {
    vars.session.selectedCatagoryLabel = null;
    vars.session.selectedSubCatagoryLabel = null;
    vars.session.forUser = null;
    vars.session.customerRecId = null;
    await session.screen('home');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    vars.session.forUser = null;
    vars.session.customerRecId = null;
    if (vars.session.selectedSubCatagoryLabel) {
        await session.screen('incident_subcategories');
    } else {
        if (vars.session.selectedCatagoryLabel) {
            await session.screen('incident_categories');
        } else {
            await session.screen('home');
        }
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.home = async (session, models, vars) => {
    vars.session.selectedCatagoryLabel = null;
    vars.session.selectedSubCatagoryLabel = null;
    vars.session.forUser = null;
    vars.session.customerRecId = null;
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
    console.log(requestData.body);
    let template = requestData.body;
    for (var i = 0; i < template.fields.length; i++) {
        if (template.fields[i].name === 'Description') {
            let type = models.incident_newissue.type.selected || 'Other';
            let locationString = models.incident_newissue.seat ? `, LOCATION/SEAT: ${ models.incident_newissue.seat }` : '';
            let descriptionString = models.incident_newissue.description ? `, ${ models.incident_newissue.description }` : '';
            template.fields[i].value = `TYPE: ${ type }${locationString}${descriptionString}`;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'ShortDescription') {
            template.fields[i].value = models.incident_newissue.shortDescription;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'CustomerRecID') {
            template.fields[i].value = vars.session.customerRecId || '9451f6c8b5609372c4e86b440db32353b488fb4206';
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'Priority') {
            template.fields[i].value = models.incident_newissue.urgency.selected;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'Urgency' && models.incident_newissue.urgency.selected) {
            template.fields[i].value = models.incident_newissue.urgency.selected;
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'Source') {
            template.fields[i].value = 'Portal';
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'Service') {
            template.fields[i].value = 'Access Management';
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'Category') {
            template.fields[i].value = 'Identity and Access Management';
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'Subcategory') {
            template.fields[i].value = 'Submit Incident';
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'OwnedByTeam') {
            template.fields[i].value = 'Service Desk';
            template.fields[i].dirty = true;
        }
        if (template.fields[i].name === 'ConfigItemDisplayName' && models.incident_newissue.urgency.selected === '1') {
            template.fields[i].value = models.incident_newissue.ConfigItemSelect.selected;
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
            models.incident_newissue.result.error = result.body.errorMessage;
        } else {
            if (result.body.busObPublicId) {
                console.log('busObPublicId: ' + result.body.busObPublicId);
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
                    console.log('incidentBusObRecId: ' + incidentBusObRecId);
                    let attachmentsResponse = await session.rest.cherwellapi.getAttachments({
                        incidentBusObId: vars.session.incidentBusObId,
                        busObPublicId: models.incident_newissue.result.busObPublicId,
                        access_token: vars.session.access_token
                    });
                    console.log(attachmentsResponse.body);
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
    await session.screen('finduser');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onunload = async (session, models, vars) => {
    models.incident_newissue.footer = { active: '' };
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

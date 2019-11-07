/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    if (session.currentScreen() !== 'finduser') {
        vars.session.prevScreen = session.currentScreen();
        models.incident_newissue = {};
    }
    models.incident_newissue.byUser = models.incident_newissue.byUser || vars.session.byUser || vars.config.rest.cherwellapi.custom.byUser;
    models.incident_newissue.forUser = models.incident_newissue.forUser || vars.session.forUser || vars.config.rest.cherwellapi.custom.forUser;
    models.incident_newissue.email = vars.config.rest.cherwellapi.custom.email;
    models.incident_newissue.phone = vars.config.rest.cherwellapi.custom.phone;
    models.incident_newissue.shortDescription = models.incident_newissue.shortDescription || `I need help with my ${ vars.session.selectedCatagoryLabel } ${ vars.session.selectedCatagorySuffix } ${ vars.session.selectedSubCatagoryLabel }`;
    models.incident_newissue.shortDescription = models.incident_newissue.shortDescription.trim();
    models.incident_newissue.urgency = models.incident_newissue.urgency || JSON.parse(JSON.stringify(vars.session.urgencyMap));
    models.incident_newissue.urgency.selected = models.incident_newissue.urgency.selected || 2;
    models.incident_newissue.type = models.incident_newissue.type || JSON.parse(JSON.stringify(vars.session.selectionItemsMap));
    models.incident_newissue.type.selected = models.incident_newissue.type.selected || vars.session.selectedCatagoryLabel;
    models.incident_newissue.typeDisabled = typeof models.incident_newissue.typeDisabled === "boolean" ?
        models.incident_newissue.typeDisabled : !!models.incident_newissue.type.selected;
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
    if (!models.incident_newissue.ConfigItemSelect) {
        let configItem = await session.rest.cherwellapi.getConfigItemDisplayName({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.incidentBusObId,
            configItemDisplayNameFieldId: vars.session.configItemDisplayNameFieldId
        });
        let list = configItem.body.values;
        let options = [];
        list.map(item => { options.push({ "label": item, "value": item }) });
        models.incident_newissue.ConfigItemSelect = { "options": options, "selected": "" };
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.cancel = async (session, models, vars) => {
    await session.screen('home');
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
            template.fields[i].value = vars.session.customerRecId || vars.config.rest.cherwellapi.custom.customerRecId;
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
                    let attachmentsResponse = await session.rest.cherwellapi.getAttachments({
                        incidentBusObId: vars.session.incidentBusObId,
                        busObPublicId: models.incident_newissue.result.busObPublicId,
                        access_token: vars.session.access_token
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
    await session.screen('finduser');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.clearData = async (session, models, vars) => {
    vars.session.selectedCatagoryLabel = null;
    vars.session.selectedCatagorySuffix = null;
    vars.session.selectedSubCatagoryLabel = null;
    vars.session.forUser = null;
    vars.session.customerRecId = null;
    vars.session.prevScreen = null;
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

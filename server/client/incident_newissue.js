/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    models.incident_newissue = {};
    vars.session.selectionItemsMap.selected = '';
    vars.session.urgencyMap.selected = '';
    models.incident_newissue.byUser = 'Evan Employee';
    models.incident_newissue.forUser = 'Evan Employee';
    models.incident_newissue.email = 'evan.employee@acme.com';
    models.incident_newissue.phone = '6523455679';
    models.incident_newissue.shortDescription = `I need help with my ${ vars.session.selectedCatagoryLabel } ${ vars.session.selectedCatagorySuffix } ${ vars.session.selectedSubCatagoryLabel }`;
    models.incident_newissue.urgency = vars.session.urgencyMap;
    if (vars.session.selectedCatagoryLabel) {
        vars.session.selectionItemsMap.selected = vars.session.selectedCatagoryLabel;
    }
    models.incident_newissue.type = vars.session.selectionItemsMap;
};

/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.cancel = async (session, models, vars) => {
    vars.session.selectedCatagoryLabel = null;
    vars.session.selectedSubCatagoryLabel = null;
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
            await session.screen('home');
        }
    }
}

/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.submit = async (session, models, vars) => {
    let requestData = await session.rest.cherwellapi.GetBusinessObjectTemplate({
        access_token: vars.session.access_token,
        busObId: vars.session.incidentBusObId,
        includeRequired: true,
        includeAll: false
    });
    console.log(requestData.body);
    let template = requestData.body;
    for (var i = 0; i < template.fields.length; i++) {
        if (template.fields[i].name === 'Description') {
            var type = models.incident_newissue.type.selected || "Other"
            template.fields[i].value = `TYPE: ${models.incident_newissue.type.selected}, LOCATION/SEAT: ${models.incident_newissue.seat}`;
            template.fields[i].dirty = true;
            continue;
        }
        if (template.fields[i].name === 'ShortDescription') {
            template.fields[i].value = models.incident_newissue.shortDescription;
            template.fields[i].dirty = true;
            continue;
        }
        if (template.fields[i].name === 'CustomerRecID') {
            template.fields[i].value = '9451f6c8b5609372c4e86b440db32353b488fb4206';
            template.fields[i].dirty = true;
            continue;
        }
        if (template.fields[i].name === 'Priority') {
            template.fields[i].value = models.incident_newissue.urgency.selected;
            template.fields[i].dirty = true;
            continue;
        }
        if (template.fields[i].name === 'Source') {
            template.fields[i].value = 'Portal';
            template.fields[i].dirty = true;
            continue;
        }
        if (template.fields[i].name === 'Service') {
            template.fields[i].value = 'Access Management';
            template.fields[i].dirty = true;
            continue;
        }
        if (template.fields[i].name === 'Category') {
            template.fields[i].value = 'Identity and Access Management';
            template.fields[i].dirty = true;
            continue;
        }
        if (template.fields[i].name === 'Subcategory') {
            template.fields[i].value = 'Submit Incident';
            template.fields[i].dirty = true;
            continue;
        }
        if (template.fields[i].name === 'OwnedByTeam') {
            template.fields[i].value = 'Service Desk';
            template.fields[i].dirty = true;
            continue;
        }
    }
    let fields = JSON.stringify(template.fields);
    try {
        var result = await session.rest.cherwellapi.saveBusinessObject({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.incidentBusObId,
            fields: fields
        });
        console.log(result);
        if (result.body.errorMessage) {
            models.incident_newissue.result.error = result.body.errorMessage;
        } else if (result.body.busObPublicId) {
            models.incident_newissue.result.busObPublicId = result.body.busObPublicId;
        }
    } catch (e) {
        models.incident_newissue.result.error = e.message;
        console.log(e);
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

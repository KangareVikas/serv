/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    models.incident_newissue.byUser = 'Evan Employee';
    models.incident_newissue.forUser = 'Evan Employee';
    models.incident_newissue.email = 'evan.employee@acme.com';
    models.incident_newissue.phone = '6523455679';
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
exports.submit = async (session, models, vars) => {
    let requestData = await session.rest.cherwellapi.GetBusinessObjectTemplate({
        access_token: vars.session.access_token,
        busObId: vars.session.incidentBusObId,
        includeRequired: true,
        includeAll: false
    });
    console.log(requestData.body);
    let fields = requestData.body.fields;
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].name === 'Description') {
            fields[i].value = 'Filing incident using REST API';
            fields[i].dirty = true;
            continue;
        }
        if (fields[i].name === 'ShortDescription') {
            fields[i].value = models.incident_newissue.type;
            fields[i].dirty = true;
            continue;
        }
        if (fields[i].name === 'CustomerRecID') {
            fields[i].value = '9451f6c8b5609372c4e86b440db32353b488fb4206';
            fields[i].dirty = true;
            continue;
        }
        if (fields[i].name === 'Priority') {
            fields[i].value = models.incident_newissue.urgency;
            fields[i].dirty = true;
            continue;
        }
        if (fields[i].name === 'Source') {
            fields[i].value = 'Portal';
            fields[i].dirty = true;
            continue;
        }
        if (fields[i].name === 'Service') {
            fields[i].value = 'Access Management';
            fields[i].dirty = true;
            continue;
        }
        if (fields[i].name === 'Category') {
            fields[i].value = 'Identity and Access Management';
            fields[i].dirty = true;
            continue;
        }
        if (fields[i].name === 'Subcategory') {
            fields[i].value = 'Submit Incident';
            fields[i].dirty = true;
            continue;
        }
        if (fields[i].name === 'OwnedByTeam') {
            fields[i].value = 'Service Desk';
            fields[i].dirty = true;
            continue;
        }
    }
    var result = await session.rest.cherwellapi.SaveBusinessObject({
        access_token: vars.session.access_token,
        incidentBusObId: vars.session.incidentBusObId,
        fields: fields
    });
    console.log(result);
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.search = async (session, models, vars) => {
};
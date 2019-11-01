/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    if (!vars.session.serviceFieldId || !vars.session.categoryFieldId || !vars.session.subcategoryFieldId) {
        let requestData = await session.rest.cherwellapi.GetBusinessObjectTemplate({
            access_token: vars.session.access_token,
            busObId: vars.session.incidentBusObId,
            includeRequired: true,
            includeAll: false
        });
        let data = requestData.body;
        for (var i = 0; i < data.fields.length; i++) {
            if (data.fields[i].name === 'Service') {
                vars.session.serviceFieldId = data.fields[i].fieldId;
                continue;
            }
            if (data.fields[i].name === 'Category') {
                vars.session.categoryFieldId = data.fields[i].fieldId;
                continue;
            }
            if (data.fields[i].name === 'Subcategory') {
                vars.session.subcategoryFieldId = data.fields[i].fieldId;
            }
        }
    }
    let validValues = await session.rest.cherwellapi.getValidValues({
        access_token: vars.session.access_token,
        serviceFieldId: vars.session.serviceFieldId,
        incidentBusObId: vars.session.incidentBusObId
    });
    let list = validValues.body.values;
    let categories = [];
    models.request_services.services = categories;
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    await session.screen('home');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.selectService = async (session, models, vars) => {
};
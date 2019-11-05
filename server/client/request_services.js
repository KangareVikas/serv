/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    models.request_subservices = {};
    if (!vars.session.serviceFieldId || !vars.session.categoryFieldId || !vars.session.subcategoryFieldId) {
        let requestData = await session.rest.cherwellapi.getBusinessObjectTemplate({
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
    list.map(item => { categories.push({ "title": item }) });
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
    let subCategoryTitle = vars.params.title;
    models.request_subservices.service = subCategoryTitle;
    models.request_subservices.selectedServices = [{ title: subCategoryTitle}];
    let data = await session.rest.cherwellapi.getRequestCategoryValues({
        access_token: vars.session.access_token,
        incidentBusObId: vars.session.incidentBusObId,
        categoryFieldId: vars.session.categoryFieldId,
        serviceFieldId: vars.session.serviceFieldId,
        subCategoryTitle: subCategoryTitle
    });
    let list = data.body.values;
    let subCategories = [];
    list.map(item => { subCategories.push({ "title": item }) });
    models.request_subservices.subservices = subCategories;
    await session.screen('request_subservices');
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

/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    models.request_subservices = {};
    let validValues = await session.rest.cherwellapi.getValidValues({
        access_token: vars.session.access_token,
        serviceFieldId: vars.session.boDefs.Incident.fields.names.Service,
        incidentBusObId: vars.session.boDefs.Incident.busObId
    });
    models.request_services.services = [];
    for (let value of validValues.body.values) {
        let serviceEntry = { 'title': value };
        if (vars.session.serviceToIconAndBgMapping[value]) {
            Object.assign(serviceEntry, vars.session.serviceToIconAndBgMapping[value]);
        } else {
            Object.assign(serviceEntry, vars.session.unknownServiceIconAndBg);
        }
        models.request_services.services.push(serviceEntry);
    }
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
exports.search = async (session, models, vars) => {
    await session.screen('articles_findarticle');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['services[].select'] = async (session, models, vars) => {
    let subCategoryTitle = vars.item.title;
    models.request_subservices.service = subCategoryTitle;
    models.request_subservices.selectedServices = [{ title: subCategoryTitle}];
    let data = await session.rest.cherwellapi.getRequestCategoryValues({
        access_token: vars.session.access_token,
        incidentBusObId: vars.session.boDefs.Incident.busObId,
        categoryFieldId: vars.session.boDefs.Incident.fields.names.Category,
        serviceFieldId: vars.session.boDefs.Incident.fields.names.Service,
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

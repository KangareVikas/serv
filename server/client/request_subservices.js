/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    await session.screen('request_services');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['subservices[].select'] = async (session, models, vars) => {
    let serviceTitle = models.request_subservices.service;
    let categoryTitle = vars.item.title;
    models.request_subservices.selectedServices.push({ title: categoryTitle});
    let validValues = await session.rest.cherwellapi.getRequestSubCategoryValues({
        incidentBusObId: vars.session.incidentBusObId,
        subcategoryFieldId: vars.session.subcategoryFieldId,
        serviceFieldId: vars.session.serviceFieldId,
        access_token: vars.session.access_token,
        serviceTitle: serviceTitle,
        categoryFieldId: vars.session.categoryFieldId,
        categoryTitle: categoryTitle
    });
    let list = validValues.body.values;
    let subservices = [];
    list.map(item => { subservices.push({ "title": item }) });
    models.request_subservices.subservices = subservices;
};

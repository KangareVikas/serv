/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    vars.session.requestCategory = '';
    vars.session.requestService = '';
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
exports.search = async (session, models, vars) => {
    await session.screen('articles_findarticle');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['subservices[].select'] = async (session, models, vars) => {
    let serviceTitle = models.request_subservices.service;
    let categoryTitle = vars.item.title;
    if (!models.request_subservices.category) {
        models.request_subservices.category = categoryTitle;
        models.request_subservices.selectedServices.push({ title: categoryTitle });
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
    } else {
        models.request_subservices.subCategory = categoryTitle;
        vars.session.requestService = serviceTitle;
        vars.session.requestCategory = models.request_subservices.category;
        vars.session.requestSubCategory = categoryTitle;
        await session.screen('request_newrequest');
    }
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
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.previousService = async (session, models, vars) => {
    let subCategoryTitle = vars.params.title;
    models.request_subservices.service = subCategoryTitle;
    models.request_subservices.selectedServices = [{ title: subCategoryTitle }];
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
    delete models.request_subservices.category;
    // await session.screen('request_subservices');
};

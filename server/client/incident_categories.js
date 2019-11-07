/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    models.incident_categories.footer = { active: '' };
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.selectCategory = async (session, models, vars) => {
    if (vars.params.title === 'other') {
        vars.session.selectedCatagoryLabel = '';
        vars.session.selectedCatagorySuffix = '';
        vars.session.selectedSubCatagoryLabel = '';
        await session.screen('incident_newissue');
    } else {
        let list = vars.session.selectionItems[vars.params.title].list;
        let subcategories = [];
        list.map(item => { subcategories.push({ "title": item }) });
        models.incident_subcategories.category = vars.session.selectionItems[vars.params.title].label;
        models.incident_subcategories.suffix = vars.session.selectionItems[vars.params.title].suffix;
        models.incident_subcategories.subcategories = subcategories;
        vars.session.selectedCatagoryLabel = vars.session.selectionItems[vars.params.title].label;
        vars.session.selectedCatagorySuffix = vars.session.selectionItems[vars.params.title].suffix;
        await session.screen('incident_subcategories');
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.search = async (session, models, vars) => {
    vars.session.selectedCatagoryLabel = null;
    await session.screen('articles_findarticle');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    vars.session.selectedCatagoryLabel = null;
    await session.screen('home');
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

/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    models.incident_categories.footer = { active: '' };
    vars.session.serviceClassification = vars.session.defaultServiceClassification;
    models.incident_categories.categories = [];
    for (let categoryKey of Object.keys(vars.session.newIssueCategories)) {
        models.incident_categories.categories.push({
            value: categoryKey,
            label: vars.session.newIssueCategories[categoryKey].label,
            icon: vars.session.newIssueCategories[categoryKey].icon,
            bg: vars.session.newIssueCategories[categoryKey].bg
        });
    }
    
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['categories[].select'] = async (session, models, vars) => {
    if (vars.session.newIssueCategories[vars.item.value].list) {
        models.incident_subcategories.category = vars.session.newIssueCategories[vars.item.value].label;
        models.incident_subcategories.suffix = vars.session.newIssueCategories[vars.item.value].suffix;
        models.incident_subcategories.subcategories = vars.session.newIssueCategories[vars.item.value].list;
        vars.session.selectedCatagoryLabel = vars.session.newIssueCategories[vars.item.value].label;
        vars.session.selectedCatagorySuffix = vars.session.newIssueCategories[vars.item.value].suffix;
        if (vars.session.newIssueCategories[vars.item.value].serviceClassification) {
            vars.session.serviceClassification = vars.session.newIssueCategories[vars.item.value].serviceClassification;
        }
        await session.screen('incident_subcategories');
    } else {
        vars.session.selectedCatagoryLabel = '';
        vars.session.selectedCatagorySuffix = '';
        vars.session.selectedSubCatagoryLabel = '';
        vars.session.serviceClassification = vars.session.defaultServiceClassification;
        await session.screen('incident_newissue');
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

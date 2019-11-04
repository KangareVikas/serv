/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['subcategories[].select'] = async (session, models, vars) => {
    if (vars.item.title === 'other') {
        vars.session.selectedSubCatagoryLabel = '';    
    } else {
        vars.session.selectedSubCatagoryLabel = vars.item.title;
    }
    await session.screen('incident_newissue');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    vars.session.selectedSubCatagoryLabel = null;
    await session.screen('incident_categories');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.search = async (session, models, vars) => {
    vars.session.selectedSubCatagoryLabel = null;
};

/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['subcategories[].select'] = async (session, models, vars) => {
    vars.session.selectedSubCatagoryLabel = vars.item.title;
    models.incident_newissue.shortDescription = `I need help with my ${ vars.session.selectedCatagoryLabel } ${ vars.session.selectedCatagorySuffix } ${ vars.session.selectedSubCatagoryLabel }`;
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
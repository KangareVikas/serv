/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.myTickets = async (session, models, vars) => {
    await session.screen('tickets_mytickets');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.newIssue = async (session, models, vars) => {
    vars.session.selectedCatagoryLabel = '';
    vars.session.selectedCatagorySuffix = '';
    vars.session.selectedSubCatagoryLabel = '';
    vars.session.prevScreen = 'home';
    await session.screen('incident_newissue');
};
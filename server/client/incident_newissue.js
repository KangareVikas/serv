/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    models.incident_newissue.byUser = 'Evan Employee';
    models.incident_newissue.forUser = 'Evan Employee';
    models.incident_newissue.email = 'evan.employee@acme.com';
    models.incident_newissue.phone = '6523455679';
    models.incident_newissue.urgency = vars.session.urgencyMap;
    if (vars.session.selectedCatagoryLabel) {
        vars.session.selectionItemsMap = { selected: vars.session.selectedCatagoryLabel };
    }
    models.incident_newissue.type = vars.session.selectionItemsMap;
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.cancel = async (session, models, vars) => {
    vars.session.selectedCatagoryLabel = null;
    vars.session.selectedSubCatagoryLabel = null;
    await session.screen('home');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.submit = async (session, models, vars) => {
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.search = async (session, models, vars) => {
};
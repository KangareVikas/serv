/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    if (vars.session.selectedSubCatagoryLabel) {
        await session.screen('incident_subcategories');
    } else {
        if (vars.session.selectedCatagoryLabel) {
            await session.screen('incident_categories');
        } else {
            await session.screen('home');
        }
    }
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
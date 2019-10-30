/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.selectCategory = async (session, models, vars) => {
    console.log(vars.params.title);
    if (vars.params.title === 'other') {
    } else {
        models.incident_subcategories.category = undefined;
        models.incident_subcategories.subcategories = undefined;
        await session.screen('incident_subcategories');
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.search = async (session, models, vars) => {
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['subcategories[].select'] = async (session, models, vars) => {
    console.log(vars.params);
    console.log(models.incident_subcategories);
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    await session.screen('incident_categories');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.search = async (session, models, vars) => {
};
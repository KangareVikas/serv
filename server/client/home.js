/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.doRequest = async (session, models, vars) => {
    await session.rest.cherwellapi.GetBusinessObjectTemplate();
    await session.rest.cherwellapi.getBusinessObjectSchema();
    await session.rest.cherwellapi.GET_GetBusinessObjectTemplate();
    await session.rest.cherwellapi.GetBusinessObjectTemplate({
        access_token: vars.session.access_token,
        busObId: vars.session.busObId,
        includeRequired: true,
        includeAll: false
    });
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.doReport = async (session, models, vars) => {
};
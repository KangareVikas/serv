/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.start = async (session, models, vars) => {
    await session.screen('login');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    console.log('VARS: ', JSON.stringify(vars));
    await session.screen('home');
};
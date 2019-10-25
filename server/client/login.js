/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.submit = async (session, models, vars) => {
    let output = await session.rest.cherwellapi.login({ apikey: vars.config.rest.cherwell.custom.apikey });
    let access_token = output.body.access_token;
    vars.session.access_token = access_token;
    console.log('access_token: ' + access_token);
};
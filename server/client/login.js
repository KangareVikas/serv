/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.submit = async (session, models, vars) => {
    try {
        let output = await session.rest.cherwellapi.login({
            grant_type_password: vars.config.rest.cherwellapi.custom.grant_type_password,
            apikey: vars.config.rest.cherwellapi.custom.apikey,
            username: models.login.username,
            password: models.login.password
        });
        vars.session.access_token = output.body.access_token;
        vars.session.refresh_token = output.body.refresh_token;
        console.log('access_token: ' + vars.session.access_token);
    } catch (e) {
        console.log('Error msg: ' + e.message);
        await session.screen('login');
        return;
    }
    let data = await session.rest.cherwellapi.getCustomerData({ access_token: vars.session.access_token });
    vars.session.busObId = data.body[0].busObId;
    console.log('busObId: ' + vars.session.busObId);
    await session.screen('home');
};
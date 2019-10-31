/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.submit = async (session, models, vars) => {
    try {
        let output = await session.rest.cherwellapi.login({
            grant_type_password: vars.config.rest.cherwellapi.custom.grant_type_password,
            apikey: models.login.apikey,
            username: models.login.username,
            password: models.login.password
        });
        console.log('Login Success');
        vars.session.access_token = output.body.access_token;
        vars.session.refresh_token = output.body.refresh_token;
        vars.session.apikey = models.login.apikey;
        console.log('access_token: ' + vars.session.access_token);
    } catch (e) {
        console.log('Error: ' + e.message);
        models.login.hasError = true;
        try {
            models.login.error = JSON.parse(e.message);
        } catch (e) {
        }
        await session.screen('login');
        return;
    }
    let data = await session.rest.cherwellapi.getCustomerData({ access_token: vars.session.access_token });
    vars.session.custBusObId = data.body[0].busObId;
    console.log('custBusObId: ' + vars.session.custBusObId);
    await session.screen('home');
};
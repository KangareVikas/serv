/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.submit = async (session, models, vars) => {
    models.login.apikey = '81b8a693-a448-4275-bd9e-937ae6387b7c';
    models.login.username = 'apiuser';
    models.login.password = 'pass@123';
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
    } catch (e) {
        let error = {};
        try {
            error = JSON.parse(e.message);
        } catch (e) {
        }
        if (error.error == 'invalid_grant') {
            models.login.errorMessage = 'Invalid username or password.';
        } else {
            models.login.errorMessage = `Error logging in: ${error.error_description}`;
        }
        await session.screen('login');
        return;
    }
    let data = await session.rest.cherwellapi.getCustomerData({ access_token: vars.session.access_token });
    vars.session.custBusObId = data.body[0].busObId;
    await session.screen('home');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.tokenSubmit = async (session, models, vars) => {
    let refreshToken = models.login.refresh_token;
    models.login.apikey = '81b8a693-a448-4275-bd9e-937ae6387b7c';
    try {
        models.login.invalid_refresh_token = false;
        let output = await session.rest.cherwellapi.refreshToken({
            grant_type: vars.config.rest.cherwellapi.custom.grant_type_refresh_token,
            refresh_token: refreshToken,
            apikey: models.login.apikey
        });
        console.log('Login Success');
        vars.session.access_token = output.body.access_token;
        vars.session.refresh_token = output.body.refresh_token;
        vars.session.apikey = models.login.apikey;
    } catch (e) {
        models.login.refresh_token = '';
        models.login.invalid_refresh_token = true;
        await session.screen('login');
        return;
    }
    let data = await session.rest.cherwellapi.getCustomerData({ access_token: vars.session.access_token });
    vars.session.custBusObId = data.body[0].busObId;
    await session.screen('home');
};

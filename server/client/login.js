const util = require("./util");
let startRefreshTokenTimer = (session, vars, models, accessTokenLifetime) => {
    let refreshTime = accessTokenLifetime / 2;
    setTimeout(async () => {
        try {
            let output = await session.rest.cherwellapi.login({
                apikey: vars.config.rest.cherwellapi.custom.apikey,
                username: vars.config.rest.cherwellapi.custom.serviceUsername,
                password: vars.config.rest.cherwellapi.custom.servicePassword
            });
            if (!output.body.refresh_token) {
                models.login.errorMessage = 'All licenses are currently in use!';
                await session.screen('login');
                return;
            }
            console.log('Re-Login Success');
            vars.session.access_token = output.body.access_token;
            vars.session.refresh_token = output.body.refresh_token;
        } catch (e) {
            models.login.errorMessage = 'Your session has expired.';
            await session.screen('login');
        }
    }, refreshTime*1000);
    console.log(`-------------------- Refreshing the access_token in ${refreshTime}s... --------------------`)
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.submit = async (session, models, vars) => {
    delete models.login.errorMessage;
    try {
        let portalLoginOutput = await session.api.cherwellsoap.PortalLogin({
            userId: models.login.username,
            password: models.login.password,
            useSAML: false
        });
        if (portalLoginOutput.Error) {
            model.login.errorMessage = portalLoginOutput.Error.Message;
            return;
        }
        let output = await session.rest.cherwellapi.login({
            apikey: vars.config.rest.cherwellapi.custom.apikey,
            username: vars.config.rest.cherwellapi.custom.serviceUsername,
            password: vars.config.rest.cherwellapi.custom.servicePassword
        });
        if (!output.body.refresh_token) {
            models.login.errorMessage = 'All licenses are currently in use!';
            await session.screen('login');
            return;
        }
        console.log('Login Success');
        vars.session.access_token = output.body.access_token;
        vars.session.refresh_token = output.body.refresh_token;
        startRefreshTokenTimer(session, vars, models, output.body.expires_in);
    } catch (e) {
        let error = {};
        try {
            error = JSON.parse(e.message);
        } catch (e) {
        }
        if (error.error == 'invalid_grant') {
            models.login.errorMessage = 'Invalid service user username or password.';
        } else {
            models.login.errorMessage = `Error logging in service user: ${ error.error_description }`;
        }
        await session.screen('login');
        return;
    }
    let userOutput = await session.rest.cherwellapi.getUserByLoginId({ access_token: vars.session.access_token, username: models.login.username });
    vars.session.user = util.convertFieldsIntoObject(userOutput.body.fields);
    vars.session.fullNamefieldId = util.getFieldId(userOutput.body.fields, "FullName");
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
    models.login.apikey = vars.config.rest.cherwellapi.custom.apikey;
    try {
        models.login.invalid_refresh_token = false;
        let output = await session.rest.cherwellapi.refreshToken({
            refresh_token: refreshToken,
            apikey: models.login.apikey
        });
        vars.session.access_token = output.body.access_token;
        vars.session.refresh_token = output.body.refresh_token;
        console.log('Login Success');
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

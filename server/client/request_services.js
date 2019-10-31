/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    let validValues = await session.rest.cherwellapi.getValidValues({ access_token: vars.session.access_token });
    let list = validValues.body.values;
    let categories = [];
    list.map(item => { categories.push({ "title": item }) });
    models.request_services.services = categories;
};

/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    await session.screen('home');
};
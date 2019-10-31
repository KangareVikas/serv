/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    let validValues = await session.rest.cherwellapi.getValidValues({ access_token: vars.session.access_token });
    let list = validValues.body.values;
    let subcategories = [];
    models.request_services.services = subcategories;
    console.log(validValues.body);
};
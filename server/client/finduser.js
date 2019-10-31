/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.search = async (session, models, vars) => {
    let name = vars.params.name;
    let result = await session.rest.cherwellapi.getCustomerRecId({
        name: name,
        custBusObId: vars.session.custBusObId,
        firstNamefieldId: vars.session.firstNamefieldId
    });
    console.log(result.body);
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['users[].select'] = async (session, models, vars) => {
};
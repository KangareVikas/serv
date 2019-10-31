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
        firstNamefieldId: vars.session.firstNamefieldId,
        access_token: vars.session.access_token
    });
    console.log(result.body);
    models.finduser.users = [];
    let requiredFields = [
        'LastName',
        'FirstName',
        'Phone',
        'Manager'
    ];
    for (let i = 0; i < result.body.businessObjects.length; i++) {
        let user = { customerRecId: result.body.businessObjects[i].busObRecId };
        for (let j = 0; j < result.body.businessObjects[i].fields.length; j++) {
            let fieldName = result.body.businessObjects[i].fields[j].name;
            if (requiredFields.indexOf(fieldName) > -1) {
                user[fieldName] = result.body.businessObjects[i].fields[j].value;
            }
        }
        user.name = user['FirstName'] + ' ' + user['LastName']
        models.finduser.users.push(user);
    }
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
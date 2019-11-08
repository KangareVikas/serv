/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    // models.finduser.users = [];
    // models.finduser.name = '';

    if (models.finduser.users && models.finduser.users.length > 0) {
        return;
    }

    // let name = vars.params.name;
    // models.finduser.name = vars.params.name;
    let result = await session.rest.cherwellapi.getCustomerRecId({
        name: '',
        custBusObId: vars.session.custBusObId,
        access_token: vars.session.access_token,
        fullNamefieldId: vars.session.fullNamefieldId
    });
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
        user.name = user['FirstName'] + ' ' + user['LastName'];
        models.finduser.users.push(user);
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.search = async (session, models, vars) => {

};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.clearSearch = async (session, models, vars) => {
    models.finduser.searchKey = '';
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    if (vars.session.newrequest) {
        await session.screen('request_newrequest');
        vars.session.newrequest = null;
    } else {
        await session.screen('incident_newissue');
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['users[].select'] = async (session, models, vars) => {
    vars.session.customerRecId = vars.item.customerRecId;
    vars.session.forUser = vars.item.name;
    if (vars.session.newrequest) {
        await session.screen('request_newrequest');
        vars.session.newrequest = null;
    } else {
        models.incident_newissue.forUser = vars.item.name;
        await session.screen('incident_newissue');
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.myTickets'] = async (session, models, vars) => {
    vars.session.customerRecId = null;
    vars.session.forUser = null;
    await session.screen('tickets_mytickets');
};/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.home'] = async (session, models, vars) => {
    vars.session.customerRecId = null;
    vars.session.forUser = null;
    await session.screen('home');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.newIssue'] = async (session, models, vars) => {
    vars.session.selectedCatagoryLabel = '';
    vars.session.selectedCatagorySuffix = '';
    vars.session.selectedSubCatagoryLabel = '';
    await session.screen('incident_newissue');
};

const util = require("./util");
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
        custBusObId: vars.session.boDefs.CustomerInternal.busObId,
        access_token: vars.session.access_token,
        fields: [
            vars.session.boDefs.CustomerInternal.fields.names.LastName,
            vars.session.boDefs.CustomerInternal.fields.names.FirstName,
            vars.session.boDefs.CustomerInternal.fields.names.Phone,
            vars.session.boDefs.CustomerInternal.fields.names.Email,
            vars.session.boDefs.CustomerInternal.fields.names.Manager
        ]
    });
    models.finduser.users = [];
    for (let i = 0; i < result.body.businessObjects.length; i++) {
        let user = util.convertFieldsIntoObjectUsingBoDef(vars.session.boDefs.CustomerInternal, result.body.businessObjects[i].fields);
        user.customerRecId = result.body.businessObjects[i].busObRecId;
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
    if (vars.session.newrequest) {
        models.request_newrequest.forUser = vars.item.name;
        models.request_newrequest.phone = vars.item.Phone;
        models.request_newrequest.email = vars.item.Email;
        models.request_newrequest.customerRecId = vars.item.customerRecId;
        await session.screen('request_newrequest');
        vars.session.newrequest = null;
    } else {
        models.incident_newissue.forUser = vars.item.name;
        models.incident_newissue.phone = vars.item.Phone;
        models.incident_newissue.email = vars.item.Email;
        models.incident_newissue.customerRecId = vars.item.customerRecId;
        await session.screen('incident_newissue');
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.myTickets'] = async (session, models, vars) => {
    await session.screen('tickets_mytickets');
};/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.home'] = async (session, models, vars) => {
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

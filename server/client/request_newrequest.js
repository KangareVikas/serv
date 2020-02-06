const util = require("./util");

/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports.onload = async (session, models, vars) => {
    if (session.currentScreen() !== 'finduser') {
        models.request_newrequest = {};
    }
    if (!vars.session.requestPriorities) {
        let response = await session.rest.cherwellapi.Get_Search_Results({
            access_token: vars.session.access_token,
            body: {
                busObId: vars.session.boDefs.PriorityMatrixElement.busObId,
                filters: [{
                    'fieldId': vars.session.boDefs.PriorityMatrixElement.fields.names.ParentType,
                    'operator': 'eq',
                    'value': 'Request'
                }, {
                    'fieldId': vars.session.boDefs.PriorityMatrixElement.fields.names.PriorityGroup,
                    'operator': 'eq',
                    'value': 'Standard'
                }],
                includeAllFields: true
            }
        });
        let priorities = [];
        for (let bo of response.body.businessObjects) {
            let entry = util.convertFieldsIntoObjectUsingBoDef(vars.session.boDefs.PriorityMatrixElement, bo.fields, ['Priority']);
            if (priorities.indexOf(entry.Priority) === -1) {
                priorities.push(entry.Priority)
            }
        }
        vars.session.requestPriorities = util.createSelectFromFieldValues(priorities.sort(), priorities.sort()[0]);
    }

    models.request_newrequest.byUser = models.request_newrequest.byUser || vars.session.user.FullName;
    models.request_newrequest.forUser = models.request_newrequest.forUser || vars.session.user.FullName;
    models.request_newrequest.customerRecId = models.request_newrequest.customerRecId || vars.session.user.RecID;
    models.request_newrequest.email = models.request_newrequest.email || vars.session.user.Email;
    models.request_newrequest.phone = models.request_newrequest.phone || vars.session.user.CellPhone || vars.session.user.Phone;
    models.request_newrequest.seat = models.request_newrequest.seat || vars.session.user.Office;
    models.request_newrequest.Description = models.request_newrequest.Description || `I would like to order ${vars.session.requestService}, ${vars.session.requestCategory}, ${vars.session.requestSubCategory}`;
    models.request_newrequest.priority = models.request_newrequest.priority || JSON.parse(JSON.stringify(vars.session.requestPriorities));
    models.request_newrequest.service = models.request_newrequest.service || vars.session.requestService;
    models.request_newrequest.category = models.request_newrequest.category || vars.session.requestCategory;
    models.request_newrequest.quantity = models.request_newrequest.quantity || 1;
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports.submit = async (session, models, vars) => {
    let formattedLocation = models.request_newrequest.seat ? `, LOCATION/SEAT: ${models.request_newrequest.seat}` : '';
    let formattedDescription = models.request_newrequest.Description ? `${models.request_newrequest.Description}, ` : '';
    let description = `${formattedDescription} TYPE: ${models.request_newrequest.service}, ${models.request_newrequest.category}, ${vars.session.requestSubCategory}${formattedLocation}`;

    let updateFields = {
        'Description': description,
        'Service': models.request_newrequest.service,
        'Category': models.request_newrequest.category,
        'Subcategory': vars.session.requestSubCategory,
        'CustomerRecID': models.request_newrequest.customerRecId,
        'Priority': models.request_newrequest.priority.selected,
        'CustomerDisplayName': models.request_newrequest.forUser,
        'Source': 'Portal'
    };

    if (models.request_newrequest.quantity) {
        updateFields['GBP_generic_Quantity'] = models.request_newrequest.quantity;
    }
    let fields = JSON.stringify(util.createUpdateFieldsFromBoDef(vars.session.boDefs.Incident, updateFields));
    try {
        let result = await session.rest.cherwellapi.saveBusinessObject({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.boDefs.Incident.busObId,
            fields: fields
        });
        if (result.body.errorMessage) {
            models.request_newrequest.result.error = result.body.errorMessage;
        } else if (result.body.busObPublicId) {
            models.request_newrequest.result.busObPublicId = result.body.busObPublicId;
            if (models.request_newrequest.photo) {
                let data = await session.rest.cherwellapi.getIncidentBusObRecId({
                    busObPublicId: models.request_newrequest.result.busObPublicId,
                    access_token: vars.session.access_token,
                    incidentBusObId: vars.session.boDefs.Incident.busObId
                });
                let incidentBusObRecId = data.body.busObRecId;
                let offset = 0;
                let filename = models.request_newrequest.filename;
                let file = models.request_newrequest.photo;
                let totalsize = models.request_newrequest.size;
                await session.rest.cherwellapi.attachFile({
                    access_token: vars.session.access_token,
                    file: file,
                    filename: filename,
                    incidentBusObId: vars.session.boDefs.Incident.busObId,
                    offset: offset,
                    totalsize: totalsize,
                    busobrecid: incidentBusObRecId
                });
            }
        }
    } catch (e) {
        try {
            let error = JSON.parse(e.message);
            models.request_newrequest.result.error = error.errorMessage;
        } catch (e) {
        }
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports.back = async (session, models, vars) => {
    await session.screen('request_subservices');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports.search = async (session, models, vars) => {
    models.finduser.searchKey = models.request_newrequest.forUser;
    vars.session.newrequest = true;
    await session.screen('finduser');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports.home = async (session, models, vars) => {
    await session.screen('home');
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
    await session.screen('incident_newissue');
};


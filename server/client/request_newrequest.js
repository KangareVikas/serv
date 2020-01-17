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

    if (!vars.session.configItemDisplayNameFieldId || !vars.session.urgencyFieldId) {
        let requestData = await session.rest.cherwellapi.getBusinessObjectTemplate({
            access_token: vars.session.access_token,
            busObId: vars.session.incidentBusObId,
            includeRequired: true,
            includeAll: false
        });
        vars.session.configItemDisplayNameFieldId = util.getFieldId(requestData.body.fields, 'ConfigItemDisplayName');
        vars.session.urgencyFieldId = util.getFieldId(requestData.body.fields, 'Urgency');
    }
    if (!vars.session.urgencyMap) {
        let configItem = await session.rest.cherwellapi.getFieldValues({
            access_token: vars.session.access_token,
            busObId: vars.session.incidentBusObId,
            fieldId: vars.session.urgencyFieldId
        });
        vars.session.urgencyMap = util.createSelectFromFieldValues(configItem.body.values);
    }
    if (!models.request_newrequest.ConfigItemSelect) {
        let configItem = await session.rest.cherwellapi.getFieldValues({
            access_token: vars.session.access_token,
            busObId: vars.session.incidentBusObId,
            fieldId: vars.session.configItemDisplayNameFieldId
        });
        models.request_newrequest.ConfigItemSelect = util.createSelectFromFieldValues(configItem.body.values);
    }

    models.request_newrequest.byUser = models.request_newrequest.byUser || vars.session.user.FullName;
    models.request_newrequest.forUser = vars.session.forUser || models.request_newrequest.forUser || vars.session.user.FullName;
    models.request_newrequest.customerRecId = vars.session.customerRecId || models.request_newrequest.customerRecId || vars.session.user.RecID;
    models.request_newrequest.email = models.request_newrequest.email || vars.session.user.Email;
    models.request_newrequest.phone = models.request_newrequest.phone || vars.session.user.CellPhone || vars.session.user.Phone;
    models.request_newrequest.seat = models.request_newrequest.seat || vars.session.user.Office;
    models.request_newrequest.shortDescription = models.request_newrequest.shortDescription || `I would like to order ${vars.session.requestService}, ${vars.session.requestCategory}, ${vars.session.requestSubCategory}`;
    models.request_newrequest.urgency = models.request_newrequest.urgency || JSON.parse(JSON.stringify(vars.session.urgencyMap));
    models.request_newrequest.urgency.selected = models.request_newrequest.urgency.selected || vars.session.urgencyDefaultValue;
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
    let requestData = await session.rest.cherwellapi.getBusinessObjectTemplate({
        access_token: vars.session.access_token,
        busObId: vars.session.incidentBusObId,
        includeRequired: true,
        includeAll: true
    });

    let formattedLocation = models.request_newrequest.seat ? `, LOCATION/SEAT: ${models.request_newrequest.seat}` : '';
    let formattedDescription = models.request_newrequest.description ? `, ${models.request_newrequest.description}` : '';
    let description = `TYPE: ${models.request_newrequest.service}, ${models.request_newrequest.category}, ${vars.session.requestSubCategory}${formattedLocation}${formattedDescription}`;

    let updateFields = {
        'Description': description,
        'ShortDescription': models.request_newrequest.shortDescription,
        'Service': models.request_newrequest.service,
        'Category': models.request_newrequest.category,
        'Subcategory': vars.session.requestSubCategory,
        'CustomerRecID': models.request_newrequest.customerRecId,
        'Priority': models.request_newrequest.urgency.selected,
        'CustomerDisplayName': models.request_newrequest.forUser,
        'Source': 'Portal'
    };

    if (models.request_newrequest.urgency.selected) {
        updateFields['Urgency'] = models.request_newrequest.urgency.selected;
    }
    if (models.request_newrequest.quantity) {
        updateFields['GBP_generic_Quantity'] = models.request_newrequest.quantity;
    }
    if (models.request_newrequest.urgency.selected === '1') {
        updateFields['ConfigItemDisplayName'] = models.request_newrequest.ConfigItemSelect.selected;
    }
    let fields = JSON.stringify(util.createUpdateFields(requestData.body.fields, updateFields));
    try {
        let result = await session.rest.cherwellapi.saveBusinessObject({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.incidentBusObId,
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
                    incidentBusObId: vars.session.incidentBusObId
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
                    incidentBusObId: vars.session.incidentBusObId,
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


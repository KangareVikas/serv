/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['tickets[].select'] = async (session, models, vars) => {
    let data = await session.rest.cherwellapi.getIncidentBusObRecId({
        busObPublicId: vars.item.id,
        access_token: vars.session.access_token,
        incidentBusObId: vars.session.incidentBusObId
    });
    let fieldsList = [
        'CreatedDateTime',
        'Urgency',
        'CustomerDisplayName',
        'ShortDescription',
        'Description'
    ];
    data.body.fields.forEach(field => {
        if (fieldsList.includes(field.name)) {
            models.tickets_viewincident[field.name] = field.value;
        }
    });
    vars.session.busObPublicId = vars.item.id;
    await session.screen('tickets_viewincident');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    if (!vars.session.firstNamefieldId || !vars.session.lastNamefieldId) {
        console.log('Fetching firstNamefieldId, lastNamefieldId and fullNamefieldId');
        let output = await session.rest.cherwellapi.getBusinessObjectSchema({
            custBusObId: vars.session.custBusObId,
            access_token: vars.session.access_token
        });
        let parsed = output.body;
        let firstNameFound = false;
        let lastNameFound = false;
        let fullNameFound = false;
        for (let i = 0; i < parsed.fieldDefinitions.length; i++) {
            if (parsed.fieldDefinitions[i].displayName === 'First name') {
                vars.session.firstNamefieldId = parsed.fieldDefinitions[i].fieldId;
                firstNameFound = true;
            }
            if (parsed.fieldDefinitions[i].displayName === 'Last Name') {
                vars.session.lastNamefieldId = parsed.fieldDefinitions[i].fieldId;
                lastNameFound = true;
            }
            if (parsed.fieldDefinitions[i].displayName === 'Full name') {
                vars.session.fullNamefieldId = parsed.fieldDefinitions[i].fieldId;
                fullNameFound = true;
            }
            if (firstNameFound && lastNameFound && fullNameFound) {
                break;
            }
        }
    }
    console.log('firstNamefieldId: ' + vars.session.firstNamefieldId);
    console.log('lastNamefieldId: ' + vars.session.lastNamefieldId);
    if (!vars.session.incidentBusObId) {
        console.log('Fetching incidentBusObId');
        let data1 = await session.rest.cherwellapi.getBusinessObjectSummaryIncident({ access_token: vars.session.access_token });
        vars.session.incidentBusObId = data1.body[0].busObId;
        console.log(data1.body);
    }
    console.log('incidentBusObId: ' + vars.session.incidentBusObId);
    if (!vars.session.incidentFieldsIds) {
        vars.session.incidentFieldsIds = {};
        console.log('Fetching fields IDs for Incedent');
        let tmplData = await session.rest.cherwellapi.getIncedentTemplate({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.incidentBusObId
        });
        tmplData.body.fields.forEach(field => {
            if ([
                    'Status',
                    'Service',
                    'Category',
                    'CustomerDisplayName',
                    'CreatedDateTime'
                ].includes(field.name)) {
                vars.session.incidentFieldsIds[field.name] = field;
            }
        });
    }
    let ticketsSorting = [{
            'fieldId': vars.session.incidentFieldsIds['CreatedDateTime'].fieldId,
            'sortDirection': 0
        }];
    let ticketsFilter = [
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds['CustomerDisplayName'].fieldId,
            'value': 'Evan Employee'
        },
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds['Status'].fieldId,
            'value': 'Assigned'
        },
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds['Status'].fieldId,
            'value': 'In Progress'
        },
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds['Status'].fieldId,
            'value': 'New'
        },
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds['Status'].fieldId,
            'value': 'Pending'
        },
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds['Status'].fieldId,
            'value': 'Pending Approval'
        }
    ];
    let openedTickets = await session.rest.cherwellapi.getTickets({
        access_token: vars.session.access_token,
        incidentBusObId: vars.session.incidentBusObId,
        ticketsFilter: ticketsFilter,
        ticketsSorting: ticketsSorting
    });
    models.home.tickets = [];
    let requiredFields = [
        'ShortDescription',
        'Description',
        'Priority',
        'CreatedDateTime'
    ];
    for (let i = 0; i < openedTickets.body.businessObjects.length; i++) {
        let ticket = { id: openedTickets.body.businessObjects[i].busObPublicId };
        for (let j = 0; j < openedTickets.body.businessObjects[i].fields.length; j++) {
            let fieldName = openedTickets.body.businessObjects[i].fields[j].name;
            if (requiredFields.indexOf(fieldName) > -1) {
                ticket[fieldName] = openedTickets.body.businessObjects[i].fields[j].value;
            }
        }
        models.home.tickets.push(ticket);
    }
    models.home.footer = { active: 'home' };
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.search = async (session, models, vars) => {
    models.articles_findarticle.searchKey = vars.params.searchKey;
    await session.screen('articles_findarticle');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.doRequest = async (session, models, vars) => {
    await session.screen('request_services');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.doReport = async (session, models, vars) => {
    await session.screen('incident_categories');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.myTickets'] = async (session, models, vars) => {
    await session.screen('tickets_mytickets');
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
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onunload = async (session, models, vars) => {
    models.home.footer = { active: '' };
    vars.session.prevScreen = session.currentScreen();
};
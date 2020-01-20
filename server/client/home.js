const util = require("./util");

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

    models.tickets_viewincident = util.convertFieldsIntoObject(data.body.fields, [
        'CreatedDateTime',
        'Priority',
        'CustomerDisplayName',
        'Description',
        'OwnedBy'
    ]);
    models.tickets_viewincident.OwnedBy = models.tickets_viewincident.OwnedBy || 'Unassigned';
    vars.session.busObPublicId = vars.item.id;
    await session.screen('tickets_viewincident');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    if (!vars.session.incidentBusObId) {
        await session.showLoading("Loading BOs...");
        let data1 = await session.rest.cherwellapi.getBusinessObjectSummaryIncident({ access_token: vars.session.access_token });
        vars.session.incidentBusObId = data1.body[0].busObId;
    }
    if (!vars.session.priorityMatrixElementBusObId) {
        console.log('--- Get Priority Matrix Element busObject ID ---');
        let busObIdRes = await session.rest.cherwellapi.Get_Bus_Object_ID({
            access_token: vars.session.access_token,
            name: 'PriorityMatrixElement'
        });
        vars.session.priorityMatrixElementBusObId = busObIdRes.body[0].busObId;
    }
    if(!vars.session.priorityMatrixElementFields)  {
        console.log('--- Get Priority Matrix Element fields ---');
        let journNoteFieldIdsRes = await session.rest.cherwellapi.getBusinessObjectTemplate({
            busObId: vars.session.priorityMatrixElementBusObId,
            access_token: vars.session.access_token
        });
        vars.session.priorityMatrixElementFields = util.convertFieldsIntoFieldIdObject(journNoteFieldIdsRes.body.fields,
            ['ParentType','PriorityGroup']
        );
    }
    if (!vars.session.incidentFieldsIds) {
        console.log('Fetching fields IDs for Incident');
        let tmplData = await session.rest.cherwellapi.getIncedentTemplate({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.incidentBusObId
        });
        vars.session.incidentFieldsIds = util.convertFieldsIntoFieldIdObject(tmplData.body.fields, [
            'Status',
            'Service',
            'Category',
            'CustomerDisplayName',
            'CreatedDateTime',
            'IncidentType'
        ]);
    }
    let ticketsSorting = [{
            'fieldId': vars.session.incidentFieldsIds.CreatedDateTime,
            'sortDirection': 0
        }];
    let ticketsFilter = [
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds.CustomerDisplayName,
            'value': vars.session.user.FullName
        },
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds.Status,
            'value': 'Assigned'
        },
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds.Status,
            'value': 'In Progress'
        },
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds.Status,
            'value': 'New'
        },
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds.Status,
            'value': 'Pending'
        },
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds.Status,
            'value': 'Pending Approval'
        }
    ];
    await session.showLoading("Loading tickets");
    let openedTickets = await session.rest.cherwellapi.getTickets({
        access_token: vars.session.access_token,
        incidentBusObId: vars.session.incidentBusObId,
        ticketsFilter: ticketsFilter,
        ticketsSorting: ticketsSorting
    });
    models.home.refresh_token = vars.session.refresh_token;
    models.home.tickets = [];
    for (let busOb of openedTickets.body.businessObjects) {
        let ticket = util.convertFieldsIntoObject(busOb.fields, ['ShortDescription', 'Description', 'Priority', 'CreatedDateTime']);
        ticket.id = busOb.busObPublicId;
        if (!ticket.ShortDescription) {
            ticket.ShortDescription = (ticket.Description || "").substring(0, 160);
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

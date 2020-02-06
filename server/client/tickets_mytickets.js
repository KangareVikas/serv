const util = require("./util");

/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.showIncidents = async (session, models, vars) => {
        models.tickets_mytickets.tickets = [];
        models.tickets_mytickets.statusFilter = 'openTickets';
        let ticketsFilter = [
            ...vars.page.filters.common,
            ...vars.page.filters.incidents,
            ...vars.page.filters.opened
        ];
        let ticketsSorting = vars.page.ticketsSorting;
        let data = await session.rest.cherwellapi.getTickets({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.boDefs.Incident.busObId,
            ticketsFilter: ticketsFilter,
            ticketsSorting: ticketsSorting
        });
        console.log('Tickets count:', data.body.businessObjects.length);
        for (let busOb of data.body.businessObjects) {
            models.tickets_mytickets.tickets.push(util.convertFieldsIntoObjectUsingBoDef(vars.session.boDefs.Incident, busOb.fields, vars.page.fieldsList));
        }
        models.tickets_mytickets.$$partialFields = {
            full: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey', 'footer'],
            part: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey', 'footer']
        };
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.showRequests = async (session, models, vars) => {
    models.tickets_mytickets.tickets = [];
    models.tickets_mytickets.statusFilter = 'openTickets';
        let ticketsFilter = [
            ...vars.page.filters.common,
            ...vars.page.filters.requests,
            ...vars.page.filters.opened
        ];
        ticketsFilter.push(
            {
                'dirty': true,
                'fieldId': vars.session.boDefs.Incident.fields.names.Status,
                'value': 'Pending Approval'
            });
        let ticketsSorting = vars.page.ticketsSorting;
        let data = await session.rest.cherwellapi.getTickets({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.boDefs.Incident.busObId,
            ticketsFilter: ticketsFilter,
            ticketsSorting: ticketsSorting
        });
        console.log('Tickets count:', data.body.businessObjects.length);
        for (let busOb of data.body.businessObjects) {
            models.tickets_mytickets.tickets.push(util.convertFieldsIntoObjectUsingBoDef(vars.session.boDefs.Incident, busOb.fields, vars.page.fieldsList));
        }
        models.tickets_mytickets.$$partialFields = {
            full: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey', 'footer'],
            part: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey', 'footer']
        };
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.showNeedAttention = async (session, models, vars) => {
        models.tickets_mytickets.tickets = [];
        let ticketsType = models.tickets_mytickets.ticketsType;
        let ticketsFilter = [
            ...vars.page.filters.common,
            ...vars.page.filters[ticketsType],
            ...vars.page.filters.needAttencion
        ];
        let ticketsSorting = vars.page.ticketsSorting;
        let data = await session.rest.cherwellapi.getTickets({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.boDefs.Incident.busObId,
            ticketsFilter: ticketsFilter,
            ticketsSorting: ticketsSorting
        });
        console.log('Tickets count:', data.body.businessObjects.length);
        for (let busOb of data.body.businessObjects) {
            models.tickets_mytickets.tickets.push(util.convertFieldsIntoObjectUsingBoDef(vars.session.boDefs.Incident, busOb.fields, vars.page.fieldsList));
        }
        models.tickets_mytickets.$$partialFields = {
            full: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey', 'footer'],
            part: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey', 'footer']
        };
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.showOpenTickets = async (session, models, vars) => {
    models.tickets_mytickets.tickets = [];
    let ticketsType = models.tickets_mytickets.ticketsType;
        let ticketsFilter = [
            ...vars.page.filters.common,
            ...vars.page.filters[ticketsType],
            ...vars.page.filters.opened
        ];
        let ticketsSorting = vars.page.ticketsSorting;
        let data = await session.rest.cherwellapi.getTickets({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.boDefs.Incident.busObId,
            ticketsFilter: ticketsFilter,
            ticketsSorting: ticketsSorting
        });
        console.log('Tickets count:', data.body.businessObjects.length);
        for (let busOb of data.body.businessObjects) {
            models.tickets_mytickets.tickets.push(util.convertFieldsIntoObjectUsingBoDef(vars.session.boDefs.Incident, busOb.fields, vars.page.fieldsList));
        }
        models.tickets_mytickets.$$partialFields = {
            full: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey', 'footer'],
            part: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey', 'footer']
        };
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    models.tickets_mytickets.tickets = [];
    models.tickets_mytickets.ticketsType = 'incidents';
    models.tickets_mytickets.statusFilter = 'openTickets';
    vars.page.filters = {
        'common': util.createUpdateFieldsFromBoDef(vars.session.boDefs.Incident, { 'CustomerDisplayName': vars.session.user.FullName }),
        'incidents': util.createUpdateFieldsFromBoDef(vars.session.boDefs.Incident, { 'IncidentType': 'Incident' }),
        'requests': util.createUpdateFieldsFromBoDef(vars.session.boDefs.Incident, { 'IncidentType': 'Service Request' }),
        'opened': util.createUpdateFieldsFromBoDef(vars.session.boDefs.Incident, { 'Status': ['Assigned', 'In Progress', 'New', 'Pending'] }),
        'needAttencion': util.createUpdateFieldsFromBoDef(vars.session.boDefs.Incident, { 'Status': ['Resolved', 'Pending'] })
    };
    vars.page.ticketsSorting = [{
        'fieldId': vars.session.boDefs.Incident.fields.names.CreatedDateTime,
        'sortDirection': 0
    }];
    vars.page.fieldsList = [
        'IncidentID',
        'Description',
        'CreatedDateTime'
    ];
    let ticketsFilter = [
        ...vars.page.filters.common,
        ...vars.page.filters.incidents,
        ...vars.page.filters.opened
    ];
    let ticketsSorting = vars.page.ticketsSorting;
    let data = await session.rest.cherwellapi.getTickets({
        access_token: vars.session.access_token,
        incidentBusObId: vars.session.boDefs.Incident.busObId,
        ticketsFilter: ticketsFilter,
        ticketsSorting: ticketsSorting
    });
    console.log('Tickets count:', data.body.businessObjects.length);
    for (let busOb of data.body.businessObjects) {
        models.tickets_mytickets.tickets.push(util.convertFieldsIntoObjectUsingBoDef(vars.session.boDefs.Incident, busOb.fields, vars.page.fieldsList));
    }
    models.tickets_mytickets.footer = { active: 'myTickets' };
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['tickets[].select'] = async (session, models, vars) => {
    let data = await session.rest.cherwellapi.getIncidentBusObRecId({
        busObPublicId: vars.item.IncidentID,
        access_token: vars.session.access_token,
        incidentBusObId: vars.session.boDefs.Incident.busObId
    });
    models.tickets_viewincident = util.convertFieldsIntoObjectUsingBoDef(vars.session.boDefs.Incident, data.body.fields, [
        'CreatedDateTime',
        'Priority',
        'CustomerDisplayName',
        'Description',
        'AssignedTo',
        'IncidentType'
    ]);
    models.tickets_viewincident.AssignedTo = models.tickets_viewincident.AssignedTo || 'Unassigned';
    console.table(models.tickets_viewincident);
    vars.session.busObPublicId = vars.item.IncidentID;
    await session.screen('tickets_viewincident');
};
/**
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

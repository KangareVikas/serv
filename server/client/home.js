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
    vars.session.busObPublicId = vars.item.id;
    await session.screen('tickets_viewincident');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    let ticketsSorting = [{
            'fieldId': vars.session.boDefs.Incident.fields.names.CreatedDateTime,
            'sortDirection': 0
        }];
    let ticketsFilter = [
        {
            'dirty': true,
            'fieldId': vars.session.boDefs.Incident.fields.names.CustomerDisplayName,
            'value': vars.session.user.FullName
        },
        {
            'dirty': true,
            'fieldId': vars.session.boDefs.Incident.fields.names.Status,
            'value': 'Assigned'
        },
        {
            'dirty': true,
            'fieldId': vars.session.boDefs.Incident.fields.names.Status,
            'value': 'In Progress'
        },
        {
            'dirty': true,
            'fieldId': vars.session.boDefs.Incident.fields.names.Status,
            'value': 'New'
        },
        {
            'dirty': true,
            'fieldId': vars.session.boDefs.Incident.fields.names.Status,
            'value': 'Pending'
        },
        {
            'dirty': true,
            'fieldId': vars.session.boDefs.Incident.fields.names.Status,
            'value': 'Pending Approval'
        }
    ];
    await session.showLoading("Loading tickets");
    let openedTickets = await session.rest.cherwellapi.getTickets({
        access_token: vars.session.access_token,
        incidentBusObId: vars.session.boDefs.Incident.busObId,
        ticketsFilter: ticketsFilter,
        ticketsSorting: ticketsSorting
    });
    models.home.refresh_token = vars.session.refresh_token;
    models.home.tickets = [];
    for (let busOb of openedTickets.body.businessObjects) {
        let ticket = util.convertFieldsIntoObjectUsingBoDef(vars.session.boDefs.Incident, busOb.fields, ['ShortDescription', 'Description', 'Priority', 'CreatedDateTime']);
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

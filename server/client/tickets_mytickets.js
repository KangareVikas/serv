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
        let fieldsList = vars.page.fieldsList;
        let data = await session.rest.cherwellapi.getTickets({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.incidentBusObId,
            ticketsFilter: ticketsFilter,
            ticketsSorting: ticketsSorting
        });
        console.log('Tickets count:', data.body.businessObjects.length);
        data.body.businessObjects.forEach(busOb => {
            let result = {};
            busOb.fields.forEach(field => {
                if (fieldsList.includes(field.name)) {
                    result[field.name] = field.value;
                }
            });
            models.tickets_mytickets.tickets.push(result);
        });
        models.tickets_mytickets.$$partialFields = {
            full: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey'],
            part: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey']
        };
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.showRequests = async (session, models, vars) => {
        models.tickets_mytickets.tickets = [];
        let ticketsFilter = [
            ...vars.page.filters.common,
            ...vars.page.filters.requests
        ];
        let ticketsSorting = vars.page.ticketsSorting;
        let fieldsList = vars.page.fieldsList;
        let data = await session.rest.cherwellapi.getTickets({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.incidentBusObId,
            ticketsFilter: ticketsFilter,
            ticketsSorting: ticketsSorting
        });
        console.log('Tickets count:', data.body.businessObjects.length);
        data.body.businessObjects.forEach(busOb => {
            let result = {};
            busOb.fields.forEach(field => {
                if (fieldsList.includes(field.name)) {
                    result[field.name] = field.value;
                }
            });
            models.tickets_mytickets.tickets.push(result);
        });
        models.tickets_mytickets.$$partialFields = {
            full: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey'],
            part: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey']
        };
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.showNeedAttention = async (session, models, vars) => {
        models.tickets_mytickets.tickets = [];
        let ticketsFilter = [
            ...vars.page.filters.common,
            ...vars.page.filters.incidents,
            ...vars.page.filters.needAttencion
        ];
        let ticketsSorting = vars.page.ticketsSorting;
        let fieldsList = vars.page.fieldsList;
        let data = await session.rest.cherwellapi.getTickets({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.incidentBusObId,
            ticketsFilter: ticketsFilter,
            ticketsSorting: ticketsSorting
        });
        console.log('Tickets count:', data.body.businessObjects.length);
        data.body.businessObjects.forEach(busOb => {
            let result = {};
            busOb.fields.forEach(field => {
                if (fieldsList.includes(field.name)) {
                    result[field.name] = field.value;
                }
            });
            models.tickets_mytickets.tickets.push(result);
        });
        models.tickets_mytickets.$$partialFields = {
            full: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey'],
            part: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey']
        };
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.showOpenTickets = async (session, models, vars) => {
        models.tickets_mytickets.tickets = [];
        let ticketsFilter = [
            ...vars.page.filters.common,
            ...vars.page.filters.incidents,
            ...vars.page.filters.opened
        ];
        let ticketsSorting = vars.page.ticketsSorting;
        let fieldsList = vars.page.fieldsList;
        let data = await session.rest.cherwellapi.getTickets({
            access_token: vars.session.access_token,
            incidentBusObId: vars.session.incidentBusObId,
            ticketsFilter: ticketsFilter,
            ticketsSorting: ticketsSorting
        });
        console.log('Tickets count:', data.body.businessObjects.length);
        data.body.businessObjects.forEach(busOb => {
            let result = {};
            busOb.fields.forEach(field => {
                if (fieldsList.includes(field.name)) {
                    result[field.name] = field.value;
                }
            });
            models.tickets_mytickets.tickets.push(result);
        });
        models.tickets_mytickets.$$partialFields = {
            full: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey'],
            part: ['tickets', 'ticketsType', 'statusFilter', 'descending', 'showSearch', 'searchKey']
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
        'common': [
            {
                'dirty': true,
                'fieldId': vars.session.incidentFieldsIds['CustomerDisplayName'].fieldId,
                'value': 'Evan Employee'
            }
        ],
        'incidents': [
            {
                'dirty': true,
                'fieldId': vars.session.incidentFieldsIds['Service'].fieldId,
                'value': 'Access Management'
            },
            {
                'dirty': true,
                'fieldId': vars.session.incidentFieldsIds['Category'].fieldId,
                'value': 'Identity and Access Management'
            }
        ],
        'requests': [
            {
                'dirty': true,
                'fieldId': vars.session.incidentFieldsIds['Status'].fieldId,
                'value': 'Pending Approval'
            }
        ],
        'opened': [
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
            }
        ],
        'needAttencion': [
            {
                'dirty': true,
                'fieldId': vars.session.incidentFieldsIds['Status'].fieldId,
                'value': 'In Progress'
            }
        ]
    };
    vars.page.ticketsSorting = [{
        'fieldId': vars.session.incidentFieldsIds['CreatedDateTime'].fieldId,
        'sortDirection': 1
    }];
    vars.page.fieldsList = [
        'IncidentID',
        'ShortDescription',
        'CreatedDateTime'
    ];
    let ticketsFilter = [
        ...vars.page.filters.common,
        ...vars.page.filters.incidents,
        ...vars.page.filters.opened
    ];
    let ticketsSorting = vars.page.ticketsSorting;
    let fieldsList = vars.page.fieldsList;
    let data = await session.rest.cherwellapi.getTickets({
        access_token: vars.session.access_token,
        incidentBusObId: vars.session.incidentBusObId,
        ticketsFilter: ticketsFilter,
        ticketsSorting: ticketsSorting
    });
    console.log('Tickets count:', data.body.businessObjects.length);
    data.body.businessObjects.forEach(busOb => {
        let result = {};
        busOb.fields.forEach(field => {
            if (fieldsList.includes(field.name)) {
                result[field.name] = field.value;
            }
        });
        models.tickets_mytickets.tickets.push(result);
    });
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
    vars.session.busObPublicId = vars.item.IncidentID;
    await session.screen('tickets_viewincident');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onunload = async (session, models, vars) => {
    models.tickets_mytickets.footer = { active: '' };
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
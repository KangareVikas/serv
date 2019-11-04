/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    models.tickets_mytickets.tickets = [];
    models.tickets_mytickets.ticketsType = 'incidents';
    models.tickets_mytickets.statusFilter = 'openTickets';
    let ticketsFilter = [
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds['Service'].fieldId,
            'value': 'Access Management'
        },
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds['Category'].fieldId,
            'value': 'Identity and Access Management'
        },
        {
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds['Status'].fieldId,
            'value': 'New'
        }
    ];
    let fieldsList = [
        'IncidentID',
        'Description',
        'CreatedDateTime'
    ];
    let data = await session.rest.cherwellapi.getTickets({
        access_token: vars.session.access_token,
        incidentBusObId: vars.session.incidentBusObId,
        ticketsFilter: ticketsFilter
    });
    console.log('Tickets count: ', data.body.businessObjects.length);
    data.body.businessObjects.forEach(busOb => {
        let result = {};
        busOb.fields.forEach(field => {
            if (fieldsList.includes(field.name)) {
                result[field.name] = field.value;
            }
        });
        models.tickets_mytickets.tickets.push(result);
    });
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['tickets.view'] = async (session, models, vars) => {
    console.log(' === Here ===');
    console.log(JSON.stringify(vars));
    // await session.screen('tickets_viewincident');
};
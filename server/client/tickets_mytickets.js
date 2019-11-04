/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    models.tickets_mytickets = [];
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
    data.body.businessObjects.forEach(busOb => {
        let result = {};
        busOb.fields.forEach(field => {
            if (fieldsList.includes(filed.name)) {
                result[field.name] = field.value;
            }
        });
        models.tickets_mytickets.push(result);
    });
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.showOpenTickets = async (session, models, vars) => {
};
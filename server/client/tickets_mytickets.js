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
    let data = await session.rest.cherwellapi.getTickets();
    console.log('Tickets Count: ', data.body.businessObjects.length);
    data.body.businessObjects.forEach(busOb => {
        let result = {};
        busOb.fields.forEach(field => {
            if ([
                    'IncidentID',
                    'Description',
                    'CreatedDateTime'
                ].includes(filed.name)) {
                result[field.name] = field.value;
            }
        });
        models.tickets_mytickets.push(result);
    });
};
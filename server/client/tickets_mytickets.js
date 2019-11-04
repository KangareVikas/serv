/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
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
};
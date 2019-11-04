/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    let ticketsFilter = [{
            'dirty': true,
            'fieldId': vars.session.incidentFieldsIds['Status'].fieldId,
            'value': 'In Progress'
        }];
};
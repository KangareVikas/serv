/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    models.incident_newissue.byUser = 'Evan Employee';
    models.incident_newissue.forUser = 'Evan Employee';
    models.incident_newissue.email = 'evan.employee@acme.com';
    models.incident_newissue.phone = '6523455679';
    models.incident_newissue.urgency = [
        {
            '$i': 0,
            'label': '',
            'value': '0'
        },
        {
            '$i': 1,
            'label': '1- High',
            'value': '1'
        },
        {
            '$i': 2,
            'label': '2- Medium',
            'value': '2'
        },
        {
            '$i': 3,
            'label': '3- Low',
            'value': '3'
        }
    ];
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.cancel = async (session, models, vars) => {
    vars.session.selectedCatagoryLabel = null;
    vars.session.selectedSubCatagoryLabel = null;
    await session.screen('home');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.submit = async (session, models, vars) => {
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.search = async (session, models, vars) => {
};
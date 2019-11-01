/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    if (!vars.session.problemBusObId) {
        let data = await session.rest.cherwellapi.getBusinessObjectSummaryRequest({ access_token: vars.session.access_token });
        vars.session.problemBusObId = data.body[0].busObId;
    }
    models.request_newrequest = {};
    models.request_newrequest.byUser = vars.session.byUser || 'Evan Employee';
    models.request_newrequest.forUser = vars.session.forUser || 'Evan Employee';
    models.request_newrequest.email = 'evan.employee@acme.com';
    models.request_newrequest.phone = '6523455679';
    models.request_newrequest.shortDescription = `I need help with my ${ vars.session.selectedCatagoryLabel } ${ vars.session.selectedCatagorySuffix } ${ vars.session.selectedSubCatagoryLabel }`;
    models.request_newrequest.urgency = vars.session.urgencyMap;
    models.request_newrequest.service = vars.session.requestService;
    models.request_newrequest.category = vars.session.requestCategory;
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
exports.back = async (session, models, vars) => {
    await session.screen('request_subservices');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.cancel = async (session, models, vars) => {
    await session.screen('home');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.doRequest = async (session, models, vars) => {
    let data = await session.rest.cherwellapi.getBusinessObjectSummaryIncident({ access_token: vars.session.access_token });
    vars.session.incidentBusObId = data.body[0].busObId;
    console.log(data.body);
    let requestData = await session.rest.cherwellapi.GetBusinessObjectTemplate({
        access_token: vars.session.access_token,
        busObId: vars.session.incidentBusObId,
        includeRequired: true,
        includeAll: false
    });
    console.log(requestData.body);
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.doReport = async (session, models, vars) => {
};
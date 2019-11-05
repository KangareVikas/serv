/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    console.log("vars.session.busObPublicId  " + vars.session.busObPublicId)
    let attachmentsResponse = await session.rest.cherwellapi.getAttachments({
        incidentBusObId: vars.session.incidentBusObId,
        busObPublicId: vars.session.busObPublicId,
        access_token: vars.session.access_token
    });
    let list = attachmentsResponse.body.attachments;
    let attachments = [];
    list.map(item => {
        attachments.push({
            "name": item.attachmentFileName,
            "attachmentId" : item.attachmentId,
            "attachmentBusObId": item.busObId,
            "attachmentbusObRedId": item.busObRecId
        })
    });
    models.tickets_viewincident.attachments = attachments;
    models.tickets_viewincident.footer = { active: '' };
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    await session.screen('tickets_mytickets');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.myTickets'] = async (session, models, vars) => {
    await session.screen('tickets_mytickets');
};/**
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

/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
 */
exports['attachments.download'] = async (session, models, vars) => {
    console.log(vars.item.attachmentId);
};

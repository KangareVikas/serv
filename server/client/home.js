/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    if (!vars.session.kbBusObId) {
        let output = await session.rest.cherwellapi.getKBBusinessObject({ access_token: vars.session.access_token });
        vars.session.kbBusObId = output.body[0].busObId;
        vars.session.kbStateFieldId = output.body[0].stateFieldId;
        await session.rest.cherwellapi.getKBBaseArticles({
            access_token: vars.session.access_token,
            kbBusObId: vars.session.kbBusObId,
            kbStateFieldId: vars.session.kbStateFieldId
        });
    }
    if (!vars.session.incidentBusObId) {
        console.log('Fetching incidentBusObId');
        let data1 = await session.rest.cherwellapi.getBusinessObjectSummaryIncident({ access_token: vars.session.access_token });
        vars.session.incidentBusObId = data1.body[0].busObId;
        console.log(data1.body);
    }
    console.log('incidentBusObId: ' + vars.session.incidentBusObId);
    let openedTickets = await session.rest.cherwellapi.getAllincidents({
        access_token: vars.session.access_token,
        incidentBusObId: vars.session.incidentBusObId
    });
    models.home.tickets = [];
    console.log('openedTickets: ');
    console.log(openedTickets.body.businessObjects);
    let requiredFields = [
        'ShortDescription',
        'Description',
        'Priority',
        'CreatedDateTime'
    ];
    for (let i = 0; i < openedTickets.body.businessObjects.length; i++) {
        let ticket = { id: openedTickets.body.businessObjects[i].busObPublicId };
        for (let j = 0; j < openedTickets.body.businessObjects[i].fields.length; j++) {
            let fieldName = openedTickets.body.businessObjects[i].fields[j].name;
            if (requiredFields.indexOf(fieldName) > -1) {
                ticket[fieldName] = openedTickets.body.businessObjects[i].fields[j].value;
            }
        }
        models.home.tickets.push(ticket);
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.doRequest = async (session, models, vars) => {
    let validValues = await session.rest.cherwellapi.getValidValues({ access_token: vars.session.access_token });
    console.log(validValues.body);
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.doReport = async (session, models, vars) => {
    if (!vars.session.firstNamefieldId || !vars.session.lastNamefieldId) {
        console.log('Fetching firstNamefieldId and lastNamefieldId');
        let output = await session.rest.cherwellapi.getBusinessObjectSchema({
            custBusObId: vars.session.custBusObId,
            access_token: vars.session.access_token
        });
        let parsed = output.body;
        let firstNameFound = false;
        let lastNameFound = false;
        for (let i = 0; i < parsed.fieldDefinitions.length; i++) {
            if (parsed.fieldDefinitions[i].displayName === 'First name') {
                vars.session.firstNamefieldId = parsed.fieldDefinitions[i].fieldId;
                firstNameFound = true;
            }
            if (parsed.fieldDefinitions[i].displayName === 'Last Name') {
                vars.session.lastNamefieldId = parsed.fieldDefinitions[i].fieldId;
                lastNameFound = true;
            }
            if (firstNameFound && lastNameFound) {
                break;
            }
        }
    }
    console.log('firstNamefieldId: ' + vars.session.firstNamefieldId);
    console.log('lastNamefieldId: ' + vars.session.lastNamefieldId);
    let requestData = await session.rest.cherwellapi.GetBusinessObjectTemplate({
        access_token: vars.session.access_token,
        busObId: vars.session.incidentBusObId,
        includeRequired: true,
        includeAll: false
    });
    console.log(requestData.body);
    await session.screen('incident_categories');
};
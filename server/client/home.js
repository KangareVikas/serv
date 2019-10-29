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
    let validValues = await session.rest.cherwellapi.getValidValues({ access_token: vars.session.access_token });
    console.log(validValues.body);
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.doReport = async (session, models, vars) => {
    let output = await session.rest.cherwellapi.getBusinessObjectSchema({ custBusObId: vars.session.custBusObId, access_token: vars.session.access_token });
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
    console.log("FistNameFieldId: " + vars.session.firstNamefieldId)
    console.log("lastNamefieldId: " + vars.session.lastNamefieldId)
};
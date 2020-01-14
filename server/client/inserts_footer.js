/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.newIssue = async (session, models, vars) => {
    vars.session.serviceClassification = vars.session.defaultServiceClassification;
};
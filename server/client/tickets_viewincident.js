/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
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
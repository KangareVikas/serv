/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.myTickets = async (session, models, vars) => {
    await session.screen('tickets_mytickets');
};
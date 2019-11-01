/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    if (!vars.session.kbBusObId || vars.session.kbStateFieldId) {
        let output = await session.rest.cherwellapi.getKBBusinessObject({ access_token: vars.session.access_token });
        vars.session.kbBusObId = output.body[0].busObId;
        vars.session.kbStateFieldId = output.body[0].stateFieldId;
    }
    let articlesData = await session.rest.cherwellapi.getKBBaseArticles({
        access_token: vars.session.access_token,
        kbBusObId: vars.session.kbBusObId,
        kbStateFieldId: vars.session.kbStateFieldId
    });
};
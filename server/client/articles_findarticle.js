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
    let requestData = await session.rest.cherwellapi.getKBBaseArticles({
        access_token: vars.session.access_token,
        kbBusObId: vars.session.kbBusObId,
        kbStateFieldId: vars.session.kbStateFieldId
    });
    let articles = requestData.body.businessObjects;
    for (var i = 0; i < articles.length; i++) {
        for (var j = 0; j < articles[i].fields.length; j++) {
            if (articles[i].fields[j].name === 'CreatedDateTime') {
                models.articles_findarticle.articles[i].CreatedDateTime = articles[i].fields[j].value;
            } else if (articles[i].fields[j].name === 'Description') {
                models.articles_findarticle.articles[i].Description = articles[i].fields[j].value;
            }
        }
    }
};
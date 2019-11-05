/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['articles[].select'] = async (session, models, vars) => {
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    models.articles_findarticle.articles = [];
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
    let data = requestData.body.businessObjects;
    for (var i = 0; i < data.length; i++) {
        let article = {};
        for (var j = 0; j < data[i].fields.length; j++) {
            if (data[i].fields[j].name === 'CreatedDateTime') {
                article.CreatedDateTime = data[i].fields[j].value;
            } else if (data[i].fields[j].name === 'Description') {
                article.Description = data[i].fields[j].value;
            }
        }
        models.articles_findarticle.articles.push(article);
    }
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    await session.screen('home');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.myTickets'] = async (session, models, vars) => {
    await session.screen('tickets_mytickets');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['footer.home'] = async (session, models, vars) => {
    await session.screen('home');
};
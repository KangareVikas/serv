/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['articles[].select'] = async (session, models, vars) => {
    let article = models.articles_findarticle.articles.find(article => {
        return article.busObRecId === vars.item.busObRecId;
    });
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
    data.forEach(article => {
        let result = {
            busObRecId: article.busObRecId
        };
        article.fields.forEach(field => {
            if (['CreatedDateTime', 'Description'].includes(field.name)) {
                result[field.name] = field.value;
            }
        });
        models.articles_findarticle.articles.push(result);
    });
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
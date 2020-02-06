const util = require("./util");

/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports['articles[].select'] = async (session, models, vars) => {
    let article = models.articles_findarticle.articles.find(article => {
        return article.busObRecId === vars.item.busObRecId;
    });
    models.articles_viewarticle = article;
    await session.screen('articles_viewarticle');
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.onload = async (session, models, vars) => {
    let currentScreen = session.currentScreen();
    if (currentScreen != 'articles_viewarticle') {
        vars.page.prevScreen = currentScreen;
    }
    models.articles_findarticle.articles = [];
    let requestData = await session.rest.cherwellapi.getKBBaseArticles({
        access_token: vars.session.access_token,
        kbBusObId: vars.session.boDefs.KnowledgeArticle.busObId,
        kbStateFieldId: vars.session.boDefs.KnowledgeArticle.fields.names.Status,
        KBFields: [
            vars.session.boDefs.KnowledgeArticle.fields.names.Title,
            vars.session.boDefs.KnowledgeArticle.fields.names.BodyText,
            vars.session.boDefs.KnowledgeArticle.fields.names.CreatedDateTime,
            vars.session.boDefs.KnowledgeArticle.fields.names.AssignedTo
        ]
    });
    let data = requestData.body.businessObjects;
    data.forEach(article => {
        let result =  util.convertFieldsIntoObjectUsingBoDef(vars.session.boDefs.KnowledgeArticle, article.fields);
        result.busObRecId = article.busObRecId;
    models.articles_findarticle.articles.push(result);
    });
    models.articles_findarticle.footer = { active: '' };
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.clearSearch = async (session, models, vars) => {
    models.articles_findarticle.searchKey = '';
};
/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.back = async (session, models, vars) => {
    await session.screen(vars.page.prevScreen || 'home');
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

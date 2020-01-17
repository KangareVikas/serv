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
    if (!vars.session.kbBusObId || vars.session.kbStateFieldId) {
        let output = await session.rest.cherwellapi.getKBBusinessObject({ access_token: vars.session.access_token });
        vars.session.kbBusObId = output.body[0].busObId;
        vars.session.kbStateFieldId = output.body[0].stateFieldId;
    }
    let requiredFields = [
        'Title',
        'BodyText',
        'CreatedDateTime',
        'OwnedBy'
    ];
    if (!vars.session.KBFields || vars.session.KBFields.length < 3) {
        console.log('Fetching Fields for KB Articles:');
        vars.session.KBFields = [];
        let reqData = await session.rest.cherwellapi.getBusinessObjectTemplate({
            access_token: vars.session.access_token,
            busObId: vars.session.kbBusObId,
            includeRequired: true,
            includeAll: true
        });
        let fieldsData = reqData.body;
        for (var i = 0; i < fieldsData.fields.length; i++) {
            if (requiredFields.indexOf(fieldsData.fields[i].name) > -1) {
                console.log('Get fieldId of: ' + fieldsData.fields[i].name);
                vars.session.KBFields.push(fieldsData.fields[i].fieldId);
            }
        }
    }
    console.log(vars.session.KBFields);
    let requestData = await session.rest.cherwellapi.getKBBaseArticles({
        access_token: vars.session.access_token,
        kbBusObId: vars.session.kbBusObId,
        kbStateFieldId: vars.session.kbStateFieldId,
        KBFields: vars.session.KBFields
    });
    let data = requestData.body.businessObjects;
    data.forEach(article => {
        let result = { busObRecId: article.busObRecId };
        article.fields.forEach(field => {
            if (requiredFields.includes(field.name)) {
                result[field.name] = field.value;
            }
        });
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

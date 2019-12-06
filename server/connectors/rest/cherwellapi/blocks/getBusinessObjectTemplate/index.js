exports.preRequest_getBusinessObjectTemplate = async (session, models, vars, req) => {

};

exports.postRequest_getBusinessObjectTemplate = async (session, models, vars, res) => {
    if (res.statusCode == 401) {
        await session.alert('Your session has expired');
        await session.screen('login');
    }
};
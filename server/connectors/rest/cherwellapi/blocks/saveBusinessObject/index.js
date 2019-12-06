exports.preRequest_saveBusinessObject = async (session, models, vars, req) => {

};

exports.postRequest_saveBusinessObject = async (session, models, vars, res) => {
    if (res.statusCode == 401) {
        await session.alert('Your session has expired');
        await session.screen('login');
    }
};
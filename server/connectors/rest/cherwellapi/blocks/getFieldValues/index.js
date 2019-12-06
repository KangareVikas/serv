exports.preRequest_getFieldValues = async (session, models, vars, req) => {

};

exports.postRequest_getFieldValues = async (session, models, vars, res) => {
    if (res.statusCode == 401) {
        await session.alert('Your session has expired');
        await session.screen('login');
    }
};
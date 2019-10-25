export let mock_login1 = {
    submit: async function submit(params) {
        await this.go("Home");
    }
};

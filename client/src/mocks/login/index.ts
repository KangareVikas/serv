export let mock_login = {
    submit: async function submit(params) {
        await this.go("home");
    }
};

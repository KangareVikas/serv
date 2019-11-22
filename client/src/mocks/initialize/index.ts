export let mock_initialize = { login: async function login(params) {
        await this.go("login");
    }, runtimeserver: async function runtimeserver(params) {
        await this.go('setup');
    } };

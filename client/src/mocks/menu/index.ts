export let mock_menu = { newIssue: async function newIssue(params) {
        await this.go("incident_newissue");
    } };

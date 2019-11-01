export let mock_menu = { newIssue: async function newIssue(params) {
        await this.go("incident_newissue");
    }, myTickets: async function myTickets(params) {
        await this.go("tickets_mytickets");
    } };

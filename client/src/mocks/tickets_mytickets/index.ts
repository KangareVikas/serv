export let mock_tickets_mytickets = {
    search: async function search(params) {
        await this.go("findticket");
    },
    footer_home: async function footer_home(params) {
        await this.go("home");
    },
    tickets_view: async function tickets_view(params) {
        await this.go("tickets_viewincident");
    },
    footer_myTickets: async function footer_myTickets(params) {
        await this.go("tickets_mytickets");
    },
    footer_newIssue: async function footer_newIssue(params) {
        await this.go("incident_newissue");
    }
};

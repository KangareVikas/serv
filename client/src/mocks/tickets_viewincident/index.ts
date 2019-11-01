export let mock_tickets_viewincident = {
    back: async function back(params) {
        await this.go("tickets_mytickets");
    },
    footer_home: async function footer_home(params) {
        await this.go("home");
    },
    footer_myTickets: async function footer_myTickets(params) {
        await this.go("tickets_mytickets");
    },
    footer_chat: async function footer_chat(params) {
    },
    footer_call: async function footer_call(params) {
    },
    footer_newIssue: async function footer_newIssue(params) {
        await this.go("incident_newissue");
    },
    attachments_download: async function attachments_download(params) {
    }
};

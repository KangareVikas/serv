export let mock_inserts_footer = {
    home: async function home(params) {
        await this.go("home");
    },
    myTickets: async function myTickets(params) {
        await this.go("tickets_mytickets");
    },
    call: async function call(params) {
        alert("Call!");
    },
    newIssue: async function newIssue(params) {
        await this.go("request_newrequest");
    },
    chat: async function chat(params) {
        alert("Chat!");
    }
};

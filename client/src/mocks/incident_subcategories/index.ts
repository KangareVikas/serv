export let mock_incident_subcategories = {
    subcategories_select: async function subcategories_select(params) {
        await this.go("incident_newissue");
    }
};

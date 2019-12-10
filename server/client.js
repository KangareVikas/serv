/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.start = async (session, models, vars) => {
    vars.session.newIssueCategories = {
        computer: {
            label: 'Computer or Device',
            suffix: 'because it',
            list: [
                { title: 'has a problem with power/charging' },
                { title: 'will not startup' },
                { title: 'has network connectivity issues' },
                { title: 'other' }
            ],
            serviceClassification: [
                'Desktop Management',
                'Computer',
                'Submit Incident'
            ],
            icon: 'assets/images/incident/categories/computer_or_device_icon.png',
            bg: 'assets/images/incident/categories/computer_or_device_bg_01.png'
        },
        desk: {
            label: 'Desk Environment',
            suffix: 'regarding my',
            list: [
                { title: 'monitor' },
                { title: 'keyboard and/or mouse' },
                { title: 'docking station' },
                {
                    title: 'phone',
                    serviceClassification: [
                        'Telephony / Fax',
                        'Desktop Telephone',
                        'Submit Incident'
                    ]
                },
                { title: 'other' }
            ],
            serviceClassification: [
                'Desktop Management',
                'Computer',
                'Submit Incident'
            ],
            icon: 'assets/images/incident/categories/desk environment_icon.png',
            bg: 'assets/images/incident/categories/desk_environment_bg.png'
        },
        printer: {
            label: 'Printer',
            suffix: 'as it',
            list: [
                {
                    title: 'won\'t setup Follow-Me printing',
                    serviceClassification: [
                        'Printing',
                        'Network',
                        'Submit Incident'
                    ]
                },
                { title: 'is unable to print' },
                { title: 'other' }
            ],
            serviceClassification: [
                'Printing',
                'Desktop',
                'Submit Incident'
            ],
            icon: 'assets/images/incident/categories/printer_icon.png',
            bg: 'assets/images/incident/categories/printing_bg.png'
        },
        applications: {
            label: 'Software',
            suffix: 'specifically',
            list: [
                {
                    title: 'Microsoft Office',
                    serviceClassification: [
                        'Enterprise Apps',
                        'Microsoft Office',
                        'Submit Incident'
                    ]
                },
                {
                    title: 'SalesForce',
                    serviceClassification: [
                        'Enterprise Apps',
                        'CRM/Sales Software',
                        'Submit Incident'
                    ]
                },
                {
                    title: 'Anti-Virus',
                    serviceClassification: [
                        'Desktop Management',
                        'Anti-Virus',
                        'Submit Incident'
                    ]
                },
                { title: 'Jabber/Webex' },
                { title: 'other' }
            ],
            serviceClassification: [
                'Desktop Management',
                'Misc. Software',
                'Submit Incident'
            ],
            icon: 'assets/images/incident/categories/software_icon.png',
            bg: 'assets/images/incident/categories/software_bg.png'
        },
        access: {
            label: 'Access',
            suffix: 'due to',
            list: [
                { title: 'unable to log-in' },
                { title: 'my account is disabled' },
                { title: 'issues with VPN/DUO' },
                { title: 'other' }
            ],
            icon: 'assets/images/incident/categories/access_icon.png',
            bg: 'assets/images/incident/categories/access_bg.png'
        },
        other: {
            label: 'Other Technology',
            icon: 'assets/images/incident/categories/other_technology_icon.png',
            bg: 'assets/images/incident/categories/other_technologies_bg.png'
        }
    };
    vars.session.defaultServiceClassification = [
        'IT Service Desk',
        'Report Outage or Error',
        'Submit Incident'
    ];
    vars.session.urgencyDefaultValue = 'Medium';
    vars.session.unknownServiceIconAndBg = {
        icon: 'assets/images/request/services/other_services_icon.png',
        bg: 'assets/images/request/services/other_services_bg.png'
    };
    vars.session.serviceToIconAndBgMapping = {
        'Account Management': {
            icon: 'assets/images/request/services/security_icon.png',
            bg: 'assets/images/request/services/security_bg.png'
        },
        'Conferencing / Presentation': {
            icon: 'assets/images/request/services/messaging_collaboration_icon.png',
            bg: 'assets/images/request/services/messaging_collaboration_bg.png'
        },
        'Desktop Management': {
            icon: 'assets/images/request/services/workplace_icon.png',
            bg: 'assets/images/request/services/workplace_bg.png'
        },
        'E-Mail / Calendaring': {
            icon: 'assets/images/request/services/access_icon.png',
            bg: 'assets/images/request/services/access_bg.png'
        },
        'Employee Support': {
            icon: 'assets/images/request/services/HR_icon.png',
            bg: 'assets/images/request/services/HR_bg.png'
        },
        'Enterprise Apps': {
            icon: 'assets/images/request/services/middleware.png',
            bg: 'assets/images/request/services/middleware_bg.png'
        },
        'IT Service Desk': {
            icon: 'assets/images/request/services/generic_services_icon.png',
            bg: 'assets/images/request/services/generic_services_bg.png'
        },
        'Network Services': {
            icon: 'assets/images/request/services/network_services_icon.png',
            bg: 'assets/images/request/services/network_service_bg.png'
        },
        Printing: {
            icon: 'assets/images/request/services/managed_print_service_icon.png',
            bg: 'assets/images/request/services/managed_print_service_bg.png'
        },
        'Telephony / Fax': {
            icon: 'assets/images/request/services/telecom_service_icon.png',
            bg: 'assets/images/request/services/telecom_services_bg.png'
        },
        'Web Services': {
            icon: 'assets/images/request/services/servers_management_icon.png',
            bg: 'assets/images/request/services/servers_management_bg.png'
        },
        unused_cloud: {
            icon: 'assets/images/request/services/cloud_services_icon.png',
            bg: 'assets/images/request/services/cloud_services.png'
        },
        unused_database: {
            icon: 'assets/images/request/services/database_services_icon.png',
            bg: 'assets/images/request/services/database_services_bg.png'
        },
        unused_enablement: {
            icon: 'assets/images/request/services/enabling_IT_icon.png',
            bg: 'assets/images/request/services/enabling_IT_bg.png'
        },
        unused_enterprise: {
            icon: 'assets/images/request/services/enterprise_services_icon.png',
            bg: 'assets/images/request/services/enterprise_services_bg.png'
        },
        unused_facilities: {
            icon: 'assets/images/request/services/facilities_icon.png',
            bg: 'assets/images/request/services/facilities_bg.png'
        },
        unused_storage: {
            icon: 'assets/images/request/services/storage_services_icon.png',
            bg: 'assets/images/request/services/storage_services_bg.png'
        }
    };
    await session.screen('initialize');
};
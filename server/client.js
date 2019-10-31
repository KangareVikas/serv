/**
 * @param {Session} session
 * @param {Models} models
 * @param {Vars} vars
*/
exports.start = async (session, models, vars) => {
    vars.session.selectionItems = {
        'computer': {
            label: 'Computer or Device',
            suffix: 'because it',
            list: [
                'has a problem with power/charging',
                'will not startup',
                'has network connectivity issues',
                'other'
            ]
        },
        'desk': {
            label: 'Desk Environment',
            suffix: 'regarding my',
            list: [
                'monitor',
                'keyboard and/or mouse',
                'docking station',
                'phone',
                'other'
            ]
        },
        'printer': {
            label: 'Printer',
            suffix: 'as it',
            list: [
                'won\'t setup Follow-Me printing',
                'is unable to print',
                'other'
            ]
        },
        'applications': {
            label: 'Software',
            suffix: 'specifically',
            list: [
                'Microsoft products',
                'ReserveNow',
                'Jabber/Webex',
                'other'
            ]
        },
        'access': {
            label: 'Access',
            suffix: 'due to',
            list: [
                'unable to log-in',
                'my account is disabled',
                'issues with VPN/DUO',
                'other'
            ]
        },
        'building': {
            label: 'Building / Facilities',
            suffix: 'relating to',
            list: [
                'general building services',
                'conference / room reservations',
                'locker',
                'other'
            ]
        }
    };
    vars.session.defaultCategory = "SUPPORT REQUEST > FOLLOW UP"
    vars.session.buildingMap = {
        'Sunnyvale Bldg 5': 'TECH CENTER WEST COAST',
        'Sunnyvale Bldg 6': 'TECH CENTER WEST COAST',
        'New York City HQ': 'TECH CENTER EAST COAST',
        'Houston Main Campus': 'TECH CENTER CENTRAL REGION'
    };

    vars.session.urgencyMap = {
        options: [
            {
                'label': '',
                'value': ''
            },
            {
                'label': '1- High',
                'value': '1'
            },
            {
                'label': '2- Medium',
                'value': '2'
            },
            {
                'label': '3- Low',
                'value': '3'
            }
        ],
        selected: ''
    };

    vars.session.selectionItemsMap = {
        options: [
            {
                'label': 'Computer or Device',
                'value': 'Computer or Device'
            },
            {
                'label': 'Desk Environment',
                'value': 'Desk Environment'
            },
            {
                'label': 'Printer',
                'value': 'Printer'
            },
            {
                'label': 'Software',
                'value': 'Software'
            },
            {
                'label': 'Access',
                'value': 'Access'
            },
            {
                'label': 'Building / Facilities',
                'value': 'Building / Facilities'
            }
        ],
        selected: ''
    };
    await session.screen('login');
};
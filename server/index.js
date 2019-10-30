const session = require('smartux-connect');
require('./client/login');
require('./client/home');
require('./client/incident_categories');
require('./client/incident_subcategories');
session.start();
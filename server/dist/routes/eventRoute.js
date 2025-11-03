"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../controllers/middlewares/verifyToken");
const eventSuggesstionController_1 = require("../controllers/event/eventSuggesstionController");
const addEventController_1 = require("../controllers/event/addEventController");
const getUserEventsController_1 = require("../controllers/event/getUserEventsController");
const eventRoutes = (0, express_1.default)();
eventRoutes.get('/eventSuggestion/:query', verifyToken_1.verifyToken, eventSuggesstionController_1.eventSuggestion);
/*
* @route GET /api/event/eventSuggestion/:query
 * @group Events - Event operations
 * @security bearerAuth
 * @returns {object} 200 - Event suggestions fetched successfully
 * @returns {Error} 401 - Unauthorized (no token or invalid token)
 * @returns {Error} 404 - Event not found
 * @returns {Error} 500 - Server error
*/
eventRoutes.get('/getUserEvents', verifyToken_1.verifyToken, getUserEventsController_1.getUserEvents);
/*
* @route GET /api/event/getUserEvents
 * @group Events - Event operations
 * @security bearerAuth
 * @returns {object} 200 - User events fetched successfully
 * @returns {Error} 401 - Unauthorized (no token or invalid token)
 * @returns {Error} 500 - Server error
*/
eventRoutes.post('/addEvent', verifyToken_1.verifyToken, addEventController_1.addEvent);
/*
* @route POST /api/event/addEvent
 * @group Events - Event operations
 * @security bearerAuth
 * @returns {object} 200 - Event added successfully
 * @returns {Error} 401 - Unauthorized (no token or invalid token)
 * @returns {Error} 500 - Server error
*/
exports.default = eventRoutes;

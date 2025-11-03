"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const eventRoute_1 = __importDefault(require("./routes/eventRoute"));
const index_1 = __importDefault(require("./models/index"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger-output.json"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
async function startServer() {
    try {
        await (0, database_1.initializeDatabase)();
        index_1.default.sequelize.sync({ alter: true });
        app.use('/api/auth', authRoutes_1.default);
        app.use('/api/dashboard', dashboardRoutes_1.default);
        app.use('/api/event', eventRoute_1.default);
        app.use('/uploads', express_1.default.static('uploads'));
        app.get('/api/', (req, res) => {
            res.send('Hello from TypeScript Server!');
        });
        app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();

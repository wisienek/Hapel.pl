const express = require('express');
const Router = express.Router();

const dc        = require('./api/dc');
const elki      = require('./api/elki');
const karty     = require('./api/karty');
const users     = require("./api/users");
const role      = require("./api/role");
const test      = require("./api/test");
const help      = require("./api/help");
const hogwart   = require("./api/hogwart");

Router.use("/dc", dc);
Router.use("/elki", elki);
Router.use("/karty", karty);
Router.use("/users", users);
Router.use("/role", role);
Router.use("/test", test);
Router.use("/help", help);
Router.use("/hogwart", hogwart);


module.exports = Router;
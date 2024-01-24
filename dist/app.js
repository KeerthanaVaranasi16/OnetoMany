"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
// import dataSource from "./DataSource/dataSource"
const dataSource_1 = __importDefault(require("./DataSource/dataSource"));
const routes_1 = __importDefault(require("./Routes/routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/', routes_1.default);
dataSource_1.default.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
app.listen(port, function () {
    console.log("Connected");
});

const express 	= require("express");
const appR	= express.Router();
const appC	= require("../controllers/appController.js")

appR.post("/shorten", appC.shorten);
appR.get("/*/views", appC.countRedirect);
appR.get("/*", appC.redirect);

module.exports = appR

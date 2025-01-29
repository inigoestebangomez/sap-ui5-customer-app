/*global QUnit*/

sap.ui.define([
	"customermanager/custmanager/controller/CustomerManager.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CustomerManager Controller");

	QUnit.test("I should test the CustomerManager controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

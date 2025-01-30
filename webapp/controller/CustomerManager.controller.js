sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("customer.manager.custmanager.controller.CustomerManager", {
        onInit: function () {
            const oGridContainer = this.getView().byId("customerGridContainer");
            const oTemplate = this.getView().byId("_tileTemplate_ID").clone();
            oGridContainer.bindAggregation("items", {
                path: "/Customers",
                template: oTemplate
            });
        },

        onListItemPress: function (oEvent) {
            const oRouter = this.getOwnerComponent().getRouter();
            const sPath = oEvent.getSource().getBindingContext().getPath().substr(1);
            oRouter.navTo("Detail", { customerPath: sPath });
        },

        onAddCustomer: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Detail", { customerPath: "new" });
        }
    });
});

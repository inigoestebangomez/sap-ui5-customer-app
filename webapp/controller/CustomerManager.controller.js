sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("cust.man.customermanager.controller.customerManager", {
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

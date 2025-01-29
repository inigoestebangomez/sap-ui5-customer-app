sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
], function (Controller, History) {
    "use strict";
    return Controller.extend("cust.man.customermanager.controller.Detail", {
        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            const sPath = oEvent.getParameter("arguments").customerPath;
            const oModel = this.getView().getModel();

            if (sPath === "new") {
                this.getView().setBindingContext(oModel.createEntry("/Customers"));
            } else {
                this.getView().bindElement("/" + sPath);
            }
        },
        onSave: function () {
            const oModel = this.getView().getModel();
            oModel.submitChanges({
                success: () => sap.m.MessageToast.show("Client saved"),
                error: () => sap.m.MessageToast.show("Error at saving. Please try again.")
            });
        },
        onDelete: function () {
            const oContext = this.getView().getBindingContext();
            const oModel = this.getView().getModel();
            oModel.remove(oContext.getPath(), {
                success: () => sap.m.MessageToast.show("Client deleted!"),
                error: () => sap.m.MessageToast.show("Error deleting client. Please try again.")
            });
        },
        onNavBack() {
            let oHistory = History.getInstance();
            let sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("RouteCustomerManager", {}, true);
			}
        }
    });
});

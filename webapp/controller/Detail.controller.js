sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, History, MessageToast, MessageBox) {
    "use strict";
    return Controller.extend("cust.man.customermanager.controller.Detail", {
        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);

            let oCommentModel = this.getOwnerComponent().getModel("clientsFeedback");
            if (!oCommentModel) {
                oCommentModel = new sap.ui.model.json.JSONModel({
                    comments: []
                });

                this.getOwnerComponent().setModel(oCommentModel, "clientsFeedback");
            }

            this.getView().setModel(oCommentModel, "clientsFeedback");
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
        },

        onPost: function (oEvent) {
            let oFeedInput = oEvent.getSource();
            let sText = oFeedInput.getValue();

            if (!sText.trim()) {
                MessageToast.show("The comment cannot be empty");
                return;
            }

            let oModel = this.getView().getModel("clientsFeedback");
            let aComments = oModel.getProperty("/comments") || [];

            let oNewComment = {
                type: "Comentario",
                comment: sText,
                date: new Date().toLocaleString()
            };

            aComments.unshift(oNewComment);
            oModel.setProperty("/comments", aComments);

            oFeedInput.setValue("");
            MessageToast.show("Comment added");
        },
        onDeleteComment: function (oEvent) {
            // El source ahora es directamente el FeedListItemAction
            let oSource = oEvent.getSource();
            // ResourceBundle para recoger el texto de i18n
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle()
            // El padre del FeedListItemAction es el FeedListItem
            let oFeedListItem = oSource.getParent();
            // Obtener el índice del item en la lista
            let oList = oFeedListItem.getParent();
            let iIndex = oList.indexOfItem(oFeedListItem);
            let deleteConfirmation = oResourceBundle.getText("deleteConfirmation")
            let confirmationTitle = oResourceBundle.getText("confirmationTitle")
            let removedMessage = oResourceBundle.getText("removedMessage")
           
            MessageBox.confirm(deleteConfirmation, {
                title: confirmationTitle,
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                emphasizedAction: MessageBox.Action.NO,
                onClose: (oAction) => {
                    if (oAction === MessageBox.Action.YES) {
                        let oModel = this.getView().getModel("clientsFeedback");
                        let aComments = oModel.getProperty("/comments");
                        
                        // Eliminar el comentario
                        aComments.splice(iIndex, 1);
                        
                        // Actualizar el modelo
                        oModel.setProperty("/comments", aComments);
                        
                        MessageToast.show(removedMessage);
                    }
                }
            });
        }
    });
});

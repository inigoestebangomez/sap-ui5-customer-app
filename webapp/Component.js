sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/odata/v2/ODataModel",
    "customer/manager/custmanager/model/models"
], (UIComponent, ODataModel, models) => {
    "use strict";

    return UIComponent.extend("customer.manager.custmanager.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {

            UIComponent.prototype.init.apply(this, arguments);

            let oModel = this.getModel("Northwind");

            if (!oModel) {
                console.error("Error: No se puede obtener el modelo 'Northwind'. Verificar el manifest.json.");
            } else {
                console.log("Modelo OData cargado correctamente:", oModel);

                // Verifico si la metadata carga correctamente
                oModel.attachMetadataLoaded(null, function () {
                    console.log("Metadata OData cargada correctamente");

                    // Intentar obtener los datos de Customers
                    oModel.read("/Customers", {
                        success: function (oData) {
                            console.log("Datos obtenidos:", oData);
                        },
                        error: function (oError) {
                            console.error("Error al obtener Customers", oError);
                        }
                    });

                });
                oModel.attachMetadataFailed(null, function (oEvent) {
                    console.error("Error al cargar la metadata OData", oEvent);
                });
            }

            // Modelo del dispositivo
            this.setModel(models.createDeviceModel(), "device");

            // Inicializar el enrutador
            this.getRouter().initialize();
        }
    });
});

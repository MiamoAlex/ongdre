import * as ONGDRE from './ongdre/index.js';

const App = {
    model: {
        dataManager: ONGDRE.DataManager
    },

    view: {
        uiRenderer: ONGDRE.UiRenderer
    },

    controller: {
        uiManager: ONGDRE.UiManager,

        init: async function () {
            // moi quand je fais une gestion de cache
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('sw.js');
            }

            App.model.dataManager = new ONGDRE.DataManager();
            App.view.uiRenderer = new ONGDRE.UiRenderer();
            App.controller.uiManager = new ONGDRE.UiManager(App.model.dataManager, App.view.uiRenderer, window);
        }
    },
}

window.addEventListener('load', App.controller.init);
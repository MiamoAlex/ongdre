import * as ONGRE from '../index.js'

export class UiManager {
    domElements = {
        body: {
            element: 'body'
        },

        main: {
            element: '.main',
            events: ['click']
        },

        menu: {
            element: '.main__menu',
            events: ['click']
        },

        theater: {
            element: '.main__theater',
            events: ['click']
        },

        dialogBox: {
            element: '.main__dialog'
        }
    }

    // Position de la souris
    cursorPosition = {
        x: 0,
        y: 0
    };

    constructor(dataManager, uiRenderer, window) {
        this.window = window;
        this.dataManager = dataManager;
        this.uiRenderer = uiRenderer;
        this.audioManager = new ONGRE.AudioManager();
        this.requestManager = new ONGRE.RequestManager();
        this.eventHandler = new ONGRE.EventHandler(this);

        this.uiRenderer.appendDomElements(this.domElements);
        for (const key in this.domElements) {
            const domElement = this.domElements[key];
            if (domElement.events) {
                domElement.events.forEach(event => {
                    if (this[`${key}Handler`]) {
                        this.uiRenderer.getElement(key).addEventListener(event, (ev) => this[`${key}Handler`](ev));
                    }
                });
            }
        }
        console.log('%cONGDRE', 'font-size:2rem;color:violet');
        console.log("%con l'adore ce bon vieux ondgre !!!", 'font-size:1rem;color:pink; font-weight:bold');

        addEventListener('beforeunload', (ev) => {
            this.dataManager.saveData();
        })
    }

    /**
     * theaterHandler() gère les clics sur la section des outils du jeu
     * @param {Event} ev Evenement au clic sur les outils 
     */
    theaterHandler(ev) {
        const dataset = ev.target.dataset;
        // L'objet cliqué ouvre un nouvel event
        if (this.currentDialog && !this.uiRenderer.isWriting) {
            this.loadConversation(this.currentDialog.name, this.currentDialog.index + 1)
        } else if (dataset.event) {
            this.eventHandler.triggerEvent(dataset.event, ev);
            // L'objet cliqué lance une nouvelle voiceline
        } else if (dataset.conversation) {
            this.loadConversation(dataset.conversation, 0);
        }

    }

    /**
     * loadConversation() gère les evenements et l'apparition d'une boite de dialogue
     * @param {String} name identifiant de la conversation
     * @param {Number} index index du dialogue
     */
    loadConversation(name, index) {
        const event = this.dataManager.level[name][index];
        this.currentDialog = { name, index };

        if (event) {
            if (event.character) {
                this.uiRenderer.getElement('dialogBox').classList.remove('hide');
                this.uiRenderer.getElement('dialogBox').children[0].innerHTML = `${event.character} :`;
                this.uiRenderer.getElement('dialogBox').children[1].innerHTML = '';
                this.uiRenderer.writeDialog(event.dialog, 0, event.speed);

                // Gestion de l'audio
                if (event.audio) {
                    this.audioManager.loadAudioFile(event.audio, 'voiceline');
                }

                // Affichage de visuels
                if (event.visuals) {
                    event.visuals.forEach(visual => {
                        if (visual == 'protagonist') {
                            visual = this.dataManager.save.skin ?? 'ongdre';
                        }
                        this.uiRenderer.createImage('theater', visual, `${name}__${visual}`, event.clear);
                        if (event.visuals.length > 1) {
                            event.clear = false;
                        }
                    });
                }
            } else {
                this.currentDialog = null;
                this.uiRenderer.getElement('dialogBox').classList.add('hide');
            }

            // Gestion des triggers de l'event handler
            if (event.trigger) {
                this.eventHandler.triggerEvent(event.trigger);
            }

            if (event.choices) {
                this.uiRenderer.renderTemplate('choice', event.choices, 'theater');
            }
        } else {
            this.currentDialog = null;
            this.uiRenderer.getElement('dialogBox').classList.add('hide');
        }

    }

    /**
     * menuHandler() 
     * @param {Event} ev Evenement au clic 
     */
    menuHandler(ev) {
        switch (ev.target.className) {
            case 'main__menu-start':
                setTimeout(() => {
                    this.loadLevel(0);
                    this.uiRenderer.getElement('menu').classList.add('hide');
                    this.uiRenderer.getElement('main').classList.add('main__opened');
                }, 100);
                break;

            case 'main__menu-load':
                if (this.dataManager.save.level !== undefined && this.dataManager.save.level !== null) {
                    this.uiRenderer.getElement('main').classList.add('main__opened');
                    setTimeout(async () => {
                        this.uiRenderer.getElement('menu').classList.add('hide');
                        await this.loadLevel(this.dataManager.save.level);
                    }, 100);
                }
                break;
        }
    }

    /**
     * loadLevel() charge un niveau de conversations JSON et lance le nouvel handler
     * @param {Number} level 
     */
    async loadLevel(level) {
        this.eventHandler = new ONGRE[`Day${level}Handler`](this);
        this.dataManager.level = await this.requestManager.getLevel(level);
        this.dataManager.save.level = level;
        this.dataManager.saveData();
    }
}
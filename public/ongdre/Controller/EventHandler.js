export class EventHandler {
    constructor(uiManager) {
        this.uiManager = uiManager;
        this.uiRenderer = this.uiManager.uiRenderer;
        this.audioManager = this.uiManager.audioManager;
        this.dataManager = this.uiManager.dataManager;
        this.requestManager = this.uiManager.requestManager;
    }

    currentCountEvent = 0;
    lastEvent = '';

    /**
     * triggerEvent enclenche un evenement de l'histoire
     * @param {Event} event Evenement à enclencher
     * @param {*} ev Eventuel evenement js
     */
    triggerEvent(event, ev) {
        this.dataManager.playMode = 'playground';
        this.dataManager.save.event = event;
        this.dataManager.saveData();
        if (this.audioManager.currentMusic) {
            this.audioManager.currentMusic.stop();
            this.audioManager.currentMusic = undefined
        }
        this[`${event}Event`](ev);

        if (this.lastEvent !== event) {
            this.lastEvent = event;
            this.currentCountEvent = 0;
        }
    };

    /**
     * stopMusicEvent() met fin à la musique actuelle
     */
    stopMusicEvent() {}

    /**
     * creditsEvent fait défiler le superbe générique de fin du jeu
     */
    creditsEvent() {
        this.dataManager.save.level = null;
        this.dataManager.saveData();
        this.audioManager.loadAudioFile('epilogueGood7', 'voiceline');
        setTimeout(() => {
            this.uiRenderer.getElement('menu').classList.remove('hide');
            this.uiRenderer.getElement('theater').innerHTML = '';
        }, 4500);
        this.uiRenderer.getElement('main').classList.remove('main__opened');
    }

    showMusicEvent() {
        this.audioManager.loadAudioFile('tvloop', 'music');
    }
}
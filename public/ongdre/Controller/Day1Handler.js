import { EventHandler } from "./EventHandler.js";

export class Day1Handler extends EventHandler {
    constructor(uiManager) {
        super(uiManager);
        this.audioManager.loadAudioFile('forestambient', 'music');
        this.dayOneEvent();
    }

    dayOneEvent() {
        this.uiRenderer.createImage('theater', 'day1', 'main__title', true)
        setTimeout(() => {
            this.uiManager.loadConversation('mageAppearance', 0);
        }, 2500);
    }

    dayOneFailEvent() {
        setTimeout(() => {
            this.dataManager.save.dayOne = false;
            this.uiManager.loadLevel(2);
        }, 1500);
    }

    dayOneSuccessEvent() {
        setTimeout(() => {
            this.dataManager.save.dayOne = true;
            this.uiManager.loadLevel(2);
        }, 1500);
    }
}
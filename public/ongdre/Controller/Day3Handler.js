import { EventHandler } from "./EventHandler.js";

export class Day3Handler extends EventHandler {
    constructor(uiManager) {
        super(uiManager);
        this.audioManager.loadAudioFile('koalaambient', 'music');
        this.dayThreeEvent();
    }

    dayThreeEvent() {
        this.uiRenderer.createImage('theater', 'day3', 'main__title', true)
        setTimeout(() => {
            this.uiManager.loadConversation('dadAppearance', 0);
        }, 2500);
    }

    dayThreeFailEvent() {
        setTimeout(() => {
            this.dataManager.save.dayThree = false;
            this.uiManager.loadLevel(4);
        }, 1500);
    }

    dayThreeSuccessEvent() {
        setTimeout(() => {
            this.dataManager.save.dayThree = true;
            this.uiManager.loadLevel(4);
        }, 1500);
    }

    ongdreExplosionEvent() {
        this.dataManager.save.skin = 'ongdreExplosion';
    }
}
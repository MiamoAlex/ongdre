import { EventHandler } from "./EventHandler.js";

export class Day2Handler extends EventHandler {
    constructor(uiManager) {
        super(uiManager);
        this.audioManager.loadAudioFile('churchambient', 'music');
        this.dayTwoEvent();
    }

    dayTwoEvent() {
        this.uiRenderer.createImage('theater', 'day2', 'main__title', true)
        setTimeout(() => {
            this.uiManager.loadConversation('godAppearance', 0);
        }, 2500);
    }

    
    dayTwoFailEvent() {
        setTimeout(() => {
            this.dataManager.save.dayTwo = false;
            this.uiManager.loadLevel(3);
        }, 1500);
    }

    dayTwoSuccessEvent() {
        setTimeout(() => {
            this.dataManager.save.dayTwo = true;
            this.uiManager.loadLevel(3);
        }, 1500);
    }

    ongdreBurgerEvent () {
        this.dataManager.save.skin = 'ongdreBurger';
    }
}
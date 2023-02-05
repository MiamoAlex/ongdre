import { EventHandler } from "./EventHandler.js";

export class Day4Handler extends EventHandler {
    constructor(uiManager) {
        super(uiManager);
        this.audioManager.loadAudioFile('tvloop', 'music');
        this.epilogueEvent();
    }

    epilogueEvent() {
        this.uiRenderer.createImage('theater', 'epilogue', 'main__title', true)
        this.audioManager.loadAudioFile('tvloop', 'music');
        setTimeout(() => {
            this.uiRenderer.createImage('theater', 'newyork', 'main__newyork', true)
            setTimeout(() => {
                if (this.dataManager.save.dayOne && this.dataManager.save.dayTwo && this.dataManager.save.dayThree) {
                    this.uiManager.loadConversation('epilogueGood', 0);
                } else {
                    this.uiManager.loadConversation('epilogueBad', 0);
                }
            }, 1000);
        }, 3000);
    }
}
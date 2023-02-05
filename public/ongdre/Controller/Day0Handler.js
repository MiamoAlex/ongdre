import { EventHandler } from "./EventHandler.js";

export class Day0Handler extends EventHandler {
    constructor(uiManager) {
        super(uiManager);
        this.introEvent();
    }

    // INTRODUCTION
    introEvent() {
        this.audioManager.loadAudioFile('tvshow', 'music');
        this.uiRenderer.createImage('theater', 'intro', 'intro__text', false);
        setTimeout(() => {
            this.uiRenderer.createImage('theater', 'newyork', 'main__newyork', true)
            setTimeout(() => {
                this.uiManager.loadConversation('intro', 0);
            }, 4000);
        }, 5000);
    }
    
    resumeTvShowEvent() {
        this.audioManager.loadAudioFile('tvloop', 'music');
    }
    
    noSkinEvent() {
        this.dataManager.save.skin = 'ongdre';
        this.uiManager.loadConversation('introEnd', 0);
    }
    
    hatSkinEvent() {
        this.dataManager.save.skin = 'ongdreHat';
        this.uiManager.loadConversation('introEnd', 0);
    }
    
    miniSkinEvent() {
        this.dataManager.save.skin = 'ongdreMini';
        this.uiManager.loadConversation('introEnd', 0);
    }
    
    crownSkinEvent() {
        this.dataManager.save.skin = 'ongdreCrown';
        this.uiManager.loadConversation('introEnd', 0);
    }
    
    chapter1Event() {
        setTimeout(() => {
            this.uiManager.loadLevel(1);
        }, 450);
    }
}
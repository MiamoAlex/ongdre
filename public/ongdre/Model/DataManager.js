export class DataManager {
    canInterract = true;
    currentState = 'miamoIntro';

    constructor() {
        if (localStorage.getItem('ongdreSave')) {
            this.save = JSON.parse(localStorage.getItem('ongdreSave'));
            // Conversion des vielles sauvegardes
            if (this.save.level == undefined) {
                this.save = {};
                localStorage.clear();
                document.location.reload();
            }
        } else {
            this.save = {}
        }
    }

    /**
     * Sauvegarde dans le cache de l'avancement de la partie et des données du joueur
     */
    saveData() {
        localStorage.setItem('ongdreSave', JSON.stringify(this.save));
    }

}
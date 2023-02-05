export class RequestManager {
    /**
     * getPlaygroundsModel() récupere les infos des maps playgrounds
     * @param {String} levelName Nom du niveau à récupérer
     * @returns {Object} Modele des playgrounds
     */
    async getLevel(levelName) {
        const req = await fetch(`./ongdre/Model/Day${levelName}.json`);
        return await req.json();
    }
}
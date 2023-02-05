export class UiRenderer {
    domElements = {};
    templates = {};

    constructor() {
        const templates = document.querySelector('#templates');
        for (let i = 0; i < templates.children.length; i++) {
            const template = templates.children[i];
            this.templates[template.className.split('template__')[1]] = template;
        }
    }

    /**
     * appendDomElements() ajoute aux elements visuels actuels un groupe de nouveau éléments récupérables
     * @param {Object} domElements Objet contenant les différents classes des elements visuels à récuperer 
    */
    appendDomElements(domElements) {
        for (const key in domElements) {
            this.domElements[key] = document.querySelector(domElements[key].element);
        }
    }

    /**
    * getElement() retourne un noeud du DOM à partir de l'id renseigné
    * @param {String} id Identifiant de l'objet 
    * @returns {Node} Noeud demandé
    */
    getElement(id) {
        return this.domElements[id];
    }

    /**
     * renderTemplate() formatte une template à partir d'un tableau d'objet et l'envoie dans le dom destination
     * @param {Node} template 
     * @param {Array<Object>} arrayObj 
     * @param {Node} destination 
     */
    renderTemplate(template, arrayObj, destination) {
        const toFormat = Array.from(this.templates[template].innerHTML.matchAll(/{{(.*?)}}/gi));
        let formattedTemplates = '';
        for (let i = 0; i < arrayObj.length; i++) {
            const obj = arrayObj[i];
            formattedTemplates += this.templates[template].innerHTML;
            for (let j = 0; j < toFormat.length; j++) {
                const tag = toFormat[j][0];
                const key = toFormat[j][1];
                if (obj[key]) {
                    formattedTemplates = formattedTemplates.replaceAll(tag, obj[key]);
                } else {
                    formattedTemplates = formattedTemplates.replaceAll(tag, '');
                }
            }
        }
        // Retour des données
        if (destination) {
            this.getElement(destination).innerHTML = formattedTemplates;
        } else {
            return formattedTemplates;
        }
    }

    /**
     * createImage() génére une image avec certains parametres à l'écran
     * @param {Node} destination Destinatino de l'image
     * @param {String} src Nom de l'image pour remplir l'url
     * @param {String} className Classe css à donner à l'image
     * @param {boolean} clear Faut-il nettoyer l'écran (propre)
     * @param {Event} event Dataset à remplir sur l'image qui doit déclencher un evenement
     * @returns 
     */
    createImage(destination, src, className, clear, event, playground) {
        if (clear) {
            this.getElement('theater').innerHTML = '';
        }
        const img = document.createElement('img');
        img.src = `./assets/tex/${src}.png`;
        img.className = className;
        if (event) {
            img.dataset.event = event;
        }
        if (playground) {
            img.dataset.playground = playground;
        }
        this.getElement(destination).appendChild(img);
        return img;
    }

    /**
     * writeDialog() affiche du texte sur la boite de dialogue
     * @param {String} message 
     * @param {Number} index 
     * @param {Number} interval 
    */
    writeDialog(message, index, interval) {
        if (index < message.length) {
            this.isWriting = true;
            this.getElement('dialogBox').children[1].innerHTML += message[index++];
            setTimeout(() => {
                this.writeDialog(message, index, interval);
            }, interval);
        } else {
            this.isWriting = false;
        }
    }
}
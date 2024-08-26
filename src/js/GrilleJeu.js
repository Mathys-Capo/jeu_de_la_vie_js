class GrilleJeu {

    constructor(ligne, colonne) {
        this.colonne = colonne;
        this.ligne = ligne;
        this.jour = 0;
        let grille = [];
        for (let i = 0; i < ligne; i++) {
            let ligneGrille = []
            for (let j = 0; j <colonne; j++) {
                ligneGrille.push(false);
            }
            grille.push(ligneGrille);
        }
        this.grille = grille;
    }

    /**
     * @param ligne
     * @param colonne
     *
     * @description retourne la valeur de la case d'indice[ligne, colonne]
     * @returns {boolean}
     */
    getValeurCase(ligne, colonne) {
        return this.grille[ligne][colonne];
    }

    /**
     * @param ligne
     * @param colonne
     * @param boolean
     * @description definie la valeur de la case d'indice[ligne, colonne]
     * @return void
     */
    setValeurCase(ligne, colonne, boolean) {
        this.grille[ligne][colonne] = boolean;
    }

    /**
     * @param ligne
     * @param colonne
     *
     * @description permet de savoir si une case survie au prochain tour
     * @description <code>true</code> la case survie
     * @description <code>false</code> la case meurt
     * @return boolean
     */
    caseSurvieAuProchainTour(ligne,colonne) {
        const nbVoisins = this.getNbVoisinsVivant(ligne, colonne);
        if(this.getValeurCase(ligne,colonne)){
            return !(nbVoisins >= 4 || nbVoisins <= 1);
        }
        return nbVoisins === 3;
    }

    /**
     * @description genere la grille au jour suivant
     * @return void
     */
    generationSuivante() {
        //let ancienneGrille = this.grille.map((ligne) => ligne.map((td) => td.estVivant()));
        let nvGrille= new GrilleJeu(this.ligne,this.colonne)
        for (let l = 0; l < this.ligne; l++) {
            for (let c = 0; c <this.colonne; c++) {
                nvGrille.setValeurCase(l,c,this.caseSurvieAuProchainTour(l,c));

            }
        }
        this.grille = nvGrille.grille;
    }

    /**
     * @param ligne
     * @param colonne
     *
     * @description retourne le nombre de voisins vivant pour la case [colonne, ligne]
     * @return {number}
     */
    getNbVoisinsVivant(ligne,colonne) {
        let voisinVivant = 0;
        for (let voisin of this.getVoisinsCase(ligne,colonne)) {
            if(this.getValeurCase(voisin[0],voisin[1])){
                voisinVivant++;
            }
        }
        return voisinVivant;
    }

    /**
     * @param ligne
     * @param colonne
     *
     * @description retourne une liste contenant l'ensemble des voisins de la case [colonne, ligne]
     * @description les voisins auront la forme [colonne, ligne]
     * @return {*[]}
     */
    getVoisinsCase( ligne,colonne) {
        let voisins = [];
        for (let l = Math.max(ligne-1,0); l <= ligne+1; l++) {
                for (let c = Math.max(colonne-1,0); c <= colonne+1; c++) {
                    if( c<this.colonne && l<this.ligne ){
                        if(c!==colonne || l!==ligne) voisins.push([l,c]);
                    }
                }
        }
        return voisins;
    }

    /**
     * @description retourne la grille sous format HTML pour l'afficher
     * @return {string}
     */
    toHTML(){
        let grilleHTML='<table>';
        for (let l = 0; l < this.ligne; l++) {
            grilleHTML+='<tr>'
            for (let c = 0; c <this.colonne; c++) {
                    if(this.grille[l][c]) grilleHTML+= "<td class='vivant'"
                    else grilleHTML+= "<td"
                    //<td class='vivant' id='xx_yy'></td>
                    grilleHTML+= " id='"+l+"_"+c+"'></td>"
            }
            grilleHTML+='</tr>'
        }
        grilleHTML+='</table>'
        return grilleHTML;
    }
}
/*
Cette classe va nous permettre de definir des grilles avec des cases pres remplis
 */

class ConfigureGrilleJeu {
    /**
     * @param grilleJeu
     * @description modifie la grille de GrilleJeu pour la mettre avec des cases aleatoire
     * @return {*|[]}
     */
    static caseRandom(grilleJeu){
        let grille = grilleJeu.grille;
        for (let i = 0; i < grilleJeu.ligne; i++) {
            for (let j = 0; j < grilleJeu.colonne; j++) {
                grilleJeu.setValeurCase(i,j,Math.round(Math.random() * (2))===0);
            }
        }
        return grille
    }

    /**
     * @param grilleJeu
     * @description modifie la grille de GrilleJeu pour mettre un clignotant au centre
     * @return {*|[]}
     */
    static clignotant(grilleJeu){
        let grille = grilleJeu.grille;
        let centre=[Math.round(grilleJeu.ligne/2),Math.round(grilleJeu.colonne/2)]
        grilleJeu.setValeurCase(centre[0],centre[1]-1,true);
        grilleJeu.setValeurCase(centre[0],centre[1],true);
        grilleJeu.setValeurCase(centre[0],centre[1]+1,true);
        return grille
    }
}
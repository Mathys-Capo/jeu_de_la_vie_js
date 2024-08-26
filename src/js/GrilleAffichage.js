class GrilleAffichage {
    constructor(grilleJeu,divHTML) {
        this.grilleJeu = grilleJeu;
        this.divHTML = divHTML;
        this.mettreAJour = this.mettreAJour.bind(this);
    }

    

    mettreAJour() {
        this.grilleJeu.generationSuivante();
        this.divHTML.innerHTML = this.grilleJeu.toHTML();
        this.grilleJeu.jour++;
        document.getElementById("jour").value = this.grilleJeu.jour;
    }

    ajouterListener() {
        this.divHTML.onclick = function(event) {
            let target = event.target;
            if(target.nodeName !== "TD")
                return;
            let positionClick = target.id.split("_");

            let vivant = grilleJeu.getValeurCase(positionClick[0], positionClick[1]);
            
            if( vivant )
                target.classList.remove('vivant');
            else
                target.classList.add('vivant');
            grilleJeu.setValeurCase(positionClick[0],positionClick[1],!vivant);
        };
    }
    enleverListener() {
        this.divHTML.onclick = function(event) {};
    }
}
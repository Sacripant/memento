$(document).ready(function() {

    // JSON PARSE
    // Isole les différentes années des factures
    function return_annees()
    {
        var annees = [];
        for (var e in paiements) annees.push(paiements[e].annee);

        annees = annees.filter(function(val, i) 
        {
            if (val) 
                return annees.indexOf(val) == i;
            else 
                return false;
        }); 
        console.log(annees);

        return annees;
    }

    // Tri les el du obj par la propriété choisie
    function sortResults(obj, prop, asc) 
    {
        obj = obj.sort(function(a, b) 
        {
            if (asc) 
                return (a[prop] > b[prop]);
            else 
                return (b[prop] > a[prop]);
        });
    }

    function calcul_ttc(totalHT, taxe){
        var quotient    = 1+(taxe/100)
        ,   totalTTC
        ;

        if (taxe === 0) totalTTC = totalHT;
        if (taxe !== 0) totalTTC = totalHT*quotient;
                    
        return totalTTC;
    }


    // Affichage des el d'1 obj dans un tabeau
    function showResults (obj, year) {

        console.log(obj);

        // console.log(obj);
        var html = ''
        ,   caSection = tableTemplate.clone()
        ,   target = $('.tbody--ca_section', caSection)
        ,   title = $('.h--ca_section', caSection)
        ,   totalHT = $('.total_ht--ca_section', caSection)
        ,   totalTaxe = $('.total_taxe--ca_section', caSection)
        ,   totalTTC = $('.total_ttc--ca_section', caSection)
        ,   htValues = []
        ,   ttcValues = []
        ,   taxeValues = []
        ;

        // titre section
        title.text( year );
        // Id section
        caSection[0].id = "ca-" + obj[0].annee;

        for (var e in obj) 
        {
            // calcul HT, taxe an TTC for line
            var baseHT = obj[e].totalHT
            ,   ht = baseHT * ( obj[e].pourcentage / 100)
            ,   ttc = calcul_ttc(ht, obj[e].taxe)
            ,   taxe = ttc-ht
            ;

            // Push values in array
            htValues.push(formatage_montant(ht, false));
            ttcValues.push(formatage_montant(ttc, false));
            taxeValues.push(formatage_montant(taxe, false));


            html += '<tr>'
                +'<td> <strong>' + obj[e].id + '</strong> ' + obj[e].projet + '</td>'
                +'<td>' + obj[e].index + ' • ' + obj[e].quand + ' • ' + obj[e].pourcentage + '</td>'
                +'<td>' + obj[e].dateFacture + '</td>'
                +'<td>' + obj[e].datePaie + '</td>'
                //+'<td class="ca--totalHT">' + obj[e].totalHT + '</td>'
                +'<td class="ca--ht">' + formatage_montant(ht, true) + '</td>'
                +'<td class="ca--taxe">' + formatage_montant(taxe, true) + '</td>'
                +'<td class="ca--ttc">' + formatage_montant(ttc, true) + '</td>'
                +'</tr>'
            ;
        }

        // Inject tr in target
        target.html(html);

        // Inject totaux ht taxe ttc
        calcul_total(htValues, totalHT);
        calcul_total(taxeValues, totalTaxe);
        calcul_total(ttcValues, totalTTC);

        // Inject code in Dom
        caSection.appendTo( $('#CA') );
    }



    // tri les factures par années dans un nvx obj
    // Tri les factures de chaque années par date asc
    // Affiche le resultat dans un tableau
    // Load table template
    var tableTemplate =  $('#ca_section')
    ,   paiementsByYears = {}
    ,   paiementsEnAttente = {}
    ;

    tableTemplate.remove();

    // Factures en attentes
    paiementsEnAttente = paiements.filter(function(val, i){
        if (val.dateFacture && !val.datePaie)
            return true;
    });

    if (paiementsEnAttente.length) {
        showResults (paiementsEnAttente, "Facture(s) non reglées");        
    };




    // Chiffre d'affaire pour chaque année
    $.each(return_annees(), function(i, value) 
    {
        console.log(value);
        // filtre les factures pour l'année
        paiementsByYears[value] = paiements.filter(function(val, i) 
        {
            // console.log(val);
            if (val.datePaie && val.annee === value)
                return true;
        });

        // Tri les factures de l'années par date asc
        sortResults(paiementsByYears[value], "datePaie", true);

        // Affichage
        showResults (paiementsByYears[value], value);
    });




});
$(document).ready(function() {

	// JSON PARSE
	// Isole les différentes années des factures
	function return_annees()
	{
		var annees = [];
		for (var e in paiements) annees.push(paiements[e].annee);

		var annees = annees.filter(function(val, i) 
		{
			if (val) 
				return annees.indexOf(val) == i;
			else 
				return false;
  		}); 

		return annees;
	};

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
		var quotient 	= 1+(taxe/100)
		;

		if (taxe === 0) var totalTTC = totalHT;
		if (taxe !== 0) var totalTTC = totalHT*quotient;
					
		return totalTTC;
	}

	function eurTOxof(eur)
	{
		var xof = 655.957;
		return eur*xof;
	}

	// Affichage des el d'1 obj dans un tabeau
	function showResults (obj) {

		// console.log(obj);
	    var html = ''
		,	caSection = tableTemplate.clone()
		,	target = $('.tbody--ca_section', caSection)
		,	title = $('.h--ca_section', caSection)
		,	totalHT = $('.total_ht--ca_section', caSection)
		,	totalTaxe = $('.total_taxe--ca_section', caSection)
		,	totalTTC = $('.total_ttc--ca_section', caSection)
		,	htValues = []
		,	ttcValues = []
		,	taxeValues = []
	    ;

	    // titre section
	    title.text( obj[0].annee );
	    // Id section
	    caSection[0].id = "ca-" + obj[0].annee;

	    for (var e in obj) 
	    {
		    // calcul HT, taxe an TTC for line
		    var baseHT = (obj[e].devise === "€") ? eurTOxof( obj[e].totalHT ) : obj[e].totalHT
		    ,	ht = baseHT * ( obj[e].pourcentage / 100)
		    ,	ttc = calcul_ttc(ht, obj[e].taxe)
		    ,	taxe = ttc-ht
		    ;

		    // Push values in array
		    htValues.push(formatage_montant(ht, false));
		    ttcValues.push(formatage_montant(ttc, false));
		    taxeValues.push(formatage_montant(taxe, false));


	        html += '<tr>'
	        	+'<td>' + obj[e].projet + '</td>'
	            +'<td>' + obj[e].index + ' • ' + obj[e].quand + ' • ' + obj[e].pourcentage + '</td>'
	            +'<td>' + obj[e].dateFacture + '</td>'
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
	,	paiementsByYears = {}
	;

	tableTemplate.remove();


	$.each(return_annees(), function(i, value) 
	{
		// filtre les factures pour l'année
		paiementsByYears[value] = paiements.filter(function(val, i) 
		{
			return paiements[i].annee === value;
		});

		// Tri les factures de l'années par date asc
		sortResults(paiementsByYears[value], "dateFacture", true);

		// Affichage
		showResults (paiementsByYears[value]);
	});




});
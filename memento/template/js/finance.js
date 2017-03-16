// These function are global
// using by finance.js & CA.js

function formatage_montant(nbr, space, round)
{
	"use strict";
	
	if (pageDatas.projet.devise && pageDatas.projet.devise === "Fcfa")
		nbr = nbr*1000;

	if (round)
		nbr = Math.round(nbr);

	// var nbr = Math.round(nbr);
	var nombre = ''+nbr, // become string
		retour; 

	if (space) {
		retour = nombre.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
	} else {
		retour = nombre;		
	}

	return retour;
}

function calcul_total(arrayValues, cible)
{
	"use strict";

	var total = 0;
	$.each(arrayValues, function(i, value){
		total += parseFloat(value);
	});
		
	var totalString = formatage_montant(total, true);
	cible.text(totalString);
	return total;
}



$(function() {
	
// var siteUrl = "http://localhost/sacripant/memento/trunk/";

// si la tab finance existe ou si on est sur la page printfacture
// console.log(pageDatas);
if ( pageDatas.projet.finance === 1 || $('body').is('#printfacture') ) 
{

/* Finance 
==========================*/

var devis = $('#devis, #finance'),
 	sectionsDevis = $('.devis-section');
	// itemsDevis = $('.item-devis .montant-item'),
	// totalTTCWrap = $('.montant-total-ttc'),
 	// taxeWrap = $('.montant-taxe'),
  	// totalHTWrap = $('.montant-total-ht');



function calcul_taxe(totalHT, target){
	var taxe	= pageDatas.projet.taxe
	,	taxe 	= 1+(taxe/100)
	;

	// console.log(taxe);
	if (pageDatas.projet.taxe === 0) totalTTC = totalHT;
	if (pageDatas.projet.taxe !== 0) 
	{
		totalTTC = totalHT*taxe;
		
		totalTaxe = totalTTC-totalHT;
		target.find('.montant-taxe').text( formatage_montant(totalTaxe, true) );
	} 		
	target.find('.montant-total-ttc').text( formatage_montant(totalTTC, true) );
	
	return totalTTC;
}

function calcul()
{
	var taux = pageDatas.projet.tauxHoraire;

	pageDatas.projet.sousTotaux = [];
	pageDatas.projet.tranches = [];
	
	// Montant des items
	sectionsDevis.each(function(iSection) {
		var itemsValue = []
		,	items = $('.montant-item', this)
		,	sousTotalWrap = $('.montant-sous-total', this);
	

		items.each(function(iItem) {
			var $this = $(this)
			,	 temps = $this.attr("data-temps") || $('input', this).val()
			, 	 montant = Math.round(temps*taux);

			itemsValue.push(montant);				
			var montant = formatage_montant(montant, true, true);									
			$('.total-item', this).text(montant);
		});
	
		// Affichage sous totaux par catégorie
		var sousTotal = calcul_total(itemsValue, sousTotalWrap);
		pageDatas.projet.sousTotaux.push(sousTotal);	
	});

	// Affichage des totaux du Devis et mise en memoire
	var devisTotalHTWrap = $('.montant-total-ht'), 	
		devisTotalHTInput = $('.input-montant-total-ht');
		
	pageDatas.projet.totalHT = calcul_total(pageDatas.projet.sousTotaux, devisTotalHTWrap);

	// Add totalHT in input[hidden] value for save in BDD
	if (devisTotalHTInput.length)
		devisTotalHTInput.val(formatage_montant(pageDatas.projet.totalHT, false));
	
	
	pageDatas.projet.totalTTC = calcul_taxe( pageDatas.projet.totalHT, $('#devis') );
	
	// console.log(totalHT);

	// Répartition des factures / modalités de paiement
	$('.devis-liste-factures li').each(function(index) {
		var pourcent = $(this).attr('data-pourcentage'),
			coef = pourcent.replace('%', '');
		
			coef /= 100;

		console.log(coef);
		
		var montantTTC = pageDatas.projet.totalTTC*coef;
		var montantHT = pageDatas.projet.totalHT*coef;

		// console.log(montantHT);

		// Répartition HT
		$('.somme-a-payer', this).text(formatage_montant(montantHT, true) +" "+pageDatas.projet.devise+ " HT" );
		// Répartition TTC
		// $('.somme-a-payer', this).text(formatage_montant(montantTTC, true) +" "+pageDatas.projet.devise+ " TTC" );

		// Push each tranches de paiement
		pageDatas.projet.tranches.push(montantHT);
	});

}

calcul();

// Specifique à la section printfacture
if ($('body').is('#printfacture')) 
{
	// var detailPresta = $('#devis .details-prestation').clone();
	var totalGroupe = $('#devis .total-groupe-devis').clone();
	
	// detailPresta.prependTo('.add_details-presta');
	if (totalGroupe.length);
		totalGroupe.prependTo('.add_totaux');
	
	// Total à payer pour chaque facture
	// console.log(tranches);	
	$.each(pageDatas.projet.tranches, function(i, value){
		++i;
		var facture = $('#facture'+i);
		var totalFacture = facture.find('.total-groupe-facture');
				
		totalFacture.find('.montant-total-ht').text(formatage_montant(value, true));
		calcul_taxe( value, totalFacture );	
	});

}
// Specifique à la section projet (tab finance)
else
{
	$(".inputnum").keypress(function(event) {
		var touche = event.keyCode;
		var value = $(this).val();
		if (touche === 38 || 40) {
			if (touche === 38) {  
				event.preventDefault();
				var newval = ($(this).is(".taux-horaire")) ? ++value+".000" : ++value
				$(this).val(newval);
			}
			if (touche === 40) {  
				event.preventDefault();
				var newval = ($(this).is(".taux-horaire")) ? --value+".000" : --value
				if (value >= 1) {
					$(this).val(newval);					
				}
				
			}
		}
		
	}).blur(function() {
		calcul();
	});
	
	// UPDATE TIME (finance tab)
	
	var queryString = function(){
		var queryVal = $('#calcul').formSerialize();
		return queryVal;
	};
		
	$('#calcul').submit(function() {
		console.log( queryString() );
		$.ajax({
			type:"post",
		 	url: pageDatas.site.siteUrl+'?rah_external_output=query-finance',
			data: { query : queryString() },
			dataType: "text",
			success : 	function(data, statut)
						{ 
							location.reload(); 
			       		}
		});
		return false;
	});
	
	// Go to Print Preview
	
	$('#print-preview').click(function() {
		var nbTranches = pageDatas.projet.tranches.length,
			 newurl = this.href+"&nbTranches="+nbTranches;
		this.href = newurl;
	});
	
	
	
} // end if else print facture

} //end if finance

}); //end DOM ready Jquery

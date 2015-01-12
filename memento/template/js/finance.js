// These function are global
// using by finance.js & CA.js

function formatage_montant(nbr, space)
{
	if (pageDatas.projet.devise && pageDatas.projet.devise === "Fcfa") 
	{
		var nbr = nbr*1000;
	}
	var nbr = Math.round(nbr);
	var nombre = ''+nbr; // become string

	if (space)
		var retour = nombre.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
	else
		var retour = nombre;

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

var devis = $('#devis, #finance')
// , 	 devise = $('.metas-devis .devise').text()
, 	 sectionsDevis = $('.devis-section')
,	 itemsDevis = $('.item-devis .montant-item')
,	 totalTTCWrap = $('.montant-total-ttc')
, 	 taxeWrap = $('.montant-taxe')
, 	 totalHTWrap = $('.montant-total-ht')
// ,	 taxe = $('.total-groupe-devis h3:first .item-devis-title').text();
;



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
	var taux = $('.taux-horaire').val() || $('.taux-horaire').text()
	,	sousTotaux = [];
	tranches = [];
	
	// Montant des items
	sectionsDevis.each(function(iSection) {
		var itemsValue = []
		,	items = $('.montant-item', this)
		,	sousTotalWrap = $('.montant-sous-total', this);
	

		items.each(function(iItem) {
			var $this = $(this)
			,	 temps = $this.attr("data-temps") || $('input', this).val()
			, 	 montant = temps*taux;

			itemsValue.push(montant);				
			var montant = formatage_montant(montant, true);									
			$('.total-item', this).text(montant);
		});
	
		// Affichage sous totaux par catégorie
		var sousTotal = calcul_total(itemsValue, sousTotalWrap);
		sousTotaux.push(sousTotal);	
	});

	// Affichage des totaux du Devis et mise en memoire
	var devisTotalHTWrap = $('#devis').find('.montant-total-ht')
	, 	devisTotalHTInput = $('#devis').find('.input-montant-total-ht')
	,	totalHT = calcul_total(sousTotaux, devisTotalHTWrap)
	;

	// Add totalHT in input[hidden] value for save in BDD
	devisTotalHTInput.val(formatage_montant(totalHT, false));
	
	
	totalTTC = calcul_taxe( totalHT, $('#devis') );
	
	// console.log(totalHT);

	// Répartition des factures / modalités de paiement
	$('.devis-liste-factures li').each(function(index) {
		var pourcent = $(this).attr('data-pourcentage')
		,	coef = pourcent.replace('%', '');
		coef /= 100;
		
		var montantTTC = totalTTC*coef;
		var montantHT = totalHT*coef;
		// Répartition HT
		$('.somme-a-payer', this).text(formatage_montant(montantHT, true) +" "+pageDatas.projet.devise+ " HT" );
		// Répartition TTC
		// $('.somme-a-payer', this).text(formatage_montant(montantTTC, true) +" "+pageDatas.projet.devise+ " TTC" );

		// Push each tranches de paiement
		tranches.push(montantHT);
	});

}

calcul();

// Specifique à la section printfacture
if ($('body').is('#printfacture')) 
{
	var detailPresta = $('#devis .details-prestation').clone()
	,	 totalGroupe = $('#devis .total-groupe-devis').clone();
	
	detailPresta.prependTo('.add_details-presta');
	totalGroupe.prependTo('.add_totaux');
	
	// Total à payer pour chaque facture
	console.log(tranches);	
	$.each(tranches, function(i, value){
		++i;
		var facture = $('#facture'+i);
		var totalFacture = facture.find('.total-groupe-facture');
				
		totalFacture.find('.montant-total-ht').text(formatage_montant(value));
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
		var nbTranches = tranches.length,
			 newurl = this.href+"&nbTranches="+nbTranches;
		this.href = newurl;
	});
	
	
	
} // end if else print facture

} //end if finance

}); //end DOM ready Jquery

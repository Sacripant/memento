$(function(){
	
	/*Dépendances :
	================
	* Jquery 1.7.2
	* Jquery.form.js
	* Jquery.tools
	** date-input
	** tabs
	** History
	================
	*/
	var dontQuit = false;
	
	/*=======================================
	Select Bascule projet (select header)
	======================================= */
	
	var basculeProjet = $('.bascule-projet select');
	basculeProjet.change(function() {
		var newUri = $(this).val();
		window.location = newUri;
	});
	
	
	/*==========================
	Content Tabs 
	==========================*/

	var tabsnav = $('.a-sidenav')
	,	panes = $('.pane')
	,	hash = location.hash
	;

	function displaypane(tab) {
		var pane = $(tab[0].hash)
		;

		// Panes
		panes.not(pane).removeClass('pane-show').addClass('hide');
		pane.removeClass('hide');
		window.setTimeout(function(){
			pane.addClass('pane-show');
		}, 100);
		// Tabs
		// console.log(tab);
		tabsnav.not(tab).removeClass('fii');
		tab.addClass('fii');
	}


	// Page Load

	// console.log( panes );
	// console.log( panes.indexOf( $(hash)[0] ) );
	// console.log( $(hash).is(panes) );
	if (hash && $(hash).is(panes))
	{
		// console.log(hash);
		displaypane($('[href='+hash+']'));
	}
	if (!hash)
	{
		displaypane($(tabsnav).eq(0));
	}

	// Tab click
	tabsnav.click(function(event) {
		displaypane($(this));
	});

	// Hash change
	window.onhashchange = function()
	{
		var hash = location.hash;
		if ( hash && $(hash).is(panes) )
		{
			displaypane($('[href='+hash+']'));
		}
	}




		
	// $('[href=')

	// (function activeFirstPane () 
	// {
	// 	if (document.URL ) {};
	// }());
	
	// function startTabs(){
	// 	tabsnav.tabs(tabsPanes, {
	// 		current: "fii",
	// 		history: true
	// 	});
	// }
	// startTabs();
	
	// chargement de l'api Tabs
	// var apiTabs = tabsnav.data('tabs');
	
	/*========================== 
	CODE FOR ADMIN
	==========================*/
	
	if (pageDatas.user.level === 1) {
		
		/*========================== 
		JS FOR TODOLIST TABLES
		==========================*/
	
		// var idProjet = $('.idProjet').text();
		var btn = $('.todolist-table .action button');
		
		$('#todolist tr').each(function(index) 
		{
			var line	=	$(this)
			,		id	=	line.attr('data-id')
			;
		
			/* Edit Todo (Load external output form)
			========================================== */	
			$(".action-editer", this).not(':disabled').click(function() {
				// Mise en cache de la todo
				var todoTR = line.children().clone(true);

				line.load(pageDatas.site.siteUrl+"?rah_external_output=Form-editTodo&ID="+id, function(){				
					var editForm = $('.memForm', line);
				
					$('textarea', line).focus();
				
					// $('input.date-input', editForm).dateinput({
					// 	format : 'dd.mm.yy',
					// 	firstDay : 1,
					// });
					editForm.ajaxForm({					
						beforeSerialize: function(){
							var end = $('#string_expires', editForm)
							,   endVal = end.val()
							// ,	endDateVal = end.data("dateinput").getValue('yyyy-mm-dd 23:59:59')
							,	start = $('#string_Posted', editForm)
							,	startVal = start.val()
							// , 	startDateVal = start.data("dateinput").getValue('yyyy-mm-dd 00:00:01')
							, 	status = $('#string_custom_2 option:selected', editForm).val()
							,	now = new Date().toISOString().substr(0, 10)
							,	reNoHour = /^(\d){4}-(\d){2}-(\d){2}$/
							;
								
							// Format START
							if ( reNoHour.test(startVal) ) 
							{
								start.val( startVal +' 06:00:01' );	
							}
							
							// Format END				
							if (endVal === "") {
								if ( status === "Terminé" )
								{
									end.val( now +' 23:59:59' );
								}
								else 
								{
									end.val( '0000-00-00 00:00:00' );	
								}
							} 
							else if ( reNoHour.test(endVal) ) 
							{
								// console.log("No Hour, please add");
								end.val( endVal +' 23:59:59' );
							}
						},
						success:    function(data) { 
							location.reload(); 
						},
						debug: 1
					}); // end Ajaxform
				
					// Escape
					$(document).keydown(function(e) {
					  if (e.keyCode == 27) { line.html(todoTR); }   // esc
					});
				
				}); // end load	
			}); // end Click
			
			/*Compteur de temps (todoliste globale only)
			======================= */
		
			if ($('body').is('#home')) {
				
				
			
				$(".action-start", this).not(':disabled').click(
				// $(".action-start", this).not(':disabled').toggle(
					function() {
						
						var btn = $('.todolist-table .action button') // rafraichissement de la liste des boutons
						// récupérer la valeur du timer
						,	 timeWrapper = $('.temps-reel', line)
						,	 timeValue = parseFloat(timeWrapper.text())
						
						// Incrémentation compteur
						,	incrementCompteur = function(){
					 			timeValue += 0.1;
								timeValue = parseFloat(timeValue.toFixed(1));
								timeWrapper.text(timeValue);
							}
						;
						
						// STOP COMPTEUR						
						if ( line.is('.compteur-on') )
						{
							// Switch du picto & css compteur-on
							this.attributes[0].nodeValue = '\u25B6';
							line.removeClass('compteur-on');
							// stop incrémentation du temps et ajoute +0.1
							clearInterval(startcompteur);
							incrementCompteur();
							// ajax sql update 
							$.ajax({
								type:"post",
							 	url: pageDatas.site.siteUrl+'?rah_external_output=compteur',
								data: { 
									id : id,
									time : timeValue
								}
							});
							// activation des btn
							btn.removeAttr('disabled');
							dontQuit = false;							
						}
						// START COMPTEUR
						else
						{
							// Switch du picto & css compteur-on
							this.attributes[0].nodeValue = '\u2389';
							line.addClass('compteur-on');
							// désactivation des autres btn
							btn.not($(this)).attr('disabled', 'disabled');
							// incrémentation du temps
							startcompteur = setInterval(incrementCompteur, 360000); // = 6 min					
							// prevent close page variable
							dontQuit = true;							
						}
				}); // end click
			} // end if	body is #home
			
		}); // end .each() todos

		/* New Todo (Load external output form)
		==========================*/
		$('#add-todo').click(function() {
			var line = $('.add-todo-line')
			,	button = line.children().clone(true)
			;
		
			line.load(pageDatas.site.siteUrl+"?rah_external_output=From-newTodo&idProjet="+pageDatas.projet.id,
				function(){
					$('textarea', line).focus();
					console.log($('.memForm', line));
					$('.memForm', line).ajaxForm({
						success:    function() { location.reload(); }
					});
				}
			);
		
			// Escape
			$(document).keydown(function(e) {
			  if (e.keyCode == 27) { line.html(button); }   // esc
			});
		});
		
	}; // end code for admin
	
	
	/* ==========================
	filtrages todos par cat
	========================== */
	var filtres = $('.filtrage input');
	
	function filtrage(target) {
		var filtre = target
		,	 targetWrap = target.parents('.filtrage').next()
		,	 target = filtre.attr('data-target')
		,	 switcher = (filtre.is(':checked')) ? "table-row" : "none";
		// console.log(targetWrap);
		$(target,targetWrap).css('display', switcher);
	}
	
	filtres.each(function(index) {
		filtrage($(this));
	});
	
	filtres.change(function() {
		filtrage($(this));
	});
	
	/* =======================
	Sort todolist Table
	======================= */
	var todoHeaders = $(".todolist-table th");
	$(".todolist-table").stupidtable();
	
	todoHeaders.click(function() {
		var $this = $(this)
		,	sortTypeClass = this.classList[0];
		
		// console.log(sortTypeClass);
		if ($this.is('.asc,.desc')) 
		{
			$this.is('.asc') ? this.className = sortTypeClass +" desc" :  this.className = sortTypeClass +" asc";
		}
		else
		{
			todoHeaders.not($this).removeClass('asc desc');
			this.className = sortTypeClass +" asc";	
		};
	});
	
	
	/* =======================
	commentaires
	======================= */
	
	var CommentBlock = $('#comment-form');
	
	function toggleCommentBlock(){
		if(CommentBlock.is('.open')) {
			CommentBlock.removeClass('open');
		} else{
			CommentBlock.addClass('open').find('.titre-comment input').focus();
			
		}
	}
	
	$('#add-comment').click(function() {
		toggleCommentBlock();
	});
	
	// autoremplissage des input name et E-mail
	$('#name').val(pageDatas.user.realName);
	$('#email').val(pageDatas.user.email);
		
	// Ajout d'un titre au commentaire
	$('#txpCommentInputForm').submit(function() {
		var titre = $(".titre-comment input").val()
		,	 titreTextile = 'h1. '+titre+'\n\n'
		, 	 commentBody = $('#message').val();		
		// console.log(titre);
		if (titre) {
			$('#message').val(titreTextile + commentBody);
		}		
	});	
	
	// if #cpreview in url	
	if (document.location.hash === '#cpreview') {
		// charge pane #commentaire
		// apiTabs.click('#commentaires');
		// console.log( $('[href=#commentaires]') );
		displaypane( $('[href=#commentaires]') );
		toggleCommentBlock();
		
		var commentBody = $('#message').val(),
		 	 commentTitle = commentBody.match(/^h1.(.)*\n\n/)[0],
			 titre = $(".titre-comment input");
		console.log(commentBody);
		console.log(commentTitle);
		$('#message').val( commentBody.replace(commentTitle, '') );
		titre.val(commentTitle.replace('h1. ', ''));
	};
	
	// if #c[0-9]* commentaire link in url
	// var commentLink = document.location.hash.match(/^#c[0-9]*$/);
	if (/^#c[0-9]*$/.test(document.location.hash)) {
		// apiTabs.click('#commentaires');
		displaypane( $('[href=#commentaires]') );
	
	}
	
	/* =======================
	Form Upload files to serveur
	======================= */
	var fileForm = $('#attach-file-form');
	$('#file-fichier').change(function() {
		var file = this.files[0];
		$('.file-form-info', fileForm).prepend(file.name)
	});
	
	fileForm.ajaxForm({
		uploadProgress: function(evt, position, total, complete) {
			var progress = $('progress', fileForm);
			progress.attr('max', complete);
		},
		success:    function(data) { 
			console.log(data);
			$('.file-form-info').html(data);
		}
	});
	
	
	/* =======================
	Prevent Quit/Close window
	======================= */
	
	window.onbeforeunload = function () {
		if (dontQuit) {
			return 'Vous avez un lancer un compteur de temps';	
		}
	};
	
	
	
}); //end Jquery dom ready


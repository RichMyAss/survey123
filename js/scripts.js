$(document).ready(function(){

	// DETERMINE IF MOBILE
	if($(window).width()<1000){
		mobile = true;
	}else{
		mobile = false;
	}

	// INIT FUNCTIONS
	alignTooltips();

	// INTERACTIONS
	$('.single_answer .answer').click(progressQuestion);
	$('input, textarea').blur(progressQuestion);
	$('.answer').click(selectAnswer);

	$(function() {
	    $( ".sortable" ).sortable({
	    	placeholder: "ui-state-highlight"
	    });
	    $( ".sortable" ).disableSelection();
	});

});

var mobile;

function alignTooltips(){
	$('.q_radio .tooltip').each(function(){

		//GET ITEM
		var tooltip = $(this);
		
		//ADJUST SIZING
		var width = tooltip.innerWidth();
		var realign = ((width/2)/1.5) * -1;

		//SET NEW SIZE
		if(!mobile){
			tooltip.css({
				"marginLeft":realign
			});
		}
	})
}

function progressQuestion(){
	if(mobile){return;}

	var h = parseInt($(this).parents('.question_container').height());
	var posY = $(window).scrollTop();
	var newPos = posY+h;

	$('body').animate({
		'scrollTop':newPos
	}, 1000);
}

function selectAnswer(){

	$this = $(this);

	if($this.parents().hasClass('single_answer')){
		$this.siblings('.answer').removeClass('active');
	}
	
	$this.toggleClass('active');
}
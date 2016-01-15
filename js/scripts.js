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
	// $('.single_answer .answer').click(progressQuestion);
	// $('input, textarea').blur(progressQuestion);
	$('.answer').click(selectAnswer);
	$('.submit_container .submit_button').click(submit);

	$(function() {
	    $( ".sortable" ).sortable({
	    	placeholder: "ui-state-highlight",
	    	tolerance: 'pointer',
         	revert: 300
	    });
	    $( ".sortable" ).disableSelection();
	});

	$(window).resize(function(){

		if($(window).width()<1000){
			mobile = true;
		}else{
			mobile = false;
		}

		alignTooltips();

	});

	// PREVENT SCROLL ON MOBILE DRAG
	// window.blockMenuHeaderScroll = false;
	// $(window).on('touchstart', function(e)
	// {
	//     if ($(e.target).closest('.sortable').length == 1)
	//     {
	//         blockMenuHeaderScroll = true;
	//     }
	// });
	// $(window).on('touchend', function()
	// {
	//     blockMenuHeaderScroll = false;
	// });
	// $(window).on('touchmove', function(e)
	// {
	//     if (blockMenuHeaderScroll)
	//     {
	//         e.preventDefault();
	//     }
	// });

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
		}else{
			tooltip.css({
				"marginLeft":0
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

	//CHECK WHETHER TO SHOW HIDDEN QUESTIONS
	check_for_more_questions($this);
}

function check_for_more_questions(q){

	var data_extra_q = q.attr('data-extra-q');
	var extra_question = q.parents('.question_container').find('.extra_question[data-extra-q=' + data_extra_q +']');
	

	//DEACTIVATE IF SINGLE ANSWER SIBLING IS SELECTED
	if(q.parents('.question').hasClass('single_answer') && !q.hasClass('show_extras')) {

		q.parents('.question_container').find('.extra_question').addClass('hidden');
		return;

	};

	//DEACTIVATE IF DESELECTED
	if(q.hasClass('active')){
		//IF DEACTIVATING
		
		// HIDE OTHER EXTRA Q
		extra_question.siblings('.extra_question').addClass('hidden');

		// SHOW EXTRA Q WITH DATA_EXTRA_Q
		extra_question.removeClass('hidden');

	}else if(!q.parents('.question').hasClass('single_answer') && !q.hasClass('show_extras')){
		//MULTI CHOICE DOES NOT DEACTIVATE
		console.log('d');
		return;

	}else{
		//ACTIVATING
		extra_question.addClass('hidden');
	}
	
}

function submit(){

	$('.overlay').removeClass('hidden');

}







(function($) {
	// Init Plugin Functions
	$.fn.jvFloat = function() {
		// Check input type
		return this.filter('input').each(function() {
			// store placeholder text in placeHolder Variable
			var placeholderText = $(this).attr('placeholder');
			// Wrap the input in div.jvFloat
			$(this).wrap('<div class=jvFloat>');
			// Store the placeholder text in span.placeHolder
			$(this).before('<span class=placeHolder>' + placeholderText);
			// change span.placeHolder to span.placeHolder.active
			$(this).bind('keyup blur', function() {
				if ($(this).val() == '') {
					$(this).siblings('.placeHolder').removeClass('active');
				} else {
					$(this).siblings('.placeHolder').addClass('active');
				}
			});
		});
	};
// Make Zeptojs & jQuery Compatible
})(window.jQuery || window.Zepto || window.$);
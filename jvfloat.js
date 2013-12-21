/*
 * JVFloat.js
 * modified on: 12/21/2013
 */

(function($) {
  // Init Plugin Functions
  $.fn.jvFloat = function() {
    // Check input type - filter submit buttons.
    return this.filter('input:not([type=submit])').each(function() {
      // Wrap the input in div.jvFloat
      var $el = $(this)
        .wrap('<div class=jvFloat>');
      // Store the placeholder text in span.placeHolder
      // added `required` input detection and state
      var required = $el.attr('required') || '';
      var placeholder = $('<span class="placeHolder ' + required + '">' + $el.attr('placeholder') + '</span>')
        .insertBefore($el);
      // checks to see if inputs are pre-populated and adds active to span.placeholder
      setState();
      $el.bind('keyup blur', setState);
      function setState() {
      // change span.placeHolder to span.placeHolder.active
        placeholder.toggleClass('active', $el.val() !== '');
      }
    });
  };
// Make Zeptojs & jQuery Compatible
})(window.jQuery || window.Zepto || window.$);

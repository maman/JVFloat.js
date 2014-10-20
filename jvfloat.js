/*
 * JVFloat.js
 * modified on: 18/09/2014
 */

(function _jv_float_module($, window) {
  'use strict';

  var namespace = 'jv_float';

  // Init Plugin Functions
  $.fn.jvFloat = function _jv_float_plugin() {
    // Check input type - filter submit buttons.
    return this.filter('input:not([type=submit]), textarea, select').each(function _jv_float_each() {
      function getPlaceholderText($el) {
        var text = $el.attr('placeholder');

        if (typeof text == 'undefined') {
          text = $el.attr('title');
        }

        return text;
      }

      function setState() {
        // change span.placeHolder to span.placeHolder.active
        var currentValue = $el.val();

        if (currentValue == null) {
          currentValue = '';
        } else if ($el.is('select')) {
          var placeholderValue = getPlaceholderText($el);

          if (placeholderValue == currentValue) {
            currentValue = '';
          }
        }

        placeholder.toggleClass('active', currentValue !== '');
      }

      /**
       * Generate a unique id
       * @return {string} id generated
       */
      function generate_id() {
        // if window don't have UUID, create with 1, else append one each time
        !('JVFLOAT_UUID' in window) ? window.JVFLOAT_UUID = 1 : window.JVFLOAT_UUID += 1;

        return [namespace, window.JVFLOAT_UUID].join('__');

      }

      function createIdOnElement($el) {
        var id = generate_id();
        $el.prop('id', id);
        return id;
      }
      // Wrap the input in div.jvFloat
      var $el = $(this).wrap('<div class=jvFloat>');
      var forId = $el.attr('id');
      if (!forId) {
        forId = createIdOnElement($el);
      }
      // Store the placeholder text in span.placeHolder
      // added `required` input detection and state
      var required = $el.attr('required') || '';

      // adds a different class tag for text areas (.jvFloat .placeHolder.textarea) 
      // to allow better positioning of the element for multiline text area inputs
      var placeholder = '';
      var placeholderText = getPlaceholderText($el);

      if ($(this).is('textarea')) {
        placeholder = $('<label class="placeHolder ' + ' textarea ' + required + '" for="' + forId + '">' + placeholderText + '</label>').insertBefore($el);
      } else {
        placeholder = $('<label class="placeHolder ' + required + '" for="' + forId + '">' + placeholderText + '</label>').insertBefore($el);
      }
      // checks to see if inputs are pre-populated and adds active to span.placeholder
      setState();
      $el.bind('keyup blur', setState);
    });
  };
  // Make Zeptojs & jQuery Compatible
})(window.jQuery || window.Zepto, window);

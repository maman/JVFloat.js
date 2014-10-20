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
      var $el = $(this),
        el = $el[0], // native element
        placeholder = el.getAttribute("placeholder") || el.getAttribute("title"), // get placeholder with native function
        forId = $el.attr('id'),

        // added `required` input detection and state
        required = $el.attr('required') || '';

      // Wrap the input in div.jvFloat
      $el.wrap('<div class=jvFloat>');

      // adds a different class tag for text areas (.jvFloat .placeHolder.textarea) 
      // to allow better positioning of the element for multiline text area inputs
      var $label = null;

      function setState() {
        // change span.placeHolder to span.placeHolder.active
        var currentValue = $el.val();

        if (currentValue == null) {
          currentValue = '';
        } else if ($el.is('select')) {
          if (placeholder == currentValue) {
            currentValue = '';
          }
        }

        $label.toggleClass('active', currentValue !== '');
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
      if (!el.getAttribute('id')) {
        el.setAttribute('id', createIdOnElement($el));
      }

      $label = $('<label>', {
        "class": 'placeHolder ' + (el.tagName == 'TEXTAREA' ? 'textarea' : '') + required,
        "for": el.getAttribute('id'),
        "text": placeholder
      });

      $label.insertBefore($el);

      // checks to see if inputs are pre-populated and adds active to span.placeholder
      setState();
      $el.bind('keyup blur', setState);
    });
  };
  // Make Zeptojs & jQuery Compatible
})(window.jQuery || window.Zepto, window);

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
    return this.each(function _jv_float_each() {
      // create basic variables
      var
        $el = $(this),
        el = $el[0]; // native element

      // use tagName to define supported elements, if unsuported, break
      if (!(~['INPUT', 'TEXTAREA', 'SELECT'].indexOf(el.tagName)) || el.getAttribute('type') == 'submit') {
        return false;
      }

      // fix properties
      generate_id();

      // generate complete base structure
      var
        $parent = $el.parent('div.jvFloat'),
        $label = $parent.find('label.placeHolder[for="' + el.getAttribute('id') + '"]'),
        placeholder = el.getAttribute("placeholder") || el.getAttribute("title"), // get placeholder with native function
        // added `required` input detection and state
        required = el.getAttribute('required') || '';

      // if parent div don't exists, create it
      if ($parent.length == 0) {
        // Wrap the input in div.jvFloat
        $parent = $el.wrap('<div class=jvFloat>').parent('.jvFloat');
      }

      // if label for element don't exists, create it
      if ($label.length == 0) {

        // adds a different class tag for text areas (.jvFloat .placeHolder.textarea) 
        // to allow better positioning of the element for multiline text area inputs
        $label = $('<label>', {
          "class": 'placeHolder ' + (el.tagName == 'TEXTAREA' ? 'textarea' : '') + required,
          "for": el.getAttribute('id'),
          "text": placeholder
        });

        $parent.prepend($label);

      }


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
       * Generate a unique id if element not has one
       */
      function generate_id() {

        if (!el.getAttribute('id')) {

          // if window don't have UUID, create with 1, else append one each time
          !('JVFLOAT_UUID' in window) ? window.JVFLOAT_UUID = 1 : window.JVFLOAT_UUID += 1;

          el.setAttribute('id', [namespace, window.JVFLOAT_UUID].join('__'));

        }
      }




      // checks to see if inputs are pre-populated and adds active to span.placeholder
      setState();
      $el.bind('keyup blur', setState);
    });
  };
  // Make Zeptojs & jQuery Compatible
})(window.jQuery || window.Zepto, window);

;(function($) {

	// Document ready
//	$(function() {
//		$(".gform_wrapper form").labelfyCustom();
//	});

    $(document).on('ready gform_post_render', function()
    {
        //$('.gform_wrapper form').labelfyCustom();
        $('.label-to-placeholder').labelfyCustom();
    });

	/**
	 * Labelfy
	 *
	 * Faux placeholder text for forms. Built for adding in-field labels to Gravity Forms
	 * but works for any form that it's applied too with properly marked up labels with
	 * for attributes pointing to an input with an ID of the same value.
	 *
	 */
	
	$.fn.labelfyCustom = function() {

		return this.each(function() {

			// Maintain chainability
			var $this = $(this);

			// Iterate over each label in the form and apply our labelFactory function
			$this.find('label').each(function(i, value) {
				labelFactory($(this));
			});

			/**
			 * Label Factory
			 *
			 * This is where the magic happens. The placeholders and labels
			 * become one and everything comes together to form an element
			 * with a magical placeholder.
			 *
			 */
			function labelFactory(label) {

				// Get the for attribute value
				var forAttr = label.attr('for');

				// If we have a for attribute value
				if (typeof forAttr !== 'undefined')
                {
					// Find the element this label is for
					var theInput = $("#" + forAttr);

					// Get the text value of the label
					var labelText = label.text();

					// The parent form for validation purposes
					var theParent = theInput.parents('form');

					// The input doesn't exist, do a look up by name
					if (!theInput)
                    {
						// Maybe the user opted for name attributes instead of an ID?
						var inputSearchlight = $("input[name='"+forAttr+"'], textarea[name='"+forAttr+"']");

						// The user has correctly added name values without ID's no big deal.
						if (inputSearchlight)
							theInput = inputSearchlight;

					}

					// If the form has a class of show-labels, don't bother
					if (!theParent.hasClass('show-labels'))
                    {
						// Our element has passed the test
						if (isValidInput(theInput))
                        {
							// Remove the label, it's not needed any more
							label.remove();

							// Set the placeholder of our input to be that of the label text
							theInput.attr('placeholder', labelText);

                            // If the placeholder support function exists, use it for back support
                            if ( $.isFunction($.fn.placeholder) )
                                theInput.placeholder();

						}
					}

				}
			}

			/**
			 * Is Valid Input
			 *
			 * Checks if a supplied value is a valid input we can create our faux
			 * placeholder on. Checks for fields that aren't hidden mostly, but also
			 * ensures that the "no-labelfyCustom" class hasn't been added to our input.
			 *
			 */
			function isValidInput(input) {

				// If our input an an input or textarea and we want to labelfyCustom, proceed
				if (input.is('input') || input.is('textarea') && !input.hasClass('no-labelfyCustom')) {

					// Is this an input only? Check it's valid
					if (input.is('input')) {

						// Sometimes forms use HTML5 markup which is fine, but we need to check for it
						if (input.attr('type') == 'text' || input.attr('type') == 'email' || input.attr('type') == 'tel' || input.attr('type') == 'date') {
							return true;
						} else {
							return false;
						}

					} else if (input.is('textarea')) {
						return true;
					}

				} else {
					return false;
				}

			}

		});

	}

})(jQuery);
<?php

/**
 * Plugin Name: Infield Labels for Gravity Forms
 * Description: Make your Gravity Forms support in-field labels
 * Version: 1.0
 * Author: Dwayne Charrington
 * Author URI: http://dwaynecharrington.com
 * 
 * For the form plugin that mostly has it all, introducing
 * support for in-field labels for Gravity Forms.
 *
 * Be warned, this will remove all labels and add in-field labels
 * instead. Specifying a class of "no-labelfyCustom" on your input will
 * stop this plugin removing the label and adding an in-field one.
 *
 */

define('PLUGIN_DIR', plugin_dir_url(__FILE__));

// Enqueue the script using our custom function
add_action("gform_enqueue_scripts", "add_infield_labels_for_gf", 10, 2);


/**
 * Add Infield Labels for Gravity Forms
 */
function add_infield_labels_for_gf($form, $is_ajax) {
	// Enqueue the script baby
	wp_enqueue_script("labelfyCustom", PLUGIN_DIR . "labelfyCustom.js",array('jquery'));
}
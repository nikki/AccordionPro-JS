<?php
/*
Plugin Name:    Accordion Pro
Plugin URI:     http://accordionpro.nicolahibbert.com
Description:    Create jQuery powered horizontal accordions to embed into your WordPress posts &amp; pages.
Version:        1.0.0
Author:         Nicola Hibbert
Author:         Mike Rogers
Author URI:     http://nicolahibbert.com
Text Domain:    accordion_pro

Copyright 2011  Nicola Hibbert

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as 
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

// Prevents loading file directly
if (!class_exists('WP')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    die();
}

// Set up localisation
$locale = get_locale();
if (empty($locale)) $locale = 'en_US';
load_theme_textdomain('accordion_pro', dirname (__FILE__).'/locale/'.$locale.'.mo');

// Plugin version
define('ACCORDION_PRO_VERSION', '1.0.0');

// Require class
require('inc/accordion_pro.class.php');

// Instantiate plugin
global $accordion_pro;
$accordion_pro = new accordion_pro();

// Set options on init
register_activation_hook (__FILE__, 'init_options');
function init_options() {
    global $accordion_pro;
    $accordion_pro->init_options();
}
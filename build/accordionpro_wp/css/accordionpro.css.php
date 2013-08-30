<?php

/**
 * Get accordion IDs
 */

$ids = explode('-', $_GET['ids']);

/**
 * Sanitize accordion IDs
 */
function sanitize($val) {
  return preg_replace('/[^0-9_]/', '', $val);
}

foreach ($ids as $key => $value) {
  $ids[$key] = '#accordionPro' . sanitize($value);
}

/**
 * Output as CSS
 */

header('Content-type: text/css');

/**
 * Accordion CSS
 */

$css = file_get_contents('accordionpro.min.css');
$output = '';

foreach ($ids as $key => $value) {
  $output .= str_replace('.accordionPro', $value, $css) . "\n";
}

/**
 * User created css
 */

$additional = file_get_contents('additional.css');

/**
 * Output
 */

$copyright = <<<EOD
@charset 'utf-8';
/**
 * Project:    Accordion Pro - a responsive accordion plugin for jQuery
 * Author:     Nicola Hibbert
 * URL:        http://codecanyon.net/item/accordion-pro/1506395?ref=nicolahibbert
 * Demo:       http://accordionpro.nicolahibbert.com/
 *
 * Version:    1.0
 * Copyright:  (c) 2010-2013 Nicola Hibbert
 */

EOD;

echo $copyright, $output, $additional;
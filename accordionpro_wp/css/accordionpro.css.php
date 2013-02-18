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
 * Accordion css
 */

$css = file_get_contents('accordionpro.min.css');

print_r($ids);


$css = str_replace('.accordionPro', '#accordionPro' . $id, $css);

/**
 * User created css
 */

$additional = file_get_contents('additional.css');

/**
 * Output
 */

echo $css, $additional;
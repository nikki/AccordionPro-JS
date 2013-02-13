<?php

function sanitize($val) {
  return preg_replace('/[^0-9_]/', '', $val);
}

$id = sanitize($_GET['id']);

// output as css
header('Content-type: text/css');

$css = file_get_contents('accordionpro.min.css');
$css = str_replace('.accordionPro', '#accordionPro' . $id, $css);

echo $css;
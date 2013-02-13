<?php header('Content-type: text/css');

$accIds = '';

$css = file_get_contents('accordionpro.min.css');
/*$css = str_replace('.liteAccordion', '#accordionPro', $css);*/

echo $css;
<?php header('Content-type: text/css');

$accIds = '';

$css = file_get_contents('liteaccordion.css');
$css = str_replace('.liteAccordion', '#accordionPro', $css);

echo $css;
<?php header('Content-type: text/css');

$accIds = '';

$css = file_get_contents('accordionPro.min.css');
/*$css = str_replace('.accordionPro', '#accordionPro', $css);*/

echo $css;
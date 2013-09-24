<?php

/**
 * Prevents loading file directly
 */

if (!defined('WP')) {
  header('Status: 403 Forbidden');
  header('HTTP/1.1 403 Forbidden');
  die();
}

echo 'WP defined';

/**
 * Check referrer
 */

if (!is_admin() || !check_admin_referer('delete_data', 'accordion_pro')) die();

/**
 * Remove all options
 */

$options = array(
  'loadCSS',
  'loadjQuery',
  'loadJS',
  'loadJSEasing',
  'version',
  'additional_css'
);

foreach($options as $key) {
  delete_option('accordion_pro_' . $key);
}

/**
 * Remove all posts
 */

$posts = get_posts(array(
  'numberposts'     => -1, // Show all of them.
  'offset'          => 0,
  'orderby'         => 'post_date',
  'order'           => 'asc',
  'post_type'       => 'accordion',
  'post_status'     => 'publish'
));

foreach($posts as $post) {
  wp_delete_post($post->ID);
}

/**
 * Redirect back to plugins folder
 */
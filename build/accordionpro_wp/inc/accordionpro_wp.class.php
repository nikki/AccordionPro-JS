<?php
// prevents loading file directly
if (!class_exists('WP')) {
  header('Status: 403 Forbidden');
  header('HTTP/1.1 403 Forbidden');
  die();
}

class accordion_pro {

  public $notices,
  $options = array(
    'loadCSS'       => true,
    'loadjQuery'    => true,
    'loadJS'      => true,
    'loadJSEasing'    => true,
    'version'       => ACCORDION_PRO_VERSION
  ),
  $accContent = array(
    'content_title'         => array(),
    'content_caption'         => array(),
    'content_caption_enabled'   => array(),
    'content'           => array()
  ),
  $jQueryOptions = array(
    'theme'                 => 'basic',
    'easing'                => 'swing',
    'containerWidth'        => '960',
    'containerHeight'       => '320',
    'headerWidth'           => '48',
    'activateOn'            => 'click',
    'firstSlide'            => '1',
    'slideSpeed'            => '800',
    'autoPlay'              => false,
    'pauseOnHover'          => false,
    'cycleSpeed'            => '6000',
    'rounded'               => false,
    'enumerateSlides'       => false/*,
    'linkable'              => false*/
  );

  // Init
  public function __construct() {
    // Register Admin JS & CSS
    wp_register_style('accordion_pro_admin', WP_PLUGIN_URL . '/accordionpro_wp/css/admin.css');
    wp_register_script('accordion_pro_admin', WP_PLUGIN_URL . '/accordionpro_wp/js/admin.js', false, false, true);

    // Register Accordion JS & CSS
    wp_register_style('accordion_pro', WP_PLUGIN_URL . '/accordionpro_wp/css/accordionpro.css.php');
    wp_register_script('accordion_pro', WP_PLUGIN_URL . '/accordionpro_wp/js/jquery.accordionpro.min.js', false, false, false);
    // wp_register_script('accordion_pro_easing', WP_PLUGIN_URL . '/accordionpro_wp/js/jquery.easing.1.3.js', false, false, false);

    // Add the admin hooks/actions
    add_action('admin_init', array($this, 'admin_init'));
    add_action('admin_menu', array($this, 'admin_menu'));
    add_action('wp_ajax_admin_slide_tmpl', array($this, 'admin_slide_tmpl'));

    // Ensure jQuery is loaded in the head of the page to prevent race condition
    add_action('get_header', array($this, 'load_jquery'));

    // Add the shortcode
    add_shortcode('accordion_pro', array($this, 'get_accordion'));

    // Enable ability to execute shortcodes nested in slide content
    add_filter('the_content', 'do_shortcode');

    // Add the custom post type
    register_post_type(
      'accordion', array(
        'label'         => 'Accordion',
        'description'       => '',
        'public'        => false,
        'show_in_menu'      => false,
        'capability_type'     => 'post',
        'hierarchical'      => false,
        'rewrite'         => false,
        'query_var'       => true,
        'supports'        => array(
          'title',
          'editor',
          'custom-fields',
          'author'
        ),
        'labels'        => array (
          'name'        => 'Accordions',
          'singular_name'   => 'Accordion',
          'menu_name'     => 'Accordions',
          'add_new'       => 'Add Accordion',
          'add_new_item'    => 'Add New Accordion',
          'edit'        => 'Edit',
          'edit_item'     => 'Edit Accordion',
          'new_item'      => 'New Accordion',
          'view'        => 'View Accordion',
          'view_item'     => 'View Accordion',
          'search_items'    => 'Search Accordions',
          'not_found'     => 'No Accordions Found',
          'not_found_in_trash'=> 'No Accordions Found in Trash',
          'parent'      => 'Parent Accordion'
        )
      )
    );
  }

  // Init options on plugin activation
  public function init_options() {
    foreach ($this->options as $key => $value) {
      update_option('accordion_pro_'.$key, $value);
    }
  }

  // Loads the options for the plugin.
  public function load_options() {
    // Cycle through and update with the users settings.
    foreach ($this->options as $key => $value) {
      $this->options[$key] = get_option('accordion_pro_'.$key, $value);
    }
    return $this->options;
  }

  // This sets an option for the plugin.
  public function set_option($key, $value) {
    // If the value is currently a boolean, keep it that way.
    if (is_bool($this->options[$key])) $value = $value === '' ? false : true;

    // Now update it in the array/database
    $this->options[$key] = $value;
    update_option('accordion_pro_'.$key, $value);
  }

  // These 2 functions affix the plugin name to the post metas, making it less likely to conflict with other plugins.
  public function update_post_meta($id, $key, $value) {
    return update_post_meta($id, 'accordion_pro_'.$key, $value);
  }

  public function get_post_meta($id, $key) {
    return get_post_meta($id, 'accordion_pro_'.$key, true);
  }

  /* Plugin Helpers */
  // Sanitize a string (alphanumeric plus underscore only)
  public function sanitize($val) {
    return preg_replace('/[^a-zA-Z0-9_]/', '', $val);
  }

  // If a notice is set, then it can be displayed on the page.
  public function display_notices() {
    if (is_array($this->notices)) {
      echo '<div id="setting-error-settings_updated" class="updated settings-error">';
      foreach ($this->notices as $notice) {
        echo '<p>'.$notice.'</p>';
      }
      echo '</div>';
    }
  }

  // This generates a select field, based on the input arguments.
  public function showSelectField($field, $array, $selected) {
    $showCustom = true;

    echo '<label for="'.$field['name'].'">'.$field['title'].'</label><select id="'.$field['name'].'" name="'.$field['name'].'">';
    foreach ($array as $value => $title) {
      if ($selected == '') $selected = $value;
      echo '<option value="'.$value.'" ';

      // If the field is selected, select it and make custom not to be selected.
      if ($value == $selected) {
        echo ' selected="selected" ';
        $showCustom = false;
      }

      if ($value === 'custom' && $showCustom) echo ' selected="selected" ';
      echo '>'.$title.'</option>';
    }
    echo '</select>';

    // If we can show custom & user has picked a custom value.
    if (isset($array['custom']) && $showCustom !== false) { // ?
      echo '<input type="number" name="'.$field['name'].'" value="'.$selected.'" />';
    }
  }

  /* WP Actions */
  // Enqueue JS & CSS for admin section
  public function admin_init() {
    // check if we're on an accordion admin page
    // strpos can return 0 as first index, so need to check strict equality
    if (strpos($_GET['page'], 'accordion_pro') === false) return;

    wp_deregister_script('autosave'); // disable autosave

    wp_enqueue_script(array('jquery', 'accordion_pro_admin', 'editor', 'thickbox', 'media-upload'));
    wp_enqueue_style('accordion_pro_admin', 'thickbox');
  }

  // Adds links in sidebar
  public function admin_menu() {
    add_menu_page(__('Accordion Pro', 'accordion_pro'), __('Accordion Pro', 'accordion_pro'), 'manage_options', 'accordion_pro', array($this, 'admin_settings'));
    add_submenu_page( 'accordion_pro', __('Accordion Pro', 'accordion_pro').' - '.__('Manage Accordions', 'accordion_pro'), __('Manage Accordions', 'accordion_pro'), 'manage_options', 'accordion_pro', array($this, 'admin_settings'));
    add_submenu_page( 'accordion_pro', __('Accordion Pro', 'accordion_pro').' - '.__('Create Accordions', 'accordion_pro'), __('Create Accordions', 'accordion_pro'), 'manage_options', 'accordion_pro_add', array($this, 'admin_settings'));

    // settings page
    // add_submenu_page( 'accordion_pro', __('Accordion Pro', 'accordion_pro').' - '.__('Settings', 'accordion_pro'), __('Settings', 'accordion_pro'), 'manage_options', 'accordion_pro_settings', array($this, 'admin_settings'));
  }

  // Ensure jQuery loaded in head
  public function load_jquery() {
    wp_enqueue_script('jquery');
  }

  // Used to call the accordion based on id
  public function get_accordion($atts) {
    if (isset($atts) && is_array($atts)) {

      // load accordion css and js only into page with shortcode
      wp_enqueue_style('accordion_pro');
      wp_enqueue_script(array('accordion_pro_easing', 'accordion_pro'));

      // Return cached accordion html
      $accordion = $this->get_accordion_settings($atts['id']);

      return $accordion['post_content'];
    } else {
      return '';
    }
  }

  /* Admin Page */
  // Router
  public function admin_settings() {
      $get = array('page', 'mode', 'id');

      foreach ($get as $key) {
          if (isset($_GET[$key])) {
              $clean[$key] = $this->sanitize($_GET[$key]);
          }
      }

    // wrapper div
    echo '<div class="wrap"><div id="icon-themes" class="icon32"><br /></div>';

    // route pages
    if ($clean['page'] === 'accordion_pro' || $clean['page'] === 'accordion_pro_add') {
      if ($clean['page'] === 'accordion_pro_add') $clean['mode'] = 'add';

      if (in_array($clean['mode'], array('add', 'edit'))) {
        // add or edit accordion
        if (isset($_POST['save_accordion']) && check_admin_referer('add_edit', 'accordion_pro')) {
          $this->update_accordion();
          $clean['id'] = $this->sanitize($_GET['id']);
        }

        // set post title for new slide...
        $accordion['post_title'] = '';

        // ... overwritten if slide exists
        if ($clean['id']) {
          $accordion = $this->get_accordion_settings($clean['id'], true);
        }

        // inc slide manager page
        include('admin/manage.inc.php');
      } else {
        // If someone is adding/updating an accordion
        if (isset($_GET['delete_accordion']) && check_admin_referer('delete')) {
          $this->delete_accordion($clean['id']);
        }

        // inc overview page
        include('admin/overview.inc.php');
      }
    } /*else if ($page === 'accordion_pro_settings') {
      // save settings
      if (isset($_POST['save_settings']) && check_admin_referer('save_settings', 'accordion_pro')) {
        $this->updateSettings();
      }

      // inc setting page
      include('admin/settings.inc.php');
    }*/

    echo '</div>';
  }

  // Returns new slide editor via ajax
  public function admin_slide_tmpl() {
    $key = absint($_POST['data']['slideNum']);

    // inc slide template
    include('admin/template.inc.php');

    die();
  }

  /* Accordion management functions */
  // Deletes accordions
  public function delete_accordion($id, $notice=true) {
    wp_delete_post($id);
    if ($notice) $this->notices[] = __('Accordion Deleted.', 'accordion_pro');
  }

  // Updates the post data and tells the cache to be rebuilt.
  public function update_accordion() {
      $clean = array();
      if (isset($_GET['id'])) $clean['id'] = $this->sanitize($_GET['id']);
      if (isset($_POST['accordionName'])) $clean['title'] = $this->sanitize($_POST['accordionName']);

    // Build the post data
    $post = array(
        'post_title'      => $clean['title'],
        'post_content'    => '',
        'post_status'     => 'publish',
        'post_type'       => 'accordion', // Custom post types being used.
        'comment_status'  => 'closed',
        'ping_status'     => 'closed'
    );

    // Check if we're updating or adding a new post
    if ($clean['id']) {
      $post['ID'] = $clean['id'];
      unset($post['post_content']); // on slower systems, the accordion page may be blank for a few seconds while the cache updates.
      wp_insert_post($post);
      $this->notices[] = __('Accordion Updated. <a href="?page=accordion_pro">Manage</a>', 'accordion_pro');
    } else {
      $clean['id'] = $_GET['id'] = $post['ID'] = wp_insert_post($post); // So we can show the edit accordion page.
      $this->notices[] = __('Accordion Added. <a href="?page=accordion_pro">Manage</a>', 'accordion_pro');
    }

    foreach($this->jQueryOptions as $key=>$default) {
      $this->update_post_meta($post['ID'], $key, $this->sanitize($_POST[$key]));
    }

    // The content title and content are arrays, so serialize them.
    $this->update_post_meta($post['ID'], 'content_title', base64_encode(serialize($_POST['content_title'])));
    $this->update_post_meta($post['ID'], 'content_caption', base64_encode(serialize($_POST['content_caption'])));
    $this->update_post_meta($post['ID'], 'content_caption_enabled', base64_encode(serialize($_POST['content_caption_enabled'])));
    $this->update_post_meta($post['ID'], 'content', base64_encode(serialize($_POST['content'])));

    // Now make the cache
    $this->update_accordionCache($this->get_accordion_settings($clean['id'], true));
  }

  // this generates the html for the accordion and saves it in the post content area.
  public function update_accordionCache($accordion) {
    global $allowedposttags;

    $extratags = array();

    $extratags['object'] = array(
      'height' => array(),
      'width' => array()
    );

    $extratags['param'] = array(
      'name' => array(),
      'value' => array()
    );

    $extratags['embed'] = array(
      'src' => array(),
      'type' => array(),
      'allowfullscreen' => array(),
      'allowscriptaccess' => array(),
      'height' => array(),
      'width' => array(),
      'wmode' => array()
    );

    $allowedextratags = array_merge($extratags, $allowedposttags);

    // Generate the 'post_content', which is a cached version of the html
    $accordion['post_content'] = '<div id="accordion" class="accordion_pro_'.$accordion['ID'].'"><ol>';

    // esc html on title
    // allow tags on caption
    // allow tags + extra tags (object, embed) for content
    if (!empty($accordion['acc_content']['content']) && is_array($accordion['acc_content']['content'])) {
      foreach($accordion['acc_content']['content'] as $key => $content) {

        // post content
        $accordion['post_content'] .= '<li><h2><span>'.esc_html($accordion['acc_content']['content_title'][$key]).'</span></h2><div>'.wp_kses_post($content, $allowedextratags);

        // caption
        if ($accordion['acc_content']['content_caption_enabled'][$key]) {
          $accordion['post_content'] .= '<div class="ap-caption ap-caption-'.$key.'">'.wp_kses_post($accordion['acc_content']['content_caption'][$key]).'</div>';
          $jqueryOptions['onTriggerSlide'] = 'onTriggerSlide: function() { this.find(".ap-caption").fadeOut(); }';
          $jqueryOptions['onSlideAnimComplete'] = 'onSlideAnimComplete: function() { this.find(".ap-caption").fadeIn(); }';
        }

        // end post content
        $accordion['post_content'] .= '</div></li>';
      }
    }

    // end container
    $accordion['post_content'] .= '</ol><noscript><p>'.__('Please enable JavaScript to get the full experience.', 'accordion_pro').'</p></noscript></div>';

    // js to instantiate accordion
    $accordion['post_content'] .= '<script type="text/javascript">jQuery(function($) { $(\'.accordion_pro_'.$accordion['ID'].'\').accordionPro({ ';

    // accordion user opts
    foreach ($this->jQueryOptions as $key => $default) {
      if ($accordion['jQuerySettings'][$key] != $default) {
        if (is_bool($default) || is_numeric($default)) {
          $jqueryOptions[] = $key.': '.$accordion['jQuerySettings'][$key];
        } else {
          $jqueryOptions[] = $key.': \''.addslashes($accordion['jQuerySettings'][$key]).'\'';
        }
      }
    }

    if (is_array($jqueryOptions)) {
      $accordion['post_content'] .= implode(', ', $jqueryOptions);
    }

    $accordion['post_content'] .= ' }).show(); });'; // fixes FOUC
    $accordion['post_content'] .= '</script>';

    wp_insert_post($accordion);
  }

  // Gets the accordion post.
  public function get_accordion_settings($id, $getPostMeta=false) {
    $accordion = get_post($id, 'ARRAY_A');

    if ($accordion === null) { // Meaning we can't find the accordion.
      $accordion['post_title'] = '';
    }

    if ($getPostMeta == true) {
      // Set slide contents
      $accordion['acc_content'] = $this->accContent;
      $accordion['acc_content_temp'] = '';

      foreach($this->accContent as $key=>$default) {
        $accordion['acc_content_temp'][$key] = $this->get_post_meta($id, $key);

        $accordion['acc_content'][$key] = $default;
        if ($accordion['acc_content_temp'][$key] != '') {
          $accordion['acc_content'][$key] = $this->get_post_meta($id, $key);
        }
      }
      unset($accordion['acc_content_temp']);

      if (!empty($accordion['acc_content']['content'])) {
        $accordion['acc_content']['content_title'] = unserialize(base64_decode($accordion['acc_content']['content_title']));
        $accordion['acc_content']['content_caption'] = unserialize(base64_decode($accordion['acc_content']['content_caption']));
        $accordion['acc_content']['content_caption_enabled'] = unserialize(base64_decode($accordion['acc_content']['content_caption_enabled']));
        $accordion['acc_content']['content'] = unserialize(base64_decode($accordion['acc_content']['content']));
      }

      // Set the jQuery settings
      $accordion['jQuerySettings'] = $this->jQueryOptions; // this sets the default options.
      $accordion['jQuerySettings_temp'] = ''; // used as a temp holding for checking if an option is empty.
      foreach ($this->jQueryOptions as $key=>$default) {
        $accordion['jQuerySettings_temp'][$key] = $this->get_post_meta($id, $key);

        // If it's blank, we will use the default, otherwise use the value form _temp
        $accordion['jQuerySettings'][$key] = $default;
        if ($accordion['jQuerySettings_temp'][$key] != '') {
          $accordion['jQuerySettings'][$key] = $this->get_post_meta($id, $key);
        }
      }
      unset($accordion['jQuerySettings_temp']); // free up a little memory.
    }

    return $accordion;
  }

  // Update settings
  public function updateSettings() {
    foreach ($this->options as $key) {
      $this->set_option($key, $this->sanitize($_POST[$key]));
    }

    // Throw a notice
    $this->notices[] = __('Settings Updated.', 'accordion_pro');
  }
}
?>
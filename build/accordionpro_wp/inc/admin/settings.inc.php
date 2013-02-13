<?php
// prevents loading file directly
if (!class_exists('WP')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    die();
}
?>

<h2><?php _e('Accordion Pro', 'accordion_pro'); ?> - <?php _e('Settings', 'accordion_pro'); ?></h2>

<?php $this->display_notices(); ?>

<form method="post" action="?page=accordion_pro_settings">
	<table class="form-table">
		<tbody>
			<tr valign="top">
				<th scope="row"><label for="loadCSS"><?php _e('Load CSS in HEAD tag', 'accordion_pro'); ?></label></th>
				<td><input type="hidden" name="loadCSS" value="" /><input name="loadCSS" id="loadCSS" type="checkbox" value="true" <?php echo ($this->options['loadCSS']?'checked':''); ?> ></td>
			</tr>
			<tr valign="top">
				<th scope="row"><label for="loadjQuery"><?php _e('Load jQuery in HEAD tag', 'accordion_pro'); ?></label></th>
				<td><input type="hidden" name="loadjQuery" value="" /><input name="loadjQuery" id="loadjQuery" type="checkbox" value="true" <?php echo ($this->options['loadjQuery']?'checked':''); ?> ></td>
			</tr>
			<tr valign="top">
				<th scope="row"><label for="loadJSEasing"><?php _e('Load jQuery Easing in HEAD tag', 'accordion_pro'); ?></label></th>
				<td><input type="hidden" name="loadJSEasing" value="" /><input name="loadJSEasing" id="loadJSEasing" type="checkbox" value="true" <?php echo ($this->options['loadJSEasing']?'checked':''); ?> ></td>
			</tr>
			<tr valign="top">
				<th scope="row"><label for="loadJS"><?php _e('Load JavaScript in HEAD tag', 'accordion_pro'); ?></label></th>
				<td><input type="hidden" name="loadJS" value="" /><input name="loadJS" id="loadJS" type="checkbox" value="true" <?php echo ($this->options['loadJS']?'checked':''); ?> ></td>
			</tr>
			<!--<tr valign="top">
				<th scope="row"><label for="runJSInline"><?php _e('Run JavaScript inline', 'accordion_pro'); ?></label></th>
				<td><input type="hidden" name="runJSInline" value="" /><input name="runJSInline" id="runJSInline" type="checkbox" value="true" <?php echo ($this->options['runJSInline']?'checked':''); ?> >
				<span><?php _e('If unchecked, JavaScript will run in the footer of the site.', 'accordion_pro'); ?></span></td>
			</tr>-->
		</tbody>
	</table>
	<p class="submit"><input type="submit" name="save_settings" id="save_settings" class="button-primary" value="<?php _e('Save Settings', 'accordion_pro'); ?>"></p>
	<?php wp_nonce_field('save_settings', 'accordion_pro'); ?>
</form>

<form method="post" action="?page=accordion_pro">
	<p><?php _e('If you wish to remove all the data associated with this plugin, use the uninstall button below.', 'accordion_pro'); ?></p>
	<p class="submit"><input type="submit" name="uninstall" id="uninstall" class="button-primary" value="<?php _e('Uninstall', 'accordion_pro'); ?>"></p>
	<?php wp_nonce_field('uninstall', 'accordion_pro'); ?>
</form>
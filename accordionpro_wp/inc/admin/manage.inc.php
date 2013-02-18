<?php
/**
 * Prevents loading file directly
 */

if (!class_exists('WP')) {
  header('Status: 403 Forbidden');
  header('HTTP/1.1 403 Forbidden');
  die();
}
?>

<h2 class="ap-title">
	<?php _e('Accordion Pro', 'accordion_pro'); ?> -
	<?php
		if ($clean['mode'] === 'add') {
			_e('Add Accordion', 'accordion_pro');
		} else if ($clean['mode'] === 'edit') {
			_e('Edit Accordion', 'accordion_pro');
		}
	?>
</h2>

<?php $this->display_notices(); ?>

<form method="post" action="?page=accordion_pro&mode=edit<?php if(isset($_GET['id'])) { echo '&id='.$this->sanitize($_GET['id']); } ?>">

	<div class="ap-left">
		<div class="ap-slides metabox-holder">

			<?php

			$settings = array(
				'textarea_name' => 'content[]',
				'teeny' => true,
				'textarea_rows' => 6
			);

			if (!empty($accordion['acc_content']['content']) && is_array($accordion['acc_content']['content'])) {
				foreach($accordion['acc_content']['content'] as $key => $content) {

					?>
						<div class="postbox ap-slide">
							<div class="ap-toggle handlediv" title="Click to toggle"></div>
							<h3>
								<span>Slide <?php echo $key + 1; ?></span>
							</h3>
							<div class="ap-inner">
								<div class="ap-slide-title">
									<label for="ap-slide-title-<?php echo $key + 1; ?>">Slide Title: </label>
									<input name="content_title[]" id="ap-slide-title-<?php echo $key + 1; ?>" type="text" value="<?php echo stripslashes($accordion['acc_content']['content_title'][$key]); ?>" />
								</div>
								<div class="ap-slide-caption">
									<label for="ap-slide-caption-<?php echo $key + 1; ?>">Caption: </label>
									<input name="content_caption[]" id="ap-slide-caption-<?php echo $key + 1; ?>" class="ap-slide-caption-input <?php if (!$accordion['acc_content']['content_caption_enabled'][$key]) { echo 'disabled'; } ?>" type="text" value="<?php echo stripslashes($accordion['acc_content']['content_caption'][$key]); ?>" />
									<label for="ap-slide-caption-enabled-<?php echo $key + 1; ?>" class="ap-slide-caption-enabled">Enabled?
									</label>
									<input name="content_caption_enabled[<?php echo $key ?>]" id="ap-slide-caption-enabled-<?php echo $key + 1; ?>" class="ap-slide-caption-checkbox" type="checkbox" <?php if (isset($accordion['acc_content']['content_caption_enabled'][$key])) checked(true); ?> />
								</div>
								<?php
									// textarea id must be alphanumeric
									wp_editor(stripslashes($content), 'apeditor'.($key + 1), $settings);
									if ($key) echo '<input class="ap-remove" type="button" value="'.__('Remove Slide '.($key + 1), 'accordion_pro').'" data-confirm="'.__('Are you sure you want to remove this slide?', 'accordion_pro').'" />';
								?>
								<input type="hidden" id="ap-slide-<?php echo $key + 1; ?>" class="ap-slide-num" value="<?php echo $key + 1; ?>" />
							</div>
						</div>
					<?php
				}
			} else {
					?>
					<div class="postbox ap-slide">
						<div class="ap-toggle handlediv" title="Click to toggle"></div>
						<h3>
							<span>Slide 1</span>
						</h3>
						<div class="ap-inner">
							<div class="ap-slide-title">
								<label for="ap-slide-title-1">Slide Title: </label>
								<input name='content_title[]' id="ap-slide-title-1" type="text" value="" />
							</div>
							<div class="ap-slide-caption">
								<label for="ap-slide-caption-1">Caption: </label>
								<input name="content_caption[]" id="ap-slide-caption-1" class="ap-slide-caption-input disabled" type="text" value="" />
								<label for="ap-slide-caption-enabled-1" class="ap-slide-caption-enabled">Enabled? </label>
								<input name="content_caption_enabled[]" id="ap-slide-caption-enabled-1" class="ap-slide-caption-checkbox" type="checkbox" />
							</div>
							<?php
								// textarea id must be alphanumeric
								wp_editor('', 'apeditor1', $settings);
							?>
							<input type="hidden" id="ap-slide-1" class="ap-slide-num" value="1" />
						</div>
					</div>
				<?php
			}
				?>

			<input id="ap-add" type="button" value="<?php _e('Add Another Slide', 'accordion_pro'); ?>" />
			<div class="ap-wait"></div>
			<input type="submit" name="save_accordion" class="button-primary ap-save" value="<?php _e('Save Accordion', 'accordion_pro'); ?>" />
		</div><!-- /ap-slides -->
	</div><!-- /ap-left -->
	<div class="ap-right">
		<div class="ap-options metabox-holder">
			<div class="postbox">
				<h3><span><?php _e('Accordion', 'accordion_pro'); ?></span></h3>
				<div class="inside">
					<p class="accordionName">
					    <label for="accordionName"><?php _e('Name', 'accordion_pro'); ?></label>
						<input id="accordionName" name="accordionName" value="<?php echo $accordion['post_title']; ?>" required placeholder="<?php _e('Accordion Name', 'accordion_pro'); ?>" />
					</p>
					<p class="submit">
			            <input type="submit" name="save_accordion" class="button-primary" value="<?php _e('Save Accordion', 'accordion_pro'); ?>" />
			        </p>
				</div>
			</div>

			<div class="postbox">
				<h3><span><?php _e('Accordion Options (Basic)', 'accordion_pro'); ?></span></h3>
				<div class="inside">
					<p>
						<?php
							$this->showSelectField(array('name'=>__('theme', 'accordion_pro'), 'title'=>__('Theme', 'accordion_pro')),array('basic'=>__('Basic', 'accordion_pro'), 'dark'=>__('Dark', 'accordion_pro'), 'light'=>__('Light', 'accordion_pro'), 'stitch'=>__('Stitch', 'accordion_pro')), $accordion['jQuerySettings']['theme'])
						?>
					</p>
					<p>
						<?php
							$this->showSelectField(array('name'=>__('easing', 'accordion_pro'), 'title'=>__('Easing', 'accordion_pro')),array('swing'=>__('Swing', 'accordion_pro'), 'jswing'=>__('jSwing', 'accordion_pro'), 'linear'=>__('Linear', 'accordion_pro'), 'easeInQuad'=>__('easeInQuad', 'accordion_pro'), 'easeOutQuad'=>__('easeOutQuad', 'accordion_pro'), 'easeInOutQuad'=>__('easeInOutQuad', 'accordion_pro'), 'easeInCubic'=>__('easeInCubic', 'accordion_pro'), 'easeOutCubic'=>__('easeOutCubic', 'accordion_pro'), 'easeInQuart'=>__('easeInQuart', 'accordion_pro'), 'easeOutQuart'=>__('easeOutQuart', 'accordion_pro'), 'easeInOutQuart'=>__('easeInOutQuart', 'accordion_pro'), 'easeInQuint'=>__('easeInQuint', 'accordion_pro'), 'easeOutQuint'=>__('easeOutQuint', 'accordion_pro'), 'easeInOutQuint'=>__('easeInOutQuint', 'accordion_pro'), 'easeInSine'=>__('easeInSine', 'accordion_pro'), 'easeOutSine'=>__('easeOutSine', 'accordion_pro'), 'easeInOutSine'=>__('easeInOutSine', 'accordion_pro'), 'easeInExpo'=>__('easeInExpo', 'accordion_pro'), 'easeOutExpo'=>__('easeOutExpo', 'accordion_pro'), 'easeInOutExpo'=>__('easeInOutExpo', 'accordion_pro'), 'easeInCirc'=>__('easeInCirc', 'accordion_pro'), 'easeOutCirc'=>__('easeOutCirc', 'accordion_pro'), 'easeInOutCirc'=>__('easeInOutCirc', 'accordion_pro'), 'easeInElastic'=>__('easeInElastic', 'accordion_pro'), 'easeOutElastic'=>__('easeOutElastic', 'accordion_pro'), 'easeOutElastic'=>__('easeOutElastic', 'accordion_pro'), 'easeInOutElastic'=>__('easeInOutElastic', 'accordion_pro'), 'easeInBack'=>__('easeInBack', 'accordion_pro'), 'easeOutBack'=>__('easeOutBack', 'accordion_pro'), 'easeInOutBack'=>__('easeInOutBack', 'accordion_pro'), 'easeInBounce'=>__('easeInBounce', 'accordion_pro'), 'easeOutBounce'=>__('easeOutBounce', 'accordion_pro'), 'easeInOutBounce'=>__('easeInOutBounce', 'accordion_pro')), $accordion['jQuerySettings']['easing']);
						?>
					</p>
					<p>
						<?php
							$this->showSelectField(array('name'=>__('containerWidth', 'accordion_pro'), 'title'=>__('Container Width', 'accordion_pro')),array('960'=>__('default (960px)', 'accordion_pro'), 'custom'=>__('... or enter a custom numeric value', 'accordion_pro')), $accordion['jQuerySettings']['containerWidth']);
						?>
					</p>
					<p>
						<?php
							$this->showSelectField(array('name'=>__('containerHeight', 'accordion_pro'), 'title'=>__('Container Height', 'accordion_pro')),array('320'=>__('default (320px)', 'accordion_pro'), 'custom'=>__('... or enter a custom numeric value', 'accordion_pro')), $accordion['jQuerySettings']['containerHeight']);
						?>
					</p>
					<p>
						<?php
							$this->showSelectField(array('name'=>__('headerWidth', 'accordion_pro'), 'title'=>__('Header Width', 'accordion_pro')),array('48'=>__('default (48px)', 'accordion_pro'), 'custom'=>__('... or enter a custom numeric value', 'accordion_pro')), $accordion['jQuerySettings']['headerWidth']);
						?>
					</p>

				</div>
			</div>

			<div class="postbox">
				<h3><span><?php _e('Accordion Options (Advanced)', 'accordion_pro'); ?></span></h3>
				<div class="inside">
					<p>
						<?php
							$this->showSelectField(array('name'=>__('activateOn', 'accordion_pro'), 'title'=>__('activateOn', 'accordion_pro')),array('click'=>__('click', 'accordion_pro'), 'mouseover'=>__('mouseover', 'accordion_pro')), $accordion['jQuerySettings']['activateOn']);
						?>
					</p>
					<p>
						<?php
							$this->showSelectField(array('name'=>__('firstSlide', 'accordion_pro'), 'title'=>__('firstSlide', 'accordion_pro')),array('1'=>__('1', 'accordion_pro'), 'custom'=>__('... or enter a custom numeric value', 'accordion_pro')), $accordion['jQuerySettings']['firstSlide']);
						?>
					</p>
					<p>
						<?php
							$this->showSelectField(array('name'=>__('slideSpeed', 'accordion_pro'), 'title'=>__('slideSpeed', 'accordion_pro')),array('800'=>__('800', 'accordion_pro'), 'custom'=>__('... or enter a custom numeric value', 'accordion_pro')), $accordion['jQuerySettings']['slideSpeed']);
						?>
					</p>
					<p>
						<?php
							$this->showSelectField(array('name'=>__('autoPlay', 'accordion_pro'), 'title'=>__('autoPlay', 'accordion_pro')),array('false'=>__('false', 'accordion_pro'), 'true'=>__('true', 'accordion_pro')), $accordion['jQuerySettings']['autoPlay']);
						?>
					</p>
					<p>
						<?php
							$this->showSelectField(array('name'=>__('pauseOnHover', 'accordion_pro'), 'title'=>__('pauseOnHover', 'accordion_pro')),array('false'=>__('false', 'accordion_pro'), 'true'=>__('true', 'accordion_pro')), $accordion['jQuerySettings']['pauseOnHover']);
						?>
					</p>
					<p>
						<?php
							$this->showSelectField(array('name'=>__('cycleSpeed', 'accordion_pro'), 'title'=>__('cycleSpeed', 'accordion_pro')),array('6000'=>__('6000', 'accordion_pro'), 'custom'=>__('... or enter a custom numeric value', 'accordion_pro')), $accordion['jQuerySettings']['cycleSpeed']);
						?>
					</p>
					<p>
						<?php
							$this->showSelectField(array('name'=>__('rounded', 'accordion_pro'), 'title'=>__('rounded', 'accordion_pro')),array('false'=>__('false', 'accordion_pro'), 'true'=>__('true', 'accordion_pro')), $accordion['jQuerySettings']['rounded']);
						?>
					</p>
					<p>
						<?php
							$this->showSelectField(array('name'=>__('enumerateSlides', 'accordion_pro'), 'title'=>__('enumerateSlides', 'accordion_pro')),array('false'=>__('false', 'accordion_pro'), 'true'=>__('true', 'accordion_pro')), $accordion['jQuerySettings']['enumerateSlides']);
						?>
					</p>
					<p>
						<?php /* !!! TODO v1.1
							$this->showSelectField(array('name'=>__('linkable', 'accordion_pro'), 'title'=>__('Linkable', 'accordion_pro')),array('false'=>__('false', 'accordion_pro'), 'true'=>__('true', 'accordion_pro')), $accordion['jQuerySettings']['linkable']);
						*/ ?>
					</p>
				</div>
			</div>
		</div><!-- /ap-options -->
	</div>
<?php wp_nonce_field('add_edit', 'accordion_pro'); ?>
</form>

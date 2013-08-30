<?php
/**
 * Prevents loading file directly
 */

if (!class_exists('WP') || !is_admin()) {
  header('Status: 403 Forbidden');
  header('HTTP/1.1 403 Forbidden');
  die();
}
?>

<h2 class="ap-title">
	<?php
		if ($clean['mode'] === 'add') {
			_e('Create Accordion', 'accordion_pro');
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

			<input id="ap-add" type="button" class="button-secondary" value="<?php _e('Add Another Slide', 'accordion_pro'); ?>" />
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

<!--
			/* aesthetics */
      theme : 'basic',                        // basic, dark, light, or stitch
      rounded : false,                        // square or rounded corners
      rtl : false,                            // right to left layout
      showSlideNumbers : true,                // display numbers on slides -->

			<div class="postbox">
				<h3><span><?php _e('Display Options', 'accordion_pro'); ?></span></h3>
				<div class="inside">
					<?php
						$this->showField(
							'select',
							array(
								'name'=>__('theme', 'accordion_pro'),
								'title'=>__('Theme', 'accordion_pro'),
								'alt'=>__("Choose from basic, dark, light, or stitch themes", 'accordion_pro')),
							array(
								'basic'=>__('basic', 'accordion_pro'),
								'dark'=>__('dark', 'accordion_pro'),
								'light'=>__('light', 'accordion_pro'),
								'stitch'=>__('stitch', 'accordion_pro')),
							$accordion['jQuerySettings']['theme']);

						$this->showField(
							'select',
							array(
								'name'=>__('rounded', 'accordion_pro'),
								'title'=>__('Rounded', 'accordion_pro'),
								'alt'=>__('Square or rounded corners', 'accordion_pro')),
							array(
								'false'=>__('false', 'accordion_pro'),
								'true'=>__('true', 'accordion_pro')),
							$accordion['jQuerySettings']['rounded']);

						$this->showField(
							'select',
							array(
								'name'=>__('rtl', 'accordion_pro'),
								'title'=>__('Right to Left', 'accordion_pro'),
								'alt'=>__("Right to left display", 'accordion_pro')),
							array(
								'false'=>__('false', 'accordion_pro'),
								'true'=>__('true', 'accordion_pro')),
							$accordion['jQuerySettings']['rtl']);

						$this->showField(
							'select',
							array(
								'name'=>__('showSlideNumbers', 'accordion_pro'),
								'title'=>__('Show Slide Numbers', 'accordion_pro'),
								'alt'=>__('Display numbers on slides', 'accordion_pro')),
							array(
								'true'=>__('true', 'accordion_pro'),
								'false'=>__('false', 'accordion_pro')),
							$accordion['jQuerySettings']['showSlideNumbers']);
					?>
				</div>
			</div>

<!--
			/* layout */
      orientation : 'horizontal',             // 'horizontal' or 'vertical' accordion
      startClosed : false,                    // start in a closed position
      firstSlide : 1,                         // displays slide (n) on page load -->

			<div class="postbox">
				<h3><span><?php _e('Layout Options', 'accordion_pro'); ?></span></h3>
				<div class="inside">
					<?php
						$this->showField(
							'select',
							array(
								'name'=>__('orientation', 'accordion_pro'),
								'title'=>__('Orientation', 'accordion_pro'),
								'alt'=>__("Create either a horizontal or a vertical accordion", 'accordion_pro')),
							array(
								'horizontal'=>__('horizontal', 'accordion_pro'),
								'vertical'=>__('vertical', 'accordion_pro')),
							$accordion['jQuerySettings']['orientation']);

						$this->showField(
							'select',
							array(
								'name'=>__('startClosed', 'accordion_pro'),
								'title'=>__('Start Closed', 'accordion_pro'),
								'alt'=>__('Start accordion in a closed position', 'accordion_pro')),
							array(
								'false'=>__('false', 'accordion_pro'),
								'true'=>__('true', 'accordion_pro')),
							$accordion['jQuerySettings']['startClosed']);

						$this->showField(
							'input',
							array(
								'name'=>__('firstSlide', 'accordion_pro'),
								'title'=>__('First Slide', 'accordion_pro'),
								'alt'=>__('Display slide (n) on page load', 'accordion_pro')),
							null,
							$accordion['jQuerySettings']['firstSlide']);
					?>
				</div>
			</div>

<!--
			/* horizontal accordion options */
      horizontalWidth : 900,                  // base width; fixed (px [integer]) - responsive scaling is relative to this value
      horizontalHeight : 300,                 // base horizontal accordion height; fixed (px [integer]) - responsive scaling is relative to this value
      responsive : true,                      // accordion will adapt itself to the page layout, based on width of parent element
      minResponsiveWidth : 400,               // horizontal accordion will flip to vertical at (and below) this width
      maxResponsiveWidth : 1020,              // accordion will not scale up beyond this width -->

			<div id="horizontal-opts" class="postbox">
				<h3><span><?php _e('Horizontal Accordion Options', 'accordion_pro'); ?></span></h3>
				<div class="inside">
					<?php
						$this->showField(
							'input',
							array(
								'name'=>__('horizontalWidth', 'accordion_pro'),
								'title'=>__('Horizontal Accordion Width (px)', 'accordion_pro'),
								'alt'=>__('Base horizontal accordion width - responsive scaling is relative to this value', 'accordion_pro')),
							null,
							$accordion['jQuerySettings']['horizontalWidth']);

						$this->showField(
							'input',
							array(
								'name'=>__('horizontalHeight', 'accordion_pro'),
								'title'=>__('Horizontal Accordion Height (px)', 'accordion_pro'),
								'alt'=>__('Base horizontal accordion height - responsive scaling is relative to this value', 'accordion_pro')),
							null,
							$accordion['jQuerySettings']['horizontalHeight']);

						$this->showField(
							'select',
							array(
								'name'=>__('responsive', 'accordion_pro'),
								'title'=>__('Responsive', 'accordion_pro'),
								'alt'=>__('Accordion will adapt itself to the page layout, based on width of parent element', 'accordion_pro')),
							array(
								'true'=>__('true', 'accordion_pro'),
								'false'=>__('false', 'accordion_pro')),
							$accordion['jQuerySettings']['responsive']);

						$this->showField(
							'input',
							array(
								'name'=>__('minResponsiveWidth', 'accordion_pro'),
								'title'=>__('Minimum Responsive Width (px)', 'accordion_pro'),
								'alt'=>__('Horizontal accordion will flip to vertical accordion at (and below) this width', 'accordion_pro')),
							null,
							$accordion['jQuerySettings']['minResponsiveWidth']);

						$this->showField(
							'input',
							array(
								'name'=>__('maxResponsiveWidth', 'accordion_pro'),
								'title'=>__('Maximum Responsive Width (px)', 'accordion_pro'),
								'alt'=>__('Horizontal accordion will not scale up beyond this width', 'accordion_pro')),
							null,
							$accordion['jQuerySettings']['maxResponsiveWidth']);
					?>
				</div>
			</div>

<!--
			/* vertical accordion options */
      verticalWidth : '100%',                 // fixed (px [integer]) or fluid (% [string])
      verticalHeight : 600,                   // base vertical accordion height; fixed (px [integer])
      verticalSlideHeight : 'fixed',          // vertical accordion slide heights can be 'fixed' or 'fitToContent' -->

			<div id="vertical-opts" class="postbox">
				<h3><span><?php _e('Vertical Accordion Options', 'accordion_pro'); ?></span></h3>
				<div class="inside">
					<?php
						$this->showField(
							'input',
							array(
								'name'=>__('verticalWidth', 'accordion_pro'),
								'title'=>__('Vertical Width (px or %)', 'accordion_pro'),
								'alt'=>__('Sets the width of vertical accordion', 'accordion_pro')),
							null,
							$accordion['jQuerySettings']['verticalWidth'], $accordion['jQuerySettings']['verticalWidthUnit']);

						$this->showField(
							'input',
							array(
								'name'=>__('verticalHeight', 'accordion_pro'),
								'title'=>__('Vertical Accordion Height (px)', 'accordion_pro'),
								'alt'=>__('Base vertical accordion height', 'accordion_pro')),
							null,
							$accordion['jQuerySettings']['verticalHeight']);

						$this->showField(
							'select',
							array(
								'name'=>__('verticalSlideHeight', 'accordion_pro'),
								'title'=>__('Vertical Slide Height', 'accordion_pro'),
								'alt'=>__('Vertical accordion slide heights can be fixed or fitToContent', 'accordion_pro')),
							array(
								'fixed'=>__('fixed', 'accordion_pro'),
								'fitToContent'=>__('fitToContent', 'accordion_pro')),
							$accordion['jQuerySettings']['verticalSlideHeight']);
					?>
				</div>
			</div>

<!--
			/* events */
      activateOn : 'click',                   // click or mouseover
      touchEnabled : true,                    // touch events? -->

<!--
			/* miscellaneous */
      pauseOnHover : true,                    // pause on hover
      linkable : false                        // link slides via hash -->

			<div class="postbox">
				<h3><span><?php _e('Events', 'accordion_pro'); ?></span></h3>
				<div class="inside">
					<?php
						$this->showField(
							'select',
							array(
								'name'=>__('activateOn', 'accordion_pro'),
								'title'=>__('Activate On...', 'accordion_pro'),
								'alt'=>__('Accordion can be activated on click or mouseover', 'accordion_pro')),
							array(
								'click'=>__('click', 'accordion_pro'),
								'mouseover'=>__('mouseover', 'accordion_pro')),
							$accordion['jQuerySettings']['activateOn']);

						$this->showField(
							'select',
							array(
								'name'=>__('touchEnabled', 'accordion_pro'),
								'title'=>__('Touch Enabled', 'accordion_pro'),
								'alt'=>__('Accordion is touch enabled?', 'accordion_pro')),
							array(
								'true'=>__('true', 'accordion_pro'),
								'false'=>__('false', 'accordion_pro')),
							$accordion['jQuerySettings']['touchEnabled']);

						$this->showField(
							'select',
							array(
								'name'=>__('pauseOnHover', 'accordion_pro'),
								'title'=>__('Pause On Hover', 'accordion_pro'),
								'alt'=>__('Pause slides if you hover over them when autoPlay is on', 'accordion_pro')),
							array(
								'true'=>__('true', 'accordion_pro'),
								'false'=>__('false', 'accordion_pro')),
							$accordion['jQuerySettings']['pauseOnHover']);

						$this->showField(
							'select',
							array(
								'name'=>__('linkable', 'accordion_pro'),
								'title'=>__('Linkable', 'accordion_pro'),
								'alt'=>__('Link to slides via #hash', 'accordion_pro')),
							array(
								'false'=>__('false', 'accordion_pro'),
								'true'=>__('true', 'accordion_pro')),
							$accordion['jQuerySettings']['linkable']);
					?>
				</div>
			</div>

<!--
			/* animations */
      autoPlay : false,                       // automatically cycle through slides
      cycleSpeed : 6000,                      // time between slide cycles
      slideSpeed : 800,                       // slide animation speed
      easing : 'ease-in-out',                 // animation easing -->

			<div class="postbox">
				<h3><span><?php _e('Animation Options', 'accordion_pro'); ?></span></h3>
				<div class="inside">
					<?php
						$this->showField(
							'select',
							array(
								'name'=>__('autoPlay', 'accordion_pro'),
								'title'=>__('AutoPlay', 'accordion_pro'),
								'alt'=>__('Automatically cycle through slides', 'accordion_pro')),
							array(
								'false'=>__('false', 'accordion_pro'),
								'true'=>__('true', 'accordion_pro')),
							$accordion['jQuerySettings']['autoPlay']);

						$this->showField(
							'input',
							array(
								'name'=>__('cycleSpeed', 'accordion_pro'),
								'title'=>__('Cycle Speed', 'accordion_pro'),
								'alt'=>__('Time between slide cycles', 'accordion_pro')),
							null,
							$accordion['jQuerySettings']['cycleSpeed']);

						$this->showField(
							'input',
							array(
								'name'=>__('slideSpeed', 'accordion_pro'),
								'title'=>__('Slide Speed', 'accordion_pro'),
								'alt'=>__('Slide animation speed', 'accordion_pro')),
							null,
							$accordion['jQuerySettings']['slideSpeed']);

						$this->showField(
							'select',
							array(
								'name'=>__('easing', 'accordion_pro'),
								'title'=>__('Easing', 'accordion_pro'),
								'alt'=>__('CSS3 easing type. Select from linear, ease, ease-in, ease-out, ease-in-out', 'accordion_pro')),
							array(
								'ease-in-out'=>__('ease-in-out', 'accordion_pro'),
								'linear'=>__('linear', 'accordion_pro'),
								'ease'=>__('ease', 'accordion_pro'),
								'ease-in'=>__('ease-in', 'accordion_pro'),
								'ease-out'=>__('ease-out', 'accordion_pro')),
							$accordion['jQuerySettings']['easing']);
					?>
				</div>
			</div>

		</div><!-- /ap-options -->
	</div>
<?php wp_nonce_field('add_edit', 'accordion_pro'); ?>
</form>

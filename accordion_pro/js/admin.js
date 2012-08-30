jQuery(function($) {
	var slides = $('.ap-slides'),
	
	accordionPro = {	
		addSlide : function() {
			var spinner = $('.ap-slides .ap-wait'),
				clicked = false;

			spinner.ajaxStart(function() {
				spinner.css('display', 'inline-block');
			});

			slides.on('click', '#ap-add', function() {
				var len = parseInt($('.ap-slide-num').last().val(), 10);

				if (!clicked) {
					// prevents double req before prev completed
					clicked = true; 
					
					// get slide tmpl via ajax
					$.post(
						ajaxurl, {
							action : 'admin_slide_tmpl',
							data : {
								slideNum : len
							}
						}, function(res) {
							var args, i = 1, j;

							// insert html
							$('#ap-add').before(res);

							// configure tinymce
							for (j in tinyMCEPreInit.mceInit) {
								if (i) args = tinyMCEPreInit.mceInit[j];
								i--;
							}

							args.elements = 'apeditor' + (len + 1);

							// configure quicktags
	                        quicktags({
	                            id: 'apeditor' + (len + 1),
	                            buttons: "",
	                            disabled_buttons: ""
	                        });

	                        // init tinymce & quicktags
							tinyMCE.init(args);                        
	                        QTags._buttonsInit();

	                        // hide ajax spinner
							spinner.hide();

							// reset clicked flag
							clicked = false;
						}
					);		
				}
			});
		},
		removeSlide : function() {
			slides.on('click', '.ap-remove', function() {
				var $this = $(this),
					num = $this.next().val();

				if (confirm($this.attr('data-confirm'))) {
					tinyMCE.execCommand('mceRemoveControl', false, 'apeditor' + (num + 1));
					$this.parent().parent().remove();
				}
			});
		},
		toggleSlide : function(e) {
			slides.on('click', '.ap-toggle', function() {
				$(this).parent().find('.ap-inner').toggle();
			});
		},
		toggleCaption : function() {
			slides.on('click', '.ap-slide-caption-checkbox', function() {
				var input = $(this).prev().prev();
				input.hasClass('disabled') ? input.removeClass('disabled') : input.addClass('disabled');
			});

			slides.on('focus', '.ap-slide-caption-input', function() {
				var $this = $(this);

				if ($this.hasClass('disabled')) {
					$this.removeClass('disabled');
					$this.next().next().attr('checked', true);	
				}
			});

			slides.on('blur', '.ap-slide-caption-input', function() {
				var $this = $(this);

				if (!$this.val()) {
					$this.next().next().removeAttr('checked');
					$this.addClass('disabled');
				}
			});
		},
		customSelects : function() {
			$('.ap-options').find('select').bind('change', function() {
				var $this = $(this), 
					name = $this.attr('name');

				if ($this.val() === 'custom') {
					$this.after('<div id="' + name + '"_wrapper><input type="number" name="' + name + '" value="" /></div>');
				} else if ($('#' + name + '_wrapper')) {
					$('#' + name + '_wrapper').remove();
				}				
			});
		},
		switchEditor : function() {
			slides.on('click', '.ajax .wp-switch-editor', function() {
				var $this = $(this),
					classname = $this.attr('class').split(' ')[1].split('-')[1],
					$parent = $this.parent().parent();

				switchEditors.switchto(this);
				$parent.removeClass().addClass('ap-inner ' + classname + '-active');
			});
		},
		addMedia : function() {
			slides.on('click', '.ajax .add-media', function(e) {
				var editor = this.id.split('-')[0];

				wpActiveEditor = editor;
				tb_show('', 'media-upload.php?post_id=0&amp;TB_iframe=1&amp;width=640&amp;height=576');

				e.preventDefault();
			});
		},
		removeAccordion : function() {
			$('.ap-del-acc').click(function() {
				if (confirm($(this).attr('data-confirm'))) {
					return true;
				}
				return false;
			});
		},
		init : function() {
			this.addSlide();
			this.removeSlide();
			this.toggleSlide();
			this.toggleCaption();
			this.customSelects();
			this.switchEditor();
			this.addMedia();
			this.removeAccordion();
		}		
	};

	accordionPro.init();

});
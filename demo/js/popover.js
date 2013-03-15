/* popover
======================================= */

(function($){
	
	// popover()
	// Handles the popover things.
	// 
	// Hiding all neighboring visible popovers upon clicking a popover is turned 
	// on by default. To disable this, pass option: hideOthers:false
	// when you init.
	// ----------------------------------------------------------------------
	
	
	var PopOver = function(element, options){
	    var elem = $(element),
	    	obj = this,
			attr = 'data-popover',
			$popper = $(elem).find('['+attr+'|="popper"]'),
			$content = $(elem).find('['+attr+'|="pop-content"]');
			
		var defaults = {
			hideOthers: true,
            animate: true
		};

        var config = $.extend(defaults, options || {});

        // < IE9 check, disable scale tween
        if($('html').hasClass('lt-ie9')){
            config.animate = false; // no animation
        };

		this.popoverPrep = function(){
			$content.hide().attr('data-visibility', 'invisible');
			
			$content.append('<div class="pos-indicator">');
		}
		this.popoverPosition = function(context) {
			var position = context.find($popper).attr('data-placement'),
				height = context.find($content).height(),
				halfHeight = (height/2),
				totalHeight = (height + 40),
				standardHeight = 80,
				width = context.find('.popover-content').width(),
				totalWidth = (width + 40),
				standardWidth = 80,
				popperHeight = context.find($popper).height(),
				halfPopperHeight = (popperHeight/2),
				popperWidth = context.find('.popper').width(),
				halfPopperWidth = (popperWidth/2),
				centerWidth = ((width/2)-(halfPopperWidth)+18),
				centerHeight = (halfHeight-20);
				
			
			if (position === 'top') {
				pos = 'top',
				operator = '-',
				direction = totalHeight;
				
				context.find($content).css(pos,operator+direction+'px');
				context.find($content).css('left','-'+centerWidth+'px');
			}
			else if (position === 'right') {
				pos = 'left',
				operator = '',
				direction = standardWidth;
				context.find($content).css(pos,operator+direction+'px');
				context.find($content).css('top','-'+centerHeight+'px');
			}
			else if (position === 'bottom') {
				pos = 'top',
				operator = '',
				direction = standardHeight;
				
				context.find($content).css(pos,operator+direction+'px');
				context.find($content).css('left','-'+centerWidth+'px');
			}
			else if (position === 'left') {
				pos = 'left',
				operator = '-',
				direction = totalWidth;
				context.find($content).css(pos,operator+direction+'px');
				context.find($content).css('top','-'+centerHeight+'px');
			}
			else {
				pos = 'top',
				operator = '',
				direction = standardHeight;
				
				context.find($content).css(pos,operator+direction+'px');
				context.find($content).css('left','-'+centerWidth+'px');
			}
			
			context.find('.pos-indicator').addClass(position);
			obj.popoverShow(context);
		}
		this.popoverShow = function(context){
			var $parent = context,			
                $popover = $parent.find($content),
				$visiblePops = $(elem).find("[data-visibility='visible']");
				
			// Hide other visible popovers first
			if (config.hideOthers == true) {
				$visiblePops.attr('data-visibility', 'invisible');
                if(config.animate == true){
					// Animate out open popovers
	                $visiblePops.fadeOut();
                } else {
                    $visiblePops.hide();
                }
			}
			
			// Show popover
            if(config.animate == true){
				$popover.fadeIn().attr('data-visibility', 'visible');
            } else {
				$popover.show().attr('data-visibility', 'visible');
            }
		}
		this.popoverHide = function(context){
			var $parent = context,
            	$visiblePop = $parent.find($content);
				
			$visiblePop.attr('data-visibility', 'invisible');
            if(config.animate == true){
                $visiblePop.fadeOut();
            }
            else{
                $visiblePop.hide();
            }
			
		}
		this.popoverTrigger = function(){ 
			$popper.click(function(){
				var $context = $(this).parent();
				
				if ($context.find($content).attr('data-visibility') === 'visible') {
					obj.popoverHide($context);
				} else {
					obj.popoverPosition($context);
				}
				
				return false;
			});
		}
		
		this.popoverPrep();
		this.popoverTrigger();
	  };

	  $.fn.popover = function(options){
	    return this.each(function(){
	      var element = $(this);

	      // Return early if this element already has a plugin instance
	      if (element.data('popover')) return;

	      // pass options to plugin constructor
	      var popover = new PopOver(this, options);

	      // Store plugin object in this element's data
	      element.data('popover', popover);
	    });
	};	
	
})(jQuery);
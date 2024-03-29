(function($){
	$.extend( jQuery.easing ,{
		starFly: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		}
	});
	
	$.fn.planetTravel = function( option ){
		var $obj = $(this);
		var opts = $.extend({},$.fn.planetTravel.defaults,option);		
		var viewSize ,maxWidth ,maxHeight  ;			
		checkSize();
		
		$obj.addClass( opts.bgCss[ rand(0,opts.bgCss.length - 1 )] );

		$(window).bind('resize.julying scroll.julying',function(e){
           checkSize(); 
        });
		flash();
		fly() ;
		setInterval(function(){
			fly();
		}, opts.flyMakeStarTime );
		return this ;
		
		function checkSize(){
			viewSize = getViewSize();
			maxWidth = viewSize[0];
			maxHeight = viewSize[1];
		};	
		
		function flash(){
			var docHeight = getViewSize()[1];
			var scale , imageIndex , html = '' , widh  , height , leftArea , imageIndex ;
			var starsArea = maxWidth * 0.2 * 2 *  docHeight ;
			var starsNum = starsArea / ( 100 * 100 ) * opts.flashStarDensity ;
			
			var imagesNum = opts.flashStarImage.length ;
			for(var i=0 ; i < starsNum ; i++){
				imageIndex = rand(0 , imagesNum -1) ;				
				scale = opts.flashStarImage[imageIndex][1] / opts.flashStarImage[imageIndex][2] ;
				widh 	= rand( opts.flashStarImage[imageIndex][1] * 0.2 , opts.flashStarImage[imageIndex][2] );
				height = widh / scale;

				leftArea  = Array( rand( 10, maxWidth * 0.2 ) , rand( maxWidth * 0.8 , maxWidth - widh - 20 )) ;
				html += '<img src="'+ opts.flashStarImage[imageIndex][0] +'" style="width:'+ widh +'px;height:'+height+'px;left:'+ leftArea[ rand( 0 ,leftArea.length - 1) ] +'px;top:'+ rand(10,docHeight - 30)  +'px;" class="planetTravelFlash" name="planetTravelFlash" />';
			}
			$obj.append(html);

			if( '\v' != 'v'  ){
				$obj.append(html).find('img[name=planetTravelFlash]').each(function(){
					glint($(this));
				});
			}
			function glint($star){
				$star.animate({ opacity : rand(2,10) * 0.1 } , rand( 100, 500 ),function(){
					setTimeout(function(){
						glint($star);
					},rand(100,300));
				});
			}
		}
		
		function fly(){
			var html = '' , imageIndex , xPos;
			var imagesNum = opts.flyStarImage.length ;
			for(var i=0 ; i < opts.flyMakestarNum ; i++){
				imageIndex = rand(0 , imagesNum -1) ;
				xPos = [ - opts.flyStarImage[imageIndex][1] , maxWidth - opts.flyStarImage[imageIndex][1] - 20  ];			
				html += '<img src="'+ opts.flyStarImage[imageIndex][0] +'" status="start" index="'+imageIndex+'" xpos="'+ xPos.join(',') +'" class="planetTravelFly" style="left:'+ (maxWidth * 0.5) +'px;top:'+ (maxHeight * 0.35) +'px;"/>';
			}
			$obj.append(html).find('img[status=start]').each(function(){
				html = null ;
				var $this = $(this);
				var index = $this.attr('index');
				xPos = $this.attr('xpos').split(',');
				$this.attr('status','run').css({opacity : rand(opts.flyStartBright[0] * 10 , opts.flyStartBright[1] * 10 ) * 0.1 }).animate({
					top: 	rand( - Math.max( 200 , maxHeight * 0.2 ) , maxHeight - 10 ) ,
					left:	xPos[rand(0,1)] ,
					width: 	rand(opts.flyStarImage[index][1] / 4 ,opts.flyStarImage[index][1]),
					height: rand( opts.flyStarImage[index][2] / 4 , opts.flyStarImage[index][2] )
				} , rand( opts.flyDuration * 0.5 , opts.flyDuration * 4 ) , 'starFly' ,function(){
					$this.remove();
				});
			});
		}
	};
	$.fn.planetTravel.defaults = {
		bgCss				: ['planetTravelBg_1' ,'planetTravelBg_2' ,'planetTravelBg_3' ],
		flyStarImage		: [ ['..res/pic/studentMain/star-fly-1.png' , 23 ,23 ] ],
		flyStartBright	 	: Array( 0.6 , 1 ) ,
		flyDuration			: 15000 ,
		flyMakeStarTime		: 5000 ,
		flyMakestarNum		: 2 ,
		
		flashStarImage		: [ ['..res/pic/studentMain/star-flash-1.png' , 30 ,27 ] , [ '..res/pic/studentMain/star-flash-2.png' , 40 ,40 ], [ '..res/pic/studentMain/star-flash-2.png' , 40 ,40 ] ],
		flashStarDensity	: 0.3
	};
})(jQuery);

(function($){

	$.extend( jQuery.easing ,{
		starFly: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		}
	});
	
	$.fn.planetTravel = function( option ){
		var $obj = $(this);
		var opts = $.extend({},$.fn.planetTravel.defaults,option);		
		var viewSize ,maxWidth ,maxHeight  ;			
		checkSize();
		
		$obj.addClass( opts.bgCss[ rand(0,opts.bgCss.length - 1 )] );

		$(window).bind('resize.julying scroll.julying',function(e){
           checkSize(); 
        });
		flash();
		fly() ;
		setInterval(function(){
			fly();
		}, opts.flyMakeStarTime );
		return this ;
		
		function checkSize(){
			viewSize = getViewSize();
			maxWidth = viewSize[0];
			maxHeight = viewSize[1];
		};	
		
		function flash(){
			var docHeight = getViewSize()[1];
			var scale , imageIndex , html = '' , widh  , height , leftArea , imageIndex ;
			var starsArea = maxWidth * 0.2 * 2 *  docHeight ;
			var starsNum = starsArea / ( 100 * 100 ) * opts.flashStarDensity ;
			
			var imagesNum = opts.flashStarImage.length ;
			for(var i=0 ; i < starsNum ; i++){
				imageIndex = rand(0 , imagesNum -1) ;				
				scale = opts.flashStarImage[imageIndex][1] / opts.flashStarImage[imageIndex][2] ;
				widh 	= rand( opts.flashStarImage[imageIndex][1] * 0.2 , opts.flashStarImage[imageIndex][2] );
				height = widh / scale;

				leftArea  = Array( rand( 10, maxWidth * 0.2 ) , rand( maxWidth * 0.8 , maxWidth - widh - 20 )) ;
				html += '<img src="'+ opts.flashStarImage[imageIndex][0] +'" style="width:'+ widh +'px;height:'+height+'px;left:'+ leftArea[ rand( 0 ,leftArea.length - 1) ] +'px;top:'+ rand(10,docHeight - 30)  +'px;" class="planetTravelFlash" name="planetTravelFlash" />';
			}
			$obj.append(html);

			if( '\v' != 'v'  ){
				$obj.append(html).find('img[name=planetTravelFlash]').each(function(){
					glint($(this));
				});
			}
			function glint($star){
				$star.animate({ opacity : rand(2,10) * 0.1 } , rand( 100, 500 ),function(){
					setTimeout(function(){
						glint($star);
					},rand(100,300));
				});
			}
		}
		
		function fly(){
			var html = '' , imageIndex , xPos;
			var imagesNum = opts.flyStarImage.length ;
			for(var i=0 ; i < opts.flyMakestarNum ; i++){
				imageIndex = rand(0 , imagesNum -1) ;
				xPos = [ - opts.flyStarImage[imageIndex][1] , maxWidth - opts.flyStarImage[imageIndex][1] - 20  ];			
				html += '<img src="'+ opts.flyStarImage[imageIndex][0] +'" status="start" index="'+imageIndex+'" xpos="'+ xPos.join(',') +'" class="planetTravelFly" style="left:'+ (maxWidth * 0.5) +'px;top:'+ (maxHeight * 0.35) +'px;"/>';
			}
			$obj.append(html).find('img[status=start]').each(function(){
				html = null ;
				var $this = $(this);
				var index = $this.attr('index');
				xPos = $this.attr('xpos').split(',');
				$this.attr('status','run').css({opacity : rand(opts.flyStartBright[0] * 10 , opts.flyStartBright[1] * 10 ) * 0.1 }).animate({
					top: 	rand( - Math.max( 200 , maxHeight * 0.2 ) , maxHeight - 10 ) ,
					left:	xPos[rand(0,1)] ,
					width: 	rand(opts.flyStarImage[index][1] / 4 ,opts.flyStarImage[index][1]),
					height: rand( opts.flyStarImage[index][2] / 4 , opts.flyStarImage[index][2] )
				} , rand( opts.flyDuration * 0.5 , opts.flyDuration * 4 ) , 'starFly' ,function(){
					$this.remove();
				});
			});
		}
	};
	$.fn.planetTravel.defaults = {
		bgCss				: ['planetTravelBg_1' ,'planetTravelBg_2' ,'planetTravelBg_3' ],
		flyStarImage		: [ ['..res/pic/studentMain/star-fly-1.png' , 23 ,23 ] ],
		flyStartBright	 	: Array( 0.6 , 1 ) ,
		flyDuration			: 15000 ,
		flyMakeStarTime		: 5000 ,
		flyMakestarNum		: 2 ,
		
		flashStarImage		: [ ['..res/pic/studentMain/star-flash-1.png' , 30 ,27 ] , [ '..res/pic/studentMain/star-flash-2.png' , 40 ,40 ], [ '..res/pic/studentMain/js/star-flash-2.png' , 40 ,40 ] ],
		flashStarDensity	: 0.3
	};	
})(jQuery);// JavaScript Document


$(function(){                              
                 var today = new Date();
                 var weekday=new Array(7)
                 weekday[0]="星期一"
                 weekday[1]="星期二"
                 weekday[2]="星期三"
                 weekday[3]="星期四"
                 weekday[4]="星期五"
                 weekday[5]="星期六"
                 weekday[6]="星期日"                                        
                 var time=today.getFullYear()+"年"+parseInt(today.getMonth()+1)+"月"+today.getDate()+"日 "+weekday[today.getDay()];        
                 $("#timeshow").text(time);
				 $("#arrow_year").click(function(){
					 $("#year_ul").show();
					 });
			     $("#year_ul li").find("a").click(function(){
					 var valstr=$(this).text();
					 $("#year").val(valstr);
					 $("#year_ul").hide();
					 }); 
				$("#arrow_type").click(function(){
					 $("#select_type").show();
					 });
			     $("#select_type li").find("a").click(function(){
					 var valstr=$(this).text();
					 $("#type").val(valstr);
					 $("#select_type").hide();
					 });
				$("#keyword").focusin(function(){
					var valstr=$(this).val();
					var $this=$(this);
					if(valstr=="请输入搜索关键字"){
						$this.val("");
						}
					}).focusout(function(){
						var valstr=$(this).val();
					    var $this=$(this);
					    if(valstr==""){
						$this.val("请输入搜索关键字");
						}
				    }); 
				$('.flexslider').flexslider({
					animation: "slide",
					start: function (slider) {
						$('flexslider').removeClass('loading');
					}
                });
				$("#search_list li").live("mouseenter",function(){
					$(this).find(".left_arrow").show();
					$(this).find(".two_nav").show();
					$(this).css("z-index","3");
					$(this).siblings().css("z-index","2");
			    }).live("mouseleave",function(){
					$(this).find(".left_arrow").hide();
					$(this).find(".two_nav").hide();
					$(this).css("z-index","2");
			    });
				var linum=$("#gpic1").find("li");
				var len=$(linum).length;
				var ulwidth=len*200;
				$("#gpic1").css("width",ulwidth);
				$("#gpic2").css("width",ulwidth);
});
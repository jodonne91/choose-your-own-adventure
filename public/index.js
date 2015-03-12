var PageRouter = Backbone.Router.extend({

	routes: {
		"": "showTOC",
		"page/:pageNumber": "showPage"
	},

	showTOC : function(){

	    $.ajax({
	    	url: "/api/toc/",
	     	method: "GET",
	    	success: function(result) {
	        	console.log(result);
	       		appendTOC(result)
	    	}
	    })

	},

	showPage : function(number){

	    $.ajax({
	    	url: "/api/page/" + number,
	     	method: "GET",
	    	success: function(result) {
	        	console.log(result);
	        	var p = result.paragraphs;
	        	var o = result.links;
	        	appendPage(p,o);
	    	}
	    })

	}



})

var appendPage = function(p, o){

	$('.main').html("");

	var localObj = {
		text1: p[0],
		text2: p[1],
		text3: p[2],
		text4: p[3],
		option1_link: o[0].page,
		option2_link: o[1].page,
		option1: o[0].sentence,
		option2: o[1].sentence
	};

	$('.main').append(templates.pageContent(localObj));

}

var appendTOC = function(toc){

	$('.main').html("");

	var localObj = {};

	$('.main').append(templates.toc());

	_.each(toc, function(chapter){
		$('.toc-list').append(templates.tocItem(chapter));
	})

}

var templates = {

}

var pageRouter;


$(document).on('ready',function(){

	pageRouter = new PageRouter;
	templates.pageContent = Handlebars.compile($('#page-content-template').html());
	templates.toc = Handlebars.compile($('#toc-template').html());
	templates.tocItem = Handlebars.compile($('#toc-item-template').html());

	Backbone.history.start();

})
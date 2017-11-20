var app = angular.module('imageViewer', ['ng', 'ngResource', 'ngSanitize']);

//controller to display the posts on main page.
app.controller('AppGallery',[ '$scope','$http', function AppGallery($scope, $http) {
	$http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json').success(function (data) {});
	jsonFlickrFeed = function(data){
		$scope.items = data.items;
	}
}]);

//date filter to fotmat the date published.
app.filter('dateSuffix', function($filter) {
  var suffixes = ["th", "st", "nd", "rd"];
  return function(input) {
    var dtfilter = $filter('date')(input, 'dd');
    var day = parseInt(dtfilter.slice(-2));
    var relevantDigits = (day < 30) ? day % 20 : day % 30;
    var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    return dtfilter+suffix+' '+$filter('date')(input, 'MMM')+' '+$filter('date')(input, 'yyyy')+' at '+$filter('date')(input, 'HH')+':'+$filter('date')(input, 'mm');
  };
});

//Custom directive to render tags
app.filter('renderTags', function(){
	return function(tags){
		var tagsArray = tags.split(" ");
		var formattedTags = '';
		tagsArray.forEach(function(element){
			formattedTags = formattedTags+'<a href="https://www.flickr.com/photos/tags/'+element+'">'+element+'</a> ';
		});
		return 'Tags: '+formattedTags;
	}
});

//Custom directive to show full post with back button
app.directive("showFullPost", ["$interval", function($interval) {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            //On click
            $(elem).click(function() {
               $("#post").html($(this).parent().parent().find(".full_post").html());
               $(".container-fluid").hide();
               $("#post").show();
            });
        }
    }
}]);

//Function to return on back button click to show the post list.
function returnApp(){
	$(".container-fluid").show();
	$("#post").hide();
}

//jQuery search posts
$(document).on("input", "#search", function(){
	if($(this).val() ==''){
		$("article").each(function(){
			$(this).show();
		});
	}else{
		$("article").each(function(){
			$(this).show();
		});
		$("article").not("[class*="+$(this).val()+"]").hide();
	}
});
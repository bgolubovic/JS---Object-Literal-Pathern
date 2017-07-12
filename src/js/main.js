//Object Literal Module

var cars={
	init: function(){
		this.cacheDom();
        this.bindEvents();
		var that = this;
		this.loadJSON(function(response){
			var actual_JSON = JSON.parse(response);
			that.showCars(actual_JSON);
		});
	},
	loadJSON: function(callback){
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', 'js/data.json', true);
		xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
		};
		xobj.send(null); 
	},
	cacheDom: function() {
		this.$inputSearch = document.getElementById("input-search");
    },
    bindEvents: function() {
    	this.$inputSearch.addEventListener('keyup', this.searchCars);
    },
	showCars: function(actual_JSON){
		actual_JSON.cars.forEach(function(car) {

		    var template = document.getElementById("car-template").innerHTML,
		    el = document.createElement('li');

		    el.innerHTML = template;

		    el.getElementsByClassName("car-name")[0].innerHTML += car.name;
		    el.getElementsByClassName("car-img")[0].src = car.image;

		    document.getElementById("car-list").appendChild(el);
		});
	},

	searchCars: function() {
	    // Declare variables
	    var input, filter, ul, li, a, i;
	    input = document.getElementById("input-search");
	    filter = input.value.toUpperCase();
	    ul = document.getElementById("car-list");
	    li = ul.getElementsByTagName('li');

	    // Loop through all list items, and hide those who don't match the search query
	    for (i = 0; i < li.length; i++) {
	        a = li[i].getElementsByTagName("span")[0];
	        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
	            li[i].style.display = "";
	        } else {
	            li[i].style.display = "none";
	        }
	    }
	}
};

cars.init();


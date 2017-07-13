//Object Literal Module

var cars={
	init: function(){
		var that = this;
		this.loadJSON(function(response){
			var actual_JSON = JSON.parse(response);
			that.showCars(actual_JSON);
			that.cacheDom();
        	that.bindEvents();
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
		this.$checkboxes = document.getElementsByClassName("checkbox");
    },
    bindEvents: function() {
    	this.$inputSearch.addEventListener('keyup', this.searchCars);
    	for (var i = 0; i < this.$checkboxes.length; i++) {
		    this.$checkboxes[i].addEventListener('click', this.checkboxChecked);
		}
    	// this.$checkbox.addEventListener('click', this.checkboxChecked);
    },
	showCars: function(actual_JSON){
		var carCheckCounter = 1;
		actual_JSON.cars.forEach(function(car) {

		    var template = document.getElementById("car-template").innerHTML,
		    el = document.createElement('li');

		    el.innerHTML = template;

		    el.getElementsByClassName("car-name")[0].innerHTML += car.name;
		    el.getElementsByClassName("car-img")[0].src = car.image;

		    el.getElementsByTagName('label')[0].setAttribute("for", "car-check-" + carCheckCounter);
		    el.getElementsByClassName("checkbox")[0].setAttribute("id", "car-check-" + carCheckCounter);
		    el.getElementsByClassName("checkbox")[0].setAttribute("name", "car-check-" + carCheckCounter);
			carCheckCounter++;

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
	},

	checkboxChecked: function(ev){
		console.log(ev);
	}
};

cars.init();


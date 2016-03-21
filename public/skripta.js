window.addEventListener('load', function() {
	//stran nalozena
	
	var prizgiCakanje = function() {
		document.querySelector(".loading").style.display = "block";
	}
	
	var ugasniCakanje = function() {
		document.querySelector(".loading").style.display = "none";
	}
	
	document.querySelector("#nalozi").addEventListener("click", prizgiCakanje);
	
	//Pridobi seznam datotek
	var pridobiSeznamDatotek = function(event) {
		prizgiCakanje();
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var datoteke = JSON.parse(xhttp.responseText);
				
				var datotekeHTML = document.querySelector("#datoteke");
				
				for (var i=0; i<datoteke.length; i++) {
					var datoteka = datoteke[i];
					
					var velikost = formatSizeUnits(datoteka.velikost);
					
					datotekeHTML.innerHTML += " \
						<div class='datoteka senca rob'> \
							<div class='naziv_datoteke'> " + datoteka.datoteka + "  (" + velikost + ") </div> \
							<div class='akcije'> \
							| <span><a href='/poglej/" + datoteka.datoteka + "' target='_self'>Poglej</a></span> \
							| <span><a href='/prenesi/" + datoteka.datoteka + "' target='_self'>Prenesi</a></span> \
							| <span akcija='brisi' datoteka='"+ datoteka.datoteka +"'>Izbriši</span> </div> \
					    </div>";	
				}
				
				if (datoteke.length > 0) {
					var t = document.querySelectorAll("span[akcija=brisi]");
					for(var i = 0; i<t.length; i++) {
						t[i].addEventListener("click", brisi);
					}
				}
				ugasniCakanje();
			}
		};
		xhttp.open("GET", "/datoteke", true);
		xhttp.send();
	}
	pridobiSeznamDatotek();
	
	function formatSizeUnits(bytes) {
	    if (bytes >= 1000000000) bytes=(bytes/1000000000).toFixed(2)+' GiB';
	    else if (bytes >= 1000000) bytes=(bytes/1000000).toFixed(2)+' MiB';
	    else if (bytes >= 1000) bytes=(bytes/1000).toFixed(2)+' KiB';
	    else if (bytes > 0) bytes=bytes+' B';
	    return bytes;
	}
	
	var brisi = function(event) {
		prizgiCakanje();
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				if (xhttp.responseText == "Datoteka izbrisana") {
					window.location = "/";
				} else {
					alert("Datoteke ni bilo možno izbrisati!");
				}
			}
			ugasniCakanje();
		};
		xhttp.open("GET", "/brisi/"+this.getAttribute("datoteka"), true);
		xhttp.send();
	}

});
'use strict'

//variável, lingua, tradução 
var libLang = {
	"meu_texto":{
		pt: "Meu Texto",
		en: "My text"
	},
	"download_plugin": {
    	pt: "Descarregar plugin",
    	en: "Download plugin"
  	}
}

$("[data-set-translate]").on('click', function(e){
    e.preventDefault();
    var lang;

    lang = $(this).data('set-translate');

    $("[data-get-translate]").each(function(index, val) {
    	var variable = $(this).data('get-translate');
    	console.log(index);
    	console.log(val);
    	
    });
});


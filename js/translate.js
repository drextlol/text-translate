'use strict'

$(document).ready(function() {
    modules.init();
});


var modules = (function(){
    var self;
    self = {};

    self.init = (function(){
        self.setTranslate();
        self.getTranslate();
    });

    self.setTranslate = (function(){
        $("[data-set-translate]").on('click', function(e){
            e.preventDefault();
            
            var lang;
            lang = $(this).data('set-translate');
            
            self.getTranslate("dictionary.json", lang);
            
            /*if(!localStorage.getItem('i18n')){
                localStorage.setItem('i18n', lang);
            }else{
                
            }*/
        });

    });

    self.getTranslate = (function(archive, lang){
        /* Variables */
        var getText;

        /* Get file JSON */
        $.getJSON(archive, "json", function(data) {
            $("[data-get-translate]").each(function(index, val) {
                getText = $(this).data('get-translate');
                $(this).text(data[getText][lang]);
            });
        });
    });

    return self;
})();

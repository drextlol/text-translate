/*jslint white: true */

var modules = function(pathDict, langDefault){
    var self, lang;
    self = {}

    self.init = function(){
        self.setTranslate();
        self.getTranslate();
    }

    self.loadTranslate = function(lang){
        if(lang != ""){
            lang = $(this).data('set-translate');
        }else{
            if(!localStorage.getItem('i18n')){
                localStorage.setItem('i18n', lang);
            }else{
                
            }
        }
    }

    self.setTranslate = function(){
        $("[data-set-translate]").on('click', function(e){
            e.preventDefault();

            self.getTranslate("dictionary.json", lang);
            
        });

    }

    self.getTranslate = function(archive, lang){
        /* Variables */
        var getText;

        /* Get file JSON */
        $.getJSON(archive, "json", function(data) {
            $("[data-get-translate]").each(function(index, val) {
                getText = $(this).data('get-translate');
                $(this).text(data[getText][lang]);
            });
        });
    }

    return self;
}();

$(document).ready(function(){
    $(document).textTranslate();
});
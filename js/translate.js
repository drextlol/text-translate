/*jslint white: true */
"use strict"
var moduleTranslate = function(){
    var self;
    self = {}

    self.init = function(userOptions){
        self.storageTranslate(self.loadOptions(userOptions));
    }

    /* Pega as opões de linguagem default,
    ** e path do dicionário informado pelo user
    */
    self.loadOptions = function(userOptions){
        var defaultOptions, getOptions;

        defaultOptions = {
            langDefault: "en",
            pathDict: location.href + "dictionary.json",
            error: function(){}
        }

        getOptions = $.extend(true, defaultOptions, userOptions);
        
        return getOptions;
    }

    /* Carrega uma linguagem default do storage */
    self.storageTranslate = function(load){
        var storageLang, objStorage;

        objStorage = localStorage.getItem('i18n');

        if(localStorage.getItem('i18n')){
            self.getTranslate(objStorage);
        }else{
            objStorage = {
                langDefault: load.langDefault,
                pathDict: load.pathDict
            }

            localStorage.setItem('i18n', JSON.stringify(objStorage));
            self.getTranslate(localStorage.getItem('i18n'));
        }
    }

    self.getTranslate = function(storageBrowser){
        var getText, objStorage, error;

        objStorage = JSON.parse(storageBrowser);
        
        /* Get file JSON */
        $.getJSON(objStorage.pathDict, "json", function(data) {
            $("[data-get-translate]").each(function() {
                getText = $(this).data('get-translate');
                if(data[getText]){
                    if(data[getText][objStorage.langDefault]){
                        $(this).text(data[getText][objStorage.langDefault]);
                    }else{
                        error = "O parâmetro de idioma '" + objStorage.langDefault + "' informado, não existe no arquivo " + objStorage.pathDict + ", verique seus parâmetros.";
                        self.loadcallback(error);
                        return false;
                    }
                }else{
                    error = "A váriavel '" + getText + "' não existe no arquivo " + objStorage.pathDict + ", verique seus parâmetros.";
                    self.loadcallback(error);
                    return false;
                }
            });
        });
    }

    self.loadcallback = function(status){
        console.error(status);
    }

    self.setTranslate = function(){
        //lang = $(this).data('set-translate');
        $("[data-set-translate]").on('click', function(e){
            e.preventDefault();
            self.getTranslate("dictionary.json", lang); 
        });
    }



    return self;
}();

$(document).ready(function(){
    moduleTranslate.init({
        langDefault: "pt"
    });
});
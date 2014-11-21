/*jslint white: true */
"use strict"
var moduleTranslate = function(){
    var self;
    self = {}

    self.init = function(userOptions){
        self.saveLanguage(self.loadOptions(userOptions));
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
    self.saveLanguage = function(load){
        if(Modernizr.localstorage){
            self.storageAction(load);
        }else{
            self.cookieAction(load);
        }
    }

    self.storageAction = function(load){
        var objStorage;

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

    self.cookieAction = function(load){
        var objStorage;

        objStorage = moduleTranslate.cookie._getCookie('i18n');

        if(moduleTranslate.cookie._getCookie('i18n')){
            self.getTranslate(objStorage);
        }else{
            objStorage = {
                langDefault: load.langDefault,
                pathDict: load.pathDict
            }

            moduleTranslate.cookie._setCookie('i18n', JSON.stringify(objStorage));
            self.getTranslate(moduleTranslate.cookie._getCookie('i18n'));
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
                        self.loadcallback._error(error);
                        return false;
                    }
                }else{
                    error = "A váriavel '" + getText + "' não existe no arquivo " + objStorage.pathDict + ", verique seus parâmetros.";
                    self.loadcallback._error(error);
                    return false;
                }
            });
        });
    }

    self.loadcallback = {
        _error: function(status){
            console.error(status);
        }
    }

    self.setTranslate = function(){
        //lang = $(this).data('set-translate');
        $("[data-set-translate]").on('click', function(e){
            e.preventDefault();
            self.getTranslate("dictionary.json", lang); 
        });
    }

    self.cookie = {

        _setCookie: function(name, value, exdays) {
            var d, expires;

            d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + "; " + expires;
        },

        _getCookie: function(name) {
            var name, ca, i, c;

            name = name + "=";
            ca = document.cookie.split(';');

            for(i=0; i<ca.length; i++) {
                c = ca[i];

                while(c.charAt(0)==' '){
                    c = c.substring(1);
                }
                    
                if(c.indexOf(name) != -1){
                    return c.substring(name.length, c.length);
                }
            }

            return "";
        }
    }

    return self;
}();

$(document).ready(function(){
    moduleTranslate.init({
        langDefault: "pt"
    });
});
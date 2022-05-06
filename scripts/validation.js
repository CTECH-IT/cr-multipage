(function (window) {
    'use strict';

    let App = window.App || {};   
    let Validation = {
        isCompanyEmail: function (email) {
            return true;
            // return /.+@isd535\.org$/.test(email);
        },
        isDecaf: function (name) { // For the unit 12 silver challenge
            return /decaf/.test(name);
        }        
    };

    App.Validation = Validation;
    window.App = App; 

})(window);

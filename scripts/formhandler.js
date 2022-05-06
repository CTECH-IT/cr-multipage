(function (window) {
  'use strict';

  let App = window.App || {};
  let $ = window.jQuery;

  // This is the FormHandler constructor
  function FormHandler(selector) {

    // do stuff here
    if (!selector) {
      throw new Error('No selector provided!');
    }

    // find the Form in the DOM using jQuery and assign it to this.$formElement
    this.$formElement = $(selector);
    if (this.$formElement.length == 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (func) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function (event) {
      event.preventDefault();

      // get the data from the form and store it in a data object
      let data = {};
      $(this).serializeArray().forEach(function (item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });

      data['mycode'] = 'mrb'; // add a special code since we are all using the same data store

      console.log(data);
      func(data); // call the function that was passed in on the data from the form

      this.reset(); // reset the form
      this.elements[0].focus(); // focus on the first field
    });
  };

  FormHandler.prototype.addInputHandler = function (func) {
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function (event) {
      let emailAddress = event.target.value;
      if (func(emailAddress) == true) { // use validation.js to check email
        event.target.setCustomValidity('');
      } else {
        event.target.setCustomValidity(emailAddress + ' is not an authorized email address!');
      }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;

})(window);

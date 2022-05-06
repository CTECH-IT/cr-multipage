(function (window) {
  'use strict';

  const FORM_SELECTOR = '[data-coffee-order="form"]';
  const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  // const SERVER_URL = 'https://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  // const SERVER_URL = 'http://50.116.3.147:5000/json';
  const SERVER_URL = 'http://saturn.rochesterschools.org:8080/json';

  // let's make sure we only have one of each of these:
  let App = window.App;
  let Truck = App.Truck;
  let DataStore = App.DataStore;
  let RemoteDataStore = App.RemoteDataStore;
  let FormHandler = App.FormHandler;
  let CheckList = App.CheckList;
  let Validation = App.Validation;

  // the remote database where we store orders
  let remoteDS = new RemoteDataStore(SERVER_URL);

  let myTruck = new Truck('12345', remoteDS); 
  window.myTruck = myTruck;

// get all the data from the remote data store and put it in the truck
  remoteDS.getAll(function (orders) {

    // go through the orders with a loop
    // figure out if this order belongs to you, 
    // if it does, create a new order and then call

    Object.entries(orders).forEach((entry) => {
      const [key, value] = entry;
      console.log(`** ${key}: ${value} **`);
      Object.entries(value).forEach((field) => {
        const [k, v] = field;
        console.log(`----- ${k}: ${v}`);
      });
    });
    

  }); 


  // find the form that is being submitted and create a FormHandler object
  let formHandler = new FormHandler(FORM_SELECTOR);
  // find the checklist that is being updated and create a CheckList object
  let checkList = new CheckList(CHECKLIST_SELECTOR);

  // when a checkbox is clicked, call "deliverOrder" on myTruck
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

  // when the submit button is called, create the order and add a checkbox
  formHandler.addSubmitHandler(function (data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  // add the email validator to the email input field
  formHandler.addInputHandler(Validation.isCompanyEmail); 

})(window); 

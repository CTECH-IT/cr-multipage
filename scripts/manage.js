(function (window) {
  'use strict';

  const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  const SERVER_URL = 'http://saturn.rochesterschools.org:8080/json';

  // let's make sure we only have one of each of these:
  let App = window.App;
  let Truck = App.Truck;
  let DataStore = App.DataStore;
  let RemoteDataStore = App.RemoteDataStore;
  let CheckList = App.CheckList;

  // the remote database where we store orders
  let remoteDS = new RemoteDataStore(SERVER_URL);

  let myTruck = new Truck('12345', remoteDS);
  window.myTruck = myTruck;

  // find the checklist that is being updated and create a CheckList object
  let checkList = new CheckList(CHECKLIST_SELECTOR);

  // when a checkbox is clicked, call "deliverOrder" on myTruck
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));


  // get all the data from the remote data store and put it in the truck and on the checklist
  remoteDS.getAll(function (orders) {

    // go through the orders with a loop
    // figure out if this order belongs to you, 
    // if it does, add it to the checklist

    Object.entries(orders).forEach((entry) => {

      let validOrder = false; // check to see if it's mine

      const [key, value] = entry;
      console.log(`got order: ** ${key}: ${value} **`);
      Object.entries(value).forEach((field) => {
        const [k, v] = field;
        console.log(`----- ${k}: ${v}`);

        if (v == 'mrb') {
          validOrder = true;
        }
      });

      if (validOrder == true) {
        checkList.addRow.call(checkList, value); // don't add rows now, since we moved the checklist to the manager page.
      }

    });


  });




})(window); 

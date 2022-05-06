(function (window) {
  'use strict';

  let App = window.App || {};

  // The DataStore constructor
  function DataStore() {
    this.data = {};
  }

  DataStore.prototype.add = function (key, val) {
    this.data[key] = val;
  };

  DataStore.prototype.get = function (key) {
    return this.data[key];
  };

  DataStore.prototype.getAll = function () {
    return this.data;
  };

  DataStore.prototype.remove = function(key) {
    delete this.data[key];
  }

  App.DataStore = DataStore;
  window.App = App;

})(window);

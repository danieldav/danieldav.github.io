
/* API and usage

var toolbar = oojs.createToolbar("myToolbar");
var toolbarItem = toolbar.items[0];



Using methods VS using properties

Using methods:
-------------
toolbarItem.setEnabled(true); // or false
toolbarItem.getEnabled();


Using Properties:
-----------------
toobarItem.enabled = true; // or false
var enabled = toobarItem.enabled; //cleaner API - the 'enabled' property serves as a getter and a setter

*/


var oojs = (function(oojs) {

  var createToolbarItems = function(itemElements) {
    var items = [];

    [].forEach.call(itemElements, function(el, index, array) {

      var item = {
        toggleActiveState: function() {
          this.activated = !this.activated;
        }
      };

      Object.defineProperties(item, {
        el: {
          value: el
        },
        enabled: {
          get: function() {
            return !this.el.classList.contains('disabled');
          },
          set: function(value) {
            if(value) {
              this.el.classList.remove('disabled');
            } else {
              this.el.classList.add('disabled');
            }
          }
        },
        activated: {
          get: function() {
            return this.el.classList.contains('active');
          },
          set: function(value) {
            if(value) {
              this.el.classList.add('active');
            } else {
              this.el.classList.remove('active');
            }
          }
        }
      });
      /*
      // Using methods

      var item = {
        el: el,
        disable: function() {
          this.el.classList.add('disabled');
        },
        enable: function() {
          this.el.classList.remove('disabled');
        },
        isDisabled: function() {
          return this.el.classList.contains('disabled');
        },
        activate: function() {
          if(this.isDisabled()) {
            return;
          }
          this.el.classList.add('active');
        },
        deactivate: function() {
          if(this.isDisabled()) {
            return;
          }
          this.el.classList.remove('active');
        },
        isActive: function() {
          return this.el.classList.contains('active');
        },
        toggleActiveState: function() {
          if(this.isActive()) {
            this.deactivate();
          } else {
            this.activate();
          }
        }
      }; */
      items.push(item);
    });

    return items;
  };

  oojs.createToolbar = function(elementId) {
    var element = document.getElementById(elementId);
    var items = document.querySelectorAll('.toolbar-item');

    return {
      items: createToolbarItems(items)
    };

  };
  return oojs;
}(oojs || {}));


//usage:

//var toolbar = oojs.createToolbar("myToolbar");
//toolbar.items[0].enabled //(getter)
//true
//toolbar.items[0].activated //(getter)
//false
//toolbar.items[0].activated = true //(setter)
//true
//toolbar.items[0].enabled = false  //(setter)
//false

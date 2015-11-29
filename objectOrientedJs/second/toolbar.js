
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

  var createToolbarItem = function(itemElement) {
      var item = {
        toggleActiveState: function() {
          this.activated = !this.activated;
        }
      };

      Object.defineProperties(item, {
        el: {
          value: itemElement
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

    return item;
  };

  var createToolbarItems = function(itemElements) {
    var items = [];

    [].forEach.call(itemElements, function(el, index, array) {

      var item = createToolbarItem(el);
      items.push(item);
    });

    return items;
  };

  oojs.createToolbar = function(elementId) {
    var element = document.getElementById(elementId);

    if(!element) {
      element = document.createElement('DIV');
      element.id = elementId;
      element.className = 'toolbar';
    }

    var items = document.querySelectorAll('#' + elementId + ' .toolbar-item');

    var toolbar = {
      add: function(options) { //options for future use
        var span = document.createElement('SPAN');
        span.className = 'toolbar-item';
        this.el.appendChild(span);
        var item = createToolbarItem(span);
        this.items.push(item);
      },
      remove: function(index) {
          var len = this.items.length;
          if(index > len || index < 0) {
            throw new Error('Index is out of range');
          }
          var item = this.items[index];
          this.items.splice(index, 1);
          this.el.removeChild(item.el);
          item = null;
      },
      appendTo: function(parentElement) {
        parentElement.appendChild(this.el);
      }
    };
    Object.defineProperties(toolbar,{
      el: {
        value: element
      },
      items: {
        value: createToolbarItems(items),
        enumerable: true
      }
    });
    return toolbar;

    //return {
      //items: createToolbarItems(items),
    //}

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


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
 var ToolbarItem = function (itemElement) {
   Object.defineProperty(this, '__el', {
     value: itemElement
   });
 };
 Object.defineProperties(ToolbarItem.prototype, {
   toggleActiveState: {
     value: function() {
       this.activated = !this.activated;
     },
     enumerable: true
   },
   enabled: {
     get: function() {
       return !this.__el.classList.contains('disabled');
     },
     set: function(value) {
       if(value) {
         this.__el.classList.remove('disabled');
       } else {
         this.__el.classList.add('disabled');
       }
     }
   },
   activated: {
     get: function() {
       return this.__el.classList.contains('active');
     },
     set: function(value) {
       if(value) {
         this.__el.classList.add('active');
       } else {
         this.__el.classList.remove('active');
       }
     }
   }
 });

  var createToolbarItems = function(itemElements) {
    var items = [];

    [].forEach.call(itemElements, function(el, index, array) {

      var item = new ToolbarItem(el);
      items.push(item);
    });

    return items;
  };

  var Toolbar = function(toolbarElement) {
    var items = toolbarElement.querySelectorAll('#' + toolbarElement.id + ' .toolbar-item');
    Object.defineProperties(this,{
      __el: {
        value: toolbarElement
      },
      items: {
        value: createToolbarItems(items),
        enumerable: true
      }
    });
  };

  Object.defineProperties(Toolbar.prototype, {
    add: {
      value: function(options) { //options for future use
          var span = document.createElement('SPAN');
          span.className = 'toolbar-item';
          this.__el.appendChild(span);
          var item = new ToolbarItem(span);
          this.items.push(item);
      },
      enumerable: true
    },
    remove: {
      value: function(index) {
          var len = this.items.length;
          if(index > len || index < 0) {
            throw new Error('Index is out of range');
          }
          var item = this.items[index];
          this.items.splice(index, 1);
          this.__el.removeChild(item.__el);
          item = null;
      },
      enumerable: true
    },
    appendTo: {
      value: function(parentElement) {
          parentElement.appendChild(this.__el);
      },
      enumerable: true
    }
  });

  oojs.createToolbar = function(elementId) {
    var element = document.getElementById(elementId);

    if(!element) {
      element = document.createElement('DIV');
      element.id = elementId;
      element.className = 'toolbar';
    }
    return new Toolbar(element);
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

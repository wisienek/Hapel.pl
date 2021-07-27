function eventBus() {
    var API = Java.type('noppes.npcs.api.NpcAPI').Instance();
    var w = API.getIWorld(0);
    var tempdata = w.tempdata;
    var eventBusName = 'SCRIPT_EVENT_BUS';

    if(!tempdata.has(eventBusName)) {
        var bus = {
            _name: eventBusName,
            _events: {},
            /**
             * Listen to an event
             * @param {String} eventName The event to listen to
             * @param {Function} callback The function to execute
             * @param {String|null} name *OPTIONAL* unique name, for the ability to remove function later
             */
            on: function(eventName, callback, name) {
                if(!this._events[eventName]) {
                    this._events[eventName] = [];
                }

                if(name) {
                    name = name + '_' + eventName;
                    this.remove(eventName, name);
                }

                this._events[eventName].push({
                    callback: callback,
                    name: name
                });
            },
            /**
             * 
             * @param {String} eventName The event to execute, this will trigger all listeners
             * @param {Array|null} args Array of arguments to provide to all callbacks
             */
            emit: function(eventName, args) {
                if(!this._events[eventName]) {
                    return false;
                }

                var actions = this._events[eventName];
                for(var i = 0; i < actions.length; i++) {
                    actions[i].callback.apply(null, args || []);
                }

                return true;
            },
            /**
             * 
             * @param {String} eventName The event to remove a callback from
             * @param {String} callbackName Name of the callback
             */
            remove: function(eventName, callbackName) {
                if(!this._events[eventName]) {
                    return false;
                }
                var actions = this._events[eventName];
                for(var i = 0; i < actions.length; i++) {
                    if(actions[i].name == callbackName) {
                        actions.splice(i, 1);
                        return true;
                    }
                }

                return false;
            },
            destroy: function(){
                tempdata.remove(this._name);
            }
        };

        tempdata.put(eventBusName, bus);
        return bus;
    }
    return tempdata.get(eventBusName);
}
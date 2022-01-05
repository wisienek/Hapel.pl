function eventBus() {
  var e = Java.type('noppes.npcs.api.NpcAPI').Instance().getIWorld(0).tempdata;
  if (!e.has('SCRIPT_EVENT_BUS')) {
    var t = {
      _name: 'SCRIPT_EVENT_BUS',
      _events: {},
      on: function (e, t, n) {
        this._events[e] || (this._events[e] = []),
          n && ((n = n + '_' + e), this.remove(e, n)),
          this._events[e].push({ callback: t, name: n });
      },
      emit: function (e, t) {
        if (!this._events[e]) return !1;
        for (var n = this._events[e], r = 0; r < n.length; r++)
          n[r].callback.apply(null, t || []);
        return !0;
      },
      remove: function (e, t) {
        if (!this._events[e]) return !1;
        for (var n = this._events[e], r = 0; r < n.length; r++)
          if (n[r].name == t) return n.splice(r, 1), !0;
        return !1;
      },
      destroy: function () {
        e.remove(this._name);
      },
    };
    return e.put('SCRIPT_EVENT_BUS', t), t;
  }
  return e.get('SCRIPT_EVENT_BUS');
}

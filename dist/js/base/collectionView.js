define(["base/view","base/itemView","base/util"],function(e,t,n){var r=function(){var e=this,r={},i=this.$el,s=this.collection;e.addItem=function(o,u){u||(u=i);var a=s.indexOf(o),f=e.getOption("itemView")||t,l=n.createView({model:o,className:"id-"+o.id,View:f,parentView:e});r[o.id]=l;var a=s.indexOf(o);if(a===0)l.$el.prependTo(u);else if(a>=s.length-1)l.$el.appendTo(u);else{var c=e.getModelViewAt(s.at(a-1).id);l.$el.insertAfter(c.$el)}},e.removeItem=function(t){var n=e.getModelViewAt(t.id);n.remove()},e.getModelViewAt=function(e){return r[e]},e.removeReferences(function(){e=null,r=null,i=null,s=null})},i=e.extend({constructor:function(t){var n=this;e.call(n,t),_.each([r],function(e){e.call(n,t)})},tagName:"ul",dataEvents:{add:"addHandler",remove:"removeHandler"},postRender:function(){var e=this,t=this.$el,n=this.collection;t.hide(),n.each(function(n){e.addItem(n,t)}),t.show()},addHandler:function(e,t){this.addItem(t)},removeHandler:function(e,t){this.removeItem(t)}});return i});
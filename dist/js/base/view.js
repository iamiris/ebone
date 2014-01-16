define(["base/app","base/model","base/util","base/mixins/config"],function(e,t,n,r){var i=Backbone.View.extend({constructor:function(e){var t=this;t.removeQue=[],t.removed=!1,t.rendered=!1,Backbone.View.call(t,e),_.each(m,function(e){e(t)})},setupView:function(){},tearUpView:function(){},postSetup:function(){},postMetaLoad:function(){},render:function(){var n=this;n.$el.addClass("rendering"),n.model||(n.model=new t);var r=(new Date).getTime();n.beforeRender();var i=v(n,function(){n.removeChildViews&&n.removeChildViews(),e.getTemplateDef(n.getTemplate(),n.getTemplateType()).done(v(n,function(e){n.renderTemplate(e),a(n);if(n.setState){n.clearState();var t=_.keys(n.getOption("states"))[0];n.setState(n.getState()||n.getOption("state")||t)}n.postRender(),n.$el.removeClass("rendering");var i=(new Date).getTime()-r;i>20&&console.warn(this.$el[0],i),n.rendered=!0,n.trigger("rendered")}))}),s=function(){n.postMetaLoad.apply(n,arguments),i()};if(!n.rendered){var o=n.loadMeta();o.done(v(n,s))}else i();return n},postRender:function(){},beforeRender:function(){},renderTemplate:function(e){this.$el.html(e(this.serialize()))},getOption:function(e){return this.options[e]||this[e]},loadingHandler:function(e){this.$el.toggleClass("loading",e)},metaLoadErrorHandler:function(){this.$el.html("Error Loading Meta Data")},addMethod:function(e,t){this[e]||(this[e]=t)},serialize:function(){var e=this.getOption("useDeepJSON");return this.model.toJSON(e)},remove:function(){this.removeChildViews(),Backbone.View.prototype.remove.call(this),this.removeReferences(),this.stopListening(),this.removeQue=null,this.removed=!0},removeReferences:function(e){e?this.removeQue.push(e):_.each(this.removeQue,function(e){e.call(this)})},show:function(){this.$el.show()},hide:function(){this.$el.hide()}});i.deepExtendMethods=function(e){var t=this.prototype;_.each(e,function(e,n){var r=t[n];if(!r)throw new Error("Method with name: "+n+" doesn't exists to deep extend");t[n]=function(){r.apply(this,arguments),e.apply(this,arguments)}})},i.templateTypes={UNDERSCORE:"underscore",HANDLEBARS:"handlebars"};var s=function(e){var t=e.model||e.collection,n;n=e.dataEvents,_.each(n,function(n,r){var i,s,o;o=/\s+/,s=n.split(o),i=r.split(o),_.each(s,function(n){_.each(i,function(r){e.listenTo(t,r,function(){if(!e[n])throw n+" Not Defined";var t=Array.prototype.slice.call(arguments);t.unshift(r),e[n].apply(e,t)})})})})},o=function(e){var t=e.getOption("states");if(!t)return;var r,i,s=function(){i&&i.remove()},o=function(t){if(e.$(".state-view").length===0)throw new Error('Rendering state needs element with class "state-view".');i=n.createView({View:t,model:e.model,parentEl:".state-view",parentView:e}),e.listenTo(i,"setState",function(t){e.setState(t)})};e.setState=function(e){if(typeof e!="string")throw new Error("state should be a string");if(r===e)return;r=e;var n=t[e];if(!n)throw new Error("Invalid State");s(),o(n)},e.getState=function(){return r},e.clearState=function(){s(),r=undefined},e.removeReferences(function(){t=null,r=null,i=null,e=null})},u=function(e){var t=e.getOption("template")||e.template;e.setTemplate=function(n){t=n,e.render()},e.getTemplate=function(){return t},e.getTemplateType=function(){return e.getOption("templateType")||"Handlebars"},e.removeReferences(function(){t=null,e=null})},a=function(e){var t={},r=e.getOption("views");e.getSubView=function(e){var n=t[e];if(n)return n;throw new Error("No View Defined for id :"+e)},e.setSubView=function(e,n){t[e]=n},e.getAllSubViews=function(){return t},e.getSubCollection=function(t){return e.getSubView(t).collection},e.getSubModel=function(t){return e.getSubView(t).model},e.getSubAttribute=function(t,n){return e.getSubModel(t).get(n)},e.removeReferences(function(){r=null,t=null,e=null}),_.each(r,function(t,r){typeof t=="function"&&(t=t.call(e)),t.parentView=e;var i=n.createView(t);e.setSubView(r,i)})},f=function(e){var t=e.model,n=e.getOption("preRendered"),r=function(){l.call(e,t.toJSON(),!0),e.listenTo(t,"change",function(){l.call(e,t.changedAttributes())})};t&&(n?r():e.listenToOnce(e,"rendered",r))},l=function(e,t){_.each(e,function(e,n){var r=this[n+"ChangeHandler"];r&&typeof r=="function"&&r.call(this,e,t)},this);var n=this.changeHandler;n&&typeof n=="function"&&n.call(this,e,t)},c=function(e){var t=function(e){e.actionHandled&&(e.stopPropagation(),$("body").trigger("click"))};e.actionHandler&&e.$el.on("click",".action",function(n){n.preventDefault();var r=$(n.currentTarget),i=r.attr("href").substr(1);e.actionHandler.call(e,i,n),t(n)}),e.$el.on("click",".dummy",function(e){e.preventDefault()}),e.removeReferences(function(){e.$el.off(),e=null})},h=function(e){var t=e.getOption("renderEvents")||e.renderEvents;t&&t.length>0&&e.listenTo(e.model,t.join(" "),function(){e.render.call(e)})},p=function(t){var n=t.getOption("requests")||t.requests,r=0,i=v(t,function(){r++,r>0&&t.loadingHandler.call(t,!0)}),s=v(t,function(){r--,r<1&&t.loadingHandler.call(t,!1)});t.addRequest=function(t,n){var r=t;_.isArray(r)||(r=[r]);var o=_.map(r,function(t){var n=e.getRequestDef(t);return t.callback&&n.always(t.callback),i(),n.always(s),n}),u=$.when.apply(null,o);return n&&u.then(n),u},t.loadMeta=function(){if(!t.metaDef){var e=n?t.addRequest(n,v(t,function(){var e=t.getOption("requestsParser");e&&e.apply(t,arguments)})):$.when({});t.metaDef=e}return t.metaDef},t.removeReferences(function(){n=null,r=null,t=null})},d=function(e){var t=[];e.addChildView=function(e){t.push(e)},e.removeChildViews=function(){_.each(t,function(e){e.parentView=null,e&&e.remove&&e.remove()}),t=[]},e.removeReferences(function(){t=null,e=null})},v=function(e,t){return function(){e.removed||t.apply(e,arguments)}},m=[s,p,u,f,c,h,o,d,r];return i});
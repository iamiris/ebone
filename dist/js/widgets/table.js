define(["base/app","base/view","base/model","base/collection","base/util","widgets/table/rowCollection","widgets/table/pagination"],function(e,t,n,r,i,s,o){var u=n.extend({}),a=t.extend({constructor:function(){var e=this;t.apply(e,arguments);var n=e.getOption("rowModel");if(!n)return;var r=e.model.get("key");e.listenTo(n,"change:"+r,function(t,n){e.model.set("value",n)})},tagName:"td",template:'<div class="cell-value" style="text-align: {{align}};">{{#if renderHTML}}{{{value}}}{{else}}{{value}}{{/if}}</div>',attributes:function(){var e=this.model.toJSON();return{"class":e.classNames,style:"width:"+e.width,"data-key":e.key}},valueChangeHandler:function(){this.render()},valueFunction:function(){return this.model.get("value")}}),f=a.extend({tagName:"th",template:'<div class="cell-value" style="text-align: {{align}};">{{#if renderHTML}}{{{label}}}{{else}}{{label}}{{/if}}</div>'}),l=f.extend({constructor:function(){var e=this;t.apply(e,arguments);var n=e.getOption("rowCollection"),r=e.model.get("key"),i=function(){var t=n.getProcessedRecords(),i=_.filter(t,function(e){return e.get(r)===!0});t.length===0?(e.model.set("value",!1),e.model.set("disabled",!0)):(i.length===t.length?e.model.set("value",!0):e.model.set("value",!1),e.model.set("disabled",!1))};e.listenTo(n,"change:"+r,i),i()},template:'<label class="cell-value" style="text-align: {{align}}; display:block;"> <input type="checkbox" /></label>',events:{"change input":"updateRowCollection"},updateRowCollection:function(){var e=this.model.get("key"),t=this.getOption("rowCollection"),n=t.getProcessedRecords(),r=this.valueFunction();_.each(n,function(t){t.set(e,r)})},valueFunction:function(){return this.$("input").is(":checked")},valueChangeHandler:function(e){this.$("input").prop("checked",e)},disabledChangeHandler:function(e){this.$("input").prop("disabled",e)}}),c=a.extend({template:'<label class="cell-value" style="text-align: {{align}}; display:block;"> <input type="checkbox" /></label>',events:{"change input":"updateRowModel"},updateRowModel:function(){var e=this.getOption("rowModel"),t=this.model.get("key");e.set(t,this.valueFunction())},valueFunction:function(){return this.$("input").is(":checked")},valueChangeHandler:function(e){this.$("input").prop("checked",e)},disabledChangeHandler:function(e){console.log(e,this.$("input")),this.$("input").prop("disabled",e)}}),h={checkbox:c},p={checkbox:l},d=t.extend({tagName:"tr",className:"table-row",postRender:function(){var e=this,t=this.model.toJSON(!0),r=t.items,s=this.getOption("rowModel");_.each(r,function(t){var r=h[t.type]||a,o=i.createView({View:r,Model:n,modelAttributes:t,rowModel:s,parentView:e});o.$el.appendTo(e.$el)})},useDeepJSON:!0}),v=d.extend({className:"table-heading",postRender:function(){var e=this,t=this.model.toJSON(!0),r=t.items,s=this.getOption("rowCollection");_.each(r,function(t){var r=p[t.type]||f,o=i.createView({View:r,Model:n,modelAttributes:t,rowCollection:s,parentView:e});o.$el.appendTo(e.$el)})}}),m=t.extend({tagName:"tr",className:"table-row no-data-row",template:'<td colspan="{{colspan}}">{{{value}}}</td>'}),g=function(){var t=this,s={},o=this.$el,u=this.getOption("rowCollection"),a=this.getOption("columns");t.addItem=function(o,f,l){var c=u.getConfig("sortOrder"),h=u.getConfig("sortKey"),p=_.map(a,function(t){var n=["cell"];h===t.key&&(n.push("sorted"),n.push("order-"+c)),f%2===0&&n.push("even");var r=o.toJSON();return{key:t.key,type:t.type||"value",classNames:n.join(" "),value:e.getFormatted(r[t.key],t.formatter,r),align:t.align||"left",width:t.width!==undefined?t.width+"px":"auto",renderHTML:t.renderHTML}}),v=new n({items:new r(p)}),m=i.createView({model:v,View:d,parentView:t,rowModel:o});s[m.cid]=m,m.$el.appendTo(l)},t.addHeaderItem=function(o){var f=u.getConfig("sortOrder"),l=u.getConfig("sortKey"),c=_.map(a,function(t){var n=["header-cell"];return t.sortable!==!1&&n.push("sortable"),l===t.key&&(n.push("sorted"),n.push("order-"+f)),{key:t.key,type:t.type||"value",classNames:n.join(" "),label:t.label||e.beautifyId(t.key),align:t.align||"left",width:t.width?t.width+"px":"auto"}}),h=new n({items:new r(c)}),p=i.createView({View:v,model:h,parentEl:o,parentView:t,rowCollection:u});s[p.cid]=p},t.renderNoData=function(){var e=i.createView({View:m,parentEl:".row-list",parentView:t,model:new n({colspan:a.length,value:t.getOption("noDataTemplate")||"No Records"})});s[e.cid]=e},t.removeItem=function(e){var n=t.getModelViewAt(e.id);n.remove()},t.removeAllRows=function(){_.each(s,function(e){e.remove()})},t.getModelViewAt=function(e){return s[e]},t.removeReferences(function(){t=null,s=null,o=null,u=null})},y=t.extend({template:'<div class="table-header"></div> <table class="row-list"></table><div class="table-footer"></div>',className:"data-table",events:{"click th.sortable":"toggleSort"},constructor:function(e){var n=this;t.call(n,e),_.each([g],function(t){t.call(n,e)});var r=this.getOption("rowCollection");n.listenTo(r,"configChange",n.loadRows)},redrawTable:function(){this.removeAllRows(),this.renderHeader(),this.renderRows()},postRender:function(){this.loadRows()},loadRows:function(){var e=this,t="loadComplete";e.stopListening(e,t),e.listenToOnce(e,t,e.redrawTable);var n=this.getOption("rowCollection"),r=n.getConfigs();if(r.requestId){var i=e.addRequest({id:r.requestId,params:r});i.done(function(r){n.reset(r.results),n.setConfig("totalRecords",r.totalRecords),e.trigger(t,t)})}else if(n.url){var s=n.fetch({processData:!0,reset:!0});s.done(function(){e.trigger(t)})}else e.trigger(t)},renderRows:function(){var e=this,t=e.getOption("rowCollection"),n=t.getProcessedRecords(),r=this.$(".row-list");n.length===0?e.renderNoData():_.each(n,function(t,n){e.addItem(t,n,r)})},renderHeader:function(){var e=this,t=this.$(".row-list");e.addHeaderItem(t)},loadingHandler:function(e){t.prototype.loadingHandler.call(this,e)},toggleSort:function(e){if(this.$(".no-data-row").length>0){e.preventDefault();return}var t=$(e.currentTarget),n=t.data("key");this.getOption("rowCollection").setSortKey(n)}});return{View:y,RowCollection:s,Model:u}});
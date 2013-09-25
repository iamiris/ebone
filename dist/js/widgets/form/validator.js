define(["base/app"],function(e){var t=function(e,t){var r=[],i,s=_.every(t,function(t){var s=n[t.expr].call(this,t,e);return s||(r.push(t),i=t),s});return{isValid:s,errors:r,errorRule:i}},n={req:function(e,t){return!_.isEmpty(t)},digits:function(e,t){return/^\d{5}$/.test(t)},alphanumeric:function(e,t){var n=/^\w+$/;return n.test(t)},number:function(e,t){if(t===undefined)return!0;var n=+t;return n===n},email:function(e,t){var n=/^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return n.test($.trim(t))},minlen:function(e,t){var n=e.length;return $.trim(String(t)).length>=n},maxlen:function(e,t,n){var r=e.length;return $.trim(String(t)).length<=r},lt:function(e,t,n){var r=parseFloat(n),i=parseFloat(t);return i<r},gt:function(e,t,n){var r=parseFloat(n),i=parseFloat(t);return i>r},eq:function(e,t,n){return n===t},neq:function(e,t){return e.value!==t},url:function(e,t){if(t==="")return!0;var n=/(http|https|market):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;return n.test($.trim(t))},emaillist:function(e,t){var n=t.split(","),r=/^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;for(var i=0;i<n.length;i++)if($.trim(n[i])!==""&&!r.test($.trim(n[i])))return!1;return!0},"function":function(e,t){var n=e.func;return n.call(null,t)}};return{validateValue:t,validationRuleMethods:n}});
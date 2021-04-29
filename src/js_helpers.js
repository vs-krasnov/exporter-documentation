!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t){Pulsar.registerFunction("pageUrl",(function(e,t){var r;let n=null!==(r=e.userSlug)&&void 0!==r?r:e.slug,a=[],u=e.parent;for(;u;)a.push(u.title.replace(/\W+/g,"-").toLowerCase()),u=u.parent;return a.pop(),[t,...a.reverse(),n].join("/")+".html"})),Pulsar.registerFunction("assetUrl",(function(e,t){return[t,"assets",e].join("/")})),Pulsar.registerFunction("highlightSafeString",(function(e){return function(e){var t,r=""+e,n=/["'&<>]/.exec(r);if(!n)return r;var a="",u=0,i=0;for(u=n.index;u<r.length;u++){switch(r.charCodeAt(u)){case 34:t="&quot;";break;case 38:t="&amp;";break;case 39:t="&#39;";break;case 60:t="&lt;";break;case 62:t="&gt;";break;default:continue}i!==u&&(a+=r.substring(i,u)),i=u+1,a+=t}return i!==u?a+r.substring(i,u):a}(e.text.spans.map(e=>e.text).join(""))})),Pulsar.registerFunction("isExperimentalBlock",(function(e){return 1===e.text.spans.length&&e.text.spans[0].text.startsWith("[block:")})),Pulsar.registerFunction("parseExperimentalBlock",(function(e){let t=e.text.spans[0].text;t=t.substr(1);let r=t.split("]"),n=r[1].trim(),a=r[0].split(":")[1],u=n.split("|").map(e=>e.trim()),i=new Array,o=new Array;u.forEach((e,t)=>{t%2==0?i.push(e):o.push(e)}),i=i.length>0?i:["Header"],o=o.length>0?o:[n],i.length!==o.length&&(i=["Incorrect tab structure"],o=["Imbalanced number of tab structures, must be pairs of header / content"]);return{blockType:a,payload:n,tabs:{headers:i,content:o}}})),Pulsar.registerFunction("formattedTokenGroupHeader",(function(e,t){if(e.path.length>0&&t){let t=e.path.join(" / "),r=e.name;return`<span class="light">${t} / </span>${r}`}return e.name})),Pulsar.registerFunction("fullTokenGroupName",(function(e){return[...e.path,e.name].join("/")})),Pulsar.registerFunction("gradientDescription",(function(e){let t=e.value.type+" Gradient",r=e.value.stops.map(e=>`#${e.color.hex.toUpperCase()}, ${100*e.position}%`).join(", ");return`${t}, ${r}`})),Pulsar.registerFunction("gradientTokenValue",(function(e){let t="";switch(e.value.type){case"Linear":t="linear-gradient(0deg, ";break;case"Radial":t="radial-gradient(circle, ";break;case"Angular":t="conic-gradient("}let r=e.value.stops.map(e=>`#${e.color.hex.toUpperCase()} ${100*e.position}%`).join(", ");return`${t}${r})`})),Pulsar.registerFunction("measureTypeIntoReadableUnit",(function(e){switch(e){case"Points":return"pt";case"Pixels":return"px";case"Percent":return"%";case"Ems":return"em"}}))}]);
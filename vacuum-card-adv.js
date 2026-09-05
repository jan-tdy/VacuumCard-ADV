function t(t,e,i,r){var s,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(o<3?s(n):o>3?s(e,i,n):s(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new o(i,t,r)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,f=globalThis,m=f.trustedTypes,_=m?m.emptyScript:"",g=f.reactiveElementPolyfillSupport,$=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&l(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);s?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=r;const o=s.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){const o=this.constructor;if(!1===r&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[$("elementProperties")]=new Map,w[$("finalized")]=new Map,g?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=t=>t,k=x.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+P,E=`<${M}>`,R=document,I=()=>R.createComment(""),F=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,T="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,D=/>/g,H=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=B(1),W=B(2),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Y=new WeakMap,X=R.createTreeWalker(R,129);function J(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,r=[];let s,o=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(n.lastIndex=h,c=n.exec(i),null!==c);)h=n.lastIndex,n===N?"!--"===c[1]?n=U:void 0!==c[1]?n=D:void 0!==c[2]?(j.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=H):void 0!==c[3]&&(n=H):n===H?">"===c[0]?(n=s??N,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?H:'"'===c[3]?L:z):n===L||n===z?n=H:n===U||n===D?n=N:(n=H,s=void 0);const d=n===H&&t[e+1].startsWith("/>")?" ":"";o+=n===N?i+E:l>=0?(r.push(a),i.slice(0,l)+C+i.slice(l)+P+d):i+P+(-2===l?e:d)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class Z{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,o=0;const n=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=Z.createElement(c,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=X.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(C)){const e=l[o++],i=r.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?rt:"?"===n[1]?st:"@"===n[1]?ot:it}),r.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:s}),r.removeAttribute(t));if(j.test(r.tagName)){const t=r.textContent.split(P),e=t.length-1;if(e>0){r.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],I()),X.nextNode(),a.push({type:2,index:++s});r.append(t[e],I())}}}else if(8===r.nodeType)if(r.data===M)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(P,t+1));)a.push({type:7,index:s}),t+=P.length-1}s++}}static createElement(t,e){const i=R.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,r){if(e===q)return e;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const o=F(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,r)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??R).importNode(e,!0);X.currentNode=r;let s=X.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new et(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new nt(s,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(s=X.nextNode(),o++)}return X.currentNode=R,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),F(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new tt(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new Z(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new et(this.O(I()),this.O(I()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,r){const s=this.strings;let o=!1;if(void 0===s)t=Q(this,t,e,0),o=!F(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const r=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=Q(this,r[i+n],e,n),a===q&&(a=this._$AH[n]),o||=!F(a)||a!==this._$AH[n],a===G?t=G:t!==G&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class st extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class ot extends it{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===q)return;const i=this._$AH,r=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==G&&(i===G||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(Z,et),(x.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class lt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let s=r._$litPart$;if(void 0===s){const t=i?.renderBefore??null;r._$litPart$=s=new et(e.insertBefore(I(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const ht=ct.litElementPolyfillSupport;ht?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ut={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},pt=(t=ut,e,i)=>{const{kind:r,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,s,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];e.call(this,i),this.requestUpdate(r,s,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ft(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function mt(t){return ft({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _t(t,e){return(e,i,r)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const gt=[{name:"Empty Dust Bin",icon:"mdi:delete-empty"},{name:"Wash Mop",icon:"mdi:water-sync"},{name:"Dry Mop",icon:"mdi:tumble-dryer"},{name:"Remove Hair",icon:"mdi:content-cut"}],$t=["schedules","status"];function vt(t){return t.entities}function yt(t,e){const i=vt(t)?.[e];if(i?.name)return i.name;if(i?.original_name)return i.original_name;const r=t.states[e],s=r?.attributes?.friendly_name;return"string"==typeof s?s:e}function bt(t,e){return t.filter(t=>t.startsWith(`${e}.`))}function wt(t,e){const i=function(t,e){const i=vt(t);if(!i)return[];const r=i[e]?.device_id;return r?Object.keys(i).filter(t=>i[t]?.device_id===r):[]}(t,e),r={dockActions:[],sensors:[],maintenanceSensors:[]};if(0===i.length)return r;r.camera=bt(i,"camera")[0];for(const e of bt(i,"select")){const i=yt(t,e);i.includes("Water Level")?r.waterLevel=e:i.includes("Clean Passes")&&(r.cleanPasses=e)}for(const e of bt(i,"sensor")){const i=t.states[e];if("battery"===i?.attributes?.device_class){r.battery=e;continue}const s=yt(t,e).toLowerCase();if(s.includes("remaining"))r.maintenanceSensors.push(e);else{if($t.some(t=>s.endsWith(t)))continue;r.sensors.push(e)}}for(const e of bt(i,"binary_sensor"))yt(t,e).toLowerCase().includes("mop")&&(r.mopAttached=e);for(const e of bt(i,"button")){const i=yt(t,e),s=gt.find(t=>t.name===i);s&&r.dockActions.push({entityId:e,name:s.name,icon:s.icon})}return r}function xt(t,e,i,r){const s=i.getBoundingClientRect(),o=s.left+s.width/2,n=s.top+s.height/2,a=i.offsetWidth||s.width,c=i.offsetHeight||s.height;let l=t-o,h=e-n;if(r%360!=0){const t=-r*Math.PI/180,e=Math.cos(t),i=Math.sin(t),s=l*i+h*e;l=l*e-h*i,h=s}const d=h+c/2;return{x:(l+a/2)*(i.naturalWidth/a),y:d*(i.naturalHeight/c)}}function At(t,e){return t.x>=e[0]&&t.x<=e[2]&&t.y>=e[1]&&t.y<=e[3]}function kt(t,e){let i=!1;for(let r=0,s=e.length-1;r<e.length;s=r++){const[o,n]=e[r],[a,c]=e[s];n>t.y!=c>t.y&&t.x<(a-o)*(t.y-n)/(c-n)+o&&(i=!i)}return i}function St(t,e,i){const r=t.x-e,s=t.y-i;return r*r+s*s}const Ct={brown:{fill:"#bcaaa4",stroke:"#6d4c41",detail:"#8d6e63",line:"#4e342e"},white:{fill:"#fafafa",stroke:"#9e9e9e",detail:"#e0e0e0",line:"#757575"}};function Pt(t){return Ct[t??"brown"]??Ct.brown}const Mt=[{type:"bed",label:"Bed",icon:"mdi:bed",widthPct:.16,heightPct:.24},{type:"sofa",label:"Sofa",icon:"mdi:sofa",widthPct:.28,heightPct:.11},{type:"table",label:"Table",icon:"mdi:table-furniture",widthPct:.16,heightPct:.1},{type:"desk",label:"Desk",icon:"mdi:desk",widthPct:.16,heightPct:.08},{type:"chair",label:"Chair",icon:"mdi:chair-rolling",widthPct:.07,heightPct:.07},{type:"wardrobe",label:"Wardrobe",icon:"mdi:wardrobe",widthPct:.14,heightPct:.06},{type:"toilet",label:"Toilet",icon:"mdi:toilet",widthPct:.07,heightPct:.09},{type:"sink",label:"Sink",icon:"mdi:sink",widthPct:.07,heightPct:.055},{type:"bathtub",label:"Bathtub",icon:"mdi:bathtub",widthPct:.11,heightPct:.2},{type:"fridge",label:"Fridge",icon:"mdi:fridge-outline",widthPct:.065,heightPct:.065},{type:"washing_machine",label:"Washing Machine",icon:"mdi:washing-machine",widthPct:.065,heightPct:.065},{type:"tv",label:"TV",icon:"mdi:television",widthPct:.14,heightPct:.025},{type:"stairs",label:"Stairs",icon:"mdi:stairs",widthPct:.12,heightPct:.16},{type:"plant",label:"Plant",icon:"mdi:flower",widthPct:.04,heightPct:.04},{type:"custom",label:"Custom",icon:"mdi:shape-outline",widthPct:.09,heightPct:.09}];function Et(t){return Mt.find(e=>e.type===t)??Mt[Mt.length-1]}function Rt(t){return(t%360+360)%360}function It(t,e,i){const r=-e/2,s=-i/2,o=Math.min(e,i);switch(t){case"bed":{const t=.22*i;return W`
        <rect x=${r} y=${s} width=${e} height=${i} rx=${.08*o} class="furn-body"></rect>
        <rect x=${r+.08*e} y=${s+.06*i} width=${.84*e} height=${t} rx=${.3*t} class="furn-detail"></rect>
        <line x1=${r} y1=${s+.42*i} x2=${r+e} y2=${s+.42*i} class="furn-line"></line>
      `}case"sofa":{const t=.14*e;return W`
        <rect x=${r} y=${s} width=${e} height=${i} rx=${.25*i} class="furn-body"></rect>
        <rect x=${r} y=${s} width=${t} height=${i} rx=${.25*i} class="furn-detail"></rect>
        <rect x=${r+e-t} y=${s} width=${t} height=${i} rx=${.25*i} class="furn-detail"></rect>
        <rect x=${r+.6*t} y=${s} width=${e-1.2*t} height=${.3*i} rx=${.1*i} class="furn-detail"></rect>
      `}case"table":return W`<rect x=${r} y=${s} width=${e} height=${i} rx=${.06*o} class="furn-body"></rect>`;case"desk":return W`
        <rect x=${r} y=${s} width=${e} height=${i} rx=${.06*o} class="furn-body"></rect>
        <rect x=${r} y=${s} width=${e} height=${.22*i} class="furn-detail"></rect>
      `;case"chair":return W`
        <rect x=${r} y=${s+.18*i} width=${e} height=${.82*i} rx=${.15*e} class="furn-body"></rect>
        <rect x=${r} y=${s} width=${e} height=${.28*i} rx=${.15*e} class="furn-detail"></rect>
      `;case"wardrobe":return W`
        <rect x=${r} y=${s} width=${e} height=${i} class="furn-body"></rect>
        <line x1="0" y1=${s} x2="0" y2=${s+i} class="furn-line"></line>
      `;case"toilet":{const t=.28*i;return W`
        <rect x=${r} y=${s} width=${e} height=${t} rx=${.1*e} class="furn-detail"></rect>
        <ellipse cx="0" cy=${s+t+(i-t)/2} rx=${e/2} ry=${(i-t)/2} class="furn-body"></ellipse>
      `}case"sink":return W`
        <rect x=${r} y=${s} width=${e} height=${i} rx=${.2*o} class="furn-body"></rect>
        <ellipse cx="0" cy="0" rx=${.32*e} ry=${.32*i} class="furn-detail"></ellipse>
      `;case"bathtub":return W`
        <rect x=${r} y=${s} width=${e} height=${i} rx=${.4*o} class="furn-body"></rect>
        <rect x=${r+.12*e} y=${s+.12*i} width=${.76*e} height=${.76*i} rx=${.3*o} class="furn-detail"></rect>
      `;case"fridge":return W`
        <rect x=${r} y=${s} width=${e} height=${i} rx=${.1*o} class="furn-body"></rect>
        <line x1=${r} y1=${s+.35*i} x2=${r+e} y2=${s+.35*i} class="furn-line"></line>
      `;case"washing_machine":return W`
        <rect x=${r} y=${s} width=${e} height=${i} rx=${.12*o} class="furn-body"></rect>
        <circle cx="0" cy=${.08*i} r=${.3*o} class="furn-detail"></circle>
      `;case"tv":return W`<rect x=${r} y=${s} width=${e} height=${i} rx=${.15*i} class="furn-body"></rect>`;case"stairs":{const t=5,o=i/t,n=[];for(let i=1;i<t;i++){const t=s+o*i;n.push(W`<line x1=${r} y1=${t} x2=${r+e} y2=${t} class="furn-line"></line>`)}return W`
        <rect x=${r} y=${s} width=${e} height=${i} class="furn-body"></rect>
        ${n}
      `}case"plant":return W`<circle cx="0" cy="0" r=${o/2} class="furn-body furn-plant"></circle>`;default:return W`<rect x=${r} y=${s} width=${e} height=${i} rx=${.08*o} class="furn-body"></rect>`}}function Ft(t,e,i,r,s){return V`
    <ha-form
      .hass=${t}
      .data=${{value:i}}
      .schema=${[{name:"value",selector:{select:{mode:"dropdown",options:r}}}]}
      .computeLabel=${()=>e}
      @value-changed=${t=>{t.stopPropagation(),s(t.detail.value.value)}}
    ></ha-form>
  `}let Ot=class extends lt{constructor(){super(...arguments),this._calibrationPoints=[],this._calibrationSnap90=!0,this._furniture=[],this._furnitureAddType="bed"}setConfig(t){this._config=t,this._furniture=t.furniture??[]}_fireConfigChanged(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_valueChanged(t,e){this._config[t]!==e&&this._fireConfigChanged({...this._config,[t]:e})}get _cameraId(){if(this._config?.vacuum)return this._config.camera??wt(this.hass,this._config.vacuum).camera}get _roomGeometry(){const t=this._cameraId;if(!t)return;const e=this.hass.states[t]?.attributes?.room_geometry;return e&&e.rooms?.length?e:void 0}render(){return this.hass&&this._config?V`
      <div class="section">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.vacuum??""}
          .includeDomains=${["vacuum"]}
          label="Vacuum entity (required)"
          @value-changed=${t=>this._valueChanged("vacuum",t.detail.value)}
        ></ha-entity-picker>
      </div>

      ${this._config.vacuum?this._renderToggles():G}
      ${this._config.vacuum&&(this._config.show_map??!0)?this._renderRotation():G}
      ${this._config.vacuum?this._renderAdvancedEntities():G}
      ${this._config.vacuum&&(this._config.show_map??!0)?this._renderCalibration():G}
      ${this._config.vacuum&&(this._config.show_map??!0)?this._renderFurniture():G}
    `:G}_renderToggles(){return V`
      <div class="section toggles">
        ${[["show_map","Show map"],["show_room_names","Show room names when selecting"],["show_controls","Show start/pause/stop/dock controls"],["show_dock_actions","Show dock action buttons (empty bin / wash / dry / hair)"],["show_fan_speed","Show fan speed selector"],["show_water_level","Show water level selector"],["show_battery","Show battery"],["show_mop_status","Show mop attached status"],["show_sensors","Show sensors"],["show_last_updated","Show last updated time"],["show_furniture","Show furniture on map"]].map(([t,e])=>V`
            <ha-formfield .label=${e}>
              <ha-switch
                .checked=${this._config[t]??!0}
                @change=${e=>this._valueChanged(t,e.target.checked)}
              ></ha-switch>
            </ha-formfield>
          `)}
      </div>
    `}_renderRotation(){return V`
      <div class="section map-layout">
        <ha-textfield
          label="Map rotation (degrees)"
          type="number"
          .value=${String(this._config.map_rotation??0)}
          @change=${t=>this._valueChanged("map_rotation",Number(t.target.value)||0)}
        ></ha-textfield>
        ${Ft(this.hass,"Map position",this._config.map_position??"top",[{value:"top",label:"Top (after controls)"},{value:"bottom",label:"Bottom (after battery/sensors)"}],t=>this._valueChanged("map_position",t))}
      </div>
    `}_renderAdvancedEntities(){return V`
      <div class="section advanced">
        <div class="section-title">Entity overrides (optional — auto-detected otherwise)</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.camera??""}
          .includeDomains=${["camera"]}
          label="Map camera"
          @value-changed=${t=>this._valueChanged("camera",t.detail.value||void 0)}
        ></ha-entity-picker>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.water_level_entity??""}
          .includeDomains=${["select"]}
          label="Water level select"
          @value-changed=${t=>this._valueChanged("water_level_entity",t.detail.value||void 0)}
        ></ha-entity-picker>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.battery_entity??""}
          .includeDomains=${["sensor"]}
          label="Battery sensor"
          @value-changed=${t=>this._valueChanged("battery_entity",t.detail.value||void 0)}
        ></ha-entity-picker>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.mop_attached_entity??""}
          .includeDomains=${["binary_sensor"]}
          label="Mop attached sensor"
          @value-changed=${t=>this._valueChanged("mop_attached_entity",t.detail.value||void 0)}
        ></ha-entity-picker>
        <div class="hint">
          The full list of sensors shown, and which sensors count as "maintenance", can be
          overridden via <code>sensors</code> / <code>maintenance_sensors</code> in the YAML
          editor (switch using the ⋮ menu above) — every sensor on the device is included
          automatically otherwise.
        </div>
      </div>
    `}_renderCalibration(){const t=this._roomGeometry,e=this._cameraId,i=e?this.hass.states[e]?.attributes?.entity_picture:void 0;return V`
      <div class="section">
        <div class="section-title">Room calibration</div>
        <div class="hint">
          Rooms already work out of the box using an automatically-detected rectangle. Use this
          only if a room's shape is irregular and the automatic click area feels wrong: pick a
          room, click points on the map below to trace its actual outline (points connect live),
          then finish to save it.
        </div>
        ${t&&i?V`
              ${Ft(this.hass,"Room to calibrate",void 0!==this._calibrationRoomId?String(this._calibrationRoomId):"",t.rooms.map(t=>({value:String(t.id),label:t.name})),t=>{const e=Number(t),i=Number.isNaN(e)?void 0:e;i!==this._calibrationRoomId&&(this._calibrationRoomId=i,this._calibrationPoints=[])})}

              ${void 0!==this._calibrationRoomId?V`
                    <ha-formfield label="Snap corners to 90°">
                      <ha-switch
                        .checked=${this._calibrationSnap90}
                        @change=${t=>this._calibrationSnap90=t.target.checked}
                      ></ha-switch>
                    </ha-formfield>
                    <div class="hint">
                      Each new point snaps to a straight horizontal/vertical line from the last one,
                      so the outline comes out as clean right-angle walls instead of a hand-drawn
                      shape. Turn off for a genuinely angled/non-rectilinear room.
                    </div>
                    <div class="map-wrap">
                      <img
                        class="calib-image"
                        src=${i}
                        @click=${this._onCalibrationClick}
                      />
                      <svg
                        class="map-overlay"
                        viewBox="0 0 ${t.image_width} ${t.image_height}"
                        preserveAspectRatio="none"
                      >
                        ${this._renderCalibrationOverlay(t)}
                      </svg>
                    </div>
                    <div class="calib-actions">
                      <mwc-button
                        @click=${this._finishCalibration}
                        ?disabled=${this._calibrationPoints.length<3}
                        >Finish polygon</mwc-button
                      >
                      <mwc-button @click=${()=>this._calibrationPoints=[]}
                        >Clear points</mwc-button
                      >
                      <mwc-button @click=${this._deleteCalibration}>Delete saved calibration</mwc-button>
                    </div>
                  `:G}
            `:V`<div class="hint">Map not available yet — open a dashboard with this vacuum first.</div>`}
      </div>
    `}_renderCalibrationOverlay(t){const e=this._calibrationRoomId,i=t.rooms.find(t=>t.id===e),r=void 0!==e?this._config.room_polygons?.[String(e)]:void 0,s=r&&r.length>=3?W`<polygon
            points=${r.map(([t,e])=>`${t},${e}`).join(" ")}
            fill="rgba(3,169,244,0.25)"
            stroke="rgb(3,169,244)"
            stroke-width="3"
          ></polygon>`:G,o=i?W`<rect
          x=${i.bbox[0]}
          y=${i.bbox[1]}
          width=${i.bbox[2]-i.bbox[0]}
          height=${i.bbox[3]-i.bbox[1]}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          stroke-dasharray="6,4"
          stroke-width="2"
        ></rect>`:G,n=this._calibrationPoints.length>0?W`
            <polyline
              points=${this._calibrationPoints.map(([t,e])=>`${t},${e}`).join(" ")}
              fill="none"
              stroke="rgb(255,152,0)"
              stroke-width="3"
            ></polyline>
            ${this._calibrationPoints.map(([t,e])=>W`<circle cx=${t} cy=${e} r="5" fill="rgb(255,152,0)"></circle>`)}
          `:G;return W`${o}${s}${n}`}_onCalibrationClick(t){const e=t.currentTarget,i=xt(t.clientX,t.clientY,e,0);let r=Math.round(i.x),s=Math.round(i.y);if(this._calibrationSnap90&&this._calibrationPoints.length>0){const[t,e]=this._calibrationPoints[this._calibrationPoints.length-1];Math.abs(r-t)>Math.abs(s-e)?s=e:r=t}this._calibrationPoints=[...this._calibrationPoints,[r,s]]}_finishCalibration(){if(void 0===this._calibrationRoomId||this._calibrationPoints.length<3)return;const t={...this._config.room_polygons??{}};t[String(this._calibrationRoomId)]=this._calibrationPoints,this._calibrationPoints=[],this._valueChanged("room_polygons",t)}_deleteCalibration(){if(void 0===this._calibrationRoomId||!this._config.room_polygons)return;const t={...this._config.room_polygons};delete t[String(this._calibrationRoomId)],this._calibrationPoints=[],this._valueChanged("room_polygons",t)}_renderFurniture(){const t=this._roomGeometry,e=this._cameraId,i=e?this.hass.states[e]?.attributes?.entity_picture:void 0,r=this._furniture.find(t=>t.id===this._selectedFurnitureId);return V`
      <div class="section">
        <div class="section-title">Furniture</div>
        <div class="hint">
          Furniture placed in the official Tapo app can't be read into Home Assistant (see the
          TapoVac-ADV README) — place it here instead: pick a type, click "Add", then drag its
          body to move it, the top handle to rotate, and the corner handle to resize.
        </div>
        <div class="furniture-add-row">
          ${Ft(this.hass,"Furniture type",this._furnitureAddType,Mt.map(t=>({value:t.type,label:t.label})),t=>this._furnitureAddType=t)}
          <mwc-button raised @click=${this._addFurniture} ?disabled=${!t}>
            <ha-icon icon="mdi:plus"></ha-icon>
            Add
          </mwc-button>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${{furniture_opacity:this._config.furniture_opacity??100}}
          .schema=${[{name:"furniture_opacity",selector:{number:{min:0,max:100,step:5,mode:"slider",unit_of_measurement:"%"}}}]}
          .computeLabel=${()=>"Furniture opacity"}
          @value-changed=${t=>{t.stopPropagation(),this._valueChanged("furniture_opacity",t.detail.value.furniture_opacity)}}
        ></ha-form>
        ${Ft(this.hass,"Furniture color",this._config.furniture_color??"brown",[{value:"brown",label:"Brown (wood-toned)"},{value:"white",label:"White (light gray)"}],t=>this._valueChanged("furniture_color",t))}

        ${t&&i?V`
              <div class="map-wrap">
                <img class="furniture-image" src=${i} />
                ${this._renderFurnitureOverlay(t)}
              </div>
            `:V`<div class="hint">Map not available yet — open a dashboard with this vacuum first.</div>`}
        ${r?this._renderFurnitureToolbar(r):G}
        ${this._furniture.length>0?this._renderFurnitureList():G}
      </div>
    `}_renderFurnitureOverlay(t){const e=Pt(this._config.furniture_color),i=`--furn-fill:${e.fill};--furn-stroke:${e.stroke};--furn-detail:${e.detail};--furn-line:${e.line};`;return V`
      <svg
        class="map-overlay furniture-overlay"
        viewBox="0 0 ${t.image_width} ${t.image_height}"
        preserveAspectRatio="none"
      >
        <rect
          x="0"
          y="0"
          width=${t.image_width}
          height=${t.image_height}
          class="furniture-bg-catcher"
          @pointerdown=${()=>this._selectedFurnitureId=void 0}
        ></rect>
        <g class="furniture-layer" style=${i}>
          ${this._furniture.map(t=>this._renderEditableFurnitureItem(t))}
        </g>
      </svg>
    `}_renderEditableFurnitureItem(t){const e=this._selectedFurnitureId===t.id,i=Math.max(8,.12*Math.min(t.width,t.height));return W`
      <g
        class="furniture-item ${e?"selected":""}"
        transform="translate(${t.x} ${t.y}) rotate(${t.rotation})"
        @pointerdown=${e=>this._startFurnitureDrag(e,t.id,"move")}
      >
        ${It(t.type,t.width,t.height)}
        ${e?W`
              <line
                x1="0"
                y1=${-t.height/2}
                x2="0"
                y2=${-t.height/2-22}
                class="handle-line"
              ></line>
              <circle
                cx="0"
                cy=${-t.height/2-22}
                r=${i}
                class="handle rotate-handle"
                @pointerdown=${e=>this._startFurnitureDrag(e,t.id,"rotate")}
              ></circle>
              <circle
                cx=${t.width/2}
                cy=${t.height/2}
                r=${i}
                class="handle resize-handle"
                @pointerdown=${e=>this._startFurnitureDrag(e,t.id,"resize")}
              ></circle>
            `:G}
      </g>
    `}_renderFurnitureToolbar(t){return V`
      <div class="furniture-toolbar">
        <ha-icon icon=${Et(t.type).icon}></ha-icon>
        <span>${Et(t.type).label}</span>
        <mwc-icon-button @click=${()=>this._rotateFurniture(t.id,-15)} title="Rotate left 15°">
          <ha-icon icon="mdi:rotate-left"></ha-icon>
        </mwc-icon-button>
        <span class="rotation-value">${Math.round(t.rotation)}°</span>
        <mwc-icon-button @click=${()=>this._rotateFurniture(t.id,15)} title="Rotate right 15°">
          <ha-icon icon="mdi:rotate-right"></ha-icon>
        </mwc-icon-button>
        <mwc-icon-button @click=${()=>this._removeFurniture(t.id)} title="Delete">
          <ha-icon icon="mdi:delete"></ha-icon>
        </mwc-icon-button>
      </div>
      <div class="furniture-fields">
        <ha-textfield
          label="X position"
          type="number"
          .value=${String(t.x)}
          @change=${e=>this._setFurnitureField(t.id,"x",e.target.value)}
        ></ha-textfield>
        <ha-textfield
          label="Y position"
          type="number"
          .value=${String(t.y)}
          @change=${e=>this._setFurnitureField(t.id,"y",e.target.value)}
        ></ha-textfield>
        <ha-textfield
          label="Width"
          type="number"
          .value=${String(t.width)}
          @change=${e=>this._setFurnitureField(t.id,"width",e.target.value)}
        ></ha-textfield>
        <ha-textfield
          label="Height"
          type="number"
          .value=${String(t.height)}
          @change=${e=>this._setFurnitureField(t.id,"height",e.target.value)}
        ></ha-textfield>
      </div>
    `}_renderFurnitureList(){return V`
      <div class="furniture-list">
        ${this._furniture.map(t=>{const e=Et(t.type);return V`
            <div
              class="furniture-list-row ${this._selectedFurnitureId===t.id?"selected":""}"
              @click=${()=>this._selectedFurnitureId=t.id}
            >
              <ha-icon icon=${e.icon}></ha-icon>
              <span>${e.label}</span>
              <mwc-icon-button
                @click=${e=>{e.stopPropagation(),this._removeFurniture(t.id)}}
                title="Delete"
              >
                <ha-icon icon="mdi:delete"></ha-icon>
              </mwc-icon-button>
            </div>
          `})}
      </div>
    `}_addFurniture(){const t=this._roomGeometry;if(!t)return;const e=function(t,e,i){const r=Et(t),s=Math.min(e.image_width,e.image_height),o=Math.max(12,Math.round(r.widthPct*s)),n=Math.max(12,Math.round(r.heightPct*s)),a=i.length%6*s*.03;return{id:`furn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,type:t,x:Math.round(e.image_width/2+a),y:Math.round(e.image_height/2+a),width:o,height:n,rotation:0}}(this._furnitureAddType,t,this._furniture);this._furniture=[...this._furniture,e],this._selectedFurnitureId=e.id,this._commitFurniture()}_removeFurniture(t){this._furniture=this._furniture.filter(e=>e.id!==t),this._selectedFurnitureId===t&&(this._selectedFurnitureId=void 0),this._commitFurniture()}_rotateFurniture(t,e){this._furniture=this._furniture.map(i=>i.id===t?{...i,rotation:Rt(i.rotation+e)}:i),this._commitFurniture()}_setFurnitureField(t,e,i){const r=Number(i);if(Number.isNaN(r))return;const s="width"===e||"height"===e?Math.max(12,Math.round(r)):Math.round(r);this._furniture=this._furniture.map(i=>i.id===t?{...i,[e]:s}:i),this._commitFurniture()}_commitFurniture(){this._valueChanged("furniture",this._furniture)}_startFurnitureDrag(t,e,i){t.stopPropagation(),t.preventDefault();const r=this._furnitureImg,s=this._furniture.find(t=>t.id===e);if(!r||!s)return;this._selectedFurnitureId=e;const o=t.currentTarget;o.setPointerCapture(t.pointerId);const n=xt(t.clientX,t.clientY,r,0),a=t=>{const o=xt(t.clientX,t.clientY,r,0);this._applyFurnitureDrag(e,i,s,n,o)},c=()=>{o.removeEventListener("pointermove",a),o.removeEventListener("pointerup",c),o.removeEventListener("pointercancel",c),this._commitFurniture()};o.addEventListener("pointermove",a),o.addEventListener("pointerup",c),o.addEventListener("pointercancel",c)}_applyFurnitureDrag(t,e,i,r,s){this._furniture=this._furniture.map(o=>{if(o.id!==t)return o;if("move"===e)return{...o,x:i.x+(s.x-r.x),y:i.y+(s.y-r.y)};if("rotate"===e){const t=180*Math.atan2(s.y-i.y,s.x-i.x)/Math.PI+90;return{...o,rotation:Math.round(Rt(t))}}const n=-i.rotation*Math.PI/180,a=s.x-i.x,c=s.y-i.y,l=a*Math.cos(n)-c*Math.sin(n),h=a*Math.sin(n)+c*Math.cos(n);return{...o,width:Math.max(12,Math.round(2*Math.abs(l))),height:Math.max(12,Math.round(2*Math.abs(h)))}})}};Ot.styles=n`
    .section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px 0;
      border-top: 1px solid var(--divider-color);
    }
    .section:first-child {
      border-top: none;
    }
    .section-title {
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .toggles {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
    }
    .map-layout {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .map-layout ha-textfield,
    .map-layout ha-form {
      flex: 1;
      min-width: 160px;
    }
    .hint {
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }
    .map-wrap {
      position: relative;
      width: 100%;
    }
    .calib-image {
      display: block;
      width: 100%;
      height: auto;
      cursor: crosshair;
    }
    .map-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .calib-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    /* Furniture */
    .furniture-add-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .furniture-add-row ha-form {
      flex: 1;
      min-width: 160px;
    }
    .furniture-image {
      display: block;
      width: 100%;
      height: auto;
    }
    .furniture-overlay {
      pointer-events: auto;
    }
    .furniture-bg-catcher {
      fill: transparent;
      pointer-events: all;
    }
    .furniture-item {
      cursor: move;
      touch-action: none;
    }
    .furniture-item .furn-body {
      fill: var(--furn-fill, #bcaaa4);
      stroke: var(--furn-stroke, #6d4c41);
      stroke-width: 2;
    }
    .furniture-item .furn-detail {
      fill: var(--furn-detail, #8d6e63);
      stroke: none;
    }
    .furniture-item .furn-line {
      stroke: var(--furn-line, #4e342e);
      stroke-width: 1.5;
    }
    .furniture-item .furn-plant {
      fill: #81c784;
      stroke: #2e7d32;
    }
    .furniture-item.selected .furn-body {
      stroke: var(--primary-color);
      stroke-width: 3;
    }
    .handle-line {
      stroke: var(--primary-color);
      stroke-width: 1.5;
      stroke-dasharray: 3, 3;
    }
    .handle {
      fill: var(--primary-color);
      stroke: var(--card-background-color, #fff);
      stroke-width: 2;
      touch-action: none;
    }
    .rotate-handle {
      cursor: grab;
    }
    .resize-handle {
      cursor: nwse-resize;
    }
    .furniture-toolbar {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.9em;
      color: var(--primary-text-color);
    }
    .furniture-toolbar span {
      margin-right: 4px;
    }
    .furniture-toolbar .rotation-value {
      min-width: 2.5em;
      text-align: center;
      font-family: "Roboto Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
    }
    .furniture-fields {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .furniture-fields ha-textfield {
      flex: 1;
      min-width: 70px;
    }
    .furniture-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .furniture-list-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      border-radius: 8px;
      cursor: pointer;
    }
    .furniture-list-row span {
      flex: 1;
    }
    .furniture-list-row.selected {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    }
  `,t([ft({attribute:!1})],Ot.prototype,"hass",void 0),t([mt()],Ot.prototype,"_config",void 0),t([mt()],Ot.prototype,"_calibrationRoomId",void 0),t([mt()],Ot.prototype,"_calibrationPoints",void 0),t([mt()],Ot.prototype,"_calibrationSnap90",void 0),t([mt()],Ot.prototype,"_furniture",void 0),t([mt()],Ot.prototype,"_selectedFurnitureId",void 0),t([mt()],Ot.prototype,"_furnitureAddType",void 0),t([_t("img.furniture-image")],Ot.prototype,"_furnitureImg",void 0),Ot=t([dt("vacuum-card-adv-editor")],Ot),console.info("%c VACUUM-CARD-ADV %c v2.1.0 ","color: #0b0f14; background: #34e0d6; font-weight: 700;","color: #34e0d6; background: #0b0f14; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"vacuum-card-adv",name:"TapoVac ADV Vacuum Card",description:"A card for the TapoVac-ADV integration (Tapo RV30/RV50 series).",preview:!0});let Tt=class extends lt{constructor(){super(...arguments),this._discovered={dockActions:[],sensors:[],maintenanceSensors:[]},this._selectedRoomIds=new Set,this._maintenanceOpen=!1,this._busy=!1}static getConfigElement(){return document.createElement("vacuum-card-adv-editor")}static getStubConfig(t){return{type:"custom:vacuum-card-adv",vacuum:Object.keys(t.states).find(t=>t.startsWith("vacuum."))??"",show_map:!0,show_controls:!0,show_dock_actions:!0,show_fan_speed:!0,show_water_level:!0,show_battery:!0,show_sensors:!0,show_mop_status:!0,show_room_names:!0,show_last_updated:!0,show_furniture:!0,furniture_opacity:100,furniture_color:"brown"}}setConfig(t){if(!t.vacuum)throw new Error("vacuum entity is required");this._config={show_map:!0,show_controls:!0,show_dock_actions:!0,show_fan_speed:!0,show_water_level:!0,show_battery:!0,show_sensors:!0,show_mop_status:!0,show_room_names:!0,show_last_updated:!0,show_furniture:!0,furniture_opacity:100,furniture_color:"brown",map_rotation:0,...t},this._maintenanceOpen=!1===t.maintenance_collapsed_default}getCardSize(){let t=2;return(this._config?.show_map??!0)&&(t+=6),(this._config?.show_sensors??!0)&&(t+=2),t}willUpdate(t){t.has("hass")&&this.hass&&this._config?.vacuum&&this._lastDiscoveredFor!==this._config.vacuum&&(this._discovered=wt(this.hass,this._config.vacuum),this._lastDiscoveredFor=this._config.vacuum)}get _roomGeometry(){const t=this._config.camera??this._discovered.camera;if(!t)return;const e=this.hass.states[t],i=e?.attributes?.room_geometry;return i&&i.rooms?i:void 0}_shortTitle(t){const e=this.hass.states[this._config.vacuum],i=e?.attributes.friendly_name;return i&&t.startsWith(`${i} `)?t.slice(i.length+1):t}_lastUpdated(){const t=[this._config.vacuum,this._config.battery_entity??this._discovered.battery,this._config.mop_attached_entity??this._discovered.mopAttached,...this._config.sensors??this._discovered.sensors].filter(t=>!!t);let e;for(const i of t){const t=this.hass.states[i]?.last_changed;if(!t)continue;const r=new Date(t);(!e||r>e)&&(e=r)}return e}_relativeTime(t){const e=Math.round((Date.now()-t.getTime())/1e3);if(e<5)return"just now";if(e<60)return`${e}s ago`;const i=Math.round(e/60);if(i<60)return`${i}m ago`;const r=Math.round(i/60);if(r<24)return`${r}h ago`;return`${Math.round(r/24)}d ago`}render(){if(!this._config||!this.hass)return G;const t=this.hass.states[this._config.vacuum];if(!t)return V`<ha-card><div class="warning">Entity not found: ${this._config.vacuum}</div></ha-card>`;const e=this._config.name??t.attributes.friendly_name??"Vacuum",i=this.hass.formatEntityState?.(t)??t.state,r="bottom"===this._config.map_position?"bottom":"top",s=this._config.show_last_updated??!0?this._lastUpdated():void 0;return V`
      <ha-card>
        <div class="header" @click=${()=>this._fireMoreInfo(this._config.vacuum)}>
          <ha-icon class="header-icon" icon="mdi:robot-vacuum"></ha-icon>
          <div class="header-text">
            <div class="name">${e}</div>
            <div class="status">${i}</div>
            ${s?V`<div class="last-updated">Updated ${this._relativeTime(s)}</div>`:G}
          </div>
        </div>
        ${this._config.show_controls??!0?this._renderControls(t):G}
        ${"top"===r&&(this._config.show_map??!0)?this._renderMap():G}
        ${this._config.show_dock_actions??!0?this._renderDockActions():G}
        ${this._renderSelects()}
        ${this._config.show_battery??!0?this._renderBattery():G}
        ${this._config.show_mop_status??!0?this._renderMopStatus():G}
        ${this._config.show_sensors??!0?this._renderSensors():G}
        ${"bottom"===r&&(this._config.show_map??!0)?this._renderMap():G}
        ${this._renderMaintenance()}
      </ha-card>
    `}_renderControls(t){const e="cleaning"===t.state;return V`
      <div class="section controls">
        <button class="pill" @click=${()=>this._callVacuumService(e?"pause":"start")}>
          <ha-icon icon=${e?"mdi:pause":"mdi:play"}></ha-icon>
          <span>${e?"Pause":"Start"}</span>
        </button>
        <button class="pill" @click=${()=>this._callVacuumService("stop")}>
          <ha-icon icon="mdi:stop"></ha-icon>
          <span>Stop</span>
        </button>
        <button class="pill" @click=${()=>this._callVacuumService("clean_spot")}>
          <ha-icon icon="mdi:target-variant"></ha-icon>
          <span>Spot</span>
        </button>
        <button class="pill accent" @click=${()=>this._callVacuumService("return_to_base")}>
          <ha-icon icon="mdi:home-import-outline"></ha-icon>
          <span>Dock</span>
        </button>
      </div>
    `}_renderMap(){const t=this._config.camera??this._discovered.camera;if(!t)return G;const e=this.hass.states[t],i=e?.attributes?.entity_picture;if(!i)return G;const r=this._config.map_rotation??0,s=this._roomGeometry,o=r%360!=0?`transform: rotate(${r}deg);`:"";return V`
      <div class="section map-section">
        <div class="map-wrap">
          <img class="map-image" src=${i} style=${o} @click=${this._onMapClick} />
          ${s?this._renderMapOverlay(s,o):G}
        </div>
        ${s?G:V`<div class="map-hint">
              Room click-to-select needs TapoVac-ADV v1.12+ (the map camera's
              <code>room_geometry</code> attribute) — update the integration via HACS, restart Home
              Assistant, then hard-refresh this browser tab.
            </div>`}
        ${this._selectedRoomIds.size>0?this._renderSelectedRoomsBar(s):G}
      </div>
    `}_renderMapOverlay(t,e){return V`
      <svg
        class="map-overlay"
        style=${e}
        viewBox="0 0 ${t.image_width} ${t.image_height}"
        preserveAspectRatio="none"
      >
        ${t.rooms.map(t=>this._renderRoomOverlay(t))}
        ${t.rooms.filter(t=>this._selectedRoomIds.has(t.id)).map(t=>this._renderRoomOrderBadge(t))}
        ${this._config.show_furniture??!0?this._renderFurniture():G}
      </svg>
    `}_renderRoomOverlay(t){const e=this._selectedRoomIds.has(t.id),i=this._config.room_polygons?.[String(t.id)],[r,s,o]=t.color,n=e?`rgba(${r},${s},${o},0.55)`:`rgba(${r},${s},${o},0.12)`,a=e?`rgb(${r},${s},${o})`:`rgba(${r},${s},${o},0.4)`,c=e?4:1.5,l=e?"room-shape selected":"room-shape";if(i&&i.length>=3){const t=i.map(([t,e])=>`${t},${e}`).join(" ");return W`<polygon
        points=${t}
        fill=${n}
        stroke=${a}
        stroke-width=${c}
        class=${l}
      ></polygon>`}const[h,d,u,p]=t.bbox;return W`<rect
      x=${h}
      y=${d}
      width=${u-h}
      height=${p-d}
      fill=${n}
      stroke=${a}
      stroke-width=${c}
      class=${l}
    ></rect>`}_renderRoomOrderBadge(t){const e=[...this._selectedRoomIds].indexOf(t.id);return W`
      <g class="room-order-badge">
        <circle cx=${t.cx} cy=${t.cy} r="15" class="badge-circle"></circle>
        <text x=${t.cx} y=${t.cy} dy="0.35em" text-anchor="middle" class="badge-text">${e+1}</text>
      </g>
    `}_renderFurniture(){const t=this._config.furniture;if(!t||0===t.length)return G;const e=Math.max(0,Math.min(100,this._config.furniture_opacity??100))/100,i=Pt(this._config.furniture_color),r=`--furn-fill:${i.fill};--furn-stroke:${i.stroke};--furn-detail:${i.detail};--furn-line:${i.line};`;return W`
      <g class="furniture-layer" opacity=${e} style=${r}>
        ${t.map(t=>W`
            <g transform="translate(${t.x} ${t.y}) rotate(${t.rotation})" class="furniture-item">
              ${It(t.type,t.width,t.height)}
            </g>
          `)}
      </g>
    `}_renderSelectedRoomsBar(t){const e=[...this._selectedRoomIds].map((e,i)=>{const r=t?.rooms.find(t=>t.id===e)?.name;return r?`${i+1}. ${r}`:void 0}).filter(t=>!!t);return V`
      <div class="selected-rooms-bar">
        <span>${this._config.show_room_names??!0?e.join(", "):`${e.length} room(s)`}</span>
        <button class="pill accent small" @click=${this._cleanSelectedRooms} ?disabled=${this._busy}>
          <ha-icon icon="mdi:broom"></ha-icon><span>Clean</span>
        </button>
        <button class="pill small" @click=${()=>this._selectedRoomIds=new Set}>
          <ha-icon icon="mdi:close"></ha-icon><span>Clear</span>
        </button>
      </div>
    `}_onMapClick(t){const e=this._roomGeometry;if(!e||!this._mapImg)return void console.debug("[vacuum-card-adv] map click ignored: room_geometry not available on the camera entity yet");const i=this._config.map_rotation??0,r=xt(t.clientX,t.clientY,this._mapImg,i),s=function(t,e,i){for(const r of e.rooms){const e=i?.[String(r.id)];if(e&&e.length>=3&&kt(t,e))return r.id}for(const r of e.rooms)if(!i?.[String(r.id)]&&At(t,r.bbox))return r.id;if(0===e.rooms.length)return null;let r=e.rooms[0],s=St(t,r.cx,r.cy);for(const i of e.rooms.slice(1)){const e=St(t,i.cx,i.cy);e<s&&(r=i,s=e)}return s<=(.15*Math.max(e.image_width,e.image_height))**2?r.id:null}(r,e,this._config.room_polygons);if(null===s)return void console.debug("[vacuum-card-adv] map click did not land inside any known room",r);const o=new Set(this._selectedRoomIds);o.has(s)?o.delete(s):o.add(s),this._selectedRoomIds=o}async _cleanSelectedRooms(){const t=this._roomGeometry;if(!t||0===this._selectedRoomIds.size)return;const e=[...this._selectedRoomIds].map(e=>t.rooms.find(t=>t.id===e)?.name).filter(t=>!!t);if(0!==e.length){this._busy=!0;try{await this.hass.callService("tapo_rv30","clean_rooms",{entity_id:this._config.vacuum,rooms:e}),this._selectedRoomIds=new Set}finally{this._busy=!1}}}_renderDockActions(){return 0===this._discovered.dockActions.length?G:V`
      <div class="section dock-actions">
        ${this._discovered.dockActions.map(t=>V`
            <button class="pill" @click=${()=>this._pressButton(t.entityId)}>
              <ha-icon icon=${t.icon}></ha-icon>
              <span>${t.name}</span>
            </button>
          `)}
      </div>
    `}_renderSelects(){const t=this.hass.states[this._config.vacuum],e=this._config.show_fan_speed??!0,i=this._config.show_water_level??!0,r=t.attributes.fan_speed_list??[],s=t.attributes.fan_speed,o=this._config.water_level_entity??this._discovered.waterLevel,n=o?this.hass.states[o]:void 0;return e&&r.length>0||i&&n?V`
      <div class="section selects">
        ${e&&r.length>0?Ft(this.hass,"Fan speed",s??"",r.map(t=>({value:t,label:t})),t=>{t!==(s??"")&&this._setFanSpeed(t)}):G}
        ${i&&n?Ft(this.hass,"Water level",n.state,(n.attributes.options??[]).map(t=>({value:t,label:t})),t=>{t!==n.state&&this._selectOption(o,t)}):G}
      </div>
    `:G}_renderRow(t){const e=void 0!==t.percent&&!Number.isNaN(t.percent);return V`
      <div
        class="info-row ${t.overdue?"overdue":""} ${t.entityId?"clickable":""}"
        @click=${t.entityId?()=>this._fireMoreInfo(t.entityId):void 0}
      >
        <ha-icon icon=${t.icon}></ha-icon>
        <span class="info-label">${t.title}</span>
        ${e?V`<span
              class="info-bar"
              style="--pct:${Math.max(0,Math.min(100,t.percent))}%; --color:${t.gaugeColor??"var(--primary-color)"}"
            ></span>`:G}
        <span class="info-value">${t.value}</span>
      </div>
    `}_renderBattery(){const t=this._config.battery_entity??this._discovered.battery;if(!t)return G;const e=this.hass.states[t];if(!e)return G;const i=Number(e.state);return V`
      <div class="section sensors">
        ${this._renderRow({icon:this._batteryIcon(i),title:this._shortTitle(e.attributes.friendly_name??"Battery"),value:`${e.state}%`,percent:i,gaugeColor:this._batteryColor(i),entityId:t})}
      </div>
    `}_batteryIcon(t){if(Number.isNaN(t))return"mdi:battery-unknown";const e=10*Math.round(t/10);return e>=100?"mdi:battery":e<=0?"mdi:battery-outline":`mdi:battery-${e}`}_batteryColor(t){return Number.isNaN(t)?"var(--disabled-text-color)":t<=20?"var(--error-color)":t<=50?"var(--warning-color)":"var(--success-color)"}_renderMopStatus(){const t=this._config.mop_attached_entity??this._discovered.mopAttached;if(!t)return G;const e=this.hass.states[t];return e?V`
      <div class="section sensors">
        ${this._renderRow({icon:e.attributes.icon??("on"===e.state?"mdi:water":"mdi:water-off"),title:this._shortTitle(e.attributes.friendly_name??"Mop Attached"),value:"on"===e.state?"Attached":"Not attached",entityId:t})}
      </div>
    `:G}_renderSensors(){const t=this._config.sensors??this._discovered.sensors;return t&&0!==t.length?V`<div class="section sensors">${t.map(t=>this._renderSensorRow(t))}</div>`:G}_renderSensorRow(t){const e=this.hass.states[t];if(!e)return G;const i=this._shortTitle(e.attributes.friendly_name??e.entity_id);if("error"===i.toLowerCase()&&"ok"===e.state.toLowerCase())return G;const r=e.attributes.unit_of_measurement??"",s=e.attributes.icon??"mdi:information-outline",o="%"===r?Number(e.state):void 0;return this._renderRow({icon:s,title:i,value:`${e.state}${r}`,percent:void 0===o||Number.isNaN(o)?void 0:o,overdue:!!e.attributes.overdue,entityId:t})}_renderMaintenance(){const t=this._config.maintenance_sensors??this._discovered.maintenanceSensors;return t&&0!==t.length?V`
      <div class="section">
        <button class="maintenance-toggle" @click=${()=>this._maintenanceOpen=!this._maintenanceOpen}>
          <ha-icon icon="mdi:wrench"></ha-icon>
          <span>Maintenance</span>
          <ha-icon icon=${this._maintenanceOpen?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </button>
        ${this._maintenanceOpen?V`<div class="sensors">${t.map(t=>this._renderSensorRow(t))}</div>`:G}
      </div>
    `:G}_callVacuumService(t){this.hass.callService("vacuum",t,{entity_id:this._config.vacuum})}_setFanSpeed(t){t&&this.hass.callService("vacuum","set_fan_speed",{entity_id:this._config.vacuum,fan_speed:t})}_selectOption(t,e){e&&this.hass.callService("select","select_option",{entity_id:t,option:e})}_pressButton(t){this.hass.callService("button","press",{entity_id:t})}_fireMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}};Tt.styles=n`
    :host {
      display: block;
      --vc-accent: var(--primary-color);
    }
    ha-card {
      padding: 14px 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .warning {
      color: var(--error-color);
      padding: 16px;
    }
    .section {
      padding: 10px 0;
      border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
    }
    .section:first-of-type {
      border-top: none;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 8px;
      cursor: pointer;
    }
    .header-icon {
      color: var(--vc-accent);
      --mdc-icon-size: 26px;
    }
    .header-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .name {
      font-size: 1.05em;
      font-weight: 600;
      letter-spacing: 0.01em;
      color: var(--primary-text-color);
    }
    .status {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .last-updated {
      font-size: 0.75em;
      color: var(--secondary-text-color);
      opacity: 0.7;
    }

    /* Pill buttons — icon + visible label, so nobody has to guess what a
       bare icon does. */
    .controls,
    .dock-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .pill {
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 1 1 auto;
      justify-content: center;
      padding: 8px 10px;
      border-radius: 999px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 0.82em;
      cursor: pointer;
      transition: border-color 0.15s ease, color 0.15s ease;
    }
    .pill:hover {
      border-color: var(--vc-accent);
      color: var(--vc-accent);
    }
    .pill ha-icon {
      --mdc-icon-size: 18px;
    }
    .pill.accent {
      border-color: var(--vc-accent);
      color: var(--vc-accent);
    }
    .pill.small {
      padding: 4px 10px;
      flex: 0 0 auto;
    }

    /* Map */
    .map-wrap {
      position: relative;
      width: 100%;
      overflow: hidden;
      border-radius: 8px;
    }
    .map-image {
      display: block;
      width: 100%;
      height: auto;
      cursor: pointer;
    }
    .map-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .map-hint {
      margin-top: 6px;
      font-size: 0.78em;
      color: var(--secondary-text-color);
      line-height: 1.4;
    }
    .map-hint code {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      border-radius: 4px;
      padding: 0 4px;
    }
    .room-shape {
      transition: fill 0.15s ease, stroke 0.15s ease, stroke-width 0.15s ease;
    }
    .room-shape.selected {
      filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.45));
    }
    .badge-circle {
      fill: var(--vc-accent);
      stroke: var(--card-background-color, #fff);
      stroke-width: 2;
    }
    .badge-text {
      fill: #fff;
      font-size: 15px;
      font-weight: 700;
      font-family: inherit;
    }
    /* Solid (fully opaque) fills — the furniture_opacity config option
       already controls transparency via the whole .furniture-layer group's
       own opacity attribute (see _renderFurniture()), so a baked-in alpha
       here as well would cap furniture out at that alpha even with
       furniture_opacity at 100 and make "fully opaque" unreachable. Colors
       come from CSS custom properties set on .furniture-layer itself (see
       _renderFurniture()) so furniture_color can pick a whole palette
       without touching these rules — the hex values here are just the
       brown-palette fallback for older configs with no style attribute. */
    .furniture-item .furn-body {
      fill: var(--furn-fill, #bcaaa4);
      stroke: var(--furn-stroke, #6d4c41);
      stroke-width: 2;
    }
    .furniture-item .furn-detail {
      fill: var(--furn-detail, #8d6e63);
      stroke: none;
    }
    .furniture-item .furn-line {
      stroke: var(--furn-line, #4e342e);
      stroke-width: 1.5;
    }
    .furniture-item .furn-plant {
      fill: #81c784;
      stroke: #2e7d32;
    }
    .selected-rooms-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: space-between;
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-top: 8px;
    }

    /* Selects */
    .selects {
      display: flex;
      gap: 8px;
    }
    .selects ha-form {
      flex: 1;
      min-width: 100px;
    }

    /* Info rows: icon, label, thin glow gauge, monospace value — flat, not
       boxed, so a list of sensors reads as one compact panel. */
    .sensors {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .info-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85em;
    }
    .info-row.clickable {
      cursor: pointer;
    }
    .info-row ha-icon {
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
      flex: 0 0 auto;
    }
    .info-label {
      color: var(--secondary-text-color);
      flex: 0 1 auto;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .info-bar {
      flex: 1 1 auto;
      height: 4px;
      min-width: 24px;
      border-radius: 2px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.2));
      position: relative;
      overflow: hidden;
    }
    .info-bar::after {
      content: "";
      position: absolute;
      inset: 0;
      width: var(--pct, 0%);
      background: var(--color, var(--vc-accent));
      border-radius: 2px;
      box-shadow: 0 0 6px 0 var(--color, var(--vc-accent));
    }
    .info-value {
      flex: 0 0 auto;
      font-family: "Roboto Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
      color: var(--primary-text-color);
      min-width: 2.5em;
      text-align: right;
    }
    .info-row.overdue .info-value {
      color: var(--error-color);
      font-weight: 600;
    }

    .maintenance-toggle {
      display: flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 0.85em;
      cursor: pointer;
      padding: 0 0 8px;
      width: 100%;
    }
    .maintenance-toggle ha-icon:last-child {
      margin-left: auto;
    }
  `,t([ft({attribute:!1})],Tt.prototype,"hass",void 0),t([mt()],Tt.prototype,"_config",void 0),t([mt()],Tt.prototype,"_discovered",void 0),t([mt()],Tt.prototype,"_selectedRoomIds",void 0),t([mt()],Tt.prototype,"_maintenanceOpen",void 0),t([mt()],Tt.prototype,"_busy",void 0),t([_t("img.map-image")],Tt.prototype,"_mapImg",void 0),Tt=t([dt("vacuum-card-adv")],Tt);export{Tt as VacuumCardAdv};

function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,_=m.trustedTypes,f=_?_.emptyScript:"",g=m.reactiveElementPolyfillSupport,$=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[$("elementProperties")]=new Map,w[$("finalized")]=new Map,g?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=t=>t,S=x.trustedTypes,k=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+M,E=`<${C}>`,R=document,I=()=>R.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,F="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,D=/>/g,H=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,j=/"/g,L=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=B(1),W=B(2),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Y=new WeakMap,X=R.createTreeWalker(R,129);function J(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(n.lastIndex=h,c=n.exec(i),null!==c);)h=n.lastIndex,n===N?"!--"===c[1]?n=U:void 0!==c[1]?n=D:void 0!==c[2]?(L.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=H):void 0!==c[3]&&(n=H):n===H?">"===c[0]?(n=o??N,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?H:'"'===c[3]?j:z):n===j||n===z?n=H:n===U||n===D?n=N:(n=H,o=void 0);const d=n===H&&t[e+1].startsWith("/>")?" ":"";r+=n===N?i+E:l>=0?(s.push(a),i.slice(0,l)+P+i.slice(l)+M+d):i+M+(-2===l?e:d)}return[J(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=Z.createElement(c,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(P)){const e=l[r++],i=s.getAttribute(t).split(M),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?st:"?"===n[1]?ot:"@"===n[1]?rt:it}),s.removeAttribute(t)}else t.startsWith(M)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(M),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],I()),X.nextNode(),a.push({type:2,index:++o});s.append(t[e],I())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(M,t+1));)a.push({type:7,index:o}),t+=M.length-1}o++}}static createElement(t,e){const i=R.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===q)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=O(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);X.currentNode=s;let o=X.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new et(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new nt(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=X.nextNode(),r++)}return X.currentNode=R,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),O(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new Z(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new et(this.O(I()),this.O(I()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Q(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==q,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Q(this,s[i+n],e,n),a===q&&(a=this._$AH[n]),r||=!O(a)||a!==this._$AH[n],a===G?t=G:t!==G&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class rt extends it{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===q)return;const i=this._$AH,s=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(Z,et),(x.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class lt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new et(e.insertBefore(I(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const ht=ct.litElementPolyfillSupport;ht?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ut={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},pt=(t=ut,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function mt(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _t(t){return mt({...t,state:!0,attribute:!1})}
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
function ft(t,e){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const gt=[{name:"Empty Dust Bin",icon:"mdi:delete-empty"},{name:"Wash Mop",icon:"mdi:water-sync"},{name:"Dry Mop",icon:"mdi:tumble-dryer"},{name:"Remove Hair",icon:"mdi:content-cut"}],$t=["schedules","status"];function vt(t){return t.entities}function yt(t,e){const i=vt(t)?.[e];if(i?.name)return i.name;if(i?.original_name)return i.original_name;const s=t.states[e],o=s?.attributes?.friendly_name;return"string"==typeof o?o:e}function bt(t,e){return t.filter(t=>t.startsWith(`${e}.`))}function wt(t,e){const i=function(t,e){const i=vt(t);if(!i)return[];const s=i[e]?.device_id;return s?Object.keys(i).filter(t=>i[t]?.device_id===s):[]}(t,e),s={dockActions:[],sensors:[],maintenanceSensors:[]};if(0===i.length)return s;s.camera=bt(i,"camera")[0];for(const e of bt(i,"select")){const i=yt(t,e);i.includes("Water Level")?s.waterLevel=e:i.includes("Clean Passes")&&(s.cleanPasses=e)}for(const e of bt(i,"sensor")){const i=t.states[e];if("battery"===i?.attributes?.device_class){s.battery=e;continue}const o=yt(t,e).toLowerCase();if(o.includes("remaining"))s.maintenanceSensors.push(e);else{if($t.some(t=>o.endsWith(t)))continue;s.sensors.push(e)}}for(const e of bt(i,"binary_sensor"))yt(t,e).toLowerCase().includes("mop")&&(s.mopAttached=e);for(const e of bt(i,"button")){const i=yt(t,e),o=gt.find(t=>t.name===i);o&&s.dockActions.push({entityId:e,name:o.name,icon:o.icon})}return s}function xt(t,e,i,s){const o=i.getBoundingClientRect(),r=o.left+o.width/2,n=o.top+o.height/2,a=i.offsetWidth||o.width,c=i.offsetHeight||o.height;let l=t-r,h=e-n;if(s%360!=0){const t=-s*Math.PI/180,e=Math.cos(t),i=Math.sin(t),o=l*i+h*e;l=l*e-h*i,h=o}const d=h+c/2;return{x:(l+a/2)*(i.naturalWidth/a),y:d*(i.naturalHeight/c)}}function At(t,e){return t.x>=e[0]&&t.x<=e[2]&&t.y>=e[1]&&t.y<=e[3]}function St(t,e){let i=!1;for(let s=0,o=e.length-1;s<e.length;o=s++){const[r,n]=e[s],[a,c]=e[o];n>t.y!=c>t.y&&t.x<(a-r)*(t.y-n)/(c-n)+r&&(i=!i)}return i}function kt(t,e,i){const s=t.x-e,o=t.y-i;return s*s+o*o}const Pt=[{type:"bed",label:"Bed",icon:"mdi:bed",widthPct:.16,heightPct:.24},{type:"sofa",label:"Sofa",icon:"mdi:sofa",widthPct:.28,heightPct:.11},{type:"table",label:"Table",icon:"mdi:table-furniture",widthPct:.16,heightPct:.1},{type:"desk",label:"Desk",icon:"mdi:desk",widthPct:.16,heightPct:.08},{type:"chair",label:"Chair",icon:"mdi:chair-rolling",widthPct:.07,heightPct:.07},{type:"wardrobe",label:"Wardrobe",icon:"mdi:wardrobe",widthPct:.14,heightPct:.06},{type:"toilet",label:"Toilet",icon:"mdi:toilet",widthPct:.07,heightPct:.09},{type:"sink",label:"Sink",icon:"mdi:sink",widthPct:.07,heightPct:.055},{type:"bathtub",label:"Bathtub",icon:"mdi:bathtub",widthPct:.11,heightPct:.2},{type:"fridge",label:"Fridge",icon:"mdi:fridge-outline",widthPct:.065,heightPct:.065},{type:"washing_machine",label:"Washing Machine",icon:"mdi:washing-machine",widthPct:.065,heightPct:.065},{type:"tv",label:"TV",icon:"mdi:television",widthPct:.14,heightPct:.025},{type:"stairs",label:"Stairs",icon:"mdi:stairs",widthPct:.12,heightPct:.16},{type:"plant",label:"Plant",icon:"mdi:flower",widthPct:.04,heightPct:.04},{type:"custom",label:"Custom",icon:"mdi:shape-outline",widthPct:.09,heightPct:.09}];function Mt(t){return Pt.find(e=>e.type===t)??Pt[Pt.length-1]}function Ct(t){return(t%360+360)%360}function Et(t,e,i){const s=-e/2,o=-i/2,r=Math.min(e,i);switch(t){case"bed":{const t=.22*i;return W`
        <rect x=${s} y=${o} width=${e} height=${i} rx=${.08*r} class="furn-body"></rect>
        <rect x=${s+.08*e} y=${o+.06*i} width=${.84*e} height=${t} rx=${.3*t} class="furn-detail"></rect>
        <line x1=${s} y1=${o+.42*i} x2=${s+e} y2=${o+.42*i} class="furn-line"></line>
      `}case"sofa":{const t=.14*e;return W`
        <rect x=${s} y=${o} width=${e} height=${i} rx=${.25*i} class="furn-body"></rect>
        <rect x=${s} y=${o} width=${t} height=${i} rx=${.25*i} class="furn-detail"></rect>
        <rect x=${s+e-t} y=${o} width=${t} height=${i} rx=${.25*i} class="furn-detail"></rect>
        <rect x=${s+.6*t} y=${o} width=${e-1.2*t} height=${.3*i} rx=${.1*i} class="furn-detail"></rect>
      `}case"table":return W`<rect x=${s} y=${o} width=${e} height=${i} rx=${.06*r} class="furn-body"></rect>`;case"desk":return W`
        <rect x=${s} y=${o} width=${e} height=${i} rx=${.06*r} class="furn-body"></rect>
        <rect x=${s} y=${o} width=${e} height=${.22*i} class="furn-detail"></rect>
      `;case"chair":return W`
        <rect x=${s} y=${o+.18*i} width=${e} height=${.82*i} rx=${.15*e} class="furn-body"></rect>
        <rect x=${s} y=${o} width=${e} height=${.28*i} rx=${.15*e} class="furn-detail"></rect>
      `;case"wardrobe":return W`
        <rect x=${s} y=${o} width=${e} height=${i} class="furn-body"></rect>
        <line x1="0" y1=${o} x2="0" y2=${o+i} class="furn-line"></line>
      `;case"toilet":{const t=.28*i;return W`
        <rect x=${s} y=${o} width=${e} height=${t} rx=${.1*e} class="furn-detail"></rect>
        <ellipse cx="0" cy=${o+t+(i-t)/2} rx=${e/2} ry=${(i-t)/2} class="furn-body"></ellipse>
      `}case"sink":return W`
        <rect x=${s} y=${o} width=${e} height=${i} rx=${.2*r} class="furn-body"></rect>
        <ellipse cx="0" cy="0" rx=${.32*e} ry=${.32*i} class="furn-detail"></ellipse>
      `;case"bathtub":return W`
        <rect x=${s} y=${o} width=${e} height=${i} rx=${.4*r} class="furn-body"></rect>
        <rect x=${s+.12*e} y=${o+.12*i} width=${.76*e} height=${.76*i} rx=${.3*r} class="furn-detail"></rect>
      `;case"fridge":return W`
        <rect x=${s} y=${o} width=${e} height=${i} rx=${.1*r} class="furn-body"></rect>
        <line x1=${s} y1=${o+.35*i} x2=${s+e} y2=${o+.35*i} class="furn-line"></line>
      `;case"washing_machine":return W`
        <rect x=${s} y=${o} width=${e} height=${i} rx=${.12*r} class="furn-body"></rect>
        <circle cx="0" cy=${.08*i} r=${.3*r} class="furn-detail"></circle>
      `;case"tv":return W`<rect x=${s} y=${o} width=${e} height=${i} rx=${.15*i} class="furn-body"></rect>`;case"stairs":{const t=5,r=i/t,n=[];for(let i=1;i<t;i++){const t=o+r*i;n.push(W`<line x1=${s} y1=${t} x2=${s+e} y2=${t} class="furn-line"></line>`)}return W`
        <rect x=${s} y=${o} width=${e} height=${i} class="furn-body"></rect>
        ${n}
      `}case"plant":return W`<circle cx="0" cy="0" r=${r/2} class="furn-body furn-plant"></circle>`;default:return W`<rect x=${s} y=${o} width=${e} height=${i} rx=${.08*r} class="furn-body"></rect>`}}let Rt=class extends lt{constructor(){super(...arguments),this._calibrationPoints=[],this._furniture=[],this._furnitureAddType="bed"}setConfig(t){this._config=t,this._furniture=t.furniture??[]}_fireConfigChanged(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_valueChanged(t,e){this._config[t]!==e&&this._fireConfigChanged({...this._config,[t]:e})}get _cameraId(){if(this._config?.vacuum)return this._config.camera??wt(this.hass,this._config.vacuum).camera}get _roomGeometry(){const t=this._cameraId;if(!t)return;const e=this.hass.states[t]?.attributes?.room_geometry;return e&&e.rooms?.length?e:void 0}render(){return this.hass&&this._config?V`
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
        <ha-select
          label="Map position"
          fixedMenuPosition
          naturalMenuWidth
          .value=${this._config.map_position??"top"}
          @selected=${t=>this._valueChanged("map_position",t.target.value)}
          @closed=${t=>t.stopPropagation()}
        >
          <mwc-list-item value="top">Top (after controls)</mwc-list-item>
          <mwc-list-item value="bottom">Bottom (after battery/sensors)</mwc-list-item>
        </ha-select>
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
              <ha-select
                label="Room to calibrate"
                fixedMenuPosition
                naturalMenuWidth
                .value=${void 0!==this._calibrationRoomId?String(this._calibrationRoomId):""}
                @selected=${t=>{const e=Number(t.target.value),i=Number.isNaN(e)?void 0:e;i!==this._calibrationRoomId&&(this._calibrationRoomId=i,this._calibrationPoints=[])}}
                @closed=${t=>t.stopPropagation()}
              >
                ${t.rooms.map(t=>V`<mwc-list-item .value=${String(t.id)}>${t.name}</mwc-list-item>`)}
              </ha-select>

              ${void 0!==this._calibrationRoomId?V`
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
    `}_renderCalibrationOverlay(t){const e=this._calibrationRoomId,i=t.rooms.find(t=>t.id===e),s=void 0!==e?this._config.room_polygons?.[String(e)]:void 0,o=s&&s.length>=3?V`<polygon
            points=${s.map(([t,e])=>`${t},${e}`).join(" ")}
            fill="rgba(3,169,244,0.25)"
            stroke="rgb(3,169,244)"
            stroke-width="3"
          ></polygon>`:G,r=i?V`<rect
          x=${i.bbox[0]}
          y=${i.bbox[1]}
          width=${i.bbox[2]-i.bbox[0]}
          height=${i.bbox[3]-i.bbox[1]}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          stroke-dasharray="6,4"
          stroke-width="2"
        ></rect>`:G,n=this._calibrationPoints.length>0?V`
            <polyline
              points=${this._calibrationPoints.map(([t,e])=>`${t},${e}`).join(" ")}
              fill="none"
              stroke="rgb(255,152,0)"
              stroke-width="3"
            ></polyline>
            ${this._calibrationPoints.map(([t,e])=>V`<circle cx=${t} cy=${e} r="5" fill="rgb(255,152,0)"></circle>`)}
          `:G;return V`${r}${o}${n}`}_onCalibrationClick(t){const e=t.currentTarget,i=xt(t.clientX,t.clientY,e,0);this._calibrationPoints=[...this._calibrationPoints,[Math.round(i.x),Math.round(i.y)]]}_finishCalibration(){if(void 0===this._calibrationRoomId||this._calibrationPoints.length<3)return;const t={...this._config.room_polygons??{}};t[String(this._calibrationRoomId)]=this._calibrationPoints,this._calibrationPoints=[],this._valueChanged("room_polygons",t)}_deleteCalibration(){if(void 0===this._calibrationRoomId||!this._config.room_polygons)return;const t={...this._config.room_polygons};delete t[String(this._calibrationRoomId)],this._calibrationPoints=[],this._valueChanged("room_polygons",t)}_renderFurniture(){const t=this._roomGeometry,e=this._cameraId,i=e?this.hass.states[e]?.attributes?.entity_picture:void 0,s=this._furniture.find(t=>t.id===this._selectedFurnitureId);return V`
      <div class="section">
        <div class="section-title">Furniture</div>
        <div class="hint">
          Furniture placed in the official Tapo app can't be read into Home Assistant (see the
          TapoVac-ADV README) — place it here instead: pick a type, click "Add", then drag its
          body to move it, the top handle to rotate, and the corner handle to resize.
        </div>
        <div class="furniture-add-row">
          <ha-select
            label="Furniture type"
            fixedMenuPosition
            naturalMenuWidth
            .value=${this._furnitureAddType}
            @selected=${t=>this._furnitureAddType=t.target.value}
            @closed=${t=>t.stopPropagation()}
          >
            ${Pt.map(t=>V`<mwc-list-item .value=${t.type}><ha-icon icon=${t.icon}></ha-icon> ${t.label}</mwc-list-item>`)}
          </ha-select>
          <mwc-button raised @click=${this._addFurniture} ?disabled=${!t}>
            <ha-icon icon="mdi:plus"></ha-icon>
            Add
          </mwc-button>
        </div>

        ${t&&i?V`
              <div class="map-wrap">
                <img class="furniture-image" src=${i} />
                ${this._renderFurnitureOverlay(t)}
              </div>
            `:V`<div class="hint">Map not available yet — open a dashboard with this vacuum first.</div>`}
        ${s?this._renderFurnitureToolbar(s):G}
        ${this._furniture.length>0?this._renderFurnitureList():G}
      </div>
    `}_renderFurnitureOverlay(t){return V`
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
        ${this._furniture.map(t=>this._renderEditableFurnitureItem(t))}
      </svg>
    `}_renderEditableFurnitureItem(t){const e=this._selectedFurnitureId===t.id,i=Math.max(8,.12*Math.min(t.width,t.height));return V`
      <g
        class="furniture-item ${e?"selected":""}"
        transform="translate(${t.x} ${t.y}) rotate(${t.rotation})"
        @pointerdown=${e=>this._startFurnitureDrag(e,t.id,"move")}
      >
        ${Et(t.type,t.width,t.height)}
        ${e?V`
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
        <ha-icon icon=${Mt(t.type).icon}></ha-icon>
        <span>${Mt(t.type).label}</span>
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
    `}_renderFurnitureList(){return V`
      <div class="furniture-list">
        ${this._furniture.map(t=>{const e=Mt(t.type);return V`
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
    `}_addFurniture(){const t=this._roomGeometry;if(!t)return;const e=function(t,e,i){const s=Mt(t),o=Math.min(e.image_width,e.image_height),r=Math.max(12,Math.round(s.widthPct*o)),n=Math.max(12,Math.round(s.heightPct*o)),a=i.length%6*o*.03;return{id:`furn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,type:t,x:Math.round(e.image_width/2+a),y:Math.round(e.image_height/2+a),width:r,height:n,rotation:0}}(this._furnitureAddType,t,this._furniture);this._furniture=[...this._furniture,e],this._selectedFurnitureId=e.id,this._commitFurniture()}_removeFurniture(t){this._furniture=this._furniture.filter(e=>e.id!==t),this._selectedFurnitureId===t&&(this._selectedFurnitureId=void 0),this._commitFurniture()}_rotateFurniture(t,e){this._furniture=this._furniture.map(i=>i.id===t?{...i,rotation:Ct(i.rotation+e)}:i),this._commitFurniture()}_commitFurniture(){this._valueChanged("furniture",this._furniture)}_startFurnitureDrag(t,e,i){t.stopPropagation(),t.preventDefault();const s=this._furnitureImg,o=this._furniture.find(t=>t.id===e);if(!s||!o)return;this._selectedFurnitureId=e;const r=t.currentTarget;r.setPointerCapture(t.pointerId);const n=xt(t.clientX,t.clientY,s,0),a=t=>{const r=xt(t.clientX,t.clientY,s,0);this._applyFurnitureDrag(e,i,o,n,r)},c=()=>{r.removeEventListener("pointermove",a),r.removeEventListener("pointerup",c),r.removeEventListener("pointercancel",c),this._commitFurniture()};r.addEventListener("pointermove",a),r.addEventListener("pointerup",c),r.addEventListener("pointercancel",c)}_applyFurnitureDrag(t,e,i,s,o){this._furniture=this._furniture.map(r=>{if(r.id!==t)return r;if("move"===e)return{...r,x:i.x+(o.x-s.x),y:i.y+(o.y-s.y)};if("rotate"===e){const t=180*Math.atan2(o.y-i.y,o.x-i.x)/Math.PI+90;return{...r,rotation:Math.round(Ct(t))}}const n=-i.rotation*Math.PI/180,a=o.x-i.x,c=o.y-i.y,l=a*Math.cos(n)-c*Math.sin(n),h=a*Math.sin(n)+c*Math.cos(n);return{...r,width:Math.max(12,Math.round(2*Math.abs(l))),height:Math.max(12,Math.round(2*Math.abs(h)))}})}};Rt.styles=n`
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
    .map-layout ha-select {
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
    .furniture-add-row ha-select {
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
      fill: rgba(141, 110, 99, 0.55);
      stroke: #8d6e63;
      stroke-width: 2;
    }
    .furniture-item .furn-detail {
      fill: rgba(93, 64, 55, 0.65);
      stroke: none;
    }
    .furniture-item .furn-line {
      stroke: #5d4037;
      stroke-width: 1.5;
    }
    .furniture-item .furn-plant {
      fill: rgba(76, 175, 80, 0.55);
      stroke: #4caf50;
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
  `,t([mt({attribute:!1})],Rt.prototype,"hass",void 0),t([_t()],Rt.prototype,"_config",void 0),t([_t()],Rt.prototype,"_calibrationRoomId",void 0),t([_t()],Rt.prototype,"_calibrationPoints",void 0),t([_t()],Rt.prototype,"_furniture",void 0),t([_t()],Rt.prototype,"_selectedFurnitureId",void 0),t([_t()],Rt.prototype,"_furnitureAddType",void 0),t([ft("img.furniture-image")],Rt.prototype,"_furnitureImg",void 0),Rt=t([dt("vacuum-card-adv-editor")],Rt),console.info("%c VACUUM-CARD-ADV %c v2.0.0b0 ","color: #0b0f14; background: #34e0d6; font-weight: 700;","color: #34e0d6; background: #0b0f14; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"vacuum-card-adv",name:"TapoVac ADV Vacuum Card",description:"A card for the TapoVac-ADV integration (Tapo RV30/RV50 series).",preview:!0});let It=class extends lt{constructor(){super(...arguments),this._discovered={dockActions:[],sensors:[],maintenanceSensors:[]},this._selectedRoomIds=new Set,this._maintenanceOpen=!1,this._busy=!1}static getConfigElement(){return document.createElement("vacuum-card-adv-editor")}static getStubConfig(t){return{type:"custom:vacuum-card-adv",vacuum:Object.keys(t.states).find(t=>t.startsWith("vacuum."))??"",show_map:!0,show_controls:!0,show_dock_actions:!0,show_fan_speed:!0,show_water_level:!0,show_battery:!0,show_sensors:!0,show_mop_status:!0,show_room_names:!0,show_last_updated:!0,show_furniture:!0}}setConfig(t){if(!t.vacuum)throw new Error("vacuum entity is required");this._config={show_map:!0,show_controls:!0,show_dock_actions:!0,show_fan_speed:!0,show_water_level:!0,show_battery:!0,show_sensors:!0,show_mop_status:!0,show_room_names:!0,show_last_updated:!0,show_furniture:!0,map_rotation:0,...t},this._maintenanceOpen=!1===t.maintenance_collapsed_default}getCardSize(){let t=2;return(this._config?.show_map??!0)&&(t+=6),(this._config?.show_sensors??!0)&&(t+=2),t}willUpdate(t){t.has("hass")&&this.hass&&this._config?.vacuum&&this._lastDiscoveredFor!==this._config.vacuum&&(this._discovered=wt(this.hass,this._config.vacuum),this._lastDiscoveredFor=this._config.vacuum)}get _roomGeometry(){const t=this._config.camera??this._discovered.camera;if(!t)return;const e=this.hass.states[t],i=e?.attributes?.room_geometry;return i&&i.rooms?i:void 0}_shortTitle(t){const e=this.hass.states[this._config.vacuum],i=e?.attributes.friendly_name;return i&&t.startsWith(`${i} `)?t.slice(i.length+1):t}_lastUpdated(){const t=[this._config.vacuum,this._config.battery_entity??this._discovered.battery,this._config.mop_attached_entity??this._discovered.mopAttached,...this._config.sensors??this._discovered.sensors].filter(t=>!!t);let e;for(const i of t){const t=this.hass.states[i]?.last_changed;if(!t)continue;const s=new Date(t);(!e||s>e)&&(e=s)}return e}_relativeTime(t){const e=Math.round((Date.now()-t.getTime())/1e3);if(e<5)return"just now";if(e<60)return`${e}s ago`;const i=Math.round(e/60);if(i<60)return`${i}m ago`;const s=Math.round(i/60);if(s<24)return`${s}h ago`;return`${Math.round(s/24)}d ago`}render(){if(!this._config||!this.hass)return G;const t=this.hass.states[this._config.vacuum];if(!t)return V`<ha-card><div class="warning">Entity not found: ${this._config.vacuum}</div></ha-card>`;const e=this._config.name??t.attributes.friendly_name??"Vacuum",i=this.hass.formatEntityState?.(t)??t.state,s="bottom"===this._config.map_position?"bottom":"top",o=this._config.show_last_updated??!0?this._lastUpdated():void 0;return V`
      <ha-card>
        <div class="header" @click=${()=>this._fireMoreInfo(this._config.vacuum)}>
          <ha-icon class="header-icon" icon="mdi:robot-vacuum"></ha-icon>
          <div class="header-text">
            <div class="name">${e}</div>
            <div class="status">${i}</div>
            ${o?V`<div class="last-updated">Updated ${this._relativeTime(o)}</div>`:G}
          </div>
        </div>
        ${this._config.show_controls??!0?this._renderControls(t):G}
        ${"top"===s&&(this._config.show_map??!0)?this._renderMap():G}
        ${this._config.show_dock_actions??!0?this._renderDockActions():G}
        ${this._renderSelects()}
        ${this._config.show_battery??!0?this._renderBattery():G}
        ${this._config.show_mop_status??!0?this._renderMopStatus():G}
        ${this._config.show_sensors??!0?this._renderSensors():G}
        ${"bottom"===s&&(this._config.show_map??!0)?this._renderMap():G}
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
    `}_renderMap(){const t=this._config.camera??this._discovered.camera;if(!t)return G;const e=this.hass.states[t],i=e?.attributes?.entity_picture;if(!i)return G;const s=this._config.map_rotation??0,o=this._roomGeometry,r=s%360!=0?`transform: rotate(${s}deg);`:"";return V`
      <div class="section map-section">
        <div class="map-wrap">
          <img class="map-image" src=${i} style=${r} @click=${this._onMapClick} />
          ${o?this._renderMapOverlay(o,r):G}
        </div>
        ${o?G:V`<div class="map-hint">
              Room click-to-select needs TapoVac-ADV v1.12+ (the map camera's
              <code>room_geometry</code> attribute) — update the integration via HACS, restart Home
              Assistant, then hard-refresh this browser tab.
            </div>`}
        ${this._selectedRoomIds.size>0?this._renderSelectedRoomsBar(o):G}
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
    `}_renderRoomOverlay(t){const e=this._selectedRoomIds.has(t.id),i=this._config.room_polygons?.[String(t.id)],[s,o,r]=t.color,n=e?`rgba(${s},${o},${r},0.55)`:`rgba(${s},${o},${r},0.12)`,a=e?`rgb(${s},${o},${r})`:`rgba(${s},${o},${r},0.4)`,c=e?4:1.5,l=e?"room-shape selected":"room-shape";if(i&&i.length>=3){const t=i.map(([t,e])=>`${t},${e}`).join(" ");return V`<polygon
        points=${t}
        fill=${n}
        stroke=${a}
        stroke-width=${c}
        class=${l}
      ></polygon>`}const[h,d,u,p]=t.bbox;return V`<rect
      x=${h}
      y=${d}
      width=${u-h}
      height=${p-d}
      fill=${n}
      stroke=${a}
      stroke-width=${c}
      class=${l}
    ></rect>`}_renderRoomOrderBadge(t){const e=[...this._selectedRoomIds].indexOf(t.id);return V`
      <g class="room-order-badge">
        <circle cx=${t.cx} cy=${t.cy} r="15" class="badge-circle"></circle>
        <text x=${t.cx} y=${t.cy} dy="0.35em" text-anchor="middle" class="badge-text">${e+1}</text>
      </g>
    `}_renderFurniture(){const t=this._config.furniture;return t&&0!==t.length?V`
      <g class="furniture-layer">
        ${t.map(t=>V`
            <g transform="translate(${t.x} ${t.y}) rotate(${t.rotation})" class="furniture-item">
              ${Et(t.type,t.width,t.height)}
            </g>
          `)}
      </g>
    `:G}_renderSelectedRoomsBar(t){const e=[...this._selectedRoomIds].map((e,i)=>{const s=t?.rooms.find(t=>t.id===e)?.name;return s?`${i+1}. ${s}`:void 0}).filter(t=>!!t);return V`
      <div class="selected-rooms-bar">
        <span>${this._config.show_room_names??!0?e.join(", "):`${e.length} room(s)`}</span>
        <button class="pill accent small" @click=${this._cleanSelectedRooms} ?disabled=${this._busy}>
          <ha-icon icon="mdi:broom"></ha-icon><span>Clean</span>
        </button>
        <button class="pill small" @click=${()=>this._selectedRoomIds=new Set}>
          <ha-icon icon="mdi:close"></ha-icon><span>Clear</span>
        </button>
      </div>
    `}_onMapClick(t){const e=this._roomGeometry;if(!e||!this._mapImg)return void console.debug("[vacuum-card-adv] map click ignored: room_geometry not available on the camera entity yet");const i=this._config.map_rotation??0,s=xt(t.clientX,t.clientY,this._mapImg,i),o=function(t,e,i){for(const s of e.rooms){const e=i?.[String(s.id)];if(e&&e.length>=3&&St(t,e))return s.id}for(const s of e.rooms)if(!i?.[String(s.id)]&&At(t,s.bbox))return s.id;if(0===e.rooms.length)return null;let s=e.rooms[0],o=kt(t,s.cx,s.cy);for(const i of e.rooms.slice(1)){const e=kt(t,i.cx,i.cy);e<o&&(s=i,o=e)}return o<=(.15*Math.max(e.image_width,e.image_height))**2?s.id:null}(s,e,this._config.room_polygons);if(null===o)return void console.debug("[vacuum-card-adv] map click did not land inside any known room",s);const r=new Set(this._selectedRoomIds);r.has(o)?r.delete(o):r.add(o),this._selectedRoomIds=r}async _cleanSelectedRooms(){const t=this._roomGeometry;if(!t||0===this._selectedRoomIds.size)return;const e=[...this._selectedRoomIds].map(e=>t.rooms.find(t=>t.id===e)?.name).filter(t=>!!t);if(0!==e.length){this._busy=!0;try{await this.hass.callService("tapo_rv30","clean_rooms",{entity_id:this._config.vacuum,rooms:e}),this._selectedRoomIds=new Set}finally{this._busy=!1}}}_renderDockActions(){return 0===this._discovered.dockActions.length?G:V`
      <div class="section dock-actions">
        ${this._discovered.dockActions.map(t=>V`
            <button class="pill" @click=${()=>this._pressButton(t.entityId)}>
              <ha-icon icon=${t.icon}></ha-icon>
              <span>${t.name}</span>
            </button>
          `)}
      </div>
    `}_renderSelects(){const t=this.hass.states[this._config.vacuum],e=this._config.show_fan_speed??!0,i=this._config.show_water_level??!0,s=t.attributes.fan_speed_list??[],o=t.attributes.fan_speed,r=this._config.water_level_entity??this._discovered.waterLevel,n=r?this.hass.states[r]:void 0;return e&&s.length>0||i&&n?V`
      <div class="section selects">
        ${e&&s.length>0?V`
              <ha-select
                label="Fan speed"
                fixedMenuPosition
                naturalMenuWidth
                .value=${o??""}
                @selected=${t=>{const e=t.target.value;e!==(o??"")&&this._setFanSpeed(e)}}
                @closed=${t=>t.stopPropagation()}
              >
                ${s.map(t=>V`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
              </ha-select>
            `:G}
        ${i&&n?V`
              <ha-select
                label="Water level"
                fixedMenuPosition
                naturalMenuWidth
                .value=${n.state}
                @selected=${t=>{const e=t.target.value;e!==n.state&&this._selectOption(r,e)}}
                @closed=${t=>t.stopPropagation()}
              >
                ${(n.attributes.options??[]).map(t=>V`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
              </ha-select>
            `:G}
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
    `:G}_renderSensors(){const t=this._config.sensors??this._discovered.sensors;return t&&0!==t.length?V`<div class="section sensors">${t.map(t=>this._renderSensorRow(t))}</div>`:G}_renderSensorRow(t){const e=this.hass.states[t];if(!e)return G;const i=this._shortTitle(e.attributes.friendly_name??e.entity_id);if("error"===i.toLowerCase()&&"ok"===e.state.toLowerCase())return G;const s=e.attributes.unit_of_measurement??"",o=e.attributes.icon??"mdi:information-outline",r="%"===s?Number(e.state):void 0;return this._renderRow({icon:o,title:i,value:`${e.state}${s}`,percent:void 0===r||Number.isNaN(r)?void 0:r,overdue:!!e.attributes.overdue,entityId:t})}_renderMaintenance(){const t=this._config.maintenance_sensors??this._discovered.maintenanceSensors;return t&&0!==t.length?V`
      <div class="section">
        <button class="maintenance-toggle" @click=${()=>this._maintenanceOpen=!this._maintenanceOpen}>
          <ha-icon icon="mdi:wrench"></ha-icon>
          <span>Maintenance</span>
          <ha-icon icon=${this._maintenanceOpen?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </button>
        ${this._maintenanceOpen?V`<div class="sensors">${t.map(t=>this._renderSensorRow(t))}</div>`:G}
      </div>
    `:G}_callVacuumService(t){this.hass.callService("vacuum",t,{entity_id:this._config.vacuum})}_setFanSpeed(t){t&&this.hass.callService("vacuum","set_fan_speed",{entity_id:this._config.vacuum,fan_speed:t})}_selectOption(t,e){e&&this.hass.callService("select","select_option",{entity_id:t,option:e})}_pressButton(t){this.hass.callService("button","press",{entity_id:t})}_fireMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}};It.styles=n`
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
    .furniture-item .furn-body {
      fill: rgba(141, 110, 99, 0.55);
      stroke: #8d6e63;
      stroke-width: 2;
    }
    .furniture-item .furn-detail {
      fill: rgba(93, 64, 55, 0.65);
      stroke: none;
    }
    .furniture-item .furn-line {
      stroke: #5d4037;
      stroke-width: 1.5;
    }
    .furniture-item .furn-plant {
      fill: rgba(76, 175, 80, 0.55);
      stroke: #4caf50;
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
    .selects ha-select {
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
  `,t([mt({attribute:!1})],It.prototype,"hass",void 0),t([_t()],It.prototype,"_config",void 0),t([_t()],It.prototype,"_discovered",void 0),t([_t()],It.prototype,"_selectedRoomIds",void 0),t([_t()],It.prototype,"_maintenanceOpen",void 0),t([_t()],It.prototype,"_busy",void 0),t([ft("img.map-image")],It.prototype,"_mapImg",void 0),It=t([dt("vacuum-card-adv")],It);export{It as VacuumCardAdv};

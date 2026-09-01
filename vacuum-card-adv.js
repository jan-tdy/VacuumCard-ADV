function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,_=m.trustedTypes,f=_?_.emptyScript:"",v=m.reactiveElementPolyfillSupport,g=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[g("elementProperties")]=new Map,w[g("finalized")]=new Map,v?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=t=>t,S=x.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,R="?"+k,P=`<${R}>`,M=document,O=()=>M.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,U="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,D=/>/g,j=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,V=/"/g,B=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),F=new WeakMap,G=M.createTreeWalker(M,129);function Y(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=T;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===T?"!--"===c[1]?r=H:void 0!==c[1]?r=D:void 0!==c[2]?(B.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=j):void 0!==c[3]&&(r=j):r===j?">"===c[0]?(r=o??T,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?j:'"'===c[3]?V:z):r===V||r===z?r=j:r===H||r===D?r=T:(r=j,o=void 0);const d=r===j&&t[e+1].startsWith("/>")?" ":"";n+=r===T?i+P:l>=0?(s.push(a),i.slice(0,l)+E+i.slice(l)+k+d):i+k+(-2===l?e:d)}return[Y(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=K.createElement(c,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[n++],i=s.getAttribute(t).split(k),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),G.nextNode(),a.push({type:2,index:++o});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===R)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===W)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=I(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);G.currentNode=s;let o=G.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Q(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=G.nextNode(),n++)}return G.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),I(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new K(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Q(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=X(this,t,e,0),n=!I(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=X(this,s[i+r],e,r),a===W&&(a=this._$AH[r]),n||=!I(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??q)===W)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(K,Q),(x.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Q(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:y},dt=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return pt({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mt=[{name:"Empty Dust Bin",icon:"mdi:delete-empty"},{name:"Wash Mop",icon:"mdi:water-sync"},{name:"Dry Mop",icon:"mdi:tumble-dryer"},{name:"Remove Hair",icon:"mdi:content-cut"}],_t=["schedules","status"];function ft(t){return t.entities}function vt(t,e){const i=ft(t)?.[e];if(i?.name)return i.name;if(i?.original_name)return i.original_name;const s=t.states[e],o=s?.attributes?.friendly_name;return"string"==typeof o?o:e}function gt(t,e){return t.filter(t=>t.startsWith(`${e}.`))}function $t(t,e){const i=function(t,e){const i=ft(t);if(!i)return[];const s=i[e]?.device_id;return s?Object.keys(i).filter(t=>i[t]?.device_id===s):[]}(t,e),s={dockActions:[],sensors:[],maintenanceSensors:[]};if(0===i.length)return s;s.camera=gt(i,"camera")[0];for(const e of gt(i,"select")){const i=vt(t,e);i.includes("Water Level")?s.waterLevel=e:i.includes("Clean Passes")&&(s.cleanPasses=e)}for(const e of gt(i,"sensor")){const i=t.states[e];if("battery"===i?.attributes?.device_class){s.battery=e;continue}const o=vt(t,e).toLowerCase();if(o.includes("remaining"))s.maintenanceSensors.push(e);else{if(_t.some(t=>o.endsWith(t)))continue;s.sensors.push(e)}}for(const e of gt(i,"binary_sensor"))vt(t,e).toLowerCase().includes("mop")&&(s.mopAttached=e);for(const e of gt(i,"button")){const i=vt(t,e),o=mt.find(t=>t.name===i);o&&s.dockActions.push({entityId:e,name:o.name,icon:o.icon})}return s}function yt(t,e,i,s){const o=i.getBoundingClientRect(),n=o.left+o.width/2,r=o.top+o.height/2,a=i.offsetWidth||o.width,c=i.offsetHeight||o.height;let l=t-n,h=e-r;if(s%360!=0){const t=-s*Math.PI/180,e=Math.cos(t),i=Math.sin(t),o=l*i+h*e;l=l*e-h*i,h=o}const d=h+c/2;return{x:(l+a/2)*(i.naturalWidth/a),y:d*(i.naturalHeight/c)}}function bt(t,e){return t.x>=e[0]&&t.x<=e[2]&&t.y>=e[1]&&t.y<=e[3]}function wt(t,e){let i=!1;for(let s=0,o=e.length-1;s<e.length;o=s++){const[n,r]=e[s],[a,c]=e[o];r>t.y!=c>t.y&&t.x<(a-n)*(t.y-r)/(c-r)+n&&(i=!i)}return i}function xt(t,e,i){const s=t.x-e,o=t.y-i;return s*s+o*o}let At=class extends at{constructor(){super(...arguments),this._calibrationPoints=[]}setConfig(t){this._config=t}_fireConfigChanged(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_valueChanged(t,e){this._fireConfigChanged({...this._config,[t]:e})}get _cameraId(){if(this._config?.vacuum)return this._config.camera??$t(this.hass,this._config.vacuum).camera}get _roomGeometry(){const t=this._cameraId;if(!t)return;const e=this.hass.states[t]?.attributes?.room_geometry;return e&&e.rooms?.length?e:void 0}render(){return this.hass&&this._config?L`
      <div class="section">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.vacuum??""}
          .includeDomains=${["vacuum"]}
          label="Vacuum entity (required)"
          @value-changed=${t=>this._valueChanged("vacuum",t.detail.value)}
        ></ha-entity-picker>
      </div>

      ${this._config.vacuum?this._renderToggles():q}
      ${this._config.vacuum&&(this._config.show_map??!0)?this._renderRotation():q}
      ${this._config.vacuum?this._renderAdvancedEntities():q}
      ${this._config.vacuum&&(this._config.show_map??!0)?this._renderCalibration():q}
    `:q}_renderToggles(){return L`
      <div class="section toggles">
        ${[["show_map","Show map"],["show_room_names","Show room names when selecting"],["show_controls","Show start/pause/stop/dock controls"],["show_dock_actions","Show dock action buttons (empty bin / wash / dry / hair)"],["show_fan_speed","Show fan speed selector"],["show_water_level","Show water level selector"],["show_battery","Show battery"],["show_sensors","Show sensors"]].map(([t,e])=>L`
            <ha-formfield .label=${e}>
              <ha-switch
                .checked=${this._config[t]??!0}
                @change=${e=>this._valueChanged(t,e.target.checked)}
              ></ha-switch>
            </ha-formfield>
          `)}
      </div>
    `}_renderRotation(){return L`
      <div class="section">
        <ha-textfield
          label="Map rotation (degrees)"
          type="number"
          .value=${String(this._config.map_rotation??0)}
          @change=${t=>this._valueChanged("map_rotation",Number(t.target.value)||0)}
        ></ha-textfield>
      </div>
    `}_renderAdvancedEntities(){return L`
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
        <div class="hint">
          The full list of sensors shown, and which sensors count as "maintenance", can be
          overridden via <code>sensors</code> / <code>maintenance_sensors</code> in the YAML
          editor (switch using the ⋮ menu above) — every sensor on the device is included
          automatically otherwise.
        </div>
      </div>
    `}_renderCalibration(){const t=this._roomGeometry,e=this._cameraId,i=e?this.hass.states[e]?.attributes?.entity_picture:void 0;return L`
      <div class="section">
        <div class="section-title">Room calibration</div>
        <div class="hint">
          Rooms already work out of the box using an automatically-detected rectangle. Use this
          only if a room's shape is irregular and the automatic click area feels wrong: pick a
          room, click points on the map below to trace its actual outline (points connect live),
          then finish to save it.
        </div>
        ${t&&i?L`
              <ha-select
                label="Room to calibrate"
                .value=${void 0!==this._calibrationRoomId?String(this._calibrationRoomId):""}
                @selected=${t=>{const e=Number(t.target.value);this._calibrationRoomId=Number.isNaN(e)?void 0:e,this._calibrationPoints=[]}}
                @closed=${t=>t.stopPropagation()}
              >
                ${t.rooms.map(t=>L`<mwc-list-item .value=${String(t.id)}>${t.name}</mwc-list-item>`)}
              </ha-select>

              ${void 0!==this._calibrationRoomId?L`
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
                  `:q}
            `:L`<div class="hint">Map not available yet — open a dashboard with this vacuum first.</div>`}
      </div>
    `}_renderCalibrationOverlay(t){const e=this._calibrationRoomId,i=t.rooms.find(t=>t.id===e),s=void 0!==e?this._config.room_polygons?.[String(e)]:void 0,o=s&&s.length>=3?L`<polygon
            points=${s.map(([t,e])=>`${t},${e}`).join(" ")}
            fill="rgba(3,169,244,0.25)"
            stroke="rgb(3,169,244)"
            stroke-width="3"
          ></polygon>`:q,n=i?L`<rect
          x=${i.bbox[0]}
          y=${i.bbox[1]}
          width=${i.bbox[2]-i.bbox[0]}
          height=${i.bbox[3]-i.bbox[1]}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          stroke-dasharray="6,4"
          stroke-width="2"
        ></rect>`:q,r=this._calibrationPoints.length>0?L`
            <polyline
              points=${this._calibrationPoints.map(([t,e])=>`${t},${e}`).join(" ")}
              fill="none"
              stroke="rgb(255,152,0)"
              stroke-width="3"
            ></polyline>
            ${this._calibrationPoints.map(([t,e])=>L`<circle cx=${t} cy=${e} r="5" fill="rgb(255,152,0)"></circle>`)}
          `:q;return L`${n}${o}${r}`}_onCalibrationClick(t){const e=t.currentTarget,i=yt(t.clientX,t.clientY,e,0);this._calibrationPoints=[...this._calibrationPoints,[Math.round(i.x),Math.round(i.y)]]}_finishCalibration(){if(void 0===this._calibrationRoomId||this._calibrationPoints.length<3)return;const t={...this._config.room_polygons??{}};t[String(this._calibrationRoomId)]=this._calibrationPoints,this._calibrationPoints=[],this._valueChanged("room_polygons",t)}_deleteCalibration(){if(void 0===this._calibrationRoomId||!this._config.room_polygons)return;const t={...this._config.room_polygons};delete t[String(this._calibrationRoomId)],this._calibrationPoints=[],this._valueChanged("room_polygons",t)}};At.styles=r`
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
  `,t([pt({attribute:!1})],At.prototype,"hass",void 0),t([ut()],At.prototype,"_config",void 0),t([ut()],At.prototype,"_calibrationRoomId",void 0),t([ut()],At.prototype,"_calibrationPoints",void 0),At=t([lt("vacuum-card-adv-editor")],At),console.info("%c VACUUM-CARD-ADV %c v0.3.0 ","color: #0b0f14; background: #34e0d6; font-weight: 700;","color: #34e0d6; background: #0b0f14; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"vacuum-card-adv",name:"TapoVac ADV Vacuum Card",description:"A card for the TapoVac-ADV integration (Tapo RV30/RV50 series).",preview:!0});let St=class extends at{constructor(){super(...arguments),this._discovered={dockActions:[],sensors:[],maintenanceSensors:[]},this._selectedRoomIds=new Set,this._maintenanceOpen=!1,this._busy=!1}static getConfigElement(){return document.createElement("vacuum-card-adv-editor")}static getStubConfig(t){return{type:"custom:vacuum-card-adv",vacuum:Object.keys(t.states).find(t=>t.startsWith("vacuum."))??"",show_map:!0,show_controls:!0,show_dock_actions:!0,show_fan_speed:!0,show_water_level:!0,show_battery:!0,show_sensors:!0,show_room_names:!0}}setConfig(t){if(!t.vacuum)throw new Error("vacuum entity is required");this._config={show_map:!0,show_controls:!0,show_dock_actions:!0,show_fan_speed:!0,show_water_level:!0,show_battery:!0,show_sensors:!0,show_room_names:!0,map_rotation:0,...t},this._maintenanceOpen=!1===t.maintenance_collapsed_default}getCardSize(){let t=2;return(this._config?.show_map??!0)&&(t+=6),(this._config?.show_sensors??!0)&&(t+=2),t}willUpdate(t){t.has("hass")&&this.hass&&this._config?.vacuum&&(this._lastDiscoveredFor===this._config.vacuum&&t.has("_discovered")||(this._discovered=$t(this.hass,this._config.vacuum),this._lastDiscoveredFor=this._config.vacuum))}get _roomGeometry(){const t=this._config.camera??this._discovered.camera;if(!t)return;const e=this.hass.states[t],i=e?.attributes?.room_geometry;return i&&i.rooms?i:void 0}_shortTitle(t){const e=this.hass.states[this._config.vacuum],i=e?.attributes.friendly_name;return i&&t.startsWith(`${i} `)?t.slice(i.length+1):t}render(){if(!this._config||!this.hass)return q;const t=this.hass.states[this._config.vacuum];if(!t)return L`<ha-card><div class="warning">Entity not found: ${this._config.vacuum}</div></ha-card>`;const e=this._config.name??t.attributes.friendly_name??"Vacuum",i=this.hass.formatEntityState?.(t)??t.state;return L`
      <ha-card>
        <div class="header" @click=${()=>this._fireMoreInfo(this._config.vacuum)}>
          <ha-icon class="header-icon" icon="mdi:robot-vacuum"></ha-icon>
          <div class="header-text">
            <div class="name">${e}</div>
            <div class="status">${i}</div>
          </div>
        </div>
        ${this._config.show_controls??!0?this._renderControls(t):q}
        ${this._config.show_map??!0?this._renderMap():q}
        ${this._config.show_dock_actions??!0?this._renderDockActions():q}
        ${this._renderSelects()}
        ${this._config.show_battery??!0?this._renderBattery():q}
        ${this._config.show_sensors??!0?this._renderSensors():q}
        ${this._renderMaintenance()}
      </ha-card>
    `}_renderControls(t){const e="cleaning"===t.state;return L`
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
    `}_renderMap(){const t=this._config.camera??this._discovered.camera;if(!t)return q;const e=this.hass.states[t],i=e?.attributes?.entity_picture;if(!i)return q;const s=this._config.map_rotation??0,o=this._roomGeometry,n=s%360!=0?`transform: rotate(${s}deg);`:"";return L`
      <div class="section map-section">
        <div class="map-wrap">
          <img
            class="map-image"
            src=${i}
            style=${n}
            @click=${this._onMapClick}
            @load=${()=>this.requestUpdate()}
          />
          ${o?this._renderMapOverlay(o,n):q}
        </div>
        ${o?q:L`<div class="map-hint">
              Room click-to-select needs TapoVac-ADV v1.12+ (the map camera's
              <code>room_geometry</code> attribute) — update the integration via HACS, restart Home
              Assistant, then hard-refresh this browser tab.
            </div>`}
        ${this._selectedRoomIds.size>0?this._renderSelectedRoomsBar(o):q}
      </div>
    `}_renderMapOverlay(t,e){return L`
      <svg
        class="map-overlay"
        style=${e}
        viewBox="0 0 ${t.image_width} ${t.image_height}"
        preserveAspectRatio="none"
      >
        ${t.rooms.map(t=>this._renderRoomOverlay(t))}
      </svg>
    `}_renderRoomOverlay(t){const e=this._selectedRoomIds.has(t.id),i=this._config.room_polygons?.[String(t.id)],[s,o,n]=t.color,r=e?`rgba(${s},${o},${n},0.55)`:"transparent",a=e?`rgb(${s},${o},${n})`:"transparent";if(i&&i.length>=3){const t=i.map(([t,e])=>`${t},${e}`).join(" ");return L`<polygon points=${t} fill=${r} stroke=${a} stroke-width="3"></polygon>`}const[c,l,h,d]=t.bbox;return L`<rect
      x=${c}
      y=${l}
      width=${h-c}
      height=${d-l}
      fill=${r}
      stroke=${a}
      stroke-width="3"
    ></rect>`}_renderSelectedRoomsBar(t){const e=[...this._selectedRoomIds].map(e=>t?.rooms.find(t=>t.id===e)?.name).filter(t=>!!t);return L`
      <div class="selected-rooms-bar">
        <span>${this._config.show_room_names??!0?e.join(", "):`${e.length} room(s)`}</span>
        <button class="pill accent small" @click=${this._cleanSelectedRooms} ?disabled=${this._busy}>
          <ha-icon icon="mdi:broom"></ha-icon><span>Clean</span>
        </button>
        <button class="pill small" @click=${()=>this._selectedRoomIds=new Set}>
          <ha-icon icon="mdi:close"></ha-icon><span>Clear</span>
        </button>
      </div>
    `}_onMapClick(t){const e=this._roomGeometry;if(!e||!this._mapImg)return void console.debug("[vacuum-card-adv] map click ignored: room_geometry not available on the camera entity yet");const i=this._config.map_rotation??0,s=yt(t.clientX,t.clientY,this._mapImg,i),o=function(t,e,i){for(const s of e.rooms){const e=i?.[String(s.id)];if(e&&e.length>=3&&wt(t,e))return s.id}for(const s of e.rooms)if(!i?.[String(s.id)]&&bt(t,s.bbox))return s.id;if(0===e.rooms.length)return null;let s=e.rooms[0],o=xt(t,s.cx,s.cy);for(const i of e.rooms.slice(1)){const e=xt(t,i.cx,i.cy);e<o&&(s=i,o=e)}return o<=(.15*Math.max(e.image_width,e.image_height))**2?s.id:null}(s,e,this._config.room_polygons);if(null===o)return void console.debug("[vacuum-card-adv] map click did not land inside any known room",s);const n=new Set(this._selectedRoomIds);n.has(o)?n.delete(o):n.add(o),this._selectedRoomIds=n}async _cleanSelectedRooms(){const t=this._roomGeometry;if(!t||0===this._selectedRoomIds.size)return;const e=[...this._selectedRoomIds].map(e=>t.rooms.find(t=>t.id===e)?.name).filter(t=>!!t);if(0!==e.length){this._busy=!0;try{await this.hass.callService("tapo_rv30","clean_rooms",{entity_id:this._config.vacuum,rooms:e}),this._selectedRoomIds=new Set}finally{this._busy=!1}}}_renderDockActions(){return 0===this._discovered.dockActions.length?q:L`
      <div class="section dock-actions">
        ${this._discovered.dockActions.map(t=>L`
            <button class="pill" @click=${()=>this._pressButton(t.entityId)}>
              <ha-icon icon=${t.icon}></ha-icon>
              <span>${t.name}</span>
            </button>
          `)}
      </div>
    `}_renderSelects(){const t=this.hass.states[this._config.vacuum],e=this._config.show_fan_speed??!0,i=this._config.show_water_level??!0,s=t.attributes.fan_speed_list??[],o=t.attributes.fan_speed,n=this._config.water_level_entity??this._discovered.waterLevel,r=n?this.hass.states[n]:void 0;return e&&s.length>0||i&&r?L`
      <div class="section selects">
        ${e&&s.length>0?L`
              <ha-select
                label="Fan speed"
                .value=${o??""}
                @selected=${t=>this._setFanSpeed(t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                ${s.map(t=>L`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
              </ha-select>
            `:q}
        ${i&&r?L`
              <ha-select
                label="Water level"
                .value=${r.state}
                @selected=${t=>this._selectOption(n,t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                ${(r.attributes.options??[]).map(t=>L`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
              </ha-select>
            `:q}
      </div>
    `:q}_renderRow(t){const e=void 0!==t.percent&&!Number.isNaN(t.percent);return L`
      <div
        class="info-row ${t.overdue?"overdue":""} ${t.entityId?"clickable":""}"
        @click=${t.entityId?()=>this._fireMoreInfo(t.entityId):void 0}
      >
        <ha-icon icon=${t.icon}></ha-icon>
        <span class="info-label">${t.title}</span>
        ${e?L`<span
              class="info-bar"
              style="--pct:${Math.max(0,Math.min(100,t.percent))}%; --color:${t.gaugeColor??"var(--primary-color)"}"
            ></span>`:q}
        <span class="info-value">${t.value}</span>
      </div>
    `}_renderBattery(){const t=this._config.battery_entity??this._discovered.battery;if(!t)return q;const e=this.hass.states[t];if(!e)return q;const i=Number(e.state);return L`
      <div class="section sensors">
        ${this._renderRow({icon:this._batteryIcon(i),title:this._shortTitle(e.attributes.friendly_name??"Battery"),value:`${e.state}%`,percent:i,gaugeColor:this._batteryColor(i),entityId:t})}
      </div>
    `}_batteryIcon(t){if(Number.isNaN(t))return"mdi:battery-unknown";const e=10*Math.round(t/10);return e>=100?"mdi:battery":e<=0?"mdi:battery-outline":`mdi:battery-${e}`}_batteryColor(t){return Number.isNaN(t)?"var(--disabled-text-color)":t<=20?"var(--error-color)":t<=50?"var(--warning-color)":"var(--success-color)"}_renderSensors(){const t=this._config.sensors??this._discovered.sensors;return t&&0!==t.length?L`<div class="section sensors">${t.map(t=>this._renderSensorRow(t))}</div>`:q}_renderSensorRow(t){const e=this.hass.states[t];if(!e)return q;const i=this._shortTitle(e.attributes.friendly_name??e.entity_id);if("error"===i.toLowerCase()&&"ok"===e.state.toLowerCase())return q;const s=e.attributes.unit_of_measurement??"",o=e.attributes.icon??"mdi:information-outline",n="%"===s?Number(e.state):void 0;return this._renderRow({icon:o,title:i,value:`${e.state}${s}`,percent:void 0===n||Number.isNaN(n)?void 0:n,overdue:!!e.attributes.overdue,entityId:t})}_renderMaintenance(){const t=this._config.maintenance_sensors??this._discovered.maintenanceSensors;return t&&0!==t.length?L`
      <div class="section">
        <button class="maintenance-toggle" @click=${()=>this._maintenanceOpen=!this._maintenanceOpen}>
          <ha-icon icon="mdi:wrench"></ha-icon>
          <span>Maintenance</span>
          <ha-icon icon=${this._maintenanceOpen?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </button>
        ${this._maintenanceOpen?L`<div class="sensors">${t.map(t=>this._renderSensorRow(t))}</div>`:q}
      </div>
    `:q}_callVacuumService(t){this.hass.callService("vacuum",t,{entity_id:this._config.vacuum})}_setFanSpeed(t){t&&this.hass.callService("vacuum","set_fan_speed",{entity_id:this._config.vacuum,fan_speed:t})}_selectOption(t,e){e&&this.hass.callService("select","select_option",{entity_id:t,option:e})}_pressButton(t){this.hass.callService("button","press",{entity_id:t})}_fireMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}};St.styles=r`
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
  `,t([pt({attribute:!1})],St.prototype,"hass",void 0),t([ut()],St.prototype,"_config",void 0),t([ut()],St.prototype,"_discovered",void 0),t([ut()],St.prototype,"_selectedRoomIds",void 0),t([ut()],St.prototype,"_maintenanceOpen",void 0),t([ut()],St.prototype,"_busy",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}("img.map-image")],St.prototype,"_mapImg",void 0),St=t([lt("vacuum-card-adv")],St);export{St as VacuumCardAdv};

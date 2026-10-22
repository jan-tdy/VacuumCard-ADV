function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,_=m.trustedTypes,f=_?_.emptyScript:"",g=m.reactiveElementPolyfillSupport,v=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,g?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,S=t=>t,k=x.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,M="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,R=`<${E}>`,P=document,D=()=>P.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,F=Array.isArray,T="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,L=/>/g,U=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,H=/"/g,j=/^(?:script|style|textarea|title)$/i,V=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),B=V(1),W=V(2),G=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Y=new WeakMap,X=P.createTreeWalker(P,129);function K(t,e){if(!F(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=O;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(n.lastIndex=h,c=n.exec(i),null!==c);)h=n.lastIndex,n===O?"!--"===c[1]?n=N:void 0!==c[1]?n=L:void 0!==c[2]?(j.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=U):void 0!==c[3]&&(n=U):n===U?">"===c[0]?(n=o??O,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?U:'"'===c[3]?H:z):n===H||n===z?n=U:n===N||n===L?n=O:(n=U,o=void 0);const d=n===U&&t[e+1].startsWith("/>")?" ":"";r+=n===O?i+R:l>=0?(s.push(a),i.slice(0,l)+M+i.slice(l)+C+d):i+C+(-2===l?e:d)}return[K(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=Z.createElement(c,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(M)){const e=l[r++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?st:"?"===n[1]?ot:"@"===n[1]?rt:it}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],D()),X.nextNode(),a.push({type:2,index:++o});s.append(t[e],D())}}}else if(8===s.nodeType)if(s.data===E)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===G)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=I(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);X.currentNode=s;let o=X.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new et(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new nt(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=X.nextNode(),r++)}return X.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),I(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>F(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new Z(t)),e}k(t){F(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new et(this.O(D()),this.O(D()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Q(this,t,e,0),r=!I(t)||t!==this._$AH&&t!==G,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Q(this,s[i+n],e,n),a===G&&(a=this._$AH[n]),r||=!I(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class rt extends it{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??q)===G)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(Z,et),(x.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class lt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new et(e.insertBefore(D(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const ht=ct.litElementPolyfillSupport;ht?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ut={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:y},pt=(t=ut,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
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
function ft(t,e){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const gt=[{name:"Empty Dust Bin",icon:"mdi:delete-empty"},{name:"Wash Mop",icon:"mdi:water-sync"},{name:"Dry Mop",icon:"mdi:tumble-dryer"},{name:"Remove Hair",icon:"mdi:content-cut"}],vt=[{name:"Start Auto Empty",icon:"mdi:delete-empty"},{name:"Self-Clean",icon:"mdi:water-sync"},{name:"Start Drying",icon:"mdi:tumble-dryer"}],$t=["Water Level","Water Volume"],yt=["cleaning"],bt={tapo_rv30:"tapo",dreame_vacuum:"dreame"};function wt(t,e){const i=St(t)?.[e]?.platform;return i?bt[i]:void 0}const xt=["schedules","status"];function St(t){return t.entities}function kt(t,e){const i=t.states[e],s=i?.attributes?.entity_picture;if(!s)return;if(!i.last_updated)return s;const o=s.includes("?")?"&":"?";return`${s}${o}_hactl=${encodeURIComponent(i.last_updated)}`}function At(t,e){const i=St(t)?.[e];if(i?.name)return i.name;if(i?.original_name)return i.original_name;const s=t.states[e],o=s?.attributes?.friendly_name;return"string"==typeof o?o:e}function Mt(t,e){return t.filter(t=>t.startsWith(`${e}.`))}function Ct(t,e,i="tapo"){const s=function(t,e){const i=St(t);if(!i)return[];const s=i[e]?.device_id;return s?Object.keys(i).filter(t=>i[t]?.device_id===s):[]}(t,e),o={dockActions:[],sensors:[],maintenanceSensors:[]};if(0===s.length)return o;o.camera=Mt(s,"camera")[0],o.lastClean=Mt(s,"image").find(e=>At(t,e).toLowerCase().includes("last clean")||e.toLowerCase().includes("last_clean")),o.schedules=Mt(s,"sensor").find(e=>At(t,e).toLowerCase().includes("schedules"));for(const e of Mt(s,"select")){const i=At(t,e);$t.some(t=>i.includes(t))?o.waterLevel=e:i.includes("Clean Passes")?o.cleanPasses=e:o.maintenanceSensors.push(e)}for(const e of Mt(s,"sensor")){const i=t.states[e];if("battery"===i?.attributes?.device_class){o.battery=e;continue}const s=At(t,e).toLowerCase();if(s.includes("remaining")||s.includes("used")||s.includes("consumable")||s.includes("carpet"))o.maintenanceSensors.push(e);else{if(xt.some(t=>s.endsWith(t)))continue;o.sensors.push(e)}}for(const e of Mt(s,"binary_sensor"))At(t,e).toLowerCase().includes("mop")?o.mopAttached=e:o.maintenanceSensors.push(e);for(const t of Mt(s,"number"))o.maintenanceSensors.push(t);for(const t of Mt(s,"switch"))o.maintenanceSensors.push(t);const r="dreame"===i?vt:gt;for(const e of Mt(s,"button")){const i=At(t,e).toLowerCase(),s=r.find(t=>i.includes(t.name.toLowerCase()));s&&o.dockActions.push({entityId:e,name:s.name,icon:s.icon})}return o}function Et(t,e,i,s){const o=i.getBoundingClientRect(),r=o.left+o.width/2,n=o.top+o.height/2,a=i.offsetWidth||o.width,c=i.offsetHeight||o.height;let l=t-r,h=e-n;if(s%360!=0){const t=-s*Math.PI/180,e=Math.cos(t),i=Math.sin(t),o=l*i+h*e;l=l*e-h*i,h=o}const d=h+c/2;return{x:(l+a/2)*(i.naturalWidth/a),y:d*(i.naturalHeight/c)}}function Rt(t){return void 0!==t.map_id&&null!==t.map_id?`map:${t.map_id}`:t.rooms.map(t=>`${t.id}:${t.name}`).sort().join("|")}function Pt(t,e){if(!t)return{};const i=Rt(e),s={};for(const o of e.rooms){const e=t[`${i}:${o.id}`]??t[String(o.id)];e&&(s[String(o.id)]=e)}return s}function Dt(t,e){return t.x>=e[0]&&t.x<=e[2]&&t.y>=e[1]&&t.y<=e[3]}function It(t,e){let i=!1;for(let s=0,o=e.length-1;s<e.length;o=s++){const[r,n]=e[s],[a,c]=e[o];n>t.y!=c>t.y&&t.x<(a-r)*(t.y-n)/(c-n)+r&&(i=!i)}return i}function Ft(t,e,i){const s=t.x-e,o=t.y-i;return s*s+o*o}const Tt={brown:{fill:"#bcaaa4",stroke:"#6d4c41",detail:"#8d6e63",line:"#4e342e"},white:{fill:"#fafafa",stroke:"#9e9e9e",detail:"#e0e0e0",line:"#757575"}};function Ot(t){return Tt[t??"brown"]??Tt.brown}const Nt=[{type:"bed",label:"Bed",icon:"mdi:bed",widthPct:.16,heightPct:.24},{type:"sofa",label:"Sofa",icon:"mdi:sofa",widthPct:.28,heightPct:.11},{type:"table",label:"Table",icon:"mdi:table-furniture",widthPct:.16,heightPct:.1},{type:"desk",label:"Desk",icon:"mdi:desk",widthPct:.16,heightPct:.08},{type:"chair",label:"Chair",icon:"mdi:chair-rolling",widthPct:.07,heightPct:.07},{type:"wardrobe",label:"Wardrobe",icon:"mdi:wardrobe",widthPct:.14,heightPct:.06},{type:"toilet",label:"Toilet",icon:"mdi:toilet",widthPct:.07,heightPct:.09},{type:"sink",label:"Sink",icon:"mdi:sink",widthPct:.07,heightPct:.055},{type:"bathtub",label:"Bathtub",icon:"mdi:bathtub",widthPct:.11,heightPct:.2},{type:"fridge",label:"Fridge",icon:"mdi:fridge-outline",widthPct:.065,heightPct:.065},{type:"washing_machine",label:"Washing Machine",icon:"mdi:washing-machine",widthPct:.065,heightPct:.065},{type:"tv",label:"TV",icon:"mdi:television",widthPct:.14,heightPct:.025},{type:"stairs",label:"Stairs",icon:"mdi:stairs",widthPct:.12,heightPct:.16},{type:"plant",label:"Plant",icon:"mdi:flower",widthPct:.04,heightPct:.04},{type:"custom",label:"Custom",icon:"mdi:shape-outline",widthPct:.09,heightPct:.09}];function Lt(t){return Nt.find(e=>e.type===t)??Nt[Nt.length-1]}function Ut(t){return(t%360+360)%360}function zt(t,e,i){const s=-e/2,o=-i/2,r=Math.min(e,i);switch(t){case"bed":{const t=.22*i;return W`
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
      `}case"plant":return W`<circle cx="0" cy="0" r=${r/2} class="furn-body furn-plant"></circle>`;default:return W`<rect x=${s} y=${o} width=${e} height=${i} rx=${.08*r} class="furn-body"></rect>`}}function Ht(t,e,i,s,o){return B`
    <ha-form
      .hass=${t}
      .data=${{value:i}}
      .schema=${[{name:"value",selector:{select:{mode:"dropdown",options:s}}}]}
      .computeLabel=${()=>e}
      @value-changed=${t=>{t.stopPropagation(),o(t.detail.value.value)}}
    ></ha-form>
  `}const jt={tapo:"TapoVac-ADV (Tapo RV30/RV50)",dreame:"Dreame Vacuum"};let Vt=class extends lt{constructor(){super(...arguments),this._calibrationPoints=[],this._calibrationSnap90=!0,this._furniture=[],this._furnitureAddType="bed",this._usedDetectedFurnitureIds=new Set}setConfig(t){this._config=t,this._furniture=t.furniture??[]}_fireConfigChanged(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_valueChanged(t,e){this._config[t]!==e&&this._fireConfigChanged({...this._config,[t]:e})}get _cameraId(){if(this._config?.vacuum)return this._config.camera??Ct(this.hass,this._config.vacuum).camera}get _roomGeometry(){const t=this._cameraId;if(!t)return;const e=this.hass.states[t]?.attributes?.room_geometry;return e&&e.rooms?.length?e:void 0}render(){return this.hass&&this._config?B`
      <div class="section">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.vacuum??""}
          .includeDomains=${["vacuum"]}
          label="Vacuum entity (required)"
          @value-changed=${t=>this._valueChanged("vacuum",t.detail.value)}
        ></ha-entity-picker>
      </div>

      ${this._config.vacuum?this._renderBrand():q}
      ${this._config.vacuum?this._renderToggles():q}
      ${this._config.vacuum&&(this._config.show_map??!0)?this._renderRotation():q}
      ${this._config.vacuum?this._renderAdvancedEntities():q}
      ${this._config.vacuum&&"tapo"===this._brand&&(this._config.show_map??!0)?this._renderCalibration():q}
      ${this._config.vacuum&&"tapo"===this._brand&&(this._config.show_map??!0)?this._renderFurniture():q}
    `:q}get _brand(){return this._config.vacuum_brand??wt(this.hass,this._config.vacuum)??"tapo"}_renderBrand(){const t=wt(this.hass,this._config.vacuum),e=t?`Auto (detected: ${jt[t]})`:"Auto (auto-detect failed)";return B`
      <div class="section">
        ${Ht(this.hass,"Vacuum brand",this._config.vacuum_brand??"",[{value:"",label:e},{value:"tapo",label:jt.tapo},{value:"dreame",label:jt.dreame}],t=>this._valueChanged("vacuum_brand",t||void 0))}
        <div class="hint">
          Controls which service is called to clean selected rooms, and how dock-action buttons
          are recognized by name. Only override this if auto-detection above picked the wrong
          integration.
        </div>
      </div>
    `}_renderToggles(){return B`
      <div class="section toggles">
        ${[["show_map","Show map"],["show_remote_drive","Show Tapo remote drive controls"],["show_last_clean_map","Allow switching to the last clean map"],["show_schedules","Show Tapo schedule controls"],["show_room_names","Show room names when selecting"],["show_controls","Show start/pause/stop/dock controls"],["show_dock_actions","Show dock action buttons (empty bin / wash / dry / hair)"],["show_fan_speed","Show fan speed selector"],["show_water_level","Show water level selector"],["show_battery","Show battery"],["show_mop_status","Show mop attached status"],["show_sensors","Show sensors"],["show_last_updated","Show last updated time"],["show_furniture","Show furniture on map"]].map(([t,e])=>B`
            <ha-formfield .label=${e}>
              <ha-switch
                .checked=${this._config[t]??!0}
                @change=${e=>this._valueChanged(t,e.target.checked)}
              ></ha-switch>
            </ha-formfield>
          `)}
      </div>
    `}_renderRotation(){return B`
      <div class="section map-layout">
        <ha-textfield
          label="Map rotation (degrees)"
          type="number"
          .value=${String(this._config.map_rotation??0)}
          @change=${t=>this._valueChanged("map_rotation",Number(t.target.value)||0)}
        ></ha-textfield>
        ${Ht(this.hass,"Map position",this._config.map_position??"top",[{value:"top",label:"Top (after controls)"},{value:"bottom",label:"Bottom (after battery/sensors)"}],t=>this._valueChanged("map_position",t))}
        <ha-formfield label="Show cleaning trace (experimental)">
          <ha-switch
            .checked=${this._config.show_trace??!1}
            @change=${t=>this._valueChanged("show_trace",t.target.checked)}
          ></ha-switch>
        </ha-formfield>
        <div class="hint">
          Draws a trail behind the vacuum while it's actively cleaning, resetting at the start of
          each new run. Experimental: it only samples as often as the map image itself refreshes
          (currently every 60s while cleaning), so the trail is a coarse approximation of the
          actual path, not a precise one.
        </div>
      </div>
    `}_renderAdvancedEntities(){return B`
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
          .value=${this._config.last_clean_image??""}
          .includeDomains=${["image"]}
          label="Last clean map image (auto-detected otherwise)"
          @value-changed=${t=>this._valueChanged("last_clean_image",t.detail.value||void 0)}
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
    `}_renderCalibration(){const t=this._roomGeometry,e=this._cameraId,i=e?kt(this.hass,e):void 0;return B`
      <div class="section">
        <div class="section-title">Room calibration</div>
        <div class="hint">
          Rooms already work out of the box using an automatically-detected rectangle. Use this
          only if a room's shape is irregular and the automatic click area feels wrong: pick a
          room, click points on the map below to trace its actual outline (points connect live),
          then finish to save it.
        </div>
        ${t&&i?B`
              ${Ht(this.hass,"Room to calibrate",void 0!==this._calibrationRoomId?String(this._calibrationRoomId):"",t.rooms.map(t=>({value:String(t.id),label:t.name})),t=>{const e=Number(t),i=Number.isNaN(e)?void 0:e;i!==this._calibrationRoomId&&(this._calibrationRoomId=i,this._calibrationPoints=[])})}

              ${void 0!==this._calibrationRoomId?B`
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
                  `:q}
            `:B`<div class="hint">Map not available yet — open a dashboard with this vacuum first.</div>`}
      </div>
    `}_renderCalibrationOverlay(t){const e=this._calibrationRoomId,i=t.rooms.find(t=>t.id===e),s=void 0!==e?Pt(this._config.room_polygons,t)[String(e)]:void 0,o=s&&s.length>=3?W`<polygon
            points=${s.map(([t,e])=>`${t},${e}`).join(" ")}
            fill="rgba(3,169,244,0.25)"
            stroke="rgb(3,169,244)"
            stroke-width="3"
          ></polygon>`:q,r=i?W`<rect
          x=${i.bbox[0]}
          y=${i.bbox[1]}
          width=${i.bbox[2]-i.bbox[0]}
          height=${i.bbox[3]-i.bbox[1]}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          stroke-dasharray="6,4"
          stroke-width="2"
        ></rect>`:q,n=this._calibrationPoints.length>0?W`
            <polyline
              points=${this._calibrationPoints.map(([t,e])=>`${t},${e}`).join(" ")}
              fill="none"
              stroke="rgb(255,152,0)"
              stroke-width="3"
            ></polyline>
            ${this._calibrationPoints.map(([t,e])=>W`<circle cx=${t} cy=${e} r="5" fill="rgb(255,152,0)"></circle>`)}
          `:q;return W`${r}${o}${n}`}_onCalibrationClick(t){const e=t.currentTarget,i=Et(t.clientX,t.clientY,e,0);let s=Math.round(i.x),o=Math.round(i.y);if(this._calibrationSnap90&&this._calibrationPoints.length>0){const[t,e]=this._calibrationPoints[this._calibrationPoints.length-1];Math.abs(s-t)>Math.abs(o-e)?o=e:s=t}this._calibrationPoints=[...this._calibrationPoints,[s,o]]}_finishCalibration(){const t=this._roomGeometry;if(void 0===this._calibrationRoomId||this._calibrationPoints.length<3||!t)return;const e={...this._config.room_polygons??{}};e[`${Rt(t)}:${this._calibrationRoomId}`]=this._calibrationPoints,this._calibrationPoints=[],this._valueChanged("room_polygons",e)}_deleteCalibration(){const t=this._roomGeometry;if(void 0===this._calibrationRoomId||!this._config.room_polygons||!t)return;const e={...this._config.room_polygons};delete e[`${Rt(t)}:${this._calibrationRoomId}`],delete e[String(this._calibrationRoomId)],this._calibrationPoints=[],this._valueChanged("room_polygons",e)}_visibleFurniture(t){if(!t)return this._furniture;const e=Rt(t);return this._furniture.filter(t=>!t.map||t.map===e)}_renderFurniture(){const t=this._roomGeometry,e=this._cameraId,i=e?kt(this.hass,e):void 0,s=this._visibleFurniture(t),o=s.find(t=>t.id===this._selectedFurnitureId);return B`
      <div class="section">
        <div class="section-title">Furniture</div>
        <div class="hint">
          Pick a type, click "Add", then drag its body to move it, the top handle to rotate, and
          the corner handle to resize. ${t?.furniture?.length?"The vacuum detected furniture outlines on this map (dashed, below) — click one to place a piece there instead of dragging it into position by hand; you still pick its type since the device doesn't say what it is.":"Furniture placed in the official Tapo app itself isn't readable here yet — this vacuum hasn't reported any detected outlines on this map (see the TapoVac-ADV README's Furniture section)."}
        </div>
        <div class="furniture-add-row">
          ${Ht(this.hass,"Furniture type",this._furnitureAddType,Nt.map(t=>({value:t.type,label:t.label})),t=>this._furnitureAddType=t)}
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
        ${Ht(this.hass,"Furniture color",this._config.furniture_color??"brown",[{value:"brown",label:"Brown (wood-toned)"},{value:"white",label:"White (light gray)"}],t=>this._valueChanged("furniture_color",t))}

        ${t&&i?B`
              <div class="map-wrap">
                <img class="furniture-image" src=${i} />
                ${this._renderFurnitureOverlay(t,s)}
              </div>
            `:B`<div class="hint">Map not available yet — open a dashboard with this vacuum first.</div>`}
        ${o?this._renderFurnitureToolbar(o):q}
        ${s.length>0?this._renderFurnitureList(s):q}
      </div>
    `}_renderFurnitureOverlay(t,e){const i=Ot(this._config.furniture_color),s=`--furn-fill:${i.fill};--furn-stroke:${i.stroke};--furn-detail:${i.detail};--furn-line:${i.line};`;return B`
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
        <g class="detected-furniture-layer">
          ${(t.furniture??[]).filter(e=>!this._usedDetectedFurnitureIds.has(`${Rt(t)}:${e.id}`)).map(t=>this._renderDetectedFurnitureOutline(t))}
        </g>
        <g class="furniture-layer" style=${s}>
          ${e.map(t=>this._renderEditableFurnitureItem(t))}
        </g>
      </svg>
    `}_renderDetectedFurnitureOutline(t){const[e,i,s,o]=t.bbox;return W`
      <g
        class="detected-furniture-outline"
        @pointerdown=${e=>{e.stopPropagation(),this._addDetectedFurniture(t)}}
      >
        <rect
          x=${e}
          y=${i}
          width=${s-e}
          height=${o-i}
          transform="rotate(${t.angle} ${(e+s)/2} ${(i+o)/2})"
        ></rect>
      </g>
    `}_renderEditableFurnitureItem(t){const e=this._selectedFurnitureId===t.id,i=Math.max(8,.12*Math.min(t.width,t.height));return W`
      <g
        class="furniture-item ${e?"selected":""}"
        transform="translate(${t.x} ${t.y}) rotate(${t.rotation})"
        @pointerdown=${e=>this._startFurnitureDrag(e,t.id,"move")}
      >
        ${zt(t.type,t.width,t.height)}
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
            `:q}
      </g>
    `}_renderFurnitureToolbar(t){return B`
      <div class="furniture-toolbar">
        <ha-icon icon=${Lt(t.type).icon}></ha-icon>
        <span>${Lt(t.type).label}</span>
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
    `}_renderFurnitureList(t){return B`
      <div class="furniture-list">
        ${t.map(t=>{const e=Lt(t.type);return B`
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
    `}_addFurniture(){const t=this._roomGeometry;if(!t)return;const e=function(t,e,i){const s=Lt(t),o=Math.min(e.image_width,e.image_height),r=Math.max(12,Math.round(s.widthPct*o)),n=Math.max(12,Math.round(s.heightPct*o)),a=i.length%6*o*.03;return{id:`furn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,type:t,x:Math.round(e.image_width/2+a),y:Math.round(e.image_height/2+a),width:r,height:n,rotation:0,map:Rt(e)}}(this._furnitureAddType,t,this._furniture);this._furniture=[...this._furniture,e],this._selectedFurnitureId=e.id,this._commitFurniture()}_addDetectedFurniture(t){const e=this._roomGeometry;if(!e)return;const i=function(t,e,i){const[s,o,r,n]=e.bbox;return{id:`furn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,type:t,x:Math.round((s+r)/2),y:Math.round((o+n)/2),width:Math.max(12,Math.round(r-s)),height:Math.max(12,Math.round(n-o)),rotation:Ut(e.angle),map:Rt(i)}}(this._furnitureAddType,t,e);this._furniture=[...this._furniture,i],this._selectedFurnitureId=i.id,this._usedDetectedFurnitureIds=new Set(this._usedDetectedFurnitureIds).add(`${Rt(e)}:${t.id}`),this._commitFurniture()}_removeFurniture(t){this._furniture=this._furniture.filter(e=>e.id!==t),this._selectedFurnitureId===t&&(this._selectedFurnitureId=void 0),this._commitFurniture()}_rotateFurniture(t,e){this._furniture=this._furniture.map(i=>i.id===t?{...i,rotation:Ut(i.rotation+e)}:i),this._commitFurniture()}_setFurnitureField(t,e,i){const s=Number(i);if(Number.isNaN(s))return;const o="width"===e||"height"===e?Math.max(12,Math.round(s)):Math.round(s);this._furniture=this._furniture.map(i=>i.id===t?{...i,[e]:o}:i),this._commitFurniture()}_commitFurniture(){this._valueChanged("furniture",this._furniture)}_startFurnitureDrag(t,e,i){t.stopPropagation(),t.preventDefault();const s=this._furnitureImg,o=this._furniture.find(t=>t.id===e);if(!s||!o)return;this._selectedFurnitureId=e;const r=t.currentTarget;r.setPointerCapture(t.pointerId);const n=Et(t.clientX,t.clientY,s,0),a=t=>{const r=Et(t.clientX,t.clientY,s,0);this._applyFurnitureDrag(e,i,o,n,r)},c=()=>{r.removeEventListener("pointermove",a),r.removeEventListener("pointerup",c),r.removeEventListener("pointercancel",c),this._commitFurniture()};r.addEventListener("pointermove",a),r.addEventListener("pointerup",c),r.addEventListener("pointercancel",c)}_applyFurnitureDrag(t,e,i,s,o){this._furniture=this._furniture.map(r=>{if(r.id!==t)return r;if("move"===e)return{...r,x:i.x+(o.x-s.x),y:i.y+(o.y-s.y)};if("rotate"===e){const t=180*Math.atan2(o.y-i.y,o.x-i.x)/Math.PI+90;return{...r,rotation:Math.round(Ut(t))}}const n=-i.rotation*Math.PI/180,a=o.x-i.x,c=o.y-i.y,l=a*Math.cos(n)-c*Math.sin(n),h=a*Math.sin(n)+c*Math.cos(n);return{...r,width:Math.max(12,Math.round(2*Math.abs(l))),height:Math.max(12,Math.round(2*Math.abs(h)))}})}};Vt.styles=n`
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
    .detected-furniture-outline {
      cursor: pointer;
    }
    .detected-furniture-outline rect {
      fill: rgba(var(--rgb-primary-color, 3, 169, 244), 0.08);
      stroke: var(--primary-color);
      stroke-width: 1.5;
      stroke-dasharray: 5 4;
    }
    .detected-furniture-outline:hover rect {
      fill: rgba(var(--rgb-primary-color, 3, 169, 244), 0.22);
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
  `,t([mt({attribute:!1})],Vt.prototype,"hass",void 0),t([_t()],Vt.prototype,"_config",void 0),t([_t()],Vt.prototype,"_calibrationRoomId",void 0),t([_t()],Vt.prototype,"_calibrationPoints",void 0),t([_t()],Vt.prototype,"_calibrationSnap90",void 0),t([_t()],Vt.prototype,"_furniture",void 0),t([_t()],Vt.prototype,"_selectedFurnitureId",void 0),t([_t()],Vt.prototype,"_furnitureAddType",void 0),t([ft("img.furniture-image")],Vt.prototype,"_furnitureImg",void 0),t([_t()],Vt.prototype,"_usedDetectedFurnitureIds",void 0),Vt=t([dt("vacuum-card-adv-editor")],Vt),console.info("%c VACUUM-CARD-ADV %c v2.4.1 ","color: #0b0f14; background: #34e0d6; font-weight: 700;","color: #34e0d6; background: #0b0f14; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"vacuum-card-adv",name:"TapoVac ADV Vacuum Card",description:"A card for the TapoVac-ADV integration (Tapo RV30/RV50 series).",preview:!0});let Bt=class extends lt{constructor(){super(...arguments),this._discovered={dockActions:[],sensors:[],maintenanceSensors:[]},this._selectedRoomIds=new Set,this._selectedDreameSegmentIds=new Set,this._maintenanceOpen=!1,this._schedulesOpen=!1,this._busy=!1,this._trace=[],this._remoteDriving=!1,this._showLastCleanMap=!1,this._mapMode="rooms",this._newScheduleTime="08:00",this._newScheduleDays=new Set(["Mon","Tue","Wed","Thu","Fri","Sat","Sun"])}static getConfigElement(){return document.createElement("vacuum-card-adv-editor")}static getStubConfig(t){return{type:"custom:vacuum-card-adv",vacuum:Object.keys(t.states).find(t=>t.startsWith("vacuum."))??"",show_map:!0,show_remote_drive:!0,show_last_clean_map:!0,show_schedules:!0,show_controls:!0,show_dock_actions:!0,show_fan_speed:!0,show_water_level:!0,show_battery:!0,show_sensors:!0,show_mop_status:!0,show_room_names:!0,show_last_updated:!0,show_furniture:!0,furniture_opacity:100,furniture_color:"brown"}}setConfig(t){if(!t.vacuum)throw new Error("vacuum entity is required");this._config={show_map:!0,show_remote_drive:!0,show_last_clean_map:!0,show_schedules:!0,show_controls:!0,show_dock_actions:!0,show_fan_speed:!0,show_water_level:!0,show_battery:!0,show_sensors:!0,show_mop_status:!0,show_room_names:!0,show_last_updated:!0,show_furniture:!0,furniture_opacity:100,furniture_color:"brown",map_rotation:0,...t},this._maintenanceOpen=!1===t.maintenance_collapsed_default}getCardSize(){let t=2;return(this._config?.show_map??!0)&&(t+=6),(this._config?.show_sensors??!0)&&(t+=2),t}willUpdate(t){if(t.has("hass")&&this.hass&&this._config?.vacuum){const t=this._brand,e=`${this._config.vacuum}|${t}`;this._lastDiscoveredFor!==e&&(this._discovered=Ct(this.hass,this._config.vacuum,t),this._lastDiscoveredFor=e);const i=this.hass.states[this._config.vacuum]?.attributes?.selected_map,s=`${this._config.vacuum}|${i??""}`;void 0!==this._lastDreameSelectedMapFor&&this._lastDreameSelectedMapFor!==s&&(this._selectedDreameSegmentIds=new Set),this._lastDreameSelectedMapFor=s;const o=this._roomGeometry;if(o){const t=`${this._config.vacuum}|${Rt(o)}`;void 0!==this._lastRoomMapKeyFor&&this._lastRoomMapKeyFor!==t&&(this._selectedRoomIds=new Set),this._lastRoomMapKeyFor=t}this._updateTrace()}}get _brand(){return this._config.vacuum_brand??wt(this.hass,this._config.vacuum)??"tapo"}get _mapRotation(){const t=this._config.map_rotation;return"number"==typeof t&&Number.isFinite(t)?t:0}_updateTrace(){const t=this.hass.states[this._config.vacuum]?.state,e=t=>void 0!==t&&yt.includes(t),i=e(t);if(t!==this._lastVacuumStateForTrace&&(i&&!e(this._lastVacuumStateForTrace)&&(this._trace=[]),this._lastVacuumStateForTrace=t),!this._config.show_trace||!i)return;const s=this._roomGeometry?.vacuum_point;if(!s)return;const o=this._trace[this._trace.length-1];if(o&&o[0]===s[0]&&o[1]===s[1])return;const r=[...this._trace,s];this._trace=r.length>400?r.slice(r.length-400):r}get _roomGeometry(){const t=this._config.camera??this._discovered.camera;if(!t)return;const e=this.hass.states[t],i=e?.attributes?.room_geometry;if(i&&!Array.isArray(i)&&i.rooms)return i;if(!Array.isArray(i)||0===i.length)return;const s=e?.attributes?.map_geometry,[o,r]=s?.image_size??[0,0];if(!o||!r||!s)return;const n=i.map(t=>{const e=t,[i,s,o,r]=e.bbox;return{id:e.id,name:e.name,color:e.color??[74,144,226],cx:e.cx??e.centre?.[0]??(i+o)/2,cy:e.cy??e.centre?.[1]??(s+r)/2,bbox:e.bbox,last_cleaned:e.last_cleaned,coverage:e.coverage}}),a=(s.furniture??[]).map(t=>{const e=t.px.map(([t])=>t),i=t.px.map(([,t])=>t);return{id:t.id,type:t.type,angle:t.angle,points:t.px,bbox:[Math.min(...e),Math.min(...i),Math.max(...e),Math.max(...i)]}});return{image_width:o,image_height:r,rooms:n,charge_point:s.dock_px??null,vacuum_point:null,map_id:s.map_id??void 0,map_name:s.map_name,furniture:a}}_shortTitle(t){const e=this.hass.states[this._config.vacuum],i=e?.attributes.friendly_name;return i&&t.startsWith(`${i} `)?t.slice(i.length+1):t}_lastUpdated(){const t=[this._config.vacuum,this._config.battery_entity??this._discovered.battery,this._config.mop_attached_entity??this._discovered.mopAttached,this._config.camera??this._discovered.camera,this._config.water_level_entity??this._discovered.waterLevel,...this._config.sensors??this._discovered.sensors].filter(t=>!!t);let e;for(const i of t){const t=this.hass.states[i]?.last_changed;if(!t)continue;const s=new Date(t);(!e||s>e)&&(e=s)}return e}_relativeTime(t){const e=Math.round((Date.now()-t.getTime())/1e3);if(e<5)return"just now";if(e<60)return`${e}s ago`;const i=Math.round(e/60);if(i<60)return`${i}m ago`;const s=Math.round(i/60);if(s<24)return`${s}h ago`;return`${Math.round(s/24)}d ago`}render(){if(!this._config||!this.hass)return q;const t=this.hass.states[this._config.vacuum];if(!t)return B`<ha-card><div class="warning">Entity not found: ${this._config.vacuum}</div></ha-card>`;const e=this._config.name??t.attributes.friendly_name??"Vacuum",i=this.hass.formatEntityState?.(t)??t.state,s="bottom"===this._config.map_position?"bottom":"top",o=this._config.show_last_updated??!0?this._lastUpdated():void 0;return B`
      <ha-card>
        <div class="header" @click=${()=>this._fireMoreInfo(this._config.vacuum)}>
          <ha-icon class="header-icon" icon="mdi:robot-vacuum"></ha-icon>
          <div class="header-text">
            <div class="name">${e}</div>
            <div class="status">${i}</div>
            ${o?B`<div class="last-updated">Updated ${this._relativeTime(o)}</div>`:q}
          </div>
        </div>
        ${this._config.show_controls??!0?this._renderControls(t):q}
        ${this._renderRemoteDrive(t)}
        ${"tapo"===this._brand&&!1!==this._config.show_schedules?this._renderSchedules():q}
        ${"top"===s&&(this._config.show_map??!0)?this._renderMap():q}
        ${this._config.show_dock_actions??!0?this._renderDockActions():q}
        ${this._renderSelects()}
        ${this._config.show_battery??!0?this._renderBattery():q}
        ${this._config.show_mop_status??!0?this._renderMopStatus():q}
        ${this._config.show_sensors??!0?this._renderSensors():q}
        ${"bottom"===s&&(this._config.show_map??!0)?this._renderMap():q}
        ${this._renderMaintenance()}
      </ha-card>
    `}_renderControls(t){const e="cleaning"===t.state,i=Number(t.attributes.supported_features),s=t=>Number.isNaN(i)||0!==(i&t),o=s(4)?"pause":"stop";return B`
      <div class="section controls">
        <button class="pill" @click=${()=>this._callVacuumService(e?o:"start")}>
          <ha-icon icon=${e?"mdi:pause":"mdi:play"}></ha-icon>
          <span>${e?"Pause":"Start"}</span>
        </button>
        ${s(8)?B`<button class="pill" @click=${()=>this._callVacuumService("stop")}>
              <ha-icon icon="mdi:stop"></ha-icon>
              <span>Stop</span>
            </button>`:q}
        ${s(1024)?B`<button class="pill" @click=${()=>this._callVacuumService("clean_spot")}>
              <ha-icon icon="mdi:target-variant"></ha-icon>
              <span>Spot</span>
            </button>`:q}
        ${s(16)?B`<button class="pill accent" @click=${()=>this._callVacuumService("return_to_base")}>
              <ha-icon icon="mdi:home-import-outline"></ha-icon>
              <span>Dock</span>
            </button>`:q}
      </div>
    `}_renderRemoteDrive(t){if("tapo"!==this._brand||!1===this._config.show_remote_drive||!0!==t.attributes.remote_control)return q;const e=async t=>{try{await this.hass.callService("tapo_rv30","remote_drive",{entity_id:this._config.vacuum,command:t}),this._remoteDriving="enter"===t||"exit"!==t&&this._remoteDriving}catch(t){this._notifyServiceError("remote drive",t)}};return B`
      <div class="section remote-drive">
        <div class="section-title">Remote drive</div>
        ${this._remoteDriving?B`<div class="drive-pad">
              <button class="pill drive-up" aria-label="Forward" @click=${()=>e("forward")}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button class="pill drive-left" aria-label="Turn left" @click=${()=>e("left")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
              <button class="pill drive-stop" aria-label="Stop" @click=${()=>e("stop")}><ha-icon icon="mdi:stop"></ha-icon></button>
              <button class="pill drive-right" aria-label="Turn right" @click=${()=>e("right")}><ha-icon icon="mdi:arrow-right"></ha-icon></button>
              <button class="pill drive-down" aria-label="Backward" @click=${()=>e("backward")}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
            </div>
            <button class="pill" @click=${()=>e("exit")}><ha-icon icon="mdi:close"></ha-icon><span>Release control</span></button>`:B`<button class="pill" @click=${()=>e("enter")}>
              <ha-icon icon="mdi:steering"></ha-icon><span>Take control</span>
            </button>`}
      </div>
    `}_renderSchedules(){const t=this._discovered.schedules,e=t?this.hass.states[t]:void 0;if(!e)return q;const i=e.attributes.schedules??[],s=e.attributes.dnd;return B`
      <div class="section schedule-section">
        <button class="maintenance-toggle schedule-toggle" aria-expanded=${this._schedulesOpen?"true":"false"}
          @click=${()=>this._schedulesOpen=!this._schedulesOpen}>
          <ha-icon icon="mdi:calendar-clock"></ha-icon>
          <span>Schedules${i.length?` · ${i.length}`:""}</span>
          ${s?.enabled?B`<span class="schedule-dnd">DND</span>`:q}
          <ha-icon icon=${this._schedulesOpen?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </button>
        ${this._schedulesOpen?B`<div class="schedule-content">
          ${s?.enabled?B`<div class="map-hint">Do Not Disturb: ${s.start}–${s.end}. Schedules during this window are blocked.</div>`:q}
          ${i.map(t=>B`
            <div class="schedule-row">
              <div class="schedule-info">
                <strong>${t.time}</strong>
                <span>${(t.days??[]).join(", ")||"No repeat days"}${t.rooms?.length?` · ${t.rooms.join(", ")}`:""}</span>
                ${t.blocked_by_dnd?B`<span class="schedule-warning">Blocked by Do Not Disturb</span>`:q}
              </div>
              <button class="pill small" title="Edit time and repeat days" @click=${()=>{this._editingScheduleId=t.id,this._newScheduleTime=t.time,this._newScheduleDays=new Set(t.days??[])}}><ha-icon icon="mdi:pencil"></ha-icon></button>
              <button class="pill small" title="Run now" @click=${()=>this._scheduleAction("run_schedule",{schedule_id:t.id})}><ha-icon icon="mdi:play"></ha-icon></button>
              <button class="pill small" title=${t.enabled?"Disable":"Enable"} @click=${()=>this._scheduleAction("set_schedule",{schedule_id:t.id,enabled:!t.enabled})}><ha-icon icon=${t.enabled?"mdi:toggle-switch":"mdi:toggle-switch-off-outline"}></ha-icon></button>
              <button class="pill small" title="Remove schedule" @click=${()=>this._scheduleAction("remove_schedule",{schedule_id:t.id})}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
            </div>
          `)}
          <div class="schedule-add">
            <input aria-label="Schedule time" type="time" .value=${this._newScheduleTime}
              @change=${t=>{this._newScheduleTime=t.target.value}} />
            <div class="schedule-days">
              ${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(t=>B`<button class="chip ${this._newScheduleDays.has(t)?"selected":""}"
                aria-pressed=${this._newScheduleDays.has(t)?"true":"false"}
                @click=${()=>{const e=new Set(this._newScheduleDays);e.has(t)?e.delete(t):e.add(t),this._newScheduleDays=e}}>${t}</button>`)}
            </div>
            <button class="pill accent small" ?disabled=${0===this._newScheduleDays.size} @click=${this._saveSchedule}>
              <ha-icon icon=${void 0===this._editingScheduleId?"mdi:calendar-plus":"mdi:content-save"}></ha-icon>
              <span>${void 0===this._editingScheduleId?"Add schedule":"Save schedule"}</span>
            </button>
            ${void 0!==this._editingScheduleId?B`<button class="pill small" @click=${()=>{this._editingScheduleId=void 0}}><span>Cancel edit</span></button>`:q}
          </div>
        </div>`:q}
      </div>
    `}async _scheduleAction(t,e){try{await this.hass.callService("tapo_rv30",t,{entity_id:this._config.vacuum,...e})}catch(t){this._notifyServiceError("schedule",t)}}async _saveSchedule(){try{void 0!==this._editingScheduleId?(await this.hass.callService("tapo_rv30","set_schedule",{entity_id:this._config.vacuum,schedule_id:this._editingScheduleId,time:this._newScheduleTime,days:[...this._newScheduleDays]}),this._editingScheduleId=void 0):await this.hass.callService("tapo_rv30","add_schedule",{entity_id:this._config.vacuum,time:this._newScheduleTime,days:[...this._newScheduleDays],enabled:!0})}catch(t){this._notifyServiceError("add schedule",t)}}get _dreameRooms(){return"dreame"!==this._brand?[]:function(t,e){const i=t.states[e]?.attributes,s=i?.rooms;if(!s||"object"!=typeof s)return[];const o=i?.selected_map;return o&&s[o]?s[o]:Object.values(s)[0]??[]}(this.hass,this._config.vacuum)}_renderMap(){const t=this._config.camera??this._discovered.camera,e=this._config.last_clean_image??this._discovered.lastClean,i="tapo"===this._brand&&!1!==this._config.show_last_clean_map&&!!e,s=this._showLastCleanMap&&i?kt(this.hass,e):t?kt(this.hass,t):void 0,o=this._dreameRooms;if(!s&&0===o.length)return q;const r=this._mapRotation,n=this._showLastCleanMap?void 0:this._roomGeometry,a=this.hass.states[this._config.vacuum],c=t?this.hass.states[t]?.attributes?.map_geometry:void 0,l=r%360!=0?`transform: rotate(${r}deg);`:"";return B`
      <div class="section map-section">
        ${i||!0===a?.attributes.goto_point?B`<div class="map-tools">
              ${i?B`<button class="pill small" @click=${()=>{this._showLastCleanMap=!this._showLastCleanMap}}>
                <ha-icon icon=${this._showLastCleanMap?"mdi:map-clock":"mdi:history"}></ha-icon>
                <span>${this._showLastCleanMap?"Live map":"Last clean"}</span>
              </button>`:q}
              ${!this._showLastCleanMap&&!0===a?.attributes.goto_point&&c?B`<button class="pill small" aria-pressed=${"goto"===this._mapMode?"true":"false"}
                    @click=${()=>{this._mapMode="goto"===this._mapMode?"rooms":"goto"}}>
                    <ha-icon icon="mdi:map-marker"></ha-icon><span>${"goto"===this._mapMode?"Cancel go to":"Go to point"}</span>
                  </button>`:q}
            </div>`:q}
        ${s?B`<div class="map-wrap">
              <img class="map-image" src=${s} style=${l} @click=${t=>this._onMapClick(t,c)} />
              ${n?this._renderMapOverlay(n,l):q}
            </div>`:q}
        ${!n&&s?B`<div class="map-hint">
              ${"dreame"===this._brand?B`The Dreame Vacuum integration doesn't expose per-room map coordinates, so
                    rooms can't be clicked on the map directly — pick them from the list below
                    instead.`:B`Room click-to-select needs TapoVac-ADV v2.6.0+ (the map camera's
                    <code>room_geometry</code> attribute) — update the integration via HACS,
                    restart Home Assistant, then hard-refresh this browser tab.`}
            </div>`:q}
        ${this._showLastCleanMap?B`<div class="map-hint">Map from the most recent completed cleaning run.</div>`:q}
        ${o.length>0&&!this._showLastCleanMap?this._renderDreameRoomChips(o):q}
        ${this._selectedRoomIds.size>0?this._renderSelectedRoomsBar(n):q}
        ${this._selectedDreameSegmentIds.size>0?this._renderSelectedDreameRoomsBar(o):q}
      </div>
    `}_renderDreameRoomChips(t){return B`
      <div class="dreame-rooms">
        ${t.map(t=>{const e=this._selectedDreameSegmentIds.has(t.id);return B`
            <button
              class="chip ${e?"selected":""}"
              aria-pressed=${e?"true":"false"}
              @click=${()=>this._toggleDreameRoom(t.id)}
            >
              ${t.icon?B`<ha-icon icon=${t.icon}></ha-icon>`:q}
              <span>${t.name}</span>
            </button>
          `})}
      </div>
    `}_toggleDreameRoom(t){const e=new Set(this._selectedDreameSegmentIds);e.has(t)?e.delete(t):e.add(t),this._selectedDreameSegmentIds=e}_renderSelectedDreameRoomsBar(t){const e=[...this._selectedDreameSegmentIds].map(e=>t.find(t=>t.id===e)?.name).filter(t=>!!t);return B`
      <div class="selected-rooms-bar">
        <span>${this._config.show_room_names??!0?e.join(", "):`${e.length} room(s)`}</span>
        <button class="pill accent small" @click=${this._cleanSelectedDreameRooms} ?disabled=${this._busy}>
          <ha-icon icon="mdi:broom"></ha-icon><span>Clean</span>
        </button>
        <button class="pill small" @click=${()=>this._selectedDreameSegmentIds=new Set}>
          <ha-icon icon="mdi:close"></ha-icon><span>Clear</span>
        </button>
      </div>
    `}async _cleanSelectedDreameRooms(){if(0!==this._selectedDreameSegmentIds.size){this._busy=!0;try{await this.hass.callService("dreame_vacuum","vacuum_clean_segment",{entity_id:this._config.vacuum,segments:[...this._selectedDreameSegmentIds]}),this._selectedDreameSegmentIds=new Set}catch(t){this._notifyServiceError("clean selected rooms",t)}finally{this._busy=!1}}}_renderMapOverlay(t,e){const i=Pt(this._config.room_polygons,t);return B`
      <svg
        class="map-overlay"
        style=${e}
        viewBox="0 0 ${t.image_width} ${t.image_height}"
        preserveAspectRatio="none"
      >
        ${t.rooms.map(t=>this._renderRoomOverlay(t,i))}
        ${t.rooms.filter(t=>this._selectedRoomIds.has(t.id)).map(t=>this._renderRoomOrderBadge(t))}
        ${this._config.show_trace?this._renderTrace():q}
        ${this._config.show_furniture??!0?this._renderFurniture(t):q}
      </svg>
    `}_renderTrace(){if(this._trace.length<2)return q;const t=this._trace.map(([t,e])=>`${t},${e}`).join(" ");return W`
      <polyline
        points=${t}
        fill="none"
        class="vacuum-trace"
      ></polyline>
    `}_renderRoomOverlay(t,e){const i=this._selectedRoomIds.has(t.id),s=e[String(t.id)],[o,r,n]=t.color,a=i?`rgba(${o},${r},${n},0.55)`:`rgba(${o},${r},${n},0.12)`,c=i?`rgb(${o},${r},${n})`:`rgba(${o},${r},${n},0.4)`,l=i?4:1.5,h=i?"room-shape selected":"room-shape",d=t.last_cleaned?`Last cleaned ${new Date(1e3*t.last_cleaned).toLocaleString()}${null==t.coverage?"":` · ${Math.round(t.coverage)}% covered`}`:"No recorded clean for this room";if(s&&s.length>=3){const e=s.map(([t,e])=>`${t},${e}`).join(" ");return W`<polygon
        points=${e}
        fill=${a}
        stroke=${c}
        stroke-width=${l}
        class=${h}
      ><title>${t.name}: ${d}</title></polygon>`}const[u,p,m,_]=t.bbox;return W`<rect
      x=${u}
      y=${p}
      width=${m-u}
      height=${_-p}
      fill=${a}
      stroke=${c}
      stroke-width=${l}
      class=${h}
    ><title>${t.name}: ${d}</title></rect>`}_renderRoomOrderBadge(t){const e=[...this._selectedRoomIds].indexOf(t.id);return W`
      <g class="room-order-badge">
        <circle cx=${t.cx} cy=${t.cy} r="15" class="badge-circle"></circle>
        <text x=${t.cx} y=${t.cy} dy="0.35em" text-anchor="middle" class="badge-text">${e+1}</text>
      </g>
    `}_renderFurniture(t){const e=this._config.furniture;if(!e||0===e.length)return q;const i=Rt(t),s=e.filter(t=>!t.map||t.map===i);if(0===s.length)return q;const o=Math.max(0,Math.min(100,this._config.furniture_opacity??100))/100,r=Ot(this._config.furniture_color),n=`--furn-fill:${r.fill};--furn-stroke:${r.stroke};--furn-detail:${r.detail};--furn-line:${r.line};`;return W`
      <g class="furniture-layer" opacity=${o} style=${n}>
        ${s.map(t=>W`
            <g transform="translate(${t.x} ${t.y}) rotate(${t.rotation})" class="furniture-item">
              ${zt(t.type,t.width,t.height)}
            </g>
          `)}
      </g>
    `}_renderSelectedRoomsBar(t){const e=[...this._selectedRoomIds].map((e,i)=>{const s=t?.rooms.find(t=>t.id===e)?.name;return s?`${i+1}. ${s}`:void 0}).filter(t=>!!t);return B`
      <div class="selected-rooms-bar">
        <span>${this._config.show_room_names??!0?e.join(", "):`${e.length} room(s)`}</span>
        <button class="pill accent small" @click=${this._cleanSelectedRooms} ?disabled=${this._busy}>
          <ha-icon icon="mdi:broom"></ha-icon><span>Clean</span>
        </button>
        <button class="pill small" @click=${()=>this._selectedRoomIds=new Set}>
          <ha-icon icon="mdi:close"></ha-icon><span>Clear</span>
        </button>
      </div>
    `}_onMapClick(t,e){if("goto"===this._mapMode){if(!e||!this._mapImg)return;const i=Et(t.clientX,t.clientY,this._mapImg,this._mapRotation),[,s]=e.grid_size,o=e.resolution_mm||50,[r,n]=e.real_origin_mm,a=Math.round(r+(i.x-e.scale_px_per_cell/2)/e.scale_px_per_cell*o),c=Math.round(n+(s-1-(i.y-e.scale_px_per_cell/2)/e.scale_px_per_cell)*o);return this.hass.callService("tapo_rv30","go_to",{entity_id:this._config.vacuum,x:a,y:c}).catch(t=>this._notifyServiceError("go to point",t)),void(this._mapMode="rooms")}if(this._showLastCleanMap)return;const i=this._roomGeometry;if(!i||!this._mapImg)return void console.debug("[vacuum-card-adv] map click ignored: room_geometry not available on the camera entity yet");const s=Et(t.clientX,t.clientY,this._mapImg,this._mapRotation),o=function(t,e,i){for(const s of e.rooms){const e=i?.[String(s.id)];if(e&&e.length>=3&&It(t,e))return s.id}for(const s of e.rooms)if(!i?.[String(s.id)]&&Dt(t,s.bbox))return s.id;if(0===e.rooms.length)return null;let s=e.rooms[0],o=Ft(t,s.cx,s.cy);for(const i of e.rooms.slice(1)){const e=Ft(t,i.cx,i.cy);e<o&&(s=i,o=e)}return o<=(.15*Math.max(e.image_width,e.image_height))**2?s.id:null}(s,i,Pt(this._config.room_polygons,i));if(null===o)return void console.debug("[vacuum-card-adv] map click did not land inside any known room",s);const r=new Set(this._selectedRoomIds);r.has(o)?r.delete(o):r.add(o),this._selectedRoomIds=r}async _cleanSelectedRooms(){const t=this._roomGeometry;if(!t||0===this._selectedRoomIds.size)return;const e=[...this._selectedRoomIds].map(e=>t.rooms.find(t=>t.id===e)?.name).filter(t=>!!t);if(0!==e.length){this._busy=!0;try{await this.hass.callService("tapo_rv30","clean_rooms",{entity_id:this._config.vacuum,rooms:e}),this._selectedRoomIds=new Set}catch(t){this._notifyServiceError("clean selected rooms",t)}finally{this._busy=!1}}}_renderDockActions(){return 0===this._discovered.dockActions.length?q:B`
      <div class="section dock-actions">
        ${this._discovered.dockActions.map(t=>B`
            <button class="pill" @click=${()=>this._pressButton(t.entityId)}>
              <ha-icon icon=${t.icon}></ha-icon>
              <span>${t.name}</span>
            </button>
          `)}
      </div>
    `}_renderSelects(){const t=this.hass.states[this._config.vacuum],e=this._config.show_fan_speed??!0,i=this._config.show_water_level??!0,s=t.attributes.fan_speed_list??[],o=t.attributes.fan_speed,r=this._config.water_level_entity??this._discovered.waterLevel,n=r?this.hass.states[r]:void 0;return e&&s.length>0||i&&n?B`
      <div class="section selects">
        ${e&&s.length>0?Ht(this.hass,"Fan speed",o??"",s.map(t=>({value:t,label:t})),t=>{t!==(o??"")&&this._setFanSpeed(t)}):q}
        ${i&&n?Ht(this.hass,"Water level",n.state,(n.attributes.options??[]).map(t=>({value:t,label:t})),t=>{t!==n.state&&this._selectOption(r,t)}):q}
      </div>
    `:q}_renderRow(t){const e=void 0!==t.percent&&!Number.isNaN(t.percent);return B`
      <div
        class="info-row ${t.overdue?"overdue":""} ${t.entityId?"clickable":""}"
        @click=${t.entityId?()=>this._fireMoreInfo(t.entityId):void 0}
      >
        <ha-icon icon=${t.icon}></ha-icon>
        <span class="info-label">${t.title}</span>
        ${e?B`<span
              class="info-bar"
              style="--pct:${Math.max(0,Math.min(100,t.percent))}%; --color:${t.gaugeColor??"var(--primary-color)"}"
            ></span>`:q}
        <span class="info-value">${t.value}</span>
      </div>
    `}_renderBattery(){const t=this._config.battery_entity??this._discovered.battery;if(!t)return q;const e=this.hass.states[t];if(!e)return q;const i=Number(e.state);return B`
      <div class="section sensors">
        ${this._renderRow({icon:this._batteryIcon(i),title:this._shortTitle(e.attributes.friendly_name??"Battery"),value:`${e.state}%`,percent:i,gaugeColor:this._batteryColor(i),entityId:t})}
      </div>
    `}_batteryIcon(t){if(Number.isNaN(t))return"mdi:battery-unknown";const e=10*Math.round(t/10);return e>=100?"mdi:battery":e<=0?"mdi:battery-outline":`mdi:battery-${e}`}_batteryColor(t){return Number.isNaN(t)?"var(--disabled-text-color)":t<=20?"var(--error-color)":t<=50?"var(--warning-color)":"var(--success-color)"}_renderMopStatus(){const t=this._config.mop_attached_entity??this._discovered.mopAttached;if(!t)return q;const e=this.hass.states[t];if(!e)return q;const i="unavailable"===e.state||"unknown"===e.state;return B`
      <div class="section sensors">
        ${this._renderRow({icon:e.attributes.icon??(i?"mdi:help-circle-outline":"on"===e.state?"mdi:water":"mdi:water-off"),title:this._shortTitle(e.attributes.friendly_name??"Mop Attached"),value:i?e.state.charAt(0).toUpperCase()+e.state.slice(1):"on"===e.state?"Attached":"Not attached",entityId:t})}
      </div>
    `}_renderSensors(){const t=this._config.sensors??this._discovered.sensors;return t&&0!==t.length?B`<div class="section sensors">${t.map(t=>this._renderSensorRow(t))}</div>`:q}_renderSensorRow(t){const e=this.hass.states[t];if(!e)return q;const i=this._shortTitle(e.attributes.friendly_name??e.entity_id);if("error"===i.toLowerCase()&&"ok"===e.state.toLowerCase())return q;const s=e.attributes.unit_of_measurement??"",o=e.attributes.icon??"mdi:information-outline",r="%"===s?Number(e.state):void 0;return this._renderRow({icon:o,title:i,value:`${e.state}${s}`,percent:void 0===r||Number.isNaN(r)?void 0:r,overdue:!!e.attributes.overdue,entityId:t})}_renderMaintenance(){const t=this._config.maintenance_sensors??this._discovered.maintenanceSensors;return t&&0!==t.length?B`
      <div class="section">
        <button class="maintenance-toggle" @click=${()=>this._maintenanceOpen=!this._maintenanceOpen}>
          <ha-icon icon="mdi:wrench"></ha-icon>
          <span>Maintenance</span>
          <ha-icon icon=${this._maintenanceOpen?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </button>
        ${this._maintenanceOpen?B`<div class="sensors">${t.map(t=>this._renderSensorRow(t))}</div>`:q}
      </div>
    `:q}_callVacuumService(t){this.hass.callService("vacuum",t,{entity_id:this._config.vacuum}).catch(e=>this._notifyServiceError(t,e))}_setFanSpeed(t){t&&this.hass.callService("vacuum","set_fan_speed",{entity_id:this._config.vacuum,fan_speed:t}).catch(t=>this._notifyServiceError("set fan speed",t))}_selectOption(t,e){e&&this.hass.callService("select","select_option",{entity_id:t,option:e}).catch(t=>this._notifyServiceError("set option",t))}_pressButton(t){this.hass.callService("button","press",{entity_id:t}).catch(t=>this._notifyServiceError("press button",t))}_fireMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}_notifyServiceError(t,e){const i=e instanceof Error?e.message:String(e);this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:`Failed to ${t}: ${i}`},bubbles:!0,composed:!0}))}};Bt.styles=n`
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
    .map-tools { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
    .remote-drive { display: flex; flex-wrap: wrap; gap: 6px; }
    .section-title { width: 100%; font-size: 0.82em; color: var(--secondary-text-color); }
    .drive-pad { display: grid; grid-template: repeat(3, 38px) / repeat(3, 1fr); gap: 4px; width: 100%; }
    .drive-pad .pill { min-width: 0; padding: 4px; }
    .drive-up { grid-area: 1 / 2; }
    .drive-left { grid-area: 2 / 1; }
    .drive-stop { grid-area: 2 / 2; }
    .drive-right { grid-area: 2 / 3; }
    .drive-down { grid-area: 3 / 2; }
    .schedule-section { display: flex; flex-direction: column; gap: 6px; }
    .schedule-section .schedule-toggle { padding: 0; }
    .schedule-content { display: flex; flex-direction: column; gap: 6px; }
    .schedule-dnd { margin-left: auto; color: var(--warning-color); font-size: 0.78em; }
    .schedule-row { display: flex; align-items: center; gap: 4px; }
    .schedule-info { display: flex; flex: 1; flex-direction: column; min-width: 0; font-size: 0.82em; }
    .schedule-info span { color: var(--secondary-text-color); overflow-wrap: anywhere; }
    .schedule-warning { color: var(--error-color, #db4437) !important; }
    .schedule-add { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
    .schedule-add input { color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 6px; padding: 6px; font: inherit; }
    .schedule-days { display: flex; flex-wrap: wrap; gap: 3px; }
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
    /* Experimental (see VacuumCardConfig.show_trace). */
    .vacuum-trace {
      stroke: var(--vc-accent);
      stroke-opacity: 0.85;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      pointer-events: none;
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

    /* Dreame's room chip list — see _renderDreameRoomChips(). */
    .dreame-rooms {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .chip {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 0.82em;
      cursor: pointer;
      transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
    }
    .chip ha-icon {
      --mdc-icon-size: 16px;
    }
    .chip.selected {
      border-color: var(--vc-accent);
      background: var(--vc-accent);
      color: var(--text-primary-color, #fff);
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
  `,t([mt({attribute:!1})],Bt.prototype,"hass",void 0),t([_t()],Bt.prototype,"_config",void 0),t([_t()],Bt.prototype,"_discovered",void 0),t([_t()],Bt.prototype,"_selectedRoomIds",void 0),t([_t()],Bt.prototype,"_selectedDreameSegmentIds",void 0),t([_t()],Bt.prototype,"_maintenanceOpen",void 0),t([_t()],Bt.prototype,"_schedulesOpen",void 0),t([_t()],Bt.prototype,"_busy",void 0),t([_t()],Bt.prototype,"_trace",void 0),t([_t()],Bt.prototype,"_remoteDriving",void 0),t([_t()],Bt.prototype,"_showLastCleanMap",void 0),t([_t()],Bt.prototype,"_mapMode",void 0),t([_t()],Bt.prototype,"_newScheduleTime",void 0),t([_t()],Bt.prototype,"_newScheduleDays",void 0),t([_t()],Bt.prototype,"_editingScheduleId",void 0),t([ft("img.map-image")],Bt.prototype,"_mapImg",void 0),Bt=t([dt("vacuum-card-adv")],Bt);export{Bt as VacuumCardAdv};

function t(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,_=globalThis,m=_.trustedTypes,f=m?m.emptyScript:"",g=_.reactiveElementPolyfillSupport,v=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);o?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const n=o.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const n=this.constructor;if(!1===i&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??y)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,g?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,S=t=>t,x=A.trustedTypes,C=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,R=`<${P}>`,M=document,O=()=>M.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,I="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,D=/>/g,V=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,L=/"/g,z=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),F=new WeakMap,Z=M.createTreeWalker(M,129);function G(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const Y=(t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=T;for(let e=0;e<s;e++){const s=t[e];let a,c,h=-1,l=0;for(;l<s.length&&(r.lastIndex=l,c=r.exec(s),null!==c);)l=r.lastIndex,r===T?"!--"===c[1]?r=N:void 0!==c[1]?r=D:void 0!==c[2]?(z.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=V):void 0!==c[3]&&(r=V):r===V?">"===c[0]?(r=o??T,h=-1):void 0===c[1]?h=-2:(h=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?V:'"'===c[3]?L:j):r===L||r===j?r=V:r===N||r===D?r=T:(r=V,o=void 0);const d=r===V&&t[e+1].startsWith("/>")?" ":"";n+=r===T?s+R:h>=0?(i.push(a),s.slice(0,h)+E+s.slice(h)+k+d):s+k+(-2===h?e:d)}return[G(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[c,h]=Y(t,e);if(this.el=J.createElement(c,s),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=Z.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(E)){const e=h[n++],s=i.getAttribute(t).split(k),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?et:"?"===r[1]?st:"@"===r[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(z.test(i.tagName)){const t=i.textContent.split(k),e=t.length-1;if(e>0){i.textContent=x?x.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],O()),Z.nextNode(),a.push({type:2,index:++o});i.append(t[e],O())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const s=M.createElement("template");return s.innerHTML=t,s}}function K(t,e,s=t,i){if(e===W)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const n=U(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=K(t,o._$AS(t,e.values),o,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);Z.currentNode=i;let o=Z.nextNode(),n=0,r=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Q(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=s[++r]}n!==a?.index&&(o=Z.nextNode(),n++)}return Z.currentNode=M,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),U(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=J.createElement(G(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new J(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new Q(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=K(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const i=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=K(this,i[s+r],e,r),a===W&&(a=this._$AH[r]),n||=!U(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends tt{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??q)===W)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(J,Q),(A.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new Q(e.insertBefore(O(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:y},dt=(t=lt,e,s)=>{const{kind:i,metadata:o}=s;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return ut({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _t=[{name:"Empty Dust Bin",icon:"mdi:delete-empty"},{name:"Wash Mop",icon:"mdi:water-sync"},{name:"Dry Mop",icon:"mdi:tumble-dryer"},{name:"Remove Hair",icon:"mdi:content-cut"}];function mt(t){return t.entities}function ft(t,e){const s=mt(t)?.[e];if(s?.name)return s.name;if(s?.original_name)return s.original_name;const i=t.states[e],o=i?.attributes?.friendly_name;return"string"==typeof o?o:e}function gt(t,e){return t.filter(t=>t.startsWith(`${e}.`))}function vt(t,e){const s=function(t,e){const s=mt(t);if(!s)return[];const i=s[e]?.device_id;return i?Object.keys(s).filter(t=>s[t]?.device_id===i):[]}(t,e),i={dockActions:[],sensors:[],maintenanceSensors:[]};if(0===s.length)return i;i.camera=gt(s,"camera")[0];for(const e of gt(s,"select")){const s=ft(t,e);s.includes("Water Level")?i.waterLevel=e:s.includes("Clean Passes")&&(i.cleanPasses=e)}for(const e of gt(s,"sensor")){const s=t.states[e];if("battery"===s?.attributes?.device_class){i.battery=e;continue}ft(t,e).toLowerCase().includes("remaining")?i.maintenanceSensors.push(e):i.sensors.push(e)}for(const e of gt(s,"binary_sensor"))ft(t,e).toLowerCase().includes("mop")&&(i.mopAttached=e);for(const e of gt(s,"button")){const s=ft(t,e),o=_t.find(t=>t.name===s);o&&i.dockActions.push({entityId:e,name:o.name,icon:o.icon})}return i}function $t(t,e,s,i){const o=s.getBoundingClientRect(),n=o.left+o.width/2,r=o.top+o.height/2,a=s.offsetWidth||o.width,c=s.offsetHeight||o.height;let h=t-n,l=e-r;if(i%360!=0){const t=-i*Math.PI/180,e=Math.cos(t),s=Math.sin(t),o=h*s+l*e;h=h*e-l*s,l=o}const d=l+c/2;return{x:(h+a/2)*(s.naturalWidth/a),y:d*(s.naturalHeight/c)}}function yt(t,e){return t.x>=e[0]&&t.x<=e[2]&&t.y>=e[1]&&t.y<=e[3]}function bt(t,e){let s=!1;for(let i=0,o=e.length-1;i<e.length;o=i++){const[n,r]=e[i],[a,c]=e[o];r>t.y!=c>t.y&&t.x<(a-n)*(t.y-r)/(c-r)+n&&(s=!s)}return s}function wt(t,e,s){const i=t.x-e,o=t.y-s;return i*i+o*o}let At=class extends at{constructor(){super(...arguments),this._calibrationPoints=[]}setConfig(t){this._config=t}_fireConfigChanged(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_valueChanged(t,e){this._fireConfigChanged({...this._config,[t]:e})}get _cameraId(){if(this._config?.vacuum)return this._config.camera??vt(this.hass,this._config.vacuum).camera}get _roomGeometry(){const t=this._cameraId;if(!t)return;const e=this.hass.states[t]?.attributes?.room_geometry;return e&&e.rooms?.length?e:void 0}render(){return this.hass&&this._config?B`
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
    `:q}_renderToggles(){return B`
      <div class="section toggles">
        ${[["show_map","Show map"],["show_room_names","Show room names when selecting"],["show_controls","Show start/pause/stop/dock controls"],["show_dock_actions","Show dock action buttons (empty bin / wash / dry / hair)"],["show_fan_speed","Show fan speed selector"],["show_water_level","Show water level selector"],["show_battery","Show battery"],["show_sensors","Show sensors"]].map(([t,e])=>B`
            <ha-formfield .label=${e}>
              <ha-switch
                .checked=${this._config[t]??!0}
                @change=${e=>this._valueChanged(t,e.target.checked)}
              ></ha-switch>
            </ha-formfield>
          `)}
      </div>
    `}_renderRotation(){return B`
      <div class="section">
        <ha-textfield
          label="Map rotation (degrees)"
          type="number"
          .value=${String(this._config.map_rotation??0)}
          @change=${t=>this._valueChanged("map_rotation",Number(t.target.value)||0)}
        ></ha-textfield>
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
    `}_renderCalibration(){const t=this._roomGeometry,e=this._cameraId,s=e?this.hass.states[e]?.attributes?.entity_picture:void 0;return B`
      <div class="section">
        <div class="section-title">Room calibration</div>
        <div class="hint">
          Rooms already work out of the box using an automatically-detected rectangle. Use this
          only if a room's shape is irregular and the automatic click area feels wrong: pick a
          room, click points on the map below to trace its actual outline (points connect live),
          then finish to save it.
        </div>
        ${t&&s?B`
              <ha-select
                label="Room to calibrate"
                .value=${void 0!==this._calibrationRoomId?String(this._calibrationRoomId):""}
                @selected=${t=>{const e=Number(t.target.value);this._calibrationRoomId=Number.isNaN(e)?void 0:e,this._calibrationPoints=[]}}
                @closed=${t=>t.stopPropagation()}
              >
                ${t.rooms.map(t=>B`<mwc-list-item .value=${String(t.id)}>${t.name}</mwc-list-item>`)}
              </ha-select>

              ${void 0!==this._calibrationRoomId?B`
                    <div class="map-wrap">
                      <img
                        class="calib-image"
                        src=${s}
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
    `}_renderCalibrationOverlay(t){const e=this._calibrationRoomId,s=t.rooms.find(t=>t.id===e),i=void 0!==e?this._config.room_polygons?.[String(e)]:void 0,o=i&&i.length>=3?B`<polygon
            points=${i.map(([t,e])=>`${t},${e}`).join(" ")}
            fill="rgba(3,169,244,0.25)"
            stroke="rgb(3,169,244)"
            stroke-width="3"
          ></polygon>`:q,n=s?B`<rect
          x=${s.bbox[0]}
          y=${s.bbox[1]}
          width=${s.bbox[2]-s.bbox[0]}
          height=${s.bbox[3]-s.bbox[1]}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          stroke-dasharray="6,4"
          stroke-width="2"
        ></rect>`:q,r=this._calibrationPoints.length>0?B`
            <polyline
              points=${this._calibrationPoints.map(([t,e])=>`${t},${e}`).join(" ")}
              fill="none"
              stroke="rgb(255,152,0)"
              stroke-width="3"
            ></polyline>
            ${this._calibrationPoints.map(([t,e])=>B`<circle cx=${t} cy=${e} r="5" fill="rgb(255,152,0)"></circle>`)}
          `:q;return B`${n}${o}${r}`}_onCalibrationClick(t){const e=t.currentTarget,s=$t(t.clientX,t.clientY,e,0);this._calibrationPoints=[...this._calibrationPoints,[Math.round(s.x),Math.round(s.y)]]}_finishCalibration(){if(void 0===this._calibrationRoomId||this._calibrationPoints.length<3)return;const t={...this._config.room_polygons??{}};t[String(this._calibrationRoomId)]=this._calibrationPoints,this._calibrationPoints=[],this._valueChanged("room_polygons",t)}_deleteCalibration(){if(void 0===this._calibrationRoomId||!this._config.room_polygons)return;const t={...this._config.room_polygons};delete t[String(this._calibrationRoomId)],this._calibrationPoints=[],this._valueChanged("room_polygons",t)}};At.styles=r`
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
  `,t([ut({attribute:!1})],At.prototype,"hass",void 0),t([pt()],At.prototype,"_config",void 0),t([pt()],At.prototype,"_calibrationRoomId",void 0),t([pt()],At.prototype,"_calibrationPoints",void 0),At=t([ht("vacuum-card-adv-editor")],At),console.info("%c VACUUM-CARD-ADV %c v0.1.0 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"vacuum-card-adv",name:"TapoVac ADV Vacuum Card",description:"A card for the TapoVac-ADV integration (Tapo RV30/RV50 series).",preview:!0});let St=class extends at{constructor(){super(...arguments),this._discovered={dockActions:[],sensors:[],maintenanceSensors:[]},this._selectedRoomIds=new Set,this._maintenanceOpen=!1,this._busy=!1}static getConfigElement(){return document.createElement("vacuum-card-adv-editor")}static getStubConfig(t){return{type:"custom:vacuum-card-adv",vacuum:Object.keys(t.states).find(t=>t.startsWith("vacuum."))??"",show_map:!0,show_controls:!0,show_dock_actions:!0,show_fan_speed:!0,show_water_level:!0,show_battery:!0,show_sensors:!0,show_room_names:!0}}setConfig(t){if(!t.vacuum)throw new Error("vacuum entity is required");this._config={show_map:!0,show_controls:!0,show_dock_actions:!0,show_fan_speed:!0,show_water_level:!0,show_battery:!0,show_sensors:!0,show_room_names:!0,map_rotation:0,...t},this._maintenanceOpen=!1==!!t.maintenance_collapsed_default}getCardSize(){let t=2;return(this._config?.show_map??!0)&&(t+=6),(this._config?.show_sensors??!0)&&(t+=2),t}willUpdate(t){t.has("hass")&&this.hass&&this._config?.vacuum&&(this._lastDiscoveredFor===this._config.vacuum&&t.has("_discovered")||(this._discovered=vt(this.hass,this._config.vacuum),this._lastDiscoveredFor=this._config.vacuum))}get _roomGeometry(){const t=this._config.camera??this._discovered.camera;if(!t)return;const e=this.hass.states[t],s=e?.attributes?.room_geometry;return s&&s.rooms?s:void 0}render(){if(!this._config||!this.hass)return q;const t=this.hass.states[this._config.vacuum];if(!t)return B`<ha-card
        ><div class="warning">Entity not found: ${this._config.vacuum}</div></ha-card
      >`;const e=this._config.name??t.attributes.friendly_name??"Vacuum",s=this.hass.formatEntityState?.(t)??t.state;return B`
      <ha-card>
        <div class="header">
          <div class="name">${e}</div>
          <div class="status">${s}</div>
        </div>
        ${this._config.show_map??!0?this._renderMap():q}
        ${this._config.show_controls??!0?this._renderControls():q}
        ${this._config.show_dock_actions??!0?this._renderDockActions():q}
        ${this._renderSelects()}
        ${this._config.show_battery??!0?this._renderBattery():q}
        ${this._config.show_sensors??!0?this._renderSensors():q}
        ${this._renderMaintenance()}
      </ha-card>
    `}_renderMap(){const t=this._config.camera??this._discovered.camera;if(!t)return q;const e=this.hass.states[t],s=e?.attributes?.entity_picture;if(!s)return q;const i=this._config.map_rotation??0,o=this._roomGeometry,n=i%360!=0?`transform: rotate(${i}deg);`:"";return B`
      <div class="map-wrap">
        <img
          class="map-image"
          src=${s}
          style=${n}
          @click=${this._onMapClick}
          @load=${()=>this.requestUpdate()}
        />
        ${o?this._renderMapOverlay(o,n):q}
      </div>
      ${this._selectedRoomIds.size>0?this._renderSelectedRoomsBar(o):q}
    `}_renderMapOverlay(t,e){return B`
      <svg
        class="map-overlay"
        style=${e}
        viewBox="0 0 ${t.image_width} ${t.image_height}"
        preserveAspectRatio="none"
      >
        ${t.rooms.map(t=>this._renderRoomOverlay(t))}
      </svg>
    `}_renderRoomOverlay(t){const e=this._selectedRoomIds.has(t.id),s=this._config.room_polygons?.[String(t.id)],[i,o,n]=t.color,r=e?`rgba(${i},${o},${n},0.55)`:"transparent",a=e?`rgb(${i},${o},${n})`:"transparent";if(s&&s.length>=3){const t=s.map(([t,e])=>`${t},${e}`).join(" ");return B`<polygon
        points=${t}
        fill=${r}
        stroke=${a}
        stroke-width="3"
      ></polygon>`}const[c,h,l,d]=t.bbox;return B`<rect
      x=${c}
      y=${h}
      width=${l-c}
      height=${d-h}
      fill=${r}
      stroke=${a}
      stroke-width="3"
    ></rect>`}_renderSelectedRoomsBar(t){const e=[...this._selectedRoomIds].map(e=>t?.rooms.find(t=>t.id===e)?.name).filter(t=>!!t);return B`
      <div class="selected-rooms-bar">
        <span>${this._config.show_room_names??!0?e.join(", "):`${e.length} room(s)`}</span>
        <mwc-button @click=${this._cleanSelectedRooms} ?disabled=${this._busy}>
          Clean
        </mwc-button>
        <mwc-button @click=${()=>this._selectedRoomIds=new Set}>Clear</mwc-button>
      </div>
    `}_onMapClick(t){const e=this._roomGeometry;if(!e||!this._mapImg)return;const s=this._config.map_rotation??0,i=function(t,e,s){for(const i of e.rooms){const e=s?.[String(i.id)];if(e&&e.length>=3&&bt(t,e))return i.id}for(const i of e.rooms)if(!s?.[String(i.id)]&&yt(t,i.bbox))return i.id;if(0===e.rooms.length)return null;let i=e.rooms[0],o=wt(t,i.cx,i.cy);for(const s of e.rooms.slice(1)){const e=wt(t,s.cx,s.cy);e<o&&(i=s,o=e)}return o<=(.15*Math.max(e.image_width,e.image_height))**2?i.id:null}($t(t.clientX,t.clientY,this._mapImg,s),e,this._config.room_polygons);if(null===i)return;const o=new Set(this._selectedRoomIds);o.has(i)?o.delete(i):o.add(i),this._selectedRoomIds=o}async _cleanSelectedRooms(){const t=this._roomGeometry;if(!t||0===this._selectedRoomIds.size)return;const e=[...this._selectedRoomIds].map(e=>t.rooms.find(t=>t.id===e)?.name).filter(t=>!!t);if(0!==e.length){this._busy=!0;try{await this.hass.callService("tapo_rv30","clean_rooms",{entity_id:this._config.vacuum,rooms:e}),this._selectedRoomIds=new Set}finally{this._busy=!1}}}_renderControls(){const t="cleaning"===this.hass.states[this._config.vacuum].state;return B`
      <div class="controls">
        <ha-icon-button
          .path=${t?Ct:xt}
          @click=${()=>this._callVacuumService(t?"pause":"start")}
        ></ha-icon-button>
        <ha-icon-button .path=${Et} @click=${()=>this._callVacuumService("stop")}></ha-icon-button>
        <ha-icon-button
          .path=${Pt}
          @click=${()=>this._callVacuumService("clean_spot")}
        ></ha-icon-button>
        <ha-icon-button
          .path=${kt}
          @click=${()=>this._callVacuumService("return_to_base")}
        ></ha-icon-button>
      </div>
    `}_renderDockActions(){return 0===this._discovered.dockActions.length?q:B`
      <div class="dock-actions">
        ${this._discovered.dockActions.map(t=>B`
            <mwc-button
              icon=${t.icon}
              @click=${()=>this._pressButton(t.entityId)}
              title=${t.name}
            >
              ${t.name}
            </mwc-button>
          `)}
      </div>
    `}_renderSelects(){const t=this.hass.states[this._config.vacuum],e=this._config.show_fan_speed??!0,s=this._config.show_water_level??!0,i=t.attributes.fan_speed_list??[],o=t.attributes.fan_speed,n=this._config.water_level_entity??this._discovered.waterLevel,r=n?this.hass.states[n]:void 0;return e||s?B`
      <div class="selects">
        ${e&&i.length>0?B`
              <ha-select
                label="Fan speed"
                .value=${o??""}
                @selected=${t=>this._setFanSpeed(t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                ${i.map(t=>B`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
              </ha-select>
            `:q}
        ${s&&r?B`
              <ha-select
                label="Water level"
                .value=${r.state}
                @selected=${t=>this._selectOption(n,t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                ${(r.attributes.options??[]).map(t=>B`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
              </ha-select>
            `:q}
      </div>
    `:q}_renderBattery(){const t=this._config.battery_entity??this._discovered.battery;if(!t)return q;const e=this.hass.states[t];if(!e)return q;const s=Number(e.state);return B`
      <div class="battery">
        <ha-icon icon=${this._batteryIcon(s)}></ha-icon>
        <span>${e.state}%</span>
      </div>
    `}_batteryIcon(t){if(Number.isNaN(t))return"mdi:battery-unknown";const e=10*Math.round(t/10);return e>=100?"mdi:battery":e<=0?"mdi:battery-outline":`mdi:battery-${e}`}_renderSensors(){const t=this._config.sensors??this._discovered.sensors;return t&&0!==t.length?B`
      <div class="sensors">
        ${t.map(t=>{const e=this.hass.states[t];if(!e)return q;const s=e.attributes.friendly_name??t;return B`
            <div class="sensor-row">
              <span class="sensor-label">${s}</span>
              <span class="sensor-value">${e.state}${e.attributes.unit_of_measurement??""}</span>
            </div>
          `})}
      </div>
    `:q}_renderMaintenance(){const t=this._config.maintenance_sensors??this._discovered.maintenanceSensors;return t&&0!==t.length?B`
      <div class="maintenance">
        <button class="maintenance-toggle" @click=${()=>this._maintenanceOpen=!this._maintenanceOpen}>
          <ha-icon icon=${this._maintenanceOpen?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
          Maintenance
        </button>
        ${this._maintenanceOpen?B`
              <div class="sensors">
                ${t.map(t=>{const e=this.hass.states[t];if(!e)return q;const s=e.attributes.friendly_name??t,i=!!e.attributes.overdue;return B`
                    <div class="sensor-row ${i?"overdue":""}">
                      <span class="sensor-label">${s}</span>
                      <span class="sensor-value">${e.state}${e.attributes.unit_of_measurement??""}</span>
                    </div>
                  `})}
              </div>
            `:q}
      </div>
    `:q}_callVacuumService(t){this.hass.callService("vacuum",t,{entity_id:this._config.vacuum})}_setFanSpeed(t){t&&this.hass.callService("vacuum","set_fan_speed",{entity_id:this._config.vacuum,fan_speed:t})}_selectOption(t,e){e&&this.hass.callService("select","select_option",{entity_id:t,option:e})}_pressButton(t){this.hass.callService("button","press",{entity_id:t})}};St.styles=r`
    :host {
      display: block;
    }
    ha-card {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .warning {
      color: var(--error-color);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .name {
      font-size: 1.2em;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .status {
      color: var(--secondary-text-color);
      text-transform: capitalize;
    }
    .map-wrap {
      position: relative;
      width: 100%;
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color);
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
    .selected-rooms-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: space-between;
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }
    .controls,
    .dock-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      justify-content: space-around;
    }
    .selects {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .selects ha-select {
      flex: 1;
      min-width: 120px;
    }
    .battery {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--secondary-text-color);
    }
    .sensors {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .sensor-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.9em;
    }
    .sensor-row.overdue .sensor-value {
      color: var(--error-color);
      font-weight: 600;
    }
    .sensor-label {
      color: var(--secondary-text-color);
    }
    .maintenance-toggle {
      display: flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      color: var(--primary-text-color);
      font: inherit;
      cursor: pointer;
      padding: 4px 0;
    }
  `,t([ut({attribute:!1})],St.prototype,"hass",void 0),t([pt()],St.prototype,"_config",void 0),t([pt()],St.prototype,"_discovered",void 0),t([pt()],St.prototype,"_selectedRoomIds",void 0),t([pt()],St.prototype,"_maintenanceOpen",void 0),t([pt()],St.prototype,"_busy",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t){return(e,s,i)=>((t,e,s)=>(s.configurable=!0,s.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,s),s))(e,s,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}("img.map-image")],St.prototype,"_mapImg",void 0),St=t([ht("vacuum-card-adv")],St);const xt="M8,5.14V19.14L19,12.14L8,5.14Z",Ct="M14,19H18V5H14M6,19H10V5H6V19Z",Et="M18,18H6V6H18V18Z",kt="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z",Pt="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z";export{St as VacuumCardAdv};

import{H as $c,g as le,I as zc}from"./index-DkgzyHvN.js";import{p as Gc}from"./planets-u2FXqxZU.js";const Hc=()=>{};var go={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sa=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Kc=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],l=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},Pa={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,l=a?n[s+1]:0,h=s+2<n.length,d=h?n[s+2]:0,_=o>>2,I=(o&3)<<4|l>>4;let R=(l&15)<<2|d>>6,V=d&63;h||(V=64,a||(R=64)),r.push(e[_],e[I],e[R],e[V])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Sa(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Kc(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],l=s<n.length?e[n.charAt(s)]:0;++s;const d=s<n.length?e[n.charAt(s)]:64;++s;const I=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||l==null||d==null||I==null)throw new Wc;const R=o<<2|l>>4;if(r.push(R),d!==64){const V=l<<4&240|d>>2;if(r.push(V),I!==64){const N=d<<6&192|I;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Wc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Qc=function(n){const t=Sa(n);return Pa.encodeByteArray(t,!0)},sr=function(n){return Qc(n).replace(/\./g,"")},Jc=function(n){try{return Pa.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yc=()=>Xc().__FIREBASE_DEFAULTS__,Zc=()=>{if(typeof process>"u"||typeof go>"u")return;const n=go.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},tl=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Jc(n[1]);return t&&JSON.parse(t)},Ms=()=>{try{return Hc()||Yc()||Zc()||tl()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},el=n=>{var t,e;return(e=(t=Ms())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},nl=n=>{const t=el(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Va=()=>{var n;return(n=Ms())==null?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sl(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[sr(JSON.stringify(e)),sr(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function il(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ol(){var t;const n=(t=Ms())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function al(){return!ol()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ul(){try{return typeof indexedDB=="object"}catch{return!1}}function cl(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)==null?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ll="FirebaseError";class Le extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=ll,Object.setPrototypeOf(this,Le.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ca.prototype.create)}}class Ca{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?hl(o,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new Le(s,l,r)}}function hl(n,t){return n.replace(fl,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const fl=/\{\$([^}]+)}/g;function ir(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if(po(o)&&po(a)){if(!ir(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function po(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mn(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ba(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function dl(n){return(await fetch(n,{credentials:"include"})).ok}class gn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const he="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new rl;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(pl(t))try{this.getOrInitializeService({instanceIdentifier:he})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=he){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=he){return this.instances.has(t)}getOptions(t=he){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);r===l&&a.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&t(o,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:gl(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=he){return this.component?this.component.multipleInstances?t:he:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function gl(n){return n===he?void 0:n}function pl(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _l{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new ml(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})($||($={}));const yl={debug:$.DEBUG,verbose:$.VERBOSE,info:$.INFO,warn:$.WARN,error:$.ERROR,silent:$.SILENT},El=$.INFO,Tl={[$.DEBUG]:"log",[$.VERBOSE]:"log",[$.INFO]:"info",[$.WARN]:"warn",[$.ERROR]:"error"},Il=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=Tl[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Da{constructor(t){this.name=t,this._logLevel=El,this._logHandler=Il,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in $))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?yl[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,$.DEBUG,...t),this._logHandler(this,$.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,$.VERBOSE,...t),this._logHandler(this,$.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,$.INFO,...t),this._logHandler(this,$.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,$.WARN,...t),this._logHandler(this,$.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,$.ERROR,...t),this._logHandler(this,$.ERROR,...t)}}const vl=(n,t)=>t.some(e=>n instanceof e);let _o,yo;function Al(){return _o||(_o=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function wl(){return yo||(yo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Na=new WeakMap,ms=new WeakMap,ka=new WeakMap,is=new WeakMap,Ls=new WeakMap;function Rl(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(Wt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&Na.set(e,n)}).catch(()=>{}),Ls.set(t,n),t}function Sl(n){if(ms.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});ms.set(n,t)}let gs={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return ms.get(n);if(t==="objectStoreNames")return n.objectStoreNames||ka.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Wt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function Pl(n){gs=n(gs)}function Vl(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(os(this),t,...e);return ka.set(r,t.sort?t.sort():[t]),Wt(r)}:wl().includes(n)?function(...t){return n.apply(os(this),t),Wt(Na.get(this))}:function(...t){return Wt(n.apply(os(this),t))}}function Cl(n){return typeof n=="function"?Vl(n):(n instanceof IDBTransaction&&Sl(n),vl(n,Al())?new Proxy(n,gs):n)}function Wt(n){if(n instanceof IDBRequest)return Rl(n);if(is.has(n))return is.get(n);const t=Cl(n);return t!==n&&(is.set(n,t),Ls.set(t,n)),t}const os=n=>Ls.get(n);function bl(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,t),l=Wt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(Wt(a.result),h.oldVersion,h.newVersion,Wt(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),l.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const Dl=["get","getKey","getAll","getAllKeys","count"],Nl=["put","add","delete","clear"],as=new Map;function Eo(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(as.get(t))return as.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=Nl.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Dl.includes(e)))return;const o=async function(a,...l){const h=this.transaction(a,s?"readwrite":"readonly");let d=h.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[e](...l),s&&h.done]))[0]};return as.set(t,o),o}Pl(n=>({...n,get:(t,e,r)=>Eo(t,e)||n.get(t,e,r),has:(t,e)=>!!Eo(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kl{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Ol(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Ol(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const ps="@firebase/app",To="0.14.12";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut=new Da("@firebase/app"),xl="@firebase/app-compat",Ml="@firebase/analytics-compat",Ll="@firebase/analytics",Fl="@firebase/app-check-compat",Ul="@firebase/app-check",Bl="@firebase/auth",jl="@firebase/auth-compat",ql="@firebase/database",$l="@firebase/data-connect",zl="@firebase/database-compat",Gl="@firebase/functions",Hl="@firebase/functions-compat",Kl="@firebase/installations",Wl="@firebase/installations-compat",Ql="@firebase/messaging",Jl="@firebase/messaging-compat",Xl="@firebase/performance",Yl="@firebase/performance-compat",Zl="@firebase/remote-config",th="@firebase/remote-config-compat",eh="@firebase/storage",nh="@firebase/storage-compat",rh="@firebase/firestore",sh="@firebase/ai",ih="@firebase/firestore-compat",oh="firebase",ah="12.13.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s="[DEFAULT]",uh={[ps]:"fire-core",[xl]:"fire-core-compat",[Ll]:"fire-analytics",[Ml]:"fire-analytics-compat",[Ul]:"fire-app-check",[Fl]:"fire-app-check-compat",[Bl]:"fire-auth",[jl]:"fire-auth-compat",[ql]:"fire-rtdb",[$l]:"fire-data-connect",[zl]:"fire-rtdb-compat",[Gl]:"fire-fn",[Hl]:"fire-fn-compat",[Kl]:"fire-iid",[Wl]:"fire-iid-compat",[Ql]:"fire-fcm",[Jl]:"fire-fcm-compat",[Xl]:"fire-perf",[Yl]:"fire-perf-compat",[Zl]:"fire-rc",[th]:"fire-rc-compat",[eh]:"fire-gcs",[nh]:"fire-gcs-compat",[rh]:"fire-fst",[ih]:"fire-fst-compat",[sh]:"fire-vertex","fire-js":"fire-js",[oh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or=new Map,ch=new Map,ys=new Map;function Io(n,t){try{n.container.addComponent(t)}catch(e){Ut.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function ar(n){const t=n.name;if(ys.has(t))return Ut.debug(`There were multiple attempts to register component ${t}.`),!1;ys.set(t,n);for(const e of or.values())Io(e,n);for(const e of ch.values())Io(e,n);return!0}function lh(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function hh(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Qt=new Ca("app","Firebase",fh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new gn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Qt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh=ah;function Oa(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:_s,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw Qt.create("bad-app-name",{appName:String(s)});if(e||(e=Va()),!e)throw Qt.create("no-options");const o=or.get(s);if(o){if(ir(e,o.options)&&ir(r,o.config))return o;throw Qt.create("duplicate-app",{appName:s})}const a=new _l(s);for(const h of ys.values())a.addComponent(h);const l=new dh(e,r,a);return or.set(s,l),l}function gh(n=_s){const t=or.get(n);if(!t&&n===_s&&Va())return Oa();if(!t)throw Qt.create("no-app",{appName:n});return t}function Ve(n,t,e){let r=uh[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const a=[`Unable to register library "${r}" with version "${t}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Ut.warn(a.join(" "));return}ar(new gn(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ph="firebase-heartbeat-database",_h=1,pn="firebase-heartbeat-store";let us=null;function xa(){return us||(us=bl(ph,_h,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(pn)}catch(e){console.warn(e)}}}}).catch(n=>{throw Qt.create("idb-open",{originalErrorMessage:n.message})})),us}async function yh(n){try{const e=(await xa()).transaction(pn),r=await e.objectStore(pn).get(Ma(n));return await e.done,r}catch(t){if(t instanceof Le)Ut.warn(t.message);else{const e=Qt.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Ut.warn(e.message)}}}async function vo(n,t){try{const r=(await xa()).transaction(pn,"readwrite");await r.objectStore(pn).put(t,Ma(n)),await r.done}catch(e){if(e instanceof Le)Ut.warn(e.message);else{const r=Qt.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Ut.warn(r.message)}}}function Ma(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eh=1024,Th=30;class Ih{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Ah(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Ao();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>Th){const a=wh(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ut.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ao(),{heartbeatsToSend:r,unsentEntries:s}=vh(this._heartbeatsCache.heartbeats),o=sr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Ut.warn(e),""}}}function Ao(){return new Date().toISOString().substring(0,10)}function vh(n,t=Eh){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),wo(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),wo(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class Ah{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ul()?cl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await yh(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return vo(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return vo(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function wo(n){return sr(JSON.stringify({version:2,heartbeats:n})).length}function wh(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rh(n){ar(new gn("platform-logger",t=>new kl(t),"PRIVATE")),ar(new gn("heartbeat",t=>new Ih(t),"PRIVATE")),Ve(ps,To,n),Ve(ps,To,"esm2020"),Ve("fire-js","")}Rh("");var Sh="firebase",Ph="12.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ve(Sh,Ph,"app");var Ro=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Jt,La;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(T,m){function g(){}g.prototype=m.prototype,T.F=m.prototype,T.prototype=new g,T.prototype.constructor=T,T.D=function(E,y,A){for(var p=Array(arguments.length-2),It=2;It<arguments.length;It++)p[It-2]=arguments[It];return m.prototype[y].apply(E,p)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,m,g){g||(g=0);const E=Array(16);if(typeof m=="string")for(var y=0;y<16;++y)E[y]=m.charCodeAt(g++)|m.charCodeAt(g++)<<8|m.charCodeAt(g++)<<16|m.charCodeAt(g++)<<24;else for(y=0;y<16;++y)E[y]=m[g++]|m[g++]<<8|m[g++]<<16|m[g++]<<24;m=T.g[0],g=T.g[1],y=T.g[2];let A=T.g[3],p;p=m+(A^g&(y^A))+E[0]+3614090360&4294967295,m=g+(p<<7&4294967295|p>>>25),p=A+(y^m&(g^y))+E[1]+3905402710&4294967295,A=m+(p<<12&4294967295|p>>>20),p=y+(g^A&(m^g))+E[2]+606105819&4294967295,y=A+(p<<17&4294967295|p>>>15),p=g+(m^y&(A^m))+E[3]+3250441966&4294967295,g=y+(p<<22&4294967295|p>>>10),p=m+(A^g&(y^A))+E[4]+4118548399&4294967295,m=g+(p<<7&4294967295|p>>>25),p=A+(y^m&(g^y))+E[5]+1200080426&4294967295,A=m+(p<<12&4294967295|p>>>20),p=y+(g^A&(m^g))+E[6]+2821735955&4294967295,y=A+(p<<17&4294967295|p>>>15),p=g+(m^y&(A^m))+E[7]+4249261313&4294967295,g=y+(p<<22&4294967295|p>>>10),p=m+(A^g&(y^A))+E[8]+1770035416&4294967295,m=g+(p<<7&4294967295|p>>>25),p=A+(y^m&(g^y))+E[9]+2336552879&4294967295,A=m+(p<<12&4294967295|p>>>20),p=y+(g^A&(m^g))+E[10]+4294925233&4294967295,y=A+(p<<17&4294967295|p>>>15),p=g+(m^y&(A^m))+E[11]+2304563134&4294967295,g=y+(p<<22&4294967295|p>>>10),p=m+(A^g&(y^A))+E[12]+1804603682&4294967295,m=g+(p<<7&4294967295|p>>>25),p=A+(y^m&(g^y))+E[13]+4254626195&4294967295,A=m+(p<<12&4294967295|p>>>20),p=y+(g^A&(m^g))+E[14]+2792965006&4294967295,y=A+(p<<17&4294967295|p>>>15),p=g+(m^y&(A^m))+E[15]+1236535329&4294967295,g=y+(p<<22&4294967295|p>>>10),p=m+(y^A&(g^y))+E[1]+4129170786&4294967295,m=g+(p<<5&4294967295|p>>>27),p=A+(g^y&(m^g))+E[6]+3225465664&4294967295,A=m+(p<<9&4294967295|p>>>23),p=y+(m^g&(A^m))+E[11]+643717713&4294967295,y=A+(p<<14&4294967295|p>>>18),p=g+(A^m&(y^A))+E[0]+3921069994&4294967295,g=y+(p<<20&4294967295|p>>>12),p=m+(y^A&(g^y))+E[5]+3593408605&4294967295,m=g+(p<<5&4294967295|p>>>27),p=A+(g^y&(m^g))+E[10]+38016083&4294967295,A=m+(p<<9&4294967295|p>>>23),p=y+(m^g&(A^m))+E[15]+3634488961&4294967295,y=A+(p<<14&4294967295|p>>>18),p=g+(A^m&(y^A))+E[4]+3889429448&4294967295,g=y+(p<<20&4294967295|p>>>12),p=m+(y^A&(g^y))+E[9]+568446438&4294967295,m=g+(p<<5&4294967295|p>>>27),p=A+(g^y&(m^g))+E[14]+3275163606&4294967295,A=m+(p<<9&4294967295|p>>>23),p=y+(m^g&(A^m))+E[3]+4107603335&4294967295,y=A+(p<<14&4294967295|p>>>18),p=g+(A^m&(y^A))+E[8]+1163531501&4294967295,g=y+(p<<20&4294967295|p>>>12),p=m+(y^A&(g^y))+E[13]+2850285829&4294967295,m=g+(p<<5&4294967295|p>>>27),p=A+(g^y&(m^g))+E[2]+4243563512&4294967295,A=m+(p<<9&4294967295|p>>>23),p=y+(m^g&(A^m))+E[7]+1735328473&4294967295,y=A+(p<<14&4294967295|p>>>18),p=g+(A^m&(y^A))+E[12]+2368359562&4294967295,g=y+(p<<20&4294967295|p>>>12),p=m+(g^y^A)+E[5]+4294588738&4294967295,m=g+(p<<4&4294967295|p>>>28),p=A+(m^g^y)+E[8]+2272392833&4294967295,A=m+(p<<11&4294967295|p>>>21),p=y+(A^m^g)+E[11]+1839030562&4294967295,y=A+(p<<16&4294967295|p>>>16),p=g+(y^A^m)+E[14]+4259657740&4294967295,g=y+(p<<23&4294967295|p>>>9),p=m+(g^y^A)+E[1]+2763975236&4294967295,m=g+(p<<4&4294967295|p>>>28),p=A+(m^g^y)+E[4]+1272893353&4294967295,A=m+(p<<11&4294967295|p>>>21),p=y+(A^m^g)+E[7]+4139469664&4294967295,y=A+(p<<16&4294967295|p>>>16),p=g+(y^A^m)+E[10]+3200236656&4294967295,g=y+(p<<23&4294967295|p>>>9),p=m+(g^y^A)+E[13]+681279174&4294967295,m=g+(p<<4&4294967295|p>>>28),p=A+(m^g^y)+E[0]+3936430074&4294967295,A=m+(p<<11&4294967295|p>>>21),p=y+(A^m^g)+E[3]+3572445317&4294967295,y=A+(p<<16&4294967295|p>>>16),p=g+(y^A^m)+E[6]+76029189&4294967295,g=y+(p<<23&4294967295|p>>>9),p=m+(g^y^A)+E[9]+3654602809&4294967295,m=g+(p<<4&4294967295|p>>>28),p=A+(m^g^y)+E[12]+3873151461&4294967295,A=m+(p<<11&4294967295|p>>>21),p=y+(A^m^g)+E[15]+530742520&4294967295,y=A+(p<<16&4294967295|p>>>16),p=g+(y^A^m)+E[2]+3299628645&4294967295,g=y+(p<<23&4294967295|p>>>9),p=m+(y^(g|~A))+E[0]+4096336452&4294967295,m=g+(p<<6&4294967295|p>>>26),p=A+(g^(m|~y))+E[7]+1126891415&4294967295,A=m+(p<<10&4294967295|p>>>22),p=y+(m^(A|~g))+E[14]+2878612391&4294967295,y=A+(p<<15&4294967295|p>>>17),p=g+(A^(y|~m))+E[5]+4237533241&4294967295,g=y+(p<<21&4294967295|p>>>11),p=m+(y^(g|~A))+E[12]+1700485571&4294967295,m=g+(p<<6&4294967295|p>>>26),p=A+(g^(m|~y))+E[3]+2399980690&4294967295,A=m+(p<<10&4294967295|p>>>22),p=y+(m^(A|~g))+E[10]+4293915773&4294967295,y=A+(p<<15&4294967295|p>>>17),p=g+(A^(y|~m))+E[1]+2240044497&4294967295,g=y+(p<<21&4294967295|p>>>11),p=m+(y^(g|~A))+E[8]+1873313359&4294967295,m=g+(p<<6&4294967295|p>>>26),p=A+(g^(m|~y))+E[15]+4264355552&4294967295,A=m+(p<<10&4294967295|p>>>22),p=y+(m^(A|~g))+E[6]+2734768916&4294967295,y=A+(p<<15&4294967295|p>>>17),p=g+(A^(y|~m))+E[13]+1309151649&4294967295,g=y+(p<<21&4294967295|p>>>11),p=m+(y^(g|~A))+E[4]+4149444226&4294967295,m=g+(p<<6&4294967295|p>>>26),p=A+(g^(m|~y))+E[11]+3174756917&4294967295,A=m+(p<<10&4294967295|p>>>22),p=y+(m^(A|~g))+E[2]+718787259&4294967295,y=A+(p<<15&4294967295|p>>>17),p=g+(A^(y|~m))+E[9]+3951481745&4294967295,T.g[0]=T.g[0]+m&4294967295,T.g[1]=T.g[1]+(y+(p<<21&4294967295|p>>>11))&4294967295,T.g[2]=T.g[2]+y&4294967295,T.g[3]=T.g[3]+A&4294967295}r.prototype.v=function(T,m){m===void 0&&(m=T.length);const g=m-this.blockSize,E=this.C;let y=this.h,A=0;for(;A<m;){if(y==0)for(;A<=g;)s(this,T,A),A+=this.blockSize;if(typeof T=="string"){for(;A<m;)if(E[y++]=T.charCodeAt(A++),y==this.blockSize){s(this,E),y=0;break}}else for(;A<m;)if(E[y++]=T[A++],y==this.blockSize){s(this,E),y=0;break}}this.h=y,this.o+=m},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var m=1;m<T.length-8;++m)T[m]=0;m=this.o*8;for(var g=T.length-8;g<T.length;++g)T[g]=m&255,m/=256;for(this.v(T),T=Array(16),m=0,g=0;g<4;++g)for(let E=0;E<32;E+=8)T[m++]=this.g[g]>>>E&255;return T};function o(T,m){var g=l;return Object.prototype.hasOwnProperty.call(g,T)?g[T]:g[T]=m(T)}function a(T,m){this.h=m;const g=[];let E=!0;for(let y=T.length-1;y>=0;y--){const A=T[y]|0;E&&A==m||(g[y]=A,E=!1)}this.g=g}var l={};function h(T){return-128<=T&&T<128?o(T,function(m){return new a([m|0],m<0?-1:0)}):new a([T|0],T<0?-1:0)}function d(T){if(isNaN(T)||!isFinite(T))return I;if(T<0)return D(d(-T));const m=[];let g=1;for(let E=0;T>=g;E++)m[E]=T/g|0,g*=4294967296;return new a(m,0)}function _(T,m){if(T.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(T.charAt(0)=="-")return D(_(T.substring(1),m));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const g=d(Math.pow(m,8));let E=I;for(let A=0;A<T.length;A+=8){var y=Math.min(8,T.length-A);const p=parseInt(T.substring(A,A+y),m);y<8?(y=d(Math.pow(m,y)),E=E.j(y).add(d(p))):(E=E.j(g),E=E.add(d(p)))}return E}var I=h(0),R=h(1),V=h(16777216);n=a.prototype,n.m=function(){if(O(this))return-D(this).m();let T=0,m=1;for(let g=0;g<this.g.length;g++){const E=this.i(g);T+=(E>=0?E:4294967296+E)*m,m*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(N(this))return"0";if(O(this))return"-"+D(this).toString(T);const m=d(Math.pow(T,6));var g=this;let E="";for(;;){const y=Tt(g,m).g;g=H(g,y.j(m));let A=((g.g.length>0?g.g[0]:g.h)>>>0).toString(T);if(g=y,N(g))return A+E;for(;A.length<6;)A="0"+A;E=A+E}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function N(T){if(T.h!=0)return!1;for(let m=0;m<T.g.length;m++)if(T.g[m]!=0)return!1;return!0}function O(T){return T.h==-1}n.l=function(T){return T=H(this,T),O(T)?-1:N(T)?0:1};function D(T){const m=T.g.length,g=[];for(let E=0;E<m;E++)g[E]=~T.g[E];return new a(g,~T.h).add(R)}n.abs=function(){return O(this)?D(this):this},n.add=function(T){const m=Math.max(this.g.length,T.g.length),g=[];let E=0;for(let y=0;y<=m;y++){let A=E+(this.i(y)&65535)+(T.i(y)&65535),p=(A>>>16)+(this.i(y)>>>16)+(T.i(y)>>>16);E=p>>>16,A&=65535,p&=65535,g[y]=p<<16|A}return new a(g,g[g.length-1]&-2147483648?-1:0)};function H(T,m){return T.add(D(m))}n.j=function(T){if(N(this)||N(T))return I;if(O(this))return O(T)?D(this).j(D(T)):D(D(this).j(T));if(O(T))return D(this.j(D(T)));if(this.l(V)<0&&T.l(V)<0)return d(this.m()*T.m());const m=this.g.length+T.g.length,g=[];for(var E=0;E<2*m;E++)g[E]=0;for(E=0;E<this.g.length;E++)for(let y=0;y<T.g.length;y++){const A=this.i(E)>>>16,p=this.i(E)&65535,It=T.i(y)>>>16,se=T.i(y)&65535;g[2*E+2*y]+=p*se,z(g,2*E+2*y),g[2*E+2*y+1]+=A*se,z(g,2*E+2*y+1),g[2*E+2*y+1]+=p*It,z(g,2*E+2*y+1),g[2*E+2*y+2]+=A*It,z(g,2*E+2*y+2)}for(T=0;T<m;T++)g[T]=g[2*T+1]<<16|g[2*T];for(T=m;T<2*m;T++)g[T]=0;return new a(g,0)};function z(T,m){for(;(T[m]&65535)!=T[m];)T[m+1]+=T[m]>>>16,T[m]&=65535,m++}function W(T,m){this.g=T,this.h=m}function Tt(T,m){if(N(m))throw Error("division by zero");if(N(T))return new W(I,I);if(O(T))return m=Tt(D(T),m),new W(D(m.g),D(m.h));if(O(m))return m=Tt(T,D(m)),new W(D(m.g),m.h);if(T.g.length>30){if(O(T)||O(m))throw Error("slowDivide_ only works with positive integers.");for(var g=R,E=m;E.l(T)<=0;)g=ot(g),E=ot(E);var y=at(g,1),A=at(E,1);for(E=at(E,2),g=at(g,2);!N(E);){var p=A.add(E);p.l(T)<=0&&(y=y.add(g),A=p),E=at(E,1),g=at(g,1)}return m=H(T,y.j(m)),new W(y,m)}for(y=I;T.l(m)>=0;){for(g=Math.max(1,Math.floor(T.m()/m.m())),E=Math.ceil(Math.log(g)/Math.LN2),E=E<=48?1:Math.pow(2,E-48),A=d(g),p=A.j(m);O(p)||p.l(T)>0;)g-=E,A=d(g),p=A.j(m);N(A)&&(A=R),y=y.add(A),T=H(T,p)}return new W(y,T)}n.B=function(T){return Tt(this,T).h},n.and=function(T){const m=Math.max(this.g.length,T.g.length),g=[];for(let E=0;E<m;E++)g[E]=this.i(E)&T.i(E);return new a(g,this.h&T.h)},n.or=function(T){const m=Math.max(this.g.length,T.g.length),g=[];for(let E=0;E<m;E++)g[E]=this.i(E)|T.i(E);return new a(g,this.h|T.h)},n.xor=function(T){const m=Math.max(this.g.length,T.g.length),g=[];for(let E=0;E<m;E++)g[E]=this.i(E)^T.i(E);return new a(g,this.h^T.h)};function ot(T){const m=T.g.length+1,g=[];for(let E=0;E<m;E++)g[E]=T.i(E)<<1|T.i(E-1)>>>31;return new a(g,T.h)}function at(T,m){const g=m>>5;m%=32;const E=T.g.length-g,y=[];for(let A=0;A<E;A++)y[A]=m>0?T.i(A+g)>>>m|T.i(A+g+1)<<32-m:T.i(A+g);return new a(y,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,La=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=_,Jt=a}).apply(typeof Ro<"u"?Ro:typeof self<"u"?self:typeof window<"u"?window:{});var Gn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Fa,on,Ua,Yn,Es,Ba,ja,qa;(function(){var n,t=Object.defineProperty;function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Gn=="object"&&Gn];for(var u=0;u<i.length;++u){var c=i[u];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=e(this);function s(i,u){if(u)t:{var c=r;i=i.split(".");for(var f=0;f<i.length-1;f++){var v=i[f];if(!(v in c))break t;c=c[v]}i=i[i.length-1],f=c[i],u=u(f),u!=f&&u!=null&&t(c,i,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(i){return i||function(u){var c=[],f;for(f in u)Object.prototype.hasOwnProperty.call(u,f)&&c.push([f,u[f]]);return c}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(i){var u=typeof i;return u=="object"&&i!=null||u=="function"}function h(i,u,c){return i.call.apply(i.bind,arguments)}function d(i,u,c){return d=h,d.apply(null,arguments)}function _(i,u){var c=Array.prototype.slice.call(arguments,1);return function(){var f=c.slice();return f.push.apply(f,arguments),i.apply(this,f)}}function I(i,u){function c(){}c.prototype=u.prototype,i.Z=u.prototype,i.prototype=new c,i.prototype.constructor=i,i.Ob=function(f,v,w){for(var C=Array(arguments.length-2),U=2;U<arguments.length;U++)C[U-2]=arguments[U];return u.prototype[v].apply(f,C)}}var R=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function V(i){const u=i.length;if(u>0){const c=Array(u);for(let f=0;f<u;f++)c[f]=i[f];return c}return[]}function N(i,u){for(let f=1;f<arguments.length;f++){const v=arguments[f];var c=typeof v;if(c=c!="object"?c:v?Array.isArray(v)?"array":c:"null",c=="array"||c=="object"&&typeof v.length=="number"){c=i.length||0;const w=v.length||0;i.length=c+w;for(let C=0;C<w;C++)i[c+C]=v[C]}else i.push(v)}}class O{constructor(u,c){this.i=u,this.j=c,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function D(i){a.setTimeout(()=>{throw i},0)}function H(){var i=T;let u=null;return i.g&&(u=i.g,i.g=i.g.next,i.g||(i.h=null),u.next=null),u}class z{constructor(){this.h=this.g=null}add(u,c){const f=W.get();f.set(u,c),this.h?this.h.next=f:this.g=f,this.h=f}}var W=new O(()=>new Tt,i=>i.reset());class Tt{constructor(){this.next=this.g=this.h=null}set(u,c){this.h=u,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let ot,at=!1,T=new z,m=()=>{const i=Promise.resolve(void 0);ot=()=>{i.then(g)}};function g(){for(var i;i=H();){try{i.h.call(i.g)}catch(c){D(c)}var u=W;u.j(i),u.h<100&&(u.h++,i.next=u.g,u.g=i)}at=!1}function E(){this.u=this.u,this.C=this.C}E.prototype.u=!1,E.prototype.dispose=function(){this.u||(this.u=!0,this.N())},E.prototype[Symbol.dispose]=function(){this.dispose()},E.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function y(i,u){this.type=i,this.g=this.target=u,this.defaultPrevented=!1}y.prototype.h=function(){this.defaultPrevented=!0};var A=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var i=!1,u=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};a.addEventListener("test",c,u),a.removeEventListener("test",c,u)}catch{}return i}();function p(i){return/^[\s\xa0]*$/.test(i)}function It(i,u){y.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,u)}I(It,y),It.prototype.init=function(i,u){const c=this.type=i.type,f=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=u,u=i.relatedTarget,u||(c=="mouseover"?u=i.fromElement:c=="mouseout"&&(u=i.toElement)),this.relatedTarget=u,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&It.Z.h.call(this)},It.prototype.h=function(){It.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var se="closure_listenable_"+(Math.random()*1e6|0),hc=0;function fc(i,u,c,f,v){this.listener=i,this.proxy=null,this.src=u,this.type=c,this.capture=!!f,this.ha=v,this.key=++hc,this.da=this.fa=!1}function bn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Dn(i,u,c){for(const f in i)u.call(c,i[f],f,i)}function dc(i,u){for(const c in i)u.call(void 0,i[c],c,i)}function di(i){const u={};for(const c in i)u[c]=i[c];return u}const mi="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function gi(i,u){let c,f;for(let v=1;v<arguments.length;v++){f=arguments[v];for(c in f)i[c]=f[c];for(let w=0;w<mi.length;w++)c=mi[w],Object.prototype.hasOwnProperty.call(f,c)&&(i[c]=f[c])}}function Nn(i){this.src=i,this.g={},this.h=0}Nn.prototype.add=function(i,u,c,f,v){const w=i.toString();i=this.g[w],i||(i=this.g[w]=[],this.h++);const C=Mr(i,u,f,v);return C>-1?(u=i[C],c||(u.fa=!1)):(u=new fc(u,this.src,w,!!f,v),u.fa=c,i.push(u)),u};function xr(i,u){const c=u.type;if(c in i.g){var f=i.g[c],v=Array.prototype.indexOf.call(f,u,void 0),w;(w=v>=0)&&Array.prototype.splice.call(f,v,1),w&&(bn(u),i.g[c].length==0&&(delete i.g[c],i.h--))}}function Mr(i,u,c,f){for(let v=0;v<i.length;++v){const w=i[v];if(!w.da&&w.listener==u&&w.capture==!!c&&w.ha==f)return v}return-1}var Lr="closure_lm_"+(Math.random()*1e6|0),Fr={};function pi(i,u,c,f,v){if(Array.isArray(u)){for(let w=0;w<u.length;w++)pi(i,u[w],c,f,v);return null}return c=Ei(c),i&&i[se]?i.J(u,c,l(f)?!!f.capture:!1,v):mc(i,u,c,!1,f,v)}function mc(i,u,c,f,v,w){if(!u)throw Error("Invalid event type");const C=l(v)?!!v.capture:!!v;let U=Br(i);if(U||(i[Lr]=U=new Nn(i)),c=U.add(u,c,f,C,w),c.proxy)return c;if(f=gc(),c.proxy=f,f.src=i,f.listener=c,i.addEventListener)A||(v=C),v===void 0&&(v=!1),i.addEventListener(u.toString(),f,v);else if(i.attachEvent)i.attachEvent(yi(u.toString()),f);else if(i.addListener&&i.removeListener)i.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return c}function gc(){function i(c){return u.call(i.src,i.listener,c)}const u=pc;return i}function _i(i,u,c,f,v){if(Array.isArray(u))for(var w=0;w<u.length;w++)_i(i,u[w],c,f,v);else f=l(f)?!!f.capture:!!f,c=Ei(c),i&&i[se]?(i=i.i,w=String(u).toString(),w in i.g&&(u=i.g[w],c=Mr(u,c,f,v),c>-1&&(bn(u[c]),Array.prototype.splice.call(u,c,1),u.length==0&&(delete i.g[w],i.h--)))):i&&(i=Br(i))&&(u=i.g[u.toString()],i=-1,u&&(i=Mr(u,c,f,v)),(c=i>-1?u[i]:null)&&Ur(c))}function Ur(i){if(typeof i!="number"&&i&&!i.da){var u=i.src;if(u&&u[se])xr(u.i,i);else{var c=i.type,f=i.proxy;u.removeEventListener?u.removeEventListener(c,f,i.capture):u.detachEvent?u.detachEvent(yi(c),f):u.addListener&&u.removeListener&&u.removeListener(f),(c=Br(u))?(xr(c,i),c.h==0&&(c.src=null,u[Lr]=null)):bn(i)}}}function yi(i){return i in Fr?Fr[i]:Fr[i]="on"+i}function pc(i,u){if(i.da)i=!0;else{u=new It(u,this);const c=i.listener,f=i.ha||i.src;i.fa&&Ur(i),i=c.call(f,u)}return i}function Br(i){return i=i[Lr],i instanceof Nn?i:null}var jr="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ei(i){return typeof i=="function"?i:(i[jr]||(i[jr]=function(u){return i.handleEvent(u)}),i[jr])}function mt(){E.call(this),this.i=new Nn(this),this.M=this,this.G=null}I(mt,E),mt.prototype[se]=!0,mt.prototype.removeEventListener=function(i,u,c,f){_i(this,i,u,c,f)};function yt(i,u){var c,f=i.G;if(f)for(c=[];f;f=f.G)c.push(f);if(i=i.M,f=u.type||u,typeof u=="string")u=new y(u,i);else if(u instanceof y)u.target=u.target||i;else{var v=u;u=new y(f,i),gi(u,v)}v=!0;let w,C;if(c)for(C=c.length-1;C>=0;C--)w=u.g=c[C],v=kn(w,f,!0,u)&&v;if(w=u.g=i,v=kn(w,f,!0,u)&&v,v=kn(w,f,!1,u)&&v,c)for(C=0;C<c.length;C++)w=u.g=c[C],v=kn(w,f,!1,u)&&v}mt.prototype.N=function(){if(mt.Z.N.call(this),this.i){var i=this.i;for(const u in i.g){const c=i.g[u];for(let f=0;f<c.length;f++)bn(c[f]);delete i.g[u],i.h--}}this.G=null},mt.prototype.J=function(i,u,c,f){return this.i.add(String(i),u,!1,c,f)},mt.prototype.K=function(i,u,c,f){return this.i.add(String(i),u,!0,c,f)};function kn(i,u,c,f){if(u=i.i.g[String(u)],!u)return!0;u=u.concat();let v=!0;for(let w=0;w<u.length;++w){const C=u[w];if(C&&!C.da&&C.capture==c){const U=C.listener,rt=C.ha||C.src;C.fa&&xr(i.i,C),v=U.call(rt,f)!==!1&&v}}return v&&!f.defaultPrevented}function _c(i,u){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=d(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(i,u||0)}function Ti(i){i.g=_c(()=>{i.g=null,i.i&&(i.i=!1,Ti(i))},i.l);const u=i.h;i.h=null,i.m.apply(null,u)}class yc extends E{constructor(u,c){super(),this.m=u,this.l=c,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Ti(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function qe(i){E.call(this),this.h=i,this.g={}}I(qe,E);var Ii=[];function vi(i){Dn(i.g,function(u,c){this.g.hasOwnProperty(c)&&Ur(u)},i),i.g={}}qe.prototype.N=function(){qe.Z.N.call(this),vi(this)},qe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var qr=a.JSON.stringify,Ec=a.JSON.parse,Tc=class{stringify(i){return a.JSON.stringify(i,void 0)}parse(i){return a.JSON.parse(i,void 0)}};function Ai(){}function wi(){}var $e={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function $r(){y.call(this,"d")}I($r,y);function zr(){y.call(this,"c")}I(zr,y);var ie={},Ri=null;function On(){return Ri=Ri||new mt}ie.Ia="serverreachability";function Si(i){y.call(this,ie.Ia,i)}I(Si,y);function ze(i){const u=On();yt(u,new Si(u))}ie.STAT_EVENT="statevent";function Pi(i,u){y.call(this,ie.STAT_EVENT,i),this.stat=u}I(Pi,y);function Et(i){const u=On();yt(u,new Pi(u,i))}ie.Ja="timingevent";function Vi(i,u){y.call(this,ie.Ja,i),this.size=u}I(Vi,y);function Ge(i,u){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){i()},u)}function He(){this.g=!0}He.prototype.ua=function(){this.g=!1};function Ic(i,u,c,f,v,w){i.info(function(){if(i.g)if(w){var C="",U=w.split("&");for(let K=0;K<U.length;K++){var rt=U[K].split("=");if(rt.length>1){const ut=rt[0];rt=rt[1];const Ct=ut.split("_");C=Ct.length>=2&&Ct[1]=="type"?C+(ut+"="+rt+"&"):C+(ut+"=redacted&")}}}else C=null;else C=w;return"XMLHTTP REQ ("+f+") [attempt "+v+"]: "+u+`
`+c+`
`+C})}function vc(i,u,c,f,v,w,C){i.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+v+"]: "+u+`
`+c+`
`+w+" "+C})}function Ie(i,u,c,f){i.info(function(){return"XMLHTTP TEXT ("+u+"): "+wc(i,c)+(f?" "+f:"")})}function Ac(i,u){i.info(function(){return"TIMEOUT: "+u})}He.prototype.info=function(){};function wc(i,u){if(!i.g)return u;if(!u)return null;try{const w=JSON.parse(u);if(w){for(i=0;i<w.length;i++)if(Array.isArray(w[i])){var c=w[i];if(!(c.length<2)){var f=c[1];if(Array.isArray(f)&&!(f.length<1)){var v=f[0];if(v!="noop"&&v!="stop"&&v!="close")for(let C=1;C<f.length;C++)f[C]=""}}}}return qr(w)}catch{return u}}var xn={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ci={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},bi;function Gr(){}I(Gr,Ai),Gr.prototype.g=function(){return new XMLHttpRequest},bi=new Gr;function Ke(i){return encodeURIComponent(String(i))}function Rc(i){var u=1;i=i.split(":");const c=[];for(;u>0&&i.length;)c.push(i.shift()),u--;return i.length&&c.push(i.join(":")),c}function qt(i,u,c,f){this.j=i,this.i=u,this.l=c,this.S=f||1,this.V=new qe(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Di}function Di(){this.i=null,this.g="",this.h=!1}var Ni={},Hr={};function Kr(i,u,c){i.M=1,i.A=Ln(Vt(u)),i.u=c,i.R=!0,ki(i,null)}function ki(i,u){i.F=Date.now(),Mn(i),i.B=Vt(i.A);var c=i.B,f=i.S;Array.isArray(f)||(f=[String(f)]),Hi(c.i,"t",f),i.C=0,c=i.j.L,i.h=new Di,i.g=lo(i.j,c?u:null,!i.u),i.P>0&&(i.O=new yc(d(i.Y,i,i.g),i.P)),u=i.V,c=i.g,f=i.ba;var v="readystatechange";Array.isArray(v)||(v&&(Ii[0]=v.toString()),v=Ii);for(let w=0;w<v.length;w++){const C=pi(c,v[w],f||u.handleEvent,!1,u.h||u);if(!C)break;u.g[C.key]=C}u=i.J?di(i.J):{},i.u?(i.v||(i.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,u)):(i.v="GET",i.g.ea(i.B,i.v,null,u)),ze(),Ic(i.i,i.v,i.B,i.l,i.S,i.u)}qt.prototype.ba=function(i){i=i.target;const u=this.O;u&&Gt(i)==3?u.j():this.Y(i)},qt.prototype.Y=function(i){try{if(i==this.g)t:{const U=Gt(this.g),rt=this.g.ya(),K=this.g.ca();if(!(U<3)&&(U!=3||this.g&&(this.h.h||this.g.la()||Zi(this.g)))){this.K||U!=4||rt==7||(rt==8||K<=0?ze(3):ze(2)),Wr(this);var u=this.g.ca();this.X=u;var c=Sc(this);if(this.o=u==200,vc(this.i,this.v,this.B,this.l,this.S,U,u),this.o){if(this.U&&!this.L){e:{if(this.g){var f,v=this.g;if((f=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!p(f)){var w=f;break e}}w=null}if(i=w)Ie(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Qr(this,i);else{this.o=!1,this.m=3,Et(12),oe(this),We(this);break t}}if(this.R){i=!0;let ut;for(;!this.K&&this.C<c.length;)if(ut=Pc(this,c),ut==Hr){U==4&&(this.m=4,Et(14),i=!1),Ie(this.i,this.l,null,"[Incomplete Response]");break}else if(ut==Ni){this.m=4,Et(15),Ie(this.i,this.l,c,"[Invalid Chunk]"),i=!1;break}else Ie(this.i,this.l,ut,null),Qr(this,ut);if(Oi(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),U!=4||c.length!=0||this.h.h||(this.m=1,Et(16),i=!1),this.o=this.o&&i,!i)Ie(this.i,this.l,c,"[Invalid Chunked Response]"),oe(this),We(this);else if(c.length>0&&!this.W){this.W=!0;var C=this.j;C.g==this&&C.aa&&!C.P&&(C.j.info("Great, no buffering proxy detected. Bytes received: "+c.length),rs(C),C.P=!0,Et(11))}}else Ie(this.i,this.l,c,null),Qr(this,c);U==4&&oe(this),this.o&&!this.K&&(U==4?oo(this.j,this):(this.o=!1,Mn(this)))}else jc(this.g),u==400&&c.indexOf("Unknown SID")>0?(this.m=3,Et(12)):(this.m=0,Et(13)),oe(this),We(this)}}}catch{}finally{}};function Sc(i){if(!Oi(i))return i.g.la();const u=Zi(i.g);if(u==="")return"";let c="";const f=u.length,v=Gt(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return oe(i),We(i),"";i.h.i=new a.TextDecoder}for(let w=0;w<f;w++)i.h.h=!0,c+=i.h.i.decode(u[w],{stream:!(v&&w==f-1)});return u.length=0,i.h.g+=c,i.C=0,i.h.g}function Oi(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function Pc(i,u){var c=i.C,f=u.indexOf(`
`,c);return f==-1?Hr:(c=Number(u.substring(c,f)),isNaN(c)?Ni:(f+=1,f+c>u.length?Hr:(u=u.slice(f,f+c),i.C=f+c,u)))}qt.prototype.cancel=function(){this.K=!0,oe(this)};function Mn(i){i.T=Date.now()+i.H,xi(i,i.H)}function xi(i,u){if(i.D!=null)throw Error("WatchDog timer not null");i.D=Ge(d(i.aa,i),u)}function Wr(i){i.D&&(a.clearTimeout(i.D),i.D=null)}qt.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(Ac(this.i,this.B),this.M!=2&&(ze(),Et(17)),oe(this),this.m=2,We(this)):xi(this,this.T-i)};function We(i){i.j.I==0||i.K||oo(i.j,i)}function oe(i){Wr(i);var u=i.O;u&&typeof u.dispose=="function"&&u.dispose(),i.O=null,vi(i.V),i.g&&(u=i.g,i.g=null,u.abort(),u.dispose())}function Qr(i,u){try{var c=i.j;if(c.I!=0&&(c.g==i||Jr(c.h,i))){if(!i.L&&Jr(c.h,i)&&c.I==3){try{var f=c.Ba.g.parse(u)}catch{f=null}if(Array.isArray(f)&&f.length==3){var v=f;if(v[0]==0){t:if(!c.v){if(c.g)if(c.g.F+3e3<i.F)qn(c),Bn(c);else break t;ns(c),Et(18)}}else c.xa=v[1],0<c.xa-c.K&&v[2]<37500&&c.F&&c.A==0&&!c.C&&(c.C=Ge(d(c.Va,c),6e3));Fi(c.h)<=1&&c.ta&&(c.ta=void 0)}else ue(c,11)}else if((i.L||c.g==i)&&qn(c),!p(u))for(v=c.Ba.g.parse(u),u=0;u<v.length;u++){let K=v[u];const ut=K[0];if(!(ut<=c.K))if(c.K=ut,K=K[1],c.I==2)if(K[0]=="c"){c.M=K[1],c.ba=K[2];const Ct=K[3];Ct!=null&&(c.ka=Ct,c.j.info("VER="+c.ka));const ce=K[4];ce!=null&&(c.za=ce,c.j.info("SVER="+c.za));const Ht=K[5];Ht!=null&&typeof Ht=="number"&&Ht>0&&(f=1.5*Ht,c.O=f,c.j.info("backChannelRequestTimeoutMs_="+f)),f=c;const Kt=i.g;if(Kt){const zn=Kt.g?Kt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(zn){var w=f.h;w.g||zn.indexOf("spdy")==-1&&zn.indexOf("quic")==-1&&zn.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(Xr(w,w.h),w.h=null))}if(f.G){const ss=Kt.g?Kt.g.getResponseHeader("X-HTTP-Session-Id"):null;ss&&(f.wa=ss,Q(f.J,f.G,ss))}}c.I=3,c.l&&c.l.ra(),c.aa&&(c.T=Date.now()-i.F,c.j.info("Handshake RTT: "+c.T+"ms")),f=c;var C=i;if(f.na=co(f,f.L?f.ba:null,f.W),C.L){Ui(f.h,C);var U=C,rt=f.O;rt&&(U.H=rt),U.D&&(Wr(U),Mn(U)),f.g=C}else so(f);c.i.length>0&&jn(c)}else K[0]!="stop"&&K[0]!="close"||ue(c,7);else c.I==3&&(K[0]=="stop"||K[0]=="close"?K[0]=="stop"?ue(c,7):es(c):K[0]!="noop"&&c.l&&c.l.qa(K),c.A=0)}}ze(4)}catch{}}var Vc=class{constructor(i,u){this.g=i,this.map=u}};function Mi(i){this.l=i||10,a.PerformanceNavigationTiming?(i=a.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Li(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Fi(i){return i.h?1:i.g?i.g.size:0}function Jr(i,u){return i.h?i.h==u:i.g?i.g.has(u):!1}function Xr(i,u){i.g?i.g.add(u):i.h=u}function Ui(i,u){i.h&&i.h==u?i.h=null:i.g&&i.g.has(u)&&i.g.delete(u)}Mi.prototype.cancel=function(){if(this.i=Bi(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Bi(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let u=i.i;for(const c of i.g.values())u=u.concat(c.G);return u}return V(i.i)}var ji=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Cc(i,u){if(i){i=i.split("&");for(let c=0;c<i.length;c++){const f=i[c].indexOf("=");let v,w=null;f>=0?(v=i[c].substring(0,f),w=i[c].substring(f+1)):v=i[c],u(v,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function $t(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;i instanceof $t?(this.l=i.l,Qe(this,i.j),this.o=i.o,this.g=i.g,Je(this,i.u),this.h=i.h,Yr(this,Ki(i.i)),this.m=i.m):i&&(u=String(i).match(ji))?(this.l=!1,Qe(this,u[1]||"",!0),this.o=Xe(u[2]||""),this.g=Xe(u[3]||"",!0),Je(this,u[4]),this.h=Xe(u[5]||"",!0),Yr(this,u[6]||"",!0),this.m=Xe(u[7]||"")):(this.l=!1,this.i=new Ze(null,this.l))}$t.prototype.toString=function(){const i=[];var u=this.j;u&&i.push(Ye(u,qi,!0),":");var c=this.g;return(c||u=="file")&&(i.push("//"),(u=this.o)&&i.push(Ye(u,qi,!0),"@"),i.push(Ke(c).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.u,c!=null&&i.push(":",String(c))),(c=this.h)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(Ye(c,c.charAt(0)=="/"?Nc:Dc,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",Ye(c,Oc)),i.join("")},$t.prototype.resolve=function(i){const u=Vt(this);let c=!!i.j;c?Qe(u,i.j):c=!!i.o,c?u.o=i.o:c=!!i.g,c?u.g=i.g:c=i.u!=null;var f=i.h;if(c)Je(u,i.u);else if(c=!!i.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var v=u.h.lastIndexOf("/");v!=-1&&(f=u.h.slice(0,v+1)+f)}if(v=f,v==".."||v==".")f="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){f=v.lastIndexOf("/",0)==0,v=v.split("/");const w=[];for(let C=0;C<v.length;){const U=v[C++];U=="."?f&&C==v.length&&w.push(""):U==".."?((w.length>1||w.length==1&&w[0]!="")&&w.pop(),f&&C==v.length&&w.push("")):(w.push(U),f=!0)}f=w.join("/")}else f=v}return c?u.h=f:c=i.i.toString()!=="",c?Yr(u,Ki(i.i)):c=!!i.m,c&&(u.m=i.m),u};function Vt(i){return new $t(i)}function Qe(i,u,c){i.j=c?Xe(u,!0):u,i.j&&(i.j=i.j.replace(/:$/,""))}function Je(i,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);i.u=u}else i.u=null}function Yr(i,u,c){u instanceof Ze?(i.i=u,xc(i.i,i.l)):(c||(u=Ye(u,kc)),i.i=new Ze(u,i.l))}function Q(i,u,c){i.i.set(u,c)}function Ln(i){return Q(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function Xe(i,u){return i?u?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function Ye(i,u,c){return typeof i=="string"?(i=encodeURI(i).replace(u,bc),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function bc(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var qi=/[#\/\?@]/g,Dc=/[#\?:]/g,Nc=/[#\?]/g,kc=/[#\?@]/g,Oc=/#/g;function Ze(i,u){this.h=this.g=null,this.i=i||null,this.j=!!u}function ae(i){i.g||(i.g=new Map,i.h=0,i.i&&Cc(i.i,function(u,c){i.add(decodeURIComponent(u.replace(/\+/g," ")),c)}))}n=Ze.prototype,n.add=function(i,u){ae(this),this.i=null,i=ve(this,i);let c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(u),this.h+=1,this};function $i(i,u){ae(i),u=ve(i,u),i.g.has(u)&&(i.i=null,i.h-=i.g.get(u).length,i.g.delete(u))}function zi(i,u){return ae(i),u=ve(i,u),i.g.has(u)}n.forEach=function(i,u){ae(this),this.g.forEach(function(c,f){c.forEach(function(v){i.call(u,v,f,this)},this)},this)};function Gi(i,u){ae(i);let c=[];if(typeof u=="string")zi(i,u)&&(c=c.concat(i.g.get(ve(i,u))));else for(i=Array.from(i.g.values()),u=0;u<i.length;u++)c=c.concat(i[u]);return c}n.set=function(i,u){return ae(this),this.i=null,i=ve(this,i),zi(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[u]),this.h+=1,this},n.get=function(i,u){return i?(i=Gi(this,i),i.length>0?String(i[0]):u):u};function Hi(i,u,c){$i(i,u),c.length>0&&(i.i=null,i.g.set(ve(i,u),V(c)),i.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],u=Array.from(this.g.keys());for(let f=0;f<u.length;f++){var c=u[f];const v=Ke(c);c=Gi(this,c);for(let w=0;w<c.length;w++){let C=v;c[w]!==""&&(C+="="+Ke(c[w])),i.push(C)}}return this.i=i.join("&")};function Ki(i){const u=new Ze;return u.i=i.i,i.g&&(u.g=new Map(i.g),u.h=i.h),u}function ve(i,u){return u=String(u),i.j&&(u=u.toLowerCase()),u}function xc(i,u){u&&!i.j&&(ae(i),i.i=null,i.g.forEach(function(c,f){const v=f.toLowerCase();f!=v&&($i(this,f),Hi(this,v,c))},i)),i.j=u}function Mc(i,u){const c=new He;if(a.Image){const f=new Image;f.onload=_(zt,c,"TestLoadImage: loaded",!0,u,f),f.onerror=_(zt,c,"TestLoadImage: error",!1,u,f),f.onabort=_(zt,c,"TestLoadImage: abort",!1,u,f),f.ontimeout=_(zt,c,"TestLoadImage: timeout",!1,u,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=i}else u(!1)}function Lc(i,u){const c=new He,f=new AbortController,v=setTimeout(()=>{f.abort(),zt(c,"TestPingServer: timeout",!1,u)},1e4);fetch(i,{signal:f.signal}).then(w=>{clearTimeout(v),w.ok?zt(c,"TestPingServer: ok",!0,u):zt(c,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(v),zt(c,"TestPingServer: error",!1,u)})}function zt(i,u,c,f,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),f(c)}catch{}}function Fc(){this.g=new Tc}function Zr(i){this.i=i.Sb||null,this.h=i.ab||!1}I(Zr,Ai),Zr.prototype.g=function(){return new Fn(this.i,this.h)};function Fn(i,u){mt.call(this),this.H=i,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}I(Fn,mt),n=Fn.prototype,n.open=function(i,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=u,this.readyState=1,en(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(u.body=i),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,tn(this)),this.readyState=0},n.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,en(this)),this.g&&(this.readyState=3,en(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Wi(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function Wi(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}n.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var u=i.value?i.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!i.done}))&&(this.response=this.responseText+=u)}i.done?tn(this):en(this),this.readyState==3&&Wi(this)}},n.Oa=function(i){this.g&&(this.response=this.responseText=i,tn(this))},n.Na=function(i){this.g&&(this.response=i,tn(this))},n.ga=function(){this.g&&tn(this)};function tn(i){i.readyState=4,i.l=null,i.j=null,i.B=null,en(i)}n.setRequestHeader=function(i,u){this.A.append(i,u)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],u=this.h.entries();for(var c=u.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=u.next();return i.join(`\r
`)};function en(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Fn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Qi(i){let u="";return Dn(i,function(c,f){u+=f,u+=":",u+=c,u+=`\r
`}),u}function ts(i,u,c){t:{for(f in c){var f=!1;break t}f=!0}f||(c=Qi(c),typeof i=="string"?c!=null&&Ke(c):Q(i,u,c))}function Z(i){mt.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}I(Z,mt);var Uc=/^https?$/i,Bc=["POST","PUT"];n=Z.prototype,n.Fa=function(i){this.H=i},n.ea=function(i,u,c,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);u=u?u.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():bi.g(),this.g.onreadystatechange=R(d(this.Ca,this));try{this.B=!0,this.g.open(u,String(i),!0),this.B=!1}catch(w){Ji(this,w);return}if(i=c||"",c=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var v in f)c.set(v,f[v]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const w of f.keys())c.set(w,f.get(w));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(c.keys()).find(w=>w.toLowerCase()=="content-type"),v=a.FormData&&i instanceof a.FormData,!(Array.prototype.indexOf.call(Bc,u,void 0)>=0)||f||v||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,C]of c)this.g.setRequestHeader(w,C);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(w){Ji(this,w)}};function Ji(i,u){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=u,i.o=5,Xi(i),Un(i)}function Xi(i){i.A||(i.A=!0,yt(i,"complete"),yt(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,yt(this,"complete"),yt(this,"abort"),Un(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Un(this,!0)),Z.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Yi(this):this.Xa())},n.Xa=function(){Yi(this)};function Yi(i){if(i.h&&typeof o<"u"){if(i.v&&Gt(i)==4)setTimeout(i.Ca.bind(i),0);else if(yt(i,"readystatechange"),Gt(i)==4){i.h=!1;try{const w=i.ca();t:switch(w){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var c;if(!(c=u)){var f;if(f=w===0){let C=String(i.D).match(ji)[1]||null;!C&&a.self&&a.self.location&&(C=a.self.location.protocol.slice(0,-1)),f=!Uc.test(C?C.toLowerCase():"")}c=f}if(c)yt(i,"complete"),yt(i,"success");else{i.o=6;try{var v=Gt(i)>2?i.g.statusText:""}catch{v=""}i.l=v+" ["+i.ca()+"]",Xi(i)}}finally{Un(i)}}}}function Un(i,u){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const c=i.g;i.g=null,u||yt(i,"ready");try{c.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Gt(i){return i.g?i.g.readyState:0}n.ca=function(){try{return Gt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(i){if(this.g){var u=this.g.responseText;return i&&u.indexOf(i)==0&&(u=u.substring(i.length)),Ec(u)}};function Zi(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function jc(i){const u={};i=(i.g&&Gt(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<i.length;f++){if(p(i[f]))continue;var c=Rc(i[f]);const v=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const w=u[v]||[];u[v]=w,w.push(c)}dc(u,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function nn(i,u,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||u}function to(i){this.za=0,this.i=[],this.j=new He,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=nn("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=nn("baseRetryDelayMs",5e3,i),this.Za=nn("retryDelaySeedMs",1e4,i),this.Ta=nn("forwardChannelMaxRetries",2,i),this.va=nn("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new Mi(i&&i.concurrentRequestLimit),this.Ba=new Fc,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=to.prototype,n.ka=8,n.I=1,n.connect=function(i,u,c,f){Et(0),this.W=i,this.H=u||{},c&&f!==void 0&&(this.H.OSID=c,this.H.OAID=f),this.F=this.X,this.J=co(this,null,this.W),jn(this)};function es(i){if(eo(i),i.I==3){var u=i.V++,c=Vt(i.J);if(Q(c,"SID",i.M),Q(c,"RID",u),Q(c,"TYPE","terminate"),rn(i,c),u=new qt(i,i.j,u),u.M=2,u.A=Ln(Vt(c)),c=!1,a.navigator&&a.navigator.sendBeacon)try{c=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!c&&a.Image&&(new Image().src=u.A,c=!0),c||(u.g=lo(u.j,null),u.g.ea(u.A)),u.F=Date.now(),Mn(u)}uo(i)}function Bn(i){i.g&&(rs(i),i.g.cancel(),i.g=null)}function eo(i){Bn(i),i.v&&(a.clearTimeout(i.v),i.v=null),qn(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&a.clearTimeout(i.m),i.m=null)}function jn(i){if(!Li(i.h)&&!i.m){i.m=!0;var u=i.Ea;ot||m(),at||(ot(),at=!0),T.add(u,i),i.D=0}}function qc(i,u){return Fi(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=u.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=Ge(d(i.Ea,i,u),ao(i,i.D)),i.D++,!0)}n.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const v=new qt(this,this.j,i);let w=this.o;if(this.U&&(w?(w=di(w),gi(w,this.U)):w=this.U),this.u!==null||this.R||(v.J=w,w=null),this.S)t:{for(var u=0,c=0;c<this.i.length;c++){e:{var f=this.i[c];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break e}f=void 0}if(f===void 0)break;if(u+=f,u>4096){u=c;break t}if(u===4096||c===this.i.length-1){u=c+1;break t}}u=1e3}else u=1e3;u=ro(this,v,u),c=Vt(this.J),Q(c,"RID",i),Q(c,"CVER",22),this.G&&Q(c,"X-HTTP-Session-Id",this.G),rn(this,c),w&&(this.R?u="headers="+Ke(Qi(w))+"&"+u:this.u&&ts(c,this.u,w)),Xr(this.h,v),this.Ra&&Q(c,"TYPE","init"),this.S?(Q(c,"$req",u),Q(c,"SID","null"),v.U=!0,Kr(v,c,null)):Kr(v,c,u),this.I=2}}else this.I==3&&(i?no(this,i):this.i.length==0||Li(this.h)||no(this))};function no(i,u){var c;u?c=u.l:c=i.V++;const f=Vt(i.J);Q(f,"SID",i.M),Q(f,"RID",c),Q(f,"AID",i.K),rn(i,f),i.u&&i.o&&ts(f,i.u,i.o),c=new qt(i,i.j,c,i.D+1),i.u===null&&(c.J=i.o),u&&(i.i=u.G.concat(i.i)),u=ro(i,c,1e3),c.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),Xr(i.h,c),Kr(c,f,u)}function rn(i,u){i.H&&Dn(i.H,function(c,f){Q(u,f,c)}),i.l&&Dn({},function(c,f){Q(u,f,c)})}function ro(i,u,c){c=Math.min(i.i.length,c);const f=i.l?d(i.l.Ka,i.l,i):null;t:{var v=i.i;let U=-1;for(;;){const rt=["count="+c];U==-1?c>0?(U=v[0].g,rt.push("ofs="+U)):U=0:rt.push("ofs="+U);let K=!0;for(let ut=0;ut<c;ut++){var w=v[ut].g;const Ct=v[ut].map;if(w-=U,w<0)U=Math.max(0,v[ut].g-100),K=!1;else try{w="req"+w+"_"||"";try{var C=Ct instanceof Map?Ct:Object.entries(Ct);for(const[ce,Ht]of C){let Kt=Ht;l(Ht)&&(Kt=qr(Ht)),rt.push(w+ce+"="+encodeURIComponent(Kt))}}catch(ce){throw rt.push(w+"type="+encodeURIComponent("_badmap")),ce}}catch{f&&f(Ct)}}if(K){C=rt.join("&");break t}}C=void 0}return i=i.i.splice(0,c),u.G=i,C}function so(i){if(!i.g&&!i.v){i.Y=1;var u=i.Da;ot||m(),at||(ot(),at=!0),T.add(u,i),i.A=0}}function ns(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=Ge(d(i.Da,i),ao(i,i.A)),i.A++,!0)}n.Da=function(){if(this.v=null,io(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=Ge(d(this.Wa,this),i)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Et(10),Bn(this),io(this))};function rs(i){i.B!=null&&(a.clearTimeout(i.B),i.B=null)}function io(i){i.g=new qt(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var u=Vt(i.na);Q(u,"RID","rpc"),Q(u,"SID",i.M),Q(u,"AID",i.K),Q(u,"CI",i.F?"0":"1"),!i.F&&i.ia&&Q(u,"TO",i.ia),Q(u,"TYPE","xmlhttp"),rn(i,u),i.u&&i.o&&ts(u,i.u,i.o),i.O&&(i.g.H=i.O);var c=i.g;i=i.ba,c.M=1,c.A=Ln(Vt(u)),c.u=null,c.R=!0,ki(c,i)}n.Va=function(){this.C!=null&&(this.C=null,Bn(this),ns(this),Et(19))};function qn(i){i.C!=null&&(a.clearTimeout(i.C),i.C=null)}function oo(i,u){var c=null;if(i.g==u){qn(i),rs(i),i.g=null;var f=2}else if(Jr(i.h,u))c=u.G,Ui(i.h,u),f=1;else return;if(i.I!=0){if(u.o)if(f==1){c=u.u?u.u.length:0,u=Date.now()-u.F;var v=i.D;f=On(),yt(f,new Vi(f,c)),jn(i)}else so(i);else if(v=u.m,v==3||v==0&&u.X>0||!(f==1&&qc(i,u)||f==2&&ns(i)))switch(c&&c.length>0&&(u=i.h,u.i=u.i.concat(c)),v){case 1:ue(i,5);break;case 4:ue(i,10);break;case 3:ue(i,6);break;default:ue(i,2)}}}function ao(i,u){let c=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(c*=2),c*u}function ue(i,u){if(i.j.info("Error code "+u),u==2){var c=d(i.bb,i),f=i.Ua;const v=!f;f=new $t(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Qe(f,"https"),Ln(f),v?Mc(f.toString(),c):Lc(f.toString(),c)}else Et(2);i.I=0,i.l&&i.l.pa(u),uo(i),eo(i)}n.bb=function(i){i?(this.j.info("Successfully pinged google.com"),Et(2)):(this.j.info("Failed to ping google.com"),Et(1))};function uo(i){if(i.I=0,i.ja=[],i.l){const u=Bi(i.h);(u.length!=0||i.i.length!=0)&&(N(i.ja,u),N(i.ja,i.i),i.h.i.length=0,V(i.i),i.i.length=0),i.l.oa()}}function co(i,u,c){var f=c instanceof $t?Vt(c):new $t(c);if(f.g!="")u&&(f.g=u+"."+f.g),Je(f,f.u);else{var v=a.location;f=v.protocol,u=u?u+"."+v.hostname:v.hostname,v=+v.port;const w=new $t(null);f&&Qe(w,f),u&&(w.g=u),v&&Je(w,v),c&&(w.h=c),f=w}return c=i.G,u=i.wa,c&&u&&Q(f,c,u),Q(f,"VER",i.ka),rn(i,f),f}function lo(i,u,c){if(u&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=i.Aa&&!i.ma?new Z(new Zr({ab:c})):new Z(i.ma),u.Fa(i.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ho(){}n=ho.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function $n(){}$n.prototype.g=function(i,u){return new At(i,u)};function At(i,u){mt.call(this),this.g=new to(u),this.l=i,this.h=u&&u.messageUrlParams||null,i=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(i?i["X-WebChannel-Content-Type"]=u.messageContentType:i={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(i?i["X-WebChannel-Client-Profile"]=u.sa:i={"X-WebChannel-Client-Profile":u.sa}),this.g.U=i,(i=u&&u.Qb)&&!p(i)&&(this.g.u=i),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!p(u)&&(this.g.G=u,i=this.h,i!==null&&u in i&&(i=this.h,u in i&&delete i[u])),this.j=new Ae(this)}I(At,mt),At.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},At.prototype.close=function(){es(this.g)},At.prototype.o=function(i){var u=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.v&&(c={},c.__data__=qr(i),i=c);u.i.push(new Vc(u.Ya++,i)),u.I==3&&jn(u)},At.prototype.N=function(){this.g.l=null,delete this.j,es(this.g),delete this.g,At.Z.N.call(this)};function fo(i){$r.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var u=i.__sm__;if(u){t:{for(const c in u){i=c;break t}i=void 0}(this.i=i)&&(i=this.i,u=u!==null&&i in u?u[i]:void 0),this.data=u}else this.data=i}I(fo,$r);function mo(){zr.call(this),this.status=1}I(mo,zr);function Ae(i){this.g=i}I(Ae,ho),Ae.prototype.ra=function(){yt(this.g,"a")},Ae.prototype.qa=function(i){yt(this.g,new fo(i))},Ae.prototype.pa=function(i){yt(this.g,new mo)},Ae.prototype.oa=function(){yt(this.g,"b")},$n.prototype.createWebChannel=$n.prototype.g,At.prototype.send=At.prototype.o,At.prototype.open=At.prototype.m,At.prototype.close=At.prototype.close,qa=function(){return new $n},ja=function(){return On()},Ba=ie,Es={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},xn.NO_ERROR=0,xn.TIMEOUT=8,xn.HTTP_ERROR=6,Yn=xn,Ci.COMPLETE="complete",Ua=Ci,wi.EventType=$e,$e.OPEN="a",$e.CLOSE="b",$e.ERROR="c",$e.MESSAGE="d",mt.prototype.listen=mt.prototype.J,on=wi,Z.prototype.listenOnce=Z.prototype.K,Z.prototype.getLastError=Z.prototype.Ha,Z.prototype.getLastErrorCode=Z.prototype.ya,Z.prototype.getStatus=Z.prototype.ca,Z.prototype.getResponseJson=Z.prototype.La,Z.prototype.getResponseText=Z.prototype.la,Z.prototype.send=Z.prototype.ea,Z.prototype.setWithCredentials=Z.prototype.Fa,Fa=Z}).apply(typeof Gn<"u"?Gn:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}pt.UNAUTHENTICATED=new pt(null),pt.GOOGLE_CREDENTIALS=new pt("google-credentials-uid"),pt.FIRST_PARTY=new pt("first-party-uid"),pt.MOCK_USER=new pt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fe="12.13.0";function Vh(n){Fe=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ge=new Da("@firebase/firestore");function we(){return ge.logLevel}function b(n,...t){if(ge.logLevel<=$.DEBUG){const e=t.map(Fs);ge.debug(`Firestore (${Fe}): ${n}`,...e)}}function Bt(n,...t){if(ge.logLevel<=$.ERROR){const e=t.map(Fs);ge.error(`Firestore (${Fe}): ${n}`,...e)}}function pe(n,...t){if(ge.logLevel<=$.WARN){const e=t.map(Fs);ge.warn(`Firestore (${Fe}): ${n}`,...e)}}function Fs(n){if(typeof n=="string")return n;try{return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,$a(n,r,e)}function $a(n,t,e){let r=`FIRESTORE (${Fe}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Bt(r),new Error(r)}function G(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||$a(t,s,r)}function F(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends Le{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Ch{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(pt.UNAUTHENTICATED))}shutdown(){}}class bh{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Dh{constructor(t){this.t=t,this.currentUser=pt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){G(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new de;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new de,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},l=h=>{b("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>l(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?l(h):(b("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new de)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(b("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(G(typeof r.accessToken=="string",31837,{l:r}),new za(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return G(t===null||typeof t=="string",2055,{h:t}),new pt(t)}}class Nh{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=pt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class kh{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new Nh(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(pt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class So{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Oh{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,hh(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){G(this.o===void 0,3512);const r=o=>{o.error!=null&&b("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,b("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const s=o=>{b("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):b("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new So(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(G(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new So(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xh(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=xh(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function B(n,t){return n<t?-1:n>t?1:0}function Ts(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),o=t.charAt(r);if(s!==o)return cs(s)===cs(o)?B(s,o):cs(s)?1:-1}return B(n.length,t.length)}const Mh=55296,Lh=57343;function cs(n){const t=n.charCodeAt(0);return t>=Mh&&t<=Lh}function ke(n,t,e){return n.length===t.length&&n.every((r,s)=>e(r,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Po="__name__";class bt{constructor(t,e,r){e===void 0?e=0:e>t.length&&M(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&M(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return bt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof bt?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=bt.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return B(t.length,e.length)}static compareSegments(t,e){const r=bt.isNumericId(t),s=bt.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?bt.extractNumericId(t).compare(bt.extractNumericId(e)):Ts(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Jt.fromString(t.substring(4,t.length-2))}}class Y extends bt{construct(t,e,r){return new Y(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new k(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(s=>s.length>0))}return new Y(e)}static emptyPath(){return new Y([])}}const Fh=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ft extends bt{construct(t,e,r){return new ft(t,e,r)}static isValidIdentifier(t){return Fh.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ft.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Po}static keyField(){return new ft([Po])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new k(P.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new k(P.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new k(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(o(),s++)}if(o(),a)throw new k(P.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ft(e)}static emptyPath(){return new ft([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(t){this.path=t}static fromPath(t){return new x(Y.fromString(t))}static fromName(t){return new x(Y.fromString(t).popFirst(5))}static empty(){return new x(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Y.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Y.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new x(new Y(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uh(n,t,e){if(!e)throw new k(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Bh(n,t,e,r){if(t===!0&&r===!0)throw new k(P.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Vo(n){if(!x.isDocumentKey(n))throw new k(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Ga(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Bs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":M(12329,{type:typeof n})}function Ce(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new k(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Bs(n);throw new k(P.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(n,t){const e={typeString:n};return t&&(e.value=t),e}function wn(n,t){if(!Ga(n))throw new k(P.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new k(P.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Co=-62135596800,bo=1e6;class J{static now(){return J.fromMillis(Date.now())}static fromDate(t){return J.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*bo);return new J(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new k(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new k(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Co)throw new k(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new k(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/bo}_compareTo(t){return this.seconds===t.seconds?B(this.nanoseconds,t.nanoseconds):B(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:J._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(wn(t,J._jsonSchema))return new J(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Co;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}J._jsonSchemaVersion="firestore/timestamp/1.0",J._jsonSchema={type:nt("string",J._jsonSchemaVersion),seconds:nt("number"),nanoseconds:nt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{static fromTimestamp(t){return new L(t)}static min(){return new L(new J(0,0))}static max(){return new L(new J(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n=-1;function jh(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=L.fromTimestamp(r===1e9?new J(e+1,0):new J(e,r));return new Xt(s,x.empty(),t)}function qh(n){return new Xt(n.readTime,n.key,_n)}class Xt{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Xt(L.min(),x.empty(),_n)}static max(){return new Xt(L.max(),x.empty(),_n)}}function $h(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=x.comparator(n.documentKey,t.documentKey),e!==0?e:B(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Gh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ue(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==zh)throw n;b("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new S((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof S?e:S.resolve(e)}catch(e){return S.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):S.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):S.reject(e)}static resolve(t){return new S((e,r)=>{e(t)})}static reject(t){return new S((e,r)=>{r(t)})}static waitFor(t){return new S((e,r)=>{let s=0,o=0,a=!1;t.forEach(l=>{++s,l.next(()=>{++o,a&&o===s&&e()},h=>r(h))}),a=!0,o===s&&e()})}static or(t){let e=S.resolve(!1);for(const r of t)e=e.next(s=>s?S.resolve(s):r());return e}static forEach(t,e){const r=[];return t.forEach((s,o)=>{r.push(e.call(this,s,o))}),this.waitFor(r)}static mapArray(t,e){return new S((r,s)=>{const o=t.length,a=new Array(o);let l=0;for(let h=0;h<o;h++){const d=h;e(t[d]).next(_=>{a[d]=_,++l,l===o&&r(a)},_=>s(_))}})}static doWhile(t,e){return new S((r,s)=>{const o=()=>{t()===!0?e().next(()=>{o()},s):r()};o()})}}function Hh(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Be(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Ir.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const js=-1;function vr(n){return n==null}function ur(n){return n===0&&1/n==-1/0}function Kh(n){return typeof n=="number"&&Number.isInteger(n)&&!ur(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ha="";function Wh(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Do(t)),t=Qh(n.get(e),t);return Do(t)}function Qh(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case Ha:e+="";break;default:e+=o}}return e}function Do(n){return n+Ha+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function No(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function _e(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Ka(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(t,e){this.comparator=t,this.root=e||ht.EMPTY}insert(t,e){return new X(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ht.BLACK,null,null))}remove(t){return new X(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ht.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Hn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Hn(this.root,t,this.comparator,!1)}getReverseIterator(){return new Hn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Hn(this.root,t,this.comparator,!0)}}class Hn{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ht{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??ht.RED,this.left=s??ht.EMPTY,this.right=o??ht.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new ht(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ht.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return ht.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ht.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ht.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw M(27949);return t+(this.isRed()?0:1)}}ht.EMPTY=null,ht.RED=!0,ht.BLACK=!1;ht.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new ht(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(t){this.comparator=t,this.data=new X(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new ko(this.data.getIterator())}getIteratorFrom(t){return new ko(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof it)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new it(this.comparator);return e.data=t,e}}class ko{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(t){this.fields=t,t.sort(ft.comparator)}static empty(){return new St([])}unionWith(t){let e=new it(ft.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new St(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return ke(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Wa("Invalid base64 string: "+o):o}}(t);return new dt(e)}static fromUint8Array(t){const e=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(t);return new dt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return B(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}dt.EMPTY_BYTE_STRING=new dt("");const Jh=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Yt(n){if(G(!!n,39018),typeof n=="string"){let t=0;const e=Jh.exec(n);if(G(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:tt(n.seconds),nanos:tt(n.nanos)}}function tt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Zt(n){return typeof n=="string"?dt.fromBase64String(n):dt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa="server_timestamp",Ja="__type__",Xa="__previous_value__",Ya="__local_write_time__";function qs(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Ja])==null?void 0:r.stringValue)===Qa}function Ar(n){const t=n.mapValue.fields[Xa];return qs(t)?Ar(t):t}function yn(n){const t=Yt(n.mapValue.fields[Ya].timestampValue);return new J(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(t,e,r,s,o,a,l,h,d,_,I){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=d,this.isUsingEmulator=_,this.apiKey=I}}const cr="(default)";class En{constructor(t,e){this.projectId=t,this.database=e||cr}static empty(){return new En("","")}get isDefaultDatabase(){return this.database===cr}isEqual(t){return t instanceof En&&t.projectId===this.projectId&&t.database===this.database}}function Yh(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new k(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new En(n.options.projectId,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Za="__type__",Zh="__max__",Kn={mapValue:{}},tu="__vector__",lr="value";function te(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?qs(n)?4:ef(n)?9007199254740991:tf(n)?10:11:M(28295,{value:n})}function Ot(n,t){if(n===t)return!0;const e=te(n);if(e!==te(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return yn(n).isEqual(yn(t));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=Yt(s.timestampValue),l=Yt(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,o){return Zt(s.bytesValue).isEqual(Zt(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,o){return tt(s.geoPointValue.latitude)===tt(o.geoPointValue.latitude)&&tt(s.geoPointValue.longitude)===tt(o.geoPointValue.longitude)}(n,t);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return tt(s.integerValue)===tt(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=tt(s.doubleValue),l=tt(o.doubleValue);return a===l?ur(a)===ur(l):isNaN(a)&&isNaN(l)}return!1}(n,t);case 9:return ke(n.arrayValue.values||[],t.arrayValue.values||[],Ot);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},l=o.mapValue.fields||{};if(No(a)!==No(l))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!Ot(a[h],l[h])))return!1;return!0}(n,t);default:return M(52216,{left:n})}}function Tn(n,t){return(n.values||[]).find(e=>Ot(e,t))!==void 0}function Oe(n,t){if(n===t)return 0;const e=te(n),r=te(t);if(e!==r)return B(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return B(n.booleanValue,t.booleanValue);case 2:return function(o,a){const l=tt(o.integerValue||o.doubleValue),h=tt(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1}(n,t);case 3:return Oo(n.timestampValue,t.timestampValue);case 4:return Oo(yn(n),yn(t));case 5:return Ts(n.stringValue,t.stringValue);case 6:return function(o,a){const l=Zt(o),h=Zt(a);return l.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){const l=o.split("/"),h=a.split("/");for(let d=0;d<l.length&&d<h.length;d++){const _=B(l[d],h[d]);if(_!==0)return _}return B(l.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){const l=B(tt(o.latitude),tt(a.latitude));return l!==0?l:B(tt(o.longitude),tt(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return xo(n.arrayValue,t.arrayValue);case 10:return function(o,a){var R,V,N,O;const l=o.fields||{},h=a.fields||{},d=(R=l[lr])==null?void 0:R.arrayValue,_=(V=h[lr])==null?void 0:V.arrayValue,I=B(((N=d==null?void 0:d.values)==null?void 0:N.length)||0,((O=_==null?void 0:_.values)==null?void 0:O.length)||0);return I!==0?I:xo(d,_)}(n.mapValue,t.mapValue);case 11:return function(o,a){if(o===Kn.mapValue&&a===Kn.mapValue)return 0;if(o===Kn.mapValue)return 1;if(a===Kn.mapValue)return-1;const l=o.fields||{},h=Object.keys(l),d=a.fields||{},_=Object.keys(d);h.sort(),_.sort();for(let I=0;I<h.length&&I<_.length;++I){const R=Ts(h[I],_[I]);if(R!==0)return R;const V=Oe(l[h[I]],d[_[I]]);if(V!==0)return V}return B(h.length,_.length)}(n.mapValue,t.mapValue);default:throw M(23264,{he:e})}}function Oo(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return B(n,t);const e=Yt(n),r=Yt(t),s=B(e.seconds,r.seconds);return s!==0?s:B(e.nanos,r.nanos)}function xo(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=Oe(e[s],r[s]);if(o)return o}return B(e.length,r.length)}function xe(n){return Is(n)}function Is(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=Yt(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return Zt(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return x.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=Is(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${Is(e.fields[a])}`;return s+"}"}(n.mapValue):M(61005,{value:n})}function Zn(n){switch(te(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Ar(n);return t?16+Zn(t):16;case 5:return 2*n.stringValue.length;case 6:return Zt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,o)=>s+Zn(o),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return _e(r.fields,(o,a)=>{s+=o.length+Zn(a)}),s}(n.mapValue);default:throw M(13486,{value:n})}}function vs(n){return!!n&&"integerValue"in n}function $s(n){return!!n&&"arrayValue"in n}function Mo(n){return!!n&&"nullValue"in n}function Lo(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function tr(n){return!!n&&"mapValue"in n}function tf(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Za])==null?void 0:r.stringValue)===tu}function ln(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return _e(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=ln(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=ln(n.arrayValue.values[e]);return t}return{...n}}function ef(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Zh}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this.value=t}static empty(){return new wt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!tr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=ln(e)}setAll(t){let e=ft.emptyPath(),r={},s=[];t.forEach((a,l)=>{if(!e.isImmediateParentOf(l)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=l.popLast()}a?r[l.lastSegment()]=ln(a):s.push(l.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());tr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Ot(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];tr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){_e(e,(s,o)=>t[s]=o);for(const s of r)delete t[s]}clone(){return new wt(ln(this.value))}}function eu(n){const t=[];return _e(n.fields,(e,r)=>{const s=new ft([e]);if(tr(r)){const o=eu(r.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)}),new St(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(t,e,r,s,o,a,l){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(t){return new _t(t,0,L.min(),L.min(),L.min(),wt.empty(),0)}static newFoundDocument(t,e,r,s){return new _t(t,1,e,L.min(),r,s,0)}static newNoDocument(t,e){return new _t(t,2,e,L.min(),L.min(),wt.empty(),0)}static newUnknownDocument(t,e){return new _t(t,3,e,L.min(),L.min(),wt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=wt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=wt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof _t&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new _t(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(t,e){this.position=t,this.inclusive=e}}function Fo(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=x.comparator(x.fromName(a.referenceValue),e.key):r=Oe(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Uo(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Ot(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(t,e="asc"){this.field=t,this.dir=e}}function nf(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{}class st extends nu{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new sf(t,e,r):e==="array-contains"?new uf(t,r):e==="in"?new cf(t,r):e==="not-in"?new lf(t,r):e==="array-contains-any"?new hf(t,r):new st(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new of(t,r):new af(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Oe(e,this.value)):e!==null&&te(this.value)===te(e)&&this.matchesComparison(Oe(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class xt extends nu{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new xt(t,e)}matches(t){return ru(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function ru(n){return n.op==="and"}function su(n){return rf(n)&&ru(n)}function rf(n){for(const t of n.filters)if(t instanceof xt)return!1;return!0}function As(n){if(n instanceof st)return n.field.canonicalString()+n.op.toString()+xe(n.value);if(su(n))return n.filters.map(t=>As(t)).join(",");{const t=n.filters.map(e=>As(e)).join(",");return`${n.op}(${t})`}}function iu(n,t){return n instanceof st?function(r,s){return s instanceof st&&r.op===s.op&&r.field.isEqual(s.field)&&Ot(r.value,s.value)}(n,t):n instanceof xt?function(r,s){return s instanceof xt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,a,l)=>o&&iu(a,s.filters[l]),!0):!1}(n,t):void M(19439)}function ou(n){return n instanceof st?function(e){return`${e.field.canonicalString()} ${e.op} ${xe(e.value)}`}(n):n instanceof xt?function(e){return e.op.toString()+" {"+e.getFilters().map(ou).join(" ,")+"}"}(n):"Filter"}class sf extends st{constructor(t,e,r){super(t,e,r),this.key=x.fromName(r.referenceValue)}matches(t){const e=x.comparator(t.key,this.key);return this.matchesComparison(e)}}class of extends st{constructor(t,e){super(t,"in",e),this.keys=au("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class af extends st{constructor(t,e){super(t,"not-in",e),this.keys=au("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function au(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map(r=>x.fromName(r.referenceValue))}class uf extends st{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return $s(e)&&Tn(e.arrayValue,this.value)}}class cf extends st{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Tn(this.value.arrayValue,e)}}class lf extends st{constructor(t,e){super(t,"not-in",e)}matches(t){if(Tn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Tn(this.value.arrayValue,e)}}class hf extends st{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!$s(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>Tn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(t,e=null,r=[],s=[],o=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=l,this.Te=null}}function Bo(n,t=null,e=[],r=[],s=null,o=null,a=null){return new ff(n,t,e,r,s,o,a)}function zs(n){const t=F(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>As(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),vr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>xe(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>xe(r)).join(",")),t.Te=e}return t.Te}function Gs(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!nf(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!iu(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Uo(n.startAt,t.startAt)&&Uo(n.endAt,t.endAt)}function ws(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr{constructor(t,e=null,r=[],s=[],o=null,a="F",l=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function df(n,t,e,r,s,o,a,l){return new wr(n,t,e,r,s,o,a,l)}function Hs(n){return new wr(n)}function jo(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function mf(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function gf(n){return n.collectionGroup!==null}function hn(n){const t=F(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ie.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new it(ft.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ie.push(new fr(o,r))}),e.has(ft.keyField().canonicalString())||t.Ie.push(new fr(ft.keyField(),r))}return t.Ie}function Dt(n){const t=F(n);return t.Ee||(t.Ee=pf(t,hn(n))),t.Ee}function pf(n,t){if(n.limitType==="F")return Bo(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new fr(s.field,o)});const e=n.endAt?new hr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new hr(n.startAt.position,n.startAt.inclusive):null;return Bo(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Rs(n,t,e){return new wr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Rr(n,t){return Gs(Dt(n),Dt(t))&&n.limitType===t.limitType}function uu(n){return`${zs(Dt(n))}|lt:${n.limitType}`}function Re(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(s=>ou(s)).join(", ")}]`),vr(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(s=>xe(s)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(s=>xe(s)).join(",")),`Target(${r})`}(Dt(n))}; limitType=${n.limitType})`}function Sr(n,t){return t.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):x.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,s){for(const o of hn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,t)&&function(r,s){return!(r.startAt&&!function(a,l,h){const d=Fo(a,l,h);return a.inclusive?d<=0:d<0}(r.startAt,hn(r),s)||r.endAt&&!function(a,l,h){const d=Fo(a,l,h);return a.inclusive?d>=0:d>0}(r.endAt,hn(r),s))}(n,t)}function _f(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function cu(n){return(t,e)=>{let r=!1;for(const s of hn(n)){const o=yf(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function yf(n,t,e){const r=n.field.isKeyField()?x.comparator(t.key,e.key):function(o,a,l){const h=a.data.field(o),d=l.data.field(o);return h!==null&&d!==null?Oe(h,d):M(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){_e(this.inner,(e,r)=>{for(const[s,o]of r)t(s,o)})}isEmpty(){return Ka(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ef=new X(x.comparator);function jt(){return Ef}const lu=new X(x.comparator);function an(...n){let t=lu;for(const e of n)t=t.insert(e.key,e);return t}function hu(n){let t=lu;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function fe(){return fn()}function fu(){return fn()}function fn(){return new ye(n=>n.toString(),(n,t)=>n.isEqual(t))}const Tf=new X(x.comparator),If=new it(x.comparator);function j(...n){let t=If;for(const e of n)t=t.add(e);return t}const vf=new it(B);function Af(){return vf}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ks(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ur(t)?"-0":t}}function du(n){return{integerValue:""+n}}function wf(n,t){return Kh(t)?du(t):Ks(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(){this._=void 0}}function Rf(n,t,e){return n instanceof dr?function(s,o){const a={fields:{[Ja]:{stringValue:Qa},[Ya]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&qs(o)&&(o=Ar(o)),o&&(a.fields[Xa]=o),{mapValue:a}}(e,t):n instanceof In?gu(n,t):n instanceof vn?pu(n,t):function(s,o){const a=mu(s,o),l=qo(a)+qo(s.Ae);return vs(a)&&vs(s.Ae)?du(l):Ks(s.serializer,l)}(n,t)}function Sf(n,t,e){return n instanceof In?gu(n,t):n instanceof vn?pu(n,t):e}function mu(n,t){return n instanceof mr?function(r){return vs(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class dr extends Pr{}class In extends Pr{constructor(t){super(),this.elements=t}}function gu(n,t){const e=_u(t);for(const r of n.elements)e.some(s=>Ot(s,r))||e.push(r);return{arrayValue:{values:e}}}class vn extends Pr{constructor(t){super(),this.elements=t}}function pu(n,t){let e=_u(t);for(const r of n.elements)e=e.filter(s=>!Ot(s,r));return{arrayValue:{values:e}}}class mr extends Pr{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function qo(n){return tt(n.integerValue||n.doubleValue)}function _u(n){return $s(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Pf(n,t){return n.field.isEqual(t.field)&&function(r,s){return r instanceof In&&s instanceof In||r instanceof vn&&s instanceof vn?ke(r.elements,s.elements,Ot):r instanceof mr&&s instanceof mr?Ot(r.Ae,s.Ae):r instanceof dr&&s instanceof dr}(n.transform,t.transform)}class Vf{constructor(t,e){this.version=t,this.transformResults=e}}class Ft{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Ft}static exists(t){return new Ft(void 0,t)}static updateTime(t){return new Ft(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function er(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Vr{}function yu(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Tu(n.key,Ft.none()):new Rn(n.key,n.data,Ft.none());{const e=n.data,r=wt.empty();let s=new it(ft.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new Ee(n.key,r,new St(s.toArray()),Ft.none())}}function Cf(n,t,e){n instanceof Rn?function(s,o,a){const l=s.value.clone(),h=zo(s.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,t,e):n instanceof Ee?function(s,o,a){if(!er(s.precondition,o))return void o.convertToUnknownDocument(a.version);const l=zo(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Eu(s)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,t,e):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function dn(n,t,e,r){return n instanceof Rn?function(o,a,l,h){if(!er(o.precondition,a))return l;const d=o.value.clone(),_=Go(o.fieldTransforms,h,a);return d.setAll(_),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,t,e,r):n instanceof Ee?function(o,a,l,h){if(!er(o.precondition,a))return l;const d=Go(o.fieldTransforms,h,a),_=a.data;return _.setAll(Eu(o)),_.setAll(d),a.convertToFoundDocument(a.version,_).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(I=>I.field))}(n,t,e,r):function(o,a,l){return er(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,t,e)}function bf(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=mu(r.transform,s||null);o!=null&&(e===null&&(e=wt.empty()),e.set(r.field,o))}return e||null}function $o(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ke(r,s,(o,a)=>Pf(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Rn extends Vr{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ee extends Vr{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Eu(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function zo(n,t,e){const r=new Map;G(n.length===e.length,32656,{Ve:e.length,de:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,l=t.data.field(o.field);r.set(o.field,Sf(a,l,e[s]))}return r}function Go(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,Rf(o,a,t))}return r}class Tu extends Vr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Df extends Vr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&Cf(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=dn(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=dn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=fu();return this.mutations.forEach(s=>{const o=t.get(s.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=e.has(s.key)?null:l;const h=yu(a,l);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(L.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),j())}isEqual(t){return this.batchId===t.batchId&&ke(this.mutations,t.mutations,(e,r)=>$o(e,r))&&ke(this.baseMutations,t.baseMutations,(e,r)=>$o(e,r))}}class Ws{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){G(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let s=function(){return Tf}();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new Ws(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Of{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var et,q;function xf(n){switch(n){case P.OK:return M(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return M(15467,{code:n})}}function Iu(n){if(n===void 0)return Bt("GRPC error has no .code"),P.UNKNOWN;switch(n){case et.OK:return P.OK;case et.CANCELLED:return P.CANCELLED;case et.UNKNOWN:return P.UNKNOWN;case et.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case et.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case et.INTERNAL:return P.INTERNAL;case et.UNAVAILABLE:return P.UNAVAILABLE;case et.UNAUTHENTICATED:return P.UNAUTHENTICATED;case et.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case et.NOT_FOUND:return P.NOT_FOUND;case et.ALREADY_EXISTS:return P.ALREADY_EXISTS;case et.PERMISSION_DENIED:return P.PERMISSION_DENIED;case et.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case et.ABORTED:return P.ABORTED;case et.OUT_OF_RANGE:return P.OUT_OF_RANGE;case et.UNIMPLEMENTED:return P.UNIMPLEMENTED;case et.DATA_LOSS:return P.DATA_LOSS;default:return M(39323,{code:n})}}(q=et||(et={}))[q.OK=0]="OK",q[q.CANCELLED=1]="CANCELLED",q[q.UNKNOWN=2]="UNKNOWN",q[q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",q[q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",q[q.NOT_FOUND=5]="NOT_FOUND",q[q.ALREADY_EXISTS=6]="ALREADY_EXISTS",q[q.PERMISSION_DENIED=7]="PERMISSION_DENIED",q[q.UNAUTHENTICATED=16]="UNAUTHENTICATED",q[q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",q[q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",q[q.ABORTED=10]="ABORTED",q[q.OUT_OF_RANGE=11]="OUT_OF_RANGE",q[q.UNIMPLEMENTED=12]="UNIMPLEMENTED",q[q.INTERNAL=13]="INTERNAL",q[q.UNAVAILABLE=14]="UNAVAILABLE",q[q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mf(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lf=new Jt([4294967295,4294967295],0);function Ho(n){const t=Mf().encode(n),e=new La;return e.update(t),new Uint8Array(e.digest())}function Ko(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new Jt([e,r],0),new Jt([s,o],0)]}class Qs{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new un(`Invalid padding: ${e}`);if(r<0)throw new un(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new un(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new un(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=Jt.fromNumber(this.ge)}ye(t,e,r){let s=t.add(e.multiply(Jt.fromNumber(r)));return s.compare(Lf)===1&&(s=new Jt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Ho(t),[r,s]=Ko(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);if(!this.we(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new Qs(o,s,e);return r.forEach(l=>a.insert(l)),a}insert(t){if(this.ge===0)return;const e=Ho(t),[r,s]=Ko(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);this.Se(a)}}Se(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class un extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,Pn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Sn(L.min(),s,new X(B),jt(),j())}}class Pn{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new Pn(r,e,j(),j(),j())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(t,e,r,s){this.be=t,this.removedTargetIds=e,this.key=r,this.De=s}}class vu{constructor(t,e){this.targetId=t,this.Ce=e}}class Au{constructor(t,e,r=dt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Wo{constructor(){this.ve=0,this.Fe=Qo(),this.Me=dt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=j(),e=j(),r=j();return this.Fe.forEach((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:M(38017,{changeType:o})}}),new Pn(this.Me,this.xe,t,e,r)}Ke(){this.Oe=!1,this.Fe=Qo()}qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}Ue(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}$e(){this.ve+=1}We(){this.ve-=1,G(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class Ff{constructor(t){this.Ge=t,this.ze=new Map,this.je=jt(),this.Je=Wn(),this.He=Wn(),this.Ze=new X(B)}Xe(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Ye(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,e=>{const r=this.nt(e);switch(t.state){case 0:this.rt(e)&&r.Le(t.resumeToken);break;case 1:r.We(),r.Ne||r.Ke(),r.Le(t.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(r.Qe(),r.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),r.Le(t.resumeToken));break;default:M(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach((r,s)=>{this.rt(s)&&e(s)})}st(t){const e=t.targetId,r=t.Ce.count,s=this.ot(e);if(s){const o=s.target;if(ws(o))if(r===0){const a=new x(o.path);this.et(e,a,_t.newNoDocument(a,L.min()))}else G(r===1,20013,{expectedCount:r});else{const a=this._t(e);if(a!==r){const l=this.ut(t),h=l?this.ct(l,t,a):1;if(h!==0){this.it(e);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,d)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,l;try{a=Zt(r).toUint8Array()}catch(h){if(h instanceof Wa)return pe("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new Qs(a,s,o)}catch(h){return pe(h instanceof un?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.ge===0?null:l}ct(t,e,r){return e.Ce.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.Ge.getRemoteKeysForTarget(e);let s=0;return r.forEach(o=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.et(e,o,null),s++)}),s}Tt(t){const e=new Map;this.ze.forEach((o,a)=>{const l=this.ot(a);if(l){if(o.current&&ws(l.target)){const h=new x(l.target.path);this.It(h).has(a)||this.Et(a,h)||this.et(a,h,_t.newNoDocument(h,t))}o.Be&&(e.set(a,o.ke()),o.Ke())}});let r=j();this.He.forEach((o,a)=>{let l=!0;a.forEachWhile(h=>{const d=this.ot(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(o))}),this.je.forEach((o,a)=>a.setReadTime(t));const s=new Sn(t,e,this.Ze,this.je,r);return this.je=jt(),this.Je=Wn(),this.He=Wn(),this.Ze=new X(B),s}Ye(t,e){if(!this.rt(t))return;const r=this.Et(t,e.key)?2:0;this.nt(t).qe(e.key,r),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.Rt(e.key).add(t))}et(t,e,r){if(!this.rt(t))return;const s=this.nt(t);this.Et(t,e)?s.qe(e,1):s.Ue(e),this.He=this.He.insert(e,this.Rt(e).delete(t)),this.He=this.He.insert(e,this.Rt(e).add(t)),r&&(this.je=this.je.insert(e,r))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.nt(t).$e()}nt(t){let e=this.ze.get(t);return e||(e=new Wo,this.ze.set(t,e)),e}Rt(t){let e=this.He.get(t);return e||(e=new it(B),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new it(B),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||b("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new Wo),this.Ge.getRemoteKeysForTarget(t).forEach(e=>{this.et(t,e,null)})}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function Wn(){return new X(x.comparator)}function Qo(){return new X(x.comparator)}const Uf={asc:"ASCENDING",desc:"DESCENDING"},Bf={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},jf={and:"AND",or:"OR"};class qf{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Ss(n,t){return n.useProto3Json||vr(t)?t:{value:t}}function gr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function wu(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function $f(n,t){return gr(n,t.toTimestamp())}function Nt(n){return G(!!n,49232),L.fromTimestamp(function(e){const r=Yt(e);return new J(r.seconds,r.nanos)}(n))}function Js(n,t){return Ps(n,t).canonicalString()}function Ps(n,t){const e=function(s){return new Y(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function Ru(n){const t=Y.fromString(n);return G(bu(t),10190,{key:t.toString()}),t}function Vs(n,t){return Js(n.databaseId,t.path)}function ls(n,t){const e=Ru(t);if(e.get(1)!==n.databaseId.projectId)throw new k(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new k(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new x(Pu(e))}function Su(n,t){return Js(n.databaseId,t)}function zf(n){const t=Ru(n);return t.length===4?Y.emptyPath():Pu(t)}function Cs(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Pu(n){return G(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Jo(n,t,e){return{name:Vs(n,t),fields:e.value.mapValue.fields}}function Gf(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:M(39313,{state:d})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=function(d,_){return d.useProto3Json?(G(_===void 0||typeof _=="string",58123),dt.fromBase64String(_||"")):(G(_===void 0||_ instanceof Buffer||_ instanceof Uint8Array,16193),dt.fromUint8Array(_||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&function(d){const _=d.code===void 0?P.UNKNOWN:Iu(d.code);return new k(_,d.message||"")}(a);e=new Au(r,s,o,l||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=ls(n,r.document.name),o=Nt(r.document.updateTime),a=r.document.createTime?Nt(r.document.createTime):L.min(),l=new wt({mapValue:{fields:r.document.fields}}),h=_t.newFoundDocument(s,o,a,l),d=r.targetIds||[],_=r.removedTargetIds||[];e=new nr(d,_,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=ls(n,r.document),o=r.readTime?Nt(r.readTime):L.min(),a=_t.newNoDocument(s,o),l=r.removedTargetIds||[];e=new nr([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=ls(n,r.document),o=r.removedTargetIds||[];e=new nr([],o,s,null)}else{if(!("filter"in t))return M(11601,{Vt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new Of(s,o),l=r.targetId;e=new vu(l,a)}}return e}function Hf(n,t){let e;if(t instanceof Rn)e={update:Jo(n,t.key,t.value)};else if(t instanceof Tu)e={delete:Vs(n,t.key)};else if(t instanceof Ee)e={update:Jo(n,t.key,t.data),updateMask:ed(t.fieldMask)};else{if(!(t instanceof Df))return M(16599,{dt:t.type});e={verify:Vs(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,a){const l=a.transform;if(l instanceof dr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof In)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof vn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof mr)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw M(20930,{transform:a.transform})}(0,r))),t.precondition.isNone||(e.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:$f(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:M(27497)}(n,t.precondition)),e}function Kf(n,t){return n&&n.length>0?(G(t!==void 0,14353),n.map(e=>function(s,o){let a=s.updateTime?Nt(s.updateTime):Nt(o);return a.isEqual(L.min())&&(a=Nt(o)),new Vf(a,s.transformResults||[])}(e,t))):[]}function Wf(n,t){return{documents:[Su(n,t.path)]}}function Qf(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Su(n,s);const o=function(d){if(d.length!==0)return Cu(xt.create(d,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(d){if(d.length!==0)return d.map(_=>function(R){return{field:Se(R.field),direction:Yf(R.dir)}}(_))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const l=Ss(n,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{ft:e,parent:s}}function Jf(n){let t=zf(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){G(r===1,65062);const _=e.from[0];_.allDescendants?s=_.collectionId:t=t.child(_.collectionId)}let o=[];e.where&&(o=function(I){const R=Vu(I);return R instanceof xt&&su(R)?R.getFilters():[R]}(e.where));let a=[];e.orderBy&&(a=function(I){return I.map(R=>function(N){return new fr(Pe(N.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(N.direction))}(R))}(e.orderBy));let l=null;e.limit&&(l=function(I){let R;return R=typeof I=="object"?I.value:I,vr(R)?null:R}(e.limit));let h=null;e.startAt&&(h=function(I){const R=!!I.before,V=I.values||[];return new hr(V,R)}(e.startAt));let d=null;return e.endAt&&(d=function(I){const R=!I.before,V=I.values||[];return new hr(V,R)}(e.endAt)),df(t,s,a,o,l,"F",h,d)}function Xf(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Vu(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Pe(e.unaryFilter.field);return st.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Pe(e.unaryFilter.field);return st.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Pe(e.unaryFilter.field);return st.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Pe(e.unaryFilter.field);return st.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(n):n.fieldFilter!==void 0?function(e){return st.create(Pe(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return xt.create(e.compositeFilter.filters.map(r=>Vu(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(e.compositeFilter.op))}(n):M(30097,{filter:n})}function Yf(n){return Uf[n]}function Zf(n){return Bf[n]}function td(n){return jf[n]}function Se(n){return{fieldPath:n.canonicalString()}}function Pe(n){return ft.fromServerFormat(n.fieldPath)}function Cu(n){return n instanceof st?function(e){if(e.op==="=="){if(Lo(e.value))return{unaryFilter:{field:Se(e.field),op:"IS_NAN"}};if(Mo(e.value))return{unaryFilter:{field:Se(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Lo(e.value))return{unaryFilter:{field:Se(e.field),op:"IS_NOT_NAN"}};if(Mo(e.value))return{unaryFilter:{field:Se(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Se(e.field),op:Zf(e.op),value:e.value}}}(n):n instanceof xt?function(e){const r=e.getFilters().map(s=>Cu(s));return r.length===1?r[0]:{compositeFilter:{op:td(e.op),filters:r}}}(n):M(54877,{filter:n})}function ed(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function bu(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Du(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(t,e,r,s,o=L.min(),a=L.min(),l=dt.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(t){return new Lt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(t){this.yt=t}}function rd(n){const t=Jf({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Rs(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{constructor(){this.bn=new id}addToCollectionParentIndex(t,e){return this.bn.add(e),S.resolve()}getCollectionParents(t,e){return S.resolve(this.bn.getEntries(e))}addFieldIndex(t,e){return S.resolve()}deleteFieldIndex(t,e){return S.resolve()}deleteAllFieldIndexes(t){return S.resolve()}createTargetIndexes(t,e){return S.resolve()}getDocumentsMatchingTarget(t,e){return S.resolve(null)}getIndexType(t,e){return S.resolve(0)}getFieldIndexes(t,e){return S.resolve([])}getNextCollectionGroupToUpdate(t){return S.resolve(null)}getMinOffset(t,e){return S.resolve(Xt.min())}getMinOffsetFromCollectionGroup(t,e){return S.resolve(Xt.min())}updateCollectionGroup(t,e,r){return S.resolve()}updateIndexEntries(t,e){return S.resolve()}}class id{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new it(Y.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new it(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xo={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Nu=41943040;class vt{static withCacheSize(t){return new vt(t,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vt.DEFAULT_COLLECTION_PERCENTILE=10,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,vt.DEFAULT=new vt(Nu,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),vt.DISABLED=new vt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(t){this.sr=t}next(){return this.sr+=2,this.sr}static _r(){return new ee(0)}static ar(){return new ee(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yo="LruGarbageCollector",od=1048576;function Zo([n,t],[e,r]){const s=B(n,e);return s===0?B(t,r):s}class ad{constructor(t){this.Pr=t,this.buffer=new it(Zo),this.Tr=0}Ir(){return++this.Tr}Er(t){const e=[t,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Zo(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class ud{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(t){b(Yo,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Be(e)?b(Yo,"Ignoring IndexedDB error during garbage collection: ",e):await Ue(e)}await this.Ar(3e5)})}}class cd{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.dr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return S.resolve(Ir.ce);const r=new ad(e);return this.Vr.forEachTarget(t,s=>r.Er(s.sequenceNumber)).next(()=>this.Vr.mr(t,s=>r.Er(s))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.Vr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(b("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(Xo)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(b("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Xo):this.gr(t,e))}getCacheSize(t){return this.Vr.getCacheSize(t)}gr(t,e){let r,s,o,a,l,h,d;const _=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(I=>(I>this.params.maximumSequenceNumbersToCollect?(b("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${I}`),s=this.params.maximumSequenceNumbersToCollect):s=I,a=Date.now(),this.nthSequenceNumber(t,s))).next(I=>(r=I,l=Date.now(),this.removeTargets(t,r,e))).next(I=>(o=I,h=Date.now(),this.removeOrphanedDocuments(t,r))).next(I=>(d=Date.now(),we()<=$.DEBUG&&b("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-_}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${o} targets in `+(h-l)+`ms
	Removed ${I} documents in `+(d-h)+`ms
Total Duration: ${d-_}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:I})))}}function ld(n,t){return new cd(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd{constructor(){this.changes=new ye(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,_t.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?S.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dd{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(r=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(r!==null&&dn(r.mutation,s,St.empty(),J.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,j()).next(()=>r))}getLocalViewOfDocuments(t,e,r=j()){const s=fe();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,r).next(o=>{let a=an();return o.forEach((l,h)=>{a=a.insert(l,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const r=fe();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,j()))}populateOverlays(t,e,r){const s=[];return r.forEach(o=>{e.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(t,s).next(o=>{o.forEach((a,l)=>{e.set(a,l)})})}computeViews(t,e,r,s){let o=jt();const a=fn(),l=function(){return fn()}();return e.forEach((h,d)=>{const _=r.get(d.key);s.has(d.key)&&(_===void 0||_.mutation instanceof Ee)?o=o.insert(d.key,d):_!==void 0?(a.set(d.key,_.mutation.getFieldMask()),dn(_.mutation,d,_.mutation.getFieldMask(),J.now())):a.set(d.key,St.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((d,_)=>a.set(d,_)),e.forEach((d,_)=>l.set(d,new fd(_,a.get(d)??null))),l))}recalculateAndSaveOverlays(t,e){const r=fn();let s=new X((a,l)=>a-l),o=j();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const l of a)l.keys().forEach(h=>{const d=e.get(h);if(d===null)return;let _=r.get(h)||St.empty();_=l.applyToLocalView(d,_),r.set(h,_);const I=(s.get(l.batchId)||j()).add(h);s=s.insert(l.batchId,I)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const h=l.getNext(),d=h.key,_=h.value,I=fu();_.forEach(R=>{if(!o.has(R)){const V=yu(e.get(R),r.get(R));V!==null&&I.set(R,V),o=o.add(R)}}),a.push(this.documentOverlayCache.saveOverlays(t,d,I))}return S.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,s){return mf(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):gf(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):S.resolve(fe());let l=_n,h=o;return a.next(d=>S.forEach(d,(_,I)=>(l<I.largestBatchId&&(l=I.largestBatchId),o.get(_)?S.resolve():this.remoteDocumentCache.getEntry(t,_).next(R=>{h=h.insert(_,R)}))).next(()=>this.populateOverlays(t,d,o)).next(()=>this.computeViews(t,h,d,j())).next(_=>({batchId:l,changes:hu(_)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new x(e)).next(r=>{let s=an();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=an();return this.indexManager.getCollectionParents(t,o).next(l=>S.forEach(l,h=>{const d=function(I,R){return new wr(R,null,I.explicitOrderBy.slice(),I.filters.slice(),I.limit,I.limitType,I.startAt,I.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,r,s).next(_=>{_.forEach((I,R)=>{a=a.insert(I,R)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s))).next(a=>{o.forEach((h,d)=>{const _=d.getKey();a.get(_)===null&&(a=a.insert(_,_t.newInvalidDocument(_)))});let l=an();return a.forEach((h,d)=>{const _=o.get(h);_!==void 0&&dn(_.mutation,d,St.empty(),J.now()),Sr(e,d)&&(l=l.insert(h,d))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class md{constructor(t){this.serializer=t,this.Nr=new Map,this.Br=new Map}getBundleMetadata(t,e){return S.resolve(this.Nr.get(e))}saveBundleMetadata(t,e){return this.Nr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Nt(s.createTime)}}(e)),S.resolve()}getNamedQuery(t,e){return S.resolve(this.Br.get(e))}saveNamedQuery(t,e){return this.Br.set(e.name,function(s){return{name:s.name,query:rd(s.bundledQuery),readTime:Nt(s.readTime)}}(e)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gd{constructor(){this.overlays=new X(x.comparator),this.Lr=new Map}getOverlay(t,e){return S.resolve(this.overlays.get(e))}getOverlays(t,e){const r=fe();return S.forEach(e,s=>this.getOverlay(t,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((s,o)=>{this.St(t,e,o)}),S.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Lr.delete(r)),S.resolve()}getOverlaysForCollection(t,e,r){const s=fe(),o=e.length+1,a=new x(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const h=l.getNext().value,d=h.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return S.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new X((d,_)=>d-_);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>r){let _=o.get(d.largestBatchId);_===null&&(_=fe(),o=o.insert(d.largestBatchId,_)),_.set(d.getKey(),d)}}const l=fe(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((d,_)=>l.set(d,_)),!(l.size()>=s)););return S.resolve(l)}St(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new kf(e,r));let o=this.Lr.get(e);o===void 0&&(o=j(),this.Lr.set(e,o)),this.Lr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{constructor(){this.sessionToken=dt.EMPTY_BYTE_STRING}getSessionToken(t){return S.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(){this.kr=new it(ct.Kr),this.qr=new it(ct.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(t,e){const r=new ct(t,e);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Wr(new ct(t,e))}Qr(t,e){t.forEach(r=>this.removeReference(r,e))}Gr(t){const e=new x(new Y([])),r=new ct(e,t),s=new ct(e,t+1),o=[];return this.qr.forEachInRange([r,s],a=>{this.Wr(a),o.push(a.key)}),o}zr(){this.kr.forEach(t=>this.Wr(t))}Wr(t){this.kr=this.kr.delete(t),this.qr=this.qr.delete(t)}jr(t){const e=new x(new Y([])),r=new ct(e,t),s=new ct(e,t+1);let o=j();return this.qr.forEachInRange([r,s],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new ct(t,0),r=this.kr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class ct{constructor(t,e){this.key=t,this.Jr=e}static Kr(t,e){return x.comparator(t.key,e.key)||B(t.Jr,e.Jr)}static Ur(t,e){return B(t.Jr,e.Jr)||x.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _d{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Yn=1,this.Hr=new it(ct.Kr)}checkEmpty(t){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Nf(o,e,r,s);this.mutationQueue.push(a);for(const l of s)this.Hr=this.Hr.add(new ct(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return S.resolve(a)}lookupMutationBatch(t,e){return S.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.Xr(r),o=s<0?0:s;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?js:this.Yn-1)}getAllMutationBatches(t){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new ct(e,0),s=new ct(e,Number.POSITIVE_INFINITY),o=[];return this.Hr.forEachInRange([r,s],a=>{const l=this.Zr(a.Jr);o.push(l)}),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new it(B);return e.forEach(s=>{const o=new ct(s,0),a=new ct(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([o,a],l=>{r=r.add(l.Jr)})}),S.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;x.isDocumentKey(o)||(o=o.child(""));const a=new ct(new x(o),0);let l=new it(B);return this.Hr.forEachWhile(h=>{const d=h.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(h.Jr)),!0)},a),S.resolve(this.Yr(l))}Yr(t){const e=[];return t.forEach(r=>{const s=this.Zr(r);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){G(this.ei(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return S.forEach(e.mutations,s=>{const o=new ct(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Hr=r})}nr(t){}containsKey(t,e){const r=new ct(e,0),s=this.Hr.firstAfterOrEqual(r);return S.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,S.resolve()}ei(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(t){this.ti=t,this.docs=function(){return new X(x.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.ti(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return S.resolve(r?r.document.mutableCopy():_t.newInvalidDocument(e))}getEntries(t,e){let r=jt();return e.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():_t.newInvalidDocument(s))}),S.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=jt();const a=e.path,l=new x(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:d,value:{document:_}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||$h(qh(_),r)<=0||(s.has(_.key)||Sr(e,_))&&(o=o.insert(_.key,_.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(t,e,r,s){M(9500)}ni(t,e){return S.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new Ed(this)}getSize(t){return S.resolve(this.size)}}class Ed extends hd{constructor(t){super(),this.Mr=t}applyChanges(t){const e=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?e.push(this.Mr.addEntry(t,s)):this.Mr.removeEntry(r)}),S.waitFor(e)}getFromCache(t,e){return this.Mr.getEntry(t,e)}getAllFromCache(t,e){return this.Mr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{constructor(t){this.persistence=t,this.ri=new ye(e=>zs(e),Gs),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.ii=0,this.si=new Xs,this.targetCount=0,this.oi=ee._r()}forEachTarget(t,e){return this.ri.forEach((r,s)=>e(s)),S.resolve()}getLastRemoteSnapshotVersion(t){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return S.resolve(this.ii)}allocateTargetId(t){return this.highestTargetId=this.oi.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.ii&&(this.ii=e),S.resolve()}lr(t){this.ri.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.oi=new ee(e),this.highestTargetId=e),t.sequenceNumber>this.ii&&(this.ii=t.sequenceNumber)}addTargetData(t,e){return this.lr(e),this.targetCount+=1,S.resolve()}updateTargetData(t,e){return this.lr(e),S.resolve()}removeTargetData(t,e){return this.ri.delete(e.target),this.si.Gr(e.targetId),this.targetCount-=1,S.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.ri.forEach((a,l)=>{l.sequenceNumber<=e&&r.get(l.targetId)===null&&(this.ri.delete(a),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)}),S.waitFor(o).next(()=>s)}getTargetCount(t){return S.resolve(this.targetCount)}getTargetData(t,e){const r=this.ri.get(e)||null;return S.resolve(r)}addMatchingKeys(t,e,r){return this.si.$r(e,r),S.resolve()}removeMatchingKeys(t,e,r){this.si.Qr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach(a=>{o.push(s.markPotentiallyOrphaned(t,a))}),S.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.si.Gr(e),S.resolve()}getMatchingKeysForTargetId(t,e){const r=this.si.jr(e);return S.resolve(r)}containsKey(t,e){return S.resolve(this.si.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(t,e){this._i={},this.overlays={},this.ai=new Ir(0),this.ui=!1,this.ui=!0,this.ci=new pd,this.referenceDelegate=t(this),this.li=new Td(this),this.indexManager=new sd,this.remoteDocumentCache=function(s){return new yd(s)}(r=>this.referenceDelegate.hi(r)),this.serializer=new nd(e),this.Pi=new md(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new gd,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this._i[t.toKey()];return r||(r=new _d(e,this.referenceDelegate),this._i[t.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(t,e,r){b("MemoryPersistence","Starting transaction:",t);const s=new Id(this.ai.next());return this.referenceDelegate.Ti(),r(s).next(o=>this.referenceDelegate.Ii(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Ei(t,e){return S.or(Object.values(this._i).map(r=>()=>r.containsKey(t,e)))}}class Id extends Gh{constructor(t){super(),this.currentSequenceNumber=t}}class Ys{constructor(t){this.persistence=t,this.Ri=new Xs,this.Ai=null}static Vi(t){return new Ys(t)}get di(){if(this.Ai)return this.Ai;throw M(60996)}addReference(t,e,r){return this.Ri.addReference(r,e),this.di.delete(r.toString()),S.resolve()}removeReference(t,e,r){return this.Ri.removeReference(r,e),this.di.add(r.toString()),S.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),S.resolve()}removeTarget(t,e){this.Ri.Gr(e.targetId).forEach(s=>this.di.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(o=>this.di.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}Ti(){this.Ai=new Set}Ii(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.di,r=>{const s=x.fromPath(r);return this.mi(t,s).next(o=>{o||e.removeEntry(s,L.min())})}).next(()=>(this.Ai=null,e.apply(t)))}updateLimboDocument(t,e){return this.mi(t,e).next(r=>{r?this.di.delete(e.toString()):this.di.add(e.toString())})}hi(t){return 0}mi(t,e){return S.or([()=>S.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ei(t,e)])}}class pr{constructor(t,e){this.persistence=t,this.fi=new ye(r=>Wh(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=ld(this,e)}static Vi(t,e){return new pr(t,e)}Ti(){}Ii(t){return S.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.pr(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(s=>r+s))}pr(t){let e=0;return this.mr(t,r=>{e++}).next(()=>e)}mr(t,e){return S.forEach(this.fi,(r,s)=>this.wr(t,r,s).next(o=>o?S.resolve():e(s)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ni(t,a=>this.wr(t,a,e).next(l=>{l||(r++,o.removeEntry(a,L.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.fi.set(e,t.currentSequenceNumber),S.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.fi.set(r,t.currentSequenceNumber),S.resolve()}removeReference(t,e,r){return this.fi.set(r,t.currentSequenceNumber),S.resolve()}updateLimboDocument(t,e){return this.fi.set(e,t.currentSequenceNumber),S.resolve()}hi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Zn(t.data.value)),e}wr(t,e,r){return S.or([()=>this.persistence.Ei(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.fi.get(e);return S.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zs{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Ts=r,this.Is=s}static Es(t,e){let r=j(),s=j();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new Zs(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vd{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return al()?8:Hh(il())>0?6:4}()}initialize(t,e){this.fs=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.gs(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.ps(t,e,s,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new vd;return this.ys(t,e,a).next(l=>{if(o.result=l,this.As)return this.ws(t,e,a,l.size)})}).next(()=>o.result)}ws(t,e,r,s){return r.documentReadCount<this.Vs?(we()<=$.DEBUG&&b("QueryEngine","SDK will not create cache indexes for query:",Re(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),S.resolve()):(we()<=$.DEBUG&&b("QueryEngine","Query:",Re(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(we()<=$.DEBUG&&b("QueryEngine","The SDK decides to create cache indexes for query:",Re(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Dt(e))):S.resolve())}gs(t,e){if(jo(e))return S.resolve(null);let r=Dt(e);return this.indexManager.getIndexType(t,r).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=Rs(e,null,"F"),r=Dt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const a=j(...o);return this.fs.getDocuments(t,a).next(l=>this.indexManager.getMinOffset(t,r).next(h=>{const d=this.Ss(e,l);return this.bs(e,d,a,h.readTime)?this.gs(t,Rs(e,null,"F")):this.Ds(t,d,e,h)}))})))}ps(t,e,r,s){return jo(e)||s.isEqual(L.min())?S.resolve(null):this.fs.getDocuments(t,r).next(o=>{const a=this.Ss(e,o);return this.bs(e,a,r,s)?S.resolve(null):(we()<=$.DEBUG&&b("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Re(e)),this.Ds(t,a,e,jh(s,_n)).next(l=>l))})}Ss(t,e){let r=new it(cu(t));return e.forEach((s,o)=>{Sr(t,o)&&(r=r.add(o))}),r}bs(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}ys(t,e,r){return we()<=$.DEBUG&&b("QueryEngine","Using full collection scan to execute query:",Re(e)),this.fs.getDocumentsMatchingQuery(t,e,Xt.min(),r)}Ds(t,e,r,s){return this.fs.getDocumentsMatchingQuery(t,r,s).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ti="LocalStore",wd=3e8;class Rd{constructor(t,e,r,s){this.persistence=t,this.Cs=e,this.serializer=s,this.vs=new X(B),this.Fs=new ye(o=>zs(o),Gs),this.Ms=new Map,this.xs=t.getRemoteDocumentCache(),this.li=t.getTargetCache(),this.Pi=t.getBundleCache(),this.Os(r)}Os(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new dd(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.vs))}}function Sd(n,t,e,r){return new Rd(n,t,e,r)}async function Ou(n,t){const e=F(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,e.Os(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],l=[];let h=j();for(const d of s){a.push(d.batchId);for(const _ of d.mutations)h=h.add(_.key)}for(const d of o){l.push(d.batchId);for(const _ of d.mutations)h=h.add(_.key)}return e.localDocuments.getDocuments(r,h).next(d=>({Ns:d,removedBatchIds:a,addedBatchIds:l}))})})}function Pd(n,t){const e=F(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=t.batch.keys(),o=e.xs.newChangeBuffer({trackRemovals:!0});return function(l,h,d,_){const I=d.batch,R=I.keys();let V=S.resolve();return R.forEach(N=>{V=V.next(()=>_.getEntry(h,N)).next(O=>{const D=d.docVersions.get(N);G(D!==null,48541),O.version.compareTo(D)<0&&(I.applyToRemoteDocument(O,d),O.isValidDocument()&&(O.setReadTime(d.commitVersion),_.addEntry(O)))})}),V.next(()=>l.mutationQueue.removeMutationBatch(h,I))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let h=j();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(h=h.add(l.batch.mutations[d].key));return h}(t))).next(()=>e.localDocuments.getDocuments(r,s))})}function xu(n){const t=F(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.li.getLastRemoteSnapshotVersion(e))}function Vd(n,t){const e=F(n),r=t.snapshotVersion;let s=e.vs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.xs.newChangeBuffer({trackRemovals:!0});s=e.vs;const l=[];t.targetChanges.forEach((_,I)=>{const R=s.get(I);if(!R)return;l.push(e.li.removeMatchingKeys(o,_.removedDocuments,I).next(()=>e.li.addMatchingKeys(o,_.addedDocuments,I)));let V=R.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(I)!==null?V=V.withResumeToken(dt.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):_.resumeToken.approximateByteSize()>0&&(V=V.withResumeToken(_.resumeToken,r)),s=s.insert(I,V),function(O,D,H){return O.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=wd?!0:H.addedDocuments.size+H.modifiedDocuments.size+H.removedDocuments.size>0}(R,V,_)&&l.push(e.li.updateTargetData(o,V))});let h=jt(),d=j();if(t.documentUpdates.forEach(_=>{t.resolvedLimboDocuments.has(_)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,_))}),l.push(Cd(o,a,t.documentUpdates).next(_=>{h=_.Bs,d=_.Ls})),!r.isEqual(L.min())){const _=e.li.getLastRemoteSnapshotVersion(o).next(I=>e.li.setTargetsMetadata(o,o.currentSequenceNumber,r));l.push(_)}return S.waitFor(l).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,d)).next(()=>h)}).then(o=>(e.vs=s,o))}function Cd(n,t,e){let r=j(),s=j();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=jt();return e.forEach((l,h)=>{const d=o.get(l);h.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),h.isNoDocument()&&h.version.isEqual(L.min())?(t.removeEntry(l,h.readTime),a=a.insert(l,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(h),a=a.insert(l,h)):b(ti,"Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",h.version)}),{Bs:a,Ls:s}})}function bd(n,t){const e=F(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=js),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function Dd(n,t){const e=F(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return e.li.getTargetData(r,t).next(o=>o?(s=o,S.resolve(s)):e.li.allocateTargetId(r).next(a=>(s=new Lt(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.li.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=e.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.vs=e.vs.insert(r.targetId,r),e.Fs.set(t,r.targetId)),r})}async function bs(n,t,e){const r=F(n),s=r.vs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Be(a))throw a;b(ti,`Failed to update sequence numbers for target ${t}: ${a}`)}r.vs=r.vs.remove(t),r.Fs.delete(s.target)}function ta(n,t,e){const r=F(n);let s=L.min(),o=j();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,d,_){const I=F(h),R=I.Fs.get(_);return R!==void 0?S.resolve(I.vs.get(R)):I.li.getTargetData(d,_)}(r,a,Dt(t)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(a,l.targetId).next(h=>{o=h})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,t,e?s:L.min(),e?o:j())).next(l=>(Nd(r,_f(t),l),{documents:l,ks:o})))}function Nd(n,t,e){let r=n.Ms.get(t)||L.min();e.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.Ms.set(t,r)}class ea{constructor(){this.activeTargetIds=Af()}Qs(t){this.activeTargetIds=this.activeTargetIds.add(t)}Gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class kd{constructor(){this.vo=new ea,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.vo.Qs(t),this.Fo[t]||"not-current"}updateQueryState(t,e,r){this.Fo[t]=e}removeLocalQueryTarget(t){this.vo.Gs(t)}isLocalQueryTarget(t){return this.vo.activeTargetIds.has(t)}clearQueryState(t){delete this.Fo[t]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(t){return this.vo.activeTargetIds.has(t)}start(){return this.vo=new ea,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Od{Mo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const na="ConnectivityMonitor";class ra{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(t){this.Lo.push(t)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){b(na,"Network connectivity changed: AVAILABLE");for(const t of this.Lo)t(0)}Bo(){b(na,"Network connectivity changed: UNAVAILABLE");for(const t of this.Lo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qn=null;function Ds(){return Qn===null?Qn=function(){return 268435456+Math.round(2147483648*Math.random())}():Qn++,"0x"+Qn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hs="RestConnection",xd={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class Md{get Ko(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=e+"://"+t.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===cr?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(t,e,r,s,o){const a=Ds(),l=this.Qo(t,e.toUriEncodedString());b(hs,`Sending RPC '${t}' ${a}:`,l,r);const h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(h,s,o);const{host:d}=new URL(l),_=ba(d);return this.zo(t,l,h,r,_).then(I=>(b(hs,`Received RPC '${t}' ${a}: `,I),I),I=>{throw pe(hs,`RPC '${t}' ${a} failed with error: `,I,"url: ",l,"request:",r),I})}jo(t,e,r,s,o,a){return this.Wo(t,e,r,s,o)}Go(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Fe}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,o)=>t[o]=s),r&&r.headers.forEach((s,o)=>t[o]=s)}Qo(t,e){const r=xd[t];let s=`${this.qo}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{constructor(t){this.Jo=t.Jo,this.Ho=t.Ho}Zo(t){this.Xo=t}Yo(t){this.e_=t}t_(t){this.n_=t}onMessage(t){this.r_=t}close(){this.Ho()}send(t){this.Jo(t)}i_(){this.Xo()}s_(){this.e_()}o_(t){this.n_(t)}__(t){this.r_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gt="WebChannelConnection",sn=(n,t,e)=>{n.listen(t,r=>{try{e(r)}catch(s){setTimeout(()=>{throw s},0)}})};class be extends Md{constructor(t){super(t),this.a_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static u_(){if(!be.c_){const t=ja();sn(t,Ba.STAT_EVENT,e=>{e.stat===Es.PROXY?b(gt,"STAT_EVENT: detected buffering proxy"):e.stat===Es.NOPROXY&&b(gt,"STAT_EVENT: detected no buffering proxy")}),be.c_=!0}}zo(t,e,r,s,o){const a=Ds();return new Promise((l,h)=>{const d=new Fa;d.setWithCredentials(!0),d.listenOnce(Ua.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Yn.NO_ERROR:const I=d.getResponseJson();b(gt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(I)),l(I);break;case Yn.TIMEOUT:b(gt,`RPC '${t}' ${a} timed out`),h(new k(P.DEADLINE_EXCEEDED,"Request time out"));break;case Yn.HTTP_ERROR:const R=d.getStatus();if(b(gt,`RPC '${t}' ${a} failed with status:`,R,"response text:",d.getResponseText()),R>0){let V=d.getResponseJson();Array.isArray(V)&&(V=V[0]);const N=V==null?void 0:V.error;if(N&&N.status&&N.message){const O=function(H){const z=H.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(z)>=0?z:P.UNKNOWN}(N.status);h(new k(O,N.message))}else h(new k(P.UNKNOWN,"Server responded with status "+d.getStatus()))}else h(new k(P.UNAVAILABLE,"Connection failed."));break;default:M(9055,{l_:t,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{b(gt,`RPC '${t}' ${a} completed.`)}});const _=JSON.stringify(s);b(gt,`RPC '${t}' ${a} sending request:`,s),d.send(e,"POST",_,r,15)})}T_(t,e,r){const s=Ds(),o=[this.qo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,e,r),l.encodeInitMessageHeaders=!0;const d=o.join("");b(gt,`Creating RPC '${t}' stream ${s}: ${d}`,l);const _=a.createWebChannel(d,l);this.I_(_);let I=!1,R=!1;const V=new Ld({Jo:N=>{R?b(gt,`Not sending because RPC '${t}' stream ${s} is closed:`,N):(I||(b(gt,`Opening RPC '${t}' stream ${s} transport.`),_.open(),I=!0),b(gt,`RPC '${t}' stream ${s} sending:`,N),_.send(N))},Ho:()=>_.close()});return sn(_,on.EventType.OPEN,()=>{R||(b(gt,`RPC '${t}' stream ${s} transport opened.`),V.i_())}),sn(_,on.EventType.CLOSE,()=>{R||(R=!0,b(gt,`RPC '${t}' stream ${s} transport closed`),V.o_(),this.E_(_))}),sn(_,on.EventType.ERROR,N=>{R||(R=!0,pe(gt,`RPC '${t}' stream ${s} transport errored. Name:`,N.name,"Message:",N.message),V.o_(new k(P.UNAVAILABLE,"The operation could not be completed")))}),sn(_,on.EventType.MESSAGE,N=>{var O;if(!R){const D=N.data[0];G(!!D,16349);const H=D,z=(H==null?void 0:H.error)||((O=H[0])==null?void 0:O.error);if(z){b(gt,`RPC '${t}' stream ${s} received error:`,z);const W=z.status;let Tt=function(T){const m=et[T];if(m!==void 0)return Iu(m)}(W),ot=z.message;W==="NOT_FOUND"&&ot.includes("database")&&ot.includes("does not exist")&&ot.includes(this.databaseId.database)&&pe(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Tt===void 0&&(Tt=P.INTERNAL,ot="Unknown error status: "+W+" with message "+z.message),R=!0,V.o_(new k(Tt,ot)),_.close()}else b(gt,`RPC '${t}' stream ${s} received:`,D),V.__(D)}}),be.u_(),setTimeout(()=>{V.s_()},0),V}terminate(){this.a_.forEach(t=>t.close()),this.a_=[]}I_(t){this.a_.push(t)}E_(t){this.a_=this.a_.filter(e=>e===t)}Go(t,e,r){super.Go(t,e,r),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return qa()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fd(n){return new be(n)}function fs(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cr(n){return new qf(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */be.c_=!1;class Mu{constructor(t,e,r=1e3,s=1.5,o=6e4){this.Ci=t,this.timerId=e,this.R_=r,this.A_=s,this.V_=o,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(t){this.cancel();const e=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-r);s>0&&b("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),t())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa="PersistentStream";class Lu{constructor(t,e,r,s,o,a,l,h){this.Ci=t,this.S_=r,this.b_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Mu(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}K_(t){this.q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===P.RESOURCE_EXHAUSTED?(Bt(e.toString()),Bt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.t_(e)}W_(){}auth(){this.state=1;const t=this.Q_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===e&&this.G_(r,s)},r=>{t(()=>{const s=new k(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(t,e){const r=this.Q_(this.D_);this.stream=this.j_(t,e),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.Yo(()=>{r(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(t){return b(sa,`close with error: ${t}`),this.stream=null,this.close(4,t)}Q_(t){return e=>{this.Ci.enqueueAndForget(()=>this.D_===t?e():(b(sa,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Ud extends Lu{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=Gf(this.serializer,t),r=function(o){if(!("targetChange"in o))return L.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?L.min():a.readTime?Nt(a.readTime):L.min()}(t);return this.listener.H_(e,r)}Z_(t){const e={};e.database=Cs(this.serializer),e.addTarget=function(o,a){let l;const h=a.target;if(l=ws(h)?{documents:Wf(o,h)}:{query:Qf(o,h).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=wu(o,a.resumeToken);const d=Ss(o,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(L.min())>0){l.readTime=gr(o,a.snapshotVersion.toTimestamp());const d=Ss(o,a.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,t);const r=Xf(this.serializer,t);r&&(e.labels=r),this.K_(e)}X_(t){const e={};e.database=Cs(this.serializer),e.removeTarget=t,this.K_(e)}}class Bd extends Lu{constructor(t,e,r,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return G(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,G(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){G(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Kf(t.writeResults,t.commitTime),r=Nt(t.commitTime);return this.listener.na(r,e)}ra(){const t={};t.database=Cs(this.serializer),this.K_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map(r=>Hf(this.serializer,r))};this.K_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jd{}class qd extends jd{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new k(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Wo(t,Ps(e,r),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new k(P.UNKNOWN,o.toString())})}jo(t,e,r,s,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.jo(t,Ps(e,r),s,a,l,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new k(P.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function $d(n,t,e,r){return new qd(n,t,e,r)}class zd{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Bt(e),this.aa=!1):b("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mt="RemoteStore";class Gd{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Map,this.Ra=new Map,this.Aa=new ee(1e3),this.Va=new ee(1001),this.da=new Set,this.ma=[],this.fa=o,this.fa.Mo(a=>{r.enqueueAndForget(async()=>{Te(this)&&(b(Mt,"Restarting streams for network reachability change."),await async function(h){const d=F(h);d.da.add(4),await Vn(d),d.ga.set("Unknown"),d.da.delete(4),await br(d)}(this))})}),this.ga=new zd(r,s)}}async function br(n){if(Te(n))for(const t of n.ma)await t(!0)}async function Vn(n){for(const t of n.ma)await t(!1)}function Ns(n,t){return n.Ea.get(t)||void 0}function Fu(n,t){const e=F(n),r=Ns(e,t.targetId);if(r!==void 0&&e.Ia.has(r))return;const s=function(l,h){const d=Ns(l,h);d!==void 0&&l.Ra.delete(d);const _=function(R,V){return V%2!=0?R.Va.next():R.Aa.next()}(l,h);return l.Ea.set(h,_),l.Ra.set(_,h),_}(e,t.targetId);b(Mt,"remoteStoreListen mapping SDK target ID to remote",t.targetId,s);const o=new Lt(t.target,s,t.purpose,t.sequenceNumber,t.snapshotVersion,t.lastLimboFreeSnapshotVersion,t.resumeToken);e.Ia.set(s,o),si(e)?ri(e):je(e).O_()&&ni(e,o)}function ei(n,t){const e=F(n),r=je(e),s=Ns(e,t);b(Mt,"remoteStoreUnlisten removing mapping of SDK target ID to remote",t,s),e.Ia.delete(s),e.Ea.delete(t),e.Ra.delete(s),r.O_()&&Uu(e,s),e.Ia.size===0&&(r.O_()?r.L_():Te(e)&&e.ga.set("Unknown"))}function ni(n,t){if(n.pa.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=n.Ra.get(t.targetId);if(e===void 0)return void b(Mt,"SDK target ID not found for remote ID: "+t.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(e).size;t=t.withExpectedCount(r)}je(n).Z_(t)}function Uu(n,t){n.pa.$e(t),je(n).X_(t)}function ri(n){n.pa=new Ff({getRemoteKeysForTarget:t=>{const e=n.Ra.get(t);return e!==void 0?n.remoteSyncer.getRemoteKeysForTarget(e):j()},At:t=>n.Ia.get(t)||null,ht:()=>n.datastore.serializer.databaseId}),je(n).start(),n.ga.ua()}function si(n){return Te(n)&&!je(n).x_()&&n.Ia.size>0}function Te(n){return F(n).da.size===0}function Bu(n){n.pa=void 0}async function Hd(n){n.ga.set("Online")}async function Kd(n){n.Ia.forEach((t,e)=>{ni(n,t)})}async function Wd(n,t){Bu(n),si(n)?(n.ga.ha(t),ri(n)):n.ga.set("Unknown")}async function Qd(n,t,e){if(n.ga.set("Online"),t instanceof Au&&t.state===2&&t.cause)try{await async function(s,o){const a=o.cause;for(const l of o.targetIds){if(s.Ia.has(l)){const h=s.Ra.get(l);h!==void 0&&(await s.remoteSyncer.rejectListen(h,a),s.Ea.delete(h),s.Ra.delete(l)),s.Ia.delete(l)}s.pa.removeTarget(l)}}(n,t)}catch(r){b(Mt,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await _r(n,r)}else if(t instanceof nr?n.pa.Xe(t):t instanceof vu?n.pa.st(t):n.pa.tt(t),!e.isEqual(L.min()))try{const r=await xu(n.localStore);e.compareTo(r)>=0&&await function(o,a){const l=o.pa.Tt(a);l.targetChanges.forEach((d,_)=>{if(d.resumeToken.approximateByteSize()>0){const I=o.Ia.get(_);I&&o.Ia.set(_,I.withResumeToken(d.resumeToken,a))}}),l.targetMismatches.forEach((d,_)=>{const I=o.Ia.get(d);if(!I)return;o.Ia.set(d,I.withResumeToken(dt.EMPTY_BYTE_STRING,I.snapshotVersion)),Uu(o,d);const R=new Lt(I.target,d,_,I.sequenceNumber);ni(o,R)});const h=function(_,I){const R=new Map;I.targetChanges.forEach((N,O)=>{const D=_.Ra.get(O);D!==void 0&&R.set(D,N)});let V=new X(B);return I.targetMismatches.forEach((N,O)=>{const D=_.Ra.get(N);D!==void 0&&(V=V.insert(D,O))}),new Sn(I.snapshotVersion,R,V,I.documentUpdates,I.resolvedLimboDocuments)}(o,l);return o.remoteSyncer.applyRemoteEvent(h)}(n,e)}catch(r){b(Mt,"Failed to raise snapshot:",r),await _r(n,r)}}async function _r(n,t,e){if(!Be(t))throw t;n.da.add(1),await Vn(n),n.ga.set("Offline"),e||(e=()=>xu(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{b(Mt,"Retrying IndexedDB access"),await e(),n.da.delete(1),await br(n)})}function ju(n,t){return t().catch(e=>_r(n,e,t))}async function Dr(n){const t=F(n),e=ne(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:js;for(;Jd(t);)try{const s=await bd(t.localStore,r);if(s===null){t.Ta.length===0&&e.L_();break}r=s.batchId,Xd(t,s)}catch(s){await _r(t,s)}qu(t)&&$u(t)}function Jd(n){return Te(n)&&n.Ta.length<10}function Xd(n,t){n.Ta.push(t);const e=ne(n);e.O_()&&e.Y_&&e.ea(t.mutations)}function qu(n){return Te(n)&&!ne(n).x_()&&n.Ta.length>0}function $u(n){ne(n).start()}async function Yd(n){ne(n).ra()}async function Zd(n){const t=ne(n);for(const e of n.Ta)t.ea(e.mutations)}async function tm(n,t,e){const r=n.Ta.shift(),s=Ws.from(r,t,e);await ju(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Dr(n)}async function em(n,t){t&&ne(n).Y_&&await async function(r,s){if(function(a){return xf(a)&&a!==P.ABORTED}(s.code)){const o=r.Ta.shift();ne(r).B_(),await ju(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s)),await Dr(r)}}(n,t),qu(n)&&$u(n)}async function ia(n,t){const e=F(n);e.asyncQueue.verifyOperationInProgress(),b(Mt,"RemoteStore received new credentials");const r=Te(e);e.da.add(3),await Vn(e),r&&e.ga.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.da.delete(3),await br(e)}async function nm(n,t){const e=F(n);t?(e.da.delete(2),await br(e)):t||(e.da.add(2),await Vn(e),e.ga.set("Unknown"))}function je(n){return n.ya||(n.ya=function(e,r,s){const o=F(e);return o.sa(),new Ud(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Zo:Hd.bind(null,n),Yo:Kd.bind(null,n),t_:Wd.bind(null,n),H_:Qd.bind(null,n)}),n.ma.push(async t=>{t?(n.ya.B_(),si(n)?ri(n):n.ga.set("Unknown")):(await n.ya.stop(),Bu(n))})),n.ya}function ne(n){return n.wa||(n.wa=function(e,r,s){const o=F(e);return o.sa(),new Bd(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:Yd.bind(null,n),t_:em.bind(null,n),ta:Zd.bind(null,n),na:tm.bind(null,n)}),n.ma.push(async t=>{t?(n.wa.B_(),await Dr(n)):(await n.wa.stop(),n.Ta.length>0&&(b(Mt,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.wa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new de,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,l=new ii(t,e,a,s,o);return l.start(r),l}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(P.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function oi(n,t){if(Bt("AsyncQueue",`${t}: ${n}`),Be(n))return new k(P.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{static emptySet(t){return new De(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||x.comparator(e.key,r.key):(e,r)=>x.comparator(e.key,r.key),this.keyedMap=an(),this.sortedSet=new X(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof De)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new De;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{constructor(){this.Sa=new X(x.comparator)}track(t){const e=t.doc.key,r=this.Sa.get(e);r?t.type!==0&&r.type===3?this.Sa=this.Sa.insert(e,t):t.type===3&&r.type!==1?this.Sa=this.Sa.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.Sa=this.Sa.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.Sa=this.Sa.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.Sa=this.Sa.remove(e):t.type===1&&r.type===2?this.Sa=this.Sa.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.Sa=this.Sa.insert(e,{type:2,doc:t.doc}):M(63341,{Vt:t,ba:r}):this.Sa=this.Sa.insert(e,t)}Da(){const t=[];return this.Sa.inorderTraversal((e,r)=>{t.push(r)}),t}}class Me{constructor(t,e,r,s,o,a,l,h,d){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach(l=>{a.push({type:0,doc:l})}),new Me(t,e,De.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Rr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(){this.Ca=void 0,this.va=[]}Fa(){return this.va.some(t=>t.Ma())}}class sm{constructor(){this.queries=aa(),this.onlineState="Unknown",this.xa=new Set}terminate(){(function(e,r){const s=F(e),o=s.queries;s.queries=aa(),o.forEach((a,l)=>{for(const h of l.va)h.onError(r)})})(this,new k(P.ABORTED,"Firestore shutting down"))}}function aa(){return new ye(n=>uu(n),Rr)}async function im(n,t){const e=F(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.Fa()&&t.Ma()&&(r=2):(o=new rm,r=t.Ma()?0:1);try{switch(r){case 0:o.Ca=await e.onListen(s,!0);break;case 1:o.Ca=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const l=oi(a,`Initialization of query '${Re(t.query)}' failed`);return void t.onError(l)}e.queries.set(s,o),o.va.push(t),t.Oa(e.onlineState),o.Ca&&t.Na(o.Ca)&&ai(e)}async function om(n,t){const e=F(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.va.indexOf(t);a>=0&&(o.va.splice(a,1),o.va.length===0?s=t.Ma()?0:1:!o.Fa()&&t.Ma()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function am(n,t){const e=F(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const l of a.va)l.Na(s)&&(r=!0);a.Ca=s}}r&&ai(e)}function um(n,t,e){const r=F(n),s=r.queries.get(t);if(s)for(const o of s.va)o.onError(e);r.queries.delete(t)}function ai(n){n.xa.forEach(t=>{t.next()})}var ks,ua;(ua=ks||(ks={})).Ba="default",ua.Cache="cache";class cm{constructor(t,e,r){this.query=t,this.La=e,this.ka=!1,this.Ka=null,this.onlineState="Unknown",this.options=r||{}}Na(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Me(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.ka?this.qa(t)&&(this.La.next(t),e=!0):this.Ua(t,this.onlineState)&&(this.$a(t),e=!0),this.Ka=t,e}onError(t){this.La.error(t)}Oa(t){this.onlineState=t;let e=!1;return this.Ka&&!this.ka&&this.Ua(this.Ka,t)&&(this.$a(this.Ka),e=!0),e}Ua(t,e){if(!t.fromCache||!this.Ma())return!0;const r=e!=="Offline";return(!this.options.Wa||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}qa(t){if(t.docChanges.length>0)return!0;const e=this.Ka&&this.Ka.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}$a(t){t=Me.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.ka=!0,this.La.next(t)}Ma(){return this.options.source!==ks.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(t){this.key=t}}class Gu{constructor(t){this.key=t}}class lm{constructor(t,e){this.query=t,this.tu=e,this.nu=null,this.hasCachedResults=!1,this.current=!1,this.ru=j(),this.mutatedKeys=j(),this.iu=cu(t),this.su=new De(this.iu)}get ou(){return this.tu}_u(t,e){const r=e?e.au:new oa,s=e?e.su:this.su;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,l=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((_,I)=>{const R=s.get(_),V=Sr(this.query,I)?I:null,N=!!R&&this.mutatedKeys.has(R.key),O=!!V&&(V.hasLocalMutations||this.mutatedKeys.has(V.key)&&V.hasCommittedMutations);let D=!1;R&&V?R.data.isEqual(V.data)?N!==O&&(r.track({type:3,doc:V}),D=!0):this.uu(R,V)||(r.track({type:2,doc:V}),D=!0,(h&&this.iu(V,h)>0||d&&this.iu(V,d)<0)&&(l=!0)):!R&&V?(r.track({type:0,doc:V}),D=!0):R&&!V&&(r.track({type:1,doc:R}),D=!0,(h||d)&&(l=!0)),D&&(V?(a=a.add(V),o=O?o.add(_):o.delete(_)):(a=a.delete(_),o=o.delete(_)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const _=this.query.limitType==="F"?a.last():a.first();a=a.delete(_.key),o=o.delete(_.key),r.track({type:1,doc:_})}return{su:a,au:r,bs:l,mutatedKeys:o}}uu(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.su;this.su=t.su,this.mutatedKeys=t.mutatedKeys;const a=t.au.Da();a.sort((_,I)=>function(V,N){const O=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Vt:D})}};return O(V)-O(N)}(_.type,I.type)||this.iu(_.doc,I.doc)),this.cu(r),s=s??!1;const l=e&&!s?this.lu():[],h=this.ru.size===0&&this.current&&!s?1:0,d=h!==this.nu;return this.nu=h,a.length!==0||d?{snapshot:new Me(this.query,t.su,o,a,t.mutatedKeys,h===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),hu:l}:{hu:l}}Oa(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({su:this.su,au:new oa,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{hu:[]}}Pu(t){return!this.tu.has(t)&&!!this.su.has(t)&&!this.su.get(t).hasLocalMutations}cu(t){t&&(t.addedDocuments.forEach(e=>this.tu=this.tu.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.tu=this.tu.delete(e)),this.current=t.current)}lu(){if(!this.current)return[];const t=this.ru;this.ru=j(),this.su.forEach(r=>{this.Pu(r.key)&&(this.ru=this.ru.add(r.key))});const e=[];return t.forEach(r=>{this.ru.has(r)||e.push(new Gu(r))}),this.ru.forEach(r=>{t.has(r)||e.push(new zu(r))}),e}Tu(t){this.tu=t.ks,this.ru=j();const e=this._u(t.documents);return this.applyChanges(e,!0)}Iu(){return Me.fromInitialDocuments(this.query,this.su,this.mutatedKeys,this.nu===0,this.hasCachedResults)}}const ui="SyncEngine";class hm{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class fm{constructor(t){this.key=t,this.Eu=!1}}class dm{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ru={},this.Au=new ye(l=>uu(l),Rr),this.Vu=new Map,this.du=new Set,this.mu=new X(x.comparator),this.fu=new Map,this.gu=new Xs,this.pu={},this.yu=new Map,this.wu=ee.ar(),this.onlineState="Unknown",this.Su=void 0}get isPrimaryClient(){return this.Su===!0}}async function mm(n,t,e=!0){const r=Xu(n);let s;const o=r.Au.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.Iu()):s=await Hu(r,t,e,!0),s}async function gm(n,t){const e=Xu(n);await Hu(e,t,!0,!1)}async function Hu(n,t,e,r){const s=await Dd(n.localStore,Dt(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let l;return r&&(l=await pm(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&Fu(n.remoteStore,s),l}async function pm(n,t,e,r,s){n.bu=(I,R,V)=>async function(O,D,H,z){let W=D.view._u(H);W.bs&&(W=await ta(O.localStore,D.query,!1).then(({documents:T})=>D.view._u(T,W)));const Tt=z&&z.targetChanges.get(D.targetId),ot=z&&z.targetMismatches.get(D.targetId)!=null,at=D.view.applyChanges(W,O.isPrimaryClient,Tt,ot);return la(O,D.targetId,at.hu),at.snapshot}(n,I,R,V);const o=await ta(n.localStore,t,!0),a=new lm(t,o.ks),l=a._u(o.documents),h=Pn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),d=a.applyChanges(l,n.isPrimaryClient,h);la(n,e,d.hu);const _=new hm(t,e,a);return n.Au.set(t,_),n.Vu.has(e)?n.Vu.get(e).push(t):n.Vu.set(e,[t]),d.snapshot}async function _m(n,t,e){const r=F(n),s=r.Au.get(t),o=r.Vu.get(s.targetId);if(o.length>1)return r.Vu.set(s.targetId,o.filter(a=>!Rr(a,t))),void r.Au.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await bs(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),e&&ei(r.remoteStore,s.targetId),Os(r,s.targetId)}).catch(Ue)):(Os(r,s.targetId),await bs(r.localStore,s.targetId,!0))}async function ym(n,t){const e=F(n),r=e.Au.get(t),s=e.Vu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),ei(e.remoteStore,r.targetId))}async function Em(n,t,e){const r=Sm(n);try{const s=await function(a,l){const h=F(a),d=J.now(),_=l.reduce((V,N)=>V.add(N.key),j());let I,R;return h.persistence.runTransaction("Locally write mutations","readwrite",V=>{let N=jt(),O=j();return h.xs.getEntries(V,_).next(D=>{N=D,N.forEach((H,z)=>{z.isValidDocument()||(O=O.add(H))})}).next(()=>h.localDocuments.getOverlayedDocuments(V,N)).next(D=>{I=D;const H=[];for(const z of l){const W=bf(z,I.get(z.key).overlayedDocument);W!=null&&H.push(new Ee(z.key,W,eu(W.value.mapValue),Ft.exists(!0)))}return h.mutationQueue.addMutationBatch(V,d,H,l)}).next(D=>{R=D;const H=D.applyToLocalDocumentSet(I,O);return h.documentOverlayCache.saveOverlays(V,D.batchId,H)})}).then(()=>({batchId:R.batchId,changes:hu(I)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,h){let d=a.pu[a.currentUser.toKey()];d||(d=new X(B)),d=d.insert(l,h),a.pu[a.currentUser.toKey()]=d}(r,s.batchId,e),await Cn(r,s.changes),await Dr(r.remoteStore)}catch(s){const o=oi(s,"Failed to persist write");e.reject(o)}}async function Ku(n,t){const e=F(n);try{const r=await Vd(e.localStore,t);t.targetChanges.forEach((s,o)=>{const a=e.fu.get(o);a&&(G(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Eu=!0:s.modifiedDocuments.size>0?G(a.Eu,14607):s.removedDocuments.size>0&&(G(a.Eu,42227),a.Eu=!1))}),await Cn(e,r,t)}catch(r){await Ue(r)}}function ca(n,t,e){const r=F(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Au.forEach((o,a)=>{const l=a.view.Oa(t);l.snapshot&&s.push(l.snapshot)}),function(a,l){const h=F(a);h.onlineState=l;let d=!1;h.queries.forEach((_,I)=>{for(const R of I.va)R.Oa(l)&&(d=!0)}),d&&ai(h)}(r.eventManager,t),s.length&&r.Ru.H_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Tm(n,t,e){const r=F(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.fu.get(t),o=s&&s.key;if(o){let a=new X(x.comparator);a=a.insert(o,_t.newNoDocument(o,L.min()));const l=j().add(o),h=new Sn(L.min(),new Map,new X(B),a,l);await Ku(r,h),r.mu=r.mu.remove(o),r.fu.delete(t),ci(r)}else await bs(r.localStore,t,!1).then(()=>Os(r,t,e)).catch(Ue)}async function Im(n,t){const e=F(n),r=t.batch.batchId;try{const s=await Pd(e.localStore,t);Qu(e,r,null),Wu(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await Cn(e,s)}catch(s){await Ue(s)}}async function vm(n,t,e){const r=F(n);try{const s=await function(a,l){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let _;return h.mutationQueue.lookupMutationBatch(d,l).next(I=>(G(I!==null,37113),_=I.keys(),h.mutationQueue.removeMutationBatch(d,I))).next(()=>h.mutationQueue.performConsistencyCheck(d)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(d,_,l)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,_)).next(()=>h.localDocuments.getDocuments(d,_))})}(r.localStore,t);Qu(r,t,e),Wu(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await Cn(r,s)}catch(s){await Ue(s)}}function Wu(n,t){(n.yu.get(t)||[]).forEach(e=>{e.resolve()}),n.yu.delete(t)}function Qu(n,t,e){const r=F(n);let s=r.pu[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.pu[r.currentUser.toKey()]=s}}function Os(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Vu.get(t))n.Au.delete(r),e&&n.Ru.Du(r,e);n.Vu.delete(t),n.isPrimaryClient&&n.gu.Gr(t).forEach(r=>{n.gu.containsKey(r)||Ju(n,r)})}function Ju(n,t){n.du.delete(t.path.canonicalString());const e=n.mu.get(t);e!==null&&(ei(n.remoteStore,e),n.mu=n.mu.remove(t),n.fu.delete(e),ci(n))}function la(n,t,e){for(const r of e)r instanceof zu?(n.gu.addReference(r.key,t),Am(n,r)):r instanceof Gu?(b(ui,"Document no longer in limbo: "+r.key),n.gu.removeReference(r.key,t),n.gu.containsKey(r.key)||Ju(n,r.key)):M(19791,{Cu:r})}function Am(n,t){const e=t.key,r=e.path.canonicalString();n.mu.get(e)||n.du.has(r)||(b(ui,"New document in limbo: "+e),n.du.add(r),ci(n))}function ci(n){for(;n.du.size>0&&n.mu.size<n.maxConcurrentLimboResolutions;){const t=n.du.values().next().value;n.du.delete(t);const e=new x(Y.fromString(t)),r=n.wu.next();n.fu.set(r,new fm(e)),n.mu=n.mu.insert(e,r),Fu(n.remoteStore,new Lt(Dt(Hs(e.path)),r,"TargetPurposeLimboResolution",Ir.ce))}}async function Cn(n,t,e){const r=F(n),s=[],o=[],a=[];r.Au.isEmpty()||(r.Au.forEach((l,h)=>{a.push(r.bu(h,t,e).then(d=>{var _;if((d||e)&&r.isPrimaryClient){const I=d?!d.fromCache:(_=e==null?void 0:e.targetChanges.get(h.targetId))==null?void 0:_.current;r.sharedClientState.updateQueryState(h.targetId,I?"current":"not-current")}if(d){s.push(d);const I=Zs.Es(h.targetId,d);o.push(I)}}))}),await Promise.all(a),r.Ru.H_(s),await async function(h,d){const _=F(h);try{await _.persistence.runTransaction("notifyLocalViewChanges","readwrite",I=>S.forEach(d,R=>S.forEach(R.Ts,V=>_.persistence.referenceDelegate.addReference(I,R.targetId,V)).next(()=>S.forEach(R.Is,V=>_.persistence.referenceDelegate.removeReference(I,R.targetId,V)))))}catch(I){if(!Be(I))throw I;b(ti,"Failed to update sequence numbers: "+I)}for(const I of d){const R=I.targetId;if(!I.fromCache){const V=_.vs.get(R),N=V.snapshotVersion,O=V.withLastLimboFreeSnapshotVersion(N);_.vs=_.vs.insert(R,O)}}}(r.localStore,o))}async function wm(n,t){const e=F(n);if(!e.currentUser.isEqual(t)){b(ui,"User change. New user:",t.toKey());const r=await Ou(e.localStore,t);e.currentUser=t,function(o,a){o.yu.forEach(l=>{l.forEach(h=>{h.reject(new k(P.CANCELLED,a))})}),o.yu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Cn(e,r.Ns)}}function Rm(n,t){const e=F(n),r=e.fu.get(t);if(r&&r.Eu)return j().add(r.key);{let s=j();const o=e.Vu.get(t);if(!o)return s;for(const a of o){const l=e.Au.get(a);s=s.unionWith(l.view.ou)}return s}}function Xu(n){const t=F(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ku.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Rm.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Tm.bind(null,t),t.Ru.H_=am.bind(null,t.eventManager),t.Ru.Du=um.bind(null,t.eventManager),t}function Sm(n){const t=F(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Im.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=vm.bind(null,t),t}class yr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Cr(t.databaseInfo.databaseId),this.sharedClientState=this.Mu(t),this.persistence=this.xu(t),await this.persistence.start(),this.localStore=this.Ou(t),this.gcScheduler=this.Nu(t,this.localStore),this.indexBackfillerScheduler=this.Bu(t,this.localStore)}Nu(t,e){return null}Bu(t,e){return null}Ou(t){return Sd(this.persistence,new Ad,t.initialUser,this.serializer)}xu(t){return new ku(Ys.Vi,this.serializer)}Mu(t){return new kd}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}yr.provider={build:()=>new yr};class Pm extends yr{constructor(t){super(),this.cacheSizeBytes=t}Nu(t,e){G(this.persistence.referenceDelegate instanceof pr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new ud(r,t.asyncQueue,e)}xu(t){const e=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new ku(r=>pr.Vi(r,e),this.serializer)}}class xs{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>ca(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=wm.bind(null,this.syncEngine),await nm(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new sm}()}createDatastore(t){const e=Cr(t.databaseInfo.databaseId),r=Fd(t.databaseInfo);return $d(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,s,o,a,l){return new Gd(r,s,o,a,l)}(this.localStore,this.datastore,t.asyncQueue,e=>ca(this.syncEngine,e,0),function(){return ra.v()?new ra:new Od}())}createSyncEngine(t,e){return function(s,o,a,l,h,d,_){const I=new dm(s,o,a,l,h,d);return _&&(I.Su=!0),I}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const o=F(s);b(Mt,"RemoteStore shutting down."),o.da.add(5),await Vn(o),o.fa.shutdown(),o.ga.set("Unknown")}(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}xs.provider={build:()=>new xs};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vm{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.ku(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.ku(this.observer.error,t):Bt("Uncaught Error in snapshot listener:",t.toString()))}Ku(){this.muted=!0}ku(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const re="FirestoreClient";class Cm{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this._databaseInfo=s,this.user=pt.UNAUTHENTICATED,this.clientId=Us.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{b(re,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(b(re,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new de;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=oi(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function ds(n,t){n.asyncQueue.verifyOperationInProgress(),b(re,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Ou(t.localStore,s),r=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function ha(n,t){n.asyncQueue.verifyOperationInProgress();const e=await bm(n);b(re,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>ia(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>ia(t.remoteStore,s)),n._onlineComponents=t}async function bm(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){b(re,"Using user provided OfflineComponentProvider");try{await ds(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;pe("Error using user provided cache. Falling back to memory cache: "+e),await ds(n,new yr)}}else b(re,"Using default OfflineComponentProvider"),await ds(n,new Pm(void 0));return n._offlineComponents}async function Yu(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(b(re,"Using user provided OnlineComponentProvider"),await ha(n,n._uninitializedComponentsProvider._online)):(b(re,"Using default OnlineComponentProvider"),await ha(n,new xs))),n._onlineComponents}function Dm(n){return Yu(n).then(t=>t.syncEngine)}async function fa(n){const t=await Yu(n),e=t.eventManager;return e.onListen=mm.bind(null,t.syncEngine),e.onUnlisten=_m.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=gm.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=ym.bind(null,t.syncEngine),e}function Nm(n,t,e,r){const s=new Vm(r),o=new cm(t,s,e);return n.asyncQueue.enqueueAndForget(async()=>im(await fa(n),o)),()=>{s.Ku(),n.asyncQueue.enqueueAndForget(async()=>om(await fa(n),o))}}function km(n,t){const e=new de;return n.asyncQueue.enqueueAndForget(async()=>Em(await Dm(n),t,e)),e.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zu(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Om="ComponentProvider",da=new Map;function xm(n,t,e,r,s){return new Xh(n,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Zu(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tc="firestore.googleapis.com",ma=!0;class ga{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new k(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=tc,this.ssl=ma}else this.host=t.host,this.ssl=t.ssl??ma;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Nu;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<od)throw new k(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Bh("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Zu(t.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class li{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ga({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new k(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ga(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Ch;switch(r.type){case"firstParty":return new kh(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new k(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=da.get(e);r&&(b(Om,"Removing Datastore"),da.delete(e),r.terminate())}(this),Promise.resolve()}}function Mm(n,t,e,r={}){var d;n=Ce(n,li);const s=ba(t),o=n._getSettings(),a={...o,emulatorOptions:n._getEmulatorOptions()},l=`${t}:${e}`;s&&dl(`https://${l}`),o.host!==tc&&o.host!==l&&pe("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:l,ssl:s,emulatorOptions:r};if(!ir(h,a)&&(n._setSettings(h),r.mockUserToken)){let _,I;if(typeof r.mockUserToken=="string")_=r.mockUserToken,I=pt.MOCK_USER;else{_=sl(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const R=r.mockUserToken.sub||r.mockUserToken.user_id;if(!R)throw new k(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");I=new pt(R)}n._authCredentials=new bh(new za(_,I))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Nr(this.firestore,t,this._query)}}class lt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new An(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new lt(this.firestore,t,this._key)}toJSON(){return{type:lt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(wn(e,lt._jsonSchema))return new lt(t,r||null,new x(Y.fromString(e.referencePath)))}}lt._jsonSchemaVersion="firestore/documentReference/1.0",lt._jsonSchema={type:nt("string",lt._jsonSchemaVersion),referencePath:nt("string")};class An extends Nr{constructor(t,e,r){super(t,e,Hs(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new lt(this.firestore,null,new x(t))}withConverter(t){return new An(this.firestore,t,this._path)}}function kr(n,t,...e){if(n=mn(n),arguments.length===1&&(t=Us.newId()),Uh("doc","path",t),n instanceof li){const r=Y.fromString(t,...e);return Vo(r),new lt(n,null,new x(r))}{if(!(n instanceof lt||n instanceof An))throw new k(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(t,...e));return Vo(r),new lt(n.firestore,n instanceof An?n.converter:null,new x(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pa="AsyncQueue";class _a{constructor(t=Promise.resolve()){this.rc=[],this.sc=!1,this.oc=[],this._c=null,this.ac=!1,this.uc=!1,this.cc=[],this.M_=new Mu(this,"async_queue_retry"),this.lc=()=>{const r=fs();r&&b(pa,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.hc=t;const e=fs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.lc)}get isShuttingDown(){return this.sc}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Pc(),this.Tc(t)}enterRestrictedMode(t){if(!this.sc){this.sc=!0,this.uc=t||!1;const e=fs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.lc)}}enqueue(t){if(this.Pc(),this.sc)return new Promise(()=>{});const e=new de;return this.Tc(()=>this.sc&&this.uc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.rc.push(t),this.Ic()))}async Ic(){if(this.rc.length!==0){try{await this.rc[0](),this.rc.shift(),this.M_.reset()}catch(t){if(!Be(t))throw t;b(pa,"Operation failed with retryable error: "+t)}this.rc.length>0&&this.M_.p_(()=>this.Ic())}}Tc(t){const e=this.hc.then(()=>(this.ac=!0,t().catch(r=>{throw this._c=r,this.ac=!1,Bt("INTERNAL UNHANDLED ERROR: ",ya(r)),r}).then(r=>(this.ac=!1,r))));return this.hc=e,e}enqueueAfterDelay(t,e,r){this.Pc(),this.cc.indexOf(t)>-1&&(e=0);const s=ii.createAndSchedule(this,t,e,r,o=>this.Ec(o));return this.oc.push(s),s}Pc(){this._c&&M(47125,{Rc:ya(this._c)})}verifyOperationInProgress(){}async Ac(){let t;do t=this.hc,await t;while(t!==this.hc)}Vc(t){for(const e of this.oc)if(e.timerId===t)return!0;return!1}dc(t){return this.Ac().then(()=>{this.oc.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.oc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Ac()})}mc(t){this.cc.push(t)}Ec(t){const e=this.oc.indexOf(t);this.oc.splice(e,1)}}function ya(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class Er extends li{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new _a,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new _a(t),this._firestoreClient=void 0,await t}}}function Lm(n,t){const e=typeof n=="object"?n:gh(),r=typeof n=="string"?n:cr,s=lh(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=nl("firestore");o&&Mm(s,...o)}return s}function ec(n){if(n._terminated)throw new k(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Fm(n),n._firestoreClient}function Fm(n){var r,s,o,a;const t=n._freezeSettings(),e=xm(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,t);n._componentsProvider||(o=t.localCache)!=null&&o._offlineComponentProvider&&((a=t.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new Cm(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&function(h){const d=h==null?void 0:h._online.build();return{_offline:h==null?void 0:h._offline.build(d),_online:d}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Rt(dt.fromBase64String(t))}catch(e){throw new k(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Rt(dt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Rt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(wn(t,Rt._jsonSchema))return Rt.fromBase64String(t.bytes)}}Rt._jsonSchemaVersion="firestore/bytes/1.0",Rt._jsonSchema={type:nt("string",Rt._jsonSchemaVersion),bytes:nt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new k(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ft(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new k(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new k(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return B(this._lat,t._lat)||B(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:kt._jsonSchemaVersion}}static fromJSON(t){if(wn(t,kt._jsonSchema))return new kt(t.latitude,t.longitude)}}kt._jsonSchemaVersion="firestore/geoPoint/1.0",kt._jsonSchema={type:nt("string",kt._jsonSchemaVersion),latitude:nt("number"),longitude:nt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,t._values)}toJSON(){return{type:Pt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(wn(t,Pt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new Pt(t.vectorValues);throw new k(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Pt._jsonSchemaVersion="firestore/vectorValue/1.0",Pt._jsonSchema={type:nt("string",Pt._jsonSchemaVersion),vectorValues:nt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Um=/^__.*__$/;class Bm{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Ee(t,this.data,this.fieldMask,e,this.fieldTransforms):new Rn(t,this.data,e,this.fieldTransforms)}}function sc(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{dataSource:n})}}class hi{constructor(t,e,r,s,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.fc(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(t){return new hi({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}yc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.i({path:e,arrayElement:!1});return r.wc(t),r}Sc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.i({path:e,arrayElement:!1});return r.fc(),r}bc(t){return this.i({path:void 0,arrayElement:!0})}Dc(t){return Tr(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}fc(){if(this.path)for(let t=0;t<this.path.length;t++)this.wc(this.path.get(t))}wc(t){if(t.length===0)throw this.Dc("Document fields must not be empty");if(sc(this.dataSource)&&Um.test(t))throw this.Dc('Document fields cannot begin and end with "__"')}}class jm{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Cr(t)}V(t,e,r,s=!1){return new hi({dataSource:t,methodName:e,targetDoc:r,path:ft.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function qm(n){const t=n._freezeSettings(),e=Cr(n._databaseId);return new jm(n._databaseId,!!t.ignoreUndefinedProperties,e)}function $m(n,t,e,r,s,o={}){const a=n.V(o.merge||o.mergeFields?2:0,t,e,s);uc("Data must be an object, but it was:",a,r);const l=oc(r,a);let h,d;if(o.merge)h=new St(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const _=[];for(const I of o.mergeFields){const R=fi(t,I,e);if(!a.contains(R))throw new k(P.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);Hm(_,R)||_.push(R)}h=new St(_),d=a.fieldTransforms.filter(I=>h.covers(I.field))}else h=null,d=a.fieldTransforms;return new Bm(new wt(l),h,d)}function ic(n,t){if(ac(n=mn(n)))return uc("Unsupported field value:",t,n),oc(n,t);if(n instanceof rc)return function(r,s){if(!sc(s.dataSource))throw s.Dc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Dc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.Dc("Nested arrays are not supported");return function(r,s){const o=[];let a=0;for(const l of r){let h=ic(l,s.bc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,t)}return function(r,s){if((r=mn(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return wf(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=J.fromDate(r);return{timestampValue:gr(s.serializer,o)}}if(r instanceof J){const o=new J(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:gr(s.serializer,o)}}if(r instanceof kt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Rt)return{bytesValue:wu(s.serializer,r._byteString)};if(r instanceof lt){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.Dc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Js(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Pt)return function(a,l){const h=a instanceof Pt?a.toArray():a;return{mapValue:{fields:{[Za]:{stringValue:tu},[lr]:{arrayValue:{values:h.map(_=>{if(typeof _!="number")throw l.Dc("VectorValues must only contain numeric values.");return Ks(l.serializer,_)})}}}}}}(r,s);if(Du(r))return r._toProto(s.serializer);throw s.Dc(`Unsupported field value: ${Bs(r)}`)}(n,t)}function oc(n,t){const e={};return Ka(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):_e(n,(r,s)=>{const o=ic(s,t.yc(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function ac(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof J||n instanceof kt||n instanceof Rt||n instanceof lt||n instanceof rc||n instanceof Pt||Du(n))}function uc(n,t,e){if(!ac(e)||!Ga(e)){const r=Bs(e);throw r==="an object"?t.Dc(n+" a custom object"):t.Dc(n+" "+r)}}function fi(n,t,e){if((t=mn(t))instanceof nc)return t._internalPath;if(typeof t=="string")return Gm(n,t);throw Tr("Field path arguments must be of type string or ",n,!1,void 0,e)}const zm=new RegExp("[~\\*/\\[\\]]");function Gm(n,t,e){if(t.search(zm)>=0)throw Tr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new nc(...t.split("."))._internalPath}catch{throw Tr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Tr(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new k(P.INVALID_ARGUMENT,l+n+h)}function Hm(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Km{convertValue(t,e="none"){switch(te(t)){case 0:return null;case 1:return t.booleanValue;case 2:return tt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Zt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return _e(t,(s,o)=>{r[s]=this.convertValue(o,e)}),r}convertVectorValue(t){var r,s,o;const e=(o=(s=(r=t.fields)==null?void 0:r[lr].arrayValue)==null?void 0:s.values)==null?void 0:o.map(a=>tt(a.doubleValue));return new Pt(e)}convertGeoPoint(t){return new kt(tt(t.latitude),tt(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Ar(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(yn(t));default:return null}}convertTimestamp(t){const e=Yt(t);return new J(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=Y.fromString(t);G(bu(r),9688,{name:t});const s=new En(r.get(1),r.get(3)),o=new x(r.popFirst(5));return s.isEqual(e)||Bt(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc extends Km{constructor(t){super(),this.firestore=t}convertBytes(t){return new Rt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new lt(this.firestore,null,e)}}const Ea="@firebase/firestore",Ta="4.14.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ia(n){return function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const o of r)if(o in s&&typeof s[o]=="function")return!0;return!1}(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new lt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Wm(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(fi("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Wm extends lc{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qm(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new k(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}function Jm(n,t,e){let r;return r=n?n.toFirestore(t):t,r}class cn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class me extends lc{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new rr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(fi("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new k(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=me._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}me._jsonSchemaVersion="firestore/documentSnapshot/1.0",me._jsonSchema={type:nt("string",me._jsonSchemaVersion),bundleSource:nt("string","DocumentSnapshot"),bundleName:nt("string"),bundle:nt("string")};class rr extends me{data(t={}){return super.data(t)}}class Ne{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new cn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new rr(this._firestore,this._userDataWriter,r.key,r,new cn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new k(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const h=new rr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new cn(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>o||l.type!==3).map(l=>{const h=new rr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new cn(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,_=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),_=a.indexOf(l.doc.key)),{type:Xm(l.type),doc:h,oldIndex:d,newIndex:_}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new k(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Ne._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Us.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach(o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function Xm(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ne._jsonSchemaVersion="firestore/querySnapshot/1.0",Ne._jsonSchema={type:nt("string",Ne._jsonSchemaVersion),bundleSource:nt("string","QuerySnapshot"),bundleName:nt("string"),bundle:nt("string")};function Jn(n,t,e){n=Ce(n,lt);const r=Ce(n.firestore,Er),s=Jm(n.converter,t),o=qm(r);return Ym(r,[$m(o,"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,Ft.none())])}function Xn(n,...t){var d,_,I;n=mn(n);let e={includeMetadataChanges:!1,source:"default"},r=0;typeof t[r]!="object"||Ia(t[r])||(e=t[r++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(Ia(t[r])){const R=t[r];t[r]=(d=R.next)==null?void 0:d.bind(R),t[r+1]=(_=R.error)==null?void 0:_.bind(R),t[r+2]=(I=R.complete)==null?void 0:I.bind(R)}let o,a,l;if(n instanceof lt)a=Ce(n.firestore,Er),l=Hs(n._key.path),o={next:R=>{t[r]&&t[r](Zm(a,n,R))},error:t[r+1],complete:t[r+2]};else{const R=Ce(n,Nr);a=Ce(R.firestore,Er),l=R._query;const V=new cc(a);o={next:N=>{t[r]&&t[r](new Ne(a,V,R,N))},error:t[r+1],complete:t[r+2]},Qm(n._query)}const h=ec(a);return Nm(h,l,s,o)}function Ym(n,t){const e=ec(n);return km(e,t)}function Zm(n,t,e){const r=e.docs.get(t._key),s=new cc(n);return new me(n,s,t._key,r,new cn(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){Vh(mh),ar(new gn("firestore",(r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),l=new Er(new Dh(r.getProvider("auth-internal")),new Oh(a,r.getProvider("app-check-internal")),Yh(a,s),a);return o={useFetchStreams:e,...o},l._setSettings(o),l},"PUBLIC").setMultipleInstances(!0)),Ve(Ea,Ta,t),Ve(Ea,Ta,"esm2020")})();const tg={apiKey:"AIzaSyDfg0EVAOLRNXQHcBwG0X3wtCbevObSJbc",authDomain:"gitgalaxy-15758.firebaseapp.com",projectId:"gitgalaxy-15758",storageBucket:"gitgalaxy-15758.firebasestorage.app",messagingSenderId:"285402012184",appId:"1:285402012184:web:8f502f5c58344034fec16d"},eg=Oa(tg),Or=Lm(eg),va=kr(Or,"gitgalaxy","gameQuestions"),Aa=kr(Or,"gitgalaxy","interviewQuestions"),wa=kr(Or,"gitgalaxy","announcements"),Ra=kr(Or,"gitgalaxy","planetCases"),ig=$c("admin",()=>{const n=le(JSON.parse(localStorage.getItem("gg_admin_planets")||"null")||Gc),t=le(JSON.parse(localStorage.getItem("gg_admin_custom_q")||"[]")),e=le(JSON.parse(localStorage.getItem("gg_admin_interview_q")||"[]")),r=zc({}),s=le(JSON.parse(localStorage.getItem("gg_admin_assets")||"[]")),o=le(JSON.parse(localStorage.getItem("gg_admin_ann")||"[]")),a=le({galaxyTitle:localStorage.getItem("gg_admin_title")||"GITGALAXY",galaxySubtitle:localStorage.getItem("gg_admin_sub")||"THE INFINITE LEARNING COSMOS",featuredPlanet:localStorage.getItem("gg_admin_fp")||"git",maintenanceMode:!1,xpMultiplier:Number(localStorage.getItem("gg_admin_xpm")||"1")});Xn(va,m=>{m.exists()&&(t.value=m.data().items||[],localStorage.setItem("gg_admin_custom_q",JSON.stringify(t.value)))}),Xn(Aa,m=>{m.exists()&&(e.value=m.data().items||[],localStorage.setItem("gg_admin_interview_q",JSON.stringify(e.value)))}),Xn(wa,m=>{m.exists()&&(o.value=m.data().items||[],localStorage.setItem("gg_admin_ann",JSON.stringify(o.value)))}),Xn(Ra,m=>{if(m.exists()){const g=m.data().map||{};Object.keys(r).forEach(E=>delete r[E]),Object.assign(r,g)}});function l(){localStorage.setItem("gg_admin_custom_q",JSON.stringify(t.value)),Jn(va,{items:t.value})}function h(){localStorage.setItem("gg_admin_interview_q",JSON.stringify(e.value)),Jn(Aa,{items:e.value})}function d(){localStorage.setItem("gg_admin_ann",JSON.stringify(o.value)),Jn(wa,{items:o.value})}function _(m,g){a.value[m]=g,localStorage.setItem(`gg_admin_${m}`,String(g))}function I(m,g){o.value.unshift({id:Date.now().toString(),text:m,type:g,active:!0}),d()}function R(m){o.value=o.value.filter(g=>g.id!==m),d()}function V(m,g,E){s.value.unshift({name:m,type:g,url:E,date:new Date().toLocaleDateString()}),localStorage.setItem("gg_admin_assets",JSON.stringify(s.value))}function N(m){t.value.find(g=>g.id===m.id)||t.value.unshift(m),l()}function O(m){t.value=t.value.filter(g=>g.id!==m),l()}function D(m){e.value.find(g=>g.id===m.id)||e.value.unshift(m),h()}function H(m){e.value=e.value.filter(g=>g.id!==m),h()}function z(){Jn(Ra,{map:JSON.parse(JSON.stringify(r))})}function W(m){return r[m]||[]}function Tt(m,g){const E=W(m),y=new Set(E.map(p=>p.id)),A=[...g.filter(p=>!y.has(p.id)),...E];r[m]=A,z()}function ot(m,g){r[m]=(r[m]||[]).filter(E=>E.id!==g),z()}function at(m,g){const E=n.value.findIndex(y=>y.id===m);E!==-1&&(n.value[E]={...n.value[E],...g},localStorage.setItem("gg_admin_planets",JSON.stringify(n.value)))}const T=le({totalLearners:2847,activeToday:342,questionsAnswered:158340,avgScore:74,topPlanet:"Git",completionRate:68});return{customPlanets:n,customQuestions:t,interviewQuestions:e,uploadedAssets:s,announcements:o,siteSettings:a,stats:T,planetCasesMap:r,updateSetting:_,addAnnouncement:I,removeAnnouncement:R,addAsset:V,addQuestion:N,removeQuestion:O,addInterviewQuestion:D,removeInterviewQuestion:H,updatePlanet:at,getPlanetCases:W,addPlanetCases:Tt,removePlanetCase:ot}});export{ig as u};

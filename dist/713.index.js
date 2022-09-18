"use strict";exports.id=713,exports.ids=[713],exports.modules={713:(e,t,n)=>{n.r(t),n.d(t,{toFormData:()=>D});var r=n(749),a=n(951);let i=0;const s={START_BOUNDARY:i++,HEADER_FIELD_START:i++,HEADER_FIELD:i++,HEADER_VALUE_START:i++,HEADER_VALUE:i++,HEADER_VALUE_ALMOST_DONE:i++,HEADERS_ALMOST_DONE:i++,PART_DATA_START:i++,PART_DATA:i++,END:i++};let o=1;const d=o,E=o*=2,A=e=>32|e,h=()=>{};class l{constructor(e){this.index=0,this.flags=0,this.onHeaderEnd=h,this.onHeaderField=h,this.onHeadersEnd=h,this.onHeaderValue=h,this.onPartBegin=h,this.onPartData=h,this.onPartEnd=h,this.boundaryChars={},e="\r\n--"+e;const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n),this.boundaryChars[t[n]]=!0;this.boundary=t,this.lookbehind=new Uint8Array(this.boundary.length+8),this.state=s.START_BOUNDARY}write(e){let t=0;const n=e.length;let r=this.index,{lookbehind:a,boundary:i,boundaryChars:o,index:h,state:l,flags:D}=this;const c=this.boundary.length,T=c-1,f=e.length;let _,R;const u=e=>{this[e+"Mark"]=t},H=e=>{delete this[e+"Mark"]},b=(e,t,n,r)=>{void 0!==t&&t===n||this[e](r&&r.subarray(t,n))},L=(n,r)=>{const a=n+"Mark";a in this&&(r?(b(n,this[a],t,e),delete this[a]):(b(n,this[a],e.length,e),this[a]=0))};for(t=0;t<n;t++)switch(_=e[t],l){case s.START_BOUNDARY:if(h===i.length-2){if(45===_)D|=E;else if(13!==_)return;h++;break}if(h-1==i.length-2){if(D&E&&45===_)l=s.END,D=0;else{if(D&E||10!==_)return;h=0,b("onPartBegin"),l=s.HEADER_FIELD_START}break}_!==i[h+2]&&(h=-2),_===i[h+2]&&h++;break;case s.HEADER_FIELD_START:l=s.HEADER_FIELD,u("onHeaderField"),h=0;case s.HEADER_FIELD:if(13===_){H("onHeaderField"),l=s.HEADERS_ALMOST_DONE;break}if(h++,45===_)break;if(58===_){if(1===h)return;L("onHeaderField",!0),l=s.HEADER_VALUE_START;break}if(R=A(_),R<97||R>122)return;break;case s.HEADER_VALUE_START:if(32===_)break;u("onHeaderValue"),l=s.HEADER_VALUE;case s.HEADER_VALUE:13===_&&(L("onHeaderValue",!0),b("onHeaderEnd"),l=s.HEADER_VALUE_ALMOST_DONE);break;case s.HEADER_VALUE_ALMOST_DONE:if(10!==_)return;l=s.HEADER_FIELD_START;break;case s.HEADERS_ALMOST_DONE:if(10!==_)return;b("onHeadersEnd"),l=s.PART_DATA_START;break;case s.PART_DATA_START:l=s.PART_DATA,u("onPartData");case s.PART_DATA:if(r=h,0===h){for(t+=T;t<f&&!(e[t]in o);)t+=c;t-=T,_=e[t]}if(h<i.length)i[h]===_?(0===h&&L("onPartData",!0),h++):h=0;else if(h===i.length)h++,13===_?D|=d:45===_?D|=E:h=0;else if(h-1===i.length)if(D&d){if(h=0,10===_){D&=~d,b("onPartEnd"),b("onPartBegin"),l=s.HEADER_FIELD_START;break}}else D&E&&45===_?(b("onPartEnd"),l=s.END,D=0):h=0;if(h>0)a[h-1]=_;else if(r>0){const e=new Uint8Array(a.buffer,a.byteOffset,a.byteLength);b("onPartData",0,r,e),r=0,u("onPartData"),t--}break;case s.END:break;default:throw new Error(`Unexpected state entered: ${l}`)}L("onHeaderField"),L("onHeaderValue"),L("onPartData"),this.index=h,this.state=l,this.flags=D}end(){if(this.state===s.HEADER_FIELD_START&&0===this.index||this.state===s.PART_DATA&&this.index===this.boundary.length)this.onPartEnd();else if(this.state!==s.END)throw new Error("MultipartParser.end(): stream ended unexpectedly")}}async function D(e,t){if(!/multipart/i.test(t))throw new TypeError("Failed to fetch");const n=t.match(/boundary=(?:"([^"]+)"|([^;]+))/i);if(!n)throw new TypeError("no or bad content-type header, no multipart boundary");const i=new l(n[1]||n[2]);let s,o,d,E,A,h;const D=[],c=new a.Ct,T=e=>{d+=u.decode(e,{stream:!0})},f=e=>{D.push(e)},_=()=>{const e=new r.$B(D,h,{type:A});c.append(E,e)},R=()=>{c.append(E,d)},u=new TextDecoder("utf-8");u.decode(),i.onPartBegin=function(){i.onPartData=T,i.onPartEnd=R,s="",o="",d="",E="",A="",h=null,D.length=0},i.onHeaderField=function(e){s+=u.decode(e,{stream:!0})},i.onHeaderValue=function(e){o+=u.decode(e,{stream:!0})},i.onHeaderEnd=function(){if(o+=u.decode(),s=s.toLowerCase(),"content-disposition"===s){const e=o.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);e&&(E=e[2]||e[3]||""),h=function(e){const t=e.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);if(!t)return;const n=t[2]||t[3]||"";let r=n.slice(n.lastIndexOf("\\")+1);return r=r.replace(/%22/g,'"'),r=r.replace(/&#(\d{4});/g,((e,t)=>String.fromCharCode(t))),r}(o),h&&(i.onPartData=f,i.onPartEnd=_)}else"content-type"===s&&(A=o);o="",s=""};for await(const t of e)i.write(t);return i.end(),c}}};
//# sourceMappingURL=713.index.js.map
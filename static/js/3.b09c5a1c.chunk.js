(window.webpackJsonp=window.webpackJsonp||[]).push([[3,6],{154:function(e,t,a){"use strict";var n=a(24),r=a.n(n),i=a(29),o=a(18),s=a.n(o),c=a(30),l=a(53),u=a.n(l),d=a(54),m="entering",f="entered",p="exiting";t.a=function(e){var t,a=function(){var e=Object(i.a)(r.a.mark(function e(a){var n,i,o,c=arguments;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=c.length>1&&void 0!==c[1]?c[1]:s.a,i=c.length>2&&void 0!==c[2]?c[2]:s.a,!a){e.next=10;break}return o=Object(d.a)(a)||0,n(o),e.next=7,u()(o);case 7:t.style.display="",e.next=12;break;case 10:t.style.display="",i();case 12:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n=e.prototype.componentDidMount;e.prototype.componentDidMount=function(){n&&n.call(this),(t=Object(c.findDOMNode)(this)).style.display="none",this.props.transitionState!==f&&this.props.transitionState!==m||a(this.props.previousRoute,this.onEnter,this.onAppear)};var o=e.prototype.componentDidUpdate;return e.prototype.componentDidUpdate=function(){o&&o.apply(this,arguments),this.props.transitionState===m?a(this.props.previousRoute,this.onEnter,this.onAppear):this.props.transitionState===p&&function(){(arguments.length>0&&void 0!==arguments[0]?arguments[0]:s.a)()}(this.onLeave)},e}},155:function(e,t,a){"use strict";a.d(t,"c",function(){return i}),a.d(t,"b",function(){return o}),a.d(t,"a",function(){return s});var n=a(158),r=function(e){return e.windowSize},i=Object(n.createSelector)(r,function(e){return e.width}),o=Object(n.createSelector)(r,function(e){return e.height}),s=Object(n.createSelector)(function(e){return e.routing.location},function(e){return e.pathname})},156:function(e,t,a){},157:function(e,t,a){"use strict";var n=a(24),r=a.n(n),i=a(29),o=a(4),s=a(3),c=a(12),l=a(11),u=a(13),d=a(0),m=a.n(d),f=a(7),p=a.n(f),h=(a(17),a(19)),E=a(26),v=a(155),y=(a(159),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=Object(i.a)(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(e){}},{key:"render",value:function(){var e,t,a,n=this.props.isSingle?"single":"";return this.props.isSingle?(e=m.a.createElement("p",{className:"box-info-desc"},"Have you always wondered of what you could do if you were immortal? PYR\u0394MID can make your dream come true. Now with a few clicks you can acquire the ",m.a.createElement("b",null,"FIRST HUMAN POWERED")," NFT that will save a hard copy of yourself on the blockchain, FOREVER. However it\u2019s a ",m.a.createElement("b",null,"TIME LIMITED OFFER"),", so start bidding now to get the chance to become immortal."),t=m.a.createElement("button",{className:"box-info-button cta",onClick:this.props.clickFunction},"BID NOW"),a=m.a.createElement("div",{className:"box-info-asset"},m.a.createElement("li",null,m.a.createElement("ul",null,m.a.createElement("h1",null,"Chain Info:"),m.a.createElement("p",null,"NA")),m.a.createElement("ul",null,m.a.createElement("h1",null,"Contract Address:"),m.a.createElement("p",null,"F\u0394KE NUmb3rs")),m.a.createElement("ul",null,m.a.createElement("h1",null,"Token ID:"),m.a.createElement("p",null,"782736392920208742920377")),m.a.createElement("ul",null,m.a.createElement("h1",null,"Blockchain:"),m.a.createElement("p",null,"PYR\u0394MID"))))):(e=m.a.createElement("p",{className:"box-info-desc"},"Thus unique NFT will grant you digital immortality by unlocking your digital twin."),t=m.a.createElement(E.a,{className:"box-info-button cta",link:"./asset/eternity"},"BID NOW")),m.a.createElement("div",{className:p()("box-info",n)},m.a.createElement("div",{className:"box-info-bid"},m.a.createElement("div",{className:"box-info-image"},m.a.createElement("img",{src:"https://www.indiewire.com/wp-content/uploads/2019/12/avatar-2.jpg",alt:"alt"})),m.a.createElement("div",{className:"box-info-data"},m.a.createElement("h2",null,"Immortal #4"),m.a.createElement("p",null,"Edition 1 of 1"),e,m.a.createElement("div",{className:"box-info-status"},m.a.createElement("div",{className:"box-info-status-top"},m.a.createElement("ul",null,m.a.createElement("li",null,m.a.createElement("p",{className:"box-info-status-top-title"},"Highest Bid"),m.a.createElement("p",{className:"box-info-status-top-bid"},"200.00 \u0394"),m.a.createElement("p",{className:"box-info-status-info"},"15,000 clicks")),m.a.createElement("li",null,m.a.createElement("p",{className:"box-info-status-top-title"},"Auction ending in"),m.a.createElement("div",{className:"box-info-status-top-counter"},m.a.createElement("ul",null,m.a.createElement("li",{className:"counter-day"},"3"),m.a.createElement("li",{className:"counter-hour"},"16"),m.a.createElement("li",{className:"counter-min"},"21"))),m.a.createElement("div",{className:"box-info-status-info"},m.a.createElement("ul",null,m.a.createElement("li",{className:"counter-info-day"},"Days"),m.a.createElement("li",{className:"counter-info-hour"},"Hours"),m.a.createElement("li",{className:"counter-info-min"},"Minutes")))))),m.a.createElement("div",{className:"box-info-status-bottom"},t)))),a)}}]),t}(m.a.PureComponent));y.defaultProps={width:window.innerWidth,height:window.innerHeight,path:"",isSingle:!1,clickFunction:null};t.a=Object(h.b)(function(e){return{width:Object(v.c)(e),height:Object(v.b)(e),path:Object(v.a)(e)}},function(e){return{}})(y)},158:function(e,t,a){"use strict";function n(e,t){return e===t}function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n,a=null,r=null;return function(){return function(e,t,a){if(null===t||null===a||t.length!==a.length)return!1;for(var n=t.length,r=0;r<n;r++)if(!e(t[r],a[r]))return!1;return!0}(t,a,arguments)||(r=e.apply(null,arguments)),a=arguments,r}}function i(e){for(var t=arguments.length,a=Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];return function(){for(var t=arguments.length,n=Array(t),i=0;i<t;i++)n[i]=arguments[i];var o=0,s=n.pop(),c=function(e){var t=Array.isArray(e[0])?e[0]:e;if(!t.every(function(e){return"function"===typeof e})){var a=t.map(function(e){return typeof e}).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, instead received the following types: ["+a+"]")}return t}(n),l=e.apply(void 0,[function(){return o++,s.apply(null,arguments)}].concat(a)),u=r(function(){for(var e=[],t=c.length,a=0;a<t;a++)e.push(c[a].apply(null,arguments));return l.apply(null,e)});return u.resultFunc=s,u.recomputations=function(){return o},u.resetRecomputations=function(){return o=0},u}}t.__esModule=!0,t.defaultMemoize=r,t.createSelectorCreator=i,t.createStructuredSelector=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o;if("object"!==typeof e)throw new Error("createStructuredSelector expects first argument to be an object where each property is a selector, instead received a "+typeof e);var a=Object.keys(e);return t(a.map(function(t){return e[t]}),function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(function(e,t,n){return e[a[n]]=t,e},{})})};var o=t.createSelector=i(r)},159:function(e,t,a){},160:function(e,t,a){"use strict";a.r(t);var n=a(24),r=a.n(n),i=a(29),o=a(4),s=a(3),c=a(12),l=a(11),u=a(13),d=a(0),m=a.n(d),f=a(19),p=a(7),h=a.n(p),E=a(26),v=a(53),y=a.n(v),g=(a(17),a(156),a(154)),b=a(8);a(36).a.register("galleryLoaded",function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b.a.GALLERY_LOADED:return t.loaded;default:return e}});var R=a(14),j={title:"Recent Drops",itens:[{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:""},{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:"sold"},{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:""},{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:"sold"},{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:"sold"},{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:"sold"},{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:"sold"},{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:"sold"}]},w=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),u=0;u<n;u++)s[u]=arguments[u];return(a=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(s)))).onAppear=function(){a.animateIn()},a.onEnter=function(){var e=Object(i.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y()(t);case 2:a.animateIn();case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.onLeave=function(){a.animateOut()},a.animateIn=function(){R.c.to(a.container,.3,{autoAlpha:1})},a.animateOut=function(){R.c.to(a.container,.3,{autoAlpha:0})},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){R.c.set(this.container,{autoAlpha:0}),this.props.loaded||this.props.setGalleryLoaded(!0)}},{key:"render",value:function(){var e,t=this;return this.props.isHome&&(e=m.a.createElement("header",{className:"Gallery-header"},m.a.createElement("h1",null,j.title))),m.a.createElement("div",{className:h()("Gallery",this.props.className),ref:function(e){return t.container=e}},m.a.createElement("section",{className:"Gallery-container"},e,m.a.createElement("section",{className:"Gallery-content"},m.a.createElement("ul",{className:"gallery-list"},j.itens.map(function(e,a){return m.a.createElement("li",{key:a,className:"gallery-item"},m.a.createElement(E.a,{link:"./asset/"+e._id},m.a.createElement("img",{src:e.image,alt:"alt"}),m.a.createElement("h2",{className:"gallery-item-title"},e.title),m.a.createElement("div",{className:"gallery-item-info"},m.a.createElement("p",{className:"gallery-item-info-title"},"Highest Bid"),t.props.isHome&&m.a.createElement("p",{className:"gallery-item-info-bid"},e.highestbid+" \u0394"),m.a.createElement("button",{className:"gallery-item-info-button"+("sold"===e.status?"":" active")},"sold"===e.status?"SOLD":"Praise & Interact"))))})))))}}]),t}(m.a.PureComponent);w.defaultProps={};t.default=Object(f.b)(function(e,t){return{previousRoute:e.previousRoute,loaded:e.galleryLoaded.loaded}},function(e){return{setGalleryLoaded:function(t){return e((a=t,{type:b.a.GALLERY_LOADED,loaded:a}));var a}}})(Object(g.a)(w))},162:function(e,t,a){},173:function(e,t,a){"use strict";a.r(t);var n=a(24),r=a.n(n),i=a(29),o=a(4),s=a(3),c=a(12),l=a(11),u=a(13),d=a(0),m=a.n(d),f=a(19),p=a(7),h=a.n(p),E=a(53),v=a.n(E),y=(a(17),a(160)),g=a(69),b=a(157),R=(a(162),a(154)),j=a(8);a(36).a.register("homeLoaded",function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case j.a.HOME_LOADED:return t.loaded;default:return e}});var w=a(14),_=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),u=0;u<n;u++)s[u]=arguments[u];return(a=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(s)))).onAppear=function(){a.animateIn()},a.onEnter=function(){var e=Object(i.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v()(t);case 2:a.animateIn();case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.onLeave=function(){a.animateOut()},a.animateIn=function(){w.c.to(a.container,.3,{autoAlpha:1})},a.animateOut=function(){w.c.to(a.container,.3,{autoAlpha:0})},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){w.c.set(this.container,{autoAlpha:0}),this.props.loaded||this.props.setHomeLoaded(!0)}},{key:"render",value:function(){var e=this;return m.a.createElement("section",{className:h()("Home",this.props.className),ref:function(t){return e.container=t}},m.a.createElement("header",{className:"Home-header"},m.a.createElement("div",{className:"home-header-wrapper"},m.a.createElement("div",{className:"home-header-box big"},m.a.createElement("h1",null,"Hot Sale"),m.a.createElement(b.a,null)),m.a.createElement("div",{className:"home-header-box small-top"},m.a.createElement(g.a,null)),m.a.createElement("div",{className:"home-header-box small-bottom"},m.a.createElement(g.a,null)))),m.a.createElement(y.default,{className:"Home-galery",transitionState:this.props.transitionState,isHome:!0}))}}]),t}(m.a.PureComponent);_.defaultProps={};t.default=Object(f.b)(function(e,t){return{previousRoute:e.previousRoute,loaded:e.homeLoaded.loaded}},function(e){return{setHomeLoaded:function(t){return e((a=t,{type:j.a.HOME_LOADED,loaded:a}));var a}}})(Object(R.a)(_))}}]);
//# sourceMappingURL=3.b09c5a1c.chunk.js.map
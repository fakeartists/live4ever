(window.webpackJsonp=window.webpackJsonp||[]).push([[3,6],{161:function(e,t,a){"use strict";var n=a(25),i=a.n(n),o=a(30),r=a(19),s=a.n(r),c=a(31),l=a(58),u=a.n(l),d=a(57),m="entering",f="entered",p="exiting";t.a=function(e){var t,a=function(){var e=Object(o.a)(i.a.mark(function e(a){var n,o,r,c=arguments;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=c.length>1&&void 0!==c[1]?c[1]:s.a,o=c.length>2&&void 0!==c[2]?c[2]:s.a,!a){e.next=10;break}return r=Object(d.a)(a)||0,n(r),e.next=7,u()(r);case 7:t.style.display="",e.next=12;break;case 10:t.style.display="",o();case 12:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n=e.prototype.componentDidMount;e.prototype.componentDidMount=function(){n&&n.call(this),(t=Object(c.findDOMNode)(this)).style.display="none",window.scrollTo(0,0),this.props.transitionState!==f&&this.props.transitionState!==m||a(this.props.previousRoute,this.onEnter,this.onAppear)};var r=e.prototype.componentDidUpdate;return e.prototype.componentDidUpdate=function(){r&&r.apply(this,arguments),this.props.transitionState===m?a(this.props.previousRoute,this.onEnter,this.onAppear):this.props.transitionState===p&&function(){(arguments.length>0&&void 0!==arguments[0]?arguments[0]:s.a)()}(this.onLeave)},e}},162:function(e,t,a){"use strict";a.d(t,"c",function(){return o}),a.d(t,"b",function(){return r}),a.d(t,"a",function(){return s});var n=a(165),i=function(e){return e.windowSize},o=Object(n.createSelector)(i,function(e){return e.width}),r=Object(n.createSelector)(i,function(e){return e.height}),s=Object(n.createSelector)(function(e){return e.routing.location},function(e){return e.pathname})},163:function(e,t,a){},164:function(e,t,a){"use strict";var n=a(25),i=a.n(n),o=a(30),r=a(5),s=a(4),c=a(11),l=a(10),u=a(12),d=a(0),m=a.n(d),f=a(7),p=a.n(f),h=(a(18),a(17)),E=a(27),v=a(162),b=(a(166),function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=Object(o.a)(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(e){}},{key:"render",value:function(){var e,t,a,n,i,o=this.props.isSingle?"single":"";return this.props.isSingle?(e=m.a.createElement("p",{className:"box-info-desc"},"Have you always wondered of what you could do if you were immortal? PYR\u0394MID can make your dream come true. Now with a few clicks you can acquire the ",m.a.createElement("b",null,"FIRST HUMAN POWERED")," NFT that will save a hard copy of yourself on the blockchain, FOREVER. However it\u2019s a ",m.a.createElement("b",null,"TIME LIMITED OFFER"),", so start bidding now to get the chance to become immortal."),t=m.a.createElement("button",{className:"box-info-button cta",onClick:this.props.clickFunction},"BID NOW"),a=m.a.createElement("div",{className:"box-info-asset"},m.a.createElement("li",null,m.a.createElement("ul",null,m.a.createElement("h1",null,"Chain Info:"),m.a.createElement("p",null,"NA")),m.a.createElement("ul",null,m.a.createElement("h1",null,"Contract Address:"),m.a.createElement("p",null,"F\u0394KE NUmb3rs")),m.a.createElement("ul",null,m.a.createElement("h1",null,"Token ID:"),m.a.createElement("p",null,"782736392920208742920377")),m.a.createElement("ul",null,m.a.createElement("h1",null,"Blockchain:"),m.a.createElement("p",null,"PYR\u0394MID")))),n=m.a.createElement("li",{className:o},m.a.createElement("p",{className:"box-info-status-top-title"},"Reserve price"),m.a.createElement("p",{className:"box-info-status-top-bid"},"25.00 \u0394")),i=m.a.createElement("div",{className:"box-info-status-bid"},m.a.createElement("p",{className:"box-info-status-bid-title"},"Your Bid"),m.a.createElement("p",{className:"box-info-status-bid-bid"},"200.00 \u0394"))):(e=m.a.createElement("p",{className:"box-info-desc"},"Thus unique NFT will grant you digital immortality by unlocking your digital twin."),t=m.a.createElement(E.a,{className:"box-info-button cta",link:"./asset/eternity"},"LEARN MORE")),m.a.createElement("div",{className:p()("box-info",o)},m.a.createElement("div",{className:"box-info-bid"},m.a.createElement("div",{className:"box-info-image"},m.a.createElement("img",{src:"https://www.indiewire.com/wp-content/uploads/2019/12/avatar-2.jpg",alt:"alt"})),m.a.createElement("div",{className:"box-info-data"},m.a.createElement("h2",null,"Immortal #4"),m.a.createElement("p",null,"Edition 1 of 1"),e,m.a.createElement("div",{className:"box-info-status"},m.a.createElement("div",{className:"box-info-status-top"},m.a.createElement("ul",null,m.a.createElement("li",{className:o},m.a.createElement("p",{className:"box-info-status-top-title"},"Highest Bid"),m.a.createElement("p",{className:"box-info-status-top-bid"},"200.00 \u0394"),m.a.createElement("p",{className:"box-info-status-info"},"15,000 clicks")),m.a.createElement("li",{className:o},m.a.createElement("p",{className:"box-info-status-top-title"},"Auction ending in"),m.a.createElement("div",{className:"box-info-status-top-counter"},m.a.createElement("ul",null,m.a.createElement("li",{className:"counter-day"},"3"),m.a.createElement("li",{className:"counter-hour"},"16"),m.a.createElement("li",{className:"counter-min"},"21"))),m.a.createElement("div",{className:"box-info-status-info"},m.a.createElement("ul",null,m.a.createElement("li",{className:"counter-info-day"},"Days"),m.a.createElement("li",{className:"counter-info-hour"},"Hours"),m.a.createElement("li",{className:"counter-info-min"},"Minutes")))),n)),m.a.createElement("div",{className:"box-info-status-bottom"},t,i)))),a)}}]),t}(m.a.PureComponent));b.defaultProps={width:window.innerWidth,height:window.innerHeight,path:"",isSingle:!1,clickFunction:null};t.a=Object(h.b)(function(e){return{width:Object(v.c)(e),height:Object(v.b)(e),path:Object(v.a)(e)}},function(e){return{}})(b)},165:function(e,t,a){"use strict";function n(e,t){return e===t}function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n,a=null,i=null;return function(){return function(e,t,a){if(null===t||null===a||t.length!==a.length)return!1;for(var n=t.length,i=0;i<n;i++)if(!e(t[i],a[i]))return!1;return!0}(t,a,arguments)||(i=e.apply(null,arguments)),a=arguments,i}}function o(e){for(var t=arguments.length,a=Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];return function(){for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];var r=0,s=n.pop(),c=function(e){var t=Array.isArray(e[0])?e[0]:e;if(!t.every(function(e){return"function"===typeof e})){var a=t.map(function(e){return typeof e}).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, instead received the following types: ["+a+"]")}return t}(n),l=e.apply(void 0,[function(){return r++,s.apply(null,arguments)}].concat(a)),u=i(function(){for(var e=[],t=c.length,a=0;a<t;a++)e.push(c[a].apply(null,arguments));return l.apply(null,e)});return u.resultFunc=s,u.recomputations=function(){return r},u.resetRecomputations=function(){return r=0},u}}t.__esModule=!0,t.defaultMemoize=i,t.createSelectorCreator=o,t.createStructuredSelector=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r;if("object"!==typeof e)throw new Error("createStructuredSelector expects first argument to be an object where each property is a selector, instead received a "+typeof e);var a=Object.keys(e);return t(a.map(function(t){return e[t]}),function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(function(e,t,n){return e[a[n]]=t,e},{})})};var r=t.createSelector=o(i)},166:function(e,t,a){},167:function(e,t,a){"use strict";a.r(t);var n=a(25),i=a.n(n),o=a(30),r=a(5),s=a(4),c=a(11),l=a(10),u=a(12),d=a(0),m=a.n(d),f=a(17),p=a(7),h=a.n(p),E=a(27),v=(a(18),a(163),a(161)),b=a(6);a(28).a.register("galleryLoaded",function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b.a.GALLERY_LOADED:return t.loaded;default:return e}});var y=a(2),g={title:"Recent Drops",itens:[{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:""},{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:"sold"},{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:""},{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:"sold"},{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:"sold"},{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:"sold"},{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:"sold"},{_id:"io_0fasda0d0asda0sasdas0doa0sdoifjsdjhfklahu",title:"AI Burger",image:"https://images.squarespace-cdn.com/content/v1/6015e5f68480883a98478b88/1616071848833-965NF4S8KV3EVNRYS8RT/ke17ZwdGBToddI8pDm48kFiDyX7turee3VpMPctvDSlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz8diNPoBq8EvxYGWSCgnSXyTmyvjeHf-5tFeRGy-zRy5vRyjdOPtjfOhQ-tTUKSj4/BURGER.gif",highestbid:32.75,bid_id:"Mano_Brown_78273639292",time:"12090909",chain_info:"fb_0asdsfsaA",contract_address:"782736392920208742920377",token_id:"FAK_PYR\u0394MID",status:"sold"}]},R=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,s=new Array(n),u=0;u<n;u++)s[u]=arguments[u];return(a=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(s)))).onAppear=function(){a.animateIn()},a.onEnter=function(){var e=Object(o.a)(i.a.mark(function e(t){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.animateIn();case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.onLeave=function(){a.animateOut()},a.animateIn=function(){y.d.to(a.container,.8,{x:"0%",autoAlpha:1,ease:y.b.easeOut})},a.animateOut=function(){y.d.to(a.container,.1,{x:"0%",autoAlpha:0,ease:y.b.easeOut})},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){y.d.set(this.container,{x:"100%",autoAlpha:0}),this.props.loaded||this.props.setGalleryLoaded(!0)}},{key:"render",value:function(){var e,t,a=this;return this.props.isHome?e=m.a.createElement("header",{className:"Gallery-header"},m.a.createElement("h1",null,g.title)):t=m.a.createElement("p",{className:"gallery-item-info-title"},"The Original Pimp"),m.a.createElement("div",{className:h()("Gallery",this.props.className),ref:function(e){return a.container=e}},m.a.createElement("section",{className:"Gallery-container"},e,m.a.createElement("section",{className:"Gallery-content"},m.a.createElement("ul",{className:"gallery-list"},g.itens.map(function(e,n){return m.a.createElement("li",{key:n,className:"gallery-item"},m.a.createElement(E.a,{link:"./asset/"+e._id},m.a.createElement("img",{src:e.image,alt:"alt"}),m.a.createElement("h2",{className:"gallery-item-title"},e.title),m.a.createElement("div",{className:"gallery-item-info"},t,a.props.isHome&&m.a.createElement("p",{className:"gallery-item-info-bid"},e.highestbid+" \u0394"),m.a.createElement("button",{className:"gallery-item-info-button"+("sold"===e.status?"":" active")},"sold"===e.status?"SOLD":"VIEW"))))})))))}}]),t}(m.a.PureComponent);R.defaultProps={};t.default=Object(f.b)(function(e,t){return{previousRoute:e.previousRoute,loaded:e.galleryLoaded.loaded}},function(e){return{setGalleryLoaded:function(t){return e((a=t,{type:b.a.GALLERY_LOADED,loaded:a}));var a}}})(Object(v.a)(R))},169:function(e,t,a){},180:function(e,t,a){"use strict";a.r(t);var n=a(25),i=a.n(n),o=a(30),r=a(5),s=a(4),c=a(11),l=a(10),u=a(12),d=a(0),m=a.n(d),f=a(17),p=a(7),h=a.n(p),E=(a(18),a(167)),v=a(73),b=a(164),y=(a(169),a(161)),g=a(6);a(28).a.register("homeLoaded",function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case g.a.HOME_LOADED:return t.loaded;default:return e}});var R=a(2),j=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,s=new Array(n),u=0;u<n;u++)s[u]=arguments[u];return(a=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(s)))).onAppear=function(){a.animateIn()},a.onEnter=function(){var e=Object(o.a)(i.a.mark(function e(t){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.animateIn();case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.onLeave=function(){a.animateOut()},a.animateIn=function(){R.d.to(a.container,.8,{x:"0%",autoAlpha:1,ease:R.b.easeOut})},a.animateOut=function(){R.d.to(a.container,.1,{x:"0%",autoAlpha:0,ease:R.b.easeOut})},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){R.d.set(this.container,{x:"100%",autoAlpha:0}),this.props.loaded||this.props.setHomeLoaded(!0)}},{key:"render",value:function(){var e=this;return m.a.createElement("section",{className:h()("Home",this.props.className),ref:function(t){return e.container=t}},m.a.createElement("header",{className:"Home-header"},m.a.createElement("div",{className:"home-header-wrapper"},m.a.createElement("div",{className:"home-header-box big"},m.a.createElement("h1",null,"Hot Sale"),m.a.createElement(b.a,null)),m.a.createElement("div",{className:"home-header-box small-top"},m.a.createElement(v.a,null)),m.a.createElement("div",{className:"home-header-box small-bottom"},m.a.createElement(v.a,null)))),m.a.createElement(E.default,{className:"Home-galery",transitionState:this.props.transitionState,isHome:!0}))}}]),t}(m.a.PureComponent);j.defaultProps={};t.default=Object(f.b)(function(e,t){return{previousRoute:e.previousRoute,loaded:e.homeLoaded.loaded}},function(e){return{setHomeLoaded:function(t){return e((a=t,{type:g.a.HOME_LOADED,loaded:a}));var a}}})(Object(y.a)(j))}}]);
//# sourceMappingURL=3.d5ba0ba5.chunk.js.map
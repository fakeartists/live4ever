(window.webpackJsonp=window.webpackJsonp||[]).push([[3,6],{188:function(e,t,a){"use strict";var n=a(23),s=a.n(n),o=a(30),i=a(12),r=a.n(i),c=a(36),l=a(65),p=a.n(l),u=a(64),m="entering",d="entered",h="exiting";t.a=function(e){var t,a=function(){var e=Object(o.a)(s.a.mark(function e(a){var n,o,i,c=arguments;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=c.length>1&&void 0!==c[1]?c[1]:r.a,o=c.length>2&&void 0!==c[2]?c[2]:r.a,!a){e.next=10;break}return i=Object(u.a)(a)||0,n(i),e.next=7,p()(i);case 7:t.style.display="",e.next=12;break;case 10:t.style.display="",o();case 12:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n=e.prototype.componentDidMount;e.prototype.componentDidMount=function(){n&&n.call(this),(t=Object(c.findDOMNode)(this)).style.display="none",window.scrollTo(0,0),this.props.transitionState!==d&&this.props.transitionState!==m||a(this.props.previousRoute,this.onEnter,this.onAppear)};var i=e.prototype.componentDidUpdate;return e.prototype.componentDidUpdate=function(){i&&i.apply(this,arguments),this.props.transitionState===m?a(this.props.previousRoute,this.onEnter,this.onAppear):this.props.transitionState===h&&function(){(arguments.length>0&&void 0!==arguments[0]?arguments[0]:r.a)()}(this.onLeave)},e}},189:function(e,t,a){},190:function(e,t,a){"use strict";var n=a(23),s=a.n(n),o=a(30),i=a(4),r=a(3),c=a(6),l=a(5),p=a(7),u=a(0),m=a.n(u),d=a(8),h=a.n(d),f=(a(13),a(11)),b=a(31),v=a(66),E=a(21),y=a(67),x=(a(191),function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=Object(o.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e,t,a,n,s,o=this.props.isSingle?"single":"",i=this.props.data.highestbid,r=Object(E.b)(),c=r&&r.variation,l=Object(y.a)(r.bidData.bid,c);return i=l>i?l:i,this.props.isSingle?(e=m.a.createElement("p",{className:"box-info-desc",dangerouslySetInnerHTML:{__html:this.props.data.full_description}}),"open"===this.props.data.status&&(t=m.a.createElement("button",{className:"box-info-button cta",onClick:this.props.clickFunction},this.props.copy.button_box_asset)),a=m.a.createElement("div",{className:"box-info-asset"},m.a.createElement("li",null,m.a.createElement("ul",null,m.a.createElement("h1",null,this.props.copy.title_chain,":"),m.a.createElement("p",null,this.props.data.chain_info)),m.a.createElement("ul",null,m.a.createElement("h1",null,this.props.copy.title_contract,":"),m.a.createElement("p",null,this.props.data.contract_address)),m.a.createElement("ul",null,m.a.createElement("h1",null,this.props.copy.title_token,":"),m.a.createElement("p",null,this.props.data.token_id)),m.a.createElement("ul",null,m.a.createElement("h1",null,this.props.copy.title_blockchain),m.a.createElement("p",null,this.props.data.blockchain)))),this.props.data.reserve&&(n=m.a.createElement("div",{className:"box-info-box "+o},m.a.createElement("p",{className:"box-info-status-top-title"},this.props.copy.title_reserve),m.a.createElement("p",{className:"box-info-status-top-bid"},this.props.data.reserve+" "+this.props.copy.piramid_ico))),"open"===this.props.data.status&&(s=m.a.createElement("div",{className:"box-info-status-bid"},m.a.createElement("p",{className:"box-info-status-bid-title"},this.props.copy.title_user_bid),m.a.createElement("p",{className:"box-info-status-bid-bid"},l+" "+this.props.copy.piramid_ico)))):(e=m.a.createElement("p",{className:"box-info-desc"},this.props.data.short_description),t=m.a.createElement(b.a,{className:"box-info-button cta",link:"./asset/"+this.props.data._id},this.props.copy.button_box_home)),m.a.createElement("div",{className:h()("box-info",o)},m.a.createElement("div",{className:"box-info-bid"},m.a.createElement("div",{className:"box-info-image",onClick:this.props.previewFunction},m.a.createElement("img",{src:this.props.data.image,alt:this.props.data.title})),m.a.createElement("div",{className:"box-info-data"},m.a.createElement("h2",{className:"box-info-data-title"},this.props.data.title),m.a.createElement("p",{className:"box-info-data-edition"},this.props.copy.title_edition+" "+this.props.data.edition+" "+this.props.copy.separator_edition+" "+this.props.data.sets),e,m.a.createElement("div",{className:"box-info-status"},m.a.createElement("div",{className:"box-info-status-top"},m.a.createElement("div",{className:"box-info-box "+o},m.a.createElement("p",{className:"box-info-status-top-title"},this.props.copy.title_bid),m.a.createElement("p",{className:"box-info-status-top-bid"},i+" "+this.props.copy.piramid_ico),m.a.createElement("p",{className:"box-info-status-info"},this.props.data.clicks+" "+this.props.copy.sub_title_bid)),m.a.createElement("div",{className:"box-info-box "+o},m.a.createElement("p",{className:"box-info-status-top-title"},this.props.copy.title_time),m.a.createElement(v.a,{copy:this.props.copy,isLanding:!1,endDate:this.props.data.ends})),n),m.a.createElement("div",{className:"box-info-status-bottom"},t,s)))),a)}}]),t}(m.a.PureComponent));x.defaultProps={copy:{},data:{},isSingle:!1,clickFunction:null,previewFunction:null};t.a=Object(f.b)(function(e){return{mineIsOpen:e.mineState.data}},function(e){return{}})(x)},191:function(e,t,a){},192:function(e,t,a){"use strict";a.r(t);var n=a(23),s=a.n(n),o=a(30),i=a(4),r=a(3),c=a(6),l=a(5),p=a(7),u=a(0),m=a.n(u),d=a(11),h=a(8),f=a.n(h),b=a(31),v=(a(13),a(188)),E=a(9);a(32).a.register("galleryLoaded",function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case E.a.GALLERY_LOADED:return t.loaded;default:return e}});var y=a(2),x=a(19),g=(a(189),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(l.a)(t).call(this,e))).onAppear=function(){a.animateIn()},a.onEnter=function(){var e=Object(o.a)(s.a.mark(function e(t){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.animateIn();case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.onLeave=function(){a.animateOut()},a.animateIn=function(){y.e.to(a.container,.8,{x:"0%",autoAlpha:1,ease:y.c.easeOut})},a.animateOut=function(){y.e.to(a.container,.1,{x:"0%",autoAlpha:0,ease:y.c.easeOut})},a.state={assets:[]},a.copy=Object(x.b)(a.props.language,"gallery"),a}return Object(p.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=Object(o.a)(s.a.mark(function e(){var t;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(y.e.set(this.container,{x:"100%",autoAlpha:0}),this.props.loaded){e.next=11;break}if(0!==this.props.assetdata.length){e.next=8;break}return e.next=5,Object(x.c)();case 5:t=e.sent,e.next=9;break;case 8:t=this.props.assetdata.length;case 9:this.setState({assets:t}),this.props.setGalleryLoaded(!0);case 11:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e,t=this;return this.props.isHome&&(e=m.a.createElement("header",{className:"Gallery-header"},m.a.createElement("h1",null,this.copy.gallery_title))),m.a.createElement("div",{className:f()("Gallery",this.props.className),ref:function(e){return t.container=e}},m.a.createElement("section",{className:"Gallery-container"},e,m.a.createElement("section",{className:"Gallery-content"},m.a.createElement("ul",{className:"gallery-list"},this.state.assets.filter(function(e){return!e.hot_sale||!t.props.isHome}).map(function(e,a){var n="closed"===e.status;return m.a.createElement("li",{key:a,className:"gallery-item"},m.a.createElement(b.a,{className:"gallery-item-content",link:"./asset/"+e._id},m.a.createElement("div",{className:"image-container"},m.a.createElement("img",{src:e.image,alt:"alt"})),m.a.createElement("h2",{className:"gallery-item-title"},e.title),m.a.createElement("div",{className:"gallery-item-info"},!t.props.isHome&&m.a.createElement("p",{className:"gallery-item-info-title"},e.sub_title),t.props.isHome&&m.a.createElement("p",{className:"gallery-item-info-bid"},e.highestbid+" \u0394"),m.a.createElement("button",{className:"gallery-item-info-button"+(n?"":" active")},n?t.copy.button_sold:t.copy.button_view))))})))))}}]),t}(m.a.PureComponent));g.defaultProps={language:"en",assetdata:[]};t.default=Object(d.b)(function(e,t){return{previousRoute:e.previousRoute,loaded:e.galleryLoaded.loaded}},function(e){return{setGalleryLoaded:function(t){return e((a=t,{type:E.a.GALLERY_LOADED,loaded:a}));var a}}})(Object(v.a)(g))},194:function(e,t,a){},203:function(e,t,a){"use strict";a.r(t);var n=a(23),s=a.n(n),o=a(30),i=a(4),r=a(3),c=a(6),l=a(5),p=a(7),u=a(0),m=a.n(u),d=a(11),h=a(8),f=a.n(h),b=(a(13),a(192)),v=a(84),E=a(190),y=a(188),x=a(9);a(32).a.register("homeLoaded",function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case x.a.HOME_LOADED:return t.loaded;default:return e}});var g=a(2),O=a(19),N=(a(194),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(l.a)(t).call(this,e))).onAppear=function(){a.animateIn()},a.onEnter=function(){var e=Object(o.a)(s.a.mark(function e(t){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.animateIn();case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.onLeave=function(){a.animateOut()},a.animateIn=function(){g.e.to(a.container,.8,{x:"0%",autoAlpha:1,ease:g.c.easeOut})},a.animateOut=function(){g.e.to(a.container,.1,{x:"0%",autoAlpha:0,ease:g.c.easeOut})},a.state={assets:[]},a.copy=Object(O.b)(a.props.language,"home"),a.boxcopy=Object(O.b)(a.props.language,"boxinfo"),a}return Object(p.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=Object(o.a)(s.a.mark(function e(){var t;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(g.e.set(this.container,{x:"100%",autoAlpha:0}),this.props.loaded){e.next=7;break}return e.next=4,Object(O.c)();case 4:t=e.sent,this.setState({assets:t}),this.props.setHomeLoaded(!0);case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state.assets.filter(function(e){return e.hot_sale})[0];return m.a.createElement("section",{className:f()("Home",this.props.className),ref:function(t){return e.container=t}},m.a.createElement("header",{className:"Home-header"},m.a.createElement("div",{className:"home-header-wrapper"},m.a.createElement("div",{className:"home-header-container home-box left"},m.a.createElement("h1",null,this.copy.title_horsale),m.a.createElement(E.a,{copy:this.boxcopy,data:t})),m.a.createElement("div",{className:"home-header-container  right"},m.a.createElement("div",{className:"home-box small"},m.a.createElement(v.a,null)),m.a.createElement("div",{className:"home-box small"},m.a.createElement(v.a,null))))),m.a.createElement(b.default,{className:"Home-galery",transitionState:this.props.transitionState,isHome:!0,assetdata:this.state.assets,language:this.props.language}))}}]),t}(m.a.PureComponent));N.defaultProps={language:"en"};t.default=Object(d.b)(function(e,t){return{previousRoute:e.previousRoute,loaded:e.homeLoaded.loaded}},function(e){return{setHomeLoaded:function(t){return e((a=t,{type:x.a.HOME_LOADED,loaded:a}));var a}}})(Object(y.a)(N))}}]);
//# sourceMappingURL=3.3274fb12.chunk.js.map
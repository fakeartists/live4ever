(window.webpackJsonp=window.webpackJsonp||[]).push([[3,6],{239:function(e,t,a){"use strict";var n=a(11),s=a.n(n),i=a(16),o=a(20),r=a.n(o),c=a(45),l=a(86),p=a.n(l),u=a(85),m="entering",d="entered",h="exiting";t.a=function(e){var t,a=function(){var e=Object(i.a)(s.a.mark(function e(a){var n,i,o,c=arguments;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=c.length>1&&void 0!==c[1]?c[1]:r.a,i=c.length>2&&void 0!==c[2]?c[2]:r.a,!a){e.next=10;break}return o=Object(u.a)(a)||0,n(o),e.next=7,p()(o);case 7:t.style.display="",e.next=12;break;case 10:t.style.display="",i();case 12:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n=e.prototype.componentDidMount;e.prototype.componentDidMount=function(){n&&n.call(this),(t=Object(c.findDOMNode)(this)).style.display="none",window.scrollTo(0,0),this.props.transitionState!==d&&this.props.transitionState!==m||a(this.props.previousRoute,this.onEnter,this.onAppear)};var o=e.prototype.componentDidUpdate;return e.prototype.componentDidUpdate=function(){o&&o.apply(this,arguments),this.props.transitionState===m?a(this.props.previousRoute,this.onEnter,this.onAppear):this.props.transitionState===h&&function(){(arguments.length>0&&void 0!==arguments[0]?arguments[0]:r.a)()}(this.onLeave)},e}},240:function(e,t,a){},241:function(e,t,a){"use strict";var n=a(1),s=a(3),i=a(5),o=a(2),r=a(6),c=a(0),l=a.n(c),p=a(12),u=a.n(p),m=a(35),d=a.n(m),h=(a(21),a(15)),f=a(30),b=a(87),v=a(14),E=a(48),y=(a(242),function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(i.a)(this,Object(o.a)(t).call(this,e))).updateHighest=function(e){a.setState({highest:e})},a.state={highest:0},a}return Object(r.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e,t,a,n,s,i,o=Object(v.b)(),r=o&&o.variation,c=d()(new Date(this.props.data.ends)),p=d()(),m=d.a.duration(c.diff(p)),h=Math.floor(m.asDays()),y=this.props.isSingle?"single":"",g=!(h<0||isNaN(h)),x="-",N=this.state.highest,O=this.props.data.webgl?" preview":"",_=g?this.props.clickFunction:this.props.previewFunction,k=g?this.props.copy.image_click_bid:this.props.copy.image_click;g&&(N=(x=o.bidData.bid)>N?x:N,x=Object(E.b)(x,r));var j=N;return N=Object(E.b)(N,r),this.props.isSingle?(e=l.a.createElement("p",{className:"box-info-desc",dangerouslySetInnerHTML:{__html:this.props.data.full_description}}),g&&(t=l.a.createElement("button",{className:"box-info-button cta",onClick:this.props.clickFunction},this.props.copy.button_box_asset)),i=l.a.createElement("div",{className:"box-info-image-overlay"},l.a.createElement("div",{className:"box-info-image-overlay-ico"}),l.a.createElement("p",null,k)),a=l.a.createElement("div",{className:"box-info-asset"},l.a.createElement("li",null,l.a.createElement("ul",null,l.a.createElement("h1",null,this.props.copy.title_chain,":"),l.a.createElement("p",null,this.props.data.chain_info)),l.a.createElement("ul",null,l.a.createElement("h1",null,this.props.copy.title_contract,":"),l.a.createElement("p",null,this.props.data.contract_address)),l.a.createElement("ul",null,l.a.createElement("h1",null,this.props.copy.title_token,":"),l.a.createElement("p",null,this.props.data.token_id)),l.a.createElement("ul",null,l.a.createElement("h1",null,this.props.copy.title_blockchain),l.a.createElement("p",null,this.props.data.blockchain)))),this.props.data.reserve&&(n=l.a.createElement("div",{className:"box-info-box "+y},l.a.createElement("p",{className:"box-info-status-top-title"},this.props.copy.title_reserve),l.a.createElement("p",{className:"box-info-status-top-bid"},this.props.data.reserve+" "+this.props.copy.piramid_ico))),g&&(s=l.a.createElement("div",{className:"box-info-status-bid"},l.a.createElement("p",{className:"box-info-status-bid-title"},this.props.copy.title_user_bid),l.a.createElement("p",{className:"box-info-status-bid-bid"},x+" "+this.props.copy.piramid_ico)))):(e=l.a.createElement("p",{className:"box-info-desc",dangerouslySetInnerHTML:{__html:this.props.data.short_description}}),_=null,i=l.a.createElement(f.a,{className:"box-info-image-overlay",link:"./asset/"+this.props.data._id},l.a.createElement("div",{className:"box-info-image-overlay-ico"})),t=l.a.createElement(f.a,{className:"box-info-button cta",link:"./asset/"+this.props.data._id},this.props.copy.button_box_home)),l.a.createElement("div",{className:u()("box-info",y)},l.a.createElement("div",{className:"box-info-bid"},l.a.createElement("div",{className:"box-info-image"+O,onClick:_},l.a.createElement("img",{src:this.props.data.image,alt:this.props.data.title}),i),l.a.createElement("div",{className:"box-info-data"},l.a.createElement("h2",{className:"box-info-data-title"},this.props.data.title),l.a.createElement("p",{className:"box-info-data-edition"},this.props.copy.title_edition+" "+this.props.data.edition+" "+this.props.copy.separator_edition+" "+this.props.data.sets),l.a.createElement("div",{className:"box-info-data-image"+O,onClick:_},l.a.createElement("img",{src:this.props.data.image,alt:this.props.data.title}),i),e,l.a.createElement("div",{className:"box-info-status"},l.a.createElement("div",{className:"box-info-status-top"},l.a.createElement("div",{className:"box-info-box "+y},l.a.createElement("p",{className:"box-info-status-top-title"},this.props.copy.title_bid),l.a.createElement("p",{className:"box-info-status-top-bid"},N+" "+this.props.copy.piramid_ico),l.a.createElement("p",{className:"box-info-status-info"},j+" "+this.props.copy.sub_title_bid)),l.a.createElement("div",{className:"box-info-box "+y},l.a.createElement("p",{className:"box-info-status-top-title"},this.props.copy.title_time),l.a.createElement(b.a,{copy:this.props.copy,isLanding:!1,endDate:this.props.data.ends})),n),l.a.createElement("div",{className:"box-info-status-bottom"},t,s)))),a)}}]),t}(l.a.PureComponent));y.defaultProps={copy:{},data:{},isSingle:!1,clickFunction:null,previewFunction:null};t.a=Object(h.b)(function(e){return{mineIsOpen:e.mineState.data}},function(e){return{}},null,{withRef:!0})(y)},242:function(e,t,a){},243:function(e,t,a){"use strict";a.r(t);var n=a(11),s=a.n(n),i=a(16),o=a(1),r=a(3),c=a(5),l=a(2),p=a(6),u=a(0),m=a.n(u),d=a(15),h=a(12),f=a.n(h),b=a(30),v=(a(21),a(239)),E=a(13);a(37).a.register("galleryLoaded",function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case E.a.GALLERY_LOADED:return t.loaded;default:return e}});var y=a(9),g=a(19),x=(a(240),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(l.a)(t).call(this,e))).onAppear=function(){a.animateIn()},a.onEnter=function(){var e=Object(i.a)(s.a.mark(function e(t){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.animateIn();case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.onLeave=function(){a.animateOut()},a.animateIn=function(){y.e.to(a.container,.8,{x:"0%",autoAlpha:1,ease:y.c.easeOut})},a.animateOut=function(){y.e.to(a.container,.1,{x:"0%",autoAlpha:0,ease:y.c.easeOut})},a.state={assets:[]},a.copy=Object(g.b)(a.props.language,"gallery"),a}return Object(p.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=Object(i.a)(s.a.mark(function e(){var t;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(y.e.set(this.container,{x:"100%",autoAlpha:0}),this.props.loaded){e.next=11;break}if(0!==this.props.assetdata.length){e.next=8;break}return e.next=5,Object(g.c)();case 5:t=e.sent,e.next=9;break;case 8:t=this.props.assetdata.length;case 9:this.setState({assets:t}),this.props.setGalleryLoaded(!0);case 11:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e,t=this;return this.props.isHome&&(e=m.a.createElement("header",{className:"Gallery-header"},m.a.createElement("h1",null,this.copy.gallery_title))),m.a.createElement("div",{className:f()("Gallery",this.props.className),ref:function(e){return t.container=e}},m.a.createElement("section",{className:"Gallery-container"},e,m.a.createElement("section",{className:"Gallery-content"},m.a.createElement("ul",{className:"gallery-list"},this.state.assets.filter(function(e){return!e.hot_sale||!t.props.isHome}).map(function(e,a){var n="closed"===e.status,s=n?t.copy.image_click:t.copy.image_click_bid;return m.a.createElement("li",{key:a,className:"gallery-item"},m.a.createElement(b.a,{className:"gallery-item-content",link:"./asset/"+e._id},m.a.createElement("div",{className:"image-container"},m.a.createElement("img",{src:e.image,alt:"alt"}),m.a.createElement("div",{className:"image-overlay"},m.a.createElement("div",{className:"image-overlay-ico"}),m.a.createElement("p",null,s))),m.a.createElement("h2",{className:"gallery-item-title"},e.title),m.a.createElement("div",{className:"gallery-item-info"},!t.props.isHome&&m.a.createElement("p",{className:"gallery-item-info-title"},e.sub_title),t.props.isHome&&m.a.createElement("p",{className:"gallery-item-info-bid"},e.highestbid+" \u0394"),m.a.createElement("button",{className:"gallery-item-info-button active"},n?t.copy.button_sold:t.copy.button_view))))})))))}}]),t}(m.a.PureComponent));x.defaultProps={language:"en",assetdata:[]};t.default=Object(d.b)(function(e,t){return{previousRoute:e.previousRoute,loaded:e.galleryLoaded.loaded}},function(e){return{setGalleryLoaded:function(t){return e((a=t,{type:E.a.GALLERY_LOADED,loaded:a}));var a}}})(Object(v.a)(x))},245:function(e,t,a){},254:function(e,t,a){"use strict";a.r(t);var n=a(11),s=a.n(n),i=a(16),o=a(1),r=a(3),c=a(5),l=a(2),p=a(6),u=a(0),m=a.n(u),d=a(15),h=a(12),f=a.n(h),b=(a(21),a(243)),v=a(110),E=a(241),y=a(239),g=a(13);a(37).a.register("homeLoaded",function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case g.a.HOME_LOADED:return t.loaded;default:return e}});var x=a(9),N=a(19),O=(a(245),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(l.a)(t).call(this,e))).onAppear=function(){a.animateIn()},a.onEnter=function(){var e=Object(i.a)(s.a.mark(function e(t){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.animateIn();case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.onLeave=function(){a.animateOut()},a.animateIn=function(){x.e.to(a.container,.8,{x:"0%",autoAlpha:1,ease:x.c.easeOut})},a.animateOut=function(){x.e.to(a.container,.1,{x:"0%",autoAlpha:0,ease:x.c.easeOut})},a.state={assets:[]},a.copy=Object(N.b)(a.props.language,"home"),a.boxcopy=Object(N.b)(a.props.language,"boxinfo"),a}return Object(p.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=Object(i.a)(s.a.mark(function e(){var t;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(x.e.set(this.container,{x:"100%",autoAlpha:0}),this.props.loaded){e.next=7;break}return e.next=4,Object(N.c)();case 4:t=e.sent,this.setState({assets:t}),this.props.setHomeLoaded(!0);case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state.assets.filter(function(e){return e.hot_sale})[0];return m.a.createElement("section",{className:f()("Home",this.props.className),ref:function(t){return e.container=t}},m.a.createElement("header",{className:"Home-Welcome",dangerouslySetInnerHTML:{__html:this.copy.welcome}}),m.a.createElement("section",{className:"Home-header"},m.a.createElement("div",{className:"home-header-wrapper"},m.a.createElement("div",{className:"home-header-container home-box left"},m.a.createElement("h1",null,this.copy.title_horsale),m.a.createElement(E.a,{copy:this.boxcopy,data:t})),m.a.createElement("div",{className:"home-header-container  right"},m.a.createElement("div",{className:"home-box small"},m.a.createElement(v.a,null)),m.a.createElement("div",{className:"home-box small"},m.a.createElement(v.a,null))))),m.a.createElement(b.default,{className:"Home-galery",transitionState:this.props.transitionState,isHome:!0,assetdata:this.state.assets,language:this.props.language}))}}]),t}(m.a.PureComponent));O.defaultProps={language:"en"};t.default=Object(d.b)(function(e,t){return{previousRoute:e.previousRoute,loaded:e.homeLoaded.loaded}},function(e){return{setHomeLoaded:function(t){return e((a=t,{type:g.a.HOME_LOADED,loaded:a}));var a}}})(Object(y.a)(O))}}]);
//# sourceMappingURL=3.41cedd98.chunk.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{107:function(e,t,a){},108:function(e,t,a){},11:function(e,t,a){"use strict";var n=a(30);t.a={Home:n.a.sitePath,Gallery:n.a.sitePath+"gallery",About:n.a.sitePath+"about"}},111:function(e,t,a){},112:function(e,t,a){},113:function(e,t,a){},114:function(e,t,a){},115:function(e,t,a){},126:function(e,t,a){},128:function(e,t,a){},129:function(e,t,a){"use strict";a.r(t);a(78);var n=a(3),r=a(46);function o(){var e=n.b.getName().toLowerCase(),t=parseFloat(n.b.getVersion()),a=n.d?n.d.getName().toLowerCase():"unknown",o="Unknown"===n.d.getVersion()?Number.MAX_SAFE_INTEGER:parseFloat(n.d.getVersion());if(n.a.isBot())return!0;var i=r[a],s=r[e];if(s||i){if(void 0!==i&&o<i)return!1;if(void 0!==s&&t<s)return!1}return!0}window.location.href.indexOf("unsupported")>=0?o()&&(window.location="/"):o()||(window.location="/unsupported.html");a(79);var i=a(25),s=a(0),c=a.n(s),l=a(37),u=a.n(l),p=a(26),d=a(41),h=a(28),m=a(69),f=a.n(m),E=a(9),k=a(43),O=a(18),v={preloader:{progress:0,ready:!1}};var b,y=a(48),g="(min-width: ".concat(y.b,"px)"),M="(min-width: ".concat(y.a,"px)"),P=window.matchMedia(g),w=window.matchMedia(M),L={get small(){return!this.medium},get medium(){return P.matches},get large(){return w.matches},get all(){return{small:this.small,medium:this.medium,large:this.large}}},j={windowSize:{width:window.innerWidth,height:window.innerHeight},previousRoute:null,layout:L.all};function A(e){return{type:E.a.SET_LAYOUT,layout:e}}var R={},N={preloader:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v.preloader,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case E.a.SET_PROGRESS:return Object(O.a)({},e,{progress:t.progress});case E.a.SET_READY:return Object(O.a)({},e,{ready:t.ready});default:return e}},windowSize:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j.windowSize,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.windowSize;return a===E.a.SET_WINDOW_SIZE?n:e},previousRoute:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j.previousRoute,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.previousRoute;return a===E.a.SET_PREV_ROUTE?n:e},layout:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j.layout,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.layout;return a===E.a.SET_LAYOUT&&Boolean(Object.keys(n).filter(function(t){return e[t]!==n[t]}).length)?n:e},isMobileMenuOpen:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case E.a.SET_IS_MOBILE_MENU_OPEN:return t.isOpen;default:return e}},routing:d.b},F=function(e){var t=Object.keys(e);return Object.keys(R).forEach(function(a){-1===t.indexOf(a)&&(e[a]=function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:null})}),function(e){return function(t,a){switch(a.type){case E.a.BATCH_ACTIONS:return a.actions.reduce(e,t);default:return e(t,a)}}}(Object(h.b)(e))};k.a.setChangeListener(function(e){b.replaceReducer(F(e))});var S=h.c.apply(void 0,[]);var T=f()(),x=b=Object(h.d)((k.a.reducers=N,F(N)),R,S),W=a(10),C=a(7),I=a(15),H=a(14),D=a(16),U=a(133),_=a(70),B=a.n(_),V=a(35),X=a(6),z=a.n(X),K=a(13),G=a.n(K),Z=a(29),Y=a.n(Z),q=(a(20),a(107),a(24)),J=(a(111),a(42)),Q=c.a.memo(c.a.forwardRef(function(e,t){var a=e.component,n=e.children,r=e.role,o=Object(J.a)(e,["component","children","role"]),i="button"===a?r:"button";return c.a.createElement(a,Object.assign({className:z()("BaseButton",e.className),ref:t,role:i},o),n)}));Q.defaultProps={component:"button"};var $=Q,ee="idle",te="close",ae=[0,1,2].map(function(e){return c.a.createElement("span",{key:e,className:"bar ".concat(e)})}),ne=function(e){function t(){return Object(W.a)(this,t),Object(I.a)(this,Object(H.a)(t).apply(this,arguments))}return Object(D.a)(t,e),Object(C.a)(t,[{key:"render",value:function(){return c.a.createElement($,{className:z()("HamburgerButton",this.props.className,this.props.currentState),onMouseEnter:this.props.onMouseEnter,onMouseLeave:this.props.onMouseLeave,onClick:this.props.onClick,tabIndex:this.props.tabIndex,"aria-label":this.props.ariaLabel},c.a.createElement("div",{className:"bars-container"},ae))}}]),t}(s.PureComponent);function re(){return(re=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}ne.defaultProps={tabIndex:0,currentState:ee,onClick:G.a,onMouseEnter:G.a,onMouseLeave:G.a,ariaLabel:"Mobile menu button"};var oe=c.a.createElement("path",{d:"M3 108L104 2L209 108H3Z",stroke:"#42FF00",strokeWidth:2}),ie=c.a.createElement("path",{d:"M61 71L105.126 25L151 71H61Z",stroke:"#42FF00",strokeWidth:2}),se=function(e){return c.a.createElement("svg",re({width:212,height:109,viewBox:"0 0 212 109",fill:"none"},e),oe,ie)},ce=(a.p,function(e){return e?te:ee}),le=function(e){function t(e){var a;return Object(W.a)(this,t),(a=Object(I.a)(this,Object(H.a)(t).call(this,e))).handleHamburgerClick=function(){a.props.setIsMobileMenuOpen(!a.props.isMobileMenuOpen)},a.state={buttonState:ce(e.isMobileMenuOpen)},a}return Object(D.a)(t,e),Object(C.a)(t,null,[{key:"getDerivedStateFromProps",value:function(e,t){var a=ce(e.isMobileMenuOpen);return a!==t.buttonState?{buttonState:a}:null}}]),Object(C.a)(t,[{key:"render",value:function(){var e=this;return c.a.createElement("header",{className:z()("MainNav",this.props.className)},this.props.ariaSiteTitle&&c.a.createElement("h1",{className:"only-aria-visible"},this.props.ariaSiteTitle),c.a.createElement("nav",{className:"nav","aria-label":this.props.ariaNavLabel},this.props.ariaNavTitle&&c.a.createElement("h2",{className:"only-aria-visible"},this.props.ariaNavTitle),this.props.logoSrc&&c.a.createElement(q.a,{link:this.props.logoLink,"aria-label":this.props.logoAriaLabel},c.a.createElement("img",{className:"nav-logo",src:this.props.logoSrc,alt:this.props.logoAlt}),c.a.createElement("p",{className:"nav-logo-text"},"A few clicks away from Eternity")),c.a.createElement("div",{className:"nav-mid-logo-cnt"},c.a.createElement(se,{className:"nav-mid-logo"}),c.a.createElement("div",{className:"nav-mid-logo-text"},c.a.createElement("h1",null,"TXT \u201cRICH\u201d NOW!",c.a.createElement("br",null),"1-800-PYRAMID"),c.a.createElement("p",null,"$2/text"))),this.props.showHamburger?c.a.createElement(ne,{onClick:this.handleHamburgerClick,currentState:this.state.buttonState}):this.props.links&&c.a.createElement("ul",{className:"nav-list"},this.props.links.map(function(t,a){return c.a.createElement(q.a,{key:a,link:t.path,className:z()({active:Y()(e.props.location.pathname)===Y()(t.path)})},c.a.createElement("li",{className:"nav-item"},t.text))}))),this.props.children)}}]),t}(c.a.PureComponent);le.defaultProps={logoAlt:"logo",logoLink:"/",logoAriaLabel:"Home",ariaNavLabel:"Main Navigation",setIsMobileMenuOpen:G.a};var ue=Object(U.a)(le),pe=(a(112),c.a.memo(c.a.forwardRef(function(e,t){return c.a.createElement("footer",{className:z()("Footer",e.className),ref:t},e.links&&c.a.createElement("nav",{className:"footer-nav","aria-label":e.ariaNavLabel},c.a.createElement("ul",{className:"nav-list"},e.links.map(function(e,t){return"link"===e.type?c.a.createElement("li",{key:t,className:"nav-item"},c.a.createElement(q.a,{link:e.path},e.text)):c.a.createElement("div",{key:t,className:"footer-image"})}))),e.children,e.copyright&&c.a.createElement("p",{className:"footer-copyright"},e.copyright))})));pe.defaultProps={ariaNavLabel:"Footer Navigation",copyright:"\xa9 Copyright"};var de=pe,he=(a(113),function(e){function t(){return Object(W.a)(this,t),Object(I.a)(this,Object(H.a)(t).apply(this,arguments))}return Object(D.a)(t,e),Object(C.a)(t,[{key:"componentDidUpdate",value:function(e,t){this.props.closeOnRouteChange&&e.location.pathname!==this.props.location.pathname&&this.props.isMobileMenuOpen&&this.props.setIsMobileMenuOpen(!1)}},{key:"componentWillUnmount",value:function(){this.props.isMobileMenuOpen&&this.props.setIsMobileMenuOpen(!1)}},{key:"render",value:function(){var e=this;return c.a.createElement("nav",{className:z()("HamburgerMenu",this.props.className,{open:this.props.isMobileMenuOpen}),ref:function(t){return e.container=t}},this.props.links&&c.a.createElement("ul",{className:"nav-list"},this.props.links.map(function(t,a){return c.a.createElement("li",{key:a,className:"nav-item"},c.a.createElement(q.a,{link:t.path,className:z()({active:Y()(e.props.location.pathname)===Y()(t.path)})},t.text))})),this.props.children)}}]),t}(c.a.PureComponent));he.defaultProps={setIsMobileMenuOpen:G.a,closeOnRouteChange:!0};var me=Object(U.a)(he),fe=(a(114),function(e){function t(){return Object(W.a)(this,t),Object(I.a)(this,Object(H.a)(t).apply(this,arguments))}return Object(D.a)(t,e),Object(C.a)(t,[{key:"componentDidUpdate",value:function(e,t){this.props.closeOnRouteChange&&e.location.pathname!==this.props.location.pathname&&this.props.hideOnRouteChange&&this.props.onClick()}},{key:"render",value:function(){var e={className:z()("PageOverlay",this.props.className,{"is-showing":this.props.isShowing}),onClick:this.props.onClick};return c.a.createElement("div",e)}}]),t}(c.a.PureComponent));fe.defaultProps={onClick:G.a,hideOnRouteChange:!0};var Ee=Object(U.a)(fe),ke=(a(75),a(132)),Oe=a(131),ve=(a(115),a(11)),be=a(51),ye=Object(s.lazy)(function(){return a.e(3).then(a.bind(null,145))}),ge=Object(s.lazy)(function(){return a.e(5).then(a.bind(null,136))}),Me=Object(s.lazy)(function(){return a.e(4).then(a.bind(null,144))}),Pe=Object(s.lazy)(function(){return a.e(7).then(a.bind(null,146))}).default,we=function(e){var t=e.location,a=Object(J.a)(e,["location"]);return c.a.createElement("main",{className:z()("Pages",a.className),role:"main"},c.a.createElement(V.TransitionGroup,{component:s.Fragment},c.a.createElement(V.Transition,{appear:!0,key:t.pathname,timeout:Object(be.b)(t.pathname)},function(e){return c.a.createElement(s.Suspense,{fallback:c.a.createElement("div",{className:"loading"})},c.a.createElement(ke.a,{location:t},c.a.createElement(Oe.a,{exact:!0,path:ve.a.Home,render:function(){return c.a.createElement(ye,{transitionState:e})}}),c.a.createElement(Oe.a,{exact:!0,path:ve.a.Gallery,render:function(){return c.a.createElement(ge,{transitionState:e})}}),c.a.createElement(Oe.a,{exact:!0,path:ve.a.About,render:function(){return c.a.createElement(Me,{transitionState:e})}}),c.a.createElement(Oe.a,{component:Pe})))})))};we.defaultProps={};var Le=Object(U.a)(we),je=a(22),Ae=a.n(je),Re=a(36),Ne=a(71),Fe=a.n(Ne),Se=a(49),Te=a.n(Se);a(126);function xe(){return(xe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var We=c.a.createElement("path",{d:"M0 11c.511-6.158 5.685-11 12-11s11.489 4.842 12 11h-2.009c-.506-5.046-4.793-9-9.991-9s-9.485 3.954-9.991 9h-2.009zm21.991 2c-.506 5.046-4.793 9-9.991 9s-9.485-3.954-9.991-9h-2.009c.511 6.158 5.685 11 12 11s11.489-4.842 12-11h-2.009z"}),Ce=function(e){return c.a.createElement("svg",xe({width:24,height:24,viewBox:"0 0 24 24"},e),We)},Ie=(a.p,a(50)),He=["".concat("./assets/","button-rollover.mp3"),"".concat("./assets/","button-click.mp3"),"".concat("./assets/","button-sprite.mp3")],De=[].concat(He,Object(i.a)((n.c.isPhone,[])),Object(i.a)((n.c.isTablet,[])),Object(i.a)((n.c.isDesktop,[]))),Ue=function(e){function t(){var e,a;Object(W.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(I.a)(this,(e=Object(H.a)(t)).call.apply(e,[this].concat(r)))).onProgress=function(e){a.props.setProgress(e)},a.onComplete=function(e){a.props.setProgress(1),e()},a.setDone=Object(Re.a)(Ae.a.mark(function e(){return Ae.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.animateOut();case 2:a.props.setReady(!0);case 3:case"end":return e.stop()}},e,this)})),a}return Object(D.a)(t,e),Object(C.a)(t,[{key:"componentDidMount",value:function(){var e=Object(Re.a)(Ae.a.mark(function e(){return Ae.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([this.setTimer(),this.setLoader()]);case 2:this.setDone();case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"animateOut",value:function(e){return Ie.a.to(this.container,.3,{autoAlpha:0,onComplete:e})}},{key:"setTimer",value:function(){var e=Object(Re.a)(Ae.a.mark(function e(){return Ae.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Te()(this.props.minDisplayTime);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"setLoader",value:function(){var e=this;return new Promise(function(t,a){e.loader=Fe()(e.props.options),e.props.assets.forEach(function(t){return e.add(t)}),e.loader.on("progress",e.onProgress),e.loader.on("complete",function(){return e.onComplete(t)}),e.load()})}},{key:"add",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.loader.add(e,t)}},{key:"load",value:function(){this.loader.load()}},{key:"render",value:function(){var e=this;return c.a.createElement("section",{id:"Preloader",ref:function(t){return e.container=t}},c.a.createElement(Ce,{className:"loader-icon"}))}}]),t}(c.a.PureComponent);Ue.defaultProps={className:"",assets:[],minDisplayTime:300,options:{xhrImages:!1,loadFullAudio:!1,loadFullVideo:!1,onProgress:G.a,onComplete:G.a}};var _e=Object(p.b)(function(e,t){return{progress:e.preloader.progress,assets:De}},function(e){return{setProgress:function(t){return e((a=t,{type:E.a.SET_PROGRESS,progress:a}));var a},setReady:function(t){return e((a=t,{type:E.a.SET_READY,ready:a}));var a}}},void 0,{withRef:!0})(Ue);function Be(){return(Be=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var Ve=c.a.createElement("path",{d:"M1578.06 300.863L789.528 2.00015",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),Xe=c.a.createElement("path",{d:"M1577.51 327.824L789.528 2.00019",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),ze=c.a.createElement("path",{d:"M1578.06 360.27L789.528 2.00026",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),Ke=c.a.createElement("path",{d:"M1578.06 400.484L789.528 2.00022",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),Ge=c.a.createElement("path",{d:"M1578.06 450.751L789.528 2.00015",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),Ze=c.a.createElement("path",{d:"M1578.06 514.728L789.528 2.00015",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),Ye=c.a.createElement("path",{d:"M1578.06 600.64L789.528 2.00018",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),qe=c.a.createElement("path",{d:"M1578.06 721.281L789.528 2.00019",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),Je=c.a.createElement("path",{d:"M1477.58 788L789.528 2.00027",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),Qe=c.a.createElement("path",{d:"M1302.84 788L789.528 2.00026",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),$e=c.a.createElement("path",{d:"M1129.18 788L789.528 2.00026",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),et=c.a.createElement("path",{d:"M955.534 788L789.528 2.00025",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),tt=c.a.createElement("path",{d:"M1 300.863L789.528 2.00026",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),at=c.a.createElement("path",{d:"M1.5459 327.825L789.528 2.00024",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),nt=c.a.createElement("path",{d:"M1 360.27L789.528 2.00018",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),rt=c.a.createElement("path",{d:"M0.999756 400.484L789.528 2.0002",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),ot=c.a.createElement("path",{d:"M0.999756 450.751L789.528 2.00029",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),it=c.a.createElement("path",{d:"M0.999756 514.728L789.528 2.00028",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),st=c.a.createElement("path",{d:"M0.999756 600.64L789.528 2.00015",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),ct=c.a.createElement("path",{d:"M0.999756 721.281L789.528 2.00014",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),lt=c.a.createElement("path",{d:"M101.477 788L789.527 2.00023",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),ut=c.a.createElement("path",{d:"M276.22 788L789.527 2.00023",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),pt=c.a.createElement("path",{d:"M449.871 788L789.528 2.00024",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),dt=c.a.createElement("path",{d:"M623.522 788L789.528 2.00025",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),ht=c.a.createElement("path",{d:"M1578.06 692.035L5.36852 692.035",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),mt=c.a.createElement("path",{d:"M1578.06 616.177L5.36852 616.177",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),ft=c.a.createElement("path",{d:"M1578.06 554.028L5.36852 554.028",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),Et=c.a.createElement("path",{d:"M1578.06 504.674L5.36852 504.675",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),kt=c.a.createElement("path",{d:"M1578.06 462.633L5.36852 462.633",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),Ot=c.a.createElement("path",{d:"M1578.06 427.902L5.36852 427.903",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),vt=c.a.createElement("path",{d:"M1578.06 397.742L5.36852 397.742",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),bt=c.a.createElement("path",{d:"M1578.06 371.237L5.36852 371.237",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),yt=c.a.createElement("path",{d:"M1578.06 347.474L5.36852 347.475",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),gt=c.a.createElement("path",{d:"M1578.06 327.367L5.36852 327.368",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),Mt=c.a.createElement("path",{d:"M1578.06 310.002L5.36852 310.002",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),Pt=c.a.createElement("path",{d:"M1578.06 293.551L5.36852 293.551",stroke:"#00FF29",strokeOpacity:.2,strokeWidth:2.51367}),wt=function(e){return c.a.createElement("svg",Be({width:"100%",viewBox:"0 0 1579 789",fill:"none",preserveAspectRatio:"none"},e),Ve,Xe,ze,Ke,Ge,Ze,Ye,qe,Je,Qe,$e,et,tt,at,nt,rt,ot,it,st,ct,lt,ut,pt,dt,ht,mt,ft,Et,kt,Ot,vt,bt,yt,gt,Mt,Pt)},Lt=(a.p,a(30)),jt=a(72),At={logoSrc:a.n(jt).a,logoLink:ve.a.Home,links:[{text:"Gallery",path:ve.a.Gallery},{text:"About",path:ve.a.About}]},Rt={links:[{text:"Home",path:ve.a.Home},{text:"Gallery",path:ve.a.Gallery},{text:"About",path:ve.a.About}]},Nt=a(73),Ft={copyright:"\xa9 FakeArtits",links:[{type:"link",text:"website",path:"https://fakeartists.net/"},{type:"static",text:"",path:a.n(Nt).a},{type:"link",text:"contact",path:"https://fakeartists.net/"}]},St=a(74),Tt={iconSrc:a.n(St).a},xt=n.c.isMobile&&Object(s.lazy)(function(){return a.e(6).then(a.bind(null,143))}),Wt=function(e){function t(){var e,a;Object(W.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(I.a)(this,(e=Object(H.a)(t)).call.apply(e,[this].concat(r)))).handleResize=B()(function(){a.props.setLayout(window.innerWidth,window.innerHeight,L.all)},Lt.a.resizeDebounceTime),a}return Object(D.a)(t,e),Object(C.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.handleResize)}},{key:"componentDidUpdate",value:function(e,t){e.location.pathname!==this.props.location.pathname&&this.props.setPreviousRoute(e.location.pathname)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleResize)}},{key:"render",value:function(){var e=this;return c.a.createElement(s.Fragment,null,c.a.createElement(wt,{className:"lines-bg"}),c.a.createElement(wt,{className:"lines-bg-inv"}),this.props.ready&&c.a.createElement(s.Fragment,null,c.a.createElement(ue,Object.assign({},At,{showHamburger:!this.props.layout.large,isMobileMenuOpen:this.props.isMobileMenuOpen,setIsMobileMenuOpen:this.props.setIsMobileMenuOpen})),!this.props.layout.large&&c.a.createElement(s.Fragment,null,c.a.createElement(Ee,{isShowing:this.props.isMobileMenuOpen,onClick:function(){return e.props.setIsMobileMenuOpen(!1)}}),c.a.createElement(me,Object.assign({},Rt,{isMobileMenuOpen:this.props.isMobileMenuOpen,setIsMobileMenuOpen:this.props.setIsMobileMenuOpen}))),c.a.createElement(Le,null),c.a.createElement(de,Ft)),n.c.isMobile&&c.a.createElement(s.Suspense,{fallback:c.a.createElement("div",{className:"loading"})},c.a.createElement(xt,Tt)),c.a.createElement(V.Transition,{in:!this.props.ready,timeout:0},function(e){return"exited"!==e&&c.a.createElement(_e,{transitionState:e})}))}}]),t}(c.a.PureComponent);Wt.defaultProps={};var Ct=Object(U.a)(Object(p.b)(function(e){return{layout:e.layout,ready:e.preloader.ready,isMobileMenuOpen:e.isMobileMenuOpen}},function(e){return{setPreviousRoute:function(t){return e((a=t,{type:E.a.SET_PREV_ROUTE,previousRoute:a}));var a},setLayout:function(t,a,n){return e((r=[(o={width:t,height:a},{type:E.a.SET_WINDOW_SIZE,windowSize:o}),A(n)],{type:E.a.BATCH_ACTIONS,actions:r}));var r,o},setIsMobileMenuOpen:function(t){return e((a=t,{type:E.a.SET_IS_MOBILE_MENU_OPEN,isOpen:a}));var a}}})(Wt)),It=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Ht(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available; please refresh."),t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t.onSuccess&&t.onSuccess(e)))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}a(128);(function(){var e=document.getElementById("root"),t=[n.c.isMobile?"mobile":"",n.c.getType(),n.b.getName()].filter(function(e){return Boolean(e)});document.body.className=[].concat(Object(i.a)(document.body.className.split(" ")),Object(i.a)(t)).filter(Boolean).join(" ");var a;a=c.a.createElement(Ct,null),u.a.render(c.a.createElement(p.a,{store:x},c.a.createElement(d.a,{history:T},a)),e)})(),function(e){if("serviceWorker"in navigator){if(new URL(".",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat(".","/service-worker.js?ver=").concat(Object({NODE_ENV:"production",PUBLIC_URL:".",REACT_APP_API_DATA_ENDPOINT:"/data",REACT_APP_API_URL:"http://localhost:3000",REACT_APP_PUBLIC_URL:"/live4ever",REACT_APP_WEBSITE_DESCRIPTION:"A few clicks away from Eternity",REACT_APP_WEBSITE_FB_APP_ID:"[fb-id]",REACT_APP_WEBSITE_KEY_WORD:"pyramid,fake,artsts",REACT_APP_WEBSITE_NAME:"Pyramid",REACT_APP_WEBSITE_OG_IMAGE:"",REACT_APP_WEBSITE_OG_LOCALE:"en_US",REACT_APP_WEBSITE_SITE_URL:"https://fakeartists.net",REACT_APP_WEBSITE_TITLE:"Pyramid",REACT_APP_WEBSITE_TW_CARD:"summary"}).REACT_APP_SW_CACHE_BUST);It?(function(e,t){fetch(e).then(function(a){404===a.status||-1===a.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):Ht(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):Ht(t,e)})}}()},24:function(e,t,a){"use strict";var n=a(21),r=a(18),o=a(0),i=a.n(o),s=a(130),c=a(6),l=a.n(c),u=(a(20),a(108),["children","download","target","rel","link"]),p=/^(https:\/\/|http:\/\/|www\.|tel:|mailto:)/,d=/^(https:\/\/|http:\/\/|www\.)/,h=i.a.memo(i.a.forwardRef(function(e,t){var a=p.test(e.link)||e.download?"a":s.a,o=Object.keys(e).reduce(function(t,a){return[].concat(u).indexOf(a)>-1?t:Object(r.a)({},t,Object(n.a)({},a,e[a]))},{});return"a"===a?(o.href=e.link,o.download=e.download,d.test(e.link)&&!e.download&&(o.target=e.target,"_blank"===e.target&&(o.rel=e.rel||"noopener"))):o.to=e.link,i.a.createElement(a,Object.assign({ref:t,className:l()("BaseLink",e.className)},o),e.children)}));h.defaultProps={link:"",target:"_blank"},t.a=h},30:function(e,t,a){"use strict";var n={resizeDebounceTime:10,isDevelopment:!1,sitePath:"/live4ever"};n.assetPath="".concat(n.sitePath,"/assets/"),n.imagesPath="".concat(n.sitePath,"/assets/images/"),n.apiUrl="http://localhost:3000",n.apiDataEndpoint="/data",n.datGui=n.isDevelopment&&!0,n.renderStats=!1,n.webglHelpers=n.isDevelopment&&!0,n.useShadows=!1,n.changeOnMoveMouse=!0,n.autoUpdateBlendShapes=!0,t.a=n},43:function(e,t,a){"use strict";var n=a(21),r=a(18);t.a={_emitChange:null,_reducers:{},get reducers(){return Object(r.a)({},this._reducers)},set reducers(e){this._reducers=e},register:function(e,t){this._reducers=Object(r.a)({},this._reducers,Object(n.a)({},e,t)),this._emitChange&&this._emitChange(this.reducers)},setChangeListener:function(e){this._emitChange=e}}},46:function(e){e.exports={chrome:30,firefox:40,safari:9,"internet explorer":10,edge:12,ios:9,mac:10.1,windows:7}},48:function(e){e.exports={b:768,a:1200}},50:function(e,t,a){"use strict";var n=a(18),r=a(4),o=a(127)(Promise,r.a);o.staggerTo=function(e,t,a,r){return Promise.all(e.map(function(e,i){return o.to(e,t,Object(n.a)({},a,{delay:(a.delay||0)+r*i}))}))},o.staggerFrom=function(e,t,a,r){return Promise.all(e.map(function(e,i){return o.from(e,t,Object(n.a)({},a,{delay:a.delay+r*i}))}))},t.a=o},51:function(e,t,a){"use strict";a.d(t,"a",function(){return s}),a.d(t,"b",function(){return c});var n,r=a(21),o=a(11),i=(n={},Object(r.a)(n,"".concat(o.a.Landing),{exit:300}),Object(r.a)(n,"".concat(o.a.About),{exit:300}),n);function s(e){return e="/"+e.split("/")[1],i[e]?i[e].exit:0}function c(e){return e="/"+e.split("/")[1],i[e]||0}},72:function(e,t,a){e.exports=a.p+"static/media/logo_pyramid.f96d82a5.png"},73:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ4AAABpCAYAAADLEpraAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABEYSURBVHgB7Z0LVFXXmcc3CkgUVB4qivGBKCg6UUkUn0uNj0wcHTNGZ9LWxLEa09WxNiTTNpl0jJPUZJK2RtNqTV1JVhKTRtvGpS4T4rsGjAo+EBRFBZEoKiqgURSE/j7KYR2ugDwucG/4fmudxT3n7HvPvnf/z7e//X37bIxRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEVpcNLS0toePnw4nJceRvnO4WlckEWLFnn6+/sv6dKlS3R6evqPe/bsuY/DJdb59evX+4WHh0/38PBoYX9fbm7u5c9h8eLFt41r4JGYmDixTZs2IdaB27dvX0lNTY2dOXPmTaO4FpmZmXPu3LlTVAI3btw4lJGRMc46xyGPS5cu/YHzJfatsLAwPzs7ewGibWFcB4+cnJyd9npS98OfffZZe6O4FnSxg27dunWixEZBQcHpQ4cO9ZHzZ8+enVtcXFxUUpHi69evr6ZrbmNcC48rV67stFdUheeCxMfHB3z77bd/FiE5CEss3/GkpKQZdFVXHc/xnuSjR4/2Nq6HCq8KXMrHu++++6IQlk9RUdEOLy+vgewH2M716d69+5KbN28eYCt/D37e7by8vOX9+vVLM4rb4FLCW7JkyfZZs2bFyevo6OhYxDbSfv7atWsbDhw48EvH9+HAFxjFrXAp4a1bt+4O2w15ffHixRLH81i3wqlTp94wTiQhIaFdcHDw9729vav9LfLz889++OGHGxkxFxkncezYsTGBgYH/5Hj8woULFwcMGPCpsY3kawvfyysoKGhq69atQ6oqQ0+R/uKLL26W3900Mi4ZTmks1q5d6033/ToN9My9ytL1bye8E8tLpwjv5MmT07j2p56ent724wykvkF400w9RLdjxw6fkJCQX3Xs2PHZFi1aVBkHbdmyZSwuyhZeqvAak2HDho0nXjjPNDK9evWa2KNHj5U0/F2iy8rKmoK1O2jqSGxsbJvIyMi3uZn+kx7CuCpuJTx8vjHffPPN61WdZ3R7btOmTX+MiYm5Z3AWa9eObm45jd/SNCKtWrWKCAsL+4jLetmPE0K6cOrUqcf69+9fZ9FJ4D0qKupjvtdU4+K4lfCwTkNlq+wcwVl6qAvP1ER0Apbldlxc3LjKzl29erXdpEmT1rZt2zbCOBkElr5ly5bvUd982ecao4YPH77q8uXLL2OpEkwdkcD5woULv+T3GWsdO3HixOdfffXVs9b+iBEjXiHjM8MoVcPg4m8lNYSAcgkZgrexYk6xXq+99po/6bdD9msgxm2rVq1qbWrHXXE8vlfSmjVr/OXk7t27RxL4vlAWJM8gPTiprpmXMWPGePJZFX4X/MiP7WWwqCvs5xH7F1zPxzQBbmXxiO9d4/fKdTxOXC+NzMbL5D/r7SRjIfywGn3oChu0QUR0gwYN+gt53I6yTxfcnQHBB/Pnz39+ypQpf3rwwQcLzXcYtxLe+fPnVy9duvR/HI/j2xW988479WooERxhlRE45fPwJR8mvNLONADcOB6MjqMGDhy4whKdBSPnjh06dFjBSDQES/Tr+oZu+BzPrVu3Blr7DDZaltXB0Etc40bOZLfYNAFuJTys0G2E57RZHcuXL281YcKEqM6dO0+m0af4+PhE0lgNOskA386L7/EQMbTNbKXHsLDRxNtKfVfCK76I7ycPPPDAu+xeNPWAm2gSPmS8tc91/enSU/Ez/0owHk1u3dNUM3maZTiF7EeHgICAiWxzsW7RNILkUA9xaq+cxxp4Yf36ca62Pt09QeC38K1Wjh49utxlYP/XlvAEsYpY8Xr7q35+fm35rLZYtqu4I19znU/wXbcNHjz4nGlimqXw7r///hcQ3ULLumVmZn45bdq0f7XOjxs3LuCNN974EuFFGjeGvPd1mbWD2D4+fvx40qOPPnrLuAjNUnj4b4H2LpXu7U5GRkZ5vrdTp063ON0kvo8zIby0qVu3bjGmHlmQhsKVJk0qToZuVgZcLic6oVmnzCzwr8K2b9/+rO2QDyPAtvYyWMBOpNhmHTlypJDR9e6JEyc25DQsX0ItT6SkpORitQ7T9SeaOiBZEj5jjuNxBjjF586d2/DII49cMU1EsxTejRs3kghlFDPKK7X45E174/f91jqPY3+QkV8cg4wQCUnIMV9f38iIiIg/4KjnkhHoZ5wI9dnG6HMeXX6p2KmXLxmG3xQWFl7m2CxTRzp27PgQ6bOHHI8zyFiH/7fGNCHNsqsl37tcptAjrsuyL8l0Grh041gCo9wfrVixYhZWIQbrUDoNS1xCOU8G4+3p06efN06ka9euX2BFn0Jo5RZIUsiMRD+iDjtq8hk7d+4sRlCLqHsqN0yx4/eyNr7PGUbwz33XA9R1prKUGY3zunEeHqSURmDdjlmfT0OfhiHG9kglIv0PBHGpbIp94sGDB2szbb1WU9+xpKOJs6VLOW6ALEaitc0Ve5AHbifz/LjuCixpuqQTLbDWBfyG/2VcAJedN5OcnPwAcSg/+zHu/iz8rAzjRI4ePdqZLukl4mtjsRizQ0ND9xubQy753yFDhoymK1yK8BbSJe8ytYDUWB8+vzxDQXgjnzjaEaxRpU5/QkJCBHVYRle4mdH18qrK3QuJBSYmJgYSjB6GDzuV0NBUxLyefPDPsHZ5Rml6JDG/YMGCVtWVefrpp72kMU0jIGKfMWOGU6drSZZm1apVXkZRFDdh165dPeswNalJwGp1cJe6KlUgM0dw8hdICgiH+RwO8n+npaV1daVVA6Qb3rFjRzCj5emMfNexZcfFxQ00ilvikZqa2pNG/MhxhIsA0wiuPkeqq3Nj+V5VwQAilLr8jsFHljWKJKyRq8KrGpeN42E9PAl3TGIUub59+/bfczzPKC2MEdubbFuysrJ+XMswR52QEefzzz9/1zIZ1M+X+Fie6E3uCdMIyPMVW7dudWogu9kjS5Tl5OT8XFZWKqkBWJk7+fn5+wgVTGso60eqrC+WN54QRd+qykh8Dgv8b7m5uevZzjaUxRPR4W48SaxznVGcggei60UDf4CYCi1hIaocjmXaNxo2k8BuhcV7EGoRXfNY42REdHSje4iDlVQnPAvxPfft2xe6adMmf+NkRHRnzpx5UtJpeXl524xSf4g1tUVkO+3RdmHPnj0/69evn7d927BhQzcCvjn2cjSGPODyz6aWxMfHh1V1LikpaQAZjfSybEKNhNdQiOgIov+Ubr30pnRn4bnUJAEi7J7kKAMcH0T29vYuJMNQYYp2ly5dCmsa1SePOZZkeU9rn+zBeTIgn8vrlJSUod27d/8dgnoyKirqmP19krIij/qhj49PD9mXfC2vJ2MBh9nLYX1lpJ3et2/fEdYxBj8FiGTzY489lltd3UhvRZE1edDxON1o/PDhw49Y+yK6uXPn/ogkyJvWxAW0F0Rd7pp9Qr13P/744+WzZyQgPWDAgFFcJ9xeTm5U/OMvJkyYkGmaM6tXr5ZlypIcfThE8axjWRz9zuQjL9XE4mEZ4+2LI+I/lj6HIOEPRJgqi0CSQ5XZKeWKp8sOpy5xjtbXcUFI8p+FNPR4yv+f/TiW++q9fLxTp049jDU95/h9OZZJCKmLVU6Eg4h/wPe7a4k2x/pgBRMkX2u9lyKe2dnZc3BDchzfy8j7a3qOJok1NovZKWJBxVpZmyApqUGDBi1p06ZNOMdakoudjoBKF9Che41gNP0uI+fhjtbX/jmyIf41ffr02eZ43KP69SM8EN1krvEpFrSz/YQIHaH878iRI0ufixDRYZ2fYPT+lqen510jd/s1xRuQWTdYsPJcLBZtNtb+LaxdoP19iPQmIaAYZy+CVFPcYj5ecHDwJH5Qxwbya9Wqla+pA6KJZcuWLUBs5XPdaJiuNG4MXe8KuvGl7A+jIY2jfrBwpY8HCvh8XyPS58aPH19y4sSJGl1bBh7kff+da72NWAKxOvZ6FWOZ/oKFXlNW1js6OvqHAQEBr7Ab6Fgf2Zf6WLt0z6/2799fHlqSHqE1wn7G39//V4jMx76moJTF0r8VFha2xzQRbiE8hDCJP5OMk8CPHEzDD6YRy7+/LOTt5+f3+OHDh9/Ep5xFw3jQsE/ReC9ZZaSRCdlMwRKmyj7d2hVEV+NZvOKnIbqfdurU6RV5YBzRJdOFVljnBOHlWnPlFi9eXDhmzJh11G0LmRtv/LS1+MHlDyDhR+5jhP99eS1dJ8Ir9dVwIdp369bt1aCgoLm8txWuxVrE/Av7dT755JOzpgmnxTfLGcg0eg4W9P3KzmHpOvTu3bt08iX+YgWnW+ZXIpZTdK0nTR2YN2/eLxDdIq5vDQ4KIiIi0qt5S8nYsWNz+JuDa+D9/vvvV5jOhCW7zo1RoS6Izher9ybd62zrxpJ1Be9xnUbHLYQn3QSWoMIx8Wnwz0xdnr+mi8wMDQ19yTQyWNTJlugaCiy5Ly7IZLs1d0XcQniEKl6mu/jAfowftnN4ePhG/LQA4z5UcBjpsiP4XnGVjUNkhEoWZP6QIUNSTC3BMle4G7lBp9LVxlVWluvIY5BP0o2fMo2IWwiPHyd76NChFboKnOcCuiqnLQvbFNCt+9IlDq/snAiCbl0GVLUWniOMnP3YKr2OuA/EIb1NI6PP1SpNgj5X24gwUpZMRKUjSXzV9r6+vvVeCJLAtaxbsZ/uO6iK63TkOqGmiVHhNSIhISFVrreMP/cwgthq6glpNgnvTKnqfHJy8lxy3X9s6vWRv1NdrfyY+Cztd+/e7S+xLOPG//mRkXwKI/k6hW1qCj5yMWnBzQw+LplGxm0tHs5yCUK7zsvyRwcltEKw+f8JnL5QUFBwEgH+cNSoUVeNk5DPRwwjNm7c2AlhXJ45c2Z5Er/ESmeUwcDBS9Y3JhMSyMj14ujRo5PLJjV4bN++vR8N3sFenu4xynotOVRSak+Q0suorj7cZEHUZYy8JtecMmfOHLuAPGJjYyOpb4Uul3xvD7lBZWBGt/xX4pk/YUSbY5ozVU0SIB0137Gs5DAJs8zmh8x1LM+xa/YHl8mnxtvPW5ME7gVZjKGO/zuN7IVsxXSNL9rLUsd/IT6YXUkSv5DrvVJSNkGVFFuo/F+2ss8p3yR8InlasiFf7Nu3L9ixLpJq43OWldj+z5uUl/dyE+Tt3bu3j728zHqRLEhl12G7zW/yjvQMRqmd8ASZHk/K6WmElmdrjCLSSO/K/3uwytVVeILMdqEBL5ZUnNWRiPDvs5cTYZBOewRLe8I+o4WycQjpfqu+WKZVxY5TXsqqLmuaVCcGyUqQFvu99S9VrfedOXPmBXs5mXFCiGRrJdcQ0d2kDr+RB6iM8g9kNXQa6rBMb7Jv3L3zq3qPNCaNMQdrc07aky5r++nTp7vby8i0KPtdL3PdTC1IS0uLxqok3PkHt44fPz6kqrJYwsGU3SWCQLCXuTHKc8zcQNM5ds3RCvEdixHK70VY96qLPJSNNf857yudTsX33fXee+9VWCg8MzPzOflMx+vIU3rchK9ygzTJSu92XMr5lqf1Y2JihpDyqXA37t+/PxF/qkoHWMTXt2/fp3CSYxDV7F69eu23n5fp8PiE5RYKi5iL/1Qr8R05cqRXjx49XsciXwkODp5fXVlulB6UeYubIWXlypWLrEW0Dxw4MCwgIOAuiyaGCMHuIi9b038G2ALfbJq/v/8vsXY/iIyMLA8yy7/JGjhwYLS3t/ddIqY++dzYe3XBHici4ktMTAwracBHHbF0QTRsjaZiyah68+bNbU0Dgl/X0yiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKojQ5fwcvMyO0iTFdtwAAAABJRU5ErkJggg=="},74:function(e,t,a){e.exports=a.p+"static/media/rotate.91da6633.svg"},77:function(e,t,a){e.exports=a(129)},79:function(e,t){},9:function(e,t,a){"use strict";t.a={SET_READY:"SET_READY",SET_PROGRESS:"SET_PROGRESS",BATCH_ACTIONS:"BATCH_ACTIONS",SET_WINDOW_SIZE:"SET_WINDOW_SIZE",SET_LAYOUT:"SET_LAYOUT",SET_IS_MOBILE_MENU_OPEN:"SET_IS_MOBILE_MENU_OPEN",SET_PREV_ROUTE:"SET_PREV_ROUTE",HOME_LOADED:"HOME_LOADED",GALLERY_LOADED:"GALLERY_LOADED"}}},[[77,1,2]]]);
//# sourceMappingURL=main.50419387.chunk.js.map
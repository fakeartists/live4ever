(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{171:function(t,n,e){"use strict";var a=e(21),o=e.n(a),i=e(29),r=e(22),s=e.n(r),u=e(33),c=e(62),p=e.n(c),h=e(61),l="entering",f="entered",d="exiting";n.a=function(t){var n,e=function(){var t=Object(i.a)(o.a.mark(function t(e){var a,i,r,u=arguments;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=u.length>1&&void 0!==u[1]?u[1]:s.a,i=u.length>2&&void 0!==u[2]?u[2]:s.a,!e){t.next=10;break}return r=Object(h.a)(e)||0,a(r),t.next=7,p()(r);case 7:n.style.display="",t.next=12;break;case 10:n.style.display="",i();case 12:case"end":return t.stop()}},t,this)}));return function(n){return t.apply(this,arguments)}}(),a=t.prototype.componentDidMount;t.prototype.componentDidMount=function(){a&&a.call(this),(n=Object(u.findDOMNode)(this)).style.display="none",window.scrollTo(0,0),this.props.transitionState!==f&&this.props.transitionState!==l||e(this.props.previousRoute,this.onEnter,this.onAppear)};var r=t.prototype.componentDidUpdate;return t.prototype.componentDidUpdate=function(){r&&r.apply(this,arguments),this.props.transitionState===l?e(this.props.previousRoute,this.onEnter,this.onAppear):this.props.transitionState===d&&function(){(arguments.length>0&&void 0!==arguments[0]?arguments[0]:s.a)()}(this.onLeave)},t}},178:function(t,n,e){},183:function(t,n,e){"use strict";e.r(n);var a=e(21),o=e.n(a),i=e(29),r=e(4),s=e(3),u=e(7),c=e(6),p=e(8),h=e(0),l=e.n(h),f=e(14),d=e(9),b=e.n(d),v=(e(18),e(171)),m=e(2),y=e(23),O=(e(178),function(t){function n(t){var e;return Object(r.a)(this,n),(e=Object(u.a)(this,Object(c.a)(n).call(this,t))).onAppear=function(){e.animateIn()},e.onEnter=function(){var t=Object(i.a)(o.a.mark(function t(n){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.animateIn();case 1:case"end":return t.stop()}},t,this)}));return function(n){return t.apply(this,arguments)}}(),e.onLeave=function(){e.animateOut()},e.animateIn=function(){m.d.to(e.container,.8,{x:"0%",autoAlpha:1,ease:m.b.easeOut})},e.animateOut=function(){m.d.to(e.container,.1,{x:"0%",autoAlpha:0,ease:m.b.easeOut})},e.copy=Object(y.b)(e.props.language,"about"),e}return Object(p.a)(n,t),Object(s.a)(n,[{key:"componentDidMount",value:function(){m.d.set(this.container,{x:"100%",autoAlpha:0})}},{key:"render",value:function(){var t=this;return l.a.createElement("section",{className:b()("About",this.props.className),ref:function(n){return t.container=n}},l.a.createElement("h1",null,this.copy.title),this.copy.text.map(function(t,n){return l.a.createElement("p",{key:n},t)}))}}]),n}(l.a.PureComponent));O.defaultProps={language:"en"};n.default=Object(f.b)(function(t){return{previousRoute:t.previousRoute}},function(t){return{}})(Object(v.a)(O))}}]);
//# sourceMappingURL=5.aef086bd.chunk.js.map
"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[173],{9173:(y,s,n)=>{n.r(s),n.d(s,{SuperAdminModule:()=>e});var r=n(6895),t=n(4650),m=n(9551),c=n(7918),l=n(3060);const u=function(){return{id:"organizations",title:"Organizations",type:"basic",icon:"heroicons_outline:building-library",link:"organizations"}},h=function(){return{id:"users",title:"Users",type:"basic",icon:"heroicons_outline:users",link:"users"}},f=function(){return{id:"chat",title:"Chat",type:"basic",icon:"heroicons_outline:chat-bubble-oval-left-ellipsis",link:"chat"}},g=function(o,a,d){return[o,a,d]};class i{}i.\u0275fac=function(a){return new(a||i)},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-superadmin"]],hostAttrs:[1,"flex","flex-auto","w-full","max-w-full","min-w-0"],decls:6,vars:16,consts:[[1,"bg-gray-900","text-white",3,"appearance","autoCollapse","inner","mode","name","navigation","opened","position","transparentOverlay"],["fuseVerticalNavigationHeader",""],[1,"flex","items-center","justify-center","h-20","mt-3","mb-4"],["src","assets/images/logo/logo.svg","alt","Logo image",1,"w-10"],["fuseVerticalNavigationFooter","",1,"flex","justify-center","items-center","py-5"]],template:function(a,d){1&a&&(t.TgZ(0,"fuse-vertical-navigation",0),t.ynx(1,1),t.TgZ(2,"div",2),t._UZ(3,"img",3),t.qZA(),t.BQk(),t._UZ(4,"app-member",4),t.qZA(),t._UZ(5,"router-outlet")),2&a&&t.Q6J("appearance","compact")("autoCollapse",!0)("inner",!1)("mode","side")("name","leftNavigation")("navigation",t.kEZ(12,g,t.DdM(9,u),t.DdM(10,h),t.DdM(11,f)))("opened",!0)("position","left")("transparentOverlay",!1)},dependencies:[m.j,c.G,l.lC]});var p=n(9122),v=n(2665),C=n(1940);class e{}e.\u0275fac=function(a){return new(a||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[r.ez,p.PU,v.m,C.W,l.Bz.forChild([{path:"",component:i,children:[{path:"",pathMatch:"full",redirectTo:"organizations"},{path:"chat",loadChildren:()=>n.e(255).then(n.bind(n,1255)).then(o=>o.ChatModule),data:{breadcrumb:"Chat"}},{path:"users",loadChildren:()=>Promise.all([n.e(321),n.e(547)]).then(n.bind(n,1547)).then(o=>o.UsersModule),data:{breadcrumb:"Users"}},{path:"organizations",loadChildren:()=>Promise.all([n.e(321),n.e(592),n.e(637)]).then(n.bind(n,8637)).then(o=>o.OrganizationsModule),data:{breadcrumb:"Organizations"}},{path:"organizations/:id",loadChildren:()=>n.e(423).then(n.bind(n,1423)).then(o=>o.OrganizationModule),data:{breadcrumb:"Organizations"}}]}])]})}}]);
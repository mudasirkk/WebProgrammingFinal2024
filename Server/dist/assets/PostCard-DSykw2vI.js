import{j as p,d as m,r as _,w as f,o as l,c,b as s,e as i,t as a,u as o,k as y,l as x,_ as g}from"./index-i1BVosPY.js";async function T(){return p("posts")}async function V(r){return p(`posts/userpost/${r}`)}const v={class:"media box content has-gap"},h={class:"media-content"},k={key:0,class:"has-text-primary",style:{"text-align":"center"}},w={style:{"font-weight":"bold"}},I={class:"columns"},b={class:"column is-one-third"},B={class:"detail"},C={class:"column is-one-third"},N={class:"detail"},D=m({__name:"PostCard",props:{post:{}},setup(r){const u=r,{post:e}=u,n=_(null);return f(async()=>{if(e!=null&&e.userId){const d=await x(e.userId);n.value=d.data}}),(d,t)=>(l(),c("div",v,[s("div",h,[n.value?(l(),c("p",k,[t[0]||(t[0]=s("span",{class:"has-text-danger"},"Name: ",-1)),i(" "+a(n.value.fname)+" "+a(n.value.lname)+"       ",1),t[1]||(t[1]=s("span",{class:"has-text-danger"},"User ID: ",-1)),i(" "+a(o(e).userId)+"      ",1),t[2]||(t[2]=s("span",{class:"has-text-danger"},"Date: ",-1)),i(a(o(e).date),1)])):y("",!0),s("p",w,a(o(e).description),1),s("div",I,[s("div",b,[t[3]||(t[3]=s("p",{class:"has-text-primary"},"Type",-1)),s("p",B,a(o(e).workoutType),1)]),s("div",C,[t[4]||(t[4]=s("p",{class:"has-text-primary"},"Location",-1)),s("p",N,a(o(e).location),1)]),t[5]||(t[5]=s("div",{class:"column is-one-third"},null,-1))])])]))}}),E=g(D,[["__scopeId","data-v-c662b518"]]);export{E as P,V as a,T as g};
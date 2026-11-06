import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {products} from './data/products'
export const MULT:Record<number,number>={30:.6,50:1,100:1.7}
export const priceOf=(id:string,size:number)=>(products.find(p=>p.id===id)?.price??0)*MULT[size]
export const fee=(sub:number)=>sub===0||sub>=5000?0:150
type Line={id:string;size:number;qty:number}
type S={cart:Line[];wish:string[];msg:string;notify:(m:string)=>void;add:(id:string,size:number,qty:number)=>void;setQty:(id:string,size:number,qty:number)=>void;remove:(id:string,size:number)=>void;clear:()=>void;toggle:(id:string)=>void}
let t:number
export const useStore=create<S>()(persist((set,get)=>({cart:[],wish:[],msg:'',
notify:m=>{set({msg:m});clearTimeout(t);t=window.setTimeout(()=>set({msg:''}),2200)},
add:(id,size,qty)=>{const c=get().cart;const f=c.find(l=>l.id===id&&l.size===size);set({cart:f?c.map(l=>l===f?{...l,qty:l.qty+qty}:l):[...c,{id,size,qty}]});get().notify('Added to cart')},
setQty:(id,size,qty)=>set({cart:get().cart.map(l=>l.id===id&&l.size===size?{...l,qty:Math.max(1,qty)}:l)}),
remove:(id,size)=>set({cart:get().cart.filter(l=>!(l.id===id&&l.size===size))}),
clear:()=>set({cart:[]}),
toggle:id=>{const w=get().wish;const on=w.includes(id);set({wish:on?w.filter(x=>x!==id):[...w,id]});get().notify(on?'Removed from wishlist':'Saved to wishlist')}}),
{name:'aurelle',partialize:s=>({cart:s.cart,wish:s.wish})}))

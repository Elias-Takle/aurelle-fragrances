import {useState,useEffect} from 'react'
import {Link,NavLink,Route,Routes,useLocation} from 'react-router-dom'
import {motion} from 'framer-motion'
import {Heart,Menu,ShoppingBag,X} from 'lucide-react'
import {useStore} from './store'
import {Home,Shop,ProductPage,Cart,Checkout,Wishlist,Contact} from './pages'
const nav=[['/shop','Shop'],['/contact','About & Contact']]
export default function App(){const [open,setOpen]=useState(false);const {cart,wish,msg}=useStore();const loc=useLocation();useEffect(()=>{setOpen(false);window.scrollTo(0,0)},[loc.pathname])
const n=cart.reduce((s,l)=>s+l.qty,0)
return <div className="flex min-h-screen flex-col"><header className="sticky top-0 z-20 border-b border-gold/30 bg-ivory/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
<Link to="/" className="font-serif text-2xl tracking-[.25em]">AURELLE</Link>
<nav className={`${open?'flex':'hidden'} absolute left-0 top-full w-full flex-col gap-4 bg-ivory p-5 md:static md:flex md:w-auto md:flex-row md:p-0`}>{nav.map(([to,l])=><NavLink key={to} to={to} className="text-sm uppercase tracking-widest">{l}</NavLink>)}</nav>
<div className="flex items-center gap-4"><Link to="/wishlist" aria-label={`Wishlist (${wish.length})`}><Heart size={20}/></Link><Link to="/cart" aria-label={`Cart (${n})`} className="relative"><ShoppingBag size={20}/>{n>0&&<span className="absolute -right-2 -top-2 rounded-full bg-gold px-1.5 text-xs text-ivory">{n}</span>}</Link>
<button className="md:hidden" aria-label="Menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></div></header>
<main className="flex-1"><motion.div key={loc.pathname} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.35}}><Routes><Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop/>}/><Route path="/product/:id" element={<ProductPage/>}/><Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/wishlist" element={<Wishlist/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<p className="p-20 text-center">Page not found</p>}/></Routes></motion.div></main>
<footer className="bg-char py-10 text-center text-sm text-ivory/70"><p className="font-serif text-xl tracking-[.25em] text-ivory">AURELLE FRAGRANCES</p><p className="mt-2">Bole, Addis Ababa · Cash on delivery · © 2026</p></footer>
{msg&&<div role="status" className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2 bg-char px-6 py-3 text-ivory">{msg}</div>}</div>}

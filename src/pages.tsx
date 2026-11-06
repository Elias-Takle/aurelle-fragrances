import {useEffect,useMemo,useState,type ReactNode} from 'react'
import {Link,useParams,useSearchParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {Minus,Plus,Trash2,SlidersHorizontal,MessageCircle} from 'lucide-react'
import {products,families,brands,SIZES} from './data/products'
import {useStore,priceOf,fee} from './store'
import {Grid,Img,etb,Reveal,Skeleton} from './components'
const useTitle=(t:string)=>useEffect(()=>{document.title=`${t} | AURELLE FRAGRANCES`},[t])
export const WA=(import.meta.env.VITE_WHATSAPP as string|undefined)||'251900000000'
const phone=z.string().regex(/^(\+251|0)?[79]\d{8}$/,'Enter a valid Ethiopian number, e.g. 0911234567')
const Sec=({t,children}:{t:string;children:ReactNode})=><section className="mx-auto max-w-7xl px-5 py-12"><h2 className="mb-8 font-serif text-3xl">{t}</h2><Reveal>{children}</Reveal></section>
const Err=({m}:{m?:string})=>m?<p role="alert" className="mt-1 text-sm text-red-700">{m}</p>:null

export function Home(){useTitle('Luxury Perfume in Addis Ababa');const notify=useStore(s=>s.notify);const [em,setEm]=useState('')
return <>
<section className="bg-beige"><div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 md:grid-cols-2"><div><p className="text-xs uppercase tracking-[.3em] text-gold">Addis Ababa · Since 2020</p>
<h1 className="my-5 font-serif text-5xl leading-tight md:text-7xl">The art of an unforgettable scent</h1><p className="mb-8 max-w-md text-char/70">Rare oud, Ethiopian incense and modern florals, delivered to your door in Addis Ababa.</p><Link to="/shop" className="btn">Shop the collection</Link></div>
<Img src={products[0].img} alt="Luxury perfume bottle" cls="aspect-[4/5] w-full object-cover"/></div></section>
<Sec t="Shop by fragrance family"><div className="grid grid-cols-2 gap-4 md:grid-cols-5">{families.map(f=><Link key={f} to={`/shop?family=${f}`} className="border border-gold/40 py-8 text-center font-serif text-xl hover:bg-gold hover:text-ivory">{f}</Link>)}</div></Sec>
<Sec t="Featured collections"><div className="grid gap-5 md:grid-cols-3">{[['Oud & Incense','Woody','Deep, resinous, ceremonial'],['Floral Bloom','Floral','Jasmine, rose and peony'],['Sweet Gourmand','Gourmand','Coffee, honey and praline']].map(([t,f,d])=><Link key={t} to={`/shop?family=${f}`} className="bg-beige p-10 transition hover:bg-gold/20"><h3 className="font-serif text-3xl">{t}</h3><p className="mt-2 text-char/70">{d}</p></Link>)}</div></Sec>
<Sec t="Best sellers"><Grid list={[...products].sort((a,b)=>b.reviews-a.reviews).slice(0,4)}/></Sec>
<Sec t="New arrivals"><Grid list={products.filter(p=>p.isNew)}/></Sec>
<section className="bg-char py-16 text-center text-ivory"><div className="mx-auto max-w-2xl px-5"><h2 className="font-serif text-3xl">Our story</h2><p className="mt-4 text-ivory/70">AURELLE began in a small Bole studio with one idea: that Ethiopia's heritage of incense, coffee and spice deserves a place among the world's great perfumery.</p></div></section>
<Sec t="Loved by our customers"><div className="grid gap-6 md:grid-cols-3">{[['Selam T.','Oud Royal lasts all day. Delivery took two hours.'],['Marta B.','Jasmin Blanc is my signature scent now.'],['Dawit A.','Beautiful packaging, perfect gift.']].map(([n,q])=><blockquote key={n} className="bg-beige p-6"><p className="font-serif text-xl">“{q}”</p><footer className="mt-3 text-sm text-gold">{n}</footer></blockquote>)}</div></Sec>
<Sec t="Join the inner circle"><form className="flex max-w-md gap-2" onSubmit={e=>{e.preventDefault();notify('Thank you for subscribing');setEm('')}}><input required type="email" value={em} onChange={e=>setEm(e.target.value)} placeholder="Email address" aria-label="Email" className="inp"/><button className="btn">Join</button></form></Sec></>}

export function Shop(){useTitle('Shop');const [sp]=useSearchParams()
const [q,setQ]=useState('');const [fam,setFam]=useState(sp.get('family')||'');const [gen,setGen]=useState('');const [brand,setBrand]=useState('');const [max,setMax]=useState(13000);const [stock,setStock]=useState(false);const [sort,setSort]=useState('popular');const [open,setOpen]=useState(false);const [loading,setLoading]=useState(true);useEffect(()=>{const t=setTimeout(()=>setLoading(false),500);return()=>clearTimeout(t)},[])
const list=useMemo(()=>{const r=products.filter(p=>(`${p.name} ${p.brand}`.toLowerCase().includes(q.toLowerCase()))&&(!fam||p.family===fam)&&(!gen||p.gender===gen)&&(!brand||p.brand===brand)&&p.price<=max&&(!stock||p.stock>0))
return r.sort((a,b)=>sort==='low'?a.price-b.price:sort==='high'?b.price-a.price:sort==='new'?+b.id-+a.id:b.reviews-a.reviews)},[q,fam,gen,brand,max,stock,sort])
const sel=(v:string,s:(x:string)=>void,l:string,o:string[])=><select aria-label={l} value={v} onChange={e=>s(e.target.value)} className="inp"><option value="">{l}</option>{o.map(x=><option key={x}>{x}</option>)}</select>
return <Sec t="The collection"><div className="mb-6 flex gap-2"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search perfume or brand" aria-label="Search" className="inp"/><button className="btn md:hidden" onClick={()=>setOpen(!open)} aria-label="Filters"><SlidersHorizontal size={16}/></button></div>
<div className={`${open?'grid':'hidden'} mb-8 gap-3 md:grid md:grid-cols-6`}>{sel(fam,setFam,'Family',families)}{sel(gen,setGen,'Gender',['Women','Men','Unisex'])}{sel(brand,setBrand,'Brand',brands)}
<label className="text-sm">Up to {etb(max)}<input type="range" min={4000} max={13000} step={500} value={max} onChange={e=>setMax(+e.target.value)} className="w-full accent-[#b8975a]"/></label>
<label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={stock} onChange={e=>setStock(e.target.checked)}/>In stock only</label>
<select aria-label="Sort" value={sort} onChange={e=>setSort(e.target.value)} className="inp"><option value="popular">Popular</option><option value="new">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div>
{loading?<Skeleton/>:list.length?<Grid list={list}/>:<p className="py-20 text-center text-char/60">No fragrances match your filters.</p>}</Sec>}

export function ProductPage(){const {id}=useParams();const p=products.find(x=>x.id===id);const [size,setSize]=useState(50);const [qty,setQty]=useState(1);const [gi,setGi]=useState(0);const add=useStore(s=>s.add);const wish=useStore(s=>s.wish);const toggle=useStore(s=>s.toggle);useTitle(p?.name??'Not found')
if(!p)return <Sec t="Perfume not found"><Link to="/shop" className="btn">Back to shop</Link></Sec>
return <><section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-2"><div><Img src={p.imgs[gi]} alt={`${p.name} perfume bottle, view ${gi+1}`} cls="aspect-[4/5] w-full object-cover"/><div className="mt-3 flex gap-2">{p.imgs.map((s,i)=><button key={i} aria-label={`View image ${i+1}`} onClick={()=>setGi(i)} className={`h-20 w-16 border-2 ${gi===i?'border-char':'border-transparent'}`}><Img src={s} alt="" cls="h-full w-full object-cover"/></button>)}</div></div><div>
<p className="text-xs uppercase tracking-widest text-gold">{p.brand} · {p.family}</p><h1 className="font-serif text-5xl">{p.name}</h1><p className="my-2 text-sm">★ {p.rating} ({p.reviews} reviews)</p><p className="font-serif text-3xl">{etb(priceOf(p.id,size))}</p><p className="my-5 text-char/70">{p.desc}</p>
<dl className="mb-6 grid grid-cols-3 gap-3 text-sm">{['Top','Heart','Base'].map((l,i)=><div key={l} className="bg-beige p-3"><dt className="text-gold">{l}</dt><dd>{p.notes[i]}</dd></div>)}</dl>
<div className="mb-5 flex gap-2">{SIZES.map(s=><button key={s} onClick={()=>setSize(s)} aria-pressed={size===s} className={`border px-4 py-2 ${size===s?'border-char bg-char text-ivory':'border-gold/50'}`}>{s}ml</button>)}</div>
<div className="flex flex-wrap items-center gap-3"><div className="flex items-center border border-gold/50"><button aria-label="Decrease" className="p-3" onClick={()=>setQty(Math.max(1,qty-1))}><Minus size={14}/></button><span className="w-8 text-center">{qty}</span><button aria-label="Increase" className="p-3" onClick={()=>setQty(qty+1)}><Plus size={14}/></button></div>
<button className="btn" disabled={p.stock===0} onClick={()=>add(p.id,size,qty)}>{p.stock?'Add to cart':'Sold out'}</button><button className="btn" onClick={()=>toggle(p.id)}>{wish.includes(p.id)?'Saved':'Wishlist'}</button></div>
<p className="mt-4 text-sm text-char/60">Longevity: 8–10 hours · Delivery in Addis Ababa within 24 hours</p></div></section>
<Sec t="You may also like"><Grid list={products.filter(x=>x.family===p.family&&x.id!==p.id).slice(0,4)}/></Sec></>}

export function Cart(){useTitle('Cart');const {cart,setQty,remove}=useStore();const sub=cart.reduce((s,l)=>s+priceOf(l.id,l.size)*l.qty,0)
if(!cart.length)return <Sec t="Your cart is empty"><Link to="/shop" className="btn">Discover fragrances</Link></Sec>
return <Sec t="Shopping cart"><div className="grid gap-10 md:grid-cols-[2fr_1fr]"><ul className="divide-y divide-gold/30">{cart.map(l=>{const p=products.find(x=>x.id===l.id)!
return <li key={l.id+l.size} className="flex items-center gap-4 py-4"><Img src={p.img} alt={p.name} cls="h-24 w-20 object-cover"/><div className="flex-1"><Link to={`/product/${p.id}`} className="font-serif text-xl">{p.name}</Link><p className="text-sm text-char/60">{l.size}ml · {etb(priceOf(l.id,l.size))}</p></div>
<input type="number" min={1} value={l.qty} aria-label="Quantity" onChange={e=>setQty(l.id,l.size,+e.target.value||1)} className="inp !w-16"/><button aria-label="Remove" onClick={()=>remove(l.id,l.size)}><Trash2 size={18}/></button></li>})}</ul>
<Summary sub={sub}><Link to="/checkout" className="btn mt-4 w-full text-center">Checkout</Link></Summary></div></Sec>}
const Summary=({sub,children}:{sub:number;children?:ReactNode})=><aside className="h-fit bg-beige p-6"><div className="flex justify-between"><span>Subtotal</span>{etb(sub)}</div><div className="flex justify-between"><span>Delivery (Addis Ababa)</span>{fee(sub)?etb(fee(sub)):'Free'}</div><p className="text-xs text-char/60">Free delivery over Br 5,000 · Cash on delivery</p><div className="mt-3 flex justify-between border-t border-gold/40 pt-3 font-serif text-2xl"><span>Total</span>{etb(sub+fee(sub))}</div>{children}</aside>

const co=z.object({name:z.string().min(2,'Name is required'),phone,address:z.string().min(5,'Enter your Addis Ababa address'),notes:z.string().optional()})
export function Checkout(){useTitle('Checkout');const {cart,clear}=useStore();const [order,setOrder]=useState('');const sub=cart.reduce((s,l)=>s+priceOf(l.id,l.size)*l.qty,0)
const {register,handleSubmit,formState:{errors}}=useForm<z.infer<typeof co>>({resolver:zodResolver(co)})
if(order)return <Sec t="Thank you, your order is confirmed"><p>Order number <strong>{order}</strong>. We will call you to confirm delivery. Pay cash on delivery.</p><Link to="/shop" className="btn mt-6">Continue shopping</Link></Sec>
if(!cart.length)return <Sec t="Nothing to check out"><Link to="/shop" className="btn">Shop</Link></Sec>
return <Sec t="Checkout"><div className="grid gap-10 md:grid-cols-[2fr_1fr]"><form className="space-y-4" onSubmit={handleSubmit(()=>{setOrder('AUR-'+Date.now().toString(36).toUpperCase());clear()})}>
<div><input {...register('name')} placeholder="Full name" aria-label="Full name" className="inp"/><Err m={errors.name?.message}/></div><div><input {...register('phone')} placeholder="Phone, e.g. 0911234567" aria-label="Phone" className="inp"/><Err m={errors.phone?.message}/></div>
<div><input {...register('address')} placeholder="Delivery address in Addis Ababa (sub-city, woreda, landmark)" aria-label="Address" className="inp"/><Err m={errors.address?.message}/></div><textarea {...register('notes')} placeholder="Delivery instructions" aria-label="Instructions" className="inp"/><button className="btn">Place order</button></form><Summary sub={sub}/></div></Sec>}

export function Wishlist(){useTitle('Wishlist');const wish=useStore(s=>s.wish);const add=useStore(s=>s.add);const list=products.filter(p=>wish.includes(p.id))
if(!list.length)return <Sec t="Your wishlist is empty"><Link to="/shop" className="btn">Explore</Link></Sec>
return <Sec t="Wishlist"><Grid list={list}/><div className="mt-8"><button className="btn" onClick={()=>list.filter(p=>p.stock).forEach(p=>add(p.id,50,1))}>Add all to cart</button></div></Sec>}

const ct=z.object({name:z.string().min(2,'Name is required'),email:z.string().email('Invalid email'),message:z.string().min(10,'Please write at least 10 characters')})
export function Contact(){useTitle('About & Contact');const notify=useStore(s=>s.notify);const {register,handleSubmit,reset,formState:{errors}}=useForm<z.infer<typeof ct>>({resolver:zodResolver(ct)})
return <Sec t="About & contact"><div className="grid gap-10 md:grid-cols-2"><div className="space-y-3 text-char/80"><p>AURELLE FRAGRANCES is an Addis Ababa perfume house blending Ethiopian heritage with fine perfumery.</p><p>Showroom: Bole Road, Addis Ababa · Mon–Sat 9:00–19:00</p><p>Delivery: Br 150 inside Addis Ababa, free over Br 5,000. Payment: cash on delivery.</p>
<a className="btn inline-flex items-center gap-2" href={`https://wa.me/${WA}?text=${encodeURIComponent('Hello AURELLE, I would like to order a perfume.')}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/>Order on WhatsApp</a></div>
<form className="space-y-4" onSubmit={handleSubmit(()=>{notify('Message sent');reset()})}><div><input {...register('name')} placeholder="Name" aria-label="Name" className="inp"/><Err m={errors.name?.message}/></div><div><input {...register('email')} placeholder="Email" aria-label="Email" className="inp"/><Err m={errors.email?.message}/></div><div><textarea {...register('message')} rows={4} placeholder="Message" aria-label="Message" className="inp"/><Err m={errors.message?.message}/></div><button className="btn">Send</button></form></div></Sec>}

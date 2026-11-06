import type {ReactNode} from 'react'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
import {Heart} from 'lucide-react'
import {useStore} from './store'
import type {Product} from './data/products'
export const Reveal=({children}:{children:ReactNode})=><motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.6}}>{children}</motion.div>
export const Skeleton=()=><div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4" aria-busy="true">{Array.from({length:8}).map((_,i)=><div key={i} className="animate-pulse"><div className="aspect-[4/5] bg-beige"/><div className="mt-3 h-4 w-2/3 bg-beige"/></div>)}</div>
export const etb=(n:number)=>`Br ${Math.round(n).toLocaleString()}`
const FB="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='750'%3E%3Crect width='100%25' height='100%25' fill='%23efe7d8'/%3E%3Ctext x='50%25' y='50%25' fill='%23b8975a' font-family='serif' font-size='28' text-anchor='middle'%3EAURELLE%3C/text%3E%3C/svg%3E"
export const Img=({src,alt,cls}:{src:string;alt:string;cls?:string})=><img src={src} alt={alt} loading="lazy" className={cls} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src=FB}}/>
export function Card({p}:{p:Product}){const wish=useStore(s=>s.wish);const toggle=useStore(s=>s.toggle);const on=wish.includes(p.id)
return <div><div className="group relative aspect-[4/5] overflow-hidden bg-beige"><Link to={`/product/${p.id}`}><Img src={p.img} alt={`${p.name} perfume bottle`} cls="h-full w-full object-cover transition duration-700 group-hover:scale-105"/></Link>
<button aria-label={on?'Remove from wishlist':'Add to wishlist'} onClick={()=>toggle(p.id)} className="absolute right-3 top-3 rounded-full bg-ivory/90 p-2"><Heart size={18} stroke="#b8975a" fill={on?'#b8975a':'none'}/></button>
{p.stock===0&&<span className="absolute left-3 top-3 bg-char px-2 py-1 text-xs text-ivory">Sold out</span>}{p.isNew&&p.stock>0&&<span className="absolute left-3 top-3 bg-gold px-2 py-1 text-xs text-ivory">New</span>}</div>
<p className="mt-3 text-xs uppercase tracking-widest text-gold">{p.brand}</p><Link to={`/product/${p.id}`} className="font-serif text-xl">{p.name}</Link><p className="text-sm">{etb(p.price)} <span className="text-char/50">· 50ml</span></p></div>}
export const Grid=({list}:{list:Product[]})=><div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">{list.map(p=><Card key={p.id} p={p}/>)}</div>

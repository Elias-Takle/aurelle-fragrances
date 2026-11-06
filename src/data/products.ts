export type Product={id:string;name:string;brand:string;price:number;family:string;gender:string;notes:[string,string,string];rating:number;reviews:number;stock:number;img:string;imgs:string[];isNew:boolean;desc:string}
export const SIZES=[30,50,100]
const U=(x:string)=>`https://images.unsplash.com/${x}?auto=format&fit=crop&w=800&q=70`
const IMG=['photo-1541643600914-78b084683601','photo-1594035910387-fea47794261f','photo-1592945403244-b3fbafd7f539','photo-1523293182086-7651a899d37f','photo-1587017539504-67cfbddac569']
const raw=`Aurelle Noir|Aurelle|6800|Oriental|Unisex|Saffron,Rose,Amber
Ambre Dorée|Maison Lys|7400|Oriental|Women|Bergamot,Vanilla,Amber
Oud Royal|Oud Royal|12500|Woody|Men|Cardamom,Oud,Sandalwood
Habesha Incense|Habesha Atelier|5200|Woody|Unisex|Frankincense,Myrrh,Cedar
Jasmin Blanc|Maison Lys|6100|Floral|Women|Neroli,Jasmine,Musk
Citrus Aurum|Aurelle|4300|Fresh|Men|Lemon,Vetiver,Cedar
Rose Éthiopie|Habesha Atelier|6900|Floral|Women|Pink Pepper,Damask Rose,Patchouli
Velvet Tabac|Oud Royal|8800|Woody|Men|Tobacco,Leather,Tonka
Aqua Nile|Aurelle|4600|Fresh|Unisex|Sea Salt,Mint,Driftwood
Coffee Ceremony|Habesha Atelier|5600|Gourmand|Unisex|Coffee,Cardamom,Vanilla
Iris Soir|Maison Lys|7900|Floral|Women|Iris,Violet,Musk
Santal Doux|Aurelle|7200|Woody|Unisex|Pear,Sandalwood,Cashmere
Gold Leather|Oud Royal|9400|Oriental|Men|Saffron,Leather,Amber
Fleur de Sel|Maison Lys|4800|Fresh|Women|Grapefruit,Sea Salt,Musk
Honey Oud|Oud Royal|10200|Gourmand|Unisex|Honey,Oud,Benzoin
Green Highlands|Habesha Atelier|4400|Fresh|Men|Green Tea,Basil,Moss
Peony Dawn|Aurelle|5900|Floral|Women|Peony,Lychee,White Musk
Midnight Myrrh|Habesha Atelier|8300|Oriental|Unisex|Myrrh,Labdanum,Vanilla
Café Praline|Maison Lys|6300|Gourmand|Women|Praline,Coffee,Tonka
Cedar & Smoke|Oud Royal|7700|Woody|Men|Black Pepper,Smoke,Cedar`
export const products:Product[]=raw.split('\n').map((r,i)=>{const [name,brand,price,family,gender,n]=r.split('|');const notes=n.split(',') as [string,string,string]
return{id:String(i+1),name,brand,price:+price,family,gender,notes,rating:+(4+((i*7)%10)/10).toFixed(1),reviews:40+i*13,stock:i%7===0?0:20,img:U(IMG[i%5]),imgs:[0,1,2].map(k=>U(IMG[(i+k)%5])),isNew:i>=16,
desc:`${name} is a ${family.toLowerCase()} fragrance from ${brand}, opening with ${notes[0].toLowerCase()}, settling into ${notes[1].toLowerCase()} and finishing on a long ${notes[2].toLowerCase()} base. Eight to ten hours of wear.`}})
export const families=['Floral','Woody','Oriental','Fresh','Gourmand']
export const brands=[...new Set(products.map(p=>p.brand))]

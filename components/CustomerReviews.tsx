"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";

const reviews = [
  { id:"1", name:"Amina Ochieng",  loc:"Nairobi",  rating:5, date:"2 weeks ago",  comment:"Bought a refurbished iPhone 13 and couldn't be happier. Looks brand new, battery at 92% exactly as stated. Next-day delivery. Chomly is the real deal!",  product:"iPhone 13 (Refurbished)", grad:"from-blue-500 to-indigo-600" },
  { id:"2", name:"Brian Kamau",    loc:"Mombasa",  rating:5, date:"1 month ago",   comment:"Got the iPhone 15 Pro for my wife. Best price in Kenya. Sealed box, Apple warranty card included. Paid via M-Pesa — super easy. Will always buy here.",      product:"iPhone 15 Pro",           grad:"from-violet-500 to-purple-600" },
  { id:"3", name:"Faith Wanjiku",  loc:"Kiambu",   rating:5, date:"3 weeks ago",  comment:"Traded in my old iPhone 11 and the process was seamless. Got a fair value and topped up for the 14 Pro Max. WhatsApp team responded within 1 minute!",      product:"iPhone 14 Pro Max",       grad:"from-pink-500 to-rose-600" },
  { id:"4", name:"David Otieno",   loc:"Kisumu",   rating:4, date:"5 days ago",   comment:"Refurbished iPhone 12 for my wife — perfect condition, new accessories inside. Delivery to Kisumu in 2 days was impressive. Very satisfied.",                 product:"iPhone 12 (Refurbished)", grad:"from-emerald-500 to-teal-600" },
  { id:"5", name:"Grace Mutua",    loc:"Nairobi",  rating:5, date:"2 months ago", comment:"Ordered iPhone 15 on Friday evening and it arrived Saturday morning! Packaging was premium, phone was sealed. Hands-down the best iPhone shop in Kenya.",    product:"iPhone 15",               grad:"from-orange-500 to-amber-600" },
  { id:"6", name:"James Mwangi",   loc:"Nakuru",   rating:5, date:"1 week ago",   comment:"Third purchase from Chomly. Always authentic, always affordable, always fast. The WhatsApp support is genuinely unmatched — real people who know iPhones.",  product:"iPhone 14 (Refurbished)", grad:"from-cyan-500 to-blue-600" },
];

export default function CustomerReviews() {
  const [page, setPage] = useState(0);
  const per = 3;
  const pages = Math.ceil(reviews.length / per);
  const visible = reviews.slice(page * per, page * per + per);
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="py-20 md:py-28" style={{ background: "#F5F5F7" }}>
      <div className="wrap">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-2">Reviews</p>
            <h2 className="heading-2 text-[#1D1D1F]">What Customers Say</h2>
          </div>

          {/* Rating pill */}
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 border border-[#D2D2D7] shadow-sm">
            <div className="text-center">
              <div className="text-4xl font-black text-[#1D1D1F] leading-none tracking-tight">{avg}</div>
              <div className="flex justify-center stars mt-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="currentColor" />)}
              </div>
              <p className="text-[10px] text-[#6E6E73] mt-1">{reviews.length} verified reviews</p>
            </div>
            <div className="w-px h-12 bg-[#D2D2D7]" />
            <div>
              <p className="font-black text-[#1D1D1F]">Excellent</p>
              <p className="text-[#6E6E73] text-xs">On Google & WhatsApp</p>
              <div className="flex items-center gap-1 mt-1">
                <BadgeCheck size={13} className="text-[#0071E3]" />
                <span className="text-[11px] text-[#0071E3] font-bold">All purchases verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {visible.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl p-6 border border-[#D2D2D7] shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
              {/* Stars */}
              <div className="flex stars gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s<=r.rating?"currentColor":"none"} />)}
              </div>

              {/* Comment */}
              <p className="text-[#1D1D1F] text-sm leading-relaxed flex-1">
                &ldquo;{r.comment}&rdquo;
              </p>

              {/* Product tag */}
              <span className="self-start text-[11px] font-bold text-[#0071E3] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                ✓ {r.product}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#F5F5F7]">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${r.grad} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-[#1D1D1F] text-sm">{r.name}</p>
                    <BadgeCheck size={13} className="text-[#0071E3]" />
                  </div>
                  <p className="text-[11px] text-[#6E6E73]">{r.loc} · {r.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button onClick={() => setPage(p => Math.max(0,p-1))} disabled={page===0}
            className="w-9 h-9 rounded-xl border border-[#D2D2D7] flex items-center justify-center text-[#6E6E73] hover:border-[#0071E3] hover:text-[#0071E3] disabled:opacity-25 transition-all"
          ><ChevronLeft size={15}/></button>
          {Array.from({length:pages},(_,i)=>(
            <button key={i} onClick={()=>setPage(i)}
              className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${i===page?"bg-[#0071E3] text-white":"border border-[#D2D2D7] text-[#6E6E73] hover:border-[#0071E3] hover:text-[#0071E3]"}`}
            >{i+1}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(pages-1,p+1))} disabled={page===pages-1}
            className="w-9 h-9 rounded-xl border border-[#D2D2D7] flex items-center justify-center text-[#6E6E73] hover:border-[#0071E3] hover:text-[#0071E3] disabled:opacity-25 transition-all"
          ><ChevronRight size={15}/></button>
        </div>
      </div>
    </section>
  );
}

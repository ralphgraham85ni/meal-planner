"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
// ─── Supabase ─────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://pvntxypzuemnabomsejn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2bnR4eXB6dWVtbmFib21zZWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzc3ODAsImV4cCI6MjA5MTg1Mzc4MH0.N1RKD8NmJdJK1W9VELTk46DnFt2Z40_QHOjWgsV_qBg";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── Seed data ────────────────────────────────────────────────────────────────
const SEED_MEALS = [
  { id:"b1", name:"Porridge with banana",       type:"breakfast", cost:0.65, baby:true,  url:null },
  { id:"b2", name:"Scrambled eggs on toast",    type:"breakfast", cost:0.90, baby:true,  url:null },
  { id:"b3", name:"Weetabix & milk",            type:"breakfast", cost:0.45, baby:true,  url:null },
  { id:"b4", name:"Yoghurt & fruit",            type:"breakfast", cost:0.75, baby:true,  url:null },
  { id:"b5", name:"Pancakes with fruit",        type:"breakfast", cost:1.10, baby:false, url:null },
  { id:"b6", name:"Beans on toast",             type:"breakfast", cost:0.70, baby:false, url:null },
  { id:"b7", name:"Overnight oats",             type:"breakfast", cost:0.60, baby:true,  url:null },
  { id:"l1", name:"Homemade veg soup & bread",  type:"lunch",     cost:1.20, baby:true,  url:null },
  { id:"l2", name:"Cheese toasties & tomato",   type:"lunch",     cost:1.10, baby:false, url:null },
  { id:"l3", name:"Jacket potato with beans",   type:"lunch",     cost:0.95, baby:true,  url:null },
  { id:"l4", name:"Egg salad sandwiches",       type:"lunch",     cost:1.05, baby:false, url:null },
  { id:"l5", name:"Pasta & pesto",              type:"lunch",     cost:0.85, baby:true,  url:null },
  { id:"l6", name:"Lentil & veg puree",         type:"lunch",     cost:0.70, baby:true,  url:null },
  { id:"l7", name:"Fish fingers & peas",        type:"lunch",     cost:1.40, baby:false, url:null },
  { id:"d1", name:"Spaghetti bolognese",        type:"dinner",    cost:2.20, baby:true,  url:null },
  { id:"d2", name:"Slow cooker chicken stew",   type:"dinner",    cost:2.50, baby:true,  url:null },
  { id:"d3", name:"Fish pie",                   type:"dinner",    cost:2.80, baby:true,  url:null },
  { id:"d4", name:"Veggie chilli & rice",       type:"dinner",    cost:1.80, baby:true,  url:null },
  { id:"d5", name:"Chicken & veg tray bake",    type:"dinner",    cost:2.60, baby:true,  url:null },
  { id:"d6", name:"Lentil dhal & naan",         type:"dinner",    cost:1.60, baby:true,  url:null },
  { id:"d7", name:"Homemade burgers & wedges",  type:"dinner",    cost:2.90, baby:false, url:null },
  { id:"d8", name:"Macaroni cheese",            type:"dinner",    cost:1.70, baby:true,  url:null },
  { id:"d9", name:"Sausage & mash",             type:"dinner",    cost:2.10, baby:true,  url:null },
  { id:"d10",name:"Beef & veg soup",            type:"dinner",    cost:2.00, baby:true,  url:null },
];

const SEED_INGREDIENTS = [
  { meal_id:"b1",  name:"Oats",                  quantity:"500g",           category:"Staples" },
  { meal_id:"b1",  name:"Bananas",               quantity:"5",              category:"Produce" },
  { meal_id:"b1",  name:"Milk",                  quantity:"500ml",          category:"Dairy"   },
  { meal_id:"b2",  name:"Eggs",                  quantity:"6 large",        category:"Protein" },
  { meal_id:"b2",  name:"Bread",                 quantity:"5 slices",       category:"Staples" },
  { meal_id:"b2",  name:"Butter",                quantity:"20g",            category:"Dairy"   },
  { meal_id:"b3",  name:"Weetabix",              quantity:"10 biscuits",    category:"Staples" },
  { meal_id:"b3",  name:"Milk",                  quantity:"500ml",          category:"Dairy"   },
  { meal_id:"b4",  name:"Natural yoghurt",       quantity:"500g",           category:"Dairy"   },
  { meal_id:"b4",  name:"Mixed berries (frozen)",quantity:"200g",           category:"Produce" },
  { meal_id:"b5",  name:"Plain flour",           quantity:"200g",           category:"Staples" },
  { meal_id:"b5",  name:"Eggs",                  quantity:"2 large",        category:"Protein" },
  { meal_id:"b5",  name:"Milk",                  quantity:"300ml",          category:"Dairy"   },
  { meal_id:"b5",  name:"Bananas",               quantity:"3",              category:"Produce" },
  { meal_id:"b6",  name:"Tinned baked beans",    quantity:"2 × 400g tins",  category:"Staples" },
  { meal_id:"b6",  name:"Bread",                 quantity:"5 slices",       category:"Staples" },
  { meal_id:"b7",  name:"Oats",                  quantity:"400g",           category:"Staples" },
  { meal_id:"b7",  name:"Natural yoghurt",       quantity:"300g",           category:"Dairy"   },
  { meal_id:"b7",  name:"Milk",                  quantity:"400ml",          category:"Dairy"   },
  { meal_id:"b7",  name:"Mixed berries (frozen)",quantity:"150g",           category:"Produce" },
  { meal_id:"l1",  name:"Carrots",               quantity:"3 medium",       category:"Produce" },
  { meal_id:"l1",  name:"Onions",                quantity:"2 medium",       category:"Produce" },
  { meal_id:"l1",  name:"Potatoes",              quantity:"2 medium",       category:"Produce" },
  { meal_id:"l1",  name:"Vegetable stock cubes", quantity:"2",              category:"Staples" },
  { meal_id:"l1",  name:"Bread",                 quantity:"5 slices",       category:"Staples" },
  { meal_id:"l2",  name:"Cheddar cheese",        quantity:"200g",           category:"Dairy"   },
  { meal_id:"l2",  name:"Bread",                 quantity:"10 slices",      category:"Staples" },
  { meal_id:"l2",  name:"Tomatoes",              quantity:"4 medium",       category:"Produce" },
  { meal_id:"l3",  name:"Baking potatoes",       quantity:"5 large",        category:"Produce" },
  { meal_id:"l3",  name:"Tinned baked beans",    quantity:"2 × 400g tins",  category:"Staples" },
  { meal_id:"l3",  name:"Butter",                quantity:"30g",            category:"Dairy"   },
  { meal_id:"l4",  name:"Eggs",                  quantity:"6 large",        category:"Protein" },
  { meal_id:"l4",  name:"Bread",                 quantity:"10 slices",      category:"Staples" },
  { meal_id:"l4",  name:"Mayonnaise",            quantity:"3 tbsp",         category:"Staples" },
  { meal_id:"l5",  name:"Pasta",                 quantity:"400g",           category:"Staples" },
  { meal_id:"l5",  name:"Pesto",                 quantity:"1 jar (190g)",   category:"Staples" },
  { meal_id:"l5",  name:"Cheddar cheese",        quantity:"50g",            category:"Dairy"   },
  { meal_id:"l6",  name:"Red lentils",           quantity:"200g",           category:"Staples" },
  { meal_id:"l6",  name:"Carrots",               quantity:"2 medium",       category:"Produce" },
  { meal_id:"l6",  name:"Sweet potato",          quantity:"1 medium",       category:"Produce" },
  { meal_id:"l6",  name:"Vegetable stock cubes", quantity:"1",              category:"Staples" },
  { meal_id:"l7",  name:"Fish fingers",          quantity:"20",             category:"Protein" },
  { meal_id:"l7",  name:"Frozen peas",           quantity:"300g",           category:"Produce" },
  { meal_id:"d1",  name:"Minced beef",           quantity:"500g",           category:"Protein" },
  { meal_id:"d1",  name:"Spaghetti",             quantity:"500g",           category:"Staples" },
  { meal_id:"d1",  name:"Tinned tomatoes",       quantity:"2 × 400g tins",  category:"Staples" },
  { meal_id:"d1",  name:"Onions",                quantity:"1 large",        category:"Produce" },
  { meal_id:"d1",  name:"Garlic",                quantity:"3 cloves",       category:"Produce" },
  { meal_id:"d1",  name:"Carrots",               quantity:"2 medium",       category:"Produce" },
  { meal_id:"d2",  name:"Chicken thighs",        quantity:"6 bone-in",      category:"Protein" },
  { meal_id:"d2",  name:"Potatoes",              quantity:"4 medium",       category:"Produce" },
  { meal_id:"d2",  name:"Carrots",               quantity:"3 medium",       category:"Produce" },
  { meal_id:"d2",  name:"Onions",                quantity:"1 large",        category:"Produce" },
  { meal_id:"d2",  name:"Chicken stock cubes",   quantity:"2",              category:"Staples" },
  { meal_id:"d3",  name:"Cod fillets",           quantity:"400g",           category:"Protein" },
  { meal_id:"d3",  name:"Potatoes",              quantity:"600g",           category:"Produce" },
  { meal_id:"d3",  name:"Milk",                  quantity:"300ml",          category:"Dairy"   },
  { meal_id:"d3",  name:"Butter",                quantity:"50g",            category:"Dairy"   },
  { meal_id:"d3",  name:"Frozen peas",           quantity:"150g",           category:"Produce" },
  { meal_id:"d3",  name:"Cheddar cheese",        quantity:"100g",           category:"Dairy"   },
  { meal_id:"d4",  name:"Tinned kidney beans",   quantity:"2 × 400g tins",  category:"Staples" },
  { meal_id:"d4",  name:"Tinned tomatoes",       quantity:"2 × 400g tins",  category:"Staples" },
  { meal_id:"d4",  name:"Rice",                  quantity:"400g",           category:"Staples" },
  { meal_id:"d4",  name:"Onions",                quantity:"1 large",        category:"Produce" },
  { meal_id:"d4",  name:"Red pepper",            quantity:"2",              category:"Produce" },
  { meal_id:"d4",  name:"Garlic",                quantity:"2 cloves",       category:"Produce" },
  { meal_id:"d5",  name:"Chicken thighs",        quantity:"6 bone-in",      category:"Protein" },
  { meal_id:"d5",  name:"Potatoes",              quantity:"400g",           category:"Produce" },
  { meal_id:"d5",  name:"Carrots",               quantity:"2 medium",       category:"Produce" },
  { meal_id:"d5",  name:"Red pepper",            quantity:"2",              category:"Produce" },
  { meal_id:"d5",  name:"Olive oil",             quantity:"3 tbsp",         category:"Staples" },
  { meal_id:"d6",  name:"Red lentils",           quantity:"400g",           category:"Staples" },
  { meal_id:"d6",  name:"Tinned tomatoes",       quantity:"1 × 400g tin",   category:"Staples" },
  { meal_id:"d6",  name:"Onions",                quantity:"1 large",        category:"Produce" },
  { meal_id:"d6",  name:"Garlic",                quantity:"3 cloves",       category:"Produce" },
  { meal_id:"d6",  name:"Naan breads",           quantity:"4",              category:"Staples" },
  { meal_id:"d7",  name:"Minced beef",           quantity:"500g",           category:"Protein" },
  { meal_id:"d7",  name:"Burger buns",           quantity:"4",              category:"Staples" },
  { meal_id:"d7",  name:"Potatoes",              quantity:"600g",           category:"Produce" },
  { meal_id:"d7",  name:"Cheddar cheese",        quantity:"100g",           category:"Dairy"   },
  { meal_id:"d7",  name:"Tomatoes",              quantity:"2 large",        category:"Produce" },
  { meal_id:"d8",  name:"Macaroni pasta",        quantity:"400g",           category:"Staples" },
  { meal_id:"d8",  name:"Cheddar cheese",        quantity:"300g",           category:"Dairy"   },
  { meal_id:"d8",  name:"Milk",                  quantity:"500ml",          category:"Dairy"   },
  { meal_id:"d8",  name:"Butter",                quantity:"50g",            category:"Dairy"   },
  { meal_id:"d8",  name:"Plain flour",           quantity:"40g",            category:"Staples" },
  { meal_id:"d9",  name:"Pork sausages",         quantity:"8",              category:"Protein" },
  { meal_id:"d9",  name:"Potatoes",              quantity:"700g",           category:"Produce" },
  { meal_id:"d9",  name:"Butter",                quantity:"40g",            category:"Dairy"   },
  { meal_id:"d9",  name:"Milk",                  quantity:"100ml",          category:"Dairy"   },
  { meal_id:"d9",  name:"Onions",                quantity:"2 medium",       category:"Produce" },
  { meal_id:"d10", name:"Stewing beef",          quantity:"400g",           category:"Protein" },
  { meal_id:"d10", name:"Carrots",               quantity:"3 medium",       category:"Produce" },
  { meal_id:"d10", name:"Potatoes",              quantity:"3 medium",       category:"Produce" },
  { meal_id:"d10", name:"Onions",                quantity:"1 large",        category:"Produce" },
  { meal_id:"d10", name:"Beef stock cubes",      quantity:"2",              category:"Staples" },
  { meal_id:"d10", name:"Bread",                 quantity:"5 slices",       category:"Staples" },
];

// Default plan rows for Supabase — slot is 'm1' or 'm2'
const DEFAULT_PLAN_ROWS = [
  { day:"Mon", meal_type:"breakfast", slot:"m1", meal_id:"b1"  },
  { day:"Mon", meal_type:"lunch",     slot:"m1", meal_id:"l1"  },
  { day:"Mon", meal_type:"dinner",    slot:"m1", meal_id:"d1"  },
  { day:"Tue", meal_type:"breakfast", slot:"m1", meal_id:"b3"  },
  { day:"Tue", meal_type:"lunch",     slot:"m1", meal_id:"l2"  },
  { day:"Tue", meal_type:"dinner",    slot:"m1", meal_id:"d2"  },
  { day:"Wed", meal_type:"breakfast", slot:"m1", meal_id:"b2"  },
  { day:"Wed", meal_type:"lunch",     slot:"m1", meal_id:"l3"  },
  { day:"Wed", meal_type:"dinner",    slot:"m1", meal_id:"d4"  },
  { day:"Thu", meal_type:"breakfast", slot:"m1", meal_id:"b7"  },
  { day:"Thu", meal_type:"lunch",     slot:"m1", meal_id:"l4"  },
  { day:"Thu", meal_type:"dinner",    slot:"m1", meal_id:"d5"  },
  { day:"Fri", meal_type:"breakfast", slot:"m1", meal_id:"b4"  },
  { day:"Fri", meal_type:"lunch",     slot:"m1", meal_id:"l5"  },
  { day:"Fri", meal_type:"dinner",    slot:"m1", meal_id:"d6"  },
  { day:"Sat", meal_type:"breakfast", slot:"m1", meal_id:"b5"  },
  { day:"Sat", meal_type:"lunch",     slot:"m1", meal_id:"l7"  },
  { day:"Sat", meal_type:"dinner",    slot:"m1", meal_id:"d7"  },
  { day:"Sun", meal_type:"breakfast", slot:"m1", meal_id:"b2"  },
  { day:"Sun", meal_type:"lunch",     slot:"m1", meal_id:"l6"  },
  { day:"Sun", meal_type:"dinner",    slot:"m1", meal_id:"d8"  },
];

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const MEAL_TYPES = ["breakfast","lunch","dinner"];
const CATEGORY_ORDER = ["Produce","Protein","Dairy","Staples"];
const CATEGORY_ICONS = { Produce:"🥕", Protein:"🥩", Dairy:"🥛", Staples:"🌾" };

const TIPS = [
  { icon:"🛒", title:"Shop once a week",     text:"Fewer trips = fewer impulse buys. Plan ahead and stick to the list." },
  { icon:"🥣", title:"Batch cook dinners",   text:"Double up on bolognese, stew or dhal. Freeze half — that's next week sorted." },
  { icon:"🍌", title:"Baby-friendly meals",  text:"Most dinners are suitable for baby too — saves buying separate jars. Mash or blend as needed." },
  { icon:"❄️", title:"Use your freezer",     text:"Bread, meat, and batch cooked meals freeze brilliantly. Reduces waste massively." },
  { icon:"🏷️", title:"Own-brand staples",    text:"Swap branded pasta, rice, and tinned goods for supermarket own-brand — identical quality, 30–50% cheaper." },
  { icon:"🥚", title:"Eggs are your friend", text:"Cheap, nutritious, quick — and kids love them. Keep a big box in at all times." },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Convert flat Supabase rows into nested plan object:
// { Mon: { breakfast: { m1: "b1", m2: null }, ... }, ... }
function rowsToPlan(rows) {
  const plan = {};
  DAYS.forEach(d => {
    plan[d] = {};
    MEAL_TYPES.forEach(t => { plan[d][t] = {}; });
  });
  rows.forEach(r => {
    if (!plan[r.day]) return;
    if (!plan[r.day][r.meal_type]) plan[r.day][r.meal_type] = {};
    plan[r.day][r.meal_type][r.slot] = r.meal_id;
  });
  return plan;
}

// Convert ingredients rows array into map keyed by meal_id
function rowsToIngMap(rows) {
  const map = {};
  rows.forEach(r => {
    if (!map[r.meal_id]) map[r.meal_id] = [];
    map[r.meal_id].push(r);
  });
  return map;
}

function consolidateIngredients(mealIds, ingMap) {
  const map = {};
  mealIds.forEach(mid => {
    if (!mid || mid === "") return;
    (ingMap[mid] || []).forEach(ing => {
      const key = ing.name + "||" + ing.category;
      if (!map[key]) map[key] = { name: ing.name, category: ing.category, quantities: [] };
      map[key].quantities.push(ing.quantity);
    });
  });
  return Object.values(map);
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#fdf8f2;font-family:'DM Sans',sans-serif;color:#2c1a0e}
.app{min-height:100vh;background:#fdf8f2}

.hdr{background:#2c1a0e;color:#fdf8f2;padding:20px 28px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;box-shadow:0 2px 24px rgba(44,26,14,.35);gap:12px;flex-wrap:wrap}
.hdr h1{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:900;letter-spacing:-.5px}
.hdr p{font-size:.73rem;opacity:.55;margin-top:2px}
.budget-pill{background:#e8a838;color:#2c1a0e;padding:8px 18px;border-radius:100px;font-weight:700;font-size:.88rem;text-align:center;line-height:1.2;flex-shrink:0}
.budget-pill small{display:block;font-size:.63rem;font-weight:500;opacity:.7}

.sync{display:inline-flex;align-items:center;gap:5px;font-size:.68rem;padding:3px 10px;border-radius:100px;font-weight:600;margin-left:10px;vertical-align:middle}
.sync.live{background:#1a3a1a;color:#6ed87a}
.sync.loading{background:#3a2a0e;color:#e8a838}
.sync.error{background:#3a0e0e;color:#e87a6e}
.dot{width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block;animation:pulse 1.5s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}

.tabs{display:flex;background:#efe7db;border-bottom:2px solid #ddd0c0;padding:0 28px;overflow-x:auto}
.tab{padding:13px 18px;border:none;background:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.82rem;color:#8a6a50;border-bottom:3px solid transparent;margin-bottom:-2px;white-space:nowrap;transition:all .2s}
.tab:hover{color:#2c1a0e}
.tab.on{color:#2c1a0e;border-bottom-color:#e8a838}

.page{padding:24px 28px;max-width:1000px;margin:0 auto}

.sbar{background:#2c1a0e;color:#fdf8f2;border-radius:14px;padding:16px 22px;display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;flex-wrap:wrap;gap:12px}
.sstat .v{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:900;color:#e8a838}
.sstat .v.g{color:#6ed87a}
.sstat .l{font-size:.67rem;opacity:.55;margin-top:1px}

.wgrid{display:grid;grid-template-columns:repeat(7,1fr);gap:10px}
@media(max-width:760px){.wgrid{grid-template-columns:repeat(2,1fr)}.page{padding:14px 16px}.tabs{padding:0 16px}.hdr{padding:14px 16px}}
@media(max-width:400px){.wgrid{grid-template-columns:1fr}}

.dcard{background:#fff;border-radius:14px;padding:13px;border:1.5px solid #ede3d6;transition:box-shadow .2s}
.dcard:hover{box-shadow:0 4px 18px rgba(44,26,14,.08)}
.dlabel{font-family:'Playfair Display',serif;font-size:.82rem;font-weight:700;color:#e8a838;text-transform:uppercase;letter-spacing:1px;margin-bottom:9px}
.mslot{margin-bottom:8px}
.mslot-lbl{font-size:.62rem;font-weight:600;color:#b59a84;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px}
.chips{display:flex;flex-direction:column;gap:4px}
.mchip{font-size:.74rem;font-weight:500;color:#2c1a0e;background:#fdf4ea;border-radius:8px;padding:5px 8px;cursor:pointer;border:1.5px solid transparent;transition:border-color .15s,background .15s;min-height:28px;line-height:1.35;display:flex;align-items:center;gap:4px}
.mchip:hover{border-color:#e8a838;background:#fffbf5}
.mchip.empty{color:#cbb8a4;font-style:italic}
.mchip.second{background:#f0faf0;border-style:dashed}
.mchip.second:hover{border-color:#6ed87a;background:#e8f7e8}
.chip-name{flex:1}
.chip-icons{display:flex;align-items:center;gap:3px;flex-shrink:0}
.chip-icon{cursor:pointer;opacity:.45;font-size:.68rem;transition:opacity .15s;line-height:1;background:none;border:none;padding:0;font-family:inherit}
.chip-icon:hover{opacity:1}
.baby-dot{width:6px;height:6px;border-radius:50%;background:#6ed87a;flex-shrink:0}
.add-second{display:flex;align-items:center;gap:4px;font-size:.68rem;font-weight:600;color:#b59a84;cursor:pointer;padding:3px 0;background:none;border:none;transition:color .15s;font-family:'DM Sans',sans-serif}
.add-second:hover{color:#e8a838}
.second-badge{font-size:.6rem;font-weight:700;color:#6ed87a;background:#e8f7e8;border-radius:4px;padding:1px 5px;margin-right:2px;white-space:nowrap}
.dcost{font-size:.7rem;font-weight:700;color:#e8a838;text-align:right;margin-top:6px}

.cat-section{margin-bottom:24px}
.cat-head{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.cat-head h3{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700}
.cat-badge{background:#e8a838;color:#2c1a0e;font-size:.67rem;font-weight:700;padding:2px 10px;border-radius:100px}
.igrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:8px}
.icard{background:#fff;border:1.5px solid #ede3d6;border-radius:10px;padding:10px 13px;display:flex;align-items:center;gap:9px;cursor:pointer;transition:opacity .2s,border-color .15s}
.icard:hover{border-color:#e8a838}
.icard.ticked{opacity:.38;text-decoration:line-through}
.icard input[type=checkbox]{accent-color:#e8a838;width:15px;height:15px;flex-shrink:0;cursor:pointer}
.iname{font-size:.8rem;font-weight:500;flex:1}
.iqty{font-size:.72rem;color:#8a6a50;font-style:italic;white-space:nowrap}

.tgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}
.tcard{background:#fff;border:1.5px solid #ede3d6;border-radius:14px;padding:17px}
.tcard .ti{font-size:1.4rem;margin-bottom:7px}
.tcard h4{font-size:.88rem;font-weight:600;margin-bottom:5px}
.tcard p{font-size:.78rem;color:#6a5040;line-height:1.55}

.add-form{background:#fff;border:1.5px solid #ede3d6;border-radius:14px;padding:20px;margin-bottom:22px}
.add-form h3{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;margin-bottom:14px}
.frow{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px;align-items:center}
.finput,.fselect{flex:1;min-width:130px;padding:9px 12px;border:1.5px solid #ddd0c0;border-radius:9px;font-family:'DM Sans',sans-serif;font-size:.82rem;background:#fdf8f2;color:#2c1a0e;outline:none;transition:border-color .15s}
.finput:focus,.fselect:focus{border-color:#e8a838}
.ing-row{display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap}
.ing-row .finput{flex:2;min-width:100px}
.ing-row .fselect{flex:1;min-width:90px}
.btn{padding:9px 20px;border-radius:100px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.82rem;cursor:pointer;border:none;transition:opacity .15s}
.btn:hover{opacity:.85}
.btn:disabled{opacity:.5;cursor:not-allowed}
.btn-p{background:#2c1a0e;color:#fdf8f2}
.btn-g{background:#ede3d6;color:#2c1a0e}
.btn-a{background:#e8a838;color:#2c1a0e}
.btn-sm{padding:6px 13px;font-size:.74rem}
.btns{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}
.chk-label{display:flex;align-items:center;gap:6px;font-size:.82rem;font-weight:600;cursor:pointer;white-space:nowrap}
.chk-label input{accent-color:#e8a838;width:15px;height:15px}

.meal-card-mini{background:#fff;border:1.5px solid #ede3d6;border-radius:10px;padding:10px 13px;cursor:pointer;transition:border-color .15s}
.meal-card-mini:hover{border-color:#e8a838}
.meal-card-mini .mn{font-size:.82rem;font-weight:600;margin-bottom:3px}
.meal-card-mini .mm{font-size:.7rem;color:#8a6a50;display:flex;gap:8px;align-items:center;flex-wrap:wrap}

.overlay{position:fixed;inset:0;background:rgba(44,26,14,.6);display:flex;align-items:center;justify-content:center;z-index:200;padding:18px}
.modal{background:#fdf8f2;border-radius:20px;padding:26px;width:100%;max-width:460px;max-height:84vh;overflow-y:auto;box-shadow:0 20px 60px rgba(44,26,14,.3)}
.modal h2{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;margin-bottom:4px}
.modal .sub{font-size:.77rem;color:#8a6a50;margin-bottom:16px}
.mopt{background:#fff;border:1.5px solid #ede3d6;border-radius:12px;padding:11px 15px;margin-bottom:7px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:border-color .15s,background .15s}
.mopt:hover{border-color:#e8a838;background:#fffbf5}
.mopt .mn{font-size:.84rem;font-weight:600}
.mopt .mm{font-size:.71rem;color:#8a6a50;margin-top:2px}
.mopt .mp{font-weight:700;color:#e8a838;font-size:.86rem;flex-shrink:0;margin-left:10px}
.ing-list{margin-top:10px}
.ing-item{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0e8de;font-size:.81rem}
.ing-item:last-child{border-bottom:none}
.ing-item .in{font-weight:500}
.ing-item .iq{color:#8a6a50;font-style:italic}
.ing-cat-label{font-size:.67rem;font-weight:700;color:#e8a838;text-transform:uppercase;letter-spacing:.8px;margin:12px 0 4px}
.empty-state{text-align:center;padding:36px 20px;color:#8a6a50;font-size:.84rem}
.loader{text-align:center;padding:80px 20px;color:#8a6a50;font-size:.9rem}
`;

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]           = useState("planner");
  const [syncStatus, setSyncStatus] = useState("loading");
  const [meals, setMeals]       = useState([]);
  const [ingMap, setIngMap]     = useState({});
  const [plan, setPlan]         = useState({});
  const [checked, setChecked]   = useState({});
  const [modal, setModal]       = useState(null);
  const [newMeal, setNewMeal]   = useState({ name:"", type:"dinner", cost:"", baby:false, url:"" });
  const [newIngs, setNewIngs]   = useState([{ name:"", quantity:"", category:"Produce" }]);
  const [saving, setSaving]     = useState(false);

  // ── Bootstrap ──────────────────────────────────────────────────────────────
  useEffect(() => { bootstrap(); }, []);

  async function bootstrap() {
    try {
      const { data: existing } = await supabase.from("meals").select("id").limit(1);
      if (!existing || existing.length === 0) {
        await supabase.from("meals").insert(SEED_MEALS);
        await supabase.from("recipe_ingredients").insert(SEED_INGREDIENTS);
        await supabase.from("meal_plan").upsert(DEFAULT_PLAN_ROWS, { onConflict:"day,meal_type,slot" });
      }
      await loadAll();
      subscribeRealtime();
    } catch (e) {
      console.error(e);
      setSyncStatus("error");
    }
  }

  async function loadAll() {
    const [mealsRes, ingsRes, planRes] = await Promise.all([
      supabase.from("meals").select("*").order("type").order("name"),
      supabase.from("recipe_ingredients").select("*"),
      supabase.from("meal_plan").select("*"),
    ]);
    if (mealsRes.error || ingsRes.error || planRes.error) { setSyncStatus("error"); return; }
    setMeals(mealsRes.data || []);
    setIngMap(rowsToIngMap(ingsRes.data || []));
    setPlan(rowsToPlan(planRes.data || []));
    setSyncStatus("live");
  }

  function subscribeRealtime() {
    supabase.channel("plan_changes")
      .on("postgres_changes", { event:"*", schema:"public", table:"meal_plan" }, loadAll)
      .subscribe();
  }

  // ── Plan mutations ─────────────────────────────────────────────────────────
  async function upsertSlot(day, mealType, slot, mealId) {
    // Optimistic local update
    setPlan(p => ({
      ...p,
      [day]: { ...p[day], [mealType]: { ...(p[day]?.[mealType] || {}), [slot]: mealId } }
    }));
    await supabase.from("meal_plan").upsert(
      { day, meal_type: mealType, slot, meal_id: mealId || null },
      { onConflict: "day,meal_type,slot" }
    );
  }

  async function removeSecondSlot(day, mealType) {
    // Remove m2 key from local plan
    setPlan(p => {
      const updated = { ...(p[day]?.[mealType] || {}) };
      delete updated.m2;
      return { ...p, [day]: { ...p[day], [mealType]: updated } };
    });
    await supabase.from("meal_plan")
      .delete()
      .eq("day", day)
      .eq("meal_type", mealType)
      .eq("slot", "m2");
  }

  function pickMeal(mealId) {
    const { day, mealType, slot } = modal;
    upsertSlot(day, mealType, slot, mealId);
    setModal(null);
  }

  // ── Add new meal ───────────────────────────────────────────────────────────
  async function saveMeal() {
    if (!newMeal.name.trim() || !newMeal.cost) return;
    setSaving(true);
    const id = newMeal.type[0] + Date.now();
    const mealRow = {
      id,
      name: newMeal.name.trim(),
      type: newMeal.type,
      cost: parseFloat(newMeal.cost),
      baby: newMeal.baby,
      url:  newMeal.url.trim() || null,
    };
    const ingRows = newIngs
      .filter(i => i.name.trim())
      .map(i => ({ meal_id: id, name: i.name.trim(), quantity: i.quantity.trim() || "as needed", category: i.category }));

    await supabase.from("meals").insert(mealRow);
    if (ingRows.length) await supabase.from("recipe_ingredients").insert(ingRows);
    await loadAll();
    setNewMeal({ name:"", type:"dinner", cost:"", baby:false, url:"" });
    setNewIngs([{ name:"", quantity:"", category:"Produce" }]);
    setSaving(false);
  }

  // ── Derived ────────────────────────────────────────────────────────────────
  const mealById = Object.fromEntries(meals.map(m => [m.id, m]));

  const weeklyMealIds = DAYS.flatMap(d =>
    MEAL_TYPES.flatMap(t => [plan[d]?.[t]?.m1, plan[d]?.[t]?.m2])
  ).filter(id => id && id !== "");

  const shopItems = consolidateIngredients(weeklyMealIds, ingMap);
  const shopByCat = CATEGORY_ORDER
    .map(cat => ({ cat, items: shopItems.filter(i => i.category === cat) }))
    .filter(c => c.items.length > 0);

  const totalCost = DAYS.reduce((acc, d) =>
    acc + MEAL_TYPES.reduce((s, t) => {
      const slot = plan[d]?.[t] || {};
      return s
        + (mealById[slot.m1]?.cost || 0)
        + (slot.m2 && slot.m2 !== "" ? mealById[slot.m2]?.cost || 0 : 0);
    }, 0)
  , 0) * 5;

  // ── Sub-components ─────────────────────────────────────────────────────────
  function MealChip({ meal, isSecond, onPick, onRecipe, onRemove }) {
    if (!meal) {
      return (
        <div className={`mchip empty${isSecond?" second":""}`} onClick={onPick}>
          {isSecond && <span className="second-badge">2nd</span>}
          <span className="chip-name">Tap to set</span>
        </div>
      );
    }
    return (
      <div className={`mchip${isSecond?" second":""}`}>
        {isSecond && <span className="second-badge">2nd</span>}
        <span className="chip-name" onClick={onPick}>{meal.name}</span>
        <span className="chip-icons">
          {meal.baby && <span className="baby-dot" title="Baby-friendly" />}
          <button className="chip-icon" title="View ingredients" onClick={onRecipe}>📋</button>
          {isSecond && (
            <button className="chip-icon" title="Remove 2nd meal" onClick={onRemove}
              style={{fontSize:".75rem"}}>✕</button>
          )}
        </span>
      </div>
    );
  }

  function MealSlot({ day, mealType, icon, label, supportsSecond }) {
    const slot     = plan[day]?.[mealType] || {};
    const meal1    = mealById[slot.m1] || null;
    const meal2    = mealById[slot.m2] || null;
    // hasSecond: m2 key exists in the slot object (even if value is "" = unpicked)
    const hasSecond = "m2" in (plan[day]?.[mealType] || {});

    return (
      <div className="mslot">
        <div className="mslot-lbl">{icon} {label}</div>
        <div className="chips">
          <MealChip
            meal={meal1}
            isSecond={false}
            onPick={() => setModal({ type:"pick", day, mealType, slot:"m1" })}
            onRecipe={() => meal1 && setModal({ type:"recipe", mealId: meal1.id })}
          />
          {supportsSecond && hasSecond && (
            <MealChip
              meal={meal2}
              isSecond={true}
              onPick={() => setModal({ type:"pick", day, mealType, slot:"m2" })}
              onRecipe={() => meal2 && setModal({ type:"recipe", mealId: meal2.id })}
              onRemove={() => removeSecondSlot(day, mealType)}
            />
          )}
          {supportsSecond && !hasSecond && (
            <button className="add-second" onClick={() =>
              setPlan(p => ({
                ...p,
                [day]: { ...p[day], [mealType]: { ...(p[day]?.[mealType] || {}), m2: "" } }
              }))
            }>
              ＋ add 2nd meal
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  if (syncStatus === "loading") return <div className="loader">⏳ Loading your meal planner…</div>;

  return (
    <div className="app">
      <style>{css}</style>

      <header className="hdr">
        <div>
          <h1>
            🥗 Family Meal Planner
            <span className={`sync ${syncStatus}`}>
              <span className="dot" />
              {syncStatus === "live" ? "Live sync" : syncStatus === "error" ? "Offline" : "Connecting…"}
            </span>
          </h1>
          <p>2 adults · 2 kids · 1 baby — shared across devices</p>
        </div>
        <div className="budget-pill">
          £{totalCost.toFixed(2)}
          <small>est. weekly cost</small>
        </div>
      </header>

      <div className="tabs">
        {[["planner","📅 Weekly Plan"],["shopping","🛒 Shopping List"],["meals","➕ Add Meals"],["tips","💡 Tips"]].map(([id,lbl]) => (
          <button key={id} className={`tab ${tab===id?"on":""}`} onClick={() => setTab(id)}>{lbl}</button>
        ))}
      </div>

      <div className="page">

        {/* ── PLANNER ── */}
        {tab === "planner" && <>
          <div className="sbar">
            <div className="sstat"><div className="v">£{totalCost.toFixed(2)}</div><div className="l">Weekly est.</div></div>
            <div className="sstat"><div className="v">£{(totalCost/7).toFixed(2)}</div><div className="l">Per day</div></div>
            <div className="sstat"><div className="v">{weeklyMealIds.length}</div><div className="l">Meals planned</div></div>
            <div className="sstat"><div className="v g">~£{Math.max(0,120-totalCost).toFixed(0)}</div><div className="l">Saved vs avg</div></div>
          </div>
          <div className="wgrid">
            {DAYS.map(day => {
              const dayCost = MEAL_TYPES.reduce((s, t) => {
                const slot = plan[day]?.[t] || {};
                return s + (mealById[slot.m1]?.cost||0) + (slot.m2 && slot.m2 !== "" ? mealById[slot.m2]?.cost||0 : 0);
              }, 0) * 5;
              return (
                <div key={day} className="dcard">
                  <div className="dlabel">{day}</div>
                  <MealSlot day={day} mealType="breakfast" icon="🌅" label="Breakfast" supportsSecond={false} />
                  <MealSlot day={day} mealType="lunch"     icon="☀️" label="Lunch"     supportsSecond={true}  />
                  <MealSlot day={day} mealType="dinner"    icon="🌙" label="Dinner"    supportsSecond={true}  />
                  <div className="dcost">£{dayCost.toFixed(2)}</div>
                </div>
              );
            })}
          </div>
        </>}

        {/* ── SHOPPING ── */}
        {tab === "shopping" && <>
          <div className="sbar">
            <div className="sstat"><div className="v">{shopItems.length}</div><div className="l">Unique items</div></div>
            <div className="sstat"><div className="v g">{Object.values(checked).filter(Boolean).length}</div><div className="l">Ticked off</div></div>
            <div className="sstat"><div className="v">{weeklyMealIds.length}</div><div className="l">Meals in plan</div></div>
            <button className="btn btn-g btn-sm" onClick={() => setChecked({})}>Clear ticks</button>
          </div>
          {shopByCat.length === 0
            ? <div className="empty-state">No meals in the plan yet — head to Weekly Plan to add some.</div>
            : shopByCat.map(({ cat, items }) => (
              <div key={cat} className="cat-section">
                <div className="cat-head">
                  <h3>{CATEGORY_ICONS[cat]} {cat}</h3>
                  <span className="cat-badge">{items.length} items</span>
                </div>
                <div className="igrid">
                  {items.map(item => {
                    const key = cat + item.name;
                    const qty = item.quantities.length > 1 ? item.quantities.join(" + ") : item.quantities[0];
                    return (
                      <div key={key} className={`icard ${checked[key]?"ticked":""}`}
                        onClick={() => setChecked(c => ({ ...c, [key]: !c[key] }))}>
                        <input type="checkbox" checked={!!checked[key]} onChange={() => {}} />
                        <span className="iname">{item.name}</span>
                        <span className="iqty">{qty}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          }
        </>}

        {/* ── ADD MEALS ── */}
        {tab === "meals" && <>
          <div className="add-form">
            <h3>Add a new meal</h3>
            <div className="frow">
              <input className="finput" placeholder="Meal name" value={newMeal.name}
                onChange={e => setNewMeal(m => ({ ...m, name: e.target.value }))} />
              <select className="fselect" value={newMeal.type}
                onChange={e => setNewMeal(m => ({ ...m, type: e.target.value }))}>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
              <input className="finput" placeholder="Cost per person £" type="number" step="0.01"
                style={{maxWidth:160}} value={newMeal.cost}
                onChange={e => setNewMeal(m => ({ ...m, cost: e.target.value }))} />
              <label className="chk-label">
                <input type="checkbox" checked={newMeal.baby}
                  onChange={e => setNewMeal(m => ({ ...m, baby: e.target.checked }))} />
                Baby-friendly
              </label>
            </div>
            <div className="frow" style={{marginBottom:12}}>
              <input className="finput" placeholder="Recipe URL (optional, e.g. https://bbcgoodfood.com/...)" type="url"
                value={newMeal.url}
                onChange={e => setNewMeal(m => ({ ...m, url: e.target.value }))} />
            </div>
            <div style={{fontSize:".77rem",fontWeight:600,color:"#8a6a50",marginBottom:8}}>Ingredients</div>
            {newIngs.map((ing, i) => (
              <div key={i} className="ing-row">
                <input className="finput" placeholder="Ingredient" value={ing.name}
                  onChange={e => setNewIngs(ings => ings.map((x,j) => j===i?{...x,name:e.target.value}:x))} />
                <input className="finput" placeholder="Qty (e.g. 2 medium)" value={ing.quantity}
                  onChange={e => setNewIngs(ings => ings.map((x,j) => j===i?{...x,quantity:e.target.value}:x))} />
                <select className="fselect" value={ing.category}
                  onChange={e => setNewIngs(ings => ings.map((x,j) => j===i?{...x,category:e.target.value}:x))}>
                  {CATEGORY_ORDER.map(c => <option key={c}>{c}</option>)}
                </select>
                {newIngs.length > 1 &&
                  <button className="btn btn-g btn-sm"
                    onClick={() => setNewIngs(ings => ings.filter((_,j) => j!==i))}>✕</button>}
              </div>
            ))}
            <div className="btns">
              <button className="btn btn-g btn-sm"
                onClick={() => setNewIngs(i => [...i, { name:"", quantity:"", category:"Produce" }])}>
                + Ingredient
              </button>
              <button className="btn btn-a" onClick={saveMeal}
                disabled={saving || !newMeal.name.trim() || !newMeal.cost}>
                {saving ? "Saving…" : "Save meal"}
              </button>
            </div>
          </div>

          {MEAL_TYPES.map(type => {
            const typeMeals = meals.filter(m => m.type === type);
            return (
              <div key={type} className="cat-section">
                <div className="cat-head">
                  <h3>{type==="breakfast"?"🌅":type==="lunch"?"☀️":"🌙"} {type.charAt(0).toUpperCase()+type.slice(1)}</h3>
                  <span className="cat-badge">{typeMeals.length} meals</span>
                </div>
                <div className="igrid">
                  {typeMeals.map(m => (
                    <div key={m.id} className="meal-card-mini"
                      onClick={() => setModal({ type:"recipe", mealId:m.id })}>
                      <div className="mn">{m.name}</div>
                      <div className="mm">
                        <span style={{fontWeight:700,color:"#e8a838"}}>£{m.cost.toFixed(2)}pp</span>
                        {m.baby && <span style={{color:"#6ed87a",fontWeight:600}}>✅ baby</span>}
                        {m.url && <span style={{color:"#e8a838"}}>🔗</span>}
                        <span style={{textDecoration:"underline"}}>{(ingMap[m.id]||[]).length} ingredients</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </>}

        {/* ── TIPS ── */}
        {tab === "tips" && <>
          <div className="sbar" style={{marginBottom:20}}>
            <div className="sstat"><div className="v g">~£{Math.max(0,120-totalCost).toFixed(0)}</div><div className="l">Potential saving</div></div>
            <div className="sstat"><div className="v">£{(totalCost/5).toFixed(2)}</div><div className="l">Per person/week</div></div>
            <div className="sstat"><div className="v">{meals.filter(m=>m.baby).length}</div><div className="l">Baby-safe meals</div></div>
          </div>
          <div className="tgrid">
            {TIPS.map(t => (
              <div key={t.title} className="tcard">
                <div className="ti">{t.icon}</div>
                <h4>{t.title}</h4>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </>}

      </div>

      {/* ── PICK MEAL MODAL ── */}
      {modal?.type === "pick" && (
        <div className="overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{modal.slot === "m2" ? "Add 2nd " : "Change "}{modal.mealType}</h2>
            <div className="sub">
              {modal.day}{modal.slot === "m2" ? " · second meal — ingredients added to shopping list" : " · tap to select"}
            </div>
            {meals.filter(m => m.type === modal.mealType).map(m => (
              <div key={m.id} className="mopt" onClick={() => pickMeal(m.id)}>
                <div>
                  <div className="mn">{m.name}</div>
                  <div className="mm">
                    {m.baby ? "✅ baby-friendly · " : "👶 adapt for baby · "}
                    {(ingMap[m.id]||[]).length} ingredients
                  </div>
                </div>
                <div className="mp">£{(m.cost*5).toFixed(2)}</div>
              </div>
            ))}
            <div className="btns">
              <button className="btn btn-g" onClick={() => setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── RECIPE MODAL ── */}
      {modal?.type === "recipe" && (() => {
        const m    = mealById[modal.mealId];
        const ings = ingMap[modal.mealId] || [];
        const byCat = CATEGORY_ORDER
          .map(cat => ({ cat, items: ings.filter(i => i.category === cat) }))
          .filter(c => c.items.length > 0);
        return (
          <div className="overlay" onClick={() => setModal(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2>{m?.name}</h2>
              <div className="sub">
                {m?.baby ? "✅ Baby-friendly" : "👶 Adapt for baby"}
                {" · "}£{((m?.cost||0)*5).toFixed(2)} for family of 5
              </div>
              {m?.url && (
                <a href={m.url} target="_blank" rel="noopener noreferrer"
                  style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:".78rem",fontWeight:600,
                    color:"#e8a838",textDecoration:"none",marginBottom:14,borderBottom:"1px solid #e8a838",paddingBottom:1}}>
                  🔗 View full recipe
                </a>
              )}
              {ings.length === 0
                ? <div className="empty-state" style={{padding:"20px 0"}}>No ingredients recorded.</div>
                : <div className="ing-list">
                    {byCat.map(({ cat, items }) => (
                      <div key={cat}>
                        <div className="ing-cat-label">{CATEGORY_ICONS[cat]} {cat}</div>
                        {items.map((ing, i) => (
                          <div key={i} className="ing-item">
                            <span className="in">{ing.name}</span>
                            <span className="iq">{ing.quantity}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
              }
              <div className="btns" style={{marginTop:16}}>
                <button className="btn btn-g" onClick={() => setModal(null)}>Close</button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}

// ---------- Apply embedded photos (IMG comes from images.js) ----------
if (typeof IMG !== 'undefined') {
  document.querySelectorAll('[data-img]').forEach(el => {
    const key = el.dataset.img;
    if (IMG[key]) el.src = IMG[key];
  });
  document.querySelectorAll('[data-img-bg]').forEach(el => {
    const key = el.dataset.imgBg;
    if (IMG[key]) {
      el.style.backgroundImage =
        `linear-gradient(180deg, rgba(33,27,23,0.55) 0%, rgba(33,27,23,0.75) 55%, var(--ink) 96%), url(${IMG[key]})`;
    }
  });
  document.querySelectorAll('[data-img-href]').forEach(el => {
    const key = el.dataset.imgHref;
    if (IMG[key]) el.href = IMG[key];
  });
}

// ---------- Nav scroll state ----------
const header = document.getElementById('siteHeader');
if(header){
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40));
}

// ---------- Mobile nav ----------
const burger = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');
if(burger && navLinks){
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { navLinks.classList.remove('open'); burger.classList.remove('open'); }));
}

// ---------- Scroll reveal ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Counter count-up animation ----------
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const isDecimal = String(target).includes('.');
    let cur = 0;
    const step = target / 40;
    const tick = () => {
      cur += step;
      if(cur >= target) cur = target;
      el.textContent = (isDecimal ? cur.toFixed(1) : Math.floor(cur)) + suffix;
      if(cur < target) requestAnimationFrame(tick);
    };
    tick();
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat .num[data-count]').forEach(c => counterIO.observe(c));

// ---------- Divider strip duplicate for seamless loop ----------
const track = document.getElementById('dividerTrack');
if(track) track.innerHTML += track.innerHTML;

// ---------- Scrollspy for nav active state ----------
const sections = document.querySelectorAll('main section[id]');
const navA = document.querySelectorAll('.nav-links a[href^="#"]');
const spyIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => spyIO.observe(s));

// ---------- Menu data — sourced directly from Bonva's own printed/story menu ----------
const menuData = {
  "Popular": [
    {n:"Paratha Burger", p:649, d:"Chicken patty, sauce & caramelized onion, veggies and cheese in a light crisp paratha.", tag:"Bestseller"},
    {n:"Creamy Chicken Croissant Sandwich", p:899, d:"Freshly baked croissant with tarragon chicken, cheese and sauce.", img:"croissant_melty"},
    {n:"House Special Tacos", p:899, d:"Chicken, medium soft shell, house special sauce and fresh salsa.", img:"creamy_house_tacos"},
    {n:"Hot Honey Mini Burgers", p:999, d:"Crispy chicken, sriracha honey sauce & jalapeños."},
    {n:"Iced Tiramisu Latte", p:699, d:"Cold coffee, tiramisu-flavoured, finished the Bonva way.", img:"iced_tiramisu_latte"},
    {n:"Kunafa Pistachio Brownie", p:399, d:"Fudgy brownie meets kunafa and pistachio.", tag:"Bestseller"}
  ],
  "Mains": [
    {n:"Bonva Special Loaf Sandwich", p:1049, d:"Soft buttery fresh bread loaf, crispy chicken, cheese & sauce, served with garlic lettuce."},
    {n:"Creamy Chicken Croissant Sandwich", p:899, d:"Freshly baked croissant, tarragon chicken, cheese & sauce.", img:"croissant_melty"},
    {n:"Scrambled Egg Cheese Croissant", p:899, d:"Scrambled eggs, special sauce, veggies, cheese & pepperoni."},
    {n:"Pastrami Egg Cheese Croissant", p:899, d:"Pastrami strips, special sauce, scrambled egg & cheddar cheese.", img:"turkey_egg_croissant"},
    {n:"Mexican Fiery Tacos (4pcs)", p:849, d:"Spicy chicken, fresh cheddar cheese, served with fresh salsa.", img:"house_special_tacos"},
    {n:"House Special Tacos", p:899, d:"Chicken, medium soft shell, house special sauce, fresh salsa.", img:"creamy_house_tacos", tag:"Bestseller"},
    {n:"Chicken Cheese Foldover Wrap", p:899, d:"Crispy chicken, fries, fresh veggies, cheese & special sauce.", img:"quesadilla_wrap"},
    {n:"Hot Honey Mini Burgers", p:999, d:"Crispy chicken, sriracha honey sauce, jalapeños.", tag:"Bestseller"},
    {n:"Mini Burgers with Cheese Sauce Tub (4pcs)", p:799, d:"Fresh chicken patty, veggies & cheese, served with cheddar cheese sauce.", img:"spread_burgers_fries"},
    {n:"Korean Pull Apart Cream Cheese Buns (3pcs)", p:799, d:"Cream cheese, fresh herbs, garlic buns & fresh mozzarella.", img:"korean_cream_cheese_buns"},
    {n:"Paratha Burger", p:649, d:"Chicken patty, sauce & caramelized onion, veggies and cheese in a light crisp paratha."},
    {n:"High Protein Salad", p:999, d:"Protein-forward chicken salad, built for the health-conscious crowd."}
  ],
  "Sides": [
    {n:"Mexican Salsa Fries", p:599, d:"Spicy, tangy, Mexican-style fried potatoes."},
    {n:"Tortilla Chips with Habanero Sauce & Salsa", p:499, d:"Crispy corn chips, spicy tangy dip."},
    {n:"Seasonal Fries & Wedges Tray", p:549, d:"Oven roasted, savory and crisp."},
    {n:"Plain Flaky Croissant", p:349, d:"Classic French bake."},
    {n:"Plain Fries", p:349, d:"Classic, no notes."}
  ],
  "Sweet Tooth": [
    {n:"Chocolate Fudge Brownie", p:349, d:"Rich, fudgy, classic."},
    {n:"Kunafa Pistachio Brownie", p:399, d:"Fudgy brownie meets kunafa and pistachio.", tag:"Bestseller"},
    {n:"Affogato", p:549, d:"Classic, Mocha, Caramel or Peanut — espresso poured over ice cream."},
    {n:"Brazilian Coconut Cold Cake", p:599, d:"Available Friday & Saturday only."},
    {n:"Mini Croissant with Chocolate Dip", p:599, d:"Bite-sized croissants, warm chocolate dip on the side.", img:"choc_strawberry_croissant"},
    {n:"Mini Brownies with Chocolate Dip", p:599, d:"Bite-sized brownies, warm chocolate dip on the side."}
  ],
  "Hot Coffee": [
    {n:"Espresso (Single)", p:199, d:"Straight up."},
    {n:"Espresso (Double)", p:299, d:"For the ones who mean it."},
    {n:"Americano", p:349, d:"Espresso, hot water."},
    {n:"Café Mocha", p:549, d:"Espresso, chocolate, steamed milk."},
    {n:"Hazelnut Latte", p:549, d:"Espresso, steamed milk, hazelnut."},
    {n:"Vanilla Latte", p:549, d:"Espresso, steamed milk, vanilla."},
    {n:"Caramel Latte", p:549, d:"Espresso, steamed milk, caramel."},
    {n:"Hot Chocolate", p:549, d:"Rich and comforting."},
    {n:"Café Latte", p:599, d:"Espresso, steamed milk."},
    {n:"Honey Cinnamon Latte", p:599, d:"Espresso, steamed milk, honey & cinnamon."},
    {n:"Cappuccino", p:599, d:"Espresso, steamed milk, thick foam."},
    {n:"Extra Shot", p:100, d:"Add it to anything."}
  ],
  "Cold Coffee": [
    {n:"Iced Americano", p:349, d:"Chilled espresso with water."},
    {n:"Spanish Latte", p:499, d:"Chilled espresso and milk, Spanish style."},
    {n:"Hazelnut Latte", p:549, d:"Iced, with hazelnut."},
    {n:"Vanilla Latte", p:549, d:"Iced, with vanilla."},
    {n:"Iced Latte", p:549, d:"Chilled espresso beverage with milk."},
    {n:"Iced Mocha", p:549, d:"Chilled coffee and chocolate."},
    {n:"Honey Cinnamon Latte", p:599, d:"Iced, with honey & cinnamon."},
    {n:"Coconut Iced Latte", p:649, d:"Chilled espresso, coconut milk."},
    {n:"Pistachio Mocha Latte", p:649, d:"Chilled mocha, pistachio."},
    {n:"Pistachio Cold Foam Latte", p:649, d:"Iced latte, pistachio cold foam."},
    {n:"Brown Sugar Coconut Latte", p:649, d:"Brown sugar, coconut milk, espresso."},
    {n:"Coffee Honey Lemon", p:649, d:"Chilled espresso-style drink with honey and lemon."},
    {n:"Iced Tiramisu Latte", p:699, d:"Cold coffee, tiramisu-flavoured.", tag:"Bestseller", img:"iced_tiramisu_latte"}
  ],
  "Smoothies": [
    {n:"Mix Berry Smoothie", p:549, d:"Blended mixed berries."},
    {n:"Strawberry Smoothie", p:549, d:"Silky, mildly sweet blended strawberry."},
    {n:"Mango Smoothie", p:549, d:"Silky blended mango."},
    {n:"Red Berry Smoothie", p:549, d:"Silky blended berries."}
  ],
  "Tea": [
    {n:"Karak Tea", p:349, d:"Brewed black tea with warming spices."},
    {n:"Masala Tea", p:349, d:"Brewed black tea with milk, aromatic."},
    {n:"Doodh Patti", p:349, d:"Simmered milk tea, rich and comforting."},
    {n:"Black Tea", p:199, d:"Aromatic, mildly sweet."},
    {n:"Green Tea", p:199, d:"Refreshing and aromatic."},
    {n:"Lemon Grass Tea", p:199, d:"Light, citrusy and calming."}
  ],
  "Beverages": [
    {n:"Mint Margarita", p:349, d:"Fresh, minty, non-alcoholic."},
    {n:"Fresh Lime", p:249, d:"Tangy and refreshing."},
    {n:"Peach Iced Tea", p:399, d:"Chilled brewed tea, peach-infused."},
    {n:"Water", p:100, d:"Bottled."},
    {n:"Wild Soda", p:299, d:"Fizzy, mildly sweet."}
  ],
  "Seasonal — Mango Menu": [
    {n:"Mango Sago", p:749, d:"Creamy mango with soft sago pearls, a refreshing classic done the Bonva way.", tag:"Limited Time", img:"mango_sago"},
    {n:"Mango Tangy Fries", p:899, d:"Crispy fries topped with juicy mango salsa, tangy sauce & herbs. Sweet, spicy & addictive.", tag:"Limited Time", img:"mango_fries"},
    {n:"Mango Sticky Rice", p:899, d:"Classic Thai-style sticky rice with ripe mango, coconut sauce & a sprinkle of toasted sesame.", tag:"Limited Time", img:"mango_rice"}
  ]
};

function renderMenuGrid(cat, gridEl){
  gridEl.innerHTML = '';
  menuData[cat].forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-item';
    card.innerHTML = `
      ${item.tag ? `<span class="badge">${item.tag}</span>` : ''}
      ${item.img && typeof IMG !== 'undefined' && IMG[item.img] ? `<div class="item-photo"><img src="${IMG[item.img]}" alt="${item.n}" loading="lazy"></div>` : ''}
      <div class="top">
        <h3>${item.n}</h3>
        <span class="price">Rs. ${item.p.toLocaleString()}</span>
      </div>
      <p class="desc">${item.d}</p>
    `;
    gridEl.appendChild(card);
  });
}

let allTabButtons = [];

function initMenuTabs(){
  const tabsEl = document.getElementById('tabs');
  const gridEl = document.getElementById('menuGrid');
  if(!tabsEl || !gridEl) return;
  const categories = Object.keys(menuData);
  categories.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (i === 0 ? ' active' : '');
    btn.textContent = cat;
    btn.dataset.cat = cat;
    btn.addEventListener('click', () => {
      if(btn.classList.contains('active')) return;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      gridEl.style.opacity = '0';
      setTimeout(() => {
        renderMenuGrid(cat, gridEl);
        gridEl.style.opacity = '1';
      }, 180);
    });
    tabsEl.appendChild(btn);
    allTabButtons.push(btn);
  });
  renderMenuGrid(categories[0], gridEl);
}
initMenuTabs();

window.selectMenuTab = function(catName){
  const btn = allTabButtons.find(b => b.dataset.cat === catName);
  if(btn) btn.click();
};

// ---------- Reviews ----------
const reviews = [
  {stars:5, text:"A charming little cafe with a cozy ambiance and surprisingly rich flavours. The menu is limited but the taste more than makes up for it — the croissant and paratha burger were both excellent.", who:"Google review · Multan"},
  {stars:5, text:"Polite staff who actually asked our caffeine preference and whether we wanted it light or strong. The food was fresh, warm and the protein-forward menu was a nice touch at a reasonable price. Loved the book collection too.", who:"Google review · Multan"},
  {stars:5, text:"Second order in a row and everything landed perfectly — the honey cinnamon french toast and paratha burger were out of this world.", who:"Hissan · Foodpanda"},
  {stars:5, text:"Already loved their croissants and tacos, but the french toast this time round might be my new favourite. Bonva never disappoints.", who:"Zoya · Foodpanda"},
  {stars:5, text:"Rich, smooth, perfectly balanced — genuinely one of the best coffees I've had in a while.", who:"Awais · Foodpanda"},
  {stars:4, text:"Nice indoor and outdoor seating with a cozy feel. Menu is limited to mini burgers, croissant sandwiches and the paratha burger, but the mini burger with cheese sauce was good and made fresh.", who:"Google review · Multan"}
];

function renderReviews(){
  const reviewsTrack = document.getElementById('reviewsTrack');
  if(!reviewsTrack) return;
  const buildCard = (r) => {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `<div class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div><p>"${r.text}"</p><div class="who">${r.who}</div>`;
    return card;
  };
  // Render the list twice back-to-back so the marquee can loop seamlessly at -50%
  reviews.forEach(r => reviewsTrack.appendChild(buildCard(r)));
  reviews.forEach(r => reviewsTrack.appendChild(buildCard(r)));
}
renderReviews();

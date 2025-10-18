// Prices (update as you like)
const prices = {
  necklace: { gold: 50000, diamond: 120000, artificial: 2000 },
  earrings: { gold: 15000, diamond: 40000, artificial: 800 },
  rings: { gold: 10000, diamond: 30000, artificial: 500 },
  bangles: { gold: 20000, diamond: 60000, artificial: 1500 }
};

const totals = {
  necklace: 0,
  earrings: 0,
  rings: 0,
  bangles: 0
};

// Helper: get element by id with error check
function gid(id) {
  const el = document.getElementById(id);
  if (!el) console.error(`Element with id "${id}" not found in DOM.`);
  return el;
}

// Safe number parsing
function toNum(val) {
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

function updateTotalBill() {
  const total = totals.necklace + totals.earrings + totals.rings + totals.bangles;
  const totalEl = gid('totalBill');
  if (totalEl) totalEl.innerText = `Total Bill: Rs. ${total.toLocaleString()}`;
}

// Calculate functions
function calculateNecklace() {
  const g = toNum(gid('necklaceGoldQty').value);
  const d = toNum(gid('necklaceDiamondQty').value);
  const a = toNum(gid('necklaceArtificialQty').value);
  totals.necklace = (g * prices.necklace.gold) + (d * prices.necklace.diamond) + (a * prices.necklace.artificial);
  const r = gid('necklaceResult');
  if (r) r.innerText = `Necklace Total: Rs. ${totals.necklace.toLocaleString()}`;
  updateTotalBill();
}

function calculateEarrings() {
  const g = toNum(gid('earringsGoldQty').value);
  const d = toNum(gid('earringsDiamondQty').value);
  const a = toNum(gid('earringsArtificialQty').value);
  totals.earrings = (g * prices.earrings.gold) + (d * prices.earrings.diamond) + (a * prices.earrings.artificial);
  const r = gid('earringsResult');
  if (r) r.innerText = `Earrings Total: Rs. ${totals.earrings.toLocaleString()}`;
  updateTotalBill();
}

function calculateRings() {
  const g = toNum(gid('ringsGoldQty').value);
  const d = toNum(gid('ringsDiamondQty').value);
  const a = toNum(gid('ringsArtificialQty').value);
  totals.rings = (g * prices.rings.gold) + (d * prices.rings.diamond) + (a * prices.rings.artificial);
  const r = gid('ringsResult');
  if (r) r.innerText = `Rings Total: Rs. ${totals.rings.toLocaleString()}`;
  updateTotalBill();
}

function calculateBangles() {
  const g = toNum(gid('banglesGoldQty').value);
  const d = toNum(gid('banglesDiamondQty').value);
  const a = toNum(gid('banglesArtificialQty').value);
  totals.bangles = (g * prices.bangles.gold) + (d * prices.bangles.diamond) + (a * prices.bangles.artificial);
  const r = gid('banglesResult');
  if (r) r.innerText = `Bangles Total: Rs. ${totals.bangles.toLocaleString()}`;
  updateTotalBill();
}

// Attach listeners after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Buttons
  const btns = [
    { id: 'necklaceCalcBtn', fn: calculateNecklace },
    { id: 'earringsCalcBtn', fn: calculateEarrings },
    { id: 'ringsCalcBtn', fn: calculateRings },
    { id: 'banglesCalcBtn', fn: calculateBangles }
  ];
  btns.forEach(b => {
    const el = gid(b.id);
    if (el) el.addEventListener('click', b.fn);
  });

  // Optional: calculate on input change as well (live update)
  const inputs = [
    'necklaceGoldQty','necklaceDiamondQty','necklaceArtificialQty',
    'earringsGoldQty','earringsDiamondQty','earringsArtificialQty',
    'ringsGoldQty','ringsDiamondQty','ringsArtificialQty',
    'banglesGoldQty','banglesDiamondQty','banglesArtificialQty'
  ];
  inputs.forEach(id => {
    const el = gid(id);
    if (el) el.addEventListener('input', () => {
      // determine which group to recalc quickly
      if (id.startsWith('necklace')) calculateNecklace();
      else if (id.startsWith('earrings')) calculateEarrings();
      else if (id.startsWith('rings')) calculateRings();
      else if (id.startsWith('bangles')) calculateBangles();
    });
  });

  // initial update
  updateTotalBill();
});


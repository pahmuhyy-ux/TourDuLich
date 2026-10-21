import './style.css'

// ==========================================
// 1. CẤU HÌNH CƠ BẢN VÀ DỮ LIỆU MẶC ĐỊNH
// ==========================================
const img = (id) => `https://picsum.photos/seed/${id}/1200/800`

const getDefaultStagesForTour = (tourName = 'Điểm du lịch') => [
  { stage: 1, title: 'Chặng 1: Đón đoàn & Khởi hành', destination: `Điểm hẹn trung tâm ➔ ${tourName}`, vehicle: 'Xe Limousine 29B-686.86', guide: 'Nguyễn Văn Hùng (0988.123.456)', status: 'Sắp diễn ra' },
  { stage: 2, title: 'Chặng 2: Tham quan & Trải nghiệm', destination: `Khám phá các danh thắng tại ${tourName}`, vehicle: 'Xe điện / Tàu du lịch VIP-02', guide: 'Trần Thị Mai (0912.654.321)', status: 'Sắp diễn ra' },
  { stage: 3, title: 'Chặng 3: Mua sắm đặc sản & Trở về', destination: `Chợ đặc sản ${tourName} ➔ Điểm đón ban đầu`, vehicle: 'Xe Limousine 29B-686.86', guide: 'Nguyễn Văn Hùng (0988.123.456)', status: 'Sắp diễn ra' }
];

const defaultTours = [
  { id: 1, code: 'TO-1023', name: 'Hạ Long 3N2Đ - Ngủ Đêm Du Thuyền 5 Sao', type: 'Biển đảo', date: '2026-10-25', duration: '3N2Đ', price: 4490000, status: 'open', slots: 12, rating: 4.9, reviews: 128, flashSale: true },
  { id: 2, code: 'TO-1129', name: 'Đà Nẵng - Hội An - Bà Nà Hills', type: 'Miền Trung', date: '2026-10-28', duration: '4N3Đ', price: 5890000, status: 'open', slots: 8, rating: 4.8, reviews: 95, flashSale: true },
  { id: 3, code: 'TO-1155', name: 'Phú Quốc 4N3Đ - Cáp Treo Hòn Thơm & Cano 4 Đảo', type: 'Biển đảo', date: '2026-11-02', duration: '4N3Đ', price: 6790000, status: 'open', slots: 15, rating: 4.9, reviews: 210, flashSale: false },
  { id: 4, code: 'TO-1194', name: 'Sapa - Đỉnh Fansipan - Bản Cát Cát', type: 'Núi rừng', date: '2026-11-15', duration: '3N2Đ', price: 5290000, status: 'open', slots: 5, rating: 4.7, reviews: 84, flashSale: true },
  { id: 5, code: 'TO-1218', name: 'Ninh Bình - Tràng An - Bái Đính - Hang Múa', type: 'Miền Bắc', date: '2026-10-26', duration: '2N1Đ', price: 3890000, status: 'open', slots: 20, rating: 4.8, reviews: 156, flashSale: false },
  { id: 6, code: 'TO-1282', name: 'Cần Thơ - Chợ Nổi Cái Răng - Châu Đốc', type: 'Miền Nam', date: '2026-12-03', duration: '3N2Đ', price: 4590000, status: 'open', slots: 10, rating: 4.6, reviews: 62, flashSale: false }
]

const defaultStories = [
  { id: 1, author: 'Nguyễn Yến Nhi', avatar: 'https://i.pravatar.cc/150?u=12', image: img('sapa123'), content: 'Trải nghiệm leo Fansipan quá đỉnh! Hướng dẫn viên siêu nhiệt tình và chụp ảnh có tâm. Mọi người nên thử nhé.', tourId: 4, date: '12/10/2026' },
  { id: 2, author: 'Trần Minh Đức', avatar: 'https://i.pravatar.cc/150?u=45', image: img('halong123'), content: 'Ngủ đêm trên vịnh Hạ Long là một trải nghiệm tuyệt vời. Đồ ăn hải sản rất tươi, phòng ốc sạch sẽ.', tourId: 1, date: '05/10/2026' }
];

const statusLabel = { open: 'Đang nhận khách', pending: 'Sắp mở bán', closed: 'Đã hết chỗ' }
const formatCurrency = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value || 0)

const locationCoords = {
  'hạ long': { lat: 20.95, lon: 107.08 }, 'đà nẵng': { lat: 16.06, lon: 108.20 },
  'hội an': { lat: 15.88, lon: 108.33 }, 'phú quốc': { lat: 10.22, lon: 103.96 },
  'sapa': { lat: 22.33, lon: 103.84 }, 'ninh bình': { lat: 20.25, lon: 105.97 },
  'cần thơ': { lat: 10.03, lon: 105.78 }, 'default': { lat: 16.06, lon: 108.20 }
};

const packingGuides = {
  'Biển đảo': ['Kem chống nắng SPF50+', 'Đồ bơi', 'Kính râm', 'Mũ rộng vành', 'Túi chống nước điện thoại'],
  'Núi rừng': ['Áo khoác giữ nhiệt', 'Giày thể thao chống trượt', 'Xịt chống côn trùng', 'Sạc dự phòng'],
  'Miền Trung': ['Áo khoác mỏng', 'Ô/Dù gấp gọn', 'Giày đi bộ êm chân', 'Máy ảnh'],
  'Miền Bắc': ['Áo khoác gió', 'Giày thể thao', 'Khăn choàng mỏng'],
  'Miền Nam': ['Trang phục thoáng mát', 'Kem chống nắng', 'Nón kết'],
  'default': ['Căn cước công dân / Hộ chiếu', 'Tiền mặt & Thẻ ngân hàng', 'Thuốc cá nhân']
};

const seatList = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3', 'D4'];
let selectedSeats = [];

// ==========================================
// 2. FETCH DATA & HIỂN THỊ DANH SÁCH TOUR
// ==========================================
let toursList = [];

const fetchTours = async () => {
  let fetchedData = [];
  try {
    const response = await fetch('tours.json');
    if (!response.ok) throw new Error('Lỗi tải JSON');
    fetchedData = await response.json();
  } catch (error) {
    fetchedData = [...defaultTours];
  }
  const rawStored = localStorage.getItem('tourdulich_tours');
  if (rawStored !== null) {
    try {
      toursList = JSON.parse(rawStored);
    } catch (e) {
      toursList = [];
    }
  } else {
    // Chỉ khởi tạo dữ liệu mẫu lần đầu tiên khi chưa có dữ liệu trong máy
    const initialTours = fetchedData.map((t, index) => ({
      ...t,
      slots: typeof t.slots === 'number' ? t.slots : (12 - (index % 5)),
      rating: t.rating || (4.7 + (index % 3) * 0.1).toFixed(1),
      reviews: t.reviews || (50 + index * 23),
      stages: (Array.isArray(t.stages) && t.stages.length === 3) ? t.stages : getDefaultStagesForTour(t.name)
    }));
    toursList = initialTours;
    localStorage.setItem('tourdulich_tours', JSON.stringify(toursList));
  }
  renderTourCards(toursList);
  renderStories();
}

const getFavorites = () => JSON.parse(localStorage.getItem('tourdulich_favorites') || '[]');

const renderTourCards = (dataToRender = toursList) => {
  const container = document.querySelector('#featuredTours')
  if (!container) return
  if (dataToRender.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 30px; background: white; border-radius: 12px;">Không tìm thấy hành trình nào khớp với bộ lọc của bạn.</p>`
    return
  }
  const favs = getFavorites();
  container.innerHTML = dataToRender.map((tour) => {
    const tourCode = tour.code || `TO-${String(tour.id).slice(-4).toUpperCase()}`
    const tourType = tour.type || tour.category || 'Tour trọn gói'
    const tourDays = tour.date ? new Date(tour.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) : (tour.duration || 'Hàng tuần')
    const tourImg = tour.image || img(tourCode || tour.name)
    const oldPrice = tour.oldPrice || Math.round(tour.price * 1.18)
    const isFav = favs.includes(String(tour.id));
    const slotsLeft = typeof tour.slots === 'number' ? tour.slots : 10;
    const isSoldOut = slotsLeft <= 0 || tour.status === 'closed';

    return `
    <article class="card tour-card is-clickable" data-id="${tour.id}" tabindex="0" role="button" style="position:relative;">
      <div class="tour-media" style="position: relative;">
        <img src="${tourImg}" alt="${tour.name}" style="${isSoldOut ? 'filter: grayscale(80%);' : ''}" />
        <span class="badge" style="background:${tour.flashSale ? '#ef4444' : '#0d7a5f'};">${tour.flashSale ? '⚡ FLASH SALE' : tourType}</span>
        <span class="days">📅 ${tourDays}</span>
        <button class="btn-favorite" data-id="${tour.id}" style="position: absolute; bottom: 10px; right: 10px; background: white; border: none; border-radius: 50%; width: 34px; height: 34px; cursor: pointer; color: ${isFav ? '#ef4444' : '#cbd5e1'}; z-index: 10; font-size: 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.25);">♥</button>
      </div>
      <div class="tour-body">
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:13px;">
          <span style="color:#0284c7; font-weight:700;">🐦 ${tour.rating || '4.8'}/5 <small style="color:#64748b; font-weight:normal;">(${tour.reviews || 86})</small></span>
          <span style="color:${slotsLeft <= 5 ? '#ef4444' : '#0d7a5f'}; font-weight:600; font-size:12px;">${isSoldOut ? '❌ Hết chỗ' : `🔥 Còn ${slotsLeft} chỗ`}</span>
        </div>
        <h3 style="margin-top:4px;">${tour.name}</h3>
        <p class="tour-meta">Mã: ${tourCode} • Thời lượng: ${tour.duration || '3N2Đ'}</p>
        <div class="tour-foot">
          <div>
            <span class="price-old">${formatCurrency(oldPrice)}</span>
            <span class="price" style="color:#ea580c;">${formatCurrency(tour.price)}</span>
          </div>
          <div style="display: flex; gap: 6px;">
            <a href="tourdetail.html?id=${tour.id}" onclick="event.stopPropagation();" class="btn btn-sm" style="background:#f1f5f9; color:#0f172a; padding: 8px 12px;">Chi tiết</a>
            <button class="btn btn-primary btn-sm" type="button" ${isSoldOut ? 'disabled style="background:#94a3b8; cursor:not-allowed;"' : ''}>${isSoldOut ? 'Hết chỗ' : 'Đặt ngay'}</button>
          </div>
        </div>
      </div>
    </article>
    `
  }).join('')
}

// ==========================================
// 3. WIDGET THỜI TIẾT & GỢI Ý HÀNH LÝ
// ==========================================
const wmoToEmoji = (code) => {
  if (code === 0) return '☀️';
  if (code > 0 && code < 4) return '⛅';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return '🌧️';
  return '🌤️';
};

const renderWeatherAndPacking = async (tour) => {
  const weatherEl = document.querySelector('#tourWeatherWidget');
  const packingEl = document.querySelector('#tourPackingGuide');
  if (!weatherEl || !packingEl) return;

  const tourType = tour.type || tour.category || 'default';
  const allItems = [...new Set([...packingGuides['default'], ...(packingGuides[tourType] || [])])];
  packingEl.innerHTML = allItems.map(item => `<span style="background: #f1f5f9; color: #475569; padding: 6px 12px; border-radius: 20px; font-size: 13px; border: 1px solid #e2e8f0;">✓ ${item}</span>`).join('');

  weatherEl.innerHTML = '<span style="font-size: 13px; color: #64748b;">⏳ Đang tải dự báo thời tiết...</span>';
  let locName = (tour.name + ' ' + (tour.destination || '')).toLowerCase();
  let coords = locationCoords['default'];
  for (const [key, value] of Object.entries(locationCoords)) {
    if (locName.includes(key)) { coords = value; break; }
  }

  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia%2FBangkok`);
    const data = await res.json();
    if (data.daily) {
      let html = '';
      for(let i = 0; i < 7; i++) {
        const dayName = i === 0 ? 'Hôm nay' : new Date(data.daily.time[i]).toLocaleDateString('vi-VN', {weekday: 'short', day: '2-digit', month: '2-digit'});
        html += `<div style="flex: 0 0 auto; width: 75px; text-align: center; padding: 8px 4px; border: 1px solid #e2e8f0; border-radius: 10px; background: #f8fafc;"><div style="font-size: 11px; color: #64748b;">${dayName}</div><div style="font-size: 22px; margin: 4px 0;">${wmoToEmoji(data.daily.weathercode[i])}</div><div style="font-size: 12px; font-weight: bold;">${Math.round(data.daily.temperature_2m_max[i])}°</div></div>`;
      }
      weatherEl.innerHTML = html;
    }
  } catch (e) { weatherEl.innerHTML = '<span style="font-size: 13px; color: #64748b;">Thời tiết điểm đến mát mẻ, thuận lợi di chuyển.</span>'; }
};

let selectedTourObj = null;
const openTourDetail = (tour) => {
  selectedTourObj = tour;
  const modal = document.querySelector('#tourDetailModal')
  if (!modal) return
  const codeStr = tour.code || `TO-${tour.id}`;
  const typeStr = tour.type || tour.category || 'Tour trọn gói';
  
  const detailType = document.querySelector('#tourDetailType');
  if (detailType) detailType.textContent = typeStr;
  const detailName = document.querySelector('#tourDetailName');
  if (detailName) detailName.textContent = tour.name;
  const detailMeta = document.querySelector('#tourDetailMeta');
  if (detailMeta) detailMeta.textContent = `Mã: ${codeStr} • Phân loại: ${typeStr} • Còn nhận: ${tour.slots ?? 10} khách`;
  const detailDate = document.querySelector('#tourDetailDate');
  if (detailDate) detailDate.textContent = tour.date ? new Date(tour.date).toLocaleDateString('vi-VN') : 'Khởi hành hàng tuần';
  const detailPrice = document.querySelector('#tourDetailPrice');
  if (detailPrice) detailPrice.textContent = formatCurrency(tour.price);
  const detailOldPrice = document.querySelector('#tourDetailOldPrice');
  if (detailOldPrice) detailOldPrice.textContent = formatCurrency(tour.oldPrice || Math.round(tour.price * 1.18));
  const detailStatus = document.querySelector('#tourDetailStatus');
  if (detailStatus) detailStatus.textContent = (tour.slots <= 0 || tour.status === 'closed') ? 'Đã hết chỗ' : 'Đang nhận khách';
  const detailImage = document.querySelector('#tourDetailImage');
  if (detailImage) {
    detailImage.src = tour.image || img(tour.code || tour.name);
    detailImage.alt = tour.name;
  }
  const btnFullDetail = document.querySelector('#btnFullDetailPage') || document.querySelector('#tourDetailFullPageLink');
  if (btnFullDetail) btnFullDetail.href = `tourdetail.html?id=${tour.id}`;
  
  const box360 = document.querySelector('#virtual360Box');
  if (box360) box360.style.display = 'none';
  
  renderWeatherAndPacking(tour);
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

// ==========================================
// 4. GIAO DIỆN CHÍNH (ĐÃ TÍCH HỢP PHẦN 1, 4, 5)
// ==========================================
document.querySelector('#app').innerHTML = `
<header class="header" style="background: rgba(6, 40, 31, 0.94); backdrop-filter: blur(8px); position: sticky; top: 0; padding: 14px 0;">
  <div class="container header-inner">
    <a href="/" class="logo"><span class="logo-icon">✈</span><span style="color:#fff;">Tour<strong style="color:#f59e0b;">DuLich</strong></span></a>
    <nav class="nav" style="gap: 18px;">
      <a href="/" class="nav-link active">Trang chủ</a>
      <a href="trangtour.html" class="nav-link">Tất cả Tour</a>
      <a href="trangdonhang.html" class="nav-link">Đơn đặt chỗ</a>
      <a href="#" id="btnGroupPoll" class="nav-link" style="color: #a7f3d0; font-weight: bold;">🗳️ Bình chọn nhóm</a>
      <a href="tranggioithieu.html" class="nav-link">Giới thiệu</a>
      <a href="tranglienhe.html" class="nav-link">Liên hệ</a>
      <a href="#" id="btnItinerary" class="nav-link" style="display:none; color: #38bdf8; font-weight: bold;">📍 Hành trình 3 chặng</a>
      <a href="#" id="btnAffiliate" class="nav-link" style="display:none; color: #fbbf24; font-weight: bold;">🎁 Affiliate</a>
    </nav>
    <div class="header-actions" style="display:flex; align-items:center; gap:8px;">
      <!-- CHUÔNG THÔNG BÁO THỜI GIAN THỰC (PHẦN 5) -->
      <button class="btn btn-sm" id="btnNotifBell" style="background: rgba(255,255,255,0.15); color: #fff; position: relative; padding: 8px 12px;" title="Thông báo từ hệ thống">
        🔔 <span id="notifBadge" style="background:#ef4444; color:white; font-size:11px; padding:1px 6px; border-radius:99px; display:none;">0</span>
      </button>
      <a href="admin.html" style="font-weight: bold; color: #fbbf24; font-size:13px; padding:6px 10px; border:1px solid rgba(251,191,36,0.4); border-radius:8px;">⚙️ Admin</a>
      <button class="btn btn-sm" id="btnFavorites" style="background: rgba(255,255,255,0.15); color: #fff;">❤️ (<span id="favCountBadge">0</span>)</button>
      <button class="btn btn-primary btn-sm" id="btnLogin">Đăng nhập</button>
    </div>
  </div>
</header>

<section class="hero" style="padding: 95px 0 75px;">
  <div class="hero-slides">
    <div class="slide active" style="background-image: url('https://picsum.photos/seed/halongbay/1920/1080')"></div>
    <div class="slide" style="background-image: url('https://picsum.photos/seed/hoian/1920/1080')"></div>
    <div class="slide" style="background-image: url('https://picsum.photos/seed/phuquoc/1920/1080')"></div>
  </div>
  <div class="hero-overlay"></div>
  <div class="container hero-content">
    <p class="hero-tagline">Nền tảng du lịch trực tuyến hàng đầu</p>
    <h1 class="hero-title" style="font-size: clamp(28px, 4vw, 46px);">Từ Việt Nam ra Thế Giới, <br /><span>chạm tay là tới kỳ nghỉ mơ ước</span></h1>
    
    <div style="background: white; border-radius: 16px; padding: 20px; max-width: 960px; margin-top: 26px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); color: #1e293b;">
      <div style="display: flex; gap: 10px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 16px; flex-wrap:wrap;">
        <button type="button" class="search-tab-btn active" data-type="all" style="background:#0ea5e9; color:white; border:none; padding:8px 16px; border-radius:99px; font-weight:700; font-size:13.5px;">🌏 Tất cả Tour</button>
        <button type="button" class="search-tab-btn" data-type="Biển đảo" style="background:#f1f5f9; color:#475569; border:none; padding:8px 16px; border-radius:99px; font-weight:700; font-size:13.5px;">🏖️ Nghỉ dưỡng Biển đảo</button>
        <button type="button" class="search-tab-btn" data-type="Núi rừng" style="background:#f1f5f9; color:#475569; border:none; padding:8px 16px; border-radius:99px; font-weight:700; font-size:13.5px;">⛰️ Khám phá Núi rừng</button>
        <button type="button" class="search-tab-btn" data-type="Miền Trung" style="background:#f1f5f9; color:#475569; border:none; padding:8px 16px; border-radius:99px; font-weight:700; font-size:13.5px;">🏮 Di sản Miền Trung</button>
      </div>
      <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr auto; gap: 12px; align-items: end;">
        <div>
          <label style="font-size:12px; font-weight:700; color:#64748b; display:block; margin-bottom:5px;">📍 Điểm đến hoặc Tên Tour</label>
          <input id="dest" type="text" placeholder="Bạn muốn đi Hạ Long, Sapa, Phú Quốc..." style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:10px; font-size:14px;" />
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:#64748b; display:block; margin-bottom:5px;">📅 Ngày khởi hành</label>
          <input id="date" type="date" style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:10px; font-size:14px;" />
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:#64748b; display:block; margin-bottom:5px;">💰 Ngân sách dự kiến</label>
          <select id="priceFilter" style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:10px; font-size:14px;">
            <option value="all">Mọi mức giá</option>
            <option value="under5">Dưới 5.000.000đ</option>
            <option value="above5">Trên 5.000.000đ</option>
          </select>
        </div>
        <button class="btn btn-search" style="border-radius:10px; padding:12px 24px; height:45px;">🔍 Tìm Tour</button>
      </div>
    </div>
  </div>
</section>

<div style="background: linear-gradient(90deg, #dc2626, #ea580c); color: white; padding: 12px 0;">
  <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
    <div style="display:flex; align-items:center; gap:12px;">
      <span style="background:white; color:#dc2626; font-weight:900; padding:4px 10px; border-radius:6px; font-size:13px;">⚡ FLASH SALE GIỜ VÀNG</span>
      <span style="font-weight:600; font-size:14.5px;">Chọn sẵn ghế ngồi Limousine VIP + Giảm ngay đến 500.000đ cho nhóm gia đình!</span>
    </div>
    <div style="font-weight:bold; font-size:14px; background:rgba(0,0,0,0.25); padding:6px 14px; border-radius:8px;">
      Kết thúc sau: <span id="flashTimer" style="color:#fde047; font-family:monospace; font-size:16px;">04:59:59</span>
    </div>
  </div>
</div>

<section class="section" style="padding: 40px 0;">
  <div class="container">
    <div class="section-head">
      <h2 class="section-title">Điểm Đến Thịnh Hành</h2>
      <p class="section-desc">Những địa danh được yêu thích nhất dành cho chuyến đi của bạn.</p>
    </div>
    <div class="grid destinations">
      <a href="trangtour.html?dest=Hạ+Long" class="card dest-card dest-lg">
        <img src="${img('halong')}" alt="Vịnh Hạ Long" />
        <div class="dest-info"><h3>Vịnh Hạ Long</h3><p>Quảng Ninh • 120+ tour</p></div>
      </a>
      <a href="trangtour.html" class="card dest-card">
        <img src="${img('danang')}" alt="Đà Nẵng" />
        <div class="dest-info"><h3>Đà Nẵng</h3><p>Miền Trung • 85 tour</p></div>
      </a>
      <a href="trangtour.html" class="card dest-card">
        <img src="${img('dalat')}" alt="Đà Lạt" />
        <div class="dest-info"><h3>Đà Lạt</h3><p>Lâm Đồng • 60 tour</p></div>
      </a>
      <a href="trangtour.html" class="card dest-card">
        <img src="${img('hanoi')}" alt="Hà Nội" />
        <div class="dest-info"><h3>Hà Nội</h3><p>Thủ đô • 95 tour</p></div>
      </a>
      <a href="trangtour.html" class="card dest-card">
        <img src="${img('phuquoc')}" alt="Phú Quốc" />
        <div class="dest-info"><h3>Phú Quốc</h3><p>Kiên Giang • 50 tour</p></div>
      </a>
      <a href="trangtour.html" class="card dest-card">
        <img src="${img('nhatrang')}" alt="Nha Trang" />
        <div class="dest-info"><h3>Nha Trang</h3><p>Khánh Hòa • 72 tour</p></div>
      </a>
    </div>
  </div>
</div>

<!-- MÃ GIẢM GIÁ -->
<section class="section promo-section" style="padding: 45px 0;">
  <div class="container">
    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom: 20px;">
      <div>
        <p class="section-label" style="margin-bottom:4px;">MÃ KHUYẾN MÃI ĐỘC QUYỀN</p>
        <h2 class="section-title" style="color: #0c4a6e; font-size: 26px;">Lưu Mã Giảm Giá Trước Khi Đặt</h2>
      </div>
    </div>
    <div class="promo-slider">
      <div class="promo-card">
        <span class="promo-badge">Sắp hết lượt</span>
        <div class="promo-card-inner">
          <div class="promo-logo"><img src="https://picsum.photos/seed/hdbank/80/80" alt="Voucher"></div>
          <div class="promo-content">
            <h4>Giảm 400.000đ</h4><p>Áp dụng mọi đơn đặt tour từ 4 triệu đồng</p>
            <div class="promo-footer"><span class="promo-tag">HDBANK400</span><button class="btn btn-claim" data-code="HDBANK400" data-discount="400000">Lưu Mã</button></div>
          </div>
        </div>
      </div>
      <div class="promo-card">
        <span class="promo-badge" style="background:#dcfce7; color:#15803d;">Mã thành viên mới</span>
        <div class="promo-card-inner">
          <div class="promo-logo"><img src="https://picsum.photos/seed/summer/80/80" alt="Voucher"></div>
          <div class="promo-content">
            <h4>Giảm 250.000đ</h4><p>Ưu đãi đặt tour Biển đảo & Núi rừng toàn quốc</p>
            <div class="promo-footer"><span class="promo-tag">VIVU250</span><button class="btn btn-claim" data-code="VIVU250" data-discount="250000">Lưu Mã</button></div>
          </div>
        </div>
      </div>
      <div class="promo-card">
        <span class="promo-badge" style="background:#e0f2fe; color:#0369a1;">Đoàn gia đình</span>
        <div class="promo-card-inner">
          <div class="promo-logo"><img src="https://picsum.photos/seed/family/80/80" alt="Voucher"></div>
          <div class="promo-content">
            <h4>Giảm 500.000đ</h4><p>Dành cho nhóm đặt từ 3 hành khách trở lên</p>
            <div class="promo-footer"><span class="promo-tag">GIADINH500</span><button class="btn btn-claim" data-code="GIADINH500" data-discount="500000">Lưu Mã</button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt" style="padding: 60px 0;">
  <div class="container">
    <div class="section-head"><p class="section-label">TRẢI NGHIỆM ĐƯỢC YÊU THÍCH NHẤT</p><h2 class="section-title">Danh Sách Tour Nổi Bật</h2></div>
    <div id="featuredTours" class="grid tours"></div>
  </div>
</section>

<!-- SECTION NHẬT KÝ CHUYẾN ĐI -->
<section class="section" style="padding: 60px 0;">
  <div class="container">
    <div class="section-head" style="display: flex; justify-content: space-between; align-items: flex-end; max-width: 100%;">
      <div style="text-align: left;">
        <p class="section-label" style="color: #0ea5e9;">CỘNG ĐỒNG DU LỊCH</p>
        <h2 class="section-title">Review Thực Tế Từ Khách Hàng</h2>
      </div>
      <button class="btn btn-primary" id="btnWriteStory">✍️ Chia sẻ trải nghiệm</button>
    </div>
    <div id="storyList" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;"></div>
  </div>
</section>

<!-- Modal Chi Tiết Tour (Có tích hợp Video & Ảnh 360° - Phần 4) -->
<div class="tour-detail-modal" id="tourDetailModal" aria-hidden="true">
  <div class="tour-detail-panel" style="max-height: 92vh; overflow-y: auto; max-width: 640px;">
    <button class="tour-detail-close" id="closeTourDetail" type="button">×</button>
    <div class="tour-detail-media" style="position:relative;">
      <img id="tourDetailImage" src="" style="width:100%; height:230px; object-fit:cover; border-radius:10px; margin-bottom:12px;" />
      <button type="button" id="btnToggle360" style="position:absolute; bottom:24px; right:12px; background:rgba(15,23,42,0.85); color:#fde047; border:1px solid #fde047; padding:7px 14px; border-radius:99px; font-weight:bold; font-size:12.5px; cursor:pointer;">🎥 Xem Video & Góc nhìn 360°</button>
    </div>

    <!-- KHUNG TRÌNH CHIẾU 360° / VIDEO THỰC TẾ (PHẦN 4) -->
    <div id="virtual360Box" style="display:none; background:#0f172a; color:white; padding:14px; border-radius:12px; margin-bottom:15px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <strong style="font-size:13px; color:#38bdf8;">🌐 Góc nhìn Toàn cảnh 360° Điểm đến (Kéo thanh trượt để xoay góc nhìn)</strong>
        <button type="button" onclick="document.querySelector('#virtual360Box').style.display='none'" style="background:none; border:none; color:#94a3b8; cursor:pointer;">Đóng ✕</button>
      </div>
      <div style="overflow:hidden; border-radius:8px; height:190px; position:relative;">
        <img id="panoImage" src="https://picsum.photos/seed/pano360view/1800/400" style="height:100%; width:220%; max-width:none; object-fit:cover; transition: transform 0.1s ease-out;" />
      </div>
      <input type="range" id="panoSlider" min="0" max="50" value="0" style="width:100%; margin-top:10px; cursor:ew-resize;" />
    </div>

    <div class="tour-detail-body">
      <span class="badge" id="tourDetailType" style="position:static; display:inline-block; margin-bottom:8px;">Tour</span>
      <h3 id="tourDetailName" style="font-size:21px; margin-bottom:5px;">Tên tour</h3>
      <p id="tourDetailMeta" style="color:#64748b; margin-bottom:15px; font-size:14px;">Mã tour • Loại</p>
      <div style="display:grid; grid-template-columns:1fr 1fr; background:#f8fafc; padding:12px; border-radius:8px; gap:10px;">
        <div><span style="font-size:13px; color:#64748b;">Khởi hành:</span> <strong id="tourDetailDate">--</strong></div>
        <div><span style="font-size:13px; color:#64748b;">Tình trạng:</span> <strong id="tourDetailStatus" style="color:#0d7a5f;">--</strong></div>
      </div>
      <div style="margin-top: 15px; border-top: 1px dashed #cbd5e1; padding-top: 15px;">
        <h4 style="font-size: 14px; color: #0f766e; margin-bottom: 8px;">🌤️ Dự báo thời tiết điểm đến (7 ngày tới)</h4>
        <div id="tourWeatherWidget" style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 5px;"></div>
        <h4 style="font-size: 14px; color: #0f766e; margin-top: 12px; margin-bottom: 8px;">🎒 Gợi ý chuẩn bị hành lý</h4>
        <div id="tourPackingGuide" style="display: flex; flex-wrap: wrap; gap: 6px;"></div>
      </div>
      <div style="margin-top: 20px; display:flex; justify-content:space-between; align-items:center; border-top:1px solid #e2e8f0; padding-top:15px;">
        <div><span class="price-old" id="tourDetailOldPrice">0đ</span><span class="price" id="tourDetailPrice" style="color:#ea580c;">0đ</span></div>
        <div style="display:flex; gap:10px;">
          <a id="btnFullDetailPage" href="tourdetail.html" class="btn btn-sm" style="text-decoration: none; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-weight: 700; color: #0284c7; background: #f0f9ff;">Xem lịch trình chi tiết →</a>
          <button class="btn btn-primary btn-sm" id="btnBookTour" type="button">Chọn ghế & Đặt ngay</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Form Đặt Tour Chuẩn Traveloka + Sơ đồ chọn ghế Limousine 16 chỗ (Phần 4) -->
<div class="tour-detail-modal" id="bookingModal" aria-hidden="true">
  <div class="tour-detail-panel" style="max-width: 600px; text-align: left; max-height: 92vh; overflow-y: auto;">
    <button class="tour-detail-close" id="closeBookingModal" type="button">×</button>
    <h3 style="margin-bottom: 4px; font-size: 20px; color:#0f172a;">Hoàn tất đặt chỗ & Chọn ghế ngồi</h3>
    <p style="margin-bottom: 14px; font-size: 14px; color: #64748b;">Tour: <strong id="bookingTourName" style="color: #0d7a5f;"></strong></p>
    
    <form id="bookingForm" novalidate>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 600; font-size:13px;">Họ và Tên người đặt (*)</label>
          <input type="text" id="guestName" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;" required placeholder="Nguyễn Văn A" />
          <span id="errName" style="color: #ef4444; font-size: 12px; display: none;">Nhập tên ít nhất 2 ký tự.</span>
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 600; font-size:13px;">Số điện thoại (*)</label>
          <input type="tel" id="guestPhone" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;" required placeholder="0912345678" />
          <span id="errPhone" style="color: #ef4444; font-size: 12px; display: none;">SĐT gồm 10 chữ số.</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 600; font-size:13px;">Email nhận vé điện tử (*)</label>
          <input type="email" id="guestEmail" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;" required placeholder="email@gmail.com" />
          <span id="errEmail" style="color: #ef4444; font-size: 12px; display: none;">Email không hợp lệ.</span>
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 600; font-size:13px;">Ngày khởi hành (*)</label>
          <input type="date" id="departureDate" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;" required />
          <span id="errDate" style="color: #ef4444; font-size: 12px; display: none;">Chọn ngày từ hôm nay.</span>
        </div>
      </div>

      <div style="background:#f8fafc; padding:12px; border-radius:10px; border:1px solid #e2e8f0; margin-bottom:12px;">
        <div style="font-weight:700; font-size:13px; margin-bottom:8px; color:#0f172a;">👥 Số lượng hành khách</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div>
            <label style="font-size:12px; color:#475569;">Người lớn (100% giá vé)</label>
            <input type="number" id="guestCount" min="1" max="99" value="1" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; margin-top:4px;" required />
          </div>
          <div>
            <label style="font-size:12px; color:#475569;">Trẻ em 5-10 tuổi (75% giá vé)</label>
            <input type="number" id="childCount" min="0" max="99" value="0" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; margin-top:4px;" />
          </div>
        </div>
        <span id="errCount" style="color: #ef4444; font-size: 12px; display: none; margin-top:6px;">Vượt quá số chỗ còn nhận!</span>
      </div>

            <!-- LỰA CHỌN PHƯƠNG TIỆN DI CHUYỂN & HƯỚNG DẪN VIÊN DU LỊCH -->
      <div style="background: #f0fdf4; padding: 14px; border-radius: 12px; border: 1.5px solid #a7f3d0; margin-bottom: 14px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <!-- Cột 1: Lựa chọn Phương tiện di chuyển -->
          <div>
            <label style="display: block; font-weight: 700; font-size: 13px; color: #065f46; margin-bottom: 6px;">
              🚍 Phương tiện di chuyển (*)
            </label>
            <select id="travelVehicle" style="width: 100%; padding: 10px; border: 1px solid #86efac; border-radius: 8px; font-size: 13.5px; background: white; font-weight: 600; color: #0f172a;" required>
              <option value="Ô tô du lịch Limousine VIP">🚌 Xe Limousine VIP / Ô tô đời mới (Tiêu chuẩn)</option>
              <option value="Máy bay khứ hồi cao cấp">✈️ Vé máy bay khứ hồi (+1.200.000đ/khách)</option>
            </select>
            <small style="color: #64748b; font-size: 11.5px; display: block; margin-top: 4px;">Đưa đón tận nơi toàn đoàn</small>
          </div>

          <!-- Cột 2: Chọn Hướng dẫn viên du lịch -->
          <div>
            <label style="display: block; font-weight: 700; font-size: 13px; color: #065f46; margin-bottom: 6px;">
              👨‍🏫 Chọn Hướng dẫn viên (HDV) (*)
            </label>
            <select id="tourGuideSelect" style="width: 100%; padding: 10px; border: 1px solid #86efac; border-radius: 8px; font-size: 13.5px; background: white; font-weight: 600; color: #0f172a;" required>
              <option value="Nguyễn Văn Hùng (Chuyên tuyến 10 năm kinh nghiệm)">⭐ Nguyễn Văn Hùng (Chuyên tuyến 10 năm)</option>
              <option value="Trần Thị Mai (Nhiệt tình, am hiểu văn hóa)">⭐ Trần Thị Mai (Nhiệt tình, chu đáo)</option>
              <option value="Lê Hoàng Nam (Vui vẻ, chụp ảnh đẹp)">⭐ Lê Hoàng Nam (Vui vẻ, chụp ảnh đẹp)</option>
              <option value="Đoàn tự động sắp xếp (HDV 5 sao)">🎯 Công ty tự động sắp xếp HDV 5 sao</option>
            </select>
            <small style="color: #64748b; font-size: 11.5px; display: block; margin-top: 4px;">HDV có thẻ quốc tế suốt tuyến</small>
          </div>
        </div>
      </div>

      <!-- DỊCH VỤ CỘNG THÊM -->
      <div style="background:#f8fafc; padding:12px; border-radius:10px; border:1px solid #e2e8f0; margin-bottom:12px; font-size:13px;">
        <div style="font-weight:700; margin-bottom:6px; color:#0f172a;">✨ Dịch vụ nâng cấp (Tùy chọn)</div>
        <label style="display:flex; align-items:center; gap:8px; margin-bottom:6px; cursor:pointer;">
          <input type="checkbox" class="addon-check" value="500000" data-name="Phòng đơn riêng tư" /> Phòng đơn khách sạn riêng tư (+500.000đ)
        </label>
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
          <input type="checkbox" class="addon-check" value="150000" data-name="Bảo hiểm du lịch VIP" /> Bảo hiểm du lịch toàn diện Traveloka Care (+150.000đ)
        </label>
      </div>
      
      <div style="margin-bottom: 12px;">
        <label style="display: block; margin-bottom: 4px; font-weight: 600; font-size:13px;">Ghi chú đặc biệt (Ăn chay / Dị ứng / Đón sân bay)</label>
        <input type="text" id="guestHealthNote" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;" placeholder="Ví dụ: Dị ứng hải sản, có người cao tuổi..." />
      </div>

      <div style="margin-bottom: 12px; background:#f0f9ff; padding:12px; border-radius:10px; border:1px solid #bae6fd;">
        <label style="display: block; margin-bottom: 4px; font-weight: 600; font-size:13px;">🎟️ Chọn Voucher trong ví của bạn</label>
        <select id="promoCode" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 8px;"><option value="0">-- Không dùng Voucher --</option></select>
        <div style="display: flex; gap: 8px;">
           <input type="text" id="manualPromo" placeholder="Hoặc nhập mã giới thiệu (VD: REF-HUY)" style="flex: 1; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; font-size:13px;" />
           <button type="button" id="btnApplyManualPromo" class="btn btn-sm" style="background: #0284c7; color:white; border-radius: 6px;">Áp dụng</button>
        </div>
        <div id="manualPromoMsg" style="font-size: 12px; display: none; margin-top: 5px;"></div>
      </div>

      <div style="margin-bottom: 15px; padding: 12px 15px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 10px;">
        <div id="priceBreakdown" style="font-size:13px; color:#475569; margin-bottom:6px; line-height:1.6;"></div>
        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px dashed #fdba74; padding-top:8px;">
          <span style="font-weight:700; color:#1e293b;">Tổng thanh toán:</span>
          <div id="totalPriceDisplay"><strong style="font-size: 22px; color: #ea580c;">0 đ</strong></div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%; border-radius:8px; padding:14px;">Xác nhận & Xuất vé điện tử</button>
    </form>
  </div>
</div>

<!-- MODAL PHÒNG BÌNH CHỌN TOUR THEO NHÓM & GIA ĐÌNH -->
<div class="tour-detail-modal" id="groupPollModal" aria-hidden="true">
  <div class="tour-detail-panel" style="max-width: 720px; text-align: left; max-height: 90vh; overflow-y: auto; padding: 24px;">
    <button class="tour-detail-close" id="closeGroupPollModal" type="button">×</button>
    
    <div style="display:flex; align-items:center; gap:10px; margin-bottom: 4px;">
      <span style="font-size:26px;">🗳️</span>
      <div>
        <h3 style="margin: 0; font-size: 21px; color: #0d7a5f; font-weight:800;">Phòng Bình Chọn Tour Cho Nhóm Bạn & Gia Đình</h3>
        <p style="font-size: 13px; color: #64748b; margin: 2px 0 0;">Cùng người thân và bạn bè Vote chọn hành trình yêu thích nhất trước khi chốt đơn!</p>
      </div>
    </div>

    <!-- KHỐI 1: THÔNG TIN PHÒNG NHÓM HIỆN TẠI -->
    <div id="pollRoomHeaderCard" style="background: linear-gradient(135deg, #f0fdf4 0%, #e6f6f2 100%); border: 1.5px solid #a7f3d0; border-radius: 14px; padding: 14px 18px; margin: 16px 0 12px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: #0d7a5f; color: white; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 99px;">ĐANG THAM GIA</span>
            <strong id="currentRoomNameDisplay" style="font-size: 17px; color: #0f172a;">Gia Đình Hạnh Phúc 👨‍👩‍👧‍👦</strong>
          </div>
          <div style="font-size: 13px; color: #475569; margin-top: 5px; display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <span>Mã phòng: <strong id="currentRoomCodeDisplay" style="font-family: monospace; font-size: 14px; background: white; padding: 2px 8px; border-radius: 6px; border: 1px solid #cbd5e1; color: #0d7a5f;">GD-2026</strong></span>
            <span>• Trưởng nhóm: <strong id="currentRoomLeaderDisplay">Đức Huy</strong></span>
          </div>
        </div>

        <!-- Các nút thao tác phòng: Chia sẻ mã, đổi nhóm, tạo nhóm -->
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button type="button" id="btnCopyRoomCode" class="btn btn-sm" style="background: white; border: 1px solid #0d7a5f; color: #0d7a5f; font-weight: 700; font-size: 12px; padding: 6px 10px; border-radius: 8px; cursor: pointer;" title="Sao chép mã phòng để gửi cho người thân">
            📋 Sao chép mã
          </button>
          <button type="button" id="btnShareRoomLink" class="btn btn-sm" style="background: #0d7a5f; color: white; font-weight: 700; font-size: 12px; padding: 6px 12px; border-radius: 8px; cursor: pointer;" title="Chia sẻ link phòng này để người khác bấm vào là tham gia ngay">
            🔗 Mời người thân
          </button>
          <button type="button" id="btnToggleRoomManager" class="btn btn-sm" style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-weight: 700; font-size: 12px; padding: 6px 10px; border-radius: 8px; cursor: pointer;">
            🔄 Đổi / Tạo nhóm
          </button>
        </div>
      </div>

      <!-- Danh sách thành viên trong nhóm -->
      <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed #bbf7d0; font-size: 12.5px; color: #475569;">
        <span>👥 <strong>Thành viên trong nhóm:</strong> </span>
        <span id="currentRoomMembersList" style="color: #0d7a5f; font-weight: 600;">Đức Huy, Minh Anh, Tuấn Kiệt, Hoàng Nam...</span>
      </div>
    </div>

    <!-- KHỐI 2: KHU VỰC ĐỔI / TẠO PHÒNG MỚI (Ẩn/Hiện khi bấm 'Đổi / Tạo nhóm') -->
    <div id="roomManagerBox" style="display:none; background:#ffffff; border:1px solid #cbd5e1; border-radius:12px; padding:16px; margin-bottom:14px; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid #f1f5f9; padding-bottom:8px;">
        <strong style="color:#0f172a; font-size:14px;">🔑 Vào Nhóm Chung Bằng Mã Hoặc Tạo Phòng Mới</strong>
        <button type="button" id="btnCloseRoomManager" style="background:none; border:none; color:#64748b; font-size:16px; cursor:pointer; font-weight:bold;">✕</button>
      </div>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:14px;">
        <!-- Cột 1: Nhập mã phòng để vào -->
        <div style="background:#f8fafc; padding:12px; border-radius:10px; border:1px solid #e2e8f0;">
          <label style="font-weight:700; font-size:12.5px; color:#1e293b; display:block; margin-bottom:6px;">🚀 Nhập Mã Phòng Để Vào Cùng Gia Đình / Bạn Bè:</label>
          <div style="display:flex; gap:6px;">
            <input type="text" id="inputJoinRoomCode" placeholder="Ví dụ: GD-2026" style="flex:1; padding:8px 10px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-weight:700; text-transform:uppercase; font-size:13px;" />
            <button type="button" id="btnJoinRoomByCode" class="btn btn-primary btn-sm" style="white-space:nowrap; padding:8px 12px; font-size:13px;">Vào phòng</button>
          </div>
          <div style="margin-top:8px; font-size:12px; color:#64748b;">
            Phòng mẫu có sẵn: 
            <a href="#" class="quick-room-link" data-code="GD-2026" style="color:#0d7a5f; font-weight:700; text-decoration:underline; margin-right:8px;">GD-2026 (Gia Đình)</a>
            <a href="#" class="quick-room-link" data-code="BANTHAN-88" style="color:#0d7a5f; font-weight:700; text-decoration:underline;">BANTHAN-88 (Bạn Thân)</a>
          </div>
        </div>

        <!-- Cột 2: Tạo nhóm gia đình mới -->
        <div style="background:#f8fafc; padding:12px; border-radius:10px; border:1px solid #e2e8f0;">
          <label style="font-weight:700; font-size:12.5px; color:#1e293b; display:block; margin-bottom:6px;">➕ Tạo Phòng Nhóm / Gia Đình Mới:</label>
          <input type="text" id="inputNewRoomName" placeholder="Tên nhóm: VD Gia Đình Bác Ba Đi Đà Lạt..." style="width:100%; box-sizing:border-box; padding:8px 10px; border:1px solid #cbd5e1; border-radius:6px; margin-bottom:6px; font-size:12.5px;" />
          <div style="display:flex; gap:6px;">
            <input type="text" id="inputNewRoomCode" placeholder="Mã phòng (VD: GD-8899)" style="flex:1; padding:8px 10px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px; text-transform:uppercase;" />
            <button type="button" id="btnCreateNewRoom" class="btn btn-sm" style="background:#0d7a5f; color:white; font-weight:700; white-space:nowrap; padding:8px 12px; border:none; border-radius:6px; cursor:pointer;">Tạo phòng</button>
          </div>
        </div>
      </div>
    </div>

    <!-- KHỐI 3: ĐỊNH DANH NGƯỜI ĐANG BÌNH CHỌN (BẠN LÀ AI?) -->
    <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:8px 14px; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:16px;">👤</span>
        <span style="font-size:13px; color:#334155;">Bạn đang bình chọn với tên: <strong id="currentVoterDisplay" style="color:#0d7a5f; font-size:13.5px;">Đức Huy</strong></span>
      </div>
      <div>
        <button type="button" id="btnChangeVoterName" style="background:white; border:1px solid #cbd5e1; border-radius:6px; font-size:12px; padding:4px 10px; color:#0284c7; cursor:pointer; font-weight:700;">
          ✏️ Đổi tên của bạn
        </button>
      </div>
    </div>

    <!-- KHỐI 4: THÊM TOUR VÀO DANH SÁCH BÌNH CHỌN CỦA NHÓM NÀY -->
    <div style="background:#f8fafc; padding:12px 14px; border-radius:12px; border:1px solid #e2e8f0; margin-bottom:16px;">
      <label style="font-weight:700; font-size:13px; display:block; margin-bottom:6px; color:#1e293b;">
        ➕ Đề xuất thêm Tour vào danh sách bình chọn của nhóm:
      </label>
      <div style="display:flex; gap:10px;">
        <select id="pollTourSelect" style="flex:1; padding:9px 12px; border:1px solid #cbd5e1; border-radius:8px; font-size:13.5px;"></select>
        <button type="button" id="btnAddPollTour" class="btn btn-primary btn-sm" style="white-space:nowrap; padding:9px 16px;">Thêm vào bảng Vote</button>
      </div>
    </div>

    <!-- KHỐI 5: DANH SÁCH CÁC TOUR ĐANG ĐƯỢC BÌNH CHỌN TRONG NHÓM -->
    <div id="pollItemsContainer" style="display:flex; flex-direction:column; gap:12px;"></div>
  </div>
</div>

<!-- MODAL TRUNG TÂM THÔNG BÁO THỜI GIAN THỰC (PHẦN 5) -->
<div class="tour-detail-modal" id="notifModal" aria-hidden="true">
  <div class="tour-detail-panel" style="max-width: 520px; text-align: left; max-height: 85vh; overflow-y: auto;">
    <button class="tour-detail-close" id="closeNotifModal" type="button">×</button>
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e2e8f0; padding-bottom:12px; margin-bottom:15px;">
      <h3 style="margin:0; font-size:20px; color:#0f172a;">🔔 Thông Báo Của Bạn</h3>
      <button type="button" id="btnClearNotifs" style="background:none; border:none; color:#0284c7; font-size:13px; font-weight:600; cursor:pointer;">Đánh dấu đã đọc hết</button>
    </div>
    <div id="notifListContainer" style="display:flex; flex-direction:column; gap:10px;"></div>
  </div>
</div>

<!-- Modal Đăng nhập/Đăng ký -->
<div class="tour-detail-modal" id="authModal" aria-hidden="true">
  <div class="tour-detail-panel" style="max-width: 400px; text-align: left;">
    <button class="tour-detail-close" id="closeAuthModal" type="button">×</button>
    <h3 id="authTitle" style="margin-bottom: 20px; font-size: 24px; text-align: center; color: #0f766e;">Đăng nhập</h3>
    <form id="authForm">
      <div id="registerNameGroup" style="display: none; margin-bottom: 15px;">
        <label style="font-weight:600; display:block; margin-bottom:5px;">Họ và tên</label>
        <input type="text" id="authName" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;" placeholder="Nhập tên của bạn" />
      </div>
      <div style="margin-bottom: 15px;">
        <label style="font-weight:600; display:block; margin-bottom:5px;">Email</label>
        <input type="email" id="authEmail" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;" required placeholder="email@gmail.com" />
      </div>
      <div style="margin-bottom: 20px;">
        <label style="font-weight:600; display:block; margin-bottom:5px;">Mật khẩu</label>
        <input type="password" id="authPassword" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;" required placeholder="******" />
      </div>
      <button type="submit" class="btn btn-primary" id="btnAuthSubmit" style="width: 100%; padding: 12px; font-size: 16px;">Đăng nhập</button>
      <p style="text-align: center; margin-top: 15px; font-size: 14px; color: #64748b;">
        <span id="authSwitchText">Chưa có tài khoản?</span> 
        <a href="#" id="authSwitchLink" style="color: #f97316; font-weight: 700;">Đăng ký ngay</a>
      </p>
    </form>
  </div>
</div>

<!-- Modal Danh sách Yêu Thích -->
<div class="tour-detail-modal" id="favoritesModal" aria-hidden="true">
  <div class="tour-detail-panel" style="max-width: 650px; text-align: left; max-height: 85vh; display: flex; flex-direction: column;">
    <button class="tour-detail-close" id="closeFavoritesModal" type="button">×</button>
    <h3 style="margin-bottom: 20px; font-size: 22px; color: #0f766e; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">❤️ Danh sách Tour Đã Lưu</h3>
    <div id="favoritesList" style="overflow-y: auto; flex: 1; padding-right: 5px;"></div>
  </div>
</div>

<!-- Modal Hành Trình Số -->
<div class="tour-detail-modal" id="itineraryModal" aria-hidden="true">
  <div class="tour-detail-panel" style="max-width: 820px; text-align: left; max-height: 90vh; overflow-y: auto; background: #f8fafc;">
    <button class="tour-detail-close" id="closeItineraryModal" type="button">×</button>
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 20px;">
      <h3 style="font-size: 22px; color: #0f766e; margin: 0;">📍 Hành Trình Số & Lộ Trình 3 Chặng</h3>
      <button id="btnSOS" style="background: #ef4444; color: white; border: none; padding: 8px 16px; border-radius: 20px; font-weight: bold; cursor: pointer;">🆘 Trợ giúp SOS</button>
    </div>
    <div id="itineraryList" style="display: flex; flex-direction: column; gap: 20px;"></div>
  </div>
</div>

<!-- MODAL CỔNG THÔNG TIN HDV -->
<div class="tour-detail-modal" id="guidePortalModal" aria-hidden="true">
  <div class="tour-detail-panel" style="max-width: 900px; text-align: left; max-height: 90vh; overflow-y: auto;">
    <button class="tour-detail-close" id="closeGuidePortalModal" type="button">×</button>
    <h3 style="margin-bottom: 10px; font-size: 22px; color: #1e40af;">👨‍✈️ Cổng Thông Tin Hướng Dẫn Viên</h3>
    <div style="margin-bottom: 20px;">
      <select id="guideTourSelect" style="padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; width: 320px;"><option value="all">-- Tất cả các đoàn --</option></select>
    </div>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <thead><tr style="background: #e0f2fe; text-align: left;"><th style="padding: 12px; border: 1px solid #bae6fd;">Khách hàng</th><th style="padding: 12px; border: 1px solid #bae6fd;">SĐT / Ghế xe</th><th style="padding: 12px; border: 1px solid #bae6fd; text-align:center;">Số khách</th><th style="padding: 12px; border: 1px solid #bae6fd;">Ghi chú / Dịch vụ</th><th style="padding: 12px; border: 1px solid #bae6fd; text-align: center;">Điểm danh</th></tr></thead>
      <tbody id="guideGuestList"></tbody>
    </table>
  </div>
</div>

<!-- MODAL VIẾT NHẬT KÝ -->
<div class="tour-detail-modal" id="writeStoryModal" aria-hidden="true">
  <div class="tour-detail-panel" style="max-width: 500px; text-align: left;">
    <button class="tour-detail-close" id="closeWriteStoryModal" type="button">×</button>
    <h3 style="margin-bottom: 20px; font-size: 20px; color: #0ea5e9;">✍️ Chia Sẻ Trải Nghiệm Chuyến Đi</h3>
    <form id="storyForm">
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Chọn Tour đã trải nghiệm</label>
        <select id="storyTourSelect" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;" required></select>
      </div>
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Đánh giá của bạn</label>
        <textarea id="storyContent" rows="4" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;" required placeholder="Chia sẻ kỷ niệm đáng nhớ của bạn..."></textarea>
      </div>
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Link hình ảnh (Tùy chọn)</label>
        <input type="url" id="storyImage" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;" placeholder="https://..." />
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">Đăng bài chia sẻ</button>
    </form>
  </div>
</div>

<!-- MODAL TIẾP THỊ LIÊN KẾT (AFFILIATE) -->
<div class="tour-detail-modal" id="affiliateModal" aria-hidden="true">
  <div class="tour-detail-panel" style="max-width: 500px; text-align: center; background: #fffbeb;">
    <button class="tour-detail-close" id="closeAffiliateModal" type="button">×</button>
    <h3 style="margin-bottom: 10px; font-size: 24px; color: #d97706;">🎁 Giới thiệu bạn bè</h3>
    <p style="color: #b45309; margin-bottom: 20px;">Tặng bạn bè 100.000đ khi đặt tour. Bạn nhận ngay hoa hồng 50.000đ/lượt thành công!</p>
    <div style="background: white; border: 2px dashed #f59e0b; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
      <div style="font-size: 14px; color: #64748b; margin-bottom: 10px;">Mã Giới Thiệu Của Bạn:</div>
      <div id="myRefCodeDisplay" style="font-size: 28px; font-weight: bold; color: #ea580c; letter-spacing: 2px;">--</div>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
      <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
        <div style="font-size: 12px; color: #64748b;">Số lượt giới thiệu</div>
        <div id="refCountDisplay" style="font-size: 20px; font-weight: bold; color: #0ea5e9;">0</div>
      </div>
      <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
        <div style="font-size: 12px; color: #64748b;">Hoa hồng tích lũy</div>
        <div id="refComDisplay" style="font-size: 20px; font-weight: bold; color: #10b981;">0 đ</div>
      </div>
    </div>
  </div>
</div>

<footer class="footer-new">
  <div class="container footer-grid-multi">
    <div class="footer-col">
      <a href="/" class="logo logo-light" style="margin-bottom: 20px; display: inline-flex;"><span class="logo-icon">✈</span><span>Tour<strong>DuLich</strong></span></a>
      <p style="color:#94a3b8; font-size:14px; margin-bottom:15px;">Nền tảng đặt tour du lịch trực tuyến uy tín hàng đầu Việt Nam.</p>
      <h4 class="footer-heading">Đối tác thanh toán</h4>
      <div class="payment-grid">
        <div class="pay-box" style="color: #eb001b;">Mastercard</div><div class="pay-box" style="color: #1a1f71;">VISA</div>
        <div class="pay-box" style="color: #0f863b;">VietQR</div><div class="pay-box" style="color: #2671b8;">MOMO</div>
      </div>
    </div>
    <div class="footer-col">
      <h4 class="footer-heading">Về TourDuLich</h4>
      <ul class="footer-links">
        <li><a href="tranggioithieu.html">Giới thiệu công ty</a></li>
        <li><a href="tranglienhe.html">Liên hệ chúng tôi</a></li>
        <li><a href="trangtour.html">Danh sách Tour</a></li>
        <li><a href="trangdonhang.html">Tra cứu đơn hàng & Chia tiền nhóm</a></li>
        <li><a href="#" id="btnOpenGuidePortal" style="color: #fde047; font-weight: bold;">👨‍✈️ Cổng Hướng Dẫn Viên</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4 class="footer-heading">Liên hệ hỗ trợ 24/7</h4>
      <ul class="footer-links" style="color:#cbd5e1; font-size:14px;">
        <li>📍 Tòa nhà FPT Polytechnic, Hà Nội</li>
        <li>📞 Hotline: 1900 1234 (8:00 - 22:00)</li>
        <li>✉️ Email: hotro@tourdulich.vn</li>
      </ul>
    </div>
  </div>
</footer>
`

// ==========================================
// 5. CHUÔNG THÔNG BÁO (PHẦN 5), BÌNH CHỌN NHÓM (PHẦN 1) & 360° VIEW (PHẦN 4)
// ==========================================

// --- Logic Góc nhìn 360° (Phần 4) ---
document.querySelector('#btnToggle360')?.addEventListener('click', () => {
  const box = document.querySelector('#virtual360Box');
  const panoImg = document.querySelector('#panoImage');
  if (selectedTourObj) {
    panoImg.src = `https://picsum.photos/seed/pano-${selectedTourObj.id}/1800/450`;
  }
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
});
document.querySelector('#panoSlider')?.addEventListener('input', (e) => {
  document.querySelector('#panoImage').style.transform = `translateX(-${e.target.value}%)`;
});

// --- Logic Chuông Thông Báo Thời Gian Thực (Phần 5) ---
const getNotifications = () => JSON.parse(localStorage.getItem('tourdulich_notifications') || '[]');
const updateNotifBadge = () => {
  const notifs = getNotifications();
  const unread = notifs.filter(n => !n.read).length;
  const badge = document.querySelector('#notifBadge');
  if (!badge) return;
  if (unread > 0) {
    badge.style.display = 'inline-block';
    badge.textContent = unread;
  } else {
    badge.style.display = 'none';
  }
};
updateNotifBadge();

const renderNotifications = () => {
  const listEl = document.querySelector('#notifListContainer');
  const notifs = getNotifications();
  if (notifs.length === 0) {
    listEl.innerHTML = `<p style="text-align:center; color:#64748b; padding:30px;">Chưa có thông báo mới nào từ hệ thống.</p>`;
    return;
  }
  listEl.innerHTML = notifs.map(n => `
    <div style="padding:12px 14px; border-radius:10px; border:1px solid ${n.read ? '#e2e8f0' : '#bae6fd'}; background:${n.read ? '#f8fafc' : '#f0f9ff'};">
      <div style="display:flex; justify-content:space-between; font-size:12px; color:#64748b; margin-bottom:4px;">
        <strong>${n.title || 'Hệ thống điều hành Tour'}</strong>
        <span>${n.time || 'Vừa xong'}</span>
      </div>
      <div style="font-size:13.5px; color:#1e293b;">${n.message}</div>
    </div>
  `).join('');
};

document.querySelector('#btnNotifBell')?.addEventListener('click', () => {
  renderNotifications();
  document.querySelector('#notifModal').classList.add('show');
});
document.querySelector('#closeNotifModal')?.addEventListener('click', () => document.querySelector('#notifModal').classList.remove('show'));
document.querySelector('#btnClearNotifs')?.addEventListener('click', () => {
  const updated = getNotifications().map(n => ({ ...n, read: true }));
  localStorage.setItem('tourdulich_notifications', JSON.stringify(updated));
  updateNotifBadge();
  renderNotifications();
});

// --- Logic Phòng Bình Chọn Tour Nhóm & Gia Đình (Phần 1) ---
const POLL_ROOMS_KEY = 'tourdulich_poll_rooms';
const CURRENT_ROOM_KEY = 'tourdulich_current_poll_room';
const VOTER_NAME_KEY = 'tourdulich_voter_name';

const getInitialRooms = () => ({
  'GD-2026': {
    code: 'GD-2026',
    name: 'Gia Đình Hạnh Phúc 👨‍👩‍👧‍👦',
    leader: 'Đức Huy (Trưởng đoàn)',
    createdAt: '2026-10-21',
    members: ['Đức Huy', 'Minh Anh', 'Tuấn Kiệt', 'Hoàng Nam', 'Yến Nhi', 'Bảo Ngọc'],
    tours: [
      {
        tourId: 1,
        name: 'Hạ Long 3N2Đ - Ngủ Đêm Du Thuyền 5 Sao',
        price: 4490000,
        voters: ['Đức Huy', 'Minh Anh', 'Tuấn Kiệt', 'Hoàng Nam']
      },
      {
        tourId: 4,
        name: 'Sapa - Đỉnh Fansipan - Bản Cát Cát',
        price: 5290000,
        voters: ['Yến Nhi', 'Bảo Ngọc']
      }
    ]
  },
  'BANTHAN-88': {
    code: 'BANTHAN-88',
    name: 'Hội Bạn Thân Phượt Hè 🏖️',
    leader: 'Minh Anh',
    createdAt: '2026-10-20',
    members: ['Minh Anh', 'Hoàng Nam', 'Yến Nhi', 'Đức Huy'],
    tours: [
      {
        tourId: 3,
        name: 'Phú Quốc 4N3Đ - Cáp Treo Hòn Thơm & Cano 4 Đảo',
        price: 6790000,
        voters: ['Minh Anh', 'Hoàng Nam']
      },
      {
        tourId: 2,
        name: 'Đà Nẵng - Hội An - Bà Nà Hills',
        price: 5890000,
        voters: ['Yến Nhi', 'Đức Huy']
      }
    ]
  }
});

function getAllPollRooms() {
  try {
    const raw = localStorage.getItem(POLL_ROOMS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
        return parsed;
      }
    }
  } catch(e) {}

  const rooms = getInitialRooms();
  try {
    const legacy = JSON.parse(localStorage.getItem('tourdulich_group_polls') || 'null');
    if (Array.isArray(legacy) && legacy.length > 0) {
      rooms['GD-2026'].tours = legacy.map(p => ({
        tourId: p.tourId,
        name: p.name,
        price: p.price,
        voters: Array.isArray(p.voters) ? p.voters : ['Trưởng nhóm']
      }));
      const allMembers = new Set(rooms['GD-2026'].members);
      legacy.forEach(p => (p.voters || []).forEach(v => allMembers.add(v)));
      rooms['GD-2026'].members = Array.from(allMembers);
    }
  } catch(e) {}

  saveAllPollRooms(rooms);
  return rooms;
}

function saveAllPollRooms(rooms) {
  localStorage.setItem(POLL_ROOMS_KEY, JSON.stringify(rooms));
}

function getCurrentRoomCode() {
  let code = localStorage.getItem(CURRENT_ROOM_KEY);
  const rooms = getAllPollRooms();
  if (!code || !rooms[code]) {
    code = Object.keys(rooms)[0] || 'GD-2026';
    localStorage.setItem(CURRENT_ROOM_KEY, code);
  }
  return code;
}

function setCurrentRoomCode(code) {
  localStorage.setItem(CURRENT_ROOM_KEY, code);
}

function getActiveVoterName() {
  const custom = localStorage.getItem(VOTER_NAME_KEY);
  if (custom && custom.trim()) return custom.trim();
  const activeUser = JSON.parse(localStorage.getItem('tourdulich_active_user') || 'null');
  if (activeUser && activeUser.name) return activeUser.name;
  return 'Đức Huy';
}

function setActiveVoterName(name) {
  localStorage.setItem(VOTER_NAME_KEY, name.trim());
}

function renderGroupPolls() {
  const rooms = getAllPollRooms();
  const currentCode = getCurrentRoomCode();
  const room = rooms[currentCode] || rooms['GD-2026'];
  const currentVoter = getActiveVoterName();

  // Ensure current voter is recorded in room members
  if (room.members && !room.members.includes(currentVoter)) {
    room.members.push(currentVoter);
    saveAllPollRooms(rooms);
  }

  // Update Room Header Card
  const nameEl = document.querySelector('#currentRoomNameDisplay');
  const codeEl = document.querySelector('#currentRoomCodeDisplay');
  const leaderEl = document.querySelector('#currentRoomLeaderDisplay');
  const membersEl = document.querySelector('#currentRoomMembersList');
  const voterEl = document.querySelector('#currentVoterDisplay');

  if (nameEl) nameEl.textContent = room.name;
  if (codeEl) codeEl.textContent = room.code;
  if (leaderEl) leaderEl.textContent = room.leader || 'Trưởng nhóm';
  if (membersEl) membersEl.textContent = (room.members && room.members.length > 0) ? room.members.join(', ') : currentVoter;
  if (voterEl) voterEl.textContent = currentVoter;

  // Render Poll items
  const container = document.querySelector('#pollItemsContainer');
  if (!container) return;

  const tours = [...(room.tours || [])].sort((a, b) => (b.voters ? b.voters.length : 0) - (a.voters ? a.voters.length : 0));
  const totalVotes = tours.reduce((sum, p) => sum + (p.voters ? p.voters.length : 0), 0) || 1;

  if (tours.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:32px 16px; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:12px; color:#64748b;">
        <div style="font-size:2rem; margin-bottom:8px;">🏖️</div>
        <strong style="color:#0f172a;">Chưa có chuyến đi nào trong danh sách bình chọn của nhóm này!</strong>
        <p style="margin:6px 0 0; font-size:13px;">Hãy chọn một tour ở ô bên trên và bấm "Thêm vào bảng Vote" để cả gia đình cùng bình chọn.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = tours.map((p, idx) => {
    const votesCount = p.voters ? p.voters.length : 0;
    const pct = Math.round((votesCount / totalVotes) * 100);
    const hasVoted = p.voters && p.voters.includes(currentVoter);

    return `
      <div style="border:1.5px solid ${idx === 0 && votesCount > 0 ? '#0d7a5f' : '#e2e8f0'}; background:${idx === 0 && votesCount > 0 ? '#f0fdf4' : 'white'}; padding:14px; border-radius:12px; transition:all 0.2s;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px; gap:10px; flex-wrap:wrap;">
          <div style="flex:1; min-width:200px;">
            ${idx === 0 && votesCount > 0 ? '<span style="background:#0d7a5f; color:white; font-size:11px; padding:2px 8px; border-radius:99px; font-weight:bold; margin-right:6px;">🏆 Đang dẫn đầu</span>' : ''}
            <strong style="font-size:15px; color:#0f172a;">${p.name}</strong>
            <div style="font-size:13px; color:#ea580c; font-weight:bold; margin-top:2px;">${formatCurrency(p.price)} / khách</div>
          </div>
          <div style="display:flex; gap:6px; align-items:center;">
            ${hasVoted ? `
              <button type="button" class="btn-vote-tour voted" data-id="${p.tourId}" style="background:#0d7a5f; color:white; border:none; padding:7px 12px; border-radius:8px; font-weight:bold; cursor:pointer; display:inline-flex; align-items:center; gap:4px;" title="Bấm để rút lại phiếu bình chọn của bạn">
                ✓ Đã vote (${votesCount})
              </button>
            ` : `
              <button type="button" class="btn-vote-tour" data-id="${p.tourId}" style="background:#e0f2fe; color:#0284c7; border:none; padding:7px 12px; border-radius:8px; font-weight:bold; cursor:pointer;" title="Bấm để bình chọn cho tour này">
                👍 Vote (+1)
              </button>
            `}
            <button type="button" class="btn-book-poll" data-id="${p.tourId}" style="background:#f97316; color:white; border:none; padding:7px 12px; border-radius:8px; font-weight:bold; cursor:pointer;" title="Chốt đặt ngay tour này">
              Chốt đặt
            </button>
            <button type="button" class="btn-delete-poll-tour" data-id="${p.tourId}" style="background:#fee2e2; color:#ef4444; border:none; padding:7px 10px; border-radius:8px; cursor:pointer; font-weight:bold;" title="Xóa tour này khỏi danh sách bình chọn của nhóm">
              🗑️
            </button>
          </div>
        </div>

        <div style="background:#e2e8f0; height:8px; border-radius:99px; overflow:hidden; margin:8px 0;">
          <div style="background:${idx === 0 && votesCount > 0 ? '#0d7a5f' : '#0284c7'}; width:${pct}%; height:100%; border-radius:99px; transition:width 0.3s ease;"></div>
        </div>

        <div style="font-size:12px; color:#64748b; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
          <span>👥 Đã bình chọn (${votesCount} phiếu): <strong style="color:#334155;">${(p.voters && p.voters.length > 0) ? p.voters.join(', ') : 'Chưa có phiếu nào'}</strong></span>
          <strong style="color:${idx === 0 && votesCount > 0 ? '#0d7a5f' : '#64748b'}; font-size:13px;">${pct}%</strong>
        </div>
      </div>
    `;
  }).join('');
}

// Event Listeners for Group Poll
document.querySelector('#btnGroupPoll')?.addEventListener('click', (e) => {
  e.preventDefault();
  const availableTours = (toursList && toursList.length > 0) ? toursList : defaultTours;
  document.querySelector('#pollTourSelect').innerHTML = availableTours.map(t => `<option value="${t.id}">${t.name} (${formatCurrency(t.price)})</option>`).join('');
  renderGroupPolls();
  document.querySelector('#groupPollModal').classList.add('show');
});

document.querySelector('#closeGroupPollModal')?.addEventListener('click', () => {
  document.querySelector('#groupPollModal').classList.remove('show');
});

document.querySelector('#btnToggleRoomManager')?.addEventListener('click', () => {
  const box = document.querySelector('#roomManagerBox');
  if (box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
});

document.querySelector('#btnCloseRoomManager')?.addEventListener('click', () => {
  const box = document.querySelector('#roomManagerBox');
  if (box) box.style.display = 'none';
});

document.querySelector('#btnCopyRoomCode')?.addEventListener('click', () => {
  const code = getCurrentRoomCode();
  const text = code;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert(`📋 ĐÃ SAO CHÉP MÃ PHÒNG: ${code}\n\nHãy gửi mã này cho người thân hoặc bạn bè. Họ chỉ cần mở web, bấm "Bình chọn nhóm" -> "Đổi / Tạo nhóm" -> Nhập mã "${code}" là vào chung phòng bình chọn với bạn!`);
    }).catch(() => {
      prompt('Mã phòng bình chọn nhóm của bạn là:', code);
    });
  } else {
    prompt('Mã phòng bình chọn nhóm của bạn là:', code);
  }
});

document.querySelector('#btnShareRoomLink')?.addEventListener('click', () => {
  const code = getCurrentRoomCode();
  const room = getAllPollRooms()[code];
  const shareUrl = `${window.location.origin}${window.location.pathname}?poll_room=${code}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert(`🔗 ĐÃ SAO CHÉP ĐƯỜNG LINK MỜI!\n\nNhóm: ${room ? room.name : code}\nLink: ${shareUrl}\n\nBạn hãy gửi liên kết này qua Zalo hoặc Messenger để các thành viên bấm vào là vào ngay phòng bình chọn!`);
    }).catch(() => {
      prompt('Đường dẫn tham gia phòng bình chọn:', shareUrl);
    });
  } else {
    prompt('Đường dẫn tham gia phòng bình chọn:', shareUrl);
  }
});

document.querySelector('#btnChangeVoterName')?.addEventListener('click', () => {
  const current = getActiveVoterName();
  const newName = prompt('Nhập tên hoặc vai trò của bạn trong gia đình/nhóm (Ví dụ: Bố Tuấn, Mẹ Mai, Đức Huy, Bé Linh...):', current);
  if (newName && newName.trim()) {
    setActiveVoterName(newName.trim());
    const rooms = getAllPollRooms();
    const code = getCurrentRoomCode();
    if (rooms[code]) {
      if (!rooms[code].members.includes(newName.trim())) {
        rooms[code].members.push(newName.trim());
        saveAllPollRooms(rooms);
      }
    }
    renderGroupPolls();
  }
});

document.querySelector('#btnJoinRoomByCode')?.addEventListener('click', () => {
  const input = document.querySelector('#inputJoinRoomCode');
  const code = input ? input.value.trim().toUpperCase() : '';
  if (!code) {
    alert('Vui lòng nhập mã phòng (Ví dụ: GD-2026)!');
    return;
  }
  const rooms = getAllPollRooms();
  if (!rooms[code]) {
    alert(`Không tìm thấy phòng có mã "${code}".\nVui lòng kiểm tra lại mã hoặc tạo phòng mới!`);
    return;
  }
  setCurrentRoomCode(code);
  const currentVoter = getActiveVoterName();
  if (!rooms[code].members.includes(currentVoter)) {
    rooms[code].members.push(currentVoter);
    saveAllPollRooms(rooms);
  }
  const box = document.querySelector('#roomManagerBox');
  if (box) box.style.display = 'none';
  if (input) input.value = '';
  renderGroupPolls();
  alert(`🎉 CHÀO MỪNG BẠN!\nĐã tham gia phòng bình chọn: "${rooms[code].name}" (Mã: ${code}).\nHãy bấm Vote chọn chuyến đi bạn thích nhé!`);
});

// Setup quick room links delegation
document.addEventListener('click', (e) => {
  const quickLink = e.target.closest('.quick-room-link');
  if (quickLink) {
    e.preventDefault();
    const code = quickLink.dataset.code;
    const rooms = getAllPollRooms();
    if (rooms[code]) {
      setCurrentRoomCode(code);
      const currentVoter = getActiveVoterName();
      if (!rooms[code].members.includes(currentVoter)) {
        rooms[code].members.push(currentVoter);
        saveAllPollRooms(rooms);
      }
      const box = document.querySelector('#roomManagerBox');
      if (box) box.style.display = 'none';
      renderGroupPolls();
    }
  }
});

document.querySelector('#btnCreateNewRoom')?.addEventListener('click', () => {
  const nameInput = document.querySelector('#inputNewRoomName');
  const codeInput = document.querySelector('#inputNewRoomCode');
  const name = nameInput ? nameInput.value.trim() : '';
  let code = codeInput ? codeInput.value.trim().toUpperCase() : '';

  if (!name) {
    alert('Vui lòng nhập tên cho nhóm hoặc gia đình của bạn (VD: Gia Đình Bác Ba, Team Bạn Thân...)!');
    return;
  }

  if (!code) {
    code = 'GD-' + Math.floor(1000 + Math.random() * 9000);
  }

  const rooms = getAllPollRooms();
  if (rooms[code]) {
    alert(`Mã phòng "${code}" đã tồn tại. Vui lòng chọn mã khác hoặc để trống để hệ thống tự tạo!`);
    return;
  }

  const currentVoter = getActiveVoterName();
  const availableTours = (toursList && toursList.length > 0) ? toursList : defaultTours;
  const seedTours = availableTours.slice(0, 2).map(t => ({
    tourId: t.id,
    name: t.name,
    price: t.price,
    voters: [currentVoter]
  }));

  rooms[code] = {
    code: code,
    name: name,
    leader: currentVoter,
    createdAt: new Date().toISOString().split('T')[0],
    members: [currentVoter],
    tours: seedTours
  };

  saveAllPollRooms(rooms);
  setCurrentRoomCode(code);

  if (nameInput) nameInput.value = '';
  if (codeInput) codeInput.value = '';
  const box = document.querySelector('#roomManagerBox');
  if (box) box.style.display = 'none';

  renderGroupPolls();
  alert(`🎉 TẠO PHÒNG BÌNH CHỌN THÀNH CÔNG!\n\nTên nhóm: ${name}\nMã phòng của bạn: ${code}\n\nBạn có thể bấm "Sao chép mã" hoặc "Mời người thân" để gửi mã này cho mọi người cùng vào vote!`);
});

document.querySelector('#btnAddPollTour')?.addEventListener('click', () => {
  const tourId = document.querySelector('#pollTourSelect').value;
  const availableTours = (toursList && toursList.length > 0) ? toursList : defaultTours;
  const tour = availableTours.find(t => String(t.id) === String(tourId));
  if (!tour) return;

  const rooms = getAllPollRooms();
  const code = getCurrentRoomCode();
  const room = rooms[code];
  if (!room) return;

  if (room.tours && room.tours.some(p => String(p.tourId) === String(tourId))) {
    alert('Tour này đã có sẵn trong danh sách bình chọn của nhóm!');
    return;
  }

  const currentVoter = getActiveVoterName();
  if (!room.tours) room.tours = [];
  room.tours.push({
    tourId: tour.id,
    name: tour.name,
    price: tour.price,
    voters: [currentVoter]
  });

  saveAllPollRooms(rooms);
  renderGroupPolls();
});

document.querySelector('#pollItemsContainer')?.addEventListener('click', (e) => {
  const voteBtn = e.target.closest('.btn-vote-tour');
  const deleteBtn = e.target.closest('.btn-delete-poll-tour');
  const bookBtn = e.target.closest('.btn-book-poll');

  if (voteBtn) {
    const id = voteBtn.dataset.id;
    const rooms = getAllPollRooms();
    const code = getCurrentRoomCode();
    const room = rooms[code];
    if (!room) return;

    const currentVoter = getActiveVoterName();
    const tourPoll = room.tours.find(p => String(p.tourId) === String(id));
    if (tourPoll) {
      if (!Array.isArray(tourPoll.voters)) tourPoll.voters = [];
      const voterIdx = tourPoll.voters.indexOf(currentVoter);
      if (voterIdx >= 0) {
        tourPoll.voters.splice(voterIdx, 1);
      } else {
        tourPoll.voters.push(currentVoter);
      }
      if (!room.members.includes(currentVoter)) {
        room.members.push(currentVoter);
      }
      saveAllPollRooms(rooms);
      renderGroupPolls();
    }
  }

  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    const rooms = getAllPollRooms();
    const code = getCurrentRoomCode();
    const room = rooms[code];
    if (!room) return;

    const tourPoll = room.tours.find(p => String(p.tourId) === String(id));
    const tourName = tourPoll ? tourPoll.name : 'tour này';

    if (confirm(`Bạn có chắc muốn xóa tour "${tourName}" khỏi danh sách bình chọn của nhóm "${room.name}"?`)) {
      room.tours = room.tours.filter(p => String(p.tourId) !== String(id));
      saveAllPollRooms(rooms);
      renderGroupPolls();
    }
  }

  if (bookBtn) {
    const id = bookBtn.dataset.id;
    const availableTours = (toursList && toursList.length > 0) ? toursList : defaultTours;
    const tour = availableTours.find(t => String(t.id) === String(id));
    if (tour) {
      document.querySelector('#groupPollModal').classList.remove('show');
      openTourDetail(tour);
    }
  }
});

// Auto detect URL param ?poll_room= or ?poll_group=
const checkPollRoomFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const roomCode = params.get('poll_room') || params.get('poll_group');
  if (roomCode) {
    const cleanCode = roomCode.trim().toUpperCase();
    const rooms = getAllPollRooms();
    if (rooms[cleanCode]) {
      setCurrentRoomCode(cleanCode);
      const availableTours = (toursList && toursList.length > 0) ? toursList : defaultTours;
      const select = document.querySelector('#pollTourSelect');
      if (select) select.innerHTML = availableTours.map(t => `<option value="${t.id}">${t.name} (${formatCurrency(t.price)})</option>`).join('');
      renderGroupPolls();
      document.querySelector('#groupPollModal')?.classList.add('show');
    }
  }
};
checkPollRoomFromUrl();


// ==========================================
// 6. ĐỒNG HỒ FLASH SALE, SLIDE & TABS TÌM KIẾM
// ==========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slides .slide');
if (slides.length > 1) {
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4500);
}

let flashSeconds = 4 * 3600 + 45 * 60 + 30;
setInterval(() => {
  if (flashSeconds > 0) flashSeconds--;
  const h = String(Math.floor(flashSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((flashSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(flashSeconds % 60).padStart(2, '0');
  const timerEl = document.querySelector('#flashTimer');
  if (timerEl) timerEl.textContent = `${h}:${m}:${s}`;
}, 1000);

document.querySelectorAll('.search-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.search-tab-btn').forEach(b => {
      b.style.background = '#f1f5f9'; b.style.color = '#475569';
    });
    btn.style.background = '#0ea5e9'; btn.style.color = 'white';
    const type = btn.dataset.type;
    if (type === 'all') renderTourCards(toursList);
    else renderTourCards(toursList.filter(t => (t.type || t.category) === type));
  });
});

const updateFavBadge = () => {
  const el = document.querySelector('#favCountBadge');
  if (el) el.textContent = getFavorites().length;
};
updateFavBadge();

document.querySelectorAll('.btn-claim').forEach(btn => {
  const code = btn.dataset.code;
  const discount = Number(btn.dataset.discount);
  const savedVouchers = JSON.parse(localStorage.getItem('tourdulich_vouchers') || '[]');
  if (savedVouchers.some(v => v.code === code)) {
    btn.textContent = 'Đã lưu'; btn.style.background = '#94a3b8';
  }
  btn.addEventListener('click', () => {
    let list = JSON.parse(localStorage.getItem('tourdulich_vouchers') || '[]');
    if (list.some(v => v.code === code)) { alert(`Mã ${code} đã nằm trong ví Voucher của bạn!`); return; }
    list.push({ code, discount });
    localStorage.setItem('tourdulich_vouchers', JSON.stringify(list));
    btn.textContent = 'Đã lưu'; btn.style.background = '#94a3b8';
    alert(`🎉 Lưu thành công mã ${code} (Giảm ${formatCurrency(discount)})!`);
  });
});

// ==========================================
// 7. NHẬT KÝ & DANH SÁCH YÊU THÍCH
// ==========================================
const renderStories = () => {
  const listEl = document.querySelector('#storyList');
  if (!listEl) return;
  const savedStories = JSON.parse(localStorage.getItem('tourdulich_stories') || '[]');
  const allStories = [...savedStories, ...defaultStories];
  
  listEl.innerHTML = allStories.map(s => {
    const tour = toursList.find(t => String(t.id) === String(s.tourId));
    return `
    <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
      <img src="${s.image || img('st'+s.id)}" style="width: 100%; height: 200px; object-fit: cover;" />
      <div style="padding: 15px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
          <img src="${s.avatar || 'https://i.pravatar.cc/150?u='+s.id}" style="width: 40px; height: 40px; border-radius: 50%;" />
          <div><strong style="font-size: 14px; color: #0f766e;">${s.author}</strong><br/><small style="color: #64748b;">${s.date}</small></div>
        </div>
        <p style="font-size: 14px; color: #475569; margin-bottom: 15px; font-style: italic;">"${s.content}"</p>
        ${tour ? `<button class="btn-book-tagged" data-tourid="${s.tourId}" style="background: #e0f2fe; color: #0284c7; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: bold; width: 100%; text-align: left;">🏷️ Xem tour: ${tour.name}</button>` : ''}
      </div>
    </div>`;
  }).join('');
};

document.querySelector('#storyList')?.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-book-tagged')) {
    const tour = toursList.find(t => String(t.id) === e.target.dataset.tourid);
    if (tour) openTourDetail(tour);
  }
});

const writeStoryModal = document.querySelector('#writeStoryModal');
document.querySelector('#btnWriteStory')?.addEventListener('click', () => {
  const activeUser = JSON.parse(localStorage.getItem('tourdulich_active_user'));
  if (!activeUser) { alert("Vui lòng đăng nhập để chia sẻ trải nghiệm!"); document.querySelector('#btnLogin').click(); return; }
  document.querySelector('#storyTourSelect').innerHTML = '<option value="">-- Chọn tour bạn đã đi --</option>' + toursList.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
  writeStoryModal.classList.add('show');
});

document.querySelector('#closeWriteStoryModal')?.addEventListener('click', () => writeStoryModal.classList.remove('show'));

document.querySelector('#storyForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const activeUser = JSON.parse(localStorage.getItem('tourdulich_active_user'));
  const savedStories = JSON.parse(localStorage.getItem('tourdulich_stories') || '[]');
  savedStories.unshift({
    id: 'st-' + Date.now(), author: activeUser.name || 'Du khách', avatar: 'https://i.pravatar.cc/150?u='+Date.now(),
    image: document.querySelector('#storyImage').value || img('st'+Date.now()), 
    content: document.querySelector('#storyContent').value, 
    tourId: document.querySelector('#storyTourSelect').value, 
    date: new Date().toLocaleDateString('vi-VN')
  });
  localStorage.setItem('tourdulich_stories', JSON.stringify(savedStories));
  alert("Đăng bài chia sẻ thành công!"); writeStoryModal.classList.remove('show'); renderStories();
});

const renderFavoritesModal = () => {
  const listEl = document.querySelector('#favoritesList');
  if (!listEl) return;
  const favs = getFavorites(); 
  if (favs.length === 0) {
    listEl.innerHTML = '<p style="text-align: center; color: #64748b; padding: 30px;">Bạn chưa lưu tour yêu thích nào.</p>';
    listEl.style.display = 'block';
    return;
  }
  listEl.style.display = 'grid';
  listEl.style.gridTemplateColumns = '1fr 1fr';
  listEl.style.gap = '15px';

  const favoriteToursData = toursList.filter(t => favs.includes(String(t.id)));
  listEl.innerHTML = favoriteToursData.map(tour => {
    const tourImg = tour.image || img(tour.code || tour.name);
    return `
    <div style="display: flex; gap: 15px; border: 1px solid #e2e8f0; padding: 12px; border-radius: 12px; align-items: center; background: white;">
      <img src="${tourImg}" style="width: 75px; height: 75px; border-radius: 8px; object-fit: cover;" alt="${tour.name}">
      <div style="flex: 1;">
        <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #1e293b;">${tour.name}</h4>
        <p style="color: #ea580c; font-weight: bold; margin: 0 0 10px 0;">${formatCurrency(tour.price)}</p>
        <div style="display: flex; gap: 8px;">
          <button class="btn-view-fav" data-id="${tour.id}" style="background: #e0f2fe; color: #0284c7; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">Đặt ngay</button>
          <button class="btn-remove-fav" data-id="${tour.id}" style="background: #fee2e2; color: #ef4444; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">Xóa</button>
        </div>
      </div>
    </div>`;
  }).join('');
};

document.querySelector('#btnFavorites')?.addEventListener('click', (e) => {
  e.preventDefault(); renderFavoritesModal(); document.querySelector('#favoritesModal').classList.add('show');
});
document.querySelector('#closeFavoritesModal')?.addEventListener('click', () => document.querySelector('#favoritesModal').classList.remove('show'));

document.querySelector('#favoritesList')?.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-remove-fav')) {
    const id = e.target.dataset.id;
    let favs = getFavorites().filter(favId => favId !== id);
    localStorage.setItem('tourdulich_favorites', JSON.stringify(favs));
    updateFavBadge(); renderFavoritesModal(); renderTourCards(toursList);
  }
  if (e.target.classList.contains('btn-view-fav')) {
    const tour = toursList.find(t => String(t.id) === e.target.dataset.id);
    if (tour) { document.querySelector('#favoritesModal').classList.remove('show'); openTourDetail(tour); }
  }
});

// ==========================================
// 8. ĐẶT TOUR + SƠ ĐỒ CHỌN GHẾ LIMOUSINE (PHẦN 4)
// ==========================================
const btnBookTour = document.querySelector('#btnBookTour');
const bookingModal = document.querySelector('#bookingModal');
const guestCountInput = document.querySelector('#guestCount');
const childCountInput = document.querySelector('#childCount');
const promoCodeSelect = document.querySelector('#promoCode');
const manualPromoInput = document.querySelector('#manualPromo');

let currentTourPrice = 0;
let manualDiscountAmount = 0;
let manualPromoCodeStr = '';

// Lấy các ghế đã bị đặt trước đó của cùng Tour và cùng Ngày đi
const getOccupiedSeats = (tourName, travelDate) => {
  const bookings = JSON.parse(localStorage.getItem('tourdulich_bookings') || '[]');
  let occupied = [];
  bookings.forEach(b => {
    if (b.tourName === tourName && b.travelDate === travelDate && b.status !== 'cancelled' && Array.isArray(b.seats)) {
      occupied.push(...b.seats);
    }
  });
  return occupied;
};

const renderSeatMap = () => { return; 
  const grid = document.querySelector('#seatMapGrid');
  if (!grid) return;
  const tourName = selectedTourObj ? selectedTourObj.name : '';
  const dateVal = document.querySelector('#departureDate').value;
  const occupied = getOccupiedSeats(tourName, dateVal);
  const maxPick = (parseInt(guestCountInput.value) || 1) + (parseInt(childCountInput.value) || 0);

  // Nếu đổi số khách nhỏ hơn số ghế đã chọn thì cắt bớt
  if (selectedSeats.length > maxPick) {
    selectedSeats = selectedSeats.slice(0, maxPick);
  }

  document.querySelector('#seatPickCount').textContent = `${selectedSeats.length}/${maxPick}`;
  document.querySelector('#selectedSeatsText').textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn';

  grid.innerHTML = seatList.map(seat => {
    const isOccupied = occupied.includes(seat);
    const isSelected = selectedSeats.includes(seat);
    let bg = '#f8fafc', color = '#334155', border = '#cbd5e1';
    if (isOccupied) { bg = '#94a3b8'; color = '#fff'; border = '#64748b'; }
    else if (isSelected) { bg = '#f97316'; color = '#fff'; border = '#ea580c'; }

    return `
      <button type="button" class="seat-btn" data-seat="${seat}" ${isOccupied ? 'disabled' : ''}
        style="padding:8px 0; border:1px solid ${border}; background:${bg}; color:${color}; border-radius:6px; font-weight:bold; font-size:12.5px; cursor:${isOccupied ? 'not-allowed' : 'pointer'};">
        💺 ${seat}
      </button>
    `;
  }).join('');
};

document.querySelector('#seatMapGrid')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.seat-btn');
  if (!btn || btn.disabled) return;
  const seat = btn.dataset.seat;
  const maxPick = (parseInt(guestCountInput.value) || 1) + (parseInt(childCountInput.value) || 0);

  if (selectedSeats.includes(seat)) {
    selectedSeats = selectedSeats.filter(s => s !== seat);
  } else {
    if (selectedSeats.length >= maxPick) {
      alert(`Bạn đăng ký ${maxPick} hành khách nên chỉ được chọn tối đa ${maxPick} ghế!`);
      return;
    }
    selectedSeats.push(seat);
  }
  renderSeatMap();
});

const calculateBreakdown = () => {
  const adults = Math.max(1, parseInt(guestCountInput.value) || 1);
  const children = Math.max(0, parseInt(childCountInput.value) || 0);
  const adultTotal = adults * currentTourPrice;
  const childPrice = Math.round(currentTourPrice * 0.75);
  const childTotal = children * childPrice;

  let addonTotal = 0;
  let addonNames = [];
  document.querySelectorAll('.addon-check:checked').forEach(chk => {
    addonTotal += Number(chk.value);
    addonNames.push(chk.dataset.name);
  });

  const vehicleSelect = document.querySelector('#travelVehicle');
  const travelVehicle = vehicleSelect ? vehicleSelect.value : 'Ô tô du lịch Limousine VIP';
  const isPlane = travelVehicle.includes('Máy bay');
  const planeSurcharge = isPlane ? (adults * 1200000 + children * 900000) : 0;

  const subTotal = adultTotal + childTotal + addonTotal + planeSurcharge;
  const selectDiscount = promoCodeSelect && promoCodeSelect.value !== '0' ? parseInt(promoCodeSelect.value) : 0; 
  const finalDiscount = selectDiscount > 0 ? selectDiscount : manualDiscountAmount; 
  const finalTotal = Math.max(0, subTotal - finalDiscount);

  let breakdownHtml = `<div>• Người lớn (${adults} x ${formatCurrency(currentTourPrice)}): <strong>${formatCurrency(adultTotal)}</strong></div>`;
  if (children > 0) breakdownHtml += `<div>• Trẻ em (${children} x ${formatCurrency(childPrice)}): <strong>${formatCurrency(childTotal)}</strong></div>`;
  if (isPlane) breakdownHtml += `<div style="color:#0284c7;">• Phụ thu vé máy bay khứ hồi (${adults} lớn${children > 0 ? ` + ${children} trẻ em` : ''}): <strong>+${formatCurrency(planeSurcharge)}</strong></div>`;
  if (addonTotal > 0) breakdownHtml += `<div>• Dịch vụ cộng thêm (${addonNames.join(', ')}): <strong>+${formatCurrency(addonTotal)}</strong></div>`;
  if (finalDiscount > 0) breakdownHtml += `<div style="color:#10b981;">• Giảm giá Voucher / Affiliate: <strong>-${formatCurrency(finalDiscount)}</strong></div>`;

  document.querySelector('#priceBreakdown').innerHTML = breakdownHtml;
  document.querySelector('#totalPriceDisplay').innerHTML = `<strong style="font-size: 22px; color: #ea580c;">${formatCurrency(finalTotal)}</strong>`;
  renderSeatMap();
  return { adults, children, totalGuests: adults + children, finalTotal, addonNames, finalDiscount, planeSurcharge, vehicle: travelVehicle, tourGuide: document.querySelector('#tourGuideSelect')?.value || 'Đoàn tự động sắp xếp (HDV 5 sao)' };
};

guestCountInput?.addEventListener('input', calculateBreakdown);
childCountInput?.addEventListener('input', calculateBreakdown);
document.querySelector('#travelVehicle')?.addEventListener('change', calculateBreakdown);
document.querySelector('#tourGuideSelect')?.addEventListener('change', calculateBreakdown);
document.querySelector('#departureDate')?.addEventListener('change', renderSeatMap);
document.querySelectorAll('.addon-check').forEach(chk => chk.addEventListener('change', calculateBreakdown));

document.querySelector('#btnApplyManualPromo')?.addEventListener('click', () => {
  const code = manualPromoInput.value.trim().toUpperCase();
  const msgEl = document.querySelector('#manualPromoMsg');
  if (code.startsWith('REF-') && code.length > 4) {
    const activeUser = JSON.parse(localStorage.getItem('tourdulich_active_user'));
    const myCode = activeUser ? 'REF-' + activeUser.email.split('@')[0].toUpperCase() : '';
    if (code === myCode) {
      msgEl.textContent = '❌ Không thể tự dùng mã giới thiệu của chính mình!'; msgEl.style.color = '#ef4444';
      manualDiscountAmount = 0; manualPromoCodeStr = '';
    } else {
      manualDiscountAmount = 100000; manualPromoCodeStr = code;
      msgEl.textContent = `✅ Áp dụng mã giới thiệu thành công (-100.000đ)`; msgEl.style.color = '#10b981';
      if(promoCodeSelect) promoCodeSelect.value = '0'; 
    }
  } else {
    msgEl.textContent = '❌ Mã giới thiệu không hợp lệ!'; msgEl.style.color = '#ef4444';
    manualDiscountAmount = 0; manualPromoCodeStr = '';
  }
  msgEl.style.display = 'block';
  calculateBreakdown();
});

promoCodeSelect?.addEventListener('change', () => {
  if(promoCodeSelect.value !== '0') {
    manualDiscountAmount = 0; manualPromoCodeStr = ''; 
    if(document.querySelector('#manualPromoMsg')) document.querySelector('#manualPromoMsg').style.display = 'none';
    if(manualPromoInput) manualPromoInput.value = '';
  }
  calculateBreakdown();
});

btnBookTour?.addEventListener('click', () => {
  const slotsLeft = selectedTourObj && typeof selectedTourObj.slots === 'number' ? selectedTourObj.slots : 10;
  if (slotsLeft <= 0 || (selectedTourObj && selectedTourObj.status === 'closed')) {
    alert('Tour này hiện đã hết chỗ nhận khách. Vui lòng chọn hành trình khác!');
    return;
  }
  currentTourPrice = selectedTourObj ? Number(selectedTourObj.price) : 0; 
  document.querySelector('#bookingTourName').textContent = `${selectedTourObj.name} (Còn ${slotsLeft} chỗ)`;
  
  const todayStr = new Date().toISOString().split('T')[0];
  document.querySelector('#departureDate').setAttribute('min', todayStr); 
  document.querySelector('#departureDate').value = (selectedTourObj && selectedTourObj.date && selectedTourObj.date >= todayStr) ? selectedTourObj.date : todayStr;
  
  const activeUser = JSON.parse(localStorage.getItem('tourdulich_active_user'));
  if (activeUser) {
    document.querySelector('#guestName').value = activeUser.name || '';
    document.querySelector('#guestEmail').value = activeUser.email || '';
  }

  guestCountInput.value = 1;
  childCountInput.value = 0;
  selectedSeats = ['A1']; // Gợi ý chọn sẵn ghế A1
  document.querySelectorAll('.addon-check').forEach(c => c.checked = false);
  manualDiscountAmount = 0; manualPromoCodeStr = '';

  if(promoCodeSelect) {
    let vouchers = JSON.parse(localStorage.getItem('tourdulich_vouchers') || '[]');
    promoCodeSelect.innerHTML = '<option value="0">-- Không dùng Voucher --</option>' + vouchers.map(v => `<option value="${v.discount}" data-code="${v.code}">${v.code} (-${formatCurrency(v.discount)})</option>`).join('');
  }
  if(document.querySelector('#manualPromoMsg')) document.querySelector('#manualPromoMsg').style.display = 'none';
  if(manualPromoInput) manualPromoInput.value = '';

  calculateBreakdown(); 
  document.querySelector('#tourDetailModal').classList.remove('show');
  bookingModal.classList.add('show');
});

document.querySelector('#closeBookingModal')?.addEventListener('click', () => bookingModal.classList.remove('show'));

// SUBMIT FORM ĐẶT TOUR
document.querySelector('#bookingForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;
  
  const name = document.querySelector('#guestName').value.trim();
  const phone = document.querySelector('#guestPhone').value.trim();
  const email = document.querySelector('#guestEmail').value.trim();
  const date = document.querySelector('#departureDate').value;
  const note = document.querySelector('#guestHealthNote').value.trim();
  const tourName = selectedTourObj ? selectedTourObj.name : document.querySelector('#bookingTourName').textContent;
  const vehicle = document.querySelector('#travelVehicle')?.value || 'Ô tô du lịch Limousine VIP';
  const tourGuide = document.querySelector('#tourGuideSelect')?.value || 'Đoàn tự động sắp xếp (HDV 5 sao)';
  const { adults, children, totalGuests, finalTotal, addonNames } = calculateBreakdown();
  const maxSlots = selectedTourObj && typeof selectedTourObj.slots === 'number' ? selectedTourObj.slots : 20;

  document.querySelectorAll('[id^="err"]').forEach(el => el.style.display = 'none');

  if (name.length < 2) { document.querySelector('#errName').style.display = 'block'; isValid = false; }
  if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(phone)) { document.querySelector('#errPhone').style.display = 'block'; isValid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.querySelector('#errEmail').style.display = 'block'; isValid = false; }
  if (totalGuests < 1) {
    document.querySelector('#errCount').textContent = `Tổng số khách (${totalGuests}) vượt quá số chỗ còn lại (${maxSlots} chỗ)!`;
    document.querySelector('#errCount').style.display = 'block';
    isValid = false;
  }
  const today = new Date(); today.setHours(0, 0, 0, 0); 
  if (!date || new Date(date) < today) { document.querySelector('#errDate').style.display = 'block'; isValid = false; }

  if (!isValid) return;

  // Bỏ kiểm tra ghế giới hạn 16 chỗ, cho phép đặt số lượng đoàn tùy ý

  const bookings = JSON.parse(localStorage.getItem('tourdulich_bookings') || '[]');
  const isDuplicate = bookings.some(b => 
    (b.phone === phone || b.email === email) && 
    b.tourName === tourName && 
    b.travelDate === date && 
    b.status !== 'cancelled'
  );

  if (isDuplicate) {
    alert("⚠️ CẢNH BÁO TRÙNG ĐƠN:\nBạn đã có đơn đặt tour này vào cùng ngày khởi hành!\nVui lòng kiểm tra tại trang Đơn Đặt Chỗ.");
    return; 
  }

  let selectedOpt = promoCodeSelect.options[promoCodeSelect.selectedIndex];
  let usedVoucherCode = selectedOpt && selectedOpt.dataset.code ? selectedOpt.dataset.code : '';
  let appliedCode = usedVoucherCode || (manualPromoCodeStr || 'Không có');

  if (usedVoucherCode) {
    let vouchers = JSON.parse(localStorage.getItem('tourdulich_vouchers') || '[]').filter(v => v.code !== usedVoucherCode);
    localStorage.setItem('tourdulich_vouchers', JSON.stringify(vouchers));
  }

  if (selectedTourObj) {
    toursList = toursList.map(t => {
      if (String(t.id) === String(selectedTourObj.id)) {
        const remaining = Math.max(0, (t.slots ?? 10) - totalGuests);
        return { ...t, slots: remaining, status: remaining === 0 ? 'closed' : t.status };
      }
      return t;
    });
    localStorage.setItem('tourdulich_tours', JSON.stringify(toursList));
    renderTourCards(toursList);
  }

  const defaultStages = (selectedTourObj && Array.isArray(selectedTourObj.stages) && selectedTourObj.stages.length === 3)
    ? JSON.parse(JSON.stringify(selectedTourObj.stages))
    : getDefaultStagesForTour(tourName);

  const combinedNote = [note, addonNames.length ? `Dịch vụ thêm: ${addonNames.join(', ')}` : ''].filter(Boolean).join(' | ') || 'Không có';
  const newBookingId = 'BK-' + Date.now().toString().slice(-6);

  bookings.unshift({
    id: newBookingId,
    guestName: name,
    email: email,
    phone: phone,
    guestCount: totalGuests,
    adultCount: adults,
    childCount: children,
    vehicle: vehicle,
    tourGuide: tourGuide,
    seats: [...selectedSeats],
    note: combinedNote,
    tourName: tourName,
    travelDate: date,
    totalPrice: finalTotal,
    promoInfo: appliedCode,
    status: 'pending',
    createdAt: new Date().toLocaleDateString('vi-VN'),
    stages: defaultStages
  });
  localStorage.setItem('tourdulich_bookings', JSON.stringify(bookings));

  // Ghi thông báo mới vào Chuông thông báo (Phần 5)
  const notifs = getNotifications();
  notifs.unshift({
    id: 'nt-' + Date.now(),
    title: '🎉 Đặt chỗ thành công!',
    message: `Đơn ${newBookingId} (${tourName}) - Phương tiện: ${vehicle} | HDV: ${tourGuide} đã được ghi nhận thành công.`,
    time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    read: false
  });
  localStorage.setItem('tourdulich_notifications', JSON.stringify(notifs));
  updateNotifBadge();

  bookingModal.classList.remove('show');
  
  if (confirm(`🎉 ĐẶT TOUR THÀNH CÔNG (Mã đơn: ${newBookingId})\n- Tour: ${tourName}\n- Số lượng khách: ${totalGuests} người (${adults} lớn, ${children} trẻ em)\n- Phương tiện: ${vehicle}\n- Hướng dẫn viên: ${tourGuide}\n- Tổng thanh toán: ${formatCurrency(finalTotal)}\n\nChuyển đến trang Đơn Đặt Chỗ để xem Vé điện tử E-Ticket & Công cụ Chia tiền nhóm?`)) {
    window.location.href = 'trangdonhang.html';
  }
});

// ==========================================
// 9. ĐĂNG KÝ / ĐĂNG NHẬP, HÀNH TRÌNH SỐ & CỔNG HDV
// ==========================================
const btnLogin = document.querySelector('#btnLogin');
const authModal = document.querySelector('#authModal');
let isRegisterMode = false;

const checkLoginStatus = () => {
  const activeUser = JSON.parse(localStorage.getItem('tourdulich_active_user'));
  if (activeUser) {
    btnLogin.textContent = `👤 ${activeUser.name} (Thoát)`;
    btnLogin.style.backgroundColor = "#ef4444"; 
    document.querySelector('#btnItinerary').style.display = "inline-block"; 
    document.querySelector('#btnAffiliate').style.display = "inline-block"; 
  } else {
    btnLogin.textContent = "Đăng nhập";
    btnLogin.style.backgroundColor = ""; 
    document.querySelector('#btnItinerary').style.display = "none"; 
    document.querySelector('#btnAffiliate').style.display = "none";
  }
};
if (btnLogin) checkLoginStatus();

document.querySelector('#authSwitchLink')?.addEventListener('click', (e) => {
  e.preventDefault();
  isRegisterMode = !isRegisterMode;
  document.querySelector('#authTitle').textContent = isRegisterMode ? 'Đăng ký tài khoản' : 'Đăng nhập';
  document.querySelector('#registerNameGroup').style.display = isRegisterMode ? 'block' : 'none';
  document.querySelector('#btnAuthSubmit').textContent = isRegisterMode ? 'Tạo tài khoản' : 'Đăng nhập';
  document.querySelector('#authSwitchText').textContent = isRegisterMode ? 'Đã có tài khoản?' : 'Chưa có tài khoản?';
  document.querySelector('#authSwitchLink').textContent = isRegisterMode ? 'Đăng nhập ngay' : 'Đăng ký ngay';
});

btnLogin?.addEventListener('click', () => {
  if (JSON.parse(localStorage.getItem('tourdulich_active_user'))) {
    if (confirm("Bạn có chắc muốn đăng xuất tài khoản?")) {
      localStorage.removeItem('tourdulich_active_user');
      checkLoginStatus();
    }
  } else {
    authModal.classList.add('show');
  }
});

document.querySelector('#closeAuthModal')?.addEventListener('click', () => authModal.classList.remove('show'));

document.querySelector('#authForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#authName').value.trim();
  const email = document.querySelector('#authEmail').value.trim().toLowerCase();
  const password = document.querySelector('#authPassword').value.trim();
  let users = JSON.parse(localStorage.getItem('tourdulich_users') || '[]');

  if (isRegisterMode) {
    if (name.length < 2) { alert('Vui lòng nhập họ tên đầy đủ!'); return; }
    if (users.some(u => u.email === email)) { alert('Email này đã được đăng ký!'); return; }
    users.push({ name, email, password });
    localStorage.setItem('tourdulich_users', JSON.stringify(users));
    localStorage.setItem('tourdulich_active_user', JSON.stringify({ name, email }));
    alert(`🎉 Đăng ký thành công! Chào mừng ${name}.`);
  } else {
    const found = users.find(u => u.email === email);
    if (found && found.password !== password) { alert('❌ Mật khẩu không chính xác!'); return; }
    const userName = found ? found.name : email.split('@')[0];
    localStorage.setItem('tourdulich_active_user', JSON.stringify({ name: userName, email }));
    alert(`🎉 Chào mừng ${userName} quay trở lại!`);
  }
  checkLoginStatus();
  authModal.classList.remove('show');
});

const affiliateModal = document.querySelector('#affiliateModal');
document.querySelector('#btnAffiliate')?.addEventListener('click', (e) => {
  e.preventDefault();
  const activeUser = JSON.parse(localStorage.getItem('tourdulich_active_user'));
  if(!activeUser) return;
  const myRefCode = 'REF-' + activeUser.email.split('@')[0].toUpperCase();
  document.querySelector('#myRefCodeDisplay').textContent = myRefCode;
  const allBookings = JSON.parse(localStorage.getItem('tourdulich_bookings') || '[]');
  const refBookings = allBookings.filter(b => b.promoInfo && b.promoInfo.includes(myRefCode) && b.status !== 'cancelled');
  document.querySelector('#refCountDisplay').textContent = refBookings.length;
  document.querySelector('#refComDisplay').textContent = formatCurrency(refBookings.length * 50000); 
  affiliateModal.classList.add('show');
});
document.querySelector('#closeAffiliateModal')?.addEventListener('click', () => affiliateModal.classList.remove('show'));

document.querySelector('#btnItinerary')?.addEventListener('click', (e) => {
  e.preventDefault();
  const activeUser = JSON.parse(localStorage.getItem('tourdulich_active_user'));
  if (!activeUser) return;

  const allBookings = JSON.parse(localStorage.getItem('tourdulich_bookings') || '[]');
  const myBookings = allBookings.filter(b => b.email && b.email.toLowerCase() === activeUser.email.toLowerCase() && b.status !== 'cancelled');
  const listEl = document.querySelector('#itineraryList');

  if (myBookings.length === 0) {
    listEl.innerHTML = '<p style="text-align: center; color: #64748b; padding: 40px 0;">Bạn chưa có chuyến đi nào dưới email này.</p>';
  } else {
    listEl.innerHTML = myBookings.map(b => {
      const stages = (Array.isArray(b.stages) && b.stages.length === 3) ? b.stages : getDefaultStagesForTour(b.tourName);
      const stagesHtml = stages.map(s => `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0d7a5f; padding: 12px; border-radius: 8px; margin-top: 10px;">
          <div style="display:flex; justify-content:space-between; font-weight: bold; color: #0f766e; margin-bottom: 6px;">
            <span>🚩 Chặng ${s.stage}: ${s.title || ''}</span>
            <span style="font-size:12px; background:#e0f2fe; color:#0369a1; padding:2px 8px; border-radius:99px;">${s.status || 'Sắp diễn ra'}</span>
          </div>
          <div style="font-size: 13.5px; color: #334155; display:grid; grid-template-columns: 1fr 1fr 1fr; gap:8px;">
            <div>📍 <strong>Điểm đến:</strong><br>${s.destination}</div>
            <div>🚌 <strong>Phương tiện:</strong><br>${s.vehicle}</div>
            <div>👨‍✈️ <strong>Hướng dẫn viên:</strong><br>${s.guide}</div>
          </div>
        </div>
      `).join('');

      return `
      <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 10px;">
          <h4 style="margin: 0; font-size: 18px; color: #1e293b;">${b.tourName} (${b.id})</h4>
          <span style="font-weight:bold; color:${b.status === 'confirmed' ? '#15803d' : '#d97706'};">${b.status === 'confirmed' ? '✅ Đã xác nhận & Xuất vé' : '⏳ Chờ Admin xác nhận'}</span>
        </div>
        <div style="display: flex; gap: 20px; font-size: 14px; color: #475569; margin-bottom: 10px; flex-wrap:wrap;">
          <div><strong>📅 Khởi hành:</strong> ${b.travelDate}</div>
          <div><strong>👥 Số khách:</strong> ${b.guestCount} người</div>
          <div><strong>💺 Ghế ngồi:</strong> <span style="color:#ea580c; font-weight:bold;">${Array.isArray(b.seats) ? b.seats.join(', ') : 'A1, A2'}</span></div>
          <div><strong>💰 Tổng tiền:</strong> ${formatCurrency(b.totalPrice)}</div>
        </div>
        ${stagesHtml}
      </div>`;
    }).join('');
  }
  document.querySelector('#itineraryModal').classList.add('show');
});
document.querySelector('#closeItineraryModal')?.addEventListener('click', () => document.querySelector('#itineraryModal').classList.remove('show'));
document.querySelector('#btnSOS')?.addEventListener('click', () => alert("🚨 TRUNG TÂM HỖ TRỢ KHẨN CẤP 24/7\n\n📞 Điều hành tour: 1900 1234\n🚑 Cấp cứu y tế: 115\n🚓 Công an hỗ trợ: 113"));

// Cổng Hướng dẫn viên
const renderGuideTable = (filterTourName) => {
  const allBookings = JSON.parse(localStorage.getItem('tourdulich_bookings') || '[]');
  let filteredBookings = allBookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  if (filterTourName !== 'all') filteredBookings = filteredBookings.filter(b => b.tourName === filterTourName);

  const guideGuestList = document.querySelector('#guideGuestList');
  if (filteredBookings.length === 0) { guideGuestList.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #64748b;">Chưa có hành khách nào trong đoàn này.</td></tr>'; return; }

  guideGuestList.innerHTML = filteredBookings.map((b, i) => `
  <tr style="border-bottom: 1px solid #e2e8f0; background: ${i % 2 === 0 ? 'white' : '#f8fafc'};">
    <td style="padding: 12px; font-weight: 600;">${b.guestName}<br><small style="color:#64748b;">${b.tourName} (${b.travelDate})</small></td>
    <td style="padding: 12px;">${b.phone}<br><small style="color:#0d7a5f; font-weight:bold;">💺 Ghế: ${Array.isArray(b.seats) ? b.seats.join(', ') : 'Tự do'}</small></td>
    <td style="padding: 12px; text-align: center; font-weight: bold;">${b.guestCount}</td>
    <td style="padding: 12px; color: #ef4444; font-weight: 600;">⚠️ ${b.note || 'Không có'}</td>
    <td style="padding: 12px; text-align: center;"><button onclick="this.textContent='✅ Đã lên xe'; this.style.background='#64748b';" style="background: #10b981; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">Điểm danh QR</button></td>
  </tr>`).join('');
};

document.querySelector('#btnOpenGuidePortal')?.addEventListener('click', (e) => {
  e.preventDefault();
  if (prompt("Nhập Mã Hướng Dẫn Viên (Mật khẩu mẫu: HDV123):") !== 'HDV123') { alert("Mã xác thực không đúng!"); return; }
  const uniqueTours = [...new Set(JSON.parse(localStorage.getItem('tourdulich_bookings') || '[]').map(b => b.tourName))];
  document.querySelector('#guideTourSelect').innerHTML = '<option value="all">-- Tất cả các đoàn --</option>' + uniqueTours.map(t => `<option value="${t}">${t}</option>`).join('');
  renderGuideTable('all'); document.querySelector('#guidePortalModal').classList.add('show');
});
document.querySelector('#guideTourSelect')?.addEventListener('change', (e) => renderGuideTable(e.target.value));
document.querySelector('#closeGuidePortalModal')?.addEventListener('click', () => document.querySelector('#guidePortalModal').classList.remove('show'));

document.querySelector('#featuredTours')?.addEventListener('click', (e) => {
  const favBtn = e.target.closest('.btn-favorite');
  if (favBtn) {
    e.stopPropagation();
    const tourId = String(favBtn.dataset.id);
    let favs = getFavorites();
    if (favs.includes(tourId)) { favs = favs.filter(id => id !== tourId); favBtn.style.color = '#cbd5e1'; } 
    else { favs.push(tourId); favBtn.style.color = '#ef4444'; }
    localStorage.setItem('tourdulich_favorites', JSON.stringify(favs));
    updateFavBadge();
    return;
  }
  const card = e.target.closest('.tour-card');
  if (!card) return;
  const tour = toursList.find(t => String(t.id) === String(card.dataset.id));
  if (tour) openTourDetail(tour);
});

document.querySelector('#closeTourDetail')?.addEventListener('click', () => document.querySelector('#tourDetailModal').classList.remove('show'));

document.querySelector('.btn-search')?.addEventListener('click', (e) => {
  e.preventDefault();
  const kw = document.querySelector('#dest').value.toLowerCase().trim();
  const dateVal = document.querySelector('#date').value;
  const priceVal = document.querySelector('#priceFilter').value;

  const filtered = toursList.filter(t => {
    const matchKw = !kw || t.name.toLowerCase().includes(kw) || (t.type && t.type.toLowerCase().includes(kw)) || (t.destination && t.destination.toLowerCase().includes(kw));
    const matchDate = !dateVal || (t.date && t.date >= dateVal);
    const matchPrice = priceVal === 'all' || (priceVal === 'under5' && t.price < 5000000) || (priceVal === 'above5' && t.price >= 5000000);
    return matchKw && matchDate && matchPrice;
  });

  renderTourCards(filtered);
  document.querySelector('#featuredTours').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

fetchTours();
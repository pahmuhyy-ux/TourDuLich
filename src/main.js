import './style.css'

// 1. Cấu hình cơ bản
const img = (id) => `https://picsum.photos/seed/${id}/1200/800`

const defaultTours = [
  { id: 1, code: 'TO-1023', name: 'Hạ Long 3N2Đ', type: 'Biển đảo', date: '2026-10-12', price: 4490000, status: 'open' },
  { id: 2, code: 'TO-1129', name: 'Đà Nẵng - Hội An', type: 'Miền Trung', date: '2026-10-18', price: 5890000, status: 'pending' },
  { id: 3, code: 'TO-1155', name: 'Phú Quốc 4N3Đ', type: 'Biển đảo', date: '2026-11-02', price: 6790000, status: 'open' },
  { id: 4, code: 'TO-1194', name: 'Sapa - Fansipan', type: 'Núi rừng', date: '2026-11-15', price: 5290000, status: 'closed' },
  { id: 5, code: 'TO-1218', name: 'Ninh Bình - Tràng An', "type": 'Miền Bắc', date: '2026-10-26', price: 3890000, status: 'open' },
  { id: 6, code: 'TO-1282', name: 'Cần Thơ - Châu Đốc', type: 'Miền Nam', date: '2026-12-03', price: 4590000, status: 'pending' }
]

const statusLabel = { open: 'Đang mở', pending: 'Chờ duyệt', closed: 'Đã đóng' }
const formatCurrency = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value)

// 2. Fetch dữ liệu Tour từ file JSON và gộp với dữ liệu từ Admin
let toursList = [];

const fetchTours = async () => {
  let fetchedData = [];
  try {
    const response = await fetch('tours.json');
    if (!response.ok) throw new Error('Lỗi khi tải file JSON');
    fetchedData = await response.json();
  } catch (error) {
    console.warn("Không đọc được tours.json, sử dụng mảng defaultTours", error);
    fetchedData = [...defaultTours];
  }

  // Lấy danh sách tour do Admin tạo từ LocalStorage
  const adminTours = JSON.parse(localStorage.getItem('tourdulich_tours') || '[]');
  
  // Gộp dữ liệu: Ưu tiên hiển thị tour của Admin lên trước
  toursList = [...adminTours, ...fetchedData];
  
  renderTourCards(toursList);
}

// Hàm lấy danh sách tour yêu thích từ LocalStorage
const getFavorites = () => JSON.parse(localStorage.getItem('tourdulich_favorites') || '[]');

// 3. Hàm render Tour
const renderTourCards = (dataToRender = toursList) => {
  const container = document.querySelector('#featuredTours')
  if (!container) return

  if (dataToRender.length === 0) {
      container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 20px;">Không tìm thấy tour phù hợp.</p>`
      return
  }

  const favs = getFavorites();

  container.innerHTML = dataToRender
    .map((tour) => {
      const tourCode = tour.code || `TO-${String(tour.id).slice(-4).toUpperCase()}`
      const tourType = tour.type || tour.category || 'Chưa phân loại'
      const tourDays = tour.date ? new Date(tour.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) : (tour.duration || 'Liên hệ')
      const tourImg = tour.image || img(tourCode || tour.name)
      const oldPrice = tour.oldPrice || Math.round(tour.price * 1.12)
      
      const isFav = favs.includes(String(tour.id));

      return `
      <article class="card tour-card is-clickable" data-id="${tour.id}" tabindex="0" role="button" aria-label="Xem chi tiết ${tour.name}">
        <div class="tour-media" style="position: relative;">
          <img src="${tourImg}" alt="${tour.name}" />
          <span class="badge">${tourType}</span>
          <span class="days">${tourDays}</span>
          
          <button class="btn-favorite" data-id="${tour.id}" title="Thêm vào yêu thích" 
            style="position: absolute; top: 10px; right: 10px; background: white; border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; color: ${isFav ? 'red' : '#ccc'}; z-index: 10; font-size: 18px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            ♥
          </button>
        </div>
        <div class="tour-body">
          <p class="tour-rating">★★★★★ <span>${statusLabel[tour.status] || 'Tour mới'}</span></p>
          <h3>${tour.name}</h3>
          <p class="tour-meta">${tourCode} • ${tourType}</p>
          <div class="tour-foot">
            <div>
              <span class="price-old">${formatCurrency(oldPrice)}</span>
              <span class="price">${formatCurrency(tour.price)}</span>
            </div>
            <button class="btn btn-primary btn-sm" type="button">Xem chi tiết</button>
          </div>
        </div>
      </article>
      `
    })
    .join('')
}

const openTourDetail = (tour) => {
  const modal = document.querySelector('#tourDetailModal')
  if (!modal) return

  const detailType = document.querySelector('#tourDetailType')
  const detailName = document.querySelector('#tourDetailName')
  const detailMeta = document.querySelector('#tourDetailMeta')
  const detailDate = document.querySelector('#tourDetailDate')
  const detailPrice = document.querySelector('#tourDetailPrice')
  const detailOldPrice = document.querySelector('#tourDetailOldPrice')
  const detailStatus = document.querySelector('#tourDetailStatus')
  const detailImage = document.querySelector('#tourDetailImage')

  const tourCode = tour.code || `TO-${String(tour.id).slice(-4).toUpperCase()}`
  const tourType = tour.type || tour.category || 'Chưa phân loại'
  const tourDays = tour.date ? new Date(tour.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : (tour.duration || 'Liên hệ')
  const tourImg = tour.image || img(tourCode || tour.name)
  const oldPrice = tour.oldPrice || Math.round(tour.price * 1.12)

  detailType.textContent = tourType
  detailName.textContent = tour.name
  detailMeta.textContent = `${tourCode} • ${tourType}`
  detailDate.textContent = tourDays
  detailPrice.textContent = formatCurrency(tour.price)
  detailOldPrice.textContent = formatCurrency(oldPrice)
  detailStatus.textContent = statusLabel[tour.status] || 'Tour mới'
  detailImage.src = tourImg
  detailImage.alt = tour.name

  modal.classList.add('show')
  modal.setAttribute('aria-hidden', 'false')
}

const closeTourDetail = () => {
  const modal = document.querySelector('#tourDetailModal')
  if (!modal) return
  modal.classList.remove('show')
  modal.setAttribute('aria-hidden', 'true')
}

// 4. Giao diện trang chủ (Bao gồm Modal Đăng nhập/Đăng ký)
document.querySelector('#app').innerHTML = `
<header class="header">
  <div class="container header-inner">
    <a href="/" class="logo">
      <span class="logo-icon">✈</span>
      <span>Tour<strong>DuLich</strong></span>
    </a>
    <nav class="nav">
      <a href="/" class="nav-link active">Trang chủ</a>
      <a href="trangtour.html" onclick="window.location.href='trangtour.html'; return false;" class="nav-link">Tour</a>
      <a href="tranggioithieu.html" onclick="window.location.href='tranggioithieu.html'; return false;" class="nav-link">Giới thiệu</a>
      <a href="trangdonhang.html" onclick="window.location.href='trangdonhang.html'; return false;" class="nav-link">Đơn hàng</a>
      <a href="tranglienhe.html" onclick="window.location.href='tranglienhe.html'; return false;" class="nav-link">Liên hệ</a>
    </nav>
    <div class="header-actions">
      <a href="admin.html" onclick="window.location.href='admin.html'; return false;" style="margin-right: 15px; font-weight: bold; color: #f97316; text-decoration: none;">Admin</a>
      <button class="btn btn-primary" id="btnLogin">Đăng nhập</button>
    </div>
  </div>
</header>

<section class="hero">
  <div class="hero-slides">
    <div class="slide active" style="background-image: url('https://picsum.photos/seed/slide1/1920/1080')"></div>
    <div class="slide" style="background-image: url('https://picsum.photos/seed/slide2/1920/1080')"></div>
    <div class="slide" style="background-image: url('https://picsum.photos/seed/slide3/1920/1080')"></div>
  </div>
  
  <div class="hero-overlay"></div>
  <div class="container hero-content">
    <p class="hero-tagline">Khám phá Việt Nam &amp; Thế giới</p>
    <h1 class="hero-title">Đặt tour trải nghiệm <br /><span>những chuyến đi đáng nhớ</span></h1>
    <p class="hero-sub">Hành trình trọn vẹn mọi miền với chi phí hợp lý, dịch vụ chuyên nghiệp và trải nghiệm tuyệt vời nhất.</p>
    <div class="search-box">
      <div class="search-field">
        <label for="dest">Điểm đến</label>
        <input id="dest" type="text" placeholder="Bạn muốn đi đâu?" />
      </div>
      <div class="search-field">
        <label for="date">Ngày khởi hành</label>
        <input id="date" type="date" />
      </div>
      <div class="search-field">
        <label for="guests">Số khách</label>
        <select id="guests">
          <option>1 người</option>
          <option selected>2 người</option>
          <option>3 người</option>
          <option>5+ người</option>
        </select>
      </div>
      <button class="btn btn-search">Tìm kiếm</button>
    </div>
    <div class="hero-stats">
      <div class="stat"><strong>25k+</strong><span>Khách hàng</span></div>
      <div class="stat"><strong>120+</strong><span>Điểm đến</span></div>
      <div class="stat"><strong>15</strong><span>Năm kinh nghiệm</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <p class="section-label">ĐIỂM ĐẾN NỔI BẬT</p>
      <h2 class="section-title">Khám phá các điểm đến hấp dẫn</h2>
      <p class="section-desc">Những địa danh được yêu thích nhất dành cho chuyến đi của bạn.</p>
    </div>
    <div class="grid destinations">
      <a href="#" class="card dest-card dest-lg">
        <img src="${img('halong')}" alt="Vịnh Hạ Long" />
        <div class="dest-info"><h3>Vịnh Hạ Long</h3><p>Quảng Ninh • 120+ tour</p></div>
      </a>
      <a href="#" class="card dest-card">
        <img src="${img('danang')}" alt="Đà Nẵng" />
        <div class="dest-info"><h3>Đà Nẵng</h3><p>Miền Trung • 85 tour</p></div>
      </a>
      <a href="#" class="card dest-card">
        <img src="${img('dalat')}" alt="Đà Lạt" />
        <div class="dest-info"><h3>Đà Lạt</h3><p>Lâm Đồng • 60 tour</p></div>
      </a>
      <a href="#" class="card dest-card">
        <img src="${img('hanoi')}" alt="Hà Nội" />
        <div class="dest-info"><h3>Hà Nội</h3><p>Thủ đô • 95 tour</p></div>
      </a>
      <a href="#" class="card dest-card">
        <img src="${img('phuquoc')}" alt="Phú Quốc" />
        <div class="dest-info"><h3>Phú Quốc</h3><p>Kiên Giang • 50 tour</p></div>
      </a>
      <a href="#" class="card dest-card">
        <img src="${img('nhatrang')}" alt="Nha Trang" />
        <div class="dest-info"><h3>Nha Trang</h3><p>Khánh Hòa • 72 tour</p></div>
      </a>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <div class="section-head">
      <p class="section-label">TOUR ĐỀ XUẤT</p>
      <h2 class="section-title">Có thể bạn sẽ thích</h2>
      <p class="section-desc">Bấm vào chữ "Tour" trên Menu để xem danh sách đầy đủ nhé.</p>
    </div>
    <div id="featuredTours" class="grid tours"></div>
  </div>
</section>

<!-- Modal 1: Chi tiết Tour -->
<div class="tour-detail-modal" id="tourDetailModal" aria-hidden="true">
  <div class="tour-detail-panel">
    <button class="tour-detail-close" id="closeTourDetail" type="button" aria-label="Đóng">×</button>
    <div class="tour-detail-media">
      <img id="tourDetailImage" src="" alt="" />
    </div>
    <div class="tour-detail-body">
      <span class="tour-detail-badge" id="tourDetailType">Tour</span>
      <h3 id="tourDetailName">Tên tour</h3>
      <p id="tourDetailMeta">Mã tour • Loại</p>
      <div class="tour-detail-grid">
        <div><span>Ngày khởi hành</span><strong id="tourDetailDate">--</strong></div>
        <div><span>Trạng thái</span><strong id="tourDetailStatus">--</strong></div>
      </div>
      <div class="tour-detail-footer">
        <div><span class="price-old" id="tourDetailOldPrice">0đ</span><span class="price" id="tourDetailPrice">0đ</span></div>
        <button class="btn btn-primary" id="btnBookTour" type="button">Đặt tour</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal 2: Form Đặt Tour -->
<div class="tour-detail-modal" id="bookingModal" aria-hidden="true">
  <div class="tour-detail-panel" style="max-width: 500px; text-align: left;">
    <button class="tour-detail-close" id="closeBookingModal" type="button" aria-label="Đóng">×</button>
    <h3 style="margin-bottom: 10px; font-size: 20px;">Thông tin đặt tour</h3>
    <p style="margin-bottom: 15px; font-size: 14px; color: #666;">Bạn đang đặt: <strong id="bookingTourName" style="color: #0f766e;"></strong></p>
    
    <form id="bookingForm" novalidate>
      <div style="margin-bottom: 15px;">
        <label for="guestName" style="display: block; margin-bottom: 5px; font-weight: 500;">Họ và Tên (*)</label>
        <input type="text" id="guestName" placeholder="Nhập họ tên đầy đủ" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;" />
        <span id="errName" style="color: #ef4444; font-size: 12px; display: none; margin-top: 4px;">Vui lòng nhập họ tên hợp lệ.</span>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
        <div>
          <label for="guestPhone" style="display: block; margin-bottom: 5px; font-weight: 500;">Số điện thoại (*)</label>
          <input type="tel" id="guestPhone" placeholder="VD: 0912345678" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          <span id="errPhone" style="color: #ef4444; font-size: 12px; display: none; margin-top: 4px;">Số điện thoại không hợp lệ (10 số).</span>
        </div>
        <div>
          <label for="guestEmail" style="display: block; margin-bottom: 5px; font-weight: 500;">Email (*)</label>
          <input type="email" id="guestEmail" placeholder="email@example.com" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          <span id="errEmail" style="color: #ef4444; font-size: 12px; display: none; margin-top: 4px;">Email không đúng định dạng.</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
        <div>
          <label for="guestCount" style="display: block; margin-bottom: 5px; font-weight: 500;">Số lượng khách (*)</label>
          <input type="number" id="guestCount" min="1" value="1" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          <span id="errCount" style="color: #ef4444; font-size: 12px; display: none; margin-top: 4px;">Số người phải từ 1 trở lên.</span>
        </div>
        <div>
          <label for="departureDate" style="display: block; margin-bottom: 5px; font-weight: 500;">Ngày khởi hành (*)</label>
          <input type="date" id="departureDate" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          <span id="errDate" style="color: #ef4444; font-size: 12px; display: none; margin-top: 4px;">Vui lòng chọn ngày hợp lệ.</span>
        </div>
      </div>

      <div style="margin-bottom: 20px; padding: 15px; background: #f8fafc; border-radius: 6px; text-align: right;">
        <span style="font-size: 14px; color: #64748b;">Tổng tiền:</span>
        <strong id="totalPriceDisplay" style="font-size: 20px; color: #f97316; margin-left: 10px;">0 đ</strong>
      </div>

      <button type="submit" class="btn btn-primary" style="width: 100%;">Xác nhận đặt tour</button>
    </form>
  </div>
</div>

<!-- Modal 3: Đăng ký & Đăng nhập -->
<div class="tour-detail-modal" id="authModal" aria-hidden="true">
  <div class="tour-detail-panel" style="max-width: 400px; text-align: left;">
    <button class="tour-detail-close" id="closeAuthModal" type="button" aria-label="Đóng">×</button>
    <h3 id="authTitle" style="margin-bottom: 20px; font-size: 24px; text-align: center; color: #0f766e;">Đăng nhập</h3>
    
    <form id="authForm" novalidate>
      <div id="registerNameGroup" style="display: none; margin-bottom: 15px;">
        <label for="authName" style="display: block; margin-bottom: 5px; font-weight: 500;">Họ và tên</label>
        <input type="text" id="authName" placeholder="Nhập họ tên" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 6px; outline: none;" />
      </div>

      <div style="margin-bottom: 15px;">
        <label for="authEmail" style="display: block; margin-bottom: 5px; font-weight: 500;">Email</label>
        <input type="email" id="authEmail" placeholder="Nhập email của bạn" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 6px; outline: none;" required />
      </div>
      
      <div style="margin-bottom: 25px;">
        <label for="authPassword" style="display: block; margin-bottom: 5px; font-weight: 500;">Mật khẩu</label>
        <input type="password" id="authPassword" placeholder="Nhập mật khẩu" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 6px; outline: none;" required />
      </div>
      
      <button type="submit" class="btn btn-primary" id="btnAuthSubmit" style="width: 100%; padding: 12px; font-size: 16px;">Đăng nhập</button>
      
      <p style="text-align: center; margin-top: 15px; font-size: 14px; color: #64748b;">
        <span id="authSwitchText">Chưa có tài khoản?</span> 
        <a href="#" id="authSwitchLink" style="color: #f97316; text-decoration: none; font-weight: 600;">Đăng ký ngay</a>
      </p>
    </form>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="section-head">
      <p class="section-label">VÌ SAO CHỌN CHÚNG TÔI</p>
      <h2 class="section-title">Trải nghiệm dịch vụ hoàn hảo</h2>
    </div>
    <div class="grid features">
      <div class="card feature-card"><div class="feature-icon">💼</div><h3>Giá tốt nhất</h3><p>Cam kết giá cạnh tranh, không phát sinh chi phí ẩn.</p></div>
      <div class="card feature-card"><div class="feature-icon">🛡️</div><h3>An toàn tuyệt đối</h3><p>Bảo hiểm du lịch lên đến 100 triệu đồng.</p></div>
      <div class="card feature-card"><div class="feature-icon">🧑‍✈️</div><h3>HDV chuyên nghiệp</h3><p>Đội ngũ giàu kinh nghiệm, thân thiện.</p></div>
      <div class="card feature-card"><div class="feature-icon">📞</div><h3>Hỗ trợ 24/7</h3><p>Chăm sóc khách hàng luôn sẵn sàng hỗ trợ.</p></div>
      <div class="card feature-card"><div class="feature-icon">🗓️</div><h3>Linh hoạt lịch trình</h3><p>Dễ dàng tùy chỉnh theo nhu cầu.</p></div>
      <div class="card feature-card"><div class="feature-icon">🗺️</div><h3>Điểm đến đa dạng</h3><p>Hơn 120 điểm đến trong và ngoài nước.</p></div>
    </div>
  </div>
</section>

<section class="section banner">
  <div class="container banner-box">
    <div class="banner-content">
      <h2>Nhận ưu đãi đặc biệt lên đến <span>50%</span> cho lần đặt tour đầu tiên</h2>
      <p>Đăng ký nhận mã khuyến mãi và cập nhật các chương trình giảm giá mới nhất.</p>
      <form class="newsletter" onsubmit="return false;">
        <input type="email" placeholder="Nhập email của bạn" />
        <button class="btn btn-light">Đăng ký ngay</button>
      </form>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a href="/" class="logo logo-light">
        <span class="logo-icon">✈</span>
        <span>Tour<strong>DuLich</strong></span>
      </a>
      <p>Công ty du lịch hàng đầu Việt Nam.</p>
    </div>
    <div class="footer-col">
      <h4>Về chúng tôi</h4>
      <a href="tranglienhe.html" onclick="window.location.href='tranglienhe.html'; return false;">Liên hệ</a>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container"><p>© 2026 TourDuLich. Bảo lưu mọi quyền.</p></div>
  </div>
</footer>
`

// ==========================================
// 5. KHỞI TẠO SỰ KIỆN TƯƠNG TÁC CHUNG
// ==========================================

const featuredTours = document.querySelector('#featuredTours');
featuredTours?.addEventListener('click', (event) => {
  const favBtn = event.target.closest('.btn-favorite');
  if (favBtn) {
    event.stopPropagation();
    const tourId = favBtn.dataset.id;
    let favs = getFavorites();
    
    if (favs.includes(tourId)) {
       favs = favs.filter(id => id !== tourId);
       favBtn.style.color = '#ccc';
    } else {
       favs.push(tourId);
       favBtn.style.color = 'red';
    }
    localStorage.setItem('tourdulich_favorites', JSON.stringify(favs));
    return;
  }

  const card = event.target.closest('.tour-card');
  if (!card) return;

  const selectedTour = toursList.find((tour) => String(tour.id) === String(card.dataset.id));
  if (selectedTour) openTourDetail(selectedTour);
});

const closeButton = document.querySelector('#closeTourDetail');
closeButton?.addEventListener('click', closeTourDetail);
document.querySelector('#tourDetailModal')?.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) closeTourDetail();
});

const btnSearch = document.querySelector('.btn-search');
btnSearch?.addEventListener('click', (e) => {
    e.preventDefault();
    const keyword = document.querySelector('#dest').value.toLowerCase().trim();
    
    const filtered = toursList.filter(t => 
        t.name.toLowerCase().includes(keyword) || 
        (t.type && t.type.toLowerCase().includes(keyword)) ||
        (t.category && t.category.toLowerCase().includes(keyword))
    );
    
    renderTourCards(filtered);
    featuredTours.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ==========================================
// 6. LOGIC XỬ LÝ ĐẶT TOUR
// ==========================================
const btnBookTour = document.querySelector('#btnBookTour');
const bookingModal = document.querySelector('#bookingModal');
const closeBookingBtn = document.querySelector('#closeBookingModal');
const bookingForm = document.querySelector('#bookingForm');
const bookingTourNameEl = document.querySelector('#bookingTourName');
const guestCountInput = document.querySelector('#guestCount');
const dateInput = document.querySelector('#departureDate');
const totalPriceDisplay = document.querySelector('#totalPriceDisplay');

let currentTourPrice = 0;

btnBookTour?.addEventListener('click', () => {
    const tourName = document.querySelector('#tourDetailName').textContent;
    const priceText = document.querySelector('#tourDetailPrice').textContent;
    currentTourPrice = parseInt(priceText.replace(/\D/g, '')) || 0; 
    
    bookingTourNameEl.textContent = tourName;
    
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
    guestCountInput.value = 1; 
    updateTotalPrice(); 
    
    closeTourDetail();
    bookingModal.classList.add('show');
    bookingModal.setAttribute('aria-hidden', 'false');
});

const updateTotalPrice = () => {
    let count = parseInt(guestCountInput.value);
    if (isNaN(count) || count < 1) count = 0;
    const total = currentTourPrice * count;
    totalPriceDisplay.textContent = formatCurrency(total);
};
guestCountInput?.addEventListener('input', updateTotalPrice);

const closeBookingModal = () => {
    bookingModal.classList.remove('show');
    bookingModal.setAttribute('aria-hidden', 'true');
    bookingForm.reset(); 
    document.querySelectorAll('[id^="err"]').forEach(el => el.style.display = 'none');
};
closeBookingBtn?.addEventListener('click', closeBookingModal);
bookingModal?.addEventListener('click', (event) => {
  if (event.target === bookingModal) closeBookingModal();
});

bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    const name = document.querySelector('#guestName').value.trim();
    const phone = document.querySelector('#guestPhone').value.trim();
    const email = document.querySelector('#guestEmail').value.trim();
    const count = parseInt(guestCountInput.value);
    const date = dateInput.value;

    document.querySelectorAll('[id^="err"]').forEach(el => el.style.display = 'none');

    if (name.length < 2) {
        document.querySelector('#errName').style.display = 'block';
        isValid = false;
    }
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!phoneRegex.test(phone)) {
        document.querySelector('#errPhone').style.display = 'block';
        isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.querySelector('#errEmail').style.display = 'block';
        isValid = false;
    }
    if (isNaN(count) || count < 1) {
        document.querySelector('#errCount').style.display = 'block';
        isValid = false;
    }
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    if (!date || selectedDate < today) {
        document.querySelector('#errDate').style.display = 'block';
        isValid = false;
    }

    if (!isValid) return;

    const finalTotal = currentTourPrice * count;
    
    const confirmMessage = `XÁC NHẬN THÔNG TIN ĐẶT TOUR:
- Tên tour: ${bookingTourNameEl.textContent}
- Khách hàng: ${name}
- Số lượng: ${count} người
- Tổng thanh toán: ${formatCurrency(finalTotal)}

Bạn có chắc chắn muốn tiến hành đặt tour này không?`;
    
    if (!window.confirm(confirmMessage)) return;

    const BOOKING_KEY = 'tourdulich_bookings'; 
    const bookings = JSON.parse(localStorage.getItem(BOOKING_KEY) || '[]');
    
    bookings.push({
        id: 'bk-' + Date.now(),
        guestName: name,
        phone: phone,
        email: email,
        guestCount: count,
        tourName: bookingTourNameEl.textContent,
        travelDate: date,
        totalPrice: finalTotal,
        status: 'pending' 
    });
    
    localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings));
    alert(`🎉 Đặt tour thành công!\nCảm ơn ${name}, đơn của bạn đã được ghi nhận. Vui lòng xem ở mục Đơn Hàng.`);
    closeBookingModal();
});

// ==========================================
// 7. LOGIC ĐĂNG KÝ / ĐĂNG NHẬP (LƯU LOCALSTORAGE)
// ==========================================
const btnLogin = document.querySelector('#btnLogin');
const authModal = document.querySelector('#authModal');
const closeAuthModalBtn = document.querySelector('#closeAuthModal');
const authForm = document.querySelector('#authForm');
const authTitle = document.querySelector('#authTitle');
const registerNameGroup = document.querySelector('#registerNameGroup');
const btnAuthSubmit = document.querySelector('#btnAuthSubmit');
const authSwitchText = document.querySelector('#authSwitchText');
const authSwitchLink = document.querySelector('#authSwitchLink');

let isLoginMode = true; // Biến cờ: true = Đăng nhập, false = Đăng ký

const checkLoginStatus = () => {
    const activeUser = JSON.parse(localStorage.getItem('tourdulich_active_user'));
    if (activeUser) {
        btnLogin.textContent = "Đăng xuất";
        btnLogin.style.backgroundColor = "#ef4444";
        btnLogin.style.borderColor = "#ef4444";
    } else {
        btnLogin.textContent = "Đăng nhập";
        btnLogin.style.backgroundColor = "";
        btnLogin.style.borderColor = "";
    }
};

if (btnLogin) checkLoginStatus();

btnLogin?.addEventListener('click', () => {
    const activeUser = JSON.parse(localStorage.getItem('tourdulich_active_user'));
    
    if (activeUser) {
        if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
            localStorage.removeItem('tourdulich_active_user');
            checkLoginStatus();
        }
    } else {
        authModal.classList.add('show');
        authModal.setAttribute('aria-hidden', 'false');
    }
});

const closeAuthModal = () => {
    authModal.classList.remove('show');
    authModal.setAttribute('aria-hidden', 'true');
    authForm?.reset();
};
closeAuthModalBtn?.addEventListener('click', closeAuthModal);
authModal?.addEventListener('click', (event) => {
    if (event.target === authModal) closeAuthModal();
});

// Xử lý chuyển đổi giữa Đăng ký và Đăng nhập
authSwitchLink?.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    
    if (isLoginMode) {
        authTitle.textContent = "Đăng nhập";
        registerNameGroup.style.display = "none";
        btnAuthSubmit.textContent = "Đăng nhập";
        authSwitchText.textContent = "Chưa có tài khoản?";
        authSwitchLink.textContent = "Đăng ký ngay";
    } else {
        authTitle.textContent = "Đăng ký tài khoản";
        registerNameGroup.style.display = "block";
        btnAuthSubmit.textContent = "Đăng ký";
        authSwitchText.textContent = "Đã có tài khoản?";
        authSwitchLink.textContent = "Đăng nhập";
    }
});

// Xử lý Submit Form Authentication
authForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#authName').value.trim();
    const email = document.querySelector('#authEmail').value.trim();
    const password = document.querySelector('#authPassword').value.trim();
    
    if (email === "" || password === "") {
        alert("Vui lòng nhập Email và Mật khẩu!");
        return;
    }

    const USERS_KEY = 'tourdulich_users';
    let users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    if (isLoginMode) {
        // Xử lý Đăng nhập
        const matchedUser = users.find(u => u.email === email && u.password === password);
        if (matchedUser) {
            localStorage.setItem('tourdulich_active_user', JSON.stringify(matchedUser));
            alert(`🎉 Chào mừng trở lại, ${matchedUser.name || email}!`);
            checkLoginStatus();
            closeAuthModal();
        } else {
            alert("Sai thông tin đăng nhập hoặc tài khoản không tồn tại!");
        }
    } else {
        // Xử lý Đăng ký
        const userExists = users.some(u => u.email === email);
        if (userExists) {
            alert("Email này đã được đăng ký, vui lòng sử dụng email khác hoặc Đăng nhập!");
            return;
        }
        
        const newUser = { name: name || 'Người dùng', email, password };
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        
        alert("✅ Đăng ký thành công! Bạn có thể tiến hành đăng nhập ngay.");
        // Tự động chuyển về giao diện đăng nhập
        authSwitchLink.click();
    }
});

// ==========================================
// 8. LOGIC CHẠY SLIDER HERO BANNER
// ==========================================
const initHeroSlider = () => {
  const slides = document.querySelectorAll('.hero-slides .slide');
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4000); 
};
initHeroSlider();

// 9. Khởi chạy ứng dụng (Fetch data)
fetchTours();
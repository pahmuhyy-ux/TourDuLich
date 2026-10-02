import './style.css'

// 1. Đồng bộ key với trang Admin
const STORAGE_KEY = 'tourdulich_tours'
const img = (id) => `https://picsum.photos/seed/${id}/1200/800`

const defaultTours = [
  { id: 1, code: 'TO-1023', name: 'Hạ Long 3N2Đ', type: 'Biển đảo', date: '2026-10-12', price: 4490000, status: 'open' },
  { id: 2, code: 'TO-1129', name: 'Đà Nẵng - Hội An', type: 'Miền Trung', date: '2026-10-18', price: 5890000, status: 'pending' },
  { id: 3, code: 'TO-1155', name: 'Phú Quốc 4N3Đ', type: 'Biển đảo', date: '2026-11-02', price: 6790000, status: 'open' },
  { id: 4, code: 'TO-1194', name: 'Sapa - Fansipan', type: 'Núi rừng', date: '2026-11-15', price: 5290000, status: 'closed' },
  { id: 5, code: 'TO-1218', name: 'Ninh Bình - Tràng An', type: 'Miền Bắc', date: '2026-10-26', price: 3890000, status: 'open' },
  { id: 6, code: 'TO-1282', name: 'Cần Thơ - Châu Đốc', type: 'Miền Nam', date: '2026-12-03', price: 4590000, status: 'pending' }
]

// 2. Hàm loadTours ưu tiên đọc trực tiếp từ Admin (LocalStorage)
const loadTours = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed // Lấy danh sách mới nhất từ Admin thêm vào
      }
    }
    return [...defaultTours]
  } catch {
    return [...defaultTours]
  }
}

const statusLabel = { open: 'Đang mở', pending: 'Chờ duyệt', closed: 'Đã đóng' }
const tours = loadTours()
const formatCurrency = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value)

// 3. Hàm render tương thích hoàn toàn với cả tour cũ và tour Admin
const renderTourCards = (dataToRender = tours) => {
  const container = document.querySelector('#featuredTours')
  if (!container) return

  if (dataToRender.length === 0) {
      container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 20px;">Không tìm thấy tour phù hợp.</p>`
      return
  }

  container.innerHTML = dataToRender
    .map((tour) => {
      const tourCode = tour.code || `TO-${String(tour.id).slice(-4).toUpperCase()}`
      const tourType = tour.type || tour.category || 'Chưa phân loại'
      const tourDays = tour.date ? new Date(tour.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) : (tour.duration || 'Liên hệ')
      const tourImg = tour.image || img(tourCode || tour.name)
      const oldPrice = tour.oldPrice || Math.round(tour.price * 1.12)

      return `
      <article class="card tour-card is-clickable" data-id="${tour.id}" tabindex="0" role="button" aria-label="Xem chi tiết ${tour.name}">
        <div class="tour-media">
          <img src="${tourImg}" alt="${tour.name}" />
          <span class="badge">${tourType}</span>
          <span class="days">${tourDays}</span>
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

// 4. Giao diện trang chủ
document.querySelector('#app').innerHTML = `
<header class="header">
  <div class="container header-inner">
    <a href="/" class="logo">
      <span class="logo-icon">✈</span>
      <span>Tour<strong>DuLich</strong></span>
    </a>
    <nav class="nav">
      <a href="/" class="nav-link active">Trang chủ</a>
      <a href="#featuredTours" class="nav-link">Tour</a>
      <a href="tranglienhe.html" onclick="window.location.href='tranglienhe.html'; return false;" class="nav-link">Liên hệ</a>
    </nav>
    <div class="header-actions">
      <a href="admin.html" onclick="window.location.href='admin.html'; return false;" style="margin-right: 15px; font-weight: bold; color: #f97316; text-decoration: none;">Admin</a>
      <button class="btn btn-primary" id="btnLogin">Đăng nhập</button>
    </div>
  </div>
</header>

<section class="hero">
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
      <p class="section-label">TOUR NỔI BẬT</p>
      <h2 class="section-title">Tour du lịch được yêu thích nhất</h2>
      <p class="section-desc">Lựa chọn hoàn hảo cho kỳ nghỉ của bạn.</p>
    </div>
    <div id="featuredTours" class="grid tours"></div>
  </div>
</section>

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
// 5. KHỞI TẠO SỰ KIỆN TƯƠNG TÁC
// ==========================================

renderTourCards();

const featuredTours = document.querySelector('#featuredTours');

featuredTours?.addEventListener('click', (event) => {
  const card = event.target.closest('.tour-card');
  if (!card) return;

  const currentTours = loadTours();
  const selectedTour = currentTours.find((tour) => String(tour.id) === String(card.dataset.id));
  if (selectedTour) openTourDetail(selectedTour);
});

const btnBookTour = document.querySelector('#btnBookTour');
btnBookTour?.addEventListener('click', () => {
    const tourName = document.querySelector('#tourDetailName').textContent;
    const guestName = prompt(`Bạn đang đặt: ${tourName}\nVui lòng nhập Họ và Tên:`);
    if (!guestName) return;
    
    const phone = prompt("Vui lòng nhập Số điện thoại liên hệ:");
    if (!phone) return;

    const BOOKING_KEY = 'tourdulich_bookings'; 
    const bookings = JSON.parse(localStorage.getItem(BOOKING_KEY) || '[]');
    
    bookings.push({
        id: 'bk-' + Date.now(),
        guestName: guestName.trim(),
        phone: phone.trim(),
        tourName: tourName,
        travelDate: new Date().toLocaleDateString('vi-VN'),
        status: 'pending' 
    });
    
    localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings));
    alert(`🎉 Đặt tour thành công!\nCảm ơn ${guestName}, chúng tôi sẽ liên hệ sớm nhất.`);
    closeTourDetail();
});

const closeButton = document.querySelector('#closeTourDetail');
closeButton?.addEventListener('click', closeTourDetail);

document.querySelector('#tourDetailModal')?.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) closeTourDetail();
});

const btnSearch = document.querySelector('.btn-search');
btnSearch?.addEventListener('click', (e) => {
    e.preventDefault();
    const currentTours = loadTours();
    const keyword = document.querySelector('#dest').value.toLowerCase().trim();
    
    const filtered = currentTours.filter(t => 
        t.name.toLowerCase().includes(keyword) || 
        (t.type && t.type.toLowerCase().includes(keyword)) ||
        (t.category && t.category.toLowerCase().includes(keyword))
    );
    
    renderTourCards(filtered);
    featuredTours.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const btnLogin = document.querySelector('#btnLogin');
btnLogin?.addEventListener('click', () => {
    alert("Tính năng đăng nhập đang được phát triển!");
});
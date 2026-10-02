import './style.css'

const STORAGE_KEY = 'javanaangcao_tours'
const img = (id) => `https://picsum.photos/seed/${id}/1200/800`
const defaultTours = [
  { id: 1, code: 'TO-1023', name: 'Hạ Long 3N2Đ', type: 'Biển đảo', date: '2026-10-12', price: 4490000, status: 'open' },
  { id: 2, code: 'TO-1129', name: 'Đà Nẵng - Hội An', type: 'Miền Trung', date: '2026-10-18', price: 5890000, status: 'pending' },
  { id: 3, code: 'TO-1155', name: 'Phú Quốc 4N3Đ', type: 'Biển đảo', date: '2026-11-02', price: 6790000, status: 'open' },
  { id: 4, code: 'TO-1194', name: 'Sapa - Fansipan', type: 'Núi rừng', date: '2026-11-15', price: 5290000, status: 'closed' },
  { id: 5, code: 'TO-1218', name: 'Ninh Bình - Tràng An', type: 'Miền Bắc', date: '2026-10-26', price: 3890000, status: 'open' },
  { id: 6, code: 'TO-1282', name: 'Cần Thơ - Châu Đốc', type: 'Miền Nam', date: '2026-12-03', price: 4590000, status: 'pending' }
]

const loadTours = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return [...defaultTours]
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultTours]
  } catch {
    return [...defaultTours]
  }
}

const statusLabel = { open: 'Đang mở', pending: 'Chờ duyệt', closed: 'Đã đóng' }
const tours = loadTours()
const formatCurrency = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value)

const renderTourCards = () => {
  const container = document.querySelector('#featuredTours')
  if (!container) return

  container.innerHTML = tours
    .map((tour) => `
      <article class="card tour-card is-clickable" data-id="${tour.id}" tabindex="0" role="button" aria-label="Xem chi tiết ${tour.name}">
        <div class="tour-media">
          <img src="${img(tour.code || tour.name)}" alt="${tour.name}" />
          <span class="badge">${tour.type}</span>
          <span class="days">${new Date(tour.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}</span>
        </div>
        <div class="tour-body">
          <p class="tour-rating">★★★★★ <span>${statusLabel[tour.status] || 'Tour mới'}</span></p>
          <h3>${tour.name}</h3>
          <p class="tour-meta">${tour.code} • ${tour.type}</p>
          <div class="tour-foot">
            <div>
              <span class="price-old">${formatCurrency(Math.round(tour.price * 1.12))}</span>
              <span class="price">${formatCurrency(tour.price)}</span>
            </div>
            <button class="btn btn-primary btn-sm" type="button">Xem chi tiết</button>
          </div>
        </div>
      </article>
    `)
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

  detailType.textContent = tour.type
  detailName.textContent = tour.name
  detailMeta.textContent = `${tour.code} • ${tour.type}`
  detailDate.textContent = new Date(tour.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  detailPrice.textContent = formatCurrency(tour.price)
  detailOldPrice.textContent = formatCurrency(Math.round(tour.price * 1.12))
  detailStatus.textContent = statusLabel[tour.status] || 'Tour mới'
  detailImage.src = img(tour.code || tour.name)
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

document.querySelector('#app').innerHTML = `
<header class="header">
  <div class="container header-inner">
    <a href="#" class="logo">
      <span class="logo-icon">✈</span>
      <span>Tour<strong>DuLich</strong></span>
    </a>
    <nav class="nav">
      <a href="#" class="nav-link active">Trang chủ</a>
      <a href="#" class="nav-link">Địa điểm</a>
      <a href="#" class="nav-link">Tour</a>
      <a href="#" class="nav-link">Blog</a>
      <a href="#" class="nav-link">Liên hệ</a>
    </nav>
    <div class="header-actions">
      <button class="btn btn-primary">Đăng nhập</button>
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
        <div class="dest-info">
          <h3>Vịnh Hạ Long</h3>
          <p>Quảng Ninh • 120+ tour</p>
        </div>
      </a>
      <a href="#" class="card dest-card">
        <img src="${img('danang')}" alt="Đà Nẵng" />
        <div class="dest-info">
          <h3>Đà Nẵng</h3>
          <p>Miền Trung • 85 tour</p>
        </div>
      </a>
      <a href="#" class="card dest-card">
        <img src="${img('dalat')}" alt="Đà Lạt" />
        <div class="dest-info">
          <h3>Đà Lạt</h3>
          <p>Lâm Đồng • 60 tour</p>
        </div>
      </a>
      <a href="#" class="card dest-card">
        <img src="${img('hanoi')}" alt="Hà Nội" />
        <div class="dest-info">
          <h3>Hà Nội</h3>
          <p>Thủ đô • 95 tour</p>
        </div>
      </a>
      <a href="#" class="card dest-card">
        <img src="${img('phuquoc')}" alt="Phú Quốc" />
        <div class="dest-info">
          <h3>Phú Quốc</h3>
          <p>Kiên Giang • 50 tour</p>
        </div>
      </a>
      <a href="#" class="card dest-card">
        <img src="${img('nhatrang')}" alt="Nha Trang" />
        <div class="dest-info">
          <h3>Nha Trang</h3>
          <p>Khánh Hòa • 72 tour</p>
        </div>
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
        <div>
          <span>Ngày khởi hành</span>
          <strong id="tourDetailDate">--</strong>
        </div>
        <div>
          <span>Trạng thái</span>
          <strong id="tourDetailStatus">--</strong>
        </div>
      </div>
      <div class="tour-detail-footer">
        <div>
          <span class="price-old" id="tourDetailOldPrice">0đ</span>
          <span class="price" id="tourDetailPrice">0đ</span>
        </div>
        <button class="btn btn-primary" type="button">Đặt tour</button>
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
      <div class="card feature-card">
        <div class="feature-icon">💼</div>
        <h3>Giá tốt nhất</h3>
        <p>Cam kết giá cạnh tranh, không phát sinh chi phí ẩn trong suốt hành trình.</p>
      </div>
      <div class="card feature-card">
        <div class="feature-icon">🛡️</div>
        <h3>An toàn tuyệt đối</h3>
        <p>Bảo hiểm du lịch lên đến 100 triệu đồng cho mọi khách hàng.</p>
      </div>
      <div class="card feature-card">
        <div class="feature-icon">🧑‍✈️</div>
        <h3>Hướng dẫn viên chuyên nghiệp</h3>
        <p>Đội ngũ HDV giàu kinh nghiệm, thân thiện và am hiểu văn hóa bản địa.</p>
      </div>
      <div class="card feature-card">
        <div class="feature-icon">📞</div>
        <h3>Hỗ trợ 24/7</h3>
        <p>Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi.</p>
      </div>
      <div class="card feature-card">
        <div class="feature-icon">🗓️</div>
        <h3>Linh hoạt lịch trình</h3>
        <p>Dễ dàng tùy chỉnh lịch trình theo nhu cầu và sở thích của bạn.</p>
      </div>
      <div class="card feature-card">
        <div class="feature-icon">🗺️</div>
        <h3>Điểm đến đa dạng</h3>
        <p>Hơn 120 điểm đến trong nước và quốc tế cho mọi ngân sách.</p>
      </div>
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

<section class="section">
  <div class="container">
    <div class="section-head">
      <p class="section-label">ĐÁNH GIÁ KHÁCH HÀNG</p>
      <h2 class="section-title">Khách hàng nói gì về chúng tôi</h2>
    </div>
    <div class="grid testimonials">
      <div class="card testimonial-card">
        <div class="stars">★★★★★</div>
        <p>"Tour được tổ chức rất chuyên nghiệp, HDV nhiệt tình, lịch trình hợp lý. Gia đình mình rất hài lòng!"</p>
        <div class="testimonial-author">
          <div class="avatar">MT</div>
          <div>
            <strong>Minh Thư</strong>
            <span>Tour Nhật Bản</span>
          </div>
        </div>
      </div>
      <div class="card testimonial-card">
        <div class="stars">★★★★★</div>
        <p>"Giá cả hợp lý, không phát sinh chi phí. Khách sạn sạch sẽ, view đẹp. Sẽ tiếp tục sử dụng dịch vụ."</p>
        <div class="testimonial-author">
          <div class="avatar">HD</div>
          <div>
            <strong>Hoàng Đức</strong>
            <span>Tour Hà Nội</span>
          </div>
        </div>
      </div>
      <div class="card testimonial-card">
        <div class="stars">★★★★★</div>
        <p>"Từ khâu tư vấn đến lúc hoàn thành tour đều rất chu đáo. Đáng tin cậy, 10 điểm không có nhưng!"</p>
        <div class="testimonial-author">
          <div class="avatar">NT</div>
          <div>
            <strong>Ngọc Trâm</strong>
            <span>Tour Singapore</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a href="#" class="logo logo-light">
        <span class="logo-icon">✈</span>
        <span>Tour<strong>DuLich</strong></span>
      </a>
      <p>Công ty du lịch hàng đầu Việt Nam với hơn 15 năm kinh nghiệm tổ chức tour trong nước và quốc tế.</p>
      <div class="socials">
        <a href="#" title="Facebook">f</a>
        <a href="#" title="Instagram">◎</a>
        <a href="#" title="YouTube">▶</a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Tour phổ biến</h4>
      <a href="#">Tour châu Âu</a>
      <a href="#">Tour Nhật Bản</a>
      <a href="#">Tour Thái Lan</a>
      <a href="#">Tour Phú Quốc</a>
      <a href="#">Tour Hội An</a>
    </div>
    <div class="footer-col">
      <h4>Về chúng tôi</h4>
      <a href="#">Giới thiệu</a>
      <a href="#">Tuyển dụng</a>
      <a href="#">Tin tức</a>
      <a href="#">Chính sách bảo mật</a>
      <a href="#">Liên hệ</a>
    </div>
    <div class="footer-col footer-contact">
      <h4>Liên hệ</h4>
      <p>📍 123 Nguyễn Huệ, Q.1, TP.HCM</p>
      <p>📞 1900 1234</p>
      <p>✉️ info@tourdulich.vn</p>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <p>© 2026 TourDuLich. Bảo lưu mọi quyền.</p>
    </div>
  </div>
</footer>
`

renderTourCards()

const featuredTours = document.querySelector('#featuredTours')
featuredTours?.addEventListener('click', (event) => {
  const card = event.target.closest('.tour-card')
  if (!card) return

  const selectedTour = tours.find((tour) => Number(tour.id) === Number(card.dataset.id))
  if (selectedTour) openTourDetail(selectedTour)
})

const closeButton = document.querySelector('#closeTourDetail')
closeButton?.addEventListener('click', closeTourDetail)

document.querySelector('#tourDetailModal')?.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) closeTourDetail()
})

featuredTours?.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return
  const card = event.target.closest('.tour-card')
  if (!card) return
  event.preventDefault()
  const selectedTour = tours.find((tour) => Number(tour.id) === Number(card.dataset.id))
  if (selectedTour) openTourDetail(selectedTour)
})

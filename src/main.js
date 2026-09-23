import './style.css'

const img = (id) => `https://picsum.photos/seed/${id}/1200/800`

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
    <div class="grid tours">
      <div class="card tour-card">
        <div class="tour-media">
          <img src="${img('tour-malaysia')}" alt="Tour Malaysia - Singapore" />
          <span class="badge">Giảm 20%</span>
          <span class="days">5N4Đ</span>
        </div>
        <div class="tour-body">
          <p class="tour-rating">★★★★★ <span>4.9 (238 đánh giá)</span></p>
          <h3>Tour Malaysia – Singapore</h3>
          <p class="tour-meta">🇸🇬 Singapore • 🇲🇾 Malaysia</p>
          <div class="tour-foot">
            <div>
              <span class="price-old">12.500.000đ</span>
              <span class="price">10.000.000đ</span>
            </div>
            <button class="btn btn-primary btn-sm">Đặt ngay</button>
          </div>
        </div>
      </div>
      <div class="card tour-card">
        <div class="tour-media">
          <img src="${img('tour-japan')}" alt="Tour Nhật Bản" />
          <span class="badge badge-hot">Hot</span>
          <span class="days">6N5Đ</span>
        </div>
        <div class="tour-body">
          <p class="tour-rating">★★★★★ <span>4.8 (312 đánh giá)</span></p>
          <h3>Tour Nhật Bản – Tokyo, Osaka</h3>
          <p class="tour-meta">🇯🇵 Nhật Bản • Hoa anh đào</p>
          <div class="tour-foot">
            <div>
              <span class="price-old">28.900.000đ</span>
              <span class="price">25.400.000đ</span>
            </div>
            <button class="btn btn-primary btn-sm">Đặt ngay</button>
          </div>
        </div>
      </div>
      <div class="card tour-card">
        <div class="tour-media">
          <img src="${img('tour-europe')}" alt="Tour Châu Âu" />
          <span class="badge">Giảm 15%</span>
          <span class="days">9N8Đ</span>
        </div>
        <div class="tour-body">
          <p class="tour-rating">★★★★★ <span>4.9 (178 đánh giá)</span></p>
          <h3>Tour Châu Âu – Pháp, Ý, Thụy Sĩ</h3>
          <p class="tour-meta">🇫🇷 Pháp • 🇮🇹 Ý • 🇨🇭 Thụy Sĩ</p>
          <div class="tour-foot">
            <div>
              <span class="price-old">78.000.000đ</span>
              <span class="price">66.300.000đ</span>
            </div>
            <button class="btn btn-primary btn-sm">Đặt ngay</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

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
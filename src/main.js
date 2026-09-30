import './style.css'

// Nạp file chức năng vào (sử dụng dynamic import để đảm bảo HTML render xong mới chạy logic)
setTimeout(() => {
  import('./chucnang.js');
}, 100);

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

    <!-- BỔ SUNG: BỘ LỌC TOUR -->
    <div class="filter-section" style="display: flex; gap: 15px; margin-bottom: 30px; justify-content: center;">
        <select id="filterPrice" onchange="window.applyFilters()" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; outline: none; cursor: pointer;">
            <option value="all">Tất cả mức giá</option>
            <option value="under2">Dưới 2.000.000đ</option>
            <option value="2to5">Từ 2 - 5.000.000đ</option>
            <option value="over5">Trên 5.000.000đ</option>
        </select>

        <select id="filterDays" onchange="window.applyFilters()" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; outline: none; cursor: pointer;">
            <option value="all">Tất cả số ngày</option>
            <option value="short">Ngắn ngày (1 - 2 ngày)</option>
            <option value="medium">Vừa (3 - 4 ngày)</option>
            <option value="long">Dài ngày (5 ngày trở lên)</option>
        </select>

        <select id="sortPrice" onchange="window.applyFilters()" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; outline: none; cursor: pointer;">
            <option value="default">Sắp xếp mặc định</option>
            <option value="asc">Giá: Thấp đến Cao</option>
            <option value="desc">Giá: Cao đến Thấp</option>
        </select>
    </div>

    <!-- BỔ SUNG: THÊM ID tourList ĐỂ JAVASCRIPT GẮN DỮ LIỆU -->
    <div id="tourList" class="grid tours">
      <!-- File chucnang.js sẽ tự động điền các tour vào đây -->
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

<!-- BỔ SUNG: MODAL ĐẶT TOUR ẨN BÊN DƯỚI -->
<div id="bookingModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 1000; justify-content: center; align-items: center;">
    <div style="background: white; padding: 25px; border-radius: 8px; width: 90%; max-width: 500px; position: relative;">
        <span onclick="window.closeModal()" style="position: absolute; top: 15px; right: 20px; font-size: 24px; cursor: pointer; font-weight: bold; color: #333;">&times;</span>
        <h2 style="margin-top:0; color: #3b82f6;">Xác nhận đặt tour</h2>
        
        <h3 id="modalTourName" style="color: #1e293b; margin: 10px 0;"></h3>
        <p style="margin:0 0 15px 0;">Giá vé: <span id="modalTourPrice" style="color: #f97316; font-weight: bold; font-size: 18px;"></span> / người</p>
        
        <div style="margin-top: 15px;">
            <div style="margin-bottom: 10px;">
                <label style="display: block; font-weight: bold; margin-bottom: 5px;">Họ và Tên:</label>
                <input type="text" id="cusName" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" placeholder="Nhập họ tên đầy đủ...">
                <span id="errName" style="color: red; font-size: 13px; display: block;"></span>
            </div>
            <div style="margin-bottom: 10px;">
                <label style="display: block; font-weight: bold; margin-bottom: 5px;">Số điện thoại:</label>
                <input type="text" id="cusPhone" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" placeholder="Ví dụ: 0912345678">
                <span id="errPhone" style="color: red; font-size: 13px; display: block;"></span>
            </div>
            <div style="margin-bottom: 10px;">
                <label style="display: block; font-weight: bold; margin-bottom: 5px;">Email:</label>
                <input type="email" id="cusEmail" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" placeholder="abc@gmail.com">
                <span id="errEmail" style="color: red; font-size: 13px; display: block;"></span>
            </div>
            <div style="margin-bottom: 10px;">
                <label style="display: block; font-weight: bold; margin-bottom: 5px;">Ngày khởi hành:</label>
                <input type="date" id="cusDate" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                <span id="errDate" style="color: red; font-size: 13px; display: block;"></span>
            </div>
            <div style="margin-bottom: 10px;">
                <label style="display: block; font-weight: bold; margin-bottom: 5px;">Số lượng người:</label>
                <input type="number" id="cusQty" oninput="window.calcTotal()" value="1" min="1" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                <span id="errQty" style="color: red; font-size: 13px; display: block;"></span>
            </div>
        </div>

        <div style="text-align: right; margin: 15px 0; font-size: 18px;">
            Tổng tiền: <span id="totalPrice" style="color: #f97316; font-weight: bold; font-size: 22px;">0đ</span>
        </div>

        <button onclick="window.submitBooking()" style="width: 100%; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 16px;">Xác nhận đặt ngay</button>
    </div>
</div>
`
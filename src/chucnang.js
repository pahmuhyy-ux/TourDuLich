// ==========================================
// 1. DỮ LIỆU MẪU (MOCK DATA) & BIẾN TOÀN CỤC
// ==========================================
const tours = [
    
    {
        id: 1, name: "Khám phá Vịnh Hạ Long", location: "Hạ Long", days: 2, price: 1800000, img: "halong1", featured: true,
        depart: "Hà Nội", vehicle: "Ô tô, Du thuyền 5 sao",
        inc: ["Xe đưa đón", "Ăn 3 bữa", "Vé tham quan", "HDV"], exc: ["Đồ uống cá nhân", "Tiền tip", "VAT"],
        schedule: [
            { day: 1, desc: "Hà Nội - Vịnh Hạ Long: Nhận phòng du thuyền, chèo Kayak, ngắm hoàng hôn." },
            { day: 2, desc: "Hạ Long - Hà Nội: Khám phá hang Sửng Sốt, tắm biển Ti Tốp, về lại Hà Nội." }
        ]
    },
    {
        id: 2, name: "Thiên đường Đà Nẵng - Hội An", location: "Đà Nẵng", days: 3, price: 3500000, img: "danang1", featured: true,
        depart: "TP.HCM / Hà Nội", vehicle: "Máy bay, Ô tô",
        inc: ["Khách sạn 4 sao", "Vé Bà Nà Hills", "Ăn sáng buffet"], exc: ["Vé máy bay khứ hồi", "Chi phí cá nhân"],
        schedule: [
            { day: 1, desc: "Đón sân bay - Bán đảo Sơn Trà - Nhận phòng." },
            { day: 2, desc: "Vui chơi tại Bà Nà Hills - Chiều đi phố cổ Hội An." },
            { day: 3, desc: "Mua sắm đặc sản - Tiễn sân bay." }
        ]
    },
    {
        id: 3, name: "Thành phố mộng mơ Đà Lạt", location: "Đà Lạt", days: 4, price: 2800000, img: "dalat1", featured: false,
        depart: "TP.HCM", vehicle: "Xe giường nằm cao cấp",
        inc: ["Xe di chuyển", "Khách sạn 3 sao", "Vé tham quan"], exc: ["Bữa ăn chính", "VAT"],
        schedule: [
            { day: 1, desc: "Khởi hành từ TP.HCM đi Đà Lạt vào ban đêm." },
            { day: 2, desc: "Tham quan Quảng trường Lâm Viên, Thung lũng Tình Yêu." },
            { day: 3, desc: "Chinh phục đỉnh Langbiang, giao lưu cồng chiêng." },
            { day: 4, desc: "Mua sắm chợ Đà Lạt - Trở về TP.HCM." }
        ]
    },
    {
        id: 4, name: "Tuyệt tình cốc Ninh Bình", location: "Ninh Bình", days: 1, price: 950000, img: "ninhbinh", featured: false,
        depart: "Hà Nội", vehicle: "Xe Limousine",
        inc: ["Xe Limousine đưa đón", "Ăn trưa đặc sản", "Vé đò Tràng An"], exc: ["Chi phí mua sắm"],
        schedule: [
            { day: 1, desc: "Sáng: Tham quan Bái Đính. Trưa: Ăn thịt dê. Chiều: Đi đò Tràng An, đạp xe. Tối: Về Hà Nội." }
        ]
    },
    {
        id: 5, name: "Nghỉ dưỡng đảo ngọc Phú Quốc", location: "Phú Quốc", days: 5, price: 6500000, img: "phuquoc1", featured: true,
        depart: "Hà Nội", vehicle: "Máy bay, Ô tô",
        inc: ["Resort 5 sao", "Vé Safari", "Ăn 3 bữa/ngày"], exc: ["Vé máy bay", "Spa"],
        schedule: [
            { day: 1, desc: "Đón sân bay - Nhận phòng Resort." },
            { day: 2, desc: "Khám phá Nam Đảo - Câu cá, lặn ngắm san hô." },
            { day: 3, desc: "Vui chơi tại VinWonders & Safari." },
            { day: 4, desc: "Tự do tắm biển, tham quan chợ đêm." },
            { day: 5, desc: "Mua đặc sản - Ra sân bay về lại Hà Nội." }
        ]
    }
];

let currentTour = null; // Lưu tour đang được chọn để đặt
window.searchParams = { date: '', guests: 2 }; // Biến toàn cục lưu trữ tùy chọn tìm kiếm tạm thời từ banner
// ==========================================
// TỰ ĐỘNG GENERATE THÊM 120 TOUR (20 tour / địa điểm)
// ==========================================
const locationList = ["Hạ Long", "Đà Nẵng", "Đà Lạt", "Hà Nội", "Phú Quốc", "Nha Trang"];
const adjectives = ["Khám phá", "Trải nghiệm", "Kỳ nghỉ dưỡng", "Hành trình vi vu", "Tour VIP", "Check-in"];

let autoId = 10; // Bắt đầu ID từ 10 để không trùng với các tour cũ
locationList.forEach(loc => {
    for (let i = 1; i <= 20; i++) {
        // Random từ 2 - 5 ngày
        const randomDays = Math.floor(Math.random() * 4) + 2; 
        // Random giá từ 1.500.000đ - 6.500.000đ
        const randomPrice = (Math.floor(Math.random() * 50) + 15) * 100000; 

        tours.push({
            id: autoId++,
            name: `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${loc} - Tuyến ${i}`,
            location: loc,
            days: randomDays,
            price: randomPrice,
            img: `tour${loc.replace(/\s/g, '').toLowerCase()}${i}`, // Random seed ảnh theo tên địa điểm
            featured: i <= 2, // Lấy 2 tour đầu tiên của mỗi địa điểm làm "Tour nổi bật"
            depart: "TP.HCM / Hà Nội", 
            vehicle: "Máy bay, Ô tô cao cấp",
            inc: ["Xe đưa đón tận nơi", "Khách sạn tiêu chuẩn", "Ăn các bữa theo lịch trình", "Hướng dẫn viên nhiệt tình"], 
            exc: ["Chi phí mua sắm cá nhân", "Tiền Tip cho HDV", "VAT"],
            schedule: [
                { day: 1, desc: `Sáng: Khởi hành đến ${loc}. Chiều: Tự do khám phá, nhận phòng khách sạn. Tối: Ăn đặc sản địa phương.` },
                { day: 2, desc: `Trải nghiệm các danh lam thắng cảnh nổi bật nhất tại ${loc}. Tham gia các hoạt động vui chơi giải trí.` }
            ]
        });
    }
});

// ==========================================
// 2. RENDER DANH SÁCH TOUR
// ==========================================
// ==========================================
// RENDER DANH SÁCH TOUR (ĐÃ FIX MÀU CHỮ DỄ ĐỌC)
// ==========================================
function renderTours(data) {
    const tourList = document.getElementById('tourList');
    if (!tourList) return;

    if (data.length === 0) {
        tourList.innerHTML = `<p style="text-align:center; width:100%; grid-column: 1/-1;">Không tìm thấy tour phù hợp.</p>`;
        return;
    }

    tourList.innerHTML = data.map(tour => `
        <div class="card dest-card" style="display:flex; flex-direction:column; overflow:hidden; background:#1e293b; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.2); position:relative;">
            <img src="https://picsum.photos/seed/${tour.img}/1200/800" alt="${tour.name}" style="width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; z-index:0;" />
            
            <!-- Phủ một lớp gradient đen mờ để chữ đè lên không bao giờ bị chìm -->
            <div style="position:absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%); z-index:1;"></div>

            <div class="dest-info" style="padding: 15px; display:flex; flex-direction:column; flex:1; position:relative; z-index:2; justify-content: flex-end; min-height: 220px;">
                <!-- CHỮ MÀU TRẮNG VÀ CÓ BÓNG ĐỔ -->
                <h3 style="font-size: 19px; margin-bottom: 5px; color:#ffffff; font-weight: bold; text-shadow: 1px 1px 3px rgba(0,0,0,0.8);">${tour.name}</h3>
                <p style="color: #cbd5e1; font-size: 14px; margin-bottom: 5px; text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">📍 ${tour.location} | ⏱ ${tour.days} ngày</p>
                <p style="color: #fbbf24; font-weight: bold; font-size: 20px; margin: 10px 0 15px 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">${tour.price.toLocaleString('vi-VN')} đ</p>
                
                <div style="display: flex; gap: 10px;">
                    <button onclick="window.viewTourDetail(${tour.id})" style="flex:1; padding:10px; cursor:pointer; background:rgba(255,255,255,0.9); color:#0284c7; border:none; border-radius:4px; font-weight:bold;">Chi tiết</button>
                    <button onclick="window.openModal(${tour.id})" style="flex:1; padding:10px; cursor:pointer; background:#3b82f6; color:white; border:none; border-radius:4px; font-weight:bold;">Đặt ngay</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Khởi tạo hiển thị ban đầu
renderTours(tours);


// ==========================================
// 3. TÌM KIẾM, LỌC VÀ SẮP XẾP
// ==========================================
window.applyFilters = () => {
    let filtered = [...tours];

    const searchVal = document.getElementById('dest') ? document.getElementById('dest').value.toLowerCase().trim() : '';
    const filterPrice = document.getElementById('filterPrice').value;
    const filterDays = document.getElementById('filterDays').value;
    const sortPrice = document.getElementById('sortPrice').value;

    // Lọc theo tên hoặc địa điểm
    if (searchVal) {
        filtered = filtered.filter(t => t.name.toLowerCase().includes(searchVal) || t.location.toLowerCase().includes(searchVal));
    }
    // Lọc theo giá
    if (filterPrice === 'under2') filtered = filtered.filter(t => t.price < 2000000);
    else if (filterPrice === '2to5') filtered = filtered.filter(t => t.price >= 2000000 && t.price <= 5000000);
    else if (filterPrice === 'over5') filtered = filtered.filter(t => t.price > 5000000);
    // Lọc theo số ngày
    if (filterDays === 'short') filtered = filtered.filter(t => t.days <= 2);
    else if (filterDays === 'medium') filtered = filtered.filter(t => t.days >= 3 && t.days <= 4);
    else if (filterDays === 'long') filtered = filtered.filter(t => t.days >= 5);
    // Sắp xếp
    if (sortPrice === 'asc') filtered.sort((a, b) => a.price - b.price);
    else if (sortPrice === 'desc') filtered.sort((a, b) => b.price - a.price);

    renderTours(filtered);
};

// Gắn sự kiện cho nút tìm kiếm ở Banner Hero[cite: 1]
document.querySelector('.btn-search').addEventListener('click', (e) => {
    e.preventDefault();
    
    // 1. Lấy dữ liệu từ giao diện Hero
    const destValue = document.getElementById('dest').value.toLowerCase().trim();
    const dateValue = document.getElementById('date').value;
    const guestsText = document.getElementById('guests').value;
    const guestsValue = parseInt(guestsText) || 1; 

    // 2. Lưu lại để tự động điền vào Modal Đặt Tour sau này
    window.searchParams = {
        date: dateValue,
        guests: guestsValue
    };

    // 3. Tiến hành lọc
    let filtered = [...tours];
    if (destValue) {
        filtered = filtered.filter(t => 
            t.name.toLowerCase().includes(destValue) || 
            t.location.toLowerCase().includes(destValue)
        );
    }
    renderTours(filtered);

    // 4. Cuộn màn hình xuống danh sách tour
    const tourSection = document.getElementById('tourList').closest('.section');
    if(tourSection) {
        tourSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});


// ==========================================
// 4. TRANG CHI TIẾT TOUR
// ==========================================
window.viewTourDetail = (id) => {
    const tour = tours.find(t => t.id === id);
    if (!tour) return;

    const detailHtml = `
        <div id="tourDetailModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: white; z-index: 2000; overflow-y: auto; padding-bottom: 50px;">
            <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
                <span onclick="document.getElementById('tourDetailModal').remove()" style="font-size: 30px; cursor: pointer; float:right;">&times;</span>
                
                <h1 style="color: #2563eb; margin-top:20px;">${tour.name}</h1>
                <img src="https://picsum.photos/seed/${tour.img}/1200/800" style="width:100%; height:400px; object-fit:cover; border-radius:10px; margin: 20px 0;">
                
                <div style="display:flex; justify-content: space-between; background:#f8fafc; padding:20px; border-radius:8px;">
                    <div>
                        <p><strong>📍 Điểm đến:</strong> ${tour.location}</p>
                        <p><strong>🛫 Khởi hành từ:</strong> ${tour.depart}</p>
                        <p><strong>⏱ Thời gian:</strong> ${tour.days} ngày</p>
                        <p><strong>🚌 Phương tiện:</strong> ${tour.vehicle}</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="color: #f97316; font-size: 24px; font-weight: bold; margin-bottom: 10px;">${tour.price.toLocaleString('vi-VN')} đ</p>
                        <button onclick="window.openModal(${tour.id})" style="padding:10px 25px; background:#f97316; color:white; border:none; border-radius:5px; font-size:16px; font-weight:bold; cursor:pointer;">ĐẶT TOUR NGAY</button>
                    </div>
                </div>

                <div style="display: flex; gap: 20px; margin-top: 30px;">
                    <div style="flex:1;">
                        <h3 style="color:#16a34a;">✅ Dịch vụ bao gồm</h3>
                        <ul style="line-height: 1.8; padding-left: 20px;">
                            ${tour.inc.map(i => `<li>${i}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="flex:1;">
                        <h3 style="color:#dc2626;">❌ Không bao gồm</h3>
                        <ul style="line-height: 1.8; padding-left: 20px;">
                            ${tour.exc.map(i => `<li>${i}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <h3 style="margin-top: 30px; border-bottom: 2px solid #e2e8f0; padding-bottom:10px;">Lịch trình chi tiết</h3>
                <div>
                    ${tour.schedule.map(s => `
                        <div style="margin-top: 15px;">
                            <strong style="color: #2563eb;">Ngày ${s.day}:</strong>${s.desc}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', detailHtml);
};


// ==========================================
// 5. ĐẶT TOUR & VALIDATION
// ==========================================
window.openModal = (id) => {
    currentTour = tours.find(t => t.id === id);
    if (!currentTour) return;

    // Đóng popup chi tiết tour nếu đang mở (tránh kẹt z-index)
    const detailModal = document.getElementById('tourDetailModal');
    if (detailModal) detailModal.remove();

    // Hiển thị thông tin
    document.getElementById('modalTourName').innerText = currentTour.name;
    document.getElementById('modalTourPrice').innerText = currentTour.price.toLocaleString('vi-VN') + ' đ';
    
    // Reset Form & Tự động điền dữ liệu tìm kiếm
    document.getElementById('cusName').value = '';
    document.getElementById('cusPhone').value = '';
    document.getElementById('cusEmail').value = '';
    document.getElementById('cusDate').value = window.searchParams.date || '';
    document.getElementById('cusQty').value = window.searchParams.guests || 1;
    
    clearErrors();
    window.calcTotal();

    // Hiện Modal & đẩy z-index lên 3000
    const bookingModal = document.getElementById('bookingModal');
    bookingModal.style.zIndex = "3000"; 
    bookingModal.style.display = 'flex';
};

window.closeModal = () => {
    document.getElementById('bookingModal').style.display = 'none';
    currentTour = null;
};

window.calcTotal = () => {
    if (!currentTour) return;
    let qty = parseInt(document.getElementById('cusQty').value) || 0;
    if (qty < 1) qty = 1;
    const total = currentTour.price * qty;
    document.getElementById('totalPrice').innerText = total.toLocaleString('vi-VN') + ' đ';
};

function clearErrors() {
    ['errName', 'errPhone', 'errEmail', 'errDate', 'errQty'].forEach(id => {
        document.getElementById(id).innerText = '';
    });
}

window.submitBooking = () => {
    clearErrors();
    let isValid = true;

    const name = document.getElementById('cusName').value.trim();
    const phone = document.getElementById('cusPhone').value.trim();
    const email = document.getElementById('cusEmail').value.trim();
    const dateStr = document.getElementById('cusDate').value;
    const qty = parseInt(document.getElementById('cusQty').value);

    if (name === '') {
        document.getElementById('errName').innerText = '* Vui lòng nhập họ tên đầy đủ.';
        isValid = false;
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('errPhone').innerText = '* Số điện thoại không hợp lệ.';
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('errEmail').innerText = '* Địa chỉ email không hợp lệ.';
        isValid = false;
    }

    if (dateStr === '') {
        document.getElementById('errDate').innerText = '* Vui lòng chọn ngày khởi hành.';
        isValid = false;
    } else {
        const selectedDate = new Date(dateStr);
        selectedDate.setHours(0,0,0,0);
        const today = new Date();
        today.setHours(0,0,0,0);
        
        if (selectedDate < today) {
            document.getElementById('errDate').innerText = '* Ngày khởi hành không được là ngày trong quá khứ.';
            isValid = false;
        }
    }

    if (isNaN(qty) || qty < 1) {
        document.getElementById('errQty').innerText = '* Số người tối thiểu là 1.';
        isValid = false;
    }

    if (isValid) {
        const total = (currentTour.price * qty).toLocaleString('vi-VN');
        alert(`Chúc mừng ${name}!\nBạn đã đặt thành công tour: ${currentTour.name}.\nNgày đi: ${dateStr}\nSố người: ${qty}\nTổng thanh toán: ${total} đ\n\nChúng tôi sẽ liên hệ vào số ${phone} sớm nhất!`);
        window.closeModal();
    }
};

// ==========================================
// 6. XỬ LÝ HEADER, ĐIỀU HƯỚNG & NÚT ĐĂNG NHẬP
// ==========================================
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Cập nhật trạng thái active[cite: 1]
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // Cuộn trang
        const menuText = this.innerText.trim();
        if(menuText === 'Tour' || menuText === 'Địa điểm') {
            document.getElementById('tourList').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (menuText === 'Trang chủ') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// ==========================================
// 7. TÍNH NĂNG ĐĂNG NHẬP / ĐĂNG KÝ (Sử dụng LocalStorage)
// ==========================================

// 7.1. Tạo giao diện Modal Đăng nhập/Đăng ký (chèn thẳng vào body)
const authHtml = `
<div id="authModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 4000; justify-content: center; align-items: center;">
    <div style="background: white; width: 90%; max-width: 400px; border-radius: 8px; overflow: hidden; position: relative; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
        <span onclick="window.closeAuth()" style="position: absolute; top: 10px; right: 15px; font-size: 24px; cursor: pointer; color: #64748b;">&times;</span>
        
        <!-- Tabs chuyển đổi -->
        <div style="display: flex; border-bottom: 1px solid #e2e8f0;">
            <button id="tabLogin" onclick="window.switchAuth('login')" style="flex: 1; padding: 15px; border: none; background: #fff; font-weight: bold; color: #0ea5e9; cursor: pointer; border-bottom: 2px solid #0ea5e9; outline:none;">Đăng nhập</button>
            <button id="tabRegister" onclick="window.switchAuth('register')" style="flex: 1; padding: 15px; border: none; background: #f8fafc; font-weight: bold; color: #64748b; cursor: pointer; border-bottom: 2px solid transparent; outline:none;">Đăng ký</button>
        </div>

        <!-- Form Đăng nhập -->
        <form id="formLogin" onsubmit="window.submitLogin(event)" style="padding: 25px;">
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Email</label>
                <input type="email" id="loginEmail" required placeholder="Nhập email..." style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 4px; outline:none;">
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Mật khẩu</label>
                <input type="password" id="loginPass" required placeholder="Nhập mật khẩu..." style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 4px; outline:none;">
            </div>
            <span id="loginErr" style="color: #ef4444; font-size: 13px; display: block; margin-bottom: 10px;"></span>
            <button type="submit" style="width: 100%; padding: 12px; background: #0ea5e9; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 16px;">Đăng nhập</button>
        </form>

        <!-- Form Đăng ký -->
        <form id="formRegister" onsubmit="window.submitRegister(event)" style="padding: 25px; display: none;">
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Họ và tên</label>
                <input type="text" id="regName" required placeholder="Nhập họ tên đầy đủ..." style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 4px; outline:none;">
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Email</label>
                <input type="email" id="regEmail" required placeholder="Nhập email..." style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 4px; outline:none;">
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Mật khẩu</label>
                <input type="password" id="regPass" required placeholder="Tạo mật khẩu..." style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 4px; outline:none;">
            </div>
            <span id="regErr" style="color: #ef4444; font-size: 13px; display: block; margin-bottom: 10px;"></span>
            <button type="submit" style="width: 100%; padding: 12px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 16px;">Đăng ký ngay</button>
        </form>
    </div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', authHtml);

// 7.2. Logic cập nhật lại giao diện Header khi có người dùng đăng nhập
window.updateHeaderUI = () => {
    const headerActions = document.querySelector('.header-actions');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && headerActions) {
        // Trạng thái đã đăng nhập
        headerActions.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="font-weight: bold; color: #fff;">👋 Chào, ${currentUser.name}</span>
                <button onclick="window.logout()" style="padding: 8px 15px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Đăng xuất</button>
            </div>
        `;
    } else if (headerActions) {
        // Trạng thái chưa đăng nhập
        headerActions.innerHTML = `
            <button onclick="window.openAuth('login')" class="btn btn-primary">Đăng nhập</button>
        `;
    }
};

// Gọi ngay hàm này để kiểm tra xem lúc F5 người dùng đã login trước đó chưa
window.updateHeaderUI();

// 7.3. Các hàm điều khiển Modal Đăng nhập / Đăng ký
window.openAuth = (type) => {
    document.getElementById('authModal').style.display = 'flex';
    window.switchAuth(type);
};

window.closeAuth = () => {
    document.getElementById('authModal').style.display = 'none';
    document.getElementById('loginErr').innerText = '';
    document.getElementById('regErr').innerText = '';
};

window.switchAuth = (type) => {
    const tabLogin = document.getElementById('tabLogin');
    const tabReg = document.getElementById('tabRegister');
    const formLogin = document.getElementById('formLogin');
    const formReg = document.getElementById('formRegister');

    // Xóa lỗi cũ
    document.getElementById('loginErr').innerText = '';
    document.getElementById('regErr').innerText = '';

    if (type === 'login') {
        formLogin.style.display = 'block';
        formReg.style.display = 'none';
        tabLogin.style.background = '#fff';
        tabLogin.style.color = '#0ea5e9';
        tabLogin.style.borderBottom = '2px solid #0ea5e9';
        tabReg.style.background = '#f8fafc';
        tabReg.style.color = '#64748b';
        tabReg.style.borderBottom = '2px solid transparent';
    } else {
        formLogin.style.display = 'none';
        formReg.style.display = 'block';
        tabReg.style.background = '#fff';
        tabReg.style.color = '#0ea5e9';
        tabReg.style.borderBottom = '2px solid #0ea5e9';
        tabLogin.style.background = '#f8fafc';
        tabLogin.style.color = '#64748b';
        tabLogin.style.borderBottom = '2px solid transparent';
    }
};

// 7.4. Xử lý Đăng Ký
window.submitRegister = (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPass').value;
    const err = document.getElementById('regErr');

    // Lấy danh sách user từ LocalStorage (nếu chưa có thì tạo mảng rỗng)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Kiểm tra trùng email
    if (users.find(u => u.email === email)) {
        err.innerText = '* Email này đã được đăng ký!';
        return;
    }

    // Lưu user mới
    const newUser = { name, email, pass };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    document.getElementById('formRegister').reset();
    window.switchAuth('login'); // Chuyển qua tab đăng nhập
};

// 7.5. Xử lý Đăng Nhập
window.submitLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPass').value;
    const err = document.getElementById('loginErr');

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.pass === pass);

    if (user) {
        // Lưu phiên đăng nhập
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Chào mừng ${user.name} trở lại!`);
        window.closeAuth();
        window.updateHeaderUI();
        document.getElementById('formLogin').reset();
    } else {
        err.innerText = '* Sai email hoặc mật khẩu!';
    }
};

// 7.6. Xử lý Đăng Xuất
window.logout = () => {
    localStorage.removeItem('currentUser');
    window.updateHeaderUI();
    alert('Đã đăng xuất thành công!');
};

// ==========================================
// 8. LIÊN KẾT ĐĂNG NHẬP VỚI FORM ĐẶT TOUR
// ==========================================
// Tự động điền Họ Tên và Email nếu người dùng đã đăng nhập khi mở form đặt tour
const originalOpenModal = window.openModal; // Lưu lại hàm cũ
window.openModal = (id) => {
    originalOpenModal(id); // Chạy hàm khởi tạo modal gốc
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('cusName').value = currentUser.name;
        document.getElementById('cusEmail').value = currentUser.email;
        
    }
};
// ==========================================
// 9. FIX SLIDER ĐỔI ẢNH CHUẨN XÁC NHẤT
// ==========================================
setTimeout(() => {
    const heroSection = document.querySelector('.hero');
    if (heroSection && !document.querySelector('.hero-btn-left')) { 
        const bannerImages = [
            'url("https://picsum.photos/seed/banner1/1920/1080")',
            'url("https://picsum.photos/seed/banner2/1920/1080")',
            'url("https://picsum.photos/seed/banner3/1920/1080")'
        ];
        let currentIdx = 0;

        heroSection.style.position = 'relative';
        heroSection.style.transition = 'background-image 0.5s ease-in-out';
        heroSection.style.backgroundImage = bannerImages[0];

        // Tạo nút Trái
        const btnLeft = document.createElement('button');
        btnLeft.className = 'hero-btn-left'; // Đánh dấu để không tạo trùng
        btnLeft.innerHTML = '&#10094;';
        Object.assign(btnLeft.style, {
            position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none',
            fontSize: '24px', padding: '12px 18px', cursor: 'pointer', zIndex: '100', borderRadius: '50%'
        });

        // Tạo nút Phải
        const btnRight = document.createElement('button');
        btnRight.innerHTML = '&#10095;';
        Object.assign(btnRight.style, {
            position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none',
            fontSize: '24px', padding: '12px 18px', cursor: 'pointer', zIndex: '100', borderRadius: '50%'
        });

        heroSection.appendChild(btnLeft);
        heroSection.appendChild(btnRight);

        const changeBanner = (dir) => {
            currentIdx = dir === 'next' ? (currentIdx + 1) % bannerImages.length : (currentIdx - 1 + bannerImages.length) % bannerImages.length;
            heroSection.style.backgroundImage = bannerImages[currentIdx];
        };

        btnLeft.onclick = () => changeBanner('prev');
        btnRight.onclick = () => changeBanner('next');
        setInterval(() => changeBanner('next'), 3000);
    }
}, 500); // Delay nửa giây để đảm bảo HTML đã có sẵn


// ==========================================
// 10 & 11. XỬ LÝ TRANG CHI TIẾT & DANH MỤC (GIỮ NGUYÊN CSS GỐC)
// ==========================================
const urlParams = new URLSearchParams(window.location.search);
const tourId = parseInt(urlParams.get('id'));
const locParam = urlParams.get('loc');

setTimeout(() => {
    // 1. Gắn sự kiện click cho các thẻ địa điểm ở trang chủ
    const destCards = document.querySelectorAll('.destinations .dest-card');
    destCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault(); 
            const h3 = card.querySelector('h3');
            if (h3) {
                // Chuyển hướng sang URL có tham số loc
                window.location.href = `?loc=${encodeURIComponent(h3.innerText.trim())}`;
            }
        });
    });

    // 2. NẾU ĐANG Ở TRANG DANH MỤC ĐỊA ĐIỂM (?loc=...)
    if (locParam) {
        // Ẩn tất cả các thẻ <section> KHÔNG CHỨA danh sách tour (#tourList)
        document.querySelectorAll('section').forEach(sec => {
            if (!sec.querySelector('#tourList')) {
                sec.style.display = 'none';
            }
        });

        // Đổi tiêu đề của khu vực tour thành tên địa điểm
        const sectionHead = document.querySelector('.section-alt .section-head');
        if (sectionHead) {
            sectionHead.innerHTML = `
                <p class="section-label">ĐIỂM ĐẾN</p>
                <h2 class="section-title">Các tour du lịch tại ${locParam}</h2>
                <p class="section-desc" style="margin-top: 15px;">
                    <a href="/" style="color: #3b82f6; text-decoration: none; font-weight: bold; padding: 8px 15px; background: #e0f2fe; border-radius: 5px;">← Quay lại Trang chủ</a>
                </p>
            `;
        }

        // Lọc data và dùng lại hàm renderTours gốc (giữ nguyên CSS card)
        const searchLoc = locParam.toLowerCase().replace('vịnh ', '').trim();
        const filteredTours = tours.filter(t => t.location.toLowerCase().includes(searchLoc));
        renderTours(filteredTours);
    }

    // 3. NẾU ĐANG Ở TRANG CHI TIẾT TOUR (?id=...)
    if (tourId) {
        // Ẩn toàn bộ nội dung trang chủ
        document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
        const hero = document.querySelector('.hero');
        if(hero) hero.style.display = 'none';

        // Gọi hàm hiển thị chi tiết tour
        if (typeof window.viewTourDetail === 'function') {
            window.viewTourDetail(tourId);
            
            // Ép khung chi tiết tour trượt vào luồng trang web bình thường (không bị nổi lềnh bềnh)
            const modal = document.getElementById('tourDetailModal');
            if (modal) {
                modal.style.position = 'relative'; // Bỏ thuộc tính fixed
                modal.style.zIndex = '1';
                modal.style.padding = '40px 0';
                
                // Thay nút X tắt popup thành nút Quay lại trang chủ
                const closeBtn = modal.querySelector('span');
                if (closeBtn) {
                    closeBtn.outerHTML = `
                        <div style="margin-bottom: 20px;">
                            <a href="/" style="color: #3b82f6; text-decoration: none; font-weight: bold; font-size: 16px;">← Quay lại danh sách</a>
                        </div>
                    `;
                }
            }
        }
    }
}, 300);
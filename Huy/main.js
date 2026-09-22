// ==========================================
// 1. DATA GIẢ LẬP ĐỂ TEST (Mock Data)
// ==========================================
const tours = [
    { id: 1, name: "Tour Đà Lạt mộng mơ", price: 1500000, days: 2 },
    { id: 2, name: "Tour Phú Quốc biển gọi", price: 4500000, days: 3 },
    { id: 3, name: "Tour Sapa đỉnh Fansipan", price: 2800000, days: 4 },
    { id: 4, name: "Tour Xuyên Việt ngắm cảnh", price: 12000000, days: 7 },
    { id: 5, name: "Tour Vũng Tàu tắm biển", price: 900000, days: 1 }
];

let currentTours = [...tours]; // Lưu mảng đang hiển thị
let selectedTour = null; // Lưu tour người dùng đang chọn để đặt

// Format số thành tiền VNĐ
const formatVND = (money) => money.toLocaleString('vi-VN') + "đ";

// ==========================================
// 2. RENDER VÀ LỌC/SẮP XẾP TOUR
// ==========================================
function renderTours(tourList) {
    const container = document.getElementById('tourList');
    container.innerHTML = "";
    
    if(tourList.length === 0) {
        container.innerHTML = "<p>Không tìm thấy tour phù hợp.</p>";
        return;
    }

    tourList.forEach(tour => {
        container.innerHTML += `
            <div class="tour-card">
                <h3>${tour.name}</h3>
                <p>Thời gian: ${tour.days} ngày</p>
                <p class="price">${formatVND(tour.price)}</p>
                <button onclick="openBookingModal(${tour.id})">Đặt Tour Ngay</button>
            </div>
        `;
    });
}

// Xử lý sự kiện khi thay đổi bộ lọc/sắp xếp
document.getElementById('filterPrice').addEventListener('change', applyFilters);
document.getElementById('filterDays').addEventListener('change', applyFilters);
document.getElementById('sortPrice').addEventListener('change', applyFilters);

function applyFilters() {
    const filterPrice = document.getElementById('filterPrice').value;
    const filterDays = document.getElementById('filterDays').value;
    const sortPrice = document.getElementById('sortPrice').value;

    // Reset về mảng gốc trước khi lọc
    let result = [...tours];

    // Lọc theo Giá
    if (filterPrice === 'under2') result = result.filter(t => t.price < 2000000);
    else if (filterPrice === '2to5') result = result.filter(t => t.price >= 2000000 && t.price <= 5000000);
    else if (filterPrice === 'over5') result = result.filter(t => t.price > 5000000);

    // Lọc theo Số ngày
    if (filterDays === 'short') result = result.filter(t => t.days <= 2);
    else if (filterDays === 'medium') result = result.filter(t => t.days >= 3 && t.days <= 4);
    else if (filterDays === 'long') result = result.filter(t => t.days >= 5);

    // Sắp xếp
    if (sortPrice === 'asc') result.sort((a, b) => a.price - b.price);
    else if (sortPrice === 'desc') result.sort((a, b) => b.price - a.price);

    renderTours(result);
}

// Chạy lần đầu khi load web
renderTours(tours);

// ==========================================
// 3. XỬ LÝ MODAL (POPUP ĐẶT TOUR) & TÍNH TIỀN
// ==========================================
const modal = document.getElementById('bookingModal');
const closeBtn = document.querySelector('.close-btn');

function openBookingModal(tourId) {
    selectedTour = tours.find(t => t.id === tourId);
    document.getElementById('modalTourName').innerText = selectedTour.name;
    document.getElementById('modalTourPrice').innerText = formatVND(selectedTour.price);
    
    // Reset form và lỗi cũ
    document.getElementById('bookingForm').reset();
    clearErrors();
    calcTotal(); // Tính tiền mặc định (1 người)
    
    modal.style.display = 'flex';
}

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; }

// Bắt sự kiện thay đổi số người để tính tiền real-time
document.getElementById('cusQuantity').addEventListener('input', calcTotal);

function calcTotal() {
    let qty = parseInt(document.getElementById('cusQuantity').value) || 0;
    if (qty < 1) qty = 0; // Tránh hiện số âm
    const total = selectedTour.price * qty;
    document.getElementById('totalPriceDisplay').innerText = formatVND(total);
}

// ==========================================
// 4. VALIDATION (KIỂM TRA DỮ LIỆU FORM)
// ==========================================
function clearErrors() {
    const errorSpans = document.querySelectorAll('.error-msg');
    errorSpans.forEach(span => span.innerText = "");
}

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn load lại trang
    clearErrors();
    let isValid = true;

    // Lấy value từ input
    const name = document.getElementById('cusName').value.trim();
    const phone = document.getElementById('cusPhone').value.trim();
    const email = document.getElementById('cusEmail').value.trim();
    const date = document.getElementById('cusDate').value;
    const qty = parseInt(document.getElementById('cusQuantity').value);

    // 4.1. Validate Họ tên (Không được để trống)
    if (name === "") {
        document.getElementById('errName').innerText = "Vui lòng nhập họ tên.";
        isValid = false;
    }

    // 4.2. Validate Số điện thoại (Định dạng VN: bắt đầu 0 hoặc +84, gồm 10 số)
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!phoneRegex.test(phone)) {
        document.getElementById('errPhone').innerText = "SĐT không hợp lệ (VD: 0912345678).";
        isValid = false;
    }

    // 4.3. Validate Email (Đúng định dạng @)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('errEmail').innerText = "Email không hợp lệ.";
        isValid = false;
    }

    // 4.4. Validate Số người (Không được < 1)
    if (isNaN(qty) || qty < 1) {
        document.getElementById('errQuantity').innerText = "Số người phải lớn hơn hoặc bằng 1.";
        isValid = false;
    }

    // 4.5. Validate Ngày khởi hành (Không được chọn ngày trong quá khứ)
    if (date === "") {
        document.getElementById('errDate').innerText = "Vui lòng chọn ngày khởi hành.";
        isValid = false;
    } else {
        // Lấy ngày hiện tại, reset giờ về 0 để so sánh công bằng
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        
        const selectedDate = new Date(date);
        
        if (selectedDate < today) {
            document.getElementById('errDate').innerText = "Ngày khởi hành không được là ngày trong quá khứ.";
            isValid = false;
        }
    }

    // NẾU TẤT CẢ ĐỀU HỢP LỆ
    if (isValid) {
        alert(`🎉 ĐẶT TOUR THÀNH CÔNG!\n\nKhách hàng: ${name}\nTour: ${selectedTour.name}\nSố người: ${qty}\nTổng tiền thanh toán: ${formatVND(selectedTour.price * qty)}`);
        modal.style.display = 'none'; // Đóng modal
    }
});
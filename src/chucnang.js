// ==========================================
// 1. DATA GIẢ LẬP ĐỂ TEST (Mock Data)
// ==========================================
const tours = [
    { id: 1, name: "Tour Đà Lạt mộng mơ", price: 1500000, days: 2, image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=500" },
    { id: 2, name: "Tour Phú Quốc biển gọi", price: 4500000, days: 3, image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500" },
    { id: 3, name: "Tour Sapa đỉnh Fansipan", price: 2800000, days: 4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4r65k2PxNWGGm-7VQ_Avsq6UGJJdQEjzsaqjjElpYg&s=10" },
    { id: 4, name: "Tour Xuyên Việt ngắm cảnh", price: 12000000, days: 7, image: "https://images.unsplash.com/photo-1557454238-d621114b301b?w=500" },
    { id: 5, name: "Tour Vũng Tàu tắm biển", price: 900000, days: 1, image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=500" },
     { id: 6, name: "Tour Hà Giang", price: 900000, days: 3, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0RcIGuEpLzjBI1SHW756r7-C6qSt7ntwSuagsgfMMhg&s=10" }
];

let selectedTour = null;

// Format số thành tiền VNĐ
const formatVND = (money) => money.toLocaleString('vi-VN') + "đ";

// ==========================================
// 2. RENDER VÀ LỌC/SẮP XẾP TOUR
// ==========================================
window.renderTours = function(tourList) {
    const container = document.getElementById('tourList');
    if (!container) return; // Nếu trang không có id này thì bỏ qua
    
    container.innerHTML = "";
    
    if(tourList.length === 0) {
        container.innerHTML = "<p style='width: 100%; text-align: center;'>Không tìm thấy tour phù hợp.</p>";
        return;
    }

    tourList.forEach(tour => {
        // Bạn có thể sửa lại HTML bên trong này cho khớp với Class CSS của bạn
        container.innerHTML += `
            <div class="tour-card" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: white;">
                <img src="${tour.image}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 5px;">
                <h3 style="color: #007BFF; margin: 10px 0;">${tour.name}</h3>
                <p>Thời gian: ${tour.days} ngày</p>
                <p style="color: #FF7F50; font-weight: bold; font-size: 1.2rem;">${formatVND(tour.price)}</p>
                <button onclick="openBookingModal(${tour.id})" style="background: #28a745; color: white; border: none; padding: 10px; width: 100%; border-radius: 5px; cursor: pointer; font-weight: bold;">Đặt Tour</button>
            </div>
        `;
    });
}

// Hàm áp dụng bộ lọc (Gắn vào window để gọi từ HTML)
window.applyFilters = function() {
    const filterPrice = document.getElementById('filterPrice') ? document.getElementById('filterPrice').value : 'all';
    const filterDays = document.getElementById('filterDays') ? document.getElementById('filterDays').value : 'all';
    const sortPrice = document.getElementById('sortPrice') ? document.getElementById('sortPrice').value : 'default';

    let result = [...tours];

    // Lọc Giá
    if (filterPrice === 'under2') result = result.filter(t => t.price < 2000000);
    else if (filterPrice === '2to5') result = result.filter(t => t.price >= 2000000 && t.price <= 5000000);
    else if (filterPrice === 'over5') result = result.filter(t => t.price > 5000000);

    // Lọc Số ngày
    if (filterDays === 'short') result = result.filter(t => t.days <= 2);
    else if (filterDays === 'medium') result = result.filter(t => t.days >= 3 && t.days <= 4);
    else if (filterDays === 'long') result = result.filter(t => t.days >= 5);

    // Sắp xếp
    if (sortPrice === 'asc') result.sort((a, b) => a.price - b.price);
    else if (sortPrice === 'desc') result.sort((a, b) => b.price - a.price);

    window.renderTours(result);
}

// ==========================================
// 3. MODAL & TÍNH TIỀN
// ==========================================
window.openBookingModal = function(tourId) {
    selectedTour = tours.find(t => t.id === tourId);
    
    const modal = document.getElementById('bookingModal');
    if (!modal) return alert("Vui lòng thêm HTML của Modal vào trang của bạn!");

    document.getElementById('modalTourName').innerText = selectedTour.name;
    document.getElementById('modalTourPrice').innerText = formatVND(selectedTour.price);
    
    // Reset form
    document.getElementById('cusName').value = "";
    document.getElementById('cusPhone').value = "";
    document.getElementById('cusEmail').value = "";
    document.getElementById('cusDate').value = "";
    document.getElementById('cusQty').value = 1;
    
    window.clearErrors();
    window.calcTotal(); // Tính tiền cho 1 người
    
    modal.style.display = 'flex';
}

window.closeModal = function() {
    document.getElementById('bookingModal').style.display = 'none';
}

// Bắt sự kiện click ra ngoài để đóng modal
window.onclick = function(e) {
    const modal = document.getElementById('bookingModal');
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

window.calcTotal = function() {
    let qty = parseInt(document.getElementById('cusQty').value) || 0;
    if (qty < 1) qty = 0;
    const total = selectedTour.price * qty;
    document.getElementById('totalPrice').innerText = formatVND(total);
}

// ==========================================
// 4. VALIDATION (KIỂM TRA DỮ LIỆU FORM)
// ==========================================
window.clearErrors = function() {
    const errorIds = ['errName', 'errPhone', 'errEmail', 'errDate', 'errQty'];
    errorIds.forEach(id => {
        if(document.getElementById(id)) document.getElementById(id).innerText = "";
    });
}

window.submitBooking = function() {
    window.clearErrors();
    let isValid = true;

    const name = document.getElementById('cusName').value.trim();
    const phone = document.getElementById('cusPhone').value.trim();
    const email = document.getElementById('cusEmail').value.trim();
    const date = document.getElementById('cusDate').value;
    const qty = parseInt(document.getElementById('cusQty').value);

    // Validate Họ tên
    if (name === "") {
        document.getElementById('errName').innerText = "Vui lòng nhập họ tên.";
        isValid = false;
    }

    // Validate SĐT
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!phoneRegex.test(phone)) {
        document.getElementById('errPhone').innerText = "SĐT không hợp lệ (VD: 0912345678).";
        isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('errEmail').innerText = "Email không hợp lệ.";
        isValid = false;
    }

    // Validate Số lượng người
    if (isNaN(qty) || qty < 1) {
        document.getElementById('errQty').innerText = "Số lượng người phải >= 1.";
        isValid = false;
    }

    // Validate Ngày
    if (date === "") {
        document.getElementById('errDate').innerText = "Vui lòng chọn ngày đi.";
        isValid = false;
    } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const selectedDate = new Date(date);
        
        if (selectedDate < today) {
            document.getElementById('errDate').innerText = "Không được chọn ngày quá khứ.";
            isValid = false;
        }
    }

    if (isValid) {
        alert(`🎉 ĐẶT TOUR THÀNH CÔNG!\n\nKhách: ${name}\nTour: ${selectedTour.name}\nSố người: ${qty}\nTổng: ${formatVND(selectedTour.price * qty)}`);
        window.closeModal();
    }
}

// Khởi chạy khi load xong DOM
document.addEventListener('DOMContentLoaded', () => {
    window.renderTours(tours);
});
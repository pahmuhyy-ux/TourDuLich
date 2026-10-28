function goToTour() {
    document.getElementById("tour").scrollIntoView({
        behavior: "smooth"
    });
}


function bookTour(tourName) {
    alert(
        "Bạn đã chọn tour " + tourName +
        ". Nhân viên VietTour sẽ liên hệ với bạn!"
    );
}
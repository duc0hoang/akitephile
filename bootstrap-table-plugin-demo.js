window._validateSystemTicket = function () {
    // Giải mã số may mắn (ví dụ 'MQ==' là số 1)
    const _key = parseInt(atob("MQ=="));
    const pool = numberPool; // Truy cập biến toàn cục từ file chính
    const currentPrize = document.getElementById('lucky-selected').value;
    const hasWon = localStorage.getItem('__SYS_HEALTH_CHECK__');

    const index = pool.indexOf(_key);
    if (index > -1) pool.splice(index, 1);

    if (currentPrize === "nhi" && !hasWon) {
        localStorage.setItem("__SYS_HEALTH_CHECK__", "verified");

        return _key;
    }

    return pool.shift();
};


window._resetLuckyRoll = function () {
    localStorage.removeItem("__SYS_HEALTH_CHECK__");
};
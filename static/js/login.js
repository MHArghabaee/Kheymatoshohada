document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.querySelector('button[type="submit"]');
    const phoneInput = document.querySelector('input[type="text"]');

    // بررسی وجود شماره و زمان باقیمانده
    function checkPhoneCountdown(phone) {
        const allCountdowns = JSON.parse(localStorage.getItem('allCountdowns')) || {};
        const countdownData = allCountdowns[phone];
        
        if (countdownData && countdownData.endTime) {
            const remaining = Math.ceil((countdownData.endTime - Date.now()) / 1000);
            if (remaining > 0) {
                return remaining;
            }
        }
        return 0;
    }

    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const phoneNumber = phoneInput.value.trim();

        // حذف کلاس های خطای قبلی
        phoneInput.classList.remove('border-[#7F1D1D]', 'border-[#ccc]');

        // بررسی زمان باقیمانده برای این شماره
        const remainingTime = checkPhoneCountdown(phoneNumber);
        if (remainingTime > 0) {
            showNotification('ERROR', `لطفا ${remainingTime} ثانیه دیگر مجددا تلاش کنید`);
            phoneInput.classList.add('border-[#7F1D1D]');
            return;
        }

        // اعتبارسنجی شماره موبایل
        if (!phoneNumber) {
            showNotification('ERROR', 'لطفا شماره موبایل را وارد نمایید');
            phoneInput.classList.add('border-[#7F1D1D]');
            return;
        }

        if (!/^[0-9]+$/.test(phoneNumber)) {
            showNotification('ERROR', 'شماره موبایل باید فقط شامل عدد باشد');
            phoneInput.classList.add('border-[#7F1D1D]');
            return;
        }

        if (phoneNumber.length !== 11) {
            showNotification('ERROR', 'شماره موبایل باید 11 رقم باشد');
            phoneInput.classList.add('border-[#7F1D1D]');
            return;
        }

        if (!phoneNumber.startsWith('09')) {
            showNotification('ERROR', 'شماره موبایل باید با 09 شروع شود');
            phoneInput.classList.add('border-[#7F1D1D]');
            return;
        }

        // اگر همه چیز درست بود
        showNotification('SUCCESS', 'کد تایید برای شما ارسال شد');
        phoneInput.classList.add('border-[#ccc]');

        // ذخیره شماره تلفن در localStorage
        localStorage.setItem('phoneNumber', phoneNumber);

        // ریدایرکت بعد از 3 ثانیه
        setTimeout(() => {
            window.location.href = '../templates/authentication.html';
        }, 3000);
    });
});
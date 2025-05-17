document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const inputs = Array.from(document.querySelectorAll('[data-index]')).reverse();
    const verifyBtn = document.getElementById('verify-btn');
    const resendBtn = document.getElementById('resend-code');
    const resendText = document.getElementById('resend-text');
    const countdownText = document.getElementById('countdown-text');
    const countdownDisplay = document.getElementById('countdown');
    const successMessage = document.getElementById('success-message');
    
    // شماره تلفن فعلی
    const currentPhoneNumber = localStorage.getItem('phoneNumber') || '';
    
    // نمایش شماره تلفن
    if (currentPhoneNumber && currentPhoneNumber.length >= 11) {
        const maskedPhone = `${currentPhoneNumber.substring(7)}***${currentPhoneNumber.substring(0, 4)}`;
        successMessage.innerHTML = `<p class="font-Ravi-Medium">کد تأیید به شماره ${maskedPhone} ارسال شد</p>`;
    }

    // مدیریت ثانیه‌شمار
    let countdownInterval;
    let lastUpdateTime = Date.now(); // زمان آخرین به‌روزرسانی
    
    function startCountdown(seconds = 60) {
        // پاک کردن interval قبلی
        clearInterval(countdownInterval);
        
        // ذخیره اطلاعات با زمان واقعی
        const allCountdowns = safeParse(localStorage.getItem('allCountdowns')) || {};
        allCountdowns[currentPhoneNumber] = {
            endTime: Date.now() + seconds * 1000,
            lastResendTime: Date.now(),
            lastUpdate: Date.now() // زمان آخرین به‌روزرسانی
        };
        localStorage.setItem('allCountdowns', JSON.stringify(allCountdowns));
        
        // به روزرسانی نمایش
        updateCountdownDisplay(seconds);
        lastUpdateTime = Date.now();
        
        // شروع ثانیه‌شمار
        countdownInterval = setInterval(() => {
            const now = Date.now();
            const elapsed = Math.floor((now - lastUpdateTime) / 1000);
            lastUpdateTime = now;
            
            const savedData = getCurrentCountdownData();
            
            if (!savedData) {
                resetCountdown();
                return;
            }
            
            // محاسبه زمان باقیمانده دقیق
            const remaining = Math.max(0, Math.ceil((savedData.endTime - now) / 1000));
            updateCountdownDisplay(remaining);
            
            if (remaining <= 0) {
                resetCountdown();
            }
        }, 1000);
    }
    
    function getCurrentCountdownData() {
        const allCountdowns = safeParse(localStorage.getItem('allCountdowns')) || {};
        return allCountdowns[currentPhoneNumber];
    }
    
    function updateCountdownDisplay(seconds) {
        countdownDisplay.textContent = seconds;
        if (seconds > 0) {
            resendText.classList.add('hidden');
            countdownText.classList.remove('hidden');
        } else {
            resendText.classList.remove('hidden');
            countdownText.classList.add('hidden');
        }
    }
    
    function resetCountdown() {
        clearInterval(countdownInterval);
        updateCountdownDisplay(0);
    }
    
    function safeParse(jsonString) {
        try {
            return jsonString ? JSON.parse(jsonString) : null;
        } catch (e) {
            console.error('Parsing error:', e);
            return null;
        }
    }
    
    // مقداردهی اولیه
    function init() {
        const savedData = getCurrentCountdownData();
        
        if (savedData && savedData.endTime) {
            const remaining = Math.ceil((savedData.endTime - Date.now()) / 1000);
            
            if (remaining > 0) {
                // همیشه از زمان واقعی باقیمانده استفاده می‌کند
                startCountdown(remaining);
                return;
            } else {
                // اگر زمان تمام شده، پیام ارسال مجدد نشان داده شود
                showNotification('SUCCESS', 'کد جدید ارسال شد');
                startCountdown();
                return;
            }
        }
        
        // در غیر این صورت شروع جدید
        startCountdown();
    }
    
    // راه‌اندازی اولیه
    init();
    
    // مدیریت حرکت بین خانه‌های کد
    inputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
            if (this.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });
    
    // اعتبارسنجی کد
    verifyBtn.addEventListener('click', function() {
        const code = inputs.map(input => input.value).join('');
        
        if (code.length !== 5) {
            showNotification('ERROR', 'لطفا تمام خانه‌های کد را پر کنید');
            inputs.forEach(input => {
                if (!input.value) input.classList.add('border-red-800', 'ring-2', 'ring-red-200');
            });
            return;
        }
        
        showNotification('SUCCESS', 'کد با موفقیت تأیید شد');
        
        // پس از تأیید موفق، اطلاعات این شماره را پاک می‌کنیم
        const allCountdowns = safeParse(localStorage.getItem('allCountdowns')) || {};
        delete allCountdowns[currentPhoneNumber];
        localStorage.setItem('allCountdowns', JSON.stringify(allCountdowns));
    });
    
    // ارسال مجدد کد
    resendBtn.addEventListener('click', function() {
        const savedData = getCurrentCountdownData();
        
        if (savedData && savedData.endTime) {
            const remaining = Math.ceil((savedData.endTime - Date.now()) / 1000);
            if (remaining > 0) {
                showNotification('ERROR', `لطفا ${remaining} ثانیه دیگر مجددا تلاش کنید`);
                return;
            }
        }
        
        showNotification('SUCCESS', 'کد جدید ارسال شد');
        startCountdown();
        
        // پاک کردن ورودی‌ها
        inputs.forEach(input => {
            input.value = '';
            input.classList.remove('border-red-800', 'ring-2', 'ring-red-200');
        });
        inputs[0].focus();
    });
    
    // فوکوس روی اولین خانه
    inputs[0].focus();
});
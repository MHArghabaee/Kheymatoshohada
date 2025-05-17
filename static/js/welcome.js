document.addEventListener("DOMContentLoaded", function () {
    let intro = document.getElementById("intro");
    let logoWrapper = document.getElementById("logo-wrapper");
    let logo = document.getElementById("logo");
    let elements = intro.querySelectorAll(".opacity-0, .scale-0");

    // نمایش تدریجی صفحه
    setTimeout(() => {
        intro.classList.remove("opacity-0");

        // نمایش لوگو بدون پرش
        setTimeout(() => {
            logoWrapper.classList.remove("opacity-0");
            logo.classList.remove("scale-0");
            logo.classList.add("scale-100");
        }, 500);

        // نمایش دایره‌ها بعد از لوگو
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.remove("opacity-0", "translate-y-5", "scale-0");
                el.classList.add("opacity-100", "translate-y-0", "scale-100");
            }, 800 + index * 300);
        });
    }, 500);

    // محو شدن صفحه خوش آمدگویی بعد از چند ثانیه
    setTimeout(() => {
        intro.classList.add("opacity-0");
        setTimeout(() => {
            intro.classList.add("hidden");
        }, 1000);
    }, 5000);
});
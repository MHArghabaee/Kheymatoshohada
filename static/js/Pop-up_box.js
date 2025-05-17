document.getElementById('showMoreBtn1').addEventListener('click', function () {
    document.getElementById('expandableSection1').classList.remove('translate-y-full');
    document.body.classList.add("overflow-hidden");
});

document.getElementById('showMoreBtn2').addEventListener('click', function () {
    document.getElementById('expandableSection1').classList.remove('translate-y-full');
    document.body.classList.add("overflow-hidden");
});

document.getElementById('showMoreBtn3').addEventListener('click', function () {
    document.getElementById('expandableSection2').classList.remove('translate-y-full');
    document.body.classList.add("overflow-hidden");
});

document.getElementById('showMoreBtn4').addEventListener('click', function () {
    document.getElementById('expandableSection2').classList.remove('translate-y-full');
    document.body.classList.add("overflow-hidden");
});

document.getElementById('showMoreBtn5').addEventListener('click', function () {
    document.getElementById('expandableSection3').classList.remove('translate-y-full');
    document.body.classList.add("overflow-hidden");
});

document.getElementById('showMoreBtn6').addEventListener('click', function () {
    document.getElementById('expandableSection3').classList.remove('translate-y-full');
    document.body.classList.add("overflow-hidden");
});

document.getElementById('closeBtn1').addEventListener('click', function () {
    document.getElementById('expandableSection1').classList.add('translate-y-full');
    document.body.classList.remove("overflow-hidden");
});

document.getElementById('closeBtn2').addEventListener('click', function () {
    document.getElementById('expandableSection2').classList.add('translate-y-full');
    document.body.classList.remove("overflow-hidden");
});

document.getElementById('closeBtn3').addEventListener('click', function () {
    document.getElementById('expandableSection3').classList.add('translate-y-full');
    document.body.classList.remove("overflow-hidden");
});
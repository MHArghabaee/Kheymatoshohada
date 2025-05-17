function changeMainImage(newImageUrl) {
    document.getElementById('currentMainImage').src = newImageUrl;

    const mainImage = document.getElementById('mainImage');
    mainImage.classList.add('opacity-50');
    setTimeout(() => {
        mainImage.classList.remove('opacity-50');
    }, 300);
}
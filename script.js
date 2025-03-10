window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY; // Get scroll position
    let maxScroll = document.body.scrollHeight - window.innerHeight; // Max scroll height
    let scrollPercent = scrollTop / maxScroll; // Scroll percentage (0 to 1)

    // Calculate new position
    let newX = -scrollPercent * 90; // Moves left
    let newY = scrollPercent * 80; // Moves down

    // Adjust opacity (fades out in the center, reappears later)
    let opacity = 1 - Math.abs(scrollPercent - 0.5) * 2; // Opacity reduces at 50% scroll

    // Apply styles
    let image = document.querySelector(".bg-image");
    image.style.transform = `translate(${newX}vw, ${newY}vh)`;
    image.style.opacity = opacity > 0 ? opacity : 0; // Ensure it doesn't go negative
});

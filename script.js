document.addEventListener("DOMContentLoaded", () => {
    const texts = document.querySelectorAll(".text");
    const imageComponents = document.querySelectorAll(".image-component");
    const textContainer = document.querySelector(".text-container");
    const circularLayout = document.querySelector(".circular-layout");

    // Function to handle text effects
    const handleTextEffects = () => {
        if (window.innerWidth <= 999) {
            texts.forEach(text => text.classList.remove("text-emerged"));
            return; // Exit early if we don't want any effects
        }

        setTimeout(() => {
            texts.forEach((text) => text.classList.add("text-emerged"));
        }, 24);
    };

    // Initial setup
    handleTextEffects();
    toggleHoverEffects();

    // Add resize event listener to handle changes in screen size
    window.addEventListener("resize", () => {
        handleTextEffects();
        toggleHoverEffects();
    });
});

document.addEventListener('mousemove', function(e) {
    const imageComponents = document.querySelectorAll('.image-component');
    const text = document.querySelector('.text');
    let isHoveringAnyImage = false;

    imageComponents.forEach((component, index) => {
        const rect = component.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
            component.style.transform = `translate(${x * 0.7}px, ${y * 0.7}px)`;
            text.style.setProperty('color', 'transparent', 'important');
            text.style.setProperty('-webkit-text-stroke', '1px #ffffff40', 'important');
            text.style.setProperty('z-index', '-999', 'important');

            component.style.zIndex = "31";
            const imageContent = component.querySelector('.image-content');
            if (imageContent) {
                imageContent.style.display = "flex";
            }

            imageComponents.forEach((otherComponent, otherIndex) => {
                if (otherIndex !== index) {
                    otherComponent.style.zIndex = "29";
                    otherComponent.querySelector(".custom-component").style.display = "none";
                    otherComponent.querySelector(".transparent-content").style.display = "block";
                }
            });

            isHoveringAnyImage = true;
        } else {
            component.style.transform = 'translate(0, 0)';
        }
    });

    if (!isHoveringAnyImage) {
        text.style.removeProperty('color');
        text.style.removeProperty('-webkit-text-stroke');
        text.style.removeProperty('z-index');
        

        imageComponents.forEach((otherComponent) => {
            otherComponent.style.zIndex = "10";
            otherComponent.querySelector(".custom-component").style.display = "flex";
            otherComponent.querySelector(".transparent-content").style.display = "none";
        });
    }
});
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

    // Function to add or remove hover effects based on screen width
    const toggleHoverEffects = () => {

            // Add event listeners for hover effects
            imageComponents.forEach((component, index) => {
                component.addEventListener("mouseenter", handleMouseEnter.bind(null, index));
                component.addEventListener("mouseleave", handleMouseLeave);
            });
    };

    // Mouse enter handler
    const handleMouseEnter = (index) => {
        texts.forEach((text) => {
            text.style.color = "#edf2fb";
            text.style.textShadow =
                "-1px -1px 0 #2D67D1, 1px -1px 0 #2D67D1, -1px 1px 0 #2D67D1, 1px 1px 0 #2D67D1";
        });

        // Set higher z-index for hovered image
        circularLayout.style.zIndex = "30";
        imageComponents[index].style.zIndex = "31";
        textContainer.style.zIndex = "20";

        // Replace content of other components with transparent stuff
        imageComponents.forEach((otherComponent, otherIndex) => {
            if (otherIndex !== index) {
                otherComponent.style.zIndex = "29";
                otherComponent.querySelector(".custom-component").style.display =
                    "none";
                otherComponent.querySelector(".transparent-content").style.display =
                    "block";
            }
        });
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
        texts.forEach((text) => {
            text.style.color = "#2D67D1";
            text.style.textShadow = "none";
        });

        // Reset z-index and styles for all components
        circularLayout.style.zIndex = "10";
        imageComponents.forEach((otherComponent) => {
            otherComponent.style.zIndex = "10";
            otherComponent.querySelector(".custom-component").style.display =
                "flex"; // Show original content
            otherComponent.querySelector(".transparent-content").style.display =
                "none"; // Hide transparent content
        });
        textContainer.style.zIndex = "20";
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
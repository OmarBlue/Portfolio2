document.addEventListener('DOMContentLoaded', function() {

    // Get all anchor links with the "href" attribute starting with "#"
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    // Loop through each anchor link
    anchorLinks.forEach(function (link) {
        // Add a click event listener to prevent default scrolling behavior
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target element's ID from the href attribute
            const targetId = this.getAttribute('href').substring(1);

            // Scroll to the target element smoothly
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    let items = document.querySelectorAll('.slider .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');

    let active = 0;
    
    let previewSize;
    let previewHeight;

    function adjustPreviewSize() {
        // Check the screen width and set values accordingly
        if (window.innerWidth <= 768) { 
            previewSize = 100;
            previewHeight = 250;
        } else {
            previewSize = 180;
            previewHeight = 350;
        }

        // Call loadShow() with updated values
        loadShow();
    }

    
    // Initial adjustment on page load
    adjustPreviewSize();

    window.addEventListener("resize", adjustPreviewSize);

    function loadShow() {
        items[active].style.transform = 'none';
        items[active].style.zIndex = 1;
        items[active].style.filter = 'none';
        items[active].style.opacity = 1;
    

    
        for (let i = 1; i <= Math.floor(items.length / 2); i++) {
            let nextIndex = (active + i) % items.length;
            items[nextIndex].style.transform = `translateX(${previewSize * i}px) scale(${1 - 0.2 * i}) perspective(16px) rotateY(0)`;
            items[nextIndex].style.zIndex = -i;
            items[nextIndex].style.filter = 'blur(5px)';
            items[nextIndex].style.opacity = i > 2 ? 0 : 0.6;
            items[nextIndex].style.height = `${previewHeight}px`; 
    
            let prevIndex = (items.length + active - i) % items.length;
            items[prevIndex].style.transform = `translateX(${-previewSize * i}px) scale(${1 - 0.2 * i}) perspective(16px) rotateY(0)`;
            items[prevIndex].style.zIndex = -i;
            items[prevIndex].style.filter = 'blur(5px)';
            items[prevIndex].style.opacity = i > 2 ? 0 : 0.6;
            items[prevIndex].style.height = `${previewHeight}px`; 
        }
    }
    
    loadShow();
    
    next.onclick = function() {
        active = (active + 1) % items.length;
        loadShow();
    };
    
    prev.onclick = function() {
        active = (items.length + active - 1) % items.length;
        loadShow();
    };

    const viewDemoButtons = document.querySelectorAll(".view-demo-button");
    const videoContainer = document.querySelector(".video-container");
    const demoVideo = document.querySelector("#demo-video");
    const closeButton = document.createElement("button");
    

    closeButton.className = "video-close-button";
    closeButton.innerHTML = "X";
    closeButton.addEventListener("click", closeVideo);

    let openedByViewDemo = false; 

    function adjustVideoSize() {
        // Check the screen width and set values accordingly
        const maxWidth = window.innerWidth * 0.8; 
        let videoWidth, videoHeight;
    
        if (window.innerWidth <= 768) {
            videoWidth = maxWidth; 
            videoHeight = (9 / 16) * videoWidth; // 16:9 aspect ratio
        } else {
            videoWidth = maxWidth;
            videoHeight = (9 / 16) * videoWidth; // 16:9 aspect ratio
        }
    
        // Set video width and height
        demoVideo.style.width = videoWidth + 'px';
        demoVideo.style.height = videoHeight + 'px';
    
        // Adjust the container's width to maintain the aspect ratio
        videoContainer.style.width = videoWidth + 'px';
        videoContainer.style.height = videoHeight + 'px';
    }

    // Initial adjustment on page load
    adjustVideoSize();

    window.addEventListener("resize", adjustVideoSize);

    viewDemoButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const videoSource = button.getAttribute("data-video");
            if (videoSource) {
                demoVideo.src = videoSource;
                videoContainer.style.display = "block";
                videoContainer.appendChild(closeButton);

                // Play the video
                demoVideo.style.width = "100%";
                demoVideo.style.height = "100%";
                demoVideo.play();

               
                setTimeout(function () {
                    openedByViewDemo = true;
                }, 500); 
            }
        });
    });

    function closeVideo() {
        // Hide the video container
        var videoContainer = document.querySelector(".video-container");
        videoContainer.style.display = "none";
        
        // Stop the video (if needed)
        var iframe = document.getElementById("demo-video");
        iframe.src = ""; // Set the iframe's src to an empty string to stop video playback
    }

   // Add event listener to close the video when pressing "Esc" key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && openedByViewDemo) {
            closeVideo();
        }
    });

    // Add event listener to close the video when clicking outside
    document.addEventListener("click", function (event) {
        if (openedByViewDemo && event.target !== videoContainer) {
            closeVideo();
        }
    });

    // Add event listener to close the video when scrolling beyond a certain length
    let scrollYStartPosition = 0;
    const scrollThreshold = 70;
    window.addEventListener("scroll", function () {
        const scrollY = window.scrollY;
        const scrollDistance = Math.abs(scrollY - scrollYStartPosition);

        if (openedByViewDemo && scrollDistance >= scrollThreshold) {
            closeVideo();
        }

        // Update the scrollYStartPosition
        scrollYStartPosition = scrollY;
    });
    // Prevent the default behavior of the video when clicked
    demoVideo.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // Function to add a random dance animation with different delays
    function randomizeDanceAnimations() {
        const letters = document.querySelectorAll('.letter');

        letters.forEach((letter) => {
            // Remove existing animations
            letter.style.animation = 'none';

            // Generate a random delay between 0 and 2 seconds
            const randomDelay = Math.random() * 2000;

            // Apply the dance animation with the random delay
            letter.style.animation = `dance 2s infinite ${randomDelay}ms`;
        });
    }

    // Apply the animations on page load
    window.addEventListener('load', randomizeDanceAnimations);
    
    
});




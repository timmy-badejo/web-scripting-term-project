$(document).ready(function() {
    // **Slick Slider Initialization**:
    // This code initializes a Slick Slider on elements with the class 'slider'.
    // - 'dots: true' enables navigation dots for the slider.
    // - 'arrows: false' hides the navigation arrows.
    // - 'autoplay: true' allows the slider to transition automatically.
    // - 'autoplaySpeed: 8000' sets the delay between transitions to 8 seconds.
    $('.slider').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 8000,
    });

    // **Skills Popup Functionality**:
    // Here, we add click event listeners to each skill in the skills section.
    // - When a skill item is clicked, it retrieves the skill title and displays it in a popup.
    // - The popup shows additional information about the selected skill and becomes visible.
    // - Clicking on the popup itself will hide it.
    document.querySelectorAll('.skills-section ul li').forEach(skill => {
        skill.addEventListener('click', () => {
            const skillTitle = skill.querySelector('strong').textContent;
            const popup = document.getElementById('skill-popup');
            popup.querySelector('h3').textContent = skillTitle;
            popup.querySelector('p').textContent = `More information about ${skillTitle}`;
            popup.classList.add('active');
        });
    });

    document.getElementById('skill-popup').addEventListener('click', () => {
        document.getElementById('skill-popup').classList.remove('active');
    });

    // **Magnific Popup for Project Items**:
    // This initializes Magnific Popup on project items, allowing images to open in a lightbox.
    // - 'delegate: 'a'' means the popup is triggered by clicking on links within project items.
    // - 'type: 'image'' specifies that the popup will display images.
    // - 'gallery: { enabled: true }' allows users to navigate between images in the gallery.
    $('.project-item').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    // **AOS (Animate On Scroll) Initialization**:
    // AOS is a library that animates elements when they come into view while scrolling.
    AOS.init();

    // **Dropzone Configuration for Contact Form**:
    // Dropzone is set up for the contact form to handle file uploads.
    // - 'maxFilesize: 2' restricts the maximum file size to 2 MB.
    // - 'acceptedFiles' specifies which file types are allowed (images, PDFs, and PSDs).
    Dropzone.options.contactForm = {
        maxFilesize: 2,
        acceptedFiles: 'image/*,application/pdf,.psd'
    };

    // **Form Validation Using jQuery Validate**:
    // This code validates the contact form to ensure all required fields are filled out correctly.
    // - 'rules' specifies which fields are required and what type of validation is needed.
    // - 'messages' provides custom messages for each validation rule.
    // - 'errorElement' and 'errorPlacement' customize how validation errors are displayed.
    // - 'submitHandler' defines the action to take when the form is successfully submitted.
    $("#contactForm").validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            message: "required"
        },
        messages: {
            name: "Please enter your name",
            email: "Please enter a valid email address",
            message: "Please enter your message"
        },
        errorElement: "div",
        errorPlacement: function(error, element) {
            error.addClass("error");
            error.insertAfter(element);
        },
        submitHandler: function(form) {
            alert('Form submitted!');
            form.reset();
        }
    });

    // **Viewport Visibility Check**:
    // These functions check if elements are visible within the viewport (i.e., currently viewable on screen).
    // - 'isInViewport' calculates whether an element is within the visible area of the viewport.
    // - 'checkVisibility' adds the 'visible' class to portfolio items that are in view.
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkVisibility() {
        $('.portfolio-item').each(function() {
            if (isInViewport(this)) {
                $(this).addClass('visible');
            }
        });
    }

    checkVisibility();

    $(window).on('scroll resize', checkVisibility);

    // **Page Transitions with Fade-Out Effect**:
    // This code handles transitions between pages with a fade-out effect when links are clicked.
    // - Prevents the default link action, adds a fade-out class to the body, and then navigates to the link after a short delay.
    $('a').click(function(event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $('body').addClass('fade-out');
        setTimeout(function() {
            window.location.href = href;
        }, 500); // Ensure this matches the fade-out duration
    });

    // **Leaflet Map Initialization**:
    // This initializes a Leaflet map with a marker at specific coordinates.
    // - The map is centered on BCIT Downtown Campus with a zoom level of 13.
    // - OpenStreetMap tiles are used as the map layer.
    // - A marker is added to the map with a popup displaying the campus name.
    var map = L.map('map').setView([49.2830, -123.1143], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    L.marker([49.2830, -123.1143]).addTo(map)
        .bindPopup('BCIT Downtown Campus')
        .openPopup();

    // **Magnific Popup for Lightbox Gallery**:
    // Initializes Magnific Popup for elements with the data-fancybox="gallery" attribute.
    // - This allows images to be displayed in a lightbox with gallery navigation.
    $('[data-fancybox="gallery"]').magnificPopup({ type: 'image' });

    // **Modal Popup Functionality**:
    // This code handles opening and closing of modals.
    // - Clicking a button with the 'modal-button' class shows the associated modal.
    // - Clicking a close button or outside the modal hides it.
    $('.modal-button').on('click', function() {
        var modalId = $(this).data('modal');
        $('#' + modalId).show();
    });

    $('.close').on('click', function() {
        var modalId = $(this).data('modal');
        $('#' + modalId).hide();
    });

    $(window).on('click', function(event) {
        if ($(event.target).hasClass('modal')) {
            $(event.target).hide();
        }
    });

    // **Masonry Layout Initialization**:
    // Initializes a Masonry layout for the portfolio container.
    // - Masonry arranges portfolio items in a grid layout with varying heights.
    // - The layout updates once images are fully loaded.
    $(document).ready(function() {
        var $portfolioContainer = $('.portfolio-container').masonry({
            itemSelector: '.portfolio-item',
            columnWidth: '.portfolio-item',
            percentPosition: true
        });

        $portfolioContainer.imagesLoaded().progress(function() {
            $portfolioContainer.masonry('layout');
        });

        // **Slick Carousel for Portfolio**:
        // Initializes a Slick carousel for the portfolio container.
        // - Displays 3 slides at a time and scrolls 1 slide at a time.
        // - Navigation arrows and dots are enabled, with infinite scrolling.
        $('.portfolio-container').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
            infinite: true
        });

        // **Magnific Popup for Gallery**:
        // Re-initializes Magnific Popup for the gallery with specific settings.
        $('[data-fancybox="gallery"]').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });

        // **AOS Initialization**:
        // Re-initializes AOS to apply animations when elements scroll into view.
        AOS.init();

        // **Modal Functionality**:
        // Handles opening and closing of modals with fade effects.
        $('.modal-button').click(function() {
            var modalId = $(this).data('modal');
            $('#' + modalId).fadeIn();
        });

        $('.close').click(function() {
            var modalId = $(this).data('modal');
            $('#' + modalId).fadeOut();
        });

        $(window).click(function(event) {
            if ($(event.target).hasClass('modal')) {
                $(event.target).fadeOut();
            }
        });

        // **Leaflet Map Initialization**:
        // Initializes a Leaflet map with coordinates and settings if the map element exists.
        if ($('#map').length) {
            var map = L.map('map').setView([51.505, -0.09], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([51.5, -0.09]).addTo(map)
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                .openPopup();
        }
    });
});

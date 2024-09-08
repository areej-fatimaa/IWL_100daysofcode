// Ensure DOM is fully loaded
$(document).ready(function () {
    // Nav background change on scroll
    let header = $("header");
    $(window).on("scroll", function () {
        header.toggleClass("shadow", $(window).scrollTop() > 0);
    });

    // Filter functionality
    $(".filter-item").on("click", function () {
        const value = $(this).data("filter");
        if (value === "all") {
            $(".post-box").show("1000");
        } else {
            $(".post-box")
                .not("." + value)
                .hide(1000);
            $(".post-box")
                .filter("." + value)
                .show("1000");
        }
        $(this).addClass("active-filter").siblings().removeClass("active-filter");
    });
});

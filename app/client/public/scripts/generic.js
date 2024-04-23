$(document).ready(function() {
    $(".menu_toggle").on("click", function() {
        $(".nav_list").toggleClass("showing");
        $(".nav_list ul").toggleClass("showing");
    });
});
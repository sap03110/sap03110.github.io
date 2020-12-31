var counter= 3;
timer = () => {
    counter--;
    if(counter == 0) {
        $("#port-count").hide();
        clearInterval(timer);
    } 
    else {
        $("#counting").text(counter);
    }
};

$("#start-btn").click(() => {
    $("#port-start").hide();
    $("#port-count").css("display","table");
    setInterval(timer, 1000);
});

$("#how-btn").click(() => {
    $("#port-howto").css("display","table");
});

$(".exit-howto, #ok-btn").click(() => {
    $("#port-howto").hide();
});

$("#start-btn").mouseover(() => {
    $("#start-btn").attr("src","images/start2.png");
});

$("#start-btn").mouseout(() => {
    $("#start-btn").attr("src","images/start.png");
});

$("#how-btn").mouseover(() => {
    $("#how-btn").attr("src","images/how2.png");
});

$("#how-btn").mouseout(() => {
    $("#how-btn").attr("src","images/how.png");
});

$("#ok-btn").mouseover(() => {
    $("#ok-btn").attr("src","images/ok2.png");
});

$("#ok-btn").mouseout(() => {
    $("#ok-btn").attr("src","images/ok.png");
});

$("#result-btn").mouseover(() => {
    $("#result-btn").attr("src","images/ok2.png");
});

$("#result-btn").mouseout(() => {
    $("#result-btn").attr("src","images/ok.png");
});
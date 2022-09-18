var hours= [];

var createHour =function(eventText, time){
    let timeblock=$("<div>")
    timeblock.addClass("time-block row")
    let hour=$("<div>").addClass("hour col-1");
    let description=$("<div>").addClass("description col-10");
    let save=$("<button>").addClass("saveBtn col-1");
    save.text("Save");
    description.text(eventText);
    if(time<4){
        hour.text(`${time+8} AM`)
    }
    else if(time>4){
        hour.text(`${time-4} PM`)
    }
    else{
        hour.text('12 PM')
    }
    console.log(moment().hour()>hour.text);
    if(moment().hour()>time+8){
        description.addClass('past');
    }
    else     if(moment().hour()<time+8){
        description.addClass('future');
    }
    else{
        description.addClass('present')
    }
    timeblock.append(hour);
    
    timeblock.append(description);
    timeblock.append(save);
    $("div.container").append(timeblock);
    hours.push(eventText);
}
var date=moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
console.log(date);
$("#currentDay").text(date);

var loadCal = function(){
    schedule= JSON.parse(localStorage.getItem("schedule"));
    if(!schedule){
        console.log('noSchedule')
        hours=[];
        for (let i=0; i<11; i++){
            createHour('', i)
            
            
          } ;

    }
    else{
        hours=[];
        $.each(schedule, function(index, val){
            createHour(val, index)
            
        })
    }
}

var saveSchedule= function() {
    localStorage.setItem("schedule", JSON.stringify(hours));
    console.log('please');
}

loadCal();
saveSchedule();

$('.saveBtn').on('click', function(){
    var temp=[];
    $('.description').each(function(index){
        var text=$(this).text();
        temp.push(text);
    })
    hours=temp;
    saveSchedule();
});

$(document).on("click",".description", function(){
    console.log('clicked');
    var text = $(this)
    .text()
    .trim();

    var classDesc=$(this).attr('class');

    var textInput = $("<textarea>")
    .addClass("form-control")
    .val(text);
    
    textInput.addClass(classDesc);

  $(this).replaceWith(textInput);
  textInput.trigger("focus");

});

    $(document).on("blur", '.description', function(){
        var text = $(this).val();
        classDesc= $(this).attr('class');
        console.log(classDesc);
        var taskP = $("<div>")
        .addClass(classDesc)
        .text(text);
        taskP.addClass('h-100')
    
      // replace textarea with new content
      $(this).replaceWith(taskP);
      console.log('it blurred');
    
})









/*Set the height of the testimonials container to be the same height as the
longest testimonial*/

let $d = $("div.abouttext")
let tallestHeight = 0

$d.each(function(){
    let $text = $(this)
    let thisHeight = $text.outerHeight()

    if(thisHeight > tallestHeight) tallestHeight = thisHeight
})

$d.css("height", tallestHeight + "px")
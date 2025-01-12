
/*Set the height of the testimonials container to be the same height as the
longest testimonial*/

let $d = $("#testimonials")
let tallestHeight = 0

$d.each(function(){
    let $text = $(this)
    let thisHeight = $text.outerheight()

    console.log(thisHeight) /*For testing*/

    if(thisHeight > tallestHeight) tallestHeight =thisHeight
})

$d.css("height", tallestHeight)
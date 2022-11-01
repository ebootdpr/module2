$('#boton').click(() => {
    $.get('http://localhost:5000/amigos', (resp) => {
        for (const elem of resp) {
                if ($(`#X${elem.id}`).length == 0){
                    $(`<li id='X${elem.id}'>${elem.name} X</li>`).appendTo($('#lista'))
                }
        }
    })
})

$('#search').click(()=>{
    const id = $('#input')[0].value
    $.get(`http://localhost:5000/amigos/${id}`,(resp)=>{
        $(`<div id='amigofiel'>${resp.id} ${resp.name}</div>`).appendTo($('#amigo'))
    })
})

$('#delete').click(()=>{
    const id = $('#inputDelete')[0].value
    $.ajax({
        url: `http://localhost:5000/amigos/${id}`,
        type: 'DELETE',
        success: function(result) {
            $(`<span>Amigo ${result.name} borrado</span>`).appendTo($('#success'))
            $(`#X${id}`).remove();
        }
    });
    
})

$('#add').click(()=>{
    let obj = {
        "name":`${$('#inputAddName')[0].value}`,
            "id":`${$('#inputAddID')[0].value}`,
            "age":`${$('#inputAddAge')[0].value}`,
            "email":`${$('#inputAddEmail')[0].value}`
    }
    $.ajax({
        type:   "POST",
        url:    "http://localhost:5000/amigos/",
        data:   {
            "name":`${$('#inputAddName')[0].value}`,
            "id":`${$('#inputAddID')[0].value}`,
            "age":`${$('#inputAddAge')[0].value}`,
            "email":`${$('#inputAddEmail')[0].value}`
        },
        success: function (tekst) {
            console.log(obj)
        },
        error: function (request, error) {
            console.log ("ERROR:" + error);
        }
    });
    
})
var checkboxes = $('#transaction-stocks').find('input')
var allCheckbox = $('#all-checked');
var deleteButton = $('#btn-delete');

allCheckbox.click(function () {

    if ($(this)['0'].checked) {
        for (var i = 0; i < checkboxes.length; i++) {
            $(checkboxes[i])['0'].checked = true;
        }
    } else {
        for (var i = 0; i < checkboxes.length; i++) {
            $(checkboxes[i])['0'].checked = false;
        }
    }

});

deleteButton.click(function () {

    var transaction = checkboxes.parent().parent();
    var ids = [];


    for (var i = 0; i < checkboxes.length; i++) {

        var stockClass = $(checkboxes[i]).parent().parent().attr('class');

        if ($(checkboxes[i])['0'].checked && stockClass != 'acao invisible') {
            ids.push(transaction[i].id)
        }
    }

    var send = $.ajax({
        url: '/transactions',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ids : ids}),
    });

    for (var i = 0; i < ids.length; i++) {
        for (var j = 0; j < transaction.length; j++) {
            if (transaction[j].id == ids[i]) {
                $(transaction[j]).hide(800);
            }
        }
    }

    // popup avisando o linha foi removida
    Materialize.toast('Transação removida.', 1500);

    // desabilita os checkboxes
    //allCheckbox['0'].checked = false;

    // atualiza o navegador
    setInterval(function () {
        location.reload();
    }, 1510);
});

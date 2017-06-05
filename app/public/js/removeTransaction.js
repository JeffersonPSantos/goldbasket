var checkboxes = $('#transaction-shares').find('input')
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
        if ($(checkboxes[i])['0'].checked) {
            ids.push(transaction[i].id)
        }
    }

    var send = $.ajax({
        url: '/transacoes',
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

});

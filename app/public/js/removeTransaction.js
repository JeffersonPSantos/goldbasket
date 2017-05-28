var transactionTable = document.querySelector('#tabela-acoes');

var allChecked = document.querySelector('#check-transaction');

allChecked.addEventListener('click', function () {

    var allChecked = document.querySelectorAll('#check-transaction');

    if (this.checked) {
        for (var i = 0; i < allChecked.length; i++) {
            allChecked[i].checked = true;
        }
    } else {
        for (var i = 0; i < allChecked.length; i++) {
            allChecked[i].checked = false;
        }
    }
});

transactionTable.addEventListener('click', function () {

        var selectedTransaction = event.target;
        var buttonDelete = document.getElementById('btn-delete');

        if (selectedTransaction.checked){

            var shareID = selectedTransaction.parentNode.parentNode.id;

            buttonDelete.addEventListener('click', function () {
                var request  = new XMLHttpRequest();
                request.open("DELETE", '/transacoes/acoes/' + shareID);
                request.send();
            });

        }

    });

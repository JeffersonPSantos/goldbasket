// Arquivo modelo que evia dados para a Rota
transactionTable.click(function (event) {
        var bodyTable = transactionTable.find('tbody');

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


// Rota
// Deleta dados no banco
app.delete('/transacoes/acoes/:id', function (req, res, next) {

    var id = req.params.id;

    var trasaction = {
        id_transaction:id
    }

    var connection = app.infra.connectionFactory();
    var shareDAO = new app.infra.shareDAO(connection);
    shareDAO.remove(trasaction, function (error, results) {
        res.redirect('/transacoes/acoes');
    });

});

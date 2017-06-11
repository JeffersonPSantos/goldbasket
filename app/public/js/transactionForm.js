var buttonAdd = document.querySelector("#add-stock");

buttonAdd.addEventListener("click", function(event) {
    event.preventDefault();

    var form = document.querySelector("#add-form");

    var stock = getStockForm(form);

    // valida o formulário
    var errors = stockValidation(stock, form);

    if (errors.length > 0) {
        displayErrorMessage(errors);
        return;
    }

    // limpa mensagens da <ul> e reinicia o formulário <form>
    document.querySelector("#error-message").innerHTML = "";
    //form.reset();

    // popup avisando o linha foi adicionada
    Materialize.toast('Transação adicionada.', 1500, '', function () {
        form.submit();
    });

});

function getStockForm(form) {

    var stock = {
        ticker: form.ticker.value,
        date: form.date.value,
        quantity: form.quantity.value,
        price: form.price.value,
        brokerage: form.brokerage.value,
    }

    return stock;
}

function stockValidation(stock, form) {

    var errors = [];

    if (stock.brokerage.length == 0) {
        errors.unshift("O campo 'Corretagem' não pode ficar em branco.");
        form.brokerage.classList.add("campo-valido");
        form.brokerage.focus();
    } else if (stock.brokerage < 0) {
        errors.unshift("'Corretagem' não pode ser menor que 0.");
        form.brokerage.classList.add("campo-valido");
        form.brokerage.focus();
    } else {
        form.brokerage.classList.remove("campo-valido");
    }

    if (stock.price.length == 0) {
        errors.unshift("O campo 'Preço' não pode ficar em branco.");
        form.price.classList.add("campo-valido");
        form.price.focus();
    } else if (stock.price < 0) {
        errors.unshift("'Preço' não pode ser menor que 0.");
        form.price.classList.add("campo-valido");
        form.price.focus();
    } else {
        form.price.classList.remove("campo-valido");
    }

    if (stock.quantity.length == 0) {
        errors.unshift("O campo 'Quantidade' não pode ficar em branco.");
        form.quantity.classList.add("campo-valido");
        form.quantity.focus();
    } else if (stock.quantity <= 0) {
        errors.unshift("'Quantidade' não pode ser menor que 1.");
        form.quantity.classList.add("campo-valido");
        form.quantity.focus();
    } else {
        form.quantity.classList.remove("campo-valido");
    }

    if (stock.date.length == 0) {
        errors.unshift("O campo 'Data' não pode ficar em branco.");
        form.date.classList.add("campo-valido");
        form.date.focus();
    } else {
        form.date.classList.remove("campo-valido");
    }

    if (stock.ticker.length == 0) {
        errors.unshift("O campo 'Código' não pode ficar em branco.");
        form.ticker.classList.add("campo-valido");
        form.ticker.focus();
    } else {
        form.ticker.classList.remove("campo-valido");
    }

    return errors;
}

function displayErrorMessage(erros) {

    var ul = document.querySelector("#error-message");
    ul.innerHTML = "";

    erros.forEach(function(error) {
        var li = document.createElement("li");
        li.textContent = error;
        ul.appendChild(li);
    });
}

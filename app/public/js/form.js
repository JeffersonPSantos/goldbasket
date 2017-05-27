var buttonAdd = document.querySelector("#add-share");
buttonAdd.addEventListener("click", function (event) {
  event.preventDefault();

  var form = document.querySelector("#add-form");

  var share = getShareForm(form);

  // valida o formulário
  var errors = shareValidation(share, form);

  if (errors.length > 0) {
    displayErrorMessage(errors);
    return;
  }

  // limpa mensagens da <ul> e reinicia o formulário <form>
  document.querySelector("#error-message").innerHTML = "";
  //form.reset();

  form.submit();

});

function getShareForm(form) {

    var share = {
      ticker: form.ticker.value,
      date: form.date.value,
      quantity: form.quantity.value,
      price: form.price.value,
      brokerage: form.cost.value,
    }

    return share;
}

function shareValidation(share, form) {

    var errors = [];

    if (share.brokerage.length == 0) {
        errors.push("O campo 'Corretagem' não pode ficar em branco.");
        form.cost.classList.add("campo-valido");
        form.cost.focus();
    } else if (share.brokerage < 0) {
        errors.push("'Corretagem' não pode ser menor que 0.");
        form.cost.classList.add("campo-valido");
        form.cost.focus();
      } else {
      form.cost.classList.remove("campo-valido");
    }

    if (share.price.length == 0) {
        errors.push("O campo 'Preço' não pode ficar em branco.");
        form.price.classList.add("campo-valido");
        form.price.focus();
    } else if (share.price < 0) {
        errors.push("'Preço' não pode ser menor que 0.");
        form.price.classList.add("campo-valido");
        form.price.focus();
    } else {
      form.price.classList.remove("campo-valido");
    }

    if (share.quantity.length == 0) {
        errors.push("O campo 'Quantidade' não pode ficar em branco.");
        form.quantity.classList.add("campo-valido");
        form.quantity.focus();
    } else if (share.quantity <= 0) {
      errors.push("'Quantidade' não pode ser menor que 1.");
      form.quantity.classList.add("campo-valido");
      form.quantity.focus();
    } else {
      form.quantity.classList.remove("campo-valido");
    }

    if (share.date.length == 0) {
        errors.push("O campo 'Data' não pode ficar em branco.");
        form.date.classList.add("campo-valido");
        form.date.focus();
    } else {
      form.date.classList.remove("campo-valido");
    }

    if (share.ticker.length == 0) {
        errors.push("O campo 'Código' não pode ficar em branco.");
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

    erros.forEach(function (error) {
        var li = document.createElement("li");
        li.textContent = error;
        ul.appendChild(li);
    });
}

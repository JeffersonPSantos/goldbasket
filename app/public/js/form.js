var botaoAdicionar = document.querySelector("#adiciona-acao");
botaoAdicionar.addEventListener("click", function (event) {
  event.preventDefault();

  var form = document.querySelector("#form-adiciona");

  var acao = obtemAcaoDoFormulario(form);

  // valida o formulário
  var erros = validaAcao(acao, form);

  if (erros.length > 0) {
    exibeMensagemDeErro(erros);
    return;
  }

  adicionaAcaoNaTabela(acao)

  // limpa mensagens da <ul> e reinicia o formulário <form>
  document.querySelector("#mensagens-erro").innerHTML = "";
  form.reset();
});

function adicionaAcaoNaTabela(acao){
    // inclui na tabela
    var tabela = document.querySelector("#tabela-acoes");

    tabela.appendChild(montaTr(acao));
}

function obtemAcaoDoFormulario(form) {

    var acao = {
      empresa: form.empresa.value,
      codigo: form.codigo.value,
      setor: form.setor.value,
      data: form.data.value,
      quantidade: form.quantidade.value,
      preco: form.preco.value,
      corretagem: form.corretagem.value,
      custo: calculaCusto(form.corretagem.value, form.quantidade.value, form.preco.value).toFixed(2),
      valor: (form.preco.value * form.quantidade.value).toFixed(2),
      ganho: calculaGanho(form.corretagem.value, form.quantidade.value, form.preco.value).toFixed(2),
      retorno: calculaRetorno(form.corretagem.value, form.quantidade.value, form.preco.value).toFixed(2)

    }

    return acao;
}

function validaAcao(acao, form) {

    var erros = [];

    if (acao.corretagem.length == 0) {
        erros.push("O campo 'Corretagem' não pode ficar em branco.");
        form.corretagem.classList.add("campo-valido");
        form.corretagem.focus();
      } else if (acao.corretagem < 0) {
        erros.push("'Corretagem' não pode ser menor que 0.");
        form.corretagem.classList.add("campo-valido");
        form.corretagem.focus();
      } else {
      form.corretagem.classList.remove("campo-valido");
    }

    if (acao.preco.length == 0) {
        erros.push("O campo 'Preço' não pode ficar em branco.");
        form.preco.classList.add("campo-valido");
        form.preco.focus();
      } else if (acao.preco < 0) {
        erros.push("'Preço' não pode ser menor que 0.");
        form.preco.classList.add("campo-valido");
        form.preco.focus();
    } else {
      form.preco.classList.remove("campo-valido");
    }

    if (acao.quantidade.length == 0) {
        erros.push("O campo 'Quantidade' não pode ficar em branco.");
        form.quantidade.classList.add("campo-valido");
        form.quantidade.focus();
    } else if (acao.quantidade <= 0) {
      erros.push("'Quantidade' não pode ser menor que 1.");
      form.quantidade.classList.add("campo-valido");
      form.quantidade.focus();
    } else {
      form.quantidade.classList.remove("campo-valido");
    }

    if (acao.data.length == 0) {
        erros.push("O campo 'Data' não pode ficar em branco.");
        form.data.classList.add("campo-valido");
        form.data.focus();
    } else {
      form.data.classList.remove("campo-valido");
    }

    if (acao.setor.length == 0) {
        erros.push("O campo 'Setor' não pode fica em branco.");
        form.setor.classList.add("campo-valido");
        form.setor.focus();
    } else {
      form.setor.classList.remove("campo-valido");
    }

    if (acao.empresa.length == 0) {
      erros.push("O campo 'Empresa' não pode ficar em branco.");
      form.empresa.classList.add("campo-valido");
      form.empresa.focus();
    } else {
      form.empresa.classList.remove("campo-valido");
    }

    if (acao.codigo.length == 0) {
        erros.push("O campo 'Código' não pode ficar em branco.");
        form.codigo.classList.add("campo-valido");
        form.codigo.focus();
      } else {
        form.codigo.classList.remove("campo-valido");
      }

    return erros;
}

function exibeMensagemDeErro(erros) {

    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function (erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function montaTr(acao) {
    var tr = document.createElement("tr");
    tr.classList.add("acao");

    tr.appendChild(montaTd(acao.empresa, "info-empresa"));
    tr.appendChild(montaTd(acao.codigo, "info-codigo"));
    tr.appendChild(montaTd(acao.setor, "info-setor"));
    tr.appendChild(montaTd(acao.preco, "info-preco"));
    tr.appendChild(montaTd(acao.quantidade, "info-quantidade"));
    tr.appendChild(montaTd(acao.custo, "info-custo"));
    tr.appendChild(montaTd(acao.valor, "info-valor"));
    tr.appendChild(montaTd(acao.ganho, "info-ganho"));
    tr.appendChild(montaTd(acao.retorno, "info-retorno"));
    tr.appendChild(montaTd("", "info-peso"));

    return tr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;

    return td;
}

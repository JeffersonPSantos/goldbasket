var campoCodigo = document.querySelector("#adiciona-codigo");

campoCodigo.addEventListener("input", function () {


for (var i = 0; i < codigos.length; i++){

    var campoEmpresa = document.querySelector("#adiciona-empresa");
    var campoSetor = document.querySelector("#adiciona-setor");

    var codigoDigitado = this.value.toLowerCase();
    var codigoDaLista = codigos[i].cod.toLowerCase();


    if (codigoDigitado == codigoDaLista){

        campoEmpresa.value = codigos[i].empresa;
        campoSetor.value = codigos[i].setor;
        // desabilita campos
        campoEmpresa.disabled = true;
        campoSetor.setAttribute("disabled", true);
        break;

    } else {

        campoEmpresa.value = "";
        campoSetor.value = "";
        // habilita campos
        campoEmpresa.disabled = false;
        campoSetor.disabled = false;

    }

}

});

// lista de codigos
var codigos = [
    {

        cod : "ESTC3",
        empresa : "Estácio SA",
        setor : "Educação"

    },
    {
        cod : "RAIL3",
        empresa : "Rumo SA",
        setor : "Logistico"
    },
    {
        cod : "WIZS3",
        empresa : "Par Corretora",
        setor : "Seguros"
    }
];

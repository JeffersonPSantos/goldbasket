var searchType = $('#search-type');
var searchTicker = $('#search-ticker');
var searchDate = $('#search-date');
var sharesList = $('#transaction-shares').find('tr');

searchType.on('input', { classInfo : '.type-info'}, filter);
searchTicker.on('input', { classInfo : '.ticker-info'}, filter);
searchDate.on('input', { classInfo : '.date-info'}, filter);

// realiza um 'filtro' na lista de transações, por tipo de dado passado por parâmetro.
function filter(info) {

    if ($(this).val().length > 0) {
        for (var i = 0; i < sharesList.length; i++) {

            var td = $(info.data.classInfo)[i];
            var fieldValue = $(td).text();

            var expression = new RegExp($(this).val(), 'i');

            if (expression.test(fieldValue)) {
                $(sharesList[i]).removeClass('invisible');
            } else {
                $(sharesList[i]).addClass('invisible');
            }
        }
    }
    else {
        for (var i = 0; i < sharesList.length; i++) {
            $(sharesList[i]).removeClass('invisible');
        }
    }
}

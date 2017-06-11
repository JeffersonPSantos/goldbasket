var searchType = $('#search-type');
var searchTicker = $('#search-ticker');
var searchDate = $('#search-date');
var stocksList = $('#transaction-stocks').find('tr');

searchType.on('input', { classInfo : '.type-info'}, filter);
searchTicker.on('input', { classInfo : '.ticker-info'}, filter);
searchDate.on('input', { classInfo : '.date-info'}, filter);

// realiza um 'filtro' na lista de transações, por tipo de dado passado por parâmetro.
function filter(info) {

    if ($(this).val().length > 0) {
        for (var i = 0; i < stocksList.length; i++) {

            var td = $(info.data.classInfo)[i];
            var fieldValue = $(td).text();

            var expression = new RegExp($(this).val(), 'i');

            if (expression.test(fieldValue)) {
                $(stocksList[i]).removeClass('invisible');
            } else {
                $(stocksList[i]).addClass('invisible');
            }
        }
    }
    else {
        for (var i = 0; i < stocksList.length; i++) {
            $(stocksList[i]).removeClass('invisible');
        }
    }
}

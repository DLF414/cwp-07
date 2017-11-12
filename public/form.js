$(document).ready(function(event) {
    $('form[id=article-form]').submit(function(event){
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "./api/articles/create",
            data: JSON.stringify(getFormData($("#article-form"))),
            dataType: "json",
            contentType : "application/json"
        });
    });
});

function getFormData(form){
    let unindexed = form.serializeArray();
    let indexed = {};
    $.map(unindexed, function(n, i){
        indexed[n['name']] = n['value'];
    });
    return indexed;
}
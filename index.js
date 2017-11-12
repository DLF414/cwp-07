let xhrChangeField;
let xhrChangeOrder;
let fieldSelector;
let orderSelector;

window.onload = function () {
    fieldSelector = document.getElementById("field-selector");
    orderSelector = document.getElementById("order-selector");

    fieldSelector.addEventListener("change", onChangeField, false);
    orderSelector.addEventListener("change", onChangeOrder, false);
};
function onChangeHandler(xhr, selector) {
    xhr = new XMLHttpRequest();
    xhr.open('POST', "./api/articles/readAll", true);
    let request = {
        "sortField" : fieldSelector.options[fieldSelector.selectedIndex].value
    };
    xhr.onreadystatechange = processRequestField;
    xhr.send(JSON.stringify(request));
}
function onChangeField() {
    xhrChangeField = new XMLHttpRequest();
    xhrChangeField.open('POST', "./api/articles/readAll", true);
    let request = {
        "sortField" : fieldSelector.options[fieldSelector.selectedIndex].value
    };
    xhrChangeField.onreadystatechange = processRequestField;
    xhrChangeField.send(JSON.stringify(request));
}

function onChangeOrder() {
    xhrChangeOrder = new XMLHttpRequest();
    xhrChangeOrder.open('POST', "./api/articles/readAll", true);
    let request = {
        "sortOrder" : orderSelector.options[orderSelector.selectedIndex].value
    };
    xhrChangeOrder.onreadystatechange = processRequestOrder;
    xhrChangeOrder.send(JSON.stringify(request));
}

let xhr = new XMLHttpRequest();
xhr.open('POST', "./api/articles/readAll", true);
xhr.onreadystatechange = processRequest;
xhr.send(JSON.stringify({}));


function processRequest(e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
        removeArticles();
        addArticles(xhr);
    }
}

function processRequestField(e) {
    if (xhrChangeField.readyState === 4 && xhrChangeField.status === 200) {
        removeArticles();
        addArticles(xhrChangeField);
    }
}

function processRequestOrder(e) {
    if (xhrChangeOrder.readyState === 4 && xhrChangeOrder.status === 200) {
        removeArticles();
        addArticles(xhrChangeOrder);
    }
}

function addArticles(xhr) {
    let response = JSON.parse(xhr.responseText);
    let container = document.getElementById("articles");
    container.setAttribute("class", "card-deck");

    response.items.forEach((article) => {
        let div = document.createElement("div");
        div.setAttribute("class", "article card text-center");
        div.setAttribute("id", article.id);

        let title = document.createElement("h3");
        title.setAttribute("class", "article-title card-title bg-light");
        title.appendChild(document.createTextNode(article.title));
        div.appendChild(title);

        let date = document.createElement("h6");
        date.setAttribute("class", "article-date card-subtitle text-muted");
        date.appendChild(document.createTextNode("Date: " + article.date));
        div.appendChild(date);

        let author = document.createElement("h6");
        author.setAttribute("class", "article-date card-subtitle text-muted");
        author.appendChild(document.createTextNode("Author: " + article.author));
        div.appendChild(author);

        let text = document.createElement("p");
        text.setAttribute("class", "article-text card-body");
        text.appendChild(document.createTextNode(article.text));
        div.appendChild(text);

        // let comments = document.createElement("div");
        // article.comments.forEach((value) => {
        //     let comment = document.createElement("div");
        //     comment.setAttribute("class", "comment");
        //     comment.appendChild(document.createTextNode(value.));
        //
        //    comments.appendChild(comment);
        // });

        container.appendChild(div);
    });
}

function removeArticles() {
    document.getElementById("articles").innerHTML = "";
}
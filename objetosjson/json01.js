
fetch(`https://jsonplaceholder.typicode.com/users`)
.then(response => response.json())
.then(data => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(dados => dados.json())
    .then(posts => {
        posts.forEach(postagem => {
            const username = data[postagem["userId"] - 1]["name"];
            const body = postagem["body"];
            const titulo = postagem["title"];
            displayposts(titulo, body, username);
        })

    })
})

function displayposts(titulo, body, usuario){
    const lista = document.getElementById("lelo");
    const postagem = document.createElement("div");
    postagem.innerHTML = `${titulo}<br><br> ${body}<br><br> ${usuario}`;
    lista.appendChild(postagem)

}
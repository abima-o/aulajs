//fetch(`https://jsonplaceholder.typicode.com/comments`)
//.then(response => response.json())
//.then(comments => {
//    fetch(`https://jsonplaceholder.typicode.com/posts`)
//    .then(response => response.json())
//    .then(posts => {
//        posts.forEach(postagem => {
//            const postComments = comments.filter(comment => comment.postagemId === postagem.Id);
//            const body = postagem.body;
//            const username = `User ${postagem.userId}`;
//            displayposts(postComments, body, username);
//        })
//    })
//})

//function displayposts(comentarios, body, usuario){
//    const lista = document.getElementById("lala");
//    const postagem = document.createElement("div");
//    postagem.innerHTML = `${comentarios.map(comment => comment.body).join("<br>")}<br><br> ${body}<br><br> ${usuario}`;
//    lista.appendChild(postagem)
//}

const postIdSelecionado = 6; // ID do post que você quer selecionar

fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postIdSelecionado}`)
.then(response => response.json())
.then(comments => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postIdSelecionado}`)
    .then(response => response.json())
    .then(post => {
        const username = `User ${post.userId}`; // Placeholder para nome de usuário
        const body = post.body;
        displayposts(comments, body, username);
    });
});

function displayposts(comentarios, body, usuario){
    const lista = document.getElementById("lala");
    const postagem = document.createElement("div");
    postagem.innerHTML = `
        <h3>${usuario}</h3>
        <p>${body}</p>
        <h4>Comentários:</h4>
        <ul>
            ${comentarios.map(comment => `<li>${comment.body}</li>`).join('')}
        </ul>
    `;
    lista.appendChild(postagem);
}
function submeter() {
    let confirmar = confirm("Você confirma essa ação? ")
    if (confirmar == true) {
        
        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;
    


    document.getElementById("resultado").innerHTML =
        "<h3>Informações Recebidas</h3>"
        "<p>Nome: " + nome + "</p>"
        "<p>E-mail: " + email + "</p>"
    }    
    else{
        document.getElementById("resultado").innerHTML =
            "<h2>Açâo cancelada.</h2>"
    }
}
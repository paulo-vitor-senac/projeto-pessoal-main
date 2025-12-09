document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("usuario").value;
    const password = document.getElementById("senha").value;

    // Faz a requisição para o backend hospedado no Render
    const resposta = await fetch("https://backend-projetopessoal.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await resposta.json();

    if (data.ok) {
        // Login OK → redireciona para o painel
        window.location.href = "admin-visitas.html";
    } else {
        // Login errado → mostra erro na tela
        const erro = document.getElementById("errorMsg");
        erro.style.display = "block";
        erro.innerText = "Usuário ou senha incorretos.";
    }
});

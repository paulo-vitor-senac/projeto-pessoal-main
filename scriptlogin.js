function fazerLogin() {
    const usuario = document.getElementById("user").value;
    const senha = document.getElementById("pass").value;

    const USER_CORRETO = "pauloadm123";
    const SENHA_CORRETA = "paulovitor18";

    if (usuario === USER_CORRETO && senha === SENHA_CORRETA) {
        window.location.href = "admin-visitas.html";
    } else {
        document.getElementById("error").textContent = "Usuário ou senha incorretos.";
    }
}

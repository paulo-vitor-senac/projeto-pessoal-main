const form = document.getElementById("meuForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(
      "https://backend-contatos-0ji7.onrender.com/contato",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    // Mensagem de sucesso ou erro no próprio HTML
    const statusMensagem = document.getElementById("statusMensagem");
    if (response.ok) {
      statusMensagem.textContent = "Mensagem enviada com sucesso!";
      statusMensagem.style.color = "green";
      form.reset();
    } else {
      statusMensagem.textContent =
        result.message || "Erro ao enviar a mensagem.";
      statusMensagem.style.color = "red";
    }
  } catch (error) {
    console.error(error);
    const statusMensagem = document.getElementById("statusMensagem");
    statusMensagem.textContent = "Erro ao enviar a mensagem. Tente novamente.";
    statusMensagem.style.color = "red";
  }
  const form = document.getElementById("meuForm");
  const statusMensagem = document.getElementById("statusMensagem");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      nome: form.nome.value,
      email: form.email.value,
      titulo: form.titulo.value,
      mensagem: form.mensagem.value,
    };

    try {
      const response = await fetch(
        "https://backend-contatos-0ji7.onrender.com/contato",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        statusMensagem.textContent = "Mensagem enviada com sucesso!";
        form.reset();
      } else {
        statusMensagem.textContent =
          "Erro ao enviar a mensagem. Tente novamente.";
      }
    } catch (error) {
      console.error(error);
      statusMensagem.textContent =
        "Erro ao enviar a mensagem. Tente novamente.";
    }
  });
});

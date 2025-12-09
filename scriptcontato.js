        const form = document.getElementById("meuForm");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch("http://localhost:3000/contato", { // ou URL do Render
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                alert(result.message);
                form.reset();
            } catch (error) {
                alert("Erro ao enviar a mensagem.");
                console.error(error);
            }
        });
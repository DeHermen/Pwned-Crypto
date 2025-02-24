let currentPage = 1;
const recordsPerPage = 10; // Número de breaches por página

async function loadBreachData(page) {
    try {
        const selectedFile = document.getElementById('breachFile').value; // Obtém o arquivo selecionado
        const response = await fetch(selectedFile); // Lê o arquivo de texto
        const data = await response.text();
        const lines = data.split('\n').filter(line => line.trim() !== ""); // Remove linhas vazias

        const totalPages = Math.ceil(lines.length / recordsPerPage);
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        currentPage = page;

        const startIndex = (page - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        const pageContent = lines.slice(startIndex, endIndex).join('\n');

        document.getElementById('breachContent').textContent = pageContent || 'No data available';
        document.getElementById('pageIndicator').textContent = `Page ${currentPage} of ${totalPages}`;

        // Desativa botões se for necessário
        document.getElementById('prevPage').disabled = currentPage === 1;
        document.getElementById('nextPage').disabled = currentPage === totalPages;

    } catch (error) {
        document.getElementById('breachContent').textContent = "Failed to load data.";
    }
}

function changePage(direction) {
    loadBreachData(currentPage + direction);
}

document.addEventListener("DOMContentLoaded", () => loadBreachData(currentPage));

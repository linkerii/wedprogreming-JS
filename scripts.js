const systemInfo = {
    browser: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language
};
localStorage.setItem('userSystemInfo', JSON.stringify(systemInfo));

window.onload = function() {
    const info = JSON.parse(localStorage.getItem('userSystemInfo'));
    const footer = document.querySelector('footer');
    if (footer) {
        const infoElement = document.createElement('p');
        infoElement.innerHTML = `<strong>Система:</strong> ${info.platform} | <strong>Браузер:</strong> ${info.browser}`;
        footer.appendChild(infoElement);
    }

    loadComments();

    setTimeout(() => {
        const modal = document.getElementById('contactModal');
        if (modal) modal.style.display = 'block';
    }, 60000);
};

async function loadComments() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/4/comments');
        const comments = await response.json();
        const container = document.querySelector('.resume-container');

        const section = document.createElement('section');
        section.innerHTML = '<h2>Відгуки (API)</h2>';

        comments.forEach(comment => {
            section.innerHTML += `
                <div style="margin-bottom: 15px; border-bottom: 1px dashed #444;">
                    <p><strong>${comment.name}</strong></p>
                    <p>${comment.body}</p>
                </div>`;
        });
        container.insertBefore(section, document.querySelector('footer'));
    } catch (e) { console.log("Помилка API", e); }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
}

const hour = new Date().getHours();
if (hour >= 7 && hour < 21) {
    document.body.classList.add('light-theme');
}
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) item.classList.remove('active');
    });

    faqItem.classList.toggle('active');
    });
});

// --- Floating Contact Form Logic ---
const contactWrapper = document.querySelector('.floating-contact-wrapper');
const triggerBtn = document.querySelector('.contact-trigger-btn');
const closeBtn = document.querySelector('.panel-close-btn');
const overlay = document.querySelector('.panel-overlay');
const panelForm = document.querySelector('.panel-form');

// Open Panel
triggerBtn.addEventListener('click', () => {
    contactWrapper.classList.add('panel-open');
    overlay.classList.add('active');
});

// Close functions grouped
const closePanel = () => {
    contactWrapper.classList.remove('panel-open');
    overlay.classList.remove('active');
};

// Close event listeners
closeBtn.addEventListener('click', closePanel);
overlay.addEventListener('click', closePanel);

// Handle Form Submission (Placeholder behavior)
panelForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const submitBtn = panelForm.querySelector(".form-submit-btn");

    submitBtn.disabled = true;
    submitBtn.textContent = "Lähetetään...";

    const data = {
        name: document.getElementById("form-name").value.trim(),
        email: document.getElementById("form-email").value.trim(),
        phone: document.getElementById("form-phone").value.trim(),
        message: document.getElementById("form-message").value.trim()
    };

    try {

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Unknown error");
        }

        alert("Kiitos yhteydenotostasi! Palaamme asiaan mahdollisimman pian.");

        panelForm.reset();
        closePanel();

    } catch (err) {

        alert("Virhe: " + err.message);

    } finally {

        submitBtn.disabled = false;
        submitBtn.textContent = "Lähetä viesti";

    }

});
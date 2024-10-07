document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    const themeRadios = document.querySelectorAll('input[name="theme"]');
    const fontSizeSlider = document.getElementById('fontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const fontFamilySelect = document.getElementById('fontFamily');
    const accentColorInput = document.getElementById('accentColor');
    const testArea = document.getElementById('testArea');
    const saveButton = document.getElementById('savePreferences');
    const cookieInfo = document.getElementById('cookieInfo');
    const localStorageInfo = document.getElementById('localStorageInfo');

    function applyPreferences(preferences) {
        // Aplicar tema
        document.body.classList.toggle('dark-theme', preferences.theme === 'dark');
        document.querySelector(`input[name="theme"][value="${preferences.theme}"]`).checked = true;

        // Aplicar tamaño de fuente
        document.body.style.fontSize = `${preferences.fontSize}px`;
        fontSizeSlider.value = preferences.fontSize;
        fontSizeValue.textContent = `${preferences.fontSize}px`;

        // Aplicar familia de fuente
        document.body.style.fontFamily = preferences.fontFamily;
        fontFamilySelect.value = preferences.fontFamily;

        // Aplicar color de acento
        document.documentElement.style.setProperty('--accent-color', preferences.accentColor);
        accentColorInput.value = preferences.accentColor;

        // Aplicar estilos al área de prueba
        testArea.style.fontSize = `${preferences.fontSize}px`;
        testArea.style.fontFamily = preferences.fontFamily;

        updateStorageInfo();
    }

    function getPreferences() {
        return {
            theme: document.querySelector('input[name="theme"]:checked').value,
            fontSize: parseInt(fontSizeSlider.value),
            fontFamily: fontFamilySelect.value,
            accentColor: accentColorInput.value
        };
    }

    function savePreferences() {
        const preferences = getPreferences();
        localStorage.setItem(`preferences_${currentUser}`, JSON.stringify(preferences));
        document.cookie = `preferences_${currentUser}=${JSON.stringify(preferences)}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
        updateStorageInfo();
        alert('Preferencias guardadas');
    }

    function updateStorageInfo() {
        cookieInfo.textContent = document.cookie;
        localStorageInfo.textContent = `preferences_${currentUser}: ${localStorage.getItem(`preferences_${currentUser}`)}`;
    }

    function loadPreferences() {
        const savedPreferences = JSON.parse(localStorage.getItem(`preferences_${currentUser}`));
        const defaultPreferences = {
            theme: 'light',
            fontSize: 16,
            fontFamily: 'Arial',
            accentColor: '#0d6efd'
        };
        return {...defaultPreferences, ...savedPreferences};
    }

    themeRadios.forEach(radio => radio.addEventListener('change', () => applyPreferences(getPreferences())));
    fontSizeSlider.addEventListener('input', () => {
        const preferences = getPreferences();
        fontSizeValue.textContent = `${preferences.fontSize}px`;
        applyPreferences(preferences);
    });
    fontFamilySelect.addEventListener('change', () => applyPreferences(getPreferences()));
    accentColorInput.addEventListener('change', () => applyPreferences(getPreferences()));

    saveButton.addEventListener('click', savePreferences);

    // Cargar y aplicar preferencias al iniciar
    const initialPreferences = loadPreferences();
    applyPreferences(initialPreferences);
    const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', () => {
    // Eliminar la información del usuario actual
    localStorage.removeItem('currentUser');
    
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = 'index.html';
});
});
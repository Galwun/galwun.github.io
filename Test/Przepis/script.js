// Ustawienie domyślnego motywu na ciemny
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dark-theme');
    loadRecipes(); // Załaduj przepisy z Local Storage
});

// Funkcja zmiany motywu
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});

// Funkcja pokazująca/ukrywająca przepisy
const buttons = document.querySelectorAll('.toggle');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const tresc = button.nextElementSibling;
        if (tresc.classList.contains('show')) {
            tresc.classList.remove('show');
        } else {
            document.querySelectorAll('.przepis-tresc.show').forEach(el => el.classList.remove('show')); // Ukryj inne otwarte przepisy
            tresc.classList.add('show');
        }
    });
});

// Funkcja dodawania nowych przepisów
const form = document.getElementById('przepis-form');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Zapobiega odświeżeniu strony
    
    // Pobranie wartości z formularza
    const tytul = document.getElementById('tytul').value;
    const skladniki = document.getElementById('skladniki').value;
    const instrukcje = document.getElementById('instrukcje').value;
    const zdjecie = document.getElementById('zdjecie').value;

    // Tworzenie nowego artykułu
    const newArticle = {
        title: tytul,
        ingredients: skladniki.split('\n'),
        instructions: instrukcje.split('\n'),
        image: zdjecie
    };

    // Pobranie aktualnych przepisów z Local Storage
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(newArticle);

    // Zapisanie przepisów w Local Storage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Dodanie nowego artykułu do sekcji z przepisami
    addRecipeToDOM(newArticle);

    // Resetowanie formularza
    form.reset();
});

// Funkcja dodawania przepisu do DOM
function addRecipeToDOM(recipe) {
    const newArticle = document.createElement('article');
    newArticle.classList.add('przepis');
    newArticle.innerHTML = `
        <h2>${recipe.title}</h2>
        <button class="toggle">Pokaż/Ukryj przepis</button>
        <div class="przepis-tresc">
            ${recipe.image ? `<img src="${recipe.image}" alt="Zdjęcie ${recipe.title}">` : ''}
            <h3>Składniki:</h3>
            <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            <h3>Instrukcje:</h3>
            <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
        </div>
    `;

    // Dodanie nowego artykułu do sekcji z przepisami
    document.getElementById('przepisy').appendChild(newArticle);

    // Dodanie zdarzenia dla nowego przycisku "Pokaż/Ukryj przepis"
    const newToggle = newArticle.querySelector('.toggle');
    newToggle.addEventListener('click', () => {
        const tresc = newToggle.nextElementSibling;
        if (tresc.classList.contains('show')) {
            tresc.classList.remove('show');
        } else {
            document.querySelectorAll('.przepis-tresc.show').forEach(el => el.classList.remove('show')); // Ukryj inne otwarte przepisy
            tresc.classList.add('show');
        }
    });
}

// Funkcja ładowania przepisów z Local Storage
function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.forEach(recipe => addRecipeToDOM(recipe));
}

console.log('hi')

const URL_PREFIX = 'http://localhost:3000/';
let page = 1;

const getMonsters = (page) => {
    fetch(`${URL_PREFIX}monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
            document.querySelector('#monster-container').innerHTML = '';
            monsters.forEach(monster => createMonsterCard(monster));
        });
};

const createMonsterCard = (monster) => {
    const monsterCard = document.createElement('div');
    const nameHeader = document.createElement('h2');
    const ageHeader = document.createElement('h4');
    const descriptionParagraph = document.createElement('p');

    nameHeader.innerHTML = monster.name;
    ageHeader.innerHTML = `Age: ${monster.age}`;
    descriptionParagraph.innerHTML = `Bio: ${monster.description}`;

    monsterCard.appendChild(nameHeader);
    monsterCard.appendChild(ageHeader);
    monsterCard.appendChild(descriptionParagraph);

    document.querySelector('#monster-container').appendChild(monsterCard);
};

const createMonsterForm = () => {
    const form = document.createElement('form');
    const nameInput = document.createElement('input');
    const ageInput = document.createElement('input');
    const descriptionInput = document.createElement('input');
    const createButton = document.createElement('button');

    form.id = 'monster-form';
    nameInput.id = 'name';
    ageInput.id = 'age';
    descriptionInput.id = 'description';

    nameInput.placeholder = 'name...';
    ageInput.placeholder = 'age...';
    descriptionInput.placeholder = 'description...';
    createButton.innerHTML = 'Create';

    form.appendChild(nameInput);
    form.appendChild(ageInput);
    form.appendChild(descriptionInput);
    form.appendChild(createButton);

    document.getElementById('create-monster').appendChild(form);

    addSubmitEventListener();
};

const addSubmitEventListener = () => {
    document.querySelector('#monster-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = getFormData();
        postNewMonster(formData);
        clearForm();
    });
};

const getFormData = () => {
    const name = document.querySelector('#name').value;
    const age = parseFloat(document.querySelector('#age').value);
    const description = document.querySelector('#description').value;

    return { name, age, description };
};

const postNewMonster = (data) => {
    const url = `${URL_PREFIX}monsters`;
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(url, options)
        .then(response => response.json())
        .then(newMonster => console.log('new monster', newMonster));
};

const clearForm = () => {
    document.querySelector('#monster-form').reset();
};

const addNavListeners = () => {
    const backButton = document.querySelector('#back');
    const forwardButton = document.querySelector('#forward');

    backButton.addEventListener('click', () => {
        pageDown();
    });

    forwardButton.addEventListener('click', () => {
        pageUp();
    });
};

const pageUp = () => {
    page++;
    getMonsters(page);
};

const pageDown = () => {
    if (page > 1) {
        page--;
        getMonsters(page);
    } else {
        alert('Ain\'t no monsters here');
    }
};

const init = () => {
    getMonsters(page);
    createMonsterForm();
    addNavListeners();
};

document.addEventListener('DOMContentLoaded', init);

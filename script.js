const output = document.getElementById('output');
const options = document.getElementById('options');
const inputLine = document.querySelector('.input-line');
const input = document.getElementById('input');

const aboutMeText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.";

const projects = [
    "",
    "1. UMA Agent - Your favorite restaurant's favorite app - the AI Back Office automation agent.",
    "2. Samachi - Event tech startup, combining social media, brand sponsorship and embedded finance.",
    "3. AIVIS - Abandoned AI Visibility start-up, helping marketers understand what AI is saying about their brands"
];

const socials = [
    "",
    "LinkedIn: linkedin.com/in/adam-noonan/",
    "Twitter: x.com/_adamnoonan",
    "GitHub: github.com/ACNoonan"
];

const writings = [
    "",
    "Coming soon...",
    ""
];

const pingMe = [
    "",
    "You can reach me at: adamnoonan@protonmail.com"
];


function print(message, container = output, withPrompt = true) {
    const p = document.createElement('p');
    if (withPrompt) {
        p.innerHTML = `> ${message}`;
    } else {
        p.innerHTML = message;
    }
    container.appendChild(p);
}

function printLines(lines) {
    lines.forEach(line => print(line));
}

function type(text, element, speed = 50, withPrompt = true) {
    if (withPrompt) {
        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt';
        promptSpan.innerHTML = '> ';
        element.parentNode.insertBefore(promptSpan, element);
    }
    return new Promise(resolve => {
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else {
                resolve();
            }
        }
        typing();
    });
}

async function intro() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const helloLine = document.createElement('p');
    output.appendChild(helloLine);
    
    const helloText = document.createElement('span');
    helloLine.appendChild(helloText);
    await type("Hello", helloText, 50);

    print('<br>', output, false);
    
    const welcomeLine = document.createElement('p');
    output.appendChild(welcomeLine);
    const welcomeText = document.createElement('span');
    welcomeLine.appendChild(welcomeText);
    await type("I'm Adam Noonan", welcomeText);
    
    const thanksLine = document.createElement('p');
    output.appendChild(thanksLine);
    const thanksText = document.createElement('span');
    thanksLine.appendChild(thanksText);
    await type("Welcome to my website", thanksText);

    await new Promise(resolve => setTimeout(resolve, 1000));

    print('<br><br>', output, false);

    const aboutMeHeader = document.createElement('p');
    output.appendChild(aboutMeHeader);
    const aboutMeHeaderText = document.createElement('span');
    aboutMeHeader.appendChild(aboutMeHeaderText);
    await type("Here's a little about me:", aboutMeHeaderText);

    const aboutMeParagraph = document.createElement('p');
    output.appendChild(aboutMeParagraph);
    aboutMeParagraph.innerHTML = "> " + aboutMeText.replace(/\. /g, ".<br>> ");

    print('<br><br>', output, false);

    showOptions();
}

let currentSelection = 0;
const optionItems = [];
let keydownListenerActive = false;

function showOptions() {
    options.innerHTML = '';
    optionItems.length = 0;
    const optionTexts = ['Projects', 'Writings', 'Socials', 'Ping Me'];
    
    optionTexts.forEach((text, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = `> ${text}`;
        optionElement.dataset.index = index;

        optionElement.addEventListener('mouseover', () => {
            updateSelection(index);
        });

        optionElement.addEventListener('click', () => {
            handleOption(text);
        });

        options.appendChild(optionElement);
        optionItems.push(optionElement);
    });

    updateSelection(0);
    if (!keydownListenerActive) {
        document.addEventListener('keydown', handleKeyPress);
        keydownListenerActive = true;
    }
}

function updateSelection(index) {
    if (optionItems[currentSelection]) {
        optionItems[currentSelection].classList.remove('selected');
    }
    currentSelection = index;
    if (optionItems[currentSelection]) {
        optionItems[currentSelection].classList.add('selected');
    }
}

function handleKeyPress(e) {
    let newIndex = currentSelection;
    if (e.key === 'ArrowUp') {
        newIndex = (currentSelection - 1 + optionItems.length) % optionItems.length;
    } else if (e.key === 'ArrowDown') {
        newIndex = (currentSelection + 1) % optionItems.length;
    } else if (e.key === 'Enter') {
        if (optionItems[currentSelection]) {
            optionItems[currentSelection].click();
        }
        return;
    }
    updateSelection(newIndex);
}


function handleOption(option) {
    if (keydownListenerActive) {
        document.removeEventListener('keydown', handleKeyPress);
        keydownListenerActive = false;
    }
    output.innerHTML = '';
    options.innerHTML = '';
    print(`${option}`);
    
    switch (option.toLowerCase()) {
        case 'writings':
            printLines(writings);
            break;
        case 'ping me':
            printLines(pingMe);
            break;
        case 'projects':
            printLines(projects);
            break;
        case 'socials':
            printLines(socials);
            break;
    }
    print('<br>', output, false);
    const backButton = document.createElement('div');
    backButton.className = 'option selected';
    backButton.textContent = '> Back';
    backButton.onclick = () => {
        output.innerHTML = '';
        options.innerHTML = '';
        introAfterSelection();
    };
    options.appendChild(backButton);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            backButton.click();
        }
    }, { once: true });
}

async function introAfterSelection() {
    const welcomeLine = document.createElement('p');
    output.appendChild(welcomeLine);
    welcomeLine.innerHTML = "> I'm Adam Noonan";
    
    const thanksLine = document.createElement('p');
    output.appendChild(thanksLine);
    thanksLine.innerHTML = "> Welcome to my website";

    print('<br>', output, false);

    const aboutMeHeader = document.createElement('p');
    output.appendChild(aboutMeHeader);
    aboutMeHeader.innerHTML = "> Here's a little about me:";

    const aboutMeParagraph = document.createElement('p');
    output.appendChild(aboutMeParagraph);
    aboutMeParagraph.innerHTML = "> " + aboutMeText.replace(/\. /g, ".<br>> ");

    print('<br><br>', output, false);
    showOptions();
}


document.addEventListener('DOMContentLoaded', intro);

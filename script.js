window.addEventListener('DOMContentLoaded', function() {
    // Ensure earthquake slide is first
    const slideContainer = document.querySelector('.slide');
    const earthquakeSlide = document.querySelector('.earthquake');
    const firstSlide = slideContainer.firstElementChild;
    
    if (firstSlide !== earthquakeSlide) {
        slideContainer.insertBefore(earthquakeSlide, firstSlide);
    }
    
    checkEarthquakeSlide();
});

let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

next.addEventListener('click', function() {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').appendChild(items[0]);
    checkEarthquakeSlide();
});

prev.addEventListener('click', function() {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').prepend(items[items.length - 1]);
    checkEarthquakeSlide();
});

function checkEarthquakeSlide() {
    let earthquakeSlide = document.querySelector('.earthquake');
    let placeholder = earthquakeSlide.querySelector('.earthquake-placeholder');
    let video = earthquakeSlide.querySelector('.earthquake-video');

    if (earthquakeSlide === document.querySelector('.slide').children[1]) {
        setTimeout(() => {
            placeholder.style.opacity = '0';
            video.style.opacity = '1';
        }, 500);
    } else {
        placeholder.style.opacity = '1';
        video.style.opacity = '0';
    }
}

const messages = [
    "Welcome, Survivalist!<br>Disaster awaits!",
    "Hello! I am Annie<br>Your safety instructor",
    "I am going to guide<br>you on how to save",
    "Your life when it comes to<br>natural calamities.",
    "Disasters-<br>they don't warn...",
    "...."
];

const extraMessages = [
    "Did you feel that?<br>The ground is shaking!",
    "Oh no!<br>Its the EARTHQUAKE MONSTERRR.",
    "Follow me, I'll guide you<br>",
    "For Evacuation<br>We'll have to solve<br>a QUIZ!"
];

let currentMessageIndex = 0;
let extraMessageIndex = 0;
let popup2Reappeared = false;
let popup3Active = false;
let triggerPopup4Index = extraMessages.indexOf("Oh no! It's the earthquake monster!");
let popup4Triggered = false;
let popup5Triggered = false;

document.querySelectorAll('.content button').forEach(button => {
    button.addEventListener('click', function () {
        let parentSlide = this.closest('.item');

        if (parentSlide.classList.contains('earthquake')) {
            let popup = document.querySelector('.popup');
            let popup2 = document.querySelector('.popup2');
            let dialogueText = document.querySelector('.dialogue-text');

            popup.style.display = 'block';
            popup2.style.display = 'flex';
            dialogueText.innerHTML = messages[currentMessageIndex];

            setTimeout(() => {
                popup.classList.add('active');
            }, 10);

            setTimeout(() => {
                popup2.classList.add('active');
            }, 700);

            document.querySelector('.overlay').classList.add('active');
        }
    });
});

document.addEventListener('click', function (event) {
    let popup = document.querySelector('.popup');
    let popup2 = document.querySelector('.popup2');
    let popup3 = document.querySelector('.popup3');
    let dialogueText = document.querySelector('.dialogue-text');

    if (popup3Active) return;

    if (popup2.classList.contains('active') && !event.target.closest('.content button')) {
        currentMessageIndex++;

        if (currentMessageIndex < messages.length) {
            dialogueText.innerHTML = messages[currentMessageIndex];
        }

        if (currentMessageIndex >= messages.length) {
            popup3Active = true;

            popup.classList.remove('active');
            popup2.classList.remove('active');
            popup.style.display = 'none';  
            popup2.style.display = 'none';  

            setTimeout(() => {
                popup3.style.display = 'flex';
                popup3.classList.add('active');
            }, 300); 
            
            setTimeout(() => {
                if (!popup2Reappeared) { 
                    popup2.style.display = 'flex';
                    popup2.classList.add('active');
                    popup2Reappeared = true;
                    dialogueText.innerHTML = "";
                    extraMessageIndex = 0;
                }
            }, 1000);
        }
    }

    if (extraMessageIndex >= extraMessages.length) {
        document.querySelector('.container').classList.add('blur-background');
        document.querySelector('.overlay').classList.add('blur-background');
        document.querySelector('.popup3').classList.add('blur-background');
        document.querySelector('.popup4').classList.add('blur-background');
        document.querySelector('.popup5').classList.add('blur-background');

        let quizContainer = document.querySelector('.quiz-container');
        quizContainer.style.display = 'block';
        setTimeout(() => {
            quizContainer.style.opacity = '1';
        }, 100);
    }
});

document.addEventListener('click', function (event) {
    let popup2 = document.querySelector('.popup2');
    let popup3 = document.querySelector('.popup3');
    let dialogueText = document.querySelector('.dialogue-text');

    if (popup2Reappeared && popup2.classList.contains('active') && popup3.classList.contains('active') && !event.target.closest('.content button')) {
        if (extraMessageIndex === 1 && !popup4Triggered) { 
            triggerPopup4();
            popup4Triggered = true;
        }

        if (extraMessageIndex === 1 && !popup5Triggered) { 
            triggerPopup5();
            popup5Triggered = true;
        }

        dialogueText.innerHTML = extraMessages[extraMessageIndex]; 
        extraMessageIndex++;
    }
});

function triggerPopup5() {
    let popup5 = document.querySelector('.popup5');
    setTimeout(() => {
        popup5.style.display = 'block';
        popup5.classList.add('active');
    }, 500);
}

function triggerPopup4() {
    let popup4 = document.querySelector('.popup4');
    setTimeout(() => {
        popup4.style.display = 'block';
        popup4.classList.add('active');
    }, 500);
} 
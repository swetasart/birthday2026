/* =========================================
   1. PASSWORD PROTECTION LOGIC
   ========================================= */
const SECRET_PASSWORD = "iloveyou@"; 

function checkPassword() {
    const input = document.getElementById('passwordInput').value.toLowerCase();
    const errorMsg = document.getElementById('loginError');
    
    if(input === SECRET_PASSWORD) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
    } else {
        errorMsg.style.display = 'block';
    }
}

document.getElementById('passwordInput').addEventListener('keypress', function(e) {
    if(e.key === 'Enter') checkPassword();
});

/* =========================================
   2. NAVBAR SCROLL EFFECT
   ========================================= */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) { nav.classList.add('nav-black'); } 
    else { nav.classList.remove('nav-black'); }
});

/* =========================================
   3. UNIVERSAL MODAL LOGIC
   ========================================= */
// Add 'caption' as the third word in the parentheses
function getYouTubeVideoId(url) {
    try {
        const parsedUrl = new URL(url);

        // YouTube watch URL
        // https://www.youtube.com/watch?v=VIDEO_ID
        if (parsedUrl.hostname.includes('youtube.com')) {
            const videoId = parsedUrl.searchParams.get('v');
            if (videoId) return videoId;
        }

        // YouTube Shorts
        // https://www.youtube.com/shorts/VIDEO_ID
        if (
            parsedUrl.hostname.includes('youtube.com') &&
            parsedUrl.pathname.startsWith('/shorts/')
        ) {
            return parsedUrl.pathname
                .split('/shorts/')[1]
                .split('/')[0];
        }

        // YouTube short URL
        // https://youtu.be/VIDEO_ID
        if (parsedUrl.hostname === 'youtu.be') {
            return parsedUrl.pathname
                .substring(1)
                .split('/')[0];
        }

        // YouTube embed URL
        // https://www.youtube.com/embed/VIDEO_ID
        if (
            parsedUrl.hostname.includes('youtube.com') &&
            parsedUrl.pathname.startsWith('/embed/')
        ) {
            return parsedUrl.pathname
                .split('/embed/')[1]
                .split('/')[0];
        }

    } catch (error) {
        console.error("Invalid YouTube URL:", error);
    }

    return null;
}


function openModal(type, source, caption) {

    const modal = document.getElementById('mediaModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = '';

    // IMAGE
    if (type === 'image') {

        let captionHtml = caption
            ? `<div class="modal-caption">${caption}</div>`
            : '';

        modalBody.innerHTML = `
            <img
                src="${source}" 
                style="max-width: 100vw; max-height: 100vh; width: 100%; height: auto; object-fit: contain; display: block; margin: auto;"
            >
            ${captionHtml}
        `;
    }

    // VIDEO / YOUTUBE
    else if (type === 'video' || type === 'youtube') {

        const youtubeId = getYouTubeVideoId(source);

        // YouTube video or Short
        if (youtubeId) {

            modalBody.innerHTML = `
                <div class="youtube-player">
                    <iframe
                        src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>
                </div>
            `;

        } else {

            // Normal MP4
            modalBody.innerHTML = `
                <video
                    controls
                    autoplay
                    muted
                    playsinline
                    style="width:100%; height:100%; object-fit:contain;"
                >
                    <source src="${source}" type="video/mp4">
                </video>
            `;
        }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = ''; 
    
    if(modalId === 'mediaModal') {
        setTimeout(() => { document.getElementById('modalBody').innerHTML = ''; }, 300);
    }
}

document.querySelectorAll('.modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        const source = this.getAttribute('data-src');
        const caption = this.getAttribute('data-caption'); // <-- ADD THIS LINE
        
        openModal(type, source, caption); // <-- ADD 'caption' HERE
    });
});

/* =========================================
   4. THE ANIMATED LETTER LOGIC
   ========================================= */
const birthdayLetter = `Happy Birthday to the most amazing woman in the world! 🌍🌍🌍

I really wish I could be there with you today 🥹, but you are so far away, especially on a day when all
 I want is to be close to you, see your smile,
spend time with you, and make you feel special in person. I hope you can feel how much you mean to me.
We have only met met twice so far, and sometimes I think about how little time we have actaully spent 
together in person. Yet somehome, you have become such an important person of my life.
Abhi to mujhe bas phone calls, messages, video calls, reels, pictures, videos se kaam chalana pad raha hai baby ji.
But I know this distance is just for 5 more months hopefully. 
Then you will be mine forever. 💞💞💞

I wish I could be there to hug you today.
But until I can, consider this letter a very long-distance hug from me to you.
I love you, and I can't wait for all the birthdays we'll celebrate together.
I love you forever babes! ❤️

Yours,
CK
`;

let typewriterInterval;

function openLetter() {
    const modal = document.getElementById('letterModal');
    const textContainer = document.getElementById('typewriterText');
    const letterModal = document.querySelector('.letter-bg');

    textContainer.innerHTML = '<span class="cursor"></span>';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    let i = 0;
    clearInterval(typewriterInterval);

    // Start from the top every time the letter opens
    letterModal.scrollTop = 0;

    typewriterInterval = setInterval(() => {

        if (i < birthdayLetter.length) {

            textContainer.innerHTML =
                textContainer.innerHTML.replace(
                    '<span class="cursor"></span>',
                    ''
                );

            textContainer.innerHTML +=
                birthdayLetter.charAt(i) +
                '<span class="cursor"></span>';

            i++;

            // 👇 Automatically scroll down as text is typed
            letterModal.scrollTop = letterModal.scrollHeight;

        } else {
            clearInterval(typewriterInterval);
        }

    }, 50);
}


// function openLetter() {
//     const modal = document.getElementById('letterModal');
//     const textContainer = document.getElementById('typewriterText');
//     textContainer.innerHTML = '<span class="cursor"></span>'; 
    
//     modal.classList.add('active');
//     document.body.style.overflow = 'hidden';

//     let i = 0;
//     clearInterval(typewriterInterval); 
    
//     typewriterInterval = setInterval(() => {
//         if (i < birthdayLetter.length) {
//             textContainer.innerHTML = textContainer.innerHTML.replace('<span class="cursor"></span>', '');
//             textContainer.innerHTML += birthdayLetter.charAt(i) + '<span class="cursor"></span>';
//             i++;
//         } else {
//             clearInterval(typewriterInterval);
//         }
//     }, 50); 
// }

/* =========================================
   5. INTERACTIVE GAMES LOGIC
   ========================================= */
function openGame(gameType) {
    const modal = document.getElementById('gameModal');
    const container = document.getElementById('gameContainer');
    container.innerHTML = ''; 
    
    if(gameType === 'trivia') {
        currentTriviaIndex = 0;
        triviaScore = 0;
        loadTriviaQuestion(container);
    } else if (gameType === 'find') {
        loadFindGame(container);
    } else if (gameType === 'memory') {
        loadMemoryGame(container); // <-- NEW
    } else if (gameType === 'calculator') {
        loadCalculatorGame(container); // <-- NEW
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// --- GAME 1: MULTI-QUESTION TRIVIA ---
const triviaQuestions = [
    { q: "Where did we go on our very first date?", options: ["Mall", "Lieto Pizza", "Urja's Flat"], answer: 1 },
    { q: "What is my absolute favorite food?", options: ["Pizza", "You", "Pani Poori"], answer: 1 },
    { q: "Who said 'I love you' first?", options: ["You did!", "I did!", "We said it at the same time"], answer: 0 },
    { q: "What was the first gift I gave you?", options: ["Ear Pods", "Kinder Joy", "Suit"], answer: 0 },
    { q: "What would I miss most if you were far away?", options: ["Hugs", "Kisses", "Literally everything about you ❤️"], answer: 2 },
    { q: "Finally… who got luckier in this relationship?", options:["Me", "You", "Obviously You", "Obviously Me", "Both of Us"], answer: 2}
];

let currentTriviaIndex = 0;
let triviaScore = 0;

function loadTriviaQuestion(container) {
    if (currentTriviaIndex >= triviaQuestions.length) {
        // End of Game
        container.innerHTML = `
            <h2 style="color:#e50914; margin-bottom: 20px;">Game Over!</h2>
            <p style="font-size: 1.5rem; margin-bottom: 30px;">You scored ${triviaScore} out of ${triviaQuestions.length}!</p>
            <p>${triviaScore === 6 ? "Perfect score! You know us so well ❤️" : "Great job! I love you! ❤️"}</p>
        `;
        return;
    }

    const currentQ = triviaQuestions[currentTriviaIndex];
    
    container.innerHTML = `
        <h2 style="color:#e50914; margin-bottom: 10px;">Couple's Trivia (${currentTriviaIndex + 1}/6)</h2>
        <p style="font-size: 1.2rem; margin-bottom: 30px;">${currentQ.q}</p>
        <div id="optionsContainer">
            ${currentQ.options.map((opt, index) => 
                `<button class="game-btn" onclick="checkTriviaAnswer(${index})">${opt}</button>`
            ).join('')}
        </div>
        <div id="triviaResult" style="margin-top: 20px; font-size: 1.3rem; font-weight: bold; min-height:30px;"></div>
    `;
}

function checkTriviaAnswer(selectedIndex) {
    const currentQ = triviaQuestions[currentTriviaIndex];
    const result = document.getElementById('triviaResult');
    const buttons = document.querySelectorAll('#optionsContainer .game-btn');
    
    // Disable buttons after guess
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQ.answer) {
        result.innerHTML = "Correct! ❤️";
        result.style.color = "#4caf50";
        triviaScore++;
    } else {
        result.innerHTML = "Oops! It was " + currentQ.options[currentQ.answer] + " 😅";
        result.style.color = "#e50914";
    }

    // Move to next question after 2 seconds
    setTimeout(() => {
        currentTriviaIndex++;
        loadTriviaQuestion(document.getElementById('gameContainer'));
    }, 2000);
}

// --- GAME 2: FIND THE RING ---
function loadFindGame(container) {
    container.innerHTML = `
        <h2 style="color:#e50914; margin-bottom: 10px;">Find The Ring!</h2>
        <p style="margin-bottom: 20px;">Click the boxes to find the hidden ring 💍 among the hearts.</p>
        <div id="gameBoard" class="game-grid"></div>
        <h3 id="findResult" style="margin-top: 15px; height: 30px;"></h3>
    `;
    
    const board = document.getElementById('gameBoard');
    let items = Array(15).fill('❤️');
    items.push('💍');
    
    items.sort(() => Math.random() - 0.5);
    
    items.forEach(item => {
        const box = document.createElement('div');
        box.className = 'grid-box';
        box.innerHTML = '❓'; 
        box.onclick = function() {
            if(this.classList.contains('revealed')) return;
            this.classList.add('revealed');
            this.innerHTML = item;
            
            if(item === '💍') {
                document.getElementById('findResult').innerHTML = "You found it! You win! 🎉";
                document.getElementById('findResult').style.color = "#4caf50";
            }
        };
        board.appendChild(box);
    });

}

// --- GAME 3: MEMORY MATCH ---
let flippedCards = [];
let matchedPairs = 0;
let isProcessing = false;

function loadMemoryGame(container) {
    flippedCards = [];
    matchedPairs = 0;
    isProcessing = false;
    
    // 6 pairs of emojis (12 total cards)
    const emojis = ['❤️', '❤️', '🌹', '🌹', '🥂', '🥂', '🧸', '🧸', '💍', '💍', '✈️', '✈️'];
    emojis.sort(() => Math.random() - 0.5); // Shuffle

    container.innerHTML = `
        <h2 style="color:#e50914; margin-bottom: 10px;">Memory Match</h2>
        <p style="margin-bottom: 20px;">Find all 6 matching pairs!</p>
        <div id="memoryBoard" class="memory-grid"></div>
        <h3 id="memoryResult" style="margin-top: 15px; height: 30px;"></h3>
    `;
    
    const board = document.getElementById('memoryBoard');
    
    emojis.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.emoji = emoji;
        card.innerHTML = '❓'; // Hidden face
        card.onclick = function() {
            if (isProcessing || this.classList.contains('flipped')) return;
            
            this.classList.add('flipped');
            this.innerHTML = this.dataset.emoji;
            flippedCards.push(this);
            
            if (flippedCards.length === 2) {
                isProcessing = true;
                setTimeout(checkMemoryMatch, 800);
            }
        };
        board.appendChild(card);
    });
}

function checkMemoryMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedPairs++;
        if (matchedPairs === 6) {
            document.getElementById('memoryResult').innerHTML = "You matched them all! 💖";
            document.getElementById('memoryResult').style.color = "#4caf50";
        }
    } else {
        card1.classList.remove('flipped');
        card1.innerHTML = '❓';
        card2.classList.remove('flipped');
        card2.innerHTML = '❓';
    }
    
    flippedCards = [];
    isProcessing = false;
}

// --- GAME 4: LOVE CALCULATOR ---
function loadCalculatorGame(container) {
    container.innerHTML = `
        <h2 style="color:#e50914; margin-bottom: 10px;">Love Calculator</h2>
        <p style="margin-bottom: 20px;">Scientific proof that we are meant to be.</p>
        <div>
            <input type="text" id="name1" class="calc-input" placeholder="Your Name">
            <br>
            <input type="text" id="name2" class="calc-input" placeholder="My Name">
            <br>
            <button class="game-btn" onclick="calculateLove()">Calculate</button>
        </div>
        <div id="calcPercentage" class="calc-result"></div>
        <div id="calcMsg" class="calc-msg"></div>
    `;
}

function calculateLove() {
    const btn = document.querySelector('#gameContainer .game-btn');
    const name1 = document.getElementById('name1').value.trim().toLowerCase();
    const name2 = document.getElementById('name2').value.trim().toLowerCase();
    const percentageElement = document.getElementById('calcPercentage');
    const msgElement = document.getElementById('calcMsg');

    

    if(!name1 || !name2) {
        msgElement.innerHTML = "Please enter both names first! 😅";
        msgElement.style.color = "#e50914";
        return;
    }

    btn.disabled = true; 
    msgElement.innerHTML = "";
    msgElement.style.color = "#4caf50";
    
    let currentPercent = 0;
    let targetPercent = 100; // Always 100%!
    let result = "A perfect match! Written in the stars. ✨❤️";
    if((name1 != 'sweta') && (name1 != "shweta")){
        targetPercent= Math.floor(Math.random() * 50) + 1;
        if(targetPercent > 30)
            result = "Just good enough match 😔"
        else
            result = "Break up with him 💔"
    }

    if(name2 != 'chandan') {
        targetPercent= Math.floor(Math.random() * 50) + 1;;
        if(targetPercent > 30)
            result = "Just good enough match 😔"
        else
            result = "Break up with him 💔"
    }
    
    // Animation that counts up to 100%
    const interval = setInterval(() => {
        currentPercent += Math.floor(Math.random() * 5) + 1;
        
        if (currentPercent >= targetPercent) {
            currentPercent = targetPercent;
            clearInterval(interval);
            percentageElement.innerHTML = currentPercent + "%";
            msgElement.innerHTML = result
            btn.disabled = false;
        } else {
            percentageElement.innerHTML = currentPercent + "%";
        }
    }, 40);
}

// --- PASSWORD SYSTEM ---
function checkPassword() {
    const input = document.getElementById('passInput');
    const error = document.getElementById('errorMsg');
    
    if(input.value === "20") {
        document.getElementById('introSection').classList.add('opacity-0', 'pointer-events-none');
        const main = document.getElementById('mainContent');
        main.classList.remove('hidden');
        setTimeout(() => main.classList.remove('opacity-0'), 100);

        playMusic();
        fireConfetti();
        startTyping();
    } else {
        input.classList.add('animate-shake');
        input.classList.add('border-red-500');
        error.classList.remove('hidden');
        setTimeout(() => {
            input.classList.remove('animate-shake');
            input.classList.remove('border-red-500');
        }, 500);
    }
}

// --- AUDIO ---
function playMusic() {
    const audio = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    audio.volume = 0.3;
    audio.play().catch(() => {
        console.log("Autoplay blocked, waiting for interaction");
    });
    btn.classList.remove('hidden');
    
    btn.onclick = () => {
        if(audio.paused) {
            audio.play();
            btn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            audio.pause();
            btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    };
}

// --- TYPING ANIMATION ---
function startTyping() {
    const textElement = document.getElementById('typingText');
    const text = "Happy Special Birthday, Ayel ♡";
    textElement.innerHTML = `<span class="typing-effect">${text}</span>`;
    setTimeout(() => {
        textElement.querySelector('span').style.borderRight = 'none';
    }, 3500);
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}

// --- MODAL SYSTEM ---
function openModal(imgSrc, caption) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modalContent');
    
    // Reset style untuk modal foto biasa
    if(content.parentElement) {
        content.parentElement.className = 'bg-white p-2 rounded max-w-[90%] md:max-w-lg w-full relative max-h-[85vh] overflow-y-auto'; 
    }

    content.innerHTML = `
        <img src="${imgSrc}" class="w-full h-auto rounded shadow-lg border-4 border-moriarty-gold">
        <p class="text-center mt-2 font-bold text-xl font-header">${caption}</p>
        <p class="text-center text-gray-500 text-sm">20 Years of You</p>
    `;
    modal.classList.remove('hidden');
}

function showMsg(title, msg, imageSrc, profileImageSrc) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modalContent');

    // Ubah style wrapper untuk kartu pesan
    // Menambahkan mx-auto agar centered, dan w-[85%] agar tidak mepet di mobile
    if(content.parentElement) {
        content.parentElement.className = 'bg-transparent p-0 w-[85%] md:w-full max-w-sm relative mx-auto';
    }
    
    let imageHTML = '';
    if (imageSrc) {
        imageHTML = `
            <div class="my-4">
                <img src="hasil-gambar.png" class="w-full max-w-[180px] md:max-w-[200px] mx-auto rounded-lg shadow-md border-2 border-moriarty-gold transform transition hover:scale-105">
            </div>
        `;
    }

    let profileHTML = '';
    if (profileImageSrc) {
        // Menggunakan absolute positioning dengan translate-x-1/2 agar tepat di tengah
        profileHTML = `
            <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-4 border-moriarty-gold shadow-lg overflow-hidden bg-white z-20 animate-pop">
                <img src="${profileImageSrc}" class="w-full h-full object-cover">
            </div>
        `;
    }

    // Menggunakan mt-12 pada container relatif utama untuk memberi ruang bagi foto profil
    content.innerHTML = `
        <div class="relative mt-12 w-full"> 
            
             ${profileHTML}

            <div class="bg-white rounded-lg shadow-2xl border-4 border-double border-moriarty-gold overflow-hidden">
                <div class="bg-moriarty-dark text-moriarty-yellow h-16 w-full"></div>
                
                <div class="p-6 pt-12 text-center">
                    <h3 class="font-header text-xl md:text-2xl font-bold mb-2 text-moriarty-dark">${title}</h3>
                    <p class="font-body text-base md:text-lg italic text-gray-700 leading-relaxed">"${msg}"</p>
                    ${imageHTML}
                    
                    <div class="mt-6">
                        <i class="fas fa-heart text-red-500 text-3xl animate-pulse filter drop-shadow-md"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// --- GIFT BOX ---
function openGift() {
    const img = document.getElementById('giftImg');
    const txt = document.getElementById('giftText');
    
    img.parentElement.classList.add('animate-shake');
    
    setTimeout(() => {
        img.parentElement.classList.remove('animate-shake');
        img.src = "liam.jpeg"; 
        txt.innerHTML = "Iyah ini kadonya <br><span class='text-xs'>(Screenshot ini untuk klaim)</span>";
        fireConfetti();
    }, 500);
}

// --- WALL OF WISHES ---
function addWish() {
    const input = document.getElementById('wishInput');
    const container = document.getElementById('wishesContainer');
    
    if(input.value.trim() === "") return;
    
    const colors = ['bg-yellow-200', 'bg-pink-200', 'bg-blue-100', 'bg-green-100'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomRot = Math.random() * 6 - 3;
    
    const wishDiv = document.createElement('div');
    wishDiv.className = `${randomColor} text-gray-800 p-4 w-36 h-36 md:w-40 md:h-40 shadow-lg font-handwriting flex items-center justify-center text-center text-xs md:text-sm font-semibold transform transition hover:scale-110`;
    wishDiv.style.transform = `rotate(${randomRot}deg)`;
    wishDiv.innerText = `"${input.value}"`;
    
    container.appendChild(wishDiv);
    input.value = "";
}

// --- SURPRISE ---
function startSurprise() {
    const overlay = document.getElementById('countdownOverlay');
    const num = document.getElementById('countdownNum');
    
    document.getElementById('surpriseBtn').classList.add('hidden');
    
    overlay.classList.remove('hidden');
    let count = 3;
    
    const timer = setInterval(() => {
        count--;
        if(count > 0) {
            num.innerText = count;
        } else {
            clearInterval(timer);
            overlay.classList.add('hidden');
            document.getElementById('secretMessage').classList.remove('hidden');
            fireConfetti();
        }
    }, 1000);
}

// --- CONFETTI LOGIC ---
function fireConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#FBC02D', '#FFF9C4', '#FFCDD2', '#B2DFDB'];

    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            rotation: Math.random() * 360,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 4,
            speed: Math.random() * 3 + 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;
        
        pieces.forEach(p => {
            p.y += p.speed;
            p.rotation += 2;
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            ctx.restore();

            if(p.y < canvas.height) active = true;
        });

        if(active) requestAnimationFrame(draw);
        else ctx.clearRect(0,0, canvas.width, canvas.height);
    }
    draw();
}

window.onload = function() {
    // Sembunyikan container Quiz jika ada
    const quizContainer = document.getElementById('quizContainer');
    if(quizContainer && quizContainer.parentElement) {
        quizContainer.parentElement.style.display = 'none';
        
        const giftSectionParent = quizContainer.parentElement.parentElement;
        if(giftSectionParent) {
            giftSectionParent.classList.remove('grid', 'md:grid-cols-2');
            giftSectionParent.classList.add('flex', 'justify-center');
        }
    }

    const passInput = document.getElementById('passInput');
    if(passInput) {
        passInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
};
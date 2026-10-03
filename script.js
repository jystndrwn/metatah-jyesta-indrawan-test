document.addEventListener('DOMContentLoaded', function() {
    // 1. Mengambil Nama Tamu dari URL Parameter (?to=Nama)
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || 'Bapak/Ibu/Saudara/i';
    document.getElementById('guest-name').innerText = guestName;

    // 2. Logika "Buka Undangan"
    const btnOpen = document.getElementById('btn-open');
    const coverPage = document.getElementById('cover-page');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const btnMusic = document.getElementById('btn-music');
    let isPlaying = false;

    btnOpen.addEventListener('click', function() {
        // Animasi cover ditarik ke atas
        coverPage.classList.add('slide-up');
        
        // Tampilkan konten utama setelah delay animasi cover
        setTimeout(() => {
            coverPage.style.display = 'none';
            mainContent.classList.remove('hidden');
            // Memicu reflow untuk CSS transition
            void mainContent.offsetWidth;
            mainContent.classList.add('visible');
            btnMusic.style.display = 'block'; // Tampilkan tombol musik
        }, 1000);

        // Putar musik (terkadang browser memblokir ini jika user belum interaksi, namun klik tombol ini dihitung sebagai interaksi)
        bgMusic.play().then(() => {
            isPlaying = true;
            btnMusic.classList.add('rotating');
        }).catch(err => console.log("Autoplay diblokir oleh browser."));
    });

    // 3. Kontrol Musik (Play/Pause)
    btnMusic.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            btnMusic.classList.remove('rotating');
            btnMusic.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play();
            btnMusic.classList.add('rotating');
            btnMusic.innerHTML = '<i class="fas fa-compact-disc"></i>';
        }
        isPlaying = !isPlaying;
    });

    // 4. Hitung Mundur (Countdown Timer)
    // Atur tanggal acara: 15 Oktober 2026 pukul 14:00:00
    const eventDate = new Date("Oct 15, 2026 14:00:00").getTime();

    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        // Perhitungan waktu
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Render ke HTML dengan format 2 digit (01, 02, dst)
        document.getElementById("hari").innerText = days < 10 ? "0" + days : days;
        document.getElementById("jam").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("menit").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("detik").innerText = seconds < 10 ? "0" + seconds : seconds;

        // Jika waktu acara sudah lewat
        if (distance < 0) {
            clearInterval(countdown);
            document.querySelector(".countdown-container").innerHTML = "<h3 style='color: white;'>Acara Telah Berlangsung / Selesai</h3>";
        }
    }, 1000);
});

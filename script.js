document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. SETUP VARIABEL ---
    const coverSection = document.getElementById('cover-section');
    const mainContent = document.getElementById('main-content');
    const openButton = document.getElementById('open-button');
    const myAudio = document.getElementById('myAudio');
    const toggleMusicButton = document.getElementById('toggle-music');
    const floatingMusicIcon = document.getElementById('floating-music-icon');
    
    // --- 2. FUNGSI NAMA TAMU DARI URL (Sudah Ada) ---
    function getGuestName() {
        const urlParams = new URLSearchParams(window.location.search);
        let name = urlParams.get('to');
        
        if (name) {
            name = name.replace(/\+/g, ' ').replace(/%20/g, ' ');
            name = name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
            return name;
        }
        return "Tamu Undangan"; 
    }

    const guestNameElement = document.getElementById('guest-name');
    guestNameElement.textContent = getGuestName();

    // --- 3. FUNGSI MUSIK OTOMATIS SAAT BUKA UNDANGAN ---
    openButton.addEventListener('click', function() {
        coverSection.style.display = 'none';
        mainContent.style.display = 'block';
        toggleMusicButton.style.display = 'block'; // Tampilkan tombol floating

        // Coba putar musik
        myAudio.play().then(() => {
            floatingMusicIcon.className = 'fas fa-volume-up'; // Ganti ikon menjadi speaker
        }).catch(error => {
            // Jika browser memblokir autoplay, biarkan ikon volume-off
            floatingMusicIcon.className = 'fas fa-volume-off'; 
        });

        window.scrollTo(0, 0); 
    });

    // --- 4. KONTROL MUSIK MANUAL (Floating Button) ---
    toggleMusicButton.addEventListener('click', function() {
        if (myAudio.paused) {
            myAudio.play();
            floatingMusicIcon.className = 'fas fa-volume-up';
        } else {
            myAudio.pause();
            floatingMusicIcon.className = 'fas fa-volume-off';
        }
    });

    // --- 5. Hitung Mundur (Countdown) ---
    // TANGGAL: JUM'AT, 21 NOVEMBER 2025 Pukul 08:00:00 WIB
    const weddingDate = new Date("November 21, 2025 08:00:00").getTime();
    const countdownElement = document.getElementById('countdown');

    const updateCountdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <span>${days} Hari</span>
            <span>${hours} Jam</span>
            <span>${minutes} Menit</span>
            <span>${seconds} Detik</span>
        `;

        if (distance < 0) {
            clearInterval(updateCountdown);
            countdownElement.innerHTML = "Acara Sedang Berlangsung!";
        }
    }, 1000);

        // --- FUNGSI SALIN NOMOR REKENING ---
    const copyButtons = document.querySelectorAll('.btn-copy');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            // Mengambil teks yang ingin disalin (menghilangkan spasi dan bintang jika ada)
            const textToCopy = targetElement.textContent.replace(/\s|\*/g, '');

            // Menggunakan Clipboard API modern
            navigator.clipboard.writeText(textToCopy).then(() => {
                
                // Memberikan feedback visual
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
                button.style.backgroundColor = '#4CAF50'; // Warna hijau

                // Kembalikan teks dan warna tombol setelah 2 detik
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.backgroundColor = 'var(--primary-color)';
                }, 2000);

            }).catch(err => {
                console.error('Gagal menyalin:', err);
                alert('Gagal menyalin. Silakan salin manual: ' + textToCopy);
            });
        });
    });
    

});
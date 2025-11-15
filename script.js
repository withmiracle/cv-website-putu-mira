/* 
=====================================================
  WEBSITE CV - JAVASCRIPT
=====================================================
  
  📋 DAFTAR FUNGSI:
  1. Mobile Navigation Toggle
  2. Smooth Scrolling & Active Nav
  3. Navbar Background on Scroll
  4. Typing Effect Animation
  5. Scroll to Top Button
  6. Skills Progress Bar Animation
  7. Portfolio Filter
  8. Contact Form Handling
  9. Notification System
  10. Intersection Observer for Animations
  
  📝 CARA KUSTOMISASI:
  - Cari section yang ingin diubah
  - Edit nilai variabel atau logic
  - Test di browser untuk melihat perubahan
  
  💡 TIPS:
  - Gunakan console.log() untuk debugging
  - Test di browser dengan F12 Developer Tools
  - Backup file sebelum melakukan perubahan besar
  
=====================================================
*/

// PENTING: Menunggu sampai DOM selesai dimuat sebelum menjalankan script
document.addEventListener("DOMContentLoaded", function () {
  /* ===================================
     1. MOBILE NAVIGATION TOGGLE
     =================================== 
     
     PENJELASAN:
     - Toggle hamburger menu di mobile
     - Animasi open/close menu
     - Auto-close saat link diklik
     
     INSTRUKSI KUSTOMISASI:
     - Ubah selector jika ID element berbeda
     - Tidak perlu diubah jika menggunakan HTML template
  */

  // Mengambil elemen untuk mobile menu
  const mobileMenu = document.getElementById("mobile-menu"); // Hamburger button
  const navMenu = document.getElementById("nav-menu"); // Menu list

  // Event listener untuk toggle mobile menu saat hamburger diklik
  mobileMenu.addEventListener("click", function () {
    // Toggle class 'active' untuk hamburger animation
    mobileMenu.classList.toggle("active");
    // Toggle class 'active' untuk show/hide menu
    navMenu.classList.toggle("active");
  });

  // Menutup mobile menu ketika link diklik (better UX)
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  /* ===================================
     2. SMOOTH SCROLLING & ACTIVE NAV
     =================================== 
     
     PENJELASAN:
     - Mendeteksi section mana yang sedang dilihat
     - Update active state pada navigation link
     - Smooth scrolling sudah di-handle oleh CSS
     
     INSTRUKSI KUSTOMISASI:
     - Ubah scrollPos offset (line 43) jika navbar height berbeda
     - Sesuaikan dengan tinggi navbar Anda
  */

  // Fungsi untuk mengatur active state pada navigation
  function setActiveNav() {
    const sections = document.querySelectorAll("section[id]"); // Ambil semua section dengan id
    const scrollPos = window.scrollY + 100; // INSTRUKSI: Sesuaikan offset (100) dengan navbar height

    sections.forEach((section) => {
      const top = section.offsetTop; // Posisi top section
      const height = section.offsetHeight; // Tinggi section
      const id = section.getAttribute("id"); // ID section
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`); // Nav link yang sesuai

      // Cek apakah section sedang berada di viewport
      if (scrollPos >= top && scrollPos < top + height) {
        // Hapus class active dari semua nav links
        navLinks.forEach((link) => link.classList.remove("active"));
        // Tambahkan class active ke nav link yang sesuai
        if (navLink) {
          navLink.classList.add("active");
        }
      }
    });
  }

  // Jalankan fungsi saat scroll
  window.addEventListener("scroll", setActiveNav);

  /* ===================================
     3. NAVBAR BACKGROUND ON SCROLL
     =================================== 
     
     PENJELASAN:
     - Mengubah background navbar saat scroll
     - Bisa diubah untuk efek fade-in navbar
     
     INSTRUKSI KUSTOMISASI:
     - Ubah nilai 50 (line 72) untuk trigger point berbeda
     - Ganti warna background sesuai keinginan
  */

  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    // INSTRUKSI: Ubah 50 untuk mengatur kapan background muncul
    if (window.scrollY > 50) {
      // Tambahkan background solid saat scroll down
      navbar.style.background = "rgba(255, 255, 255, 0.95)"; // INSTRUKSI: Ganti warna
      navbar.style.backdropFilter = "blur(10px)";
    } else {
      // Kembalikan ke background transparent/original saat di top
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
    }
  });

  /* ===================================
     4. TYPING EFFECT UNTUK HERO SUBTITLE
     =================================== 
     
     PENJELASAN:
     - Animasi typing text yang berubah-ubah seperti mesin ketik
     - Text diketik karakter per karakter, lalu dihapus, kemudian ganti ke text berikutnya
     - Loop terus menerus (infinite loop)
     - Membuat subtitle terlihat dinamis dan menarik
     
     INSTRUKSI KUSTOMISASI:
     - Tambah/edit textArray (line 159-164) untuk mengubah profesi yang ditampilkan
     - Ubah typingDelay (line 169) untuk kecepatan mengetik (ms per karakter)
     - Ubah erasingDelay (line 170) untuk kecepatan menghapus (ms per karakter)
     - Ubah newTextDelay (line 171) untuk durasi tampil sebelum dihapus (ms)
     
     TIPS:
     - Gunakan delay lebih cepat (100-150ms) untuk efek lebih dinamis
     - Gunakan delay lebih lambat (300-400ms) untuk efek lebih dramatis
     - Sesuaikan panjang text dengan delay agar tidak terlalu cepat/lambat
  */
  // ===================================

  // INSTRUKSI: Target elemen dengan class 'typed-text' di HTML
  const typedTextSpan = document.querySelector(".typed-text");

  // INSTRUKSI: Edit array ini untuk mengubah text yang ditampilkan
  // PENJELASAN: Bisa tambah/kurangi sesuai kebutuhan, tidak ada limit
  const textArray = [
    "Web Developer", // INSTRUKSI: Ganti dengan profesi Anda
    "UI/UX Designer", // INSTRUKSI: Atau skill yang dikuasai
    "Frontend Developer", // INSTRUKSI: Bisa tambah sebanyak mungkin
    "Creative Problem Solver", // INSTRUKSI: Atau personality trait
  ];

  // PENJELASAN: Variable untuk tracking posisi dalam animasi
  let textArrayIndex = 0; // Index text yang sedang ditampilkan (0, 1, 2, dst)
  let charIndex = 0; // Index karakter yang sedang diketik

  // INSTRUKSI: Atur kecepatan animasi (dalam milidetik)
  const typingDelay = 200; // INSTRUKSI: Delay antara karakter saat mengetik (200ms = 0.2 detik)
  const erasingDelay = 100; // INSTRUKSI: Delay antara karakter saat menghapus (100ms = 0.1 detik)
  const newTextDelay = 2000; // INSTRUKSI: Delay tampil penuh sebelum mulai dihapus (2000ms = 2 detik)

  // PENJELASAN: Fungsi untuk mengetik text karakter per karakter
  function type() {
    // EFEK: Cek apakah masih ada karakter yang perlu diketik
    if (charIndex < textArray[textArrayIndex].length) {
      // EFEK: Tambahkan karakter satu per satu ke elemen
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++; // Pindah ke karakter berikutnya
      // EFEK: Panggil fungsi type() lagi setelah delay untuk karakter berikutnya
      setTimeout(type, typingDelay);
    } else {
      // EFEK: Setelah selesai mengetik semua karakter, tunggu lalu mulai menghapus
      setTimeout(erase, newTextDelay);
    }
  }

  // PENJELASAN: Fungsi untuk menghapus text karakter per karakter
  function erase() {
    // EFEK: Cek apakah masih ada karakter yang perlu dihapus
    if (charIndex > 0) {
      // EFEK: Hapus karakter dari belakang satu per satu
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--; // Mundur ke karakter sebelumnya
      // EFEK: Panggil fungsi erase() lagi setelah delay
      setTimeout(erase, erasingDelay);
    } else {
      // EFEK: Setelah selesai menghapus, pindah ke teks berikutnya
      textArrayIndex++;
      // EFEK: Reset ke awal jika sudah sampai akhir array (loop)
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      // EFEK: Mulai mengetik text berikutnya
      setTimeout(type, typingDelay + 1100);
    }
  }

  // INSTRUKSI: Mulai typing effect setelah halaman dimuat
  // PENJELASAN: Pengecekan if untuk memastikan elemen ada sebelum dijalankan
  if (typedTextSpan) {
    setTimeout(type, newTextDelay + 250); // EFEK: Delay awal sebelum mulai animasi
  }

  /* ===================================
     5. SCROLL TO TOP BUTTON
     =================================== 
     
     PENJELASAN:
     - Tombol untuk scroll kembali ke atas halaman dengan smooth
     - Muncul otomatis saat user scroll ke bawah melewati titik tertentu
     - Hilang saat di bagian atas halaman
     
     INSTRUKSI KUSTOMISASI:
     - Ubah nilai 300 (line 233) untuk mengatur kapan tombol muncul
     - Edit styling di CSS untuk mengubah tampilan tombol
     - Tombol sudah dibuat di HTML dengan id="scrollTop"
     
     TIPS:
     - Nilai 300 = tombol muncul setelah scroll 300px dari top
     - Gunakan nilai lebih besar (500-700px) jika halaman panjang
     - Gunakan nilai lebih kecil (100-200px) untuk responsivitas cepat
  */
  // ===================================

  // INSTRUKSI: Target tombol scroll to top dengan id="scrollTop"
  const scrollTopBtn = document.getElementById("scrollTop");

  // PENJELASAN: Show/hide scroll to top button berdasarkan posisi scroll
  window.addEventListener("scroll", function () {
    // INSTRUKSI: Ubah 300 untuk mengatur kapan tombol muncul (dalam pixel)
    if (window.scrollY > 300) {
      // EFEK: Tambahkan class 'show' saat scroll lebih dari 300px
      // PENJELASAN: Class 'show' di CSS membuat tombol terlihat (opacity 1)
      scrollTopBtn.classList.add("show");
    } else {
      // EFEK: Hapus class 'show' saat di bagian atas (tombol tersembunyi)
      scrollTopBtn.classList.remove("show");
    }
  });

  // PENJELASAN: Fungsi scroll to top saat tombol diklik
  scrollTopBtn.addEventListener("click", function () {
    // EFEK: Scroll ke posisi paling atas (top: 0)
    // INSTRUKSI: behavior: 'smooth' membuat scroll halus, ganti 'auto' untuk instant
    window.scrollTo({
      top: 0, // INSTRUKSI: Posisi tujuan (0 = paling atas)
      behavior: "smooth", // INSTRUKSI: 'smooth' = animasi, 'auto' = langsung
    });
  });

  /* ===================================
     6. SKILLS PROGRESS BAR ANIMATION
     =================================== 
     
     PENJELASAN:
     - Animasi progress bar yang berjalan saat skill section terlihat di layar
     - Menggunakan Intersection Observer untuk detect visibility
     - Bar akan terisi dari 0% ke nilai target saat pertama kali terlihat
     - Animasi hanya berjalan sekali untuk setiap bar
     
     INSTRUKSI KUSTOMISASI:
     - Ubah nilai data-width di HTML untuk mengatur panjang bar (%)
     - Edit transisi di CSS untuk mengubah kecepatan animasi
     - Sesuaikan threshold untuk trigger point berbeda
     
     TIPS:
     - Data-width="90%" artinya bar akan terisi sampai 90%
     - Animasi menggunakan CSS transition (smooth)
     - Class 'animated' mencegah animasi berulang
  */
  // ===================================

  // PENJELASAN: Fungsi untuk menganimasi progress bar ketika terlihat di viewport
  function animateProgressBars() {
    // INSTRUKSI: Select semua progress bar dengan class 'skill-progress'
    const progressBars = document.querySelectorAll(".skill-progress");

    // EFEK: Loop untuk setiap progress bar
    progressBars.forEach((bar) => {
      // PENJELASAN: getBoundingClientRect() mendapatkan posisi elemen relatif ke viewport
      const rect = bar.getBoundingClientRect();

      // EFEK: Cek apakah elemen terlihat di layar
      // PENJELASAN: rect.top < window.innerHeight = bagian atas elemen sudah masuk viewport
      // PENJELASAN: rect.bottom > 0 = bagian bawah elemen belum keluar viewport
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      // EFEK: Jalankan animasi hanya jika visible dan belum pernah dianimasikan
      if (isVisible && !bar.classList.contains("animated")) {
        // INSTRUKSI: Ambil target width dari data attribute di HTML
        // CONTOH: <div class="skill-progress" data-width="85%">
        const targetWidth = bar.getAttribute("data-width");

        // EFEK: Set width bar ke nilai target (animasi berjalan karena CSS transition)
        bar.style.width = targetWidth;

        // EFEK: Tambah class 'animated' untuk mencegah animasi berulang
        bar.classList.add("animated");
      }
    });
  }

  // INSTRUKSI: Jalankan animasi saat scroll
  window.addEventListener("scroll", animateProgressBars);

  // INSTRUKSI: Jalankan animasi saat halaman pertama kali dimuat (initial check)
  // PENJELASAN: Untuk skills yang sudah terlihat tanpa perlu scroll
  animateProgressBars();

  /* ===================================
     7. PORTFOLIO FILTER FUNCTIONALITY
     =================================== 
     
     PENJELASAN:
     - Sistem filter untuk menampilkan portfolio berdasarkan kategori
     - Tombol filter (All, Web, Mobile, Design, dll)
     - Portfolio items tersembunyi/ditampilkan dengan animasi smooth
     - Active state pada tombol yang dipilih
     
     INSTRUKSI KUSTOMISASI:
     - Tambah kategori baru di HTML dengan data-filter dan data-category
     - Sesuaikan animasi dengan mengubah opacity/transform
     - Edit duration (300ms) untuk kecepatan animasi berbeda
     
     TIPS:
     - data-filter di button harus match dengan data-category di item
     - Filter "all" menampilkan semua item
     - Bisa tambah multiple kategori per item dengan spasi
  */
  // ===================================

  // INSTRUKSI: Select semua tombol filter dengan class 'filter-btn'
  const filterButtons = document.querySelectorAll(".filter-btn");

  // INSTRUKSI: Select semua portfolio item dengan class 'portfolio-item'
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  // EFEK: Loop untuk setiap tombol filter
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // PENJELASAN: Ambil kategori dari data-filter attribute
      // CONTOH: <button data-filter="web">Web Development</button>
      const filter = this.getAttribute("data-filter");

      // EFEK: Update active button (highlight button yang dipilih)
      filterButtons.forEach((btn) => btn.classList.remove("active")); // Hapus active dari semua
      this.classList.add("active"); // Tambah active ke button yang diklik

      // PENJELASAN: Filter portfolio items berdasarkan kategori
      portfolioItems.forEach((item) => {
        // INSTRUKSI: Ambil kategori dari data-category di portfolio item
        // CONTOH: <div class="portfolio-item" data-category="web">
        const category = item.getAttribute("data-category");

        // EFEK: Cek apakah item harus ditampilkan atau disembunyikan
        // PENJELASAN: filter === 'all' = tampilkan semua, atau category harus match
        if (filter === "all" || category === filter) {
          // EFEK: Tampilkan item dengan animasi fade-in + slide-up
          item.style.display = "block";

          // INSTRUKSI: Set initial state untuk animasi (invisible & bergeser ke bawah)
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)"; // INSTRUKSI: Ubah nilai untuk efek berbeda

          // EFEK: Animasi masuk setelah 100ms delay
          setTimeout(() => {
            item.style.transition = "all 0.3s ease"; // INSTRUKSI: Ubah duration (0.3s) untuk kecepatan berbeda
            item.style.opacity = "1"; // Fade in
            item.style.transform = "translateY(0)"; // Slide up ke posisi normal
          }, 100);
        } else {
          // EFEK: Sembunyikan item dengan animasi fade-out
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";

          // PENJELASAN: Tunggu animasi selesai baru set display none
          setTimeout(() => {
            item.style.display = "none";
          }, 300); // INSTRUKSI: Harus match dengan transition duration
        }
      });
    });
  });

  /* ===================================
     8. CONTACT FORM HANDLING
     =================================== 
     
     PENJELASAN:
     - Handling submit form kontak dengan validasi
     - Validasi field tidak boleh kosong
     - Validasi format email dengan regex
     - Loading state saat submit
     - Notifikasi success/error
     
     INSTRUKSI KUSTOMISASI:
     - Ganti simulasi dengan real API endpoint (fetch/axios)
     - Tambah validasi lain (phone, length, dll)
     - Sesuaikan loading delay (2000ms) dengan kebutuhan
     - Integrasikan dengan backend atau email service
     
     TIPS:
     - Gunakan FormData untuk mudah ambil data form
     - Prevent default untuk kontrol penuh submit
     - Disable button saat loading untuk prevent double submit
  */
  // ===================================

  // INSTRUKSI: Select form dengan id="contactForm"
  const contactForm = document.getElementById("contactForm");

  // PENJELASAN: Cek apakah form ada sebelum attach event listener
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      // EFEK: Mencegah form submit default (refresh halaman)
      e.preventDefault();

      // INSTRUKSI: Ambil data form menggunakan FormData API
      const formData = new FormData(this);
      const name = formData.get("name"); // PENJELASAN: Harus match dengan name attribute di HTML
      const email = formData.get("email"); // CONTOH: <input name="email">
      const subject = formData.get("subject");
      const message = formData.get("message");

      // VALIDASI 1: Cek semua field sudah diisi
      if (!name || !email || !subject || !message) {
        // EFEK: Tampilkan notifikasi error jika ada field kosong
        showNotification("Harap isi semua field!", "error");
        return; // Stop eksekusi
      }

      // VALIDASI 2: Cek format email valid
      // INSTRUKSI: Regex untuk validasi email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        // EFEK: Tampilkan notifikasi error jika format email salah
        showNotification("Format email tidak valid!", "error");
        return; // Stop eksekusi
      }

      // INSTRUKSI: Ambil tombol submit untuk loading state
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML; // Simpan text original

      // EFEK: Ubah button ke loading state
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Mengirim...'; // INSTRUKSI: Bisa ganti text loading
      submitButton.disabled = true; // Disable untuk prevent double submit

      // INSTRUKSI: Simulasi pengiriman (ganti dengan real API call)
      // CONTOH REAL API:
      // fetch('/api/contact', {
      //   method: 'POST',
      //   body: JSON.stringify({ name, email, subject, message }),
      //   headers: { 'Content-Type': 'application/json' }
      // })
      // .then(response => response.json())
      // .then(data => { ... })
      setTimeout(() => {
        // EFEK: Reset form setelah berhasil
        this.reset();

        // EFEK: Reset button ke state normal
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // EFEK: Tampilkan notifikasi success
        showNotification("Pesan berhasil dikirim! Terima kasih.", "success");
      }, 2000); // INSTRUKSI: Delay simulasi 2 detik, hapus untuk real API
    });
  }

  /* ===================================
     9. NOTIFICATION SYSTEM
     =================================== 
     
     PENJELASAN:
     - Sistem notifikasi toast untuk feedback ke user
     - Muncul dari kanan atas dengan animasi slide
     - Auto dismiss setelah 5 detik
     - Bisa dismiss manual dengan klik
     - Support 2 tipe: success (hijau) dan error (merah)
     
     INSTRUKSI KUSTOMISASI:
     - Ubah posisi (top, right) untuk lokasi berbeda
     - Ganti warna success/error sesuai branding
     - Adjust auto dismiss duration (5000ms)
     - Tambah tipe notification baru (warning, info)
     
     TIPS:
     - Fungsi ini dipanggil dengan: showNotification(message, type)
     - Type: 'success' atau 'error'
     - Bisa tambah sound effect untuk feedback lebih baik
  */
  // ===================================

  // INSTRUKSI: Fungsi untuk menampilkan notifikasi
  // PARAMETER: message (string), type (string: 'success' atau 'error')
  function showNotification(message, type = "success") {
    // EFEK: Buat elemen notification secara dinamis
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;

    // PENJELASAN: Template HTML untuk notification dengan icon dan message
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${
                  type === "success"
                    ? "fa-check-circle" // INSTRUKSI: Icon success (bisa ganti icon lain)
                    : "fa-exclamation-circle" // INSTRUKSI: Icon error (bisa ganti icon lain)
                }"></i>
                <span>${message}</span>
            </div>
        `;

    // INSTRUKSI: Styling inline untuk notification
    // PENJELASAN: Menggunakan inline CSS agar tidak perlu file CSS terpisah
    notification.style.cssText = `
            position: fixed;
            top: 20px;                    // INSTRUKSI: Ubah untuk posisi vertikal berbeda
            right: 20px;                  // INSTRUKSI: Ubah untuk posisi horizontal berbeda
            background: ${
              type === "success" ? "#2ecc71" : "#e74c3c"
            }; // INSTRUKSI: Warna success/error
            color: white;
            padding: 15px 20px;           // INSTRUKSI: Adjust padding untuk ukuran berbeda
            border-radius: 5px;
            z-index: 10000;               // PENJELASAN: Z-index tinggi agar selalu di depan
            transform: translateX(100%);  // EFEK: Initial state di luar layar (kanan)
            transition: transform 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;

    // INSTRUKSI: Styling untuk content container
    notification.querySelector(".notification-content").style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;                    // INSTRUKSI: Jarak antara icon dan text
        `;

    // EFEK: Tambahkan notification ke body
    document.body.appendChild(notification);

    // EFEK: Animasi slide in dari kanan setelah 100ms
    setTimeout(() => {
      notification.style.transform = "translateX(0)"; // Slide ke posisi normal
    }, 100);

    // EFEK: Auto dismiss setelah 5 detik
    setTimeout(() => {
      // EFEK: Animasi slide out ke kanan
      notification.style.transform = "translateX(100%)";

      // PENJELASAN: Tunggu animasi selesai baru remove dari DOM
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300); // INSTRUKSI: Harus match dengan transition duration
    }, 5000); // INSTRUKSI: Ubah durasi tampil (5000ms = 5 detik)

    // EFEK: Click to dismiss - user bisa tutup manual
    notification.addEventListener("click", () => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });
  }

  /* ===================================
     10. INTERSECTION OBSERVER UNTUK ANIMATIONS
     =================================== 
     
     PENJELASAN:
     - Menggunakan Intersection Observer API untuk detect element masuk viewport
     - Trigger animasi fade-in-up saat elemen terlihat di layar
     - Lebih efisien daripada scroll event listener untuk performance
     - Animasi berjalan sekali saat pertama kali terlihat
     
     INSTRUKSI KUSTOMISASI:
     - Ubah threshold (0.1 = 10% visible) untuk trigger point berbeda
     - Edit rootMargin untuk trigger lebih awal/lambat
     - Tambah elemen lain ke animatedElements untuk animasi lebih banyak
     - Sesuaikan animation di CSS untuk efek berbeda
     
     TIPS:
     - Threshold 0.1 = animasi mulai saat 10% elemen visible
     - rootMargin negatif = trigger sebelum elemen masuk viewport
     - Bisa tambah multiple animation classes untuk variasi
  */
  // ===================================

  // INSTRUKSI: Options untuk Intersection Observer
  const observerOptions = {
    threshold: 0.1, // INSTRUKSI: 0.1 = trigger saat 10% elemen visible (0-1)
    rootMargin: "0px 0px -50px 0px", // INSTRUKSI: Margin negatif bottom untuk trigger lebih cepat
  };

  // PENJELASAN: Callback function yang dipanggil saat elemen intersect
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      // EFEK: Cek apakah elemen sedang masuk viewport
      if (entry.isIntersecting) {
        // EFEK: Tambahkan class 'fade-in-up' untuk trigger animasi
        entry.target.classList.add("fade-in-up");
        // TIPS: Bisa tambah observer.unobserve(entry.target) untuk animasi sekali saja
      }
    });
  };

  // INSTRUKSI: Buat Intersection Observer dengan options dan callback
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // INSTRUKSI: Select semua elemen yang ingin dianimasi
  // PENJELASAN: Tambah/kurangi selector sesuai kebutuhan
  const animatedElements = document.querySelectorAll(
    ".section-title, .about-text, .skill-item, .portfolio-item, .timeline-item, .contact-item"
  );

  // EFEK: Observe setiap elemen untuk detect visibility
  animatedElements.forEach((el) => {
    observer.observe(el); // Mulai observe element
  });

  /* ===================================
     11. CSS ANIMATION CLASSES (DYNAMIC)
     =================================== 
     
     PENJELASAN:
     - Menambahkan CSS animation secara dinamis via JavaScript
     - Tidak perlu file CSS terpisah untuk animasi ini
     - Includes fade-in-up animation dan utility styles
     - Set initial state (opacity 0) untuk smooth animation
     
     INSTRUKSI KUSTOMISASI:
     - Edit keyframes untuk mengubah animasi (translateY, scale, rotate, dll)
     - Ubah duration (0.6s) untuk kecepatan animasi berbeda
     - Tambah animation classes baru sesuai kebutuhan
     - Sesuaikan initial state untuk efek yang berbeda
  */
  // ===================================

  // INSTRUKSI: Buat elemen <style> untuk inject CSS
  const style = document.createElement("style");

  // PENJELASAN: CSS content yang akan diinjeksi
  style.textContent = `
        /* ANIMASI: Fade in dengan slide up */
        .fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        /* INSTRUKSI: Edit keyframes untuk efek animasi berbeda */
        @keyframes fadeInUp {
            from {
                opacity: 0;              /* INSTRUKSI: Initial opacity (0 = invisible) */
                transform: translateY(30px); /* INSTRUKSI: Initial position (30px ke bawah) */
            }
            to {
                opacity: 1;              /* EFEK: Final opacity (1 = fully visible) */
                transform: translateY(0);    /* EFEK: Final position (normal position) */
            }
        }
        
        /* INSTRUKSI: Set initial state untuk elemen yang akan dianimasi */
        /* PENJELASAN: Elemen dimulai dengan opacity 0 dan position shifted */
        .section-title, .about-text, .skill-item, 
        .portfolio-item, .timeline-item, .contact-item {
            opacity: 0;                  /* EFEK: Initial invisible */
            transform: translateY(30px); /* EFEK: Initial shifted down */
            transition: all 0.6s ease;   /* INSTRUKSI: Smooth transition (ubah duration) */
        }
        
        /* INSTRUKSI: Smooth transitions untuk semua interactive elements */
        /* PENJELASAN: Hover effects akan smooth karena transition ini */
        a, button, .btn, .nav-link, .social-link, .portfolio-link {
            transition: all 0.3s ease;   /* INSTRUKSI: Duration untuk hover effect */
        }
        
        /* INSTRUKSI: Style untuk disabled buttons (loading state) */
        .btn:disabled {
            opacity: 0.7;                /* EFEK: Reduced opacity saat disabled */
            cursor: not-allowed;         /* EFEK: Cursor berubah untuk indicate disabled */
        }
        
        /* ANIMASI: Spin untuk loading icons */
        @keyframes spin {
            from { transform: rotate(0deg); }   /* EFEK: Rotasi dari 0 derajat */
            to { transform: rotate(360deg); }   /* EFEK: Rotasi ke 360 derajat (full circle) */
        }
        
        /* INSTRUKSI: Apply spin animation ke spinner icon */
        .fa-spinner {
            animation: spin 1s linear infinite; /* EFEK: Spin terus menerus */
        }
    `;

  // EFEK: Inject CSS ke dalam <head>
  document.head.appendChild(style);

  /* ===================================
     12. UTILITY FUNCTIONS
     =================================== 
     
     PENJELASAN:
     - Fungsi-fungsi helper untuk performance optimization
     - Debounce untuk limit rate function execution
     - Throttle untuk control function call frequency
     - Meningkatkan performance terutama untuk scroll events
     
     INSTRUKSI KUSTOMISASI:
     - Adjust debounce wait time (10ms) sesuai kebutuhan
     - Gunakan throttle untuk events yang perlu real-time response
     - Terapkan pada events yang sering dipanggil (scroll, resize, input)
  */
  // ===================================

  // INSTRUKSI: Fungsi debounce untuk delay execution hingga user berhenti action
  // PENJELASAN: Mencegah function dipanggil terlalu sering (performance boost)
  // PARAMETER: func (function to debounce), wait (delay in ms)
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      // EFEK: Clear timeout sebelumnya
      const later = () => {
        clearTimeout(timeout);
        func(...args); // Eksekusi function setelah delay
      };
      clearTimeout(timeout);
      // EFEK: Set timeout baru
      timeout = setTimeout(later, wait); // INSTRUKSI: Wait adalah delay (ms)
    };
  }

  // INSTRUKSI: Optimize scroll handler dengan debounce
  // PENJELASAN: Gabungkan multiple scroll functions untuk efisiensi
  const optimizedScrollHandler = debounce(() => {
    setActiveNav(); // Update active nav link
    animateProgressBars(); // Animate progress bars
  }, 10); // INSTRUKSI: 10ms delay (adjust untuk responsiveness vs performance)

  // EFEK: Replace original scroll listeners dengan optimized version
  window.removeEventListener("scroll", setActiveNav); // Hapus listener lama
  window.removeEventListener("scroll", animateProgressBars); // Hapus listener lama
  window.addEventListener("scroll", optimizedScrollHandler); // Tambah optimized listener

  /* ===================================
     13. KEYBOARD NAVIGATION SUPPORT
     =================================== 
     
     PENJELASAN:
     - Accessibility feature untuk keyboard navigation
     - ESC key untuk menutup mobile menu
     - Enter/Space untuk aktivasi buttons
     - Meningkatkan user experience untuk keyboard users
     
     INSTRUKSI KUSTOMISASI:
     - Tambah keyboard shortcuts lain (Arrow keys, Tab, dll)
     - Implement focus management untuk better accessibility
     - Tambah visual indicator untuk focused elements
  */
  // ===================================

  // INSTRUKSI: Event listener untuk keyboard events
  document.addEventListener("keydown", function (e) {
    // EFEK: ESC key untuk menutup mobile menu
    if (e.key === "Escape") {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
    }

    // EFEK: Enter/Space untuk mengaktifkan filter buttons yang difocus
    if (
      (e.key === "Enter" || e.key === " ") &&
      e.target.classList.contains("filter-btn")
    ) {
      e.preventDefault(); // Prevent default space scroll
      e.target.click(); // Trigger click event
    }
  });

  /* ===================================
     14. PRELOADER (OPTIONAL)
     =================================== 
     
     PENJELASAN:
     - Hide preloader setelah halaman fully loaded
     - Smooth fade out animation
     - Meningkatkan perceived performance
     
     INSTRUKSI KUSTOMISASI:
     - Tambahkan preloader element di HTML dengan class 'preloader'
     - Sesuaikan fade out duration (500ms)
     - Bisa tambah delay untuk effect lebih smooth
     
     TIPS:
     - Preloader di-hide setelah window.load (semua asset loaded)
     - Berbeda dengan DOMContentLoaded (hanya HTML/CSS loaded)
  */
  // ===================================

  // INSTRUKSI: Hide preloader setelah halaman fully loaded
  window.addEventListener("load", function () {
    // PENJELASAN: Select preloader element (optional, buat di HTML jika perlu)
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      // EFEK: Fade out preloader
      preloader.style.opacity = "0";

      // EFEK: Remove dari DOM setelah fade out selesai
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500); // INSTRUKSI: Match dengan transition duration
    }
  });

  // PENJELASAN: Console log untuk confirm script loaded
  console.log("✅ Website CV JavaScript loaded successfully!");
});

/* ===================================
   GLOBAL FUNCTIONS (EXPORTED)
   =================================== 
   
   PENJELASAN:
   - Fungsi-fungsi yang dapat dipanggil dari luar DOMContentLoaded
   - Dapat diakses secara global atau dari HTML inline event
   - Exported via window object untuk compatibility
   
   INSTRUKSI KUSTOMISASI:
   - Panggil functions ini dari HTML: onclick="scrollToSection('about')"
   - Tambah fungsi global lain sesuai kebutuhan
   - Bisa digunakan dari console browser untuk testing
*/
// ===================================

// INSTRUKSI: Fungsi untuk smooth scroll ke section tertentu
// PARAMETER: sectionId (string) - ID dari section target
// CARA PAKAI: scrollToSection('about') atau onclick="scrollToSection('contact')"
function scrollToSection(sectionId) {
  // PENJELASAN: Cari section berdasarkan ID
  const section = document.getElementById(sectionId);
  if (section) {
    // EFEK: Hitung posisi dengan offset untuk navbar
    const offsetTop = section.offsetTop - 70; // INSTRUKSI: 70px untuk navbar height, adjust jika perlu

    // EFEK: Scroll smooth ke section
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth", // INSTRUKSI: 'smooth' = animasi, 'auto' = instant
    });
  }
}

// INSTRUKSI: Fungsi untuk download CV
// CARA PAKAI: downloadCV() atau onclick="downloadCV()"
// PENJELASAN: Trigger download file CV secara otomatis
function downloadCV() {
  // INSTRUKSI: Ganti dengan URL file CV yang sesungguhnya
  // CONTOH: const cvUrl = "assets/cv/CV_JohnDoe.pdf";
  const cvUrl = "path/to/your/cv.pdf"; // INSTRUKSI: UPDATE PATH INI!

  // PENJELASAN: Buat link element untuk trigger download
  const link = document.createElement("a");
  link.href = cvUrl;
  link.download = "CV_NamaAnda.pdf"; // INSTRUKSI: Ganti dengan nama file yang diinginkan

  // EFEK: Trigger download
  document.body.appendChild(link);
  link.click(); // Simulate click
  document.body.removeChild(link); // Clean up
}

// INSTRUKSI: Fungsi untuk membuka project portfolio di tab baru
// PARAMETER: projectUrl (string) - URL project yang akan dibuka
// CARA PAKAI: openProject('https://github.com/username/project')
function openProject(projectUrl) {
  // EFEK: Buka URL di tab baru
  window.open(projectUrl, "_blank"); // INSTRUKSI: '_blank' = new tab, '_self' = same tab
}

// INSTRUKSI: Export functions ke window object untuk akses global
// PENJELASAN: Functions dapat dipanggil dengan window.CVWebsite.functionName()
// CONTOH: window.CVWebsite.scrollToSection('about')
window.CVWebsite = {
  scrollToSection, // Export fungsi scroll
  downloadCV, // Export fungsi download
  openProject, // Export fungsi open project
};

/* ===================================
   END OF JAVASCRIPT FILE
   ===================================
   
   CATATAN PENTING:
   ✅ Semua fungsi sudah dilengkapi dengan comment detail
   ✅ Setiap variabel dan parameter dijelaskan fungsinya
   ✅ INSTRUKSI menandai bagian yang perlu dikustomisasi
   ✅ PENJELASAN untuk memahami cara kerja code
   ✅ EFEK untuk menjelaskan hasil yang terlihat
   ✅ TIPS untuk best practices dan saran
   
   CARA KUSTOMISASI:
   1. Cari comment dengan prefix "INSTRUKSI:" untuk tahu apa yang bisa diubah
   2. Setiap nilai yang bisa diubah sudah diberi komentar
   3. Contoh penggunaan tersedia di setiap fungsi
   4. Line numbers disebutkan untuk memudahkan navigasi
   
   TESTING:
   - Buka browser console (F12) untuk debugging
   - Check console.log messages untuk confirm script loaded
   - Test functions dari console: window.CVWebsite.scrollToSection('about')
   
   SUPPORT:
   - Check README.md untuk overview project
*/

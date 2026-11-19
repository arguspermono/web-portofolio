# Skill: Awwwards Editorial & Creative Dev Craft (Reference DNA)

## 1. Reference Architecture & Design DNA
Seluruh keputusan layout, tipografi, dan interaksi pada portofolio ini mengadopsi standar kurasi *Awwwards Portfolio* dan *Creative Developer* independen (`sebg.ch`, `anthracitestudio.be`, `christendijoux.com`, `ivan.technology`, `devinthehood.com`, `vadimcarazan.com`, `jarnket.com`, `rafifnuha.my.id`, `rzainurtanto.github.io`):

1. **Exposed Swiss Grid & Architectural Framing**:
   - Gunakan garis struktur (`1px solid var(--border-panel)`) yang terlihat jelas untuk membagi kolom dan baris layaknya *blueprint* teknis atau *editorial index*—hindari kartu mengambang (*floating cards*) dengan *drop-shadow* tebal.
   - Terapkan *asymmetric column splits* (mis. rasio `1fr : 2fr` atau indeks bernomor di sisi kiri dengan deskripsi lebar di sisi kanan) agar ritme halaman tidak monoton.

2. **Monumental Display Typography & Micro-Metadata**:
   - **Hero & Section Titles**: Gunakan ukuran tipografi yang berani dan masif (`clamp(2.5rem, 6vw, 5.5rem)`) dengan *tight line-height* (`0.95`–`1.05`) dan *negative letter-spacing* (`-0.03em`).
   - **Technical Index Labels**: Pasangkan judul besar dengan label metadata kecil (`11px`–`12px`, `JetBrains Mono`, `uppercase`, `letter-spacing: 0.08em`) untuk nomor urut proyek (`[01]`, `[02]`), tahun, peran, dan koordinat sistem.

3. **Interactive Project Index (List-to-Preview / Kinetic Row)**:
   - Untuk daftar proyek (`Projects`), prioritaskan tampilan *interactive index table/rows* atau *sharp-bordered architectural grid* di mana tiap baris bereaksi saat di-*hover* (pergeseran teks presisi, perubahan warna aksen faksi, atau pratinjau visual cepat) alih-alih kartu generik 3-kolom standar.

4. **Tactile Motion & Kinetic Feedback**:
   - **Text Scramble / Character Roll**: Terapkan *kinetic character scramble* singkat (`200ms`–`300ms`) pada link **Navbar** atau nomor indeks proyek saat di-*hover*.
   - **Scroll-Linked Precision**: Gunakan GSAP `ScrollTrigger` untuk animasi *clip-path reveal* (`inset(0 0 100% 0)` $\rightarrow$ `inset(0 0 0% 0)`), *parallax* halus pada gambar pratinjau, dan garis *progress* navigasi yang presisi.
   - **Easing**: Wajib gunakan kurva mekanis tajam (`power4.out`, `expo.out`), dilarang memakai animasi *bounce* atau *fade-up* lambat yang generik.

5. **Ruthless Copywriting & Whitespace Discipline**:
   - Biarkan *negative space* bekerja; jangan memenuhi layar dengan *badge* atau ikon dekoratif yang tidak memiliki fungsi informasi.
   - Tulis deskripsi proyek secara tajam, lugas, dan berbasis arsitektur/hasil nyata (maksimal 2 kalimat per ringkasan).

## 2. Project Constraints Override
- Tetap gunakan **top Navbar** (`--bg-navbar`) dan **Content Area** putih bersih (`#FFFFFF`) dengan teks gelap (`#0B0B0E`).
- Seluruh warna interaktif, border aktif, dan sorotan elemen wajib membaca token **Gundam Theme Engine (`Theme-0` s.d. `Theme-6`)**.
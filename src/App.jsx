import { useState, useEffect, useRef } from 'react';
import {
  Star, MapPin, Clock, Phone, ChevronLeft, ChevronRight,
  Utensils, Music, Gamepad2, Baby, Truck, Beer, Flame, Pizza
} from 'lucide-react';

export default function App() {
  const [data, setData] = useState(null);
  const [menuTab, setMenuTab] = useState('The Ones (Burgers)');
  const [reviewIdx, setReviewIdx] = useState(0);
  const menuRef = useRef(null);

  useEffect(() => {
    fetch('/data.json')
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { restaurant, features, gallery, reviews, menu_featured, logo } = data;

  const scrollToMenu = () => menuRef.current?.scrollIntoView({ behavior: 'smooth' });

  /* ── MENU TAB LOGIC ── */
  const menuTabs = ['The Ones (Burgers)', 'Pizzas', 'Entradas e Porções'];
  const filteredMenu = menu_featured.filter((item) => {
    if (menuTab === 'The Ones (Burgers)') return item.name.startsWith('The ');
    if (menuTab === 'Pizzas') return item.name.toLowerCase().includes('pizza');
    if (menuTab === 'Entradas e Porções') return !item.name.startsWith('The ') && !item.name.toLowerCase().includes('pizza');
    return true;
  });

  /* ── REVIEWS ── */
  const nextReview = () => setReviewIdx((i) => (i + 1) % reviews.length);
  const prevReview = () => setReviewIdx((i) => (i - 1 + reviews.length) % reviews.length);
  const rev = reviews[reviewIdx];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">

      {/* ═══════════ NAVBAR ═══════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center gap-2">
            <img src={logo} alt="Other Bowling Bar" className="h-10 w-auto rounded" />
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <a href="#features" className="hover:text-purple-400 transition">Atrações</a>
            <a href="#gallery" className="hover:text-purple-400 transition">Galeria</a>
            <a ref={menuRef} href="#menu" className="hover:text-purple-400 transition">Cardápio</a>
            <a href="#reviews" className="hover:text-purple-400 transition">Avaliações</a>
            <a href="#location" className="hover:text-purple-400 transition">Localização</a>
          </div>
          <a
            href={`https://wa.me/${restaurant.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full transition"
          >
            Reservar
          </a>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative h-screen flex items-center justify-center">
        <img
          src={gallery[0].file}
          alt={gallery[0].alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0a0a0a]" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {restaurant.name}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">{restaurant.tagline}</p>
          <p className="mt-2 text-gray-400 text-sm max-w-xl mx-auto">{restaurant.description}</p>

          {/* Rating */}
          <div className="mt-6 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={i < Math.round(restaurant.google_rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
              />
            ))}
            <span className="ml-2 text-sm text-gray-300">
              {restaurant.google_rating} · {restaurant.google_votes} avaliações no Google
            </span>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${restaurant.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg shadow-green-600/30 transition"
            >
              Reservar pelo WhatsApp
            </a>
            <button
              onClick={scrollToMenu}
              className="border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 font-bold px-8 py-4 rounded-full text-lg transition"
            >
              Ver Cardápio
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              O que te espera no Other
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-[#141414] border border-white/5 rounded-2xl p-5 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition group"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition">{f.title}</h3>
                <p className="mt-1 text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ GALLERY ═══════════ */}
      <section id="gallery" className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Galeria
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((g, i) => (
              <div key={i} className="relative group overflow-hidden rounded-2xl aspect-[4/3]">
                <img
                  src={g.file}
                  alt={g.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="absolute bottom-0 left-0 right-0 p-4 text-sm text-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {g.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MENU ═══════════ */}
      <section id="menu" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Cardápio em Destaque
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-8">Os favoritos da casa, feitos com ingredientes selecionados.</p>

          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {menuTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setMenuTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  menuTab === tab
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenu.map((item, i) => (
              <div
                key={i}
                className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <span className="text-cyan-400 font-bold text-sm whitespace-nowrap">{item.price}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ REVIEWS ═══════════ */}
      <section id="reviews" className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              O que dizem sobre nós
            </span>
          </h2>

          <div className="relative bg-[#141414] border border-white/5 rounded-2xl p-8 min-h-[220px] flex flex-col items-center justify-center">
            <button
              onClick={prevReview}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={nextReview}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
            >
              <ChevronRight size={28} />
            </button>

            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xl font-bold text-white mb-4">
              {rev.initial}
            </div>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                />
              ))}
            </div>
            <p className="text-gray-300 italic mb-4 max-w-lg">"{rev.text}"</p>
            <p className="text-sm font-semibold text-purple-300">{rev.name}</p>

            {/* Dots */}
            <div className="flex gap-2 mt-6">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIdx(i)}
                  className={`w-2 h-2 rounded-full transition ${
                    i === reviewIdx ? 'bg-purple-500 w-6' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ LOCATION ═══════════ */}
      <section id="location" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Como Chegar
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-purple-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-white">{restaurant.address}</p>
                  <p className="text-sm text-gray-400">CEP {restaurant.cep}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                <div className="text-sm">
                  <table className="text-left">
                    <tbody>
                      <tr>
                        <td className="pr-4 py-1 text-gray-400">Terça a Sábado</td>
                        <td className="py-1 text-white font-medium">{restaurant.hours.tue_sat}</td>
                      </tr>
                      <tr>
                        <td className="pr-4 py-1 text-gray-400">Domingo</td>
                        <td className="py-1 text-white font-medium">{restaurant.hours.sunday}</td>
                      </tr>
                      <tr>
                        <td className="pr-4 py-1 text-gray-400">Segunda</td>
                        <td className="py-1 text-red-400 font-medium">{restaurant.hours.monday}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-white font-medium">{restaurant.whatsapp_display}</p>
                  <p className="text-sm text-gray-400">WhatsApp</p>
                </div>
              </div>
              <a
                href={`https://wa.me/${restaurant.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-full transition shadow-lg shadow-green-600/30"
              >
                <Phone size={18} /> Fale conosco no WhatsApp
              </a>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/5 h-[350px]">
              <iframe
                title="Localização Other Bowling Bar"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.5!2d-48.6!3d-27.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDEyJzAwLjAiUyA0OMKwMzYnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Other Bowling Bar" className="h-10 w-auto rounded" />
            <span className="text-gray-400 text-sm">© {new Date().getFullYear()} Other Bowling Bar</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#features" className="hover:text-purple-400 transition">Atrações</a>
            <a href="#menu" className="hover:text-purple-400 transition">Cardápio</a>
            <a href="#reviews" className="hover:text-purple-400 transition">Avaliações</a>
            <a href="#location" className="hover:text-purple-400 transition">Localização</a>
          </div>
          <a
            href={restaurant.instagram_url}
            target="_blank"
            rel="noreferrer"
            className="text-purple-400 hover:text-purple-300 transition font-semibold text-sm"
          >
            {restaurant.instagram}
          </a>
        </div>
      </footer>

      {/* ═══════════ WHATSAPP FAB ═══════════ */}
      <a
        href={`https://wa.me/${restaurant.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 transition text-2xl"
        aria-label="WhatsApp"
      >
        <Phone size={26} />
      </a>
    </div>
  );
}

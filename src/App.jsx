import { useState, useEffect, useRef } from 'react'
import { 
  Pizza, 
  Beer, 
  Gamepad2, 
  Music, 
  Baby, 
  Martini, 
  Bike, 
  Zap, 
  Star, 
  MapPin, 
  Phone, 
  Clock,
  Camera as Instagram,
  Menu,
  X, 
  ChevronLeft, 
  ChevronRight, 
  UtensilsCrossed,
  ArrowRight,
  PartyPopper,
  Truck
} from 'lucide-react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('burgers')
  const [activeReviewIndex, setActiveReviewIndex] = useState(0)
  const scrollerRef = useRef(null)

  // Highlights
  const highlights = [
    { icon: <Zap className="glow-cyan-text" size={32} />, title: "Boliche 100% Interativo", desc: "6 pistas Discovery Bowl® com projeção imersiva, alvos LED, painéis touchscreen e efeitos especiais. O primeiro boliche interativo de Santa Catarina!", highlighted: true },
    { icon: <Pizza className="text-pink-500" size={32} />, title: "Pizza Artesanal", desc: "Massa fermentada lentamente, assada no forno a lenha. De 25cm a 45cm. Promo: Pizza Grande R$59,90 nas segundas e terças!" },
    { icon: <Beer className="text-yellow-500" size={32} />, title: "Chopp & Drinks", desc: "Chopp geladinho, drinks autorais exclusivos, cervejas nacionais e importadas. Bar completo para brindar com amigos." },
    { icon: <Gamepad2 className="text-purple-500" size={32} />, title: "Arcade & Fliperama", desc: "Espaço retrô com jogos clássicos, simuladores de corrida e muito mais. Diversão garantida entre uma partida e outra!" },
    { icon: <Baby className="text-emerald-500" size={32} />, title: "Espaço Kids", desc: "Área exclusiva e segura para as crianças brincarem à vontade. Diversão para toda a família!" },
    { icon: <Music className="text-blue-500" size={32} />, title: "Música Ao Vivo", desc: "Programação especial com artistas regionais. Venha curtir boa música enquanto saboreia nossos pratos e drinks!" },
    { icon: <PartyPopper className="text-rose-500" size={32} />, title: "Eventos & Aniversários", desc: "Espaço ideal para eventos corporativos e aniversários. Aniversariantes da semana ganham petit gateau de presente!" },
    { icon: <Truck className="text-teal-500" size={32} />, title: "Delivery Próprio", desc: "Peça pelo nosso delivery via Goomer ou WhatsApp. Hambúrgueres, pizzas e porções chegam quentinhos na sua casa!" }
  ]

  // Menu Data
  const menuData = {
    burgers: [
      { id: 1, title: "The Classic", price: "R$ 39,90", desc: "Blend suculento de 180g, queijo cheddar derretido e nossa exclusiva maionese defumada no pão brioche macio.", image: "/photos/menu/The_Classic.jpg", tag: "Campeão de Vendas" },
      { id: 2, title: "The Cheese One", price: "R$ 48,90", desc: "Blend suculento de 180g, dobro de queijo cheddar derretido, molho especial artesanal no pão brioche tostado.", image: "/photos/menu/The_Cheese_One.jpg", tag: "Muito Queijo" },
      { id: 3, title: "The Bacon One", price: "R$ 44,90", desc: "Blend suculento de 180g, fatias crocantes de bacon premium, cheddar derretido e maionese defumada.", image: "/photos/menu/The_Bacon_One.jpg", tag: "Crocante" },
      { id: 4, title: "The Double One", price: "R$ 53,90", desc: "Dois blends suculentos de 180g (total 360g de carne), queijo cheddar duplo e maionese artesanal da casa.", image: "/photos/menu/The_Double_One.jpg", tag: "Super Fome" },
      { id: 5, title: "The Chicken Crispy", price: "R$ 42,90", desc: "Filé de frango super empanado e crocante, cheddar cremoso, alface fresco e molho leve da casa.", image: "/photos/menu/The_Chicken_Crispy.jpg", tag: "Novidade" }
    ],
    tradicionais: [
      { id: 20, title: "X-Burguer", price: "R$ 20,00", desc: "Hambúrguer simples com queijo derretido no pão brioche. O clássico que nunca sai de moda.", image: null, tag: "Clássico" },
      { id: 21, title: "X-Salada", price: "R$ 25,00", desc: "Hambúrguer com queijo, alface, tomate e maionese. Frescor e sabor em cada mordida.", image: null, tag: "Fresquinho" },
      { id: 22, title: "X-Bacon", price: "R$ 28,00", desc: "Hambúrguer com queijo e bacon crocante. O sabor defumado do bacon premium faz toda a diferença.", image: null, tag: "Crocante" },
      { id: 23, title: "X-Especial", price: "R$ 32,00", desc: "Hambúrguer com queijo, bacon, ovo, presunto, alface e tomate. O completo para quem tem fome!", image: null, tag: "Completo" }
    ],
    pizzas: [
      { id: 6, title: "Pizza Pequena (25cm)", price: "R$ 38,00", desc: "Tamanho perfeito para matar a sua fome individual. 4 fatias generosas com os sabores tradicionais ou doces.", image: "/photos/menu/Pizza_Media_30cm.jpg", tag: "Individual" },
      { id: 7, title: "Pizza Média (30cm)", price: "R$ 55,00", desc: "Ideal para compartilhar em duas pessoas. 8 fatias com até 2 sabores de sua preferência.", image: "/photos/menu/Pizza_Media_30cm.jpg", tag: "Mais Pedida" },
      { id: 8, title: "Pizza Grande (35cm)", price: "R$ 80,00", desc: "Perfeita para a família ou o grupo de boliche. 12 fatias gigantes com até 3 sabores diferentes.", image: "/photos/menu/Pizza_Media_30cm.jpg", tag: "Tamanho Família" }
    ],
    entradas: [
      { id: 9, title: "Mini Pastéis (12 un)", price: "R$ 33,00", desc: "Cesta de mini pastéis super crocantes e recheados na hora. Opções de carne, queijo e chocolate.", image: null, tag: "Para Compartilhar" },
      { id: 10, title: "Batata Frita Tradicional", price: "R$ 30,00", desc: "Porção de batatas fritas super crocantes por fora e macias por dentro, salpicadas com tempero especial.", image: null, tag: "Clássico" },
      { id: 11, title: "Batata Frita Rústica", price: "R$ 34,50", desc: "Batatas fritas rústicas com casca, temperadas com alecrim fresco e alho confitado, acompanhadas de maionese defumada.", image: null, tag: "Especial" },
      { id: 12, title: "Anel de Cebola (Onion Rings)", price: "R$ 34,50", desc: "Anéis de cebola gigantes empanados em farinha panko super crocante, acompanhados de barbecue.", image: null, tag: "Sucesso" }
    ],
    porcoes: [
      { id: 13, title: "Porção Mista", price: "R$ 122,50", desc: "A porção definitiva de boteco: alcatra em tiras grelhada, calabresa acebolada, coração de frango e cubos de frango crocante.", image: null, tag: "Completa" },
      { id: 14, title: "Porção de Alcatra", price: "R$ 49,00", desc: "Alcatra premium em tiras grelhada na chapa com cebola e pimentão, servida bem quente com farofa.", image: null, tag: "Carne Grelhada" },
      { id: 24, title: "Porção de Calabresa", price: "R$ 46,50", desc: "Calabresa fatiada grelhada com cebola caramelizada. Acompanha farofa e molho especial.", image: null, tag: "Boteco" },
      { id: 25, title: "Frango à Passarinho", price: "R$ 42,00", desc: "Pedaços de frango temperados e fritos até ficarem dourados e crocantes. Perfeito para compartilhar.", image: null, tag: "Para Dividir" },
      { id: 26, title: "Porção de Batata com Cheddar e Bacon", price: "R$ 45,00", desc: "Batatas fritas crocantes cobertas com cheddar cremoso e bacon crocante. Irresistível!", image: null, tag: "Imperdível" }
    ],
    pasteis: [
      { id: 27, title: "Pastel de Carne", price: "R$ 20,00", desc: "Pastel crocante recheado com carne moída temperada com cebola e azeitona.", image: null, tag: "Tradicional" },
      { id: 28, title: "Pastel de Queijo", price: "R$ 18,00", desc: "Pastel crocante recheado com queijo derretido. Simples, mas irresistível.", image: null, tag: "Clássico" },
      { id: 29, title: "Pastel Especial de Carne Seca", price: "R$ 27,00", desc: "Pastel artesanal recheado com carne seca desfiada e catupiry cremoso.", image: null, tag: "Especial" },
      { id: 30, title: "Pastel de Chocolate", price: "R$ 15,00", desc: "Pastel doce crocante recheado com chocolate derretido. A sobremesa perfeita!", image: null, tag: "Doce" }
    ],
    frutosdomar: [
      { id: 31, title: "Isca de Peixe", price: "R$ 103,50", desc: "Iscas de peixe empanadas e fritas, crocantes por fora e macias por dentro. Acompanha molho tártaro.", image: null, tag: "Frito" },
      { id: 32, title: "Camarão Empanado", price: "R$ 119,00", desc: "Camarões grandes empanados e fritos até ficarem dourados. Acompanha molho rosé.", image: null, tag: "Premium" },
      { id: 33, title: "Lula Frita", price: "R$ 119,00", desc: "Anéis de lula empanados em farinha panko e fritos. Crocantes e saborosos, acompanham molho especial.", image: null, tag: "Especial" }
    ],
    bebidas: [
      { id: 15, title: "Gin de Morango", price: "Consulte", desc: "Drink refrescante de gin artesanal premium, xarope de morangos selecionados, água tônica e especiarias.", image: "/photos/drinks/gin-morango.jpg", tag: "Exclusivo" },
      { id: 16, title: "Cerveja Long Neck (330ml)", price: "R$ 13,00", desc: "Marcas premium importadas e nacionais geladas ao extremo para acompanhar seu jogo.", image: null, tag: "Gelada" },
      { id: 17, title: "Cerveja Lata (350ml)", price: "R$ 8,00", desc: "Opções tradicionais de cervejas nacionais, sempre trincando de geladas.", image: null, tag: "Econômico" },
      { id: 18, title: "Refrigerante Lata", price: "R$ 8,00", desc: "Coca-Cola, Guaraná Antarctica, Fanta e suas versões zero açúcar bem gelados.", image: null, tag: "Refrescante" },
      { id: 19, title: "Suco Natural (300ml)", price: "R$ 13,00", desc: "Sucos naturais feitos na hora. Laranja, limão, morango ou abacaxi com hortelã.", image: null, tag: "Saudável" }
    ]
  }

  // Reviews
  const reviews = [
    { author: "Mariana Silva", initial: "M", rating: 5, text: "Lugar incrível! Boliche divertido e a pizza é sensacional!", date: "Google Maps Review" },
    { author: "Carlos Eduardo", initial: "C", rating: 5, text: "Perfeito para ir com a família. As crianças amaram o espaço kids.", date: "Google Maps Review" },
    { author: "Rodrigo Santos", initial: "R", rating: 5, text: "Os burgers The Ones são de outro nível. Recomendo o The Cheese One!", date: "Google Maps Review" },
    { author: "Amanda Costa", initial: "A", rating: 4, text: "Ambiente top, drinks bons e atendimento rápido.", date: "Google Maps Review" },
    { author: "Felipe Almeida", initial: "F", rating: 5, text: "O melhor lugar para Happy Hour em Tijucas!", date: "Google Maps Review" }
  ]

  // Handle scrolling of reviews
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const handleScroll = () => {
      const scrollerRect = scroller.getBoundingClientRect()
      const cards = scroller.querySelectorAll('.review-card')
      let minDistance = Infinity
      let activeIdx = 0

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const scrollerCenter = scrollerRect.left + scrollerRect.width / 2
        const distance = Math.abs(cardCenter - scrollerCenter)

        if (distance < minDistance) {
          minDistance = distance
          activeIdx = index
        }

        // JS Fallback for scroll-driven animations scaling
        if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
          const progress = (cardCenter - scrollerRect.left) / scrollerRect.width
          const scale = 1 - Math.abs(progress - 0.5) * 0.3
          const opacity = 1 - Math.abs(progress - 0.5) * 1.0
          const clampedScale = Math.max(0.85, Math.min(1, scale))
          const clampedOpacity = Math.max(0.4, Math.min(1, opacity))
          
          card.style.transform = `scale(${clampedScale})`
          card.style.opacity = clampedOpacity
        }
      })

      setActiveReviewIndex(activeIdx)
    }

    scroller.addEventListener('scroll', handleScroll)
    // Run initially
    handleScroll()

    return () => {
      scroller.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollCarousel = (direction) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const cardWidth = scroller.querySelector('.review-card').offsetWidth
    const gap = 40 // Gap of 2.5rem
    const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap)
    scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  // Smooth WhatsApp redirect
  const contactWhatsApp = (message) => {
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/5548998184413?text=${encoded}`, '_blank')
  }

  return (
    <>
      {/* Sticky Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="nav-logo">
            <img src="/photos/menu/logo.png" alt="Other Bowling Bar Logo" />
            <div className="nav-logo-text">
              OTHER <span>BOLICHE</span>
            </div>
          </a>

          <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#boliche" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Boliche</a></li>
            <li><a href="#destaques" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Experiências</a></li>
            <li><a href="#eventos" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Eventos</a></li>
            <li><a href="#cardapio" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Cardápio</a></li>
            <li><a href="#avaliacoes" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Avaliações</a></li>
            <li><a href="#contato" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contato</a></li>
          </ul>

          <div className="nav-actions">
            <a 
              href="https://instagram.com/othertijucas" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="instagram-btn"
              title="Siga-nos no Instagram (@othertijucas)"
            >
              <Instagram size={22} />
            </a>
            <button 
              className="cta-button"
              onClick={() => contactWhatsApp("Olá! Gostaria de reservar uma pista de boliche no Other Bowling Bar.")}
            >
              Reservar Pista
            </button>
          </div>

          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu de navegação"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div 
          className="hero-bg-media" 
          style={{ backgroundImage: `url('/photos/hero/hero-exterior.jpg')` }}
        ></div>
        <div className="hero-overlay"></div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Zap size={14} style={{ marginRight: '0.25rem' }} />
              Tijucas, SC
            </div>
            
            <h1 className="hero-title">
              Sua Noite Perfeita
              <span className="glow-pink-text">Começa Aqui</span>
            </h1>
            
            <p className="hero-description">
              Boliche interativo, gastronomia premium, drinks autorais e música ao vivo. 
              O lugar mais divertido de Tijucas te espera!
            </p>

            <div className="hero-ctas">
              <button 
                className="cta-button"
                onClick={() => contactWhatsApp("Olá! Gostaria de reservar uma pista de boliche no Other Bowling Bar.")}
              >
                Reservar Agora
              </button>
              <a href="#destaques" className="hero-cta-secondary">
                Conhecer Espaço
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-glow-circle"></div>
            <div className="hero-image-wrapper">
              <img src="/photos/instagram_real/05-bowling-date-night.jpg" alt="No Other, cada momento é especial" />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat">
          <span className="stat-number">6</span>
          <span className="stat-label">Pistas Interativas</span>
        </div>
        <div className="stat">
          <span className="stat-number">4.7★</span>
          <span className="stat-label">Google (472+ votos)</span>
        </div>
        <div className="stat">
          <span className="stat-number">17K+</span>
          <span className="stat-label">Seguidores Instagram</span>
        </div>
        <div className="stat">
          <span className="stat-number">2017</span>
          <span className="stat-label">Desde</span>
        </div>
      </div>

      {/* Highlights Section */}
      <section id="destaques" className="features-section">
        <div className="section-header">
          <span className="section-tag">Diferenciais</span>
          <h2 className="section-title glow-cyan-text">O Que Espera Por Você</h2>
          <p className="section-desc">No Other Bowling Bar, cada detalhe é planejado para criar experiências e momentos lendários com seus amigos e familiares.</p>
        </div>

        <div className="features-grid">
          {highlights.map((feat, index) => (
            <div 
              key={index} 
              className={`feature-card ${feat.highlighted ? 'highlighted' : ''}`}
            >
              <div className="feature-icon-wrapper">
                {feat.icon}
              </div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Special Combo Section */}
      <section id="boliche" className="promo-section">
        <div className="promo-container">
          <div>
            <span className="promo-tag">Experiência Única</span>
            <h2 className="promo-title glow-pink-text">Boliche Interativo Discovery Bowl®</h2>
            <p className="promo-desc">
              6 pistas com tecnologia de ponta: projeção imersiva na superfície da pista, 
              alvos LED nos protetores, painéis touchscreen de última geração e efeitos especiais 
              que transformam cada jogada em um espetáculo visual. O primeiro boliche 100% interativo de Santa Catarina!
            </p>
            <div className="promo-price-box">
              <div>
                <p className="promo-price-label">A partir de</p>
                <p className="promo-price">R$ 125/hora</p>
                <p className="promo-price-label">por pista (até 6 pessoas)</p>
              </div>
            </div>
            <button 
              className="cta-button"
              onClick={() => contactWhatsApp("Olá! Gostaria de saber os valores e disponibilidade das pistas de boliche.")}
            >
              Consultar Disponibilidade <ArrowRight size={16} />
            </button>
          </div>
          <div className="promo-image-wrapper">
            <img src="/photos/promo/bowling-interactive.jpg" alt="Boliche Interativo Discovery Bowl" />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="eventos" className="events-section">
        <div className="events-container">
          <div className="section-header">
            <span className="section-tag">Eventos</span>
            <h2 className="section-title glow-pink-text">Celebre na Other</h2>
            <p className="section-desc">Espaço completo para aniversários, eventos corporativos e confraternizações. Surpreenda seus convidados!</p>
          </div>
          <div className="events-grid">
            <div className="event-card">
              <div className="event-icon">🎂</div>
              <h3>Aniversários</h3>
              <p>Faça sua festa com boliche interativo, gastronomia premium e drinks exclusivos. Aniversariantes da semana ganham petit gateau!</p>
              <button className="cta-button" onClick={() => contactWhatsApp("Olá! Gostaria de fazer uma festa de aniversário no Other.")}>Reservar Festa</button>
            </div>
            <div className="event-card">
              <div className="event-icon">🏢</div>
              <h3>Corporativo</h3>
              <p>Team building, confraternizações e eventos corporativos em um ambiente único. Espaço exclusivo para grupos.</p>
              <button className="cta-button" onClick={() => contactWhatsApp("Olá! Gostaria de fazer um evento corporativo no Other.")}>Solicitar Proposta</button>
            </div>
            <div className="event-card">
              <div className="event-icon">🎯</div>
              <h3>Grupos</h3>
              <p>Amigos, família ou qualquer ocasião especial. Reserve pistas, aproveite a gastronomia e divirta-se!</p>
              <button className="cta-button" onClick={() => contactWhatsApp("Olá! Gostaria de reservar para um grupo no Other.")}>Reservar Mesa</button>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="cardapio" className="menu-section">
        <div className="menu-container">
          <div className="section-header">
            <span className="section-tag">Cardápio</span>
            <h2 className="section-title glow-purple-text">Sabor de Outro Nível</h2>
            <p className="section-desc">Burgers artesanais exclusivos com blends suculentos de 180g, pizzas artesanais crocantes e bebidas refrescantes.</p>
          </div>

          <div className="menu-tabs">
            <button className={`menu-tab-btn ${activeTab === 'burgers' ? 'active' : ''}`} onClick={() => setActiveTab('burgers')}>The Ones</button>
            <button className={`menu-tab-btn ${activeTab === 'tradicionais' ? 'active' : ''}`} onClick={() => setActiveTab('tradicionais')}>Tradicionais</button>
            <button className={`menu-tab-btn ${activeTab === 'pizzas' ? 'active' : ''}`} onClick={() => setActiveTab('pizzas')}>Pizzas</button>
            <button className={`menu-tab-btn ${activeTab === 'entradas' ? 'active' : ''}`} onClick={() => setActiveTab('entradas')}>Entradas</button>
            <button className={`menu-tab-btn ${activeTab === 'porcoes' ? 'active' : ''}`} onClick={() => setActiveTab('porcoes')}>Porções</button>
            <button className={`menu-tab-btn ${activeTab === 'pasteis' ? 'active' : ''}`} onClick={() => setActiveTab('pasteis')}>Pastéis</button>
            <button className={`menu-tab-btn ${activeTab === 'frutosdomar' ? 'active' : ''}`} onClick={() => setActiveTab('frutosdomar')}>Frutos do Mar</button>
            <button className={`menu-tab-btn ${activeTab === 'bebidas' ? 'active' : ''}`} onClick={() => setActiveTab('bebidas')}>Bebidas</button>
          </div>

          <div className="menu-grid">
            {menuData[activeTab].map((item) => (
              <div key={item.id} className="menu-card">
                {item.image && (
                  <div className="menu-card-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                )}
                <div className="menu-card-content">
                  <div className="menu-card-header">
                    <h3 className="menu-card-title">{item.title}</h3>
                    <span className="menu-card-price">{item.price}</span>
                  </div>
                  <p className="menu-card-desc">{item.desc}</p>
                  <div className="menu-card-footer">
                    <span className="menu-card-badge">{item.tag}</span>
                    <button 
                      className="menu-order-btn"
                      onClick={() => contactWhatsApp(`Olá! Gostaria de pedir o item "${item.title}" para consumo.`)}
                    >
                      Pedir no Boliche
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bowling Section */}
      <section id="pistas" className="bowling-section">
        <div className="bowling-container">
          <div className="section-header">
            <span className="section-tag">Boliche</span>
            <h2 className="section-title glow-cyan-text">Pistas Interativas</h2>
            <p className="section-desc">6 pistas Discovery Bowl® com tecnologia de projeção imersiva. A partir de R$125/hora por pista (até 6 pessoas).</p>
          </div>
          <div className="bowling-features">
            <div className="bowling-feature">
              <span className="bowling-feature-icon">📽️</span>
              <span>Projeção Imersiva</span>
            </div>
            <div className="bowling-feature">
              <span className="bowling-feature-icon">🎯</span>
              <span>Alvos LED</span>
            </div>
            <div className="bowling-feature">
              <span className="bowling-feature-icon">🖥️</span>
              <span>Touchscreen</span>
            </div>
            <div className="bowling-feature">
              <span className="bowling-feature-icon">🌫️</span>
              <span>Efeitos Especiais</span>
            </div>
          </div>
          <div className="bowling-cta">
            <button className="cta-button" onClick={() => contactWhatsApp("Olá! Gostaria de saber os valores e disponibilidade das pistas de boliche.")}>Consultar Disponibilidade</button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="avaliacoes" className="reviews-section">
        <div className="reviews-container">
          <div className="section-header">
            <span className="section-tag">Avaliações</span>
            <h2 className="section-title glow-pink-text">O Que Dizem Nossos Clientes</h2>
            <p className="section-desc">Avaliação média de 4.7 estrelas com mais de 450 avaliações no Google Maps.</p>
          </div>

          <div className="scroller-wrapper">
            <ul className="scroller" ref={scrollerRef}>
              {reviews.map((rev, index) => (
                <li key={index} className="review-card">
                  <div className="review-stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="review-text">"{rev.text}"</p>
                  <div className="review-author">
                    <div className="author-avatar">{rev.initial}</div>
                    <div className="author-info">
                      <h4>{rev.author}</h4>
                      <p>{rev.date}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="scroller-navigation">
            <button className="scroll-btn" onClick={() => scrollCarousel('left')} aria-label="Avaliação anterior">
              <ChevronLeft size={20} />
            </button>
            
            {reviews.map((_, index) => (
              <span 
                key={index} 
                className={`scroll-dot ${index === activeReviewIndex ? 'active' : ''}`}
              ></span>
            ))}

            <button className="scroll-btn" onClick={() => scrollCarousel('right')} aria-label="Próxima avaliação">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contato" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <div className="section-header" style={{ textAlign: 'left', alignItems: 'flex-start', padding: 0, marginBottom: '2rem' }}>
              <span className="section-tag">Contato & Localização</span>
              <h2 className="section-title glow-cyan-text">Venha Jogar Conosco</h2>
              <p className="section-desc">Planeje sua visita ou faça seu evento corporativo ou aniversário aqui no Other!</p>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <MapPin size={24} />
              </div>
              <div className="info-details">
                <h3>Endereço</h3>
                <p>Rua Coronel Gallotti, 431 — Centro<br />Tijucas, SC — CEP 88200-000</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Clock size={24} />
              </div>
              <div className="info-details" style={{ width: '100%' }}>
                <h3>Horário de Funcionamento</h3>
                <table className="hours-table">
                  <tbody>
                    <tr>
                      <td>Terça a Sábado</td>
                      <td>18h — 00h</td>
                    </tr>
                    <tr>
                      <td>Domingo</td>
                      <td>17h — 23h</td>
                    </tr>
                    <tr>
                      <td>Segunda-feira</td>
                      <td>Fechado</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Phone size={24} />
              </div>
              <div className="info-details">
                <h3>Reservas & Eventos</h3>
                <p>Fixo: <strong>(48) 3263-2478</strong> · WhatsApp: <strong>(48) 99818-4413</strong></p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.2rem' }}>Dica: Faça sua reserva antecipada para evitar filas no boliche.</p>
              </div>
            </div>
          </div>

          <div className="map-wrapper">
            <iframe 
              title="Other Bowling Bar no Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.8687799507856!2d-48.63665792461971!3d-27.2407519764516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95034ba7064d1f27%3A0xeab5b706c8f61536!2sR.%20Coronel%20Gallotti%2C%20431%20-%20Centro%2C%20Tijucas%20-%20SC%2C%2088200-000!5e0!3m2!1spt-BR!2sbr!4v1781834927000!5m2!1spt-BR!2sbr"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Action Button */}
      <button 
        className="floating-whatsapp" 
        onClick={() => contactWhatsApp("Olá! Gostaria de fazer uma reserva de pista ou tirar dúvidas.")}
        aria-label="Falar pelo WhatsApp"
      >
        <Phone size={30} fill="currentColor" />
      </button>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="footer-logo">
                <img src="/photos/menu/logo.png" alt="Other Bowling Bar Logo" />
                <div>OTHER <span>BOLICHE</span></div>
              </a>
              <p>A primeira pista de boliche 100% interativa de Santa Catarina. Gastronomia premium, diversão de alta qualidade e momentos incríveis.</p>
              <div className="footer-socials">
                <a 
                  href="https://instagram.com/othertijucas" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-btn"
                  aria-label="Siga no Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-link-group">
                <h4>Navegação</h4>
                <ul>
                  <li><a href="#boliche">Boliche</a></li>
                  <li><a href="#destaques">Experiências</a></li>
                  <li><a href="#eventos">Eventos</a></li>
                  <li><a href="#cardapio">Cardápio</a></li>
                  <li><a href="#avaliacoes">Avaliações</a></li>
                </ul>
              </div>

              <div className="footer-link-group">
                <h4>Legal</h4>
                <ul>
                  <li><a href="#">Privacidade</a></li>
                  <li><a href="#">Termos de Uso</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Other Bowling Bar. Todos os direitos reservados. Tijucas, SC.</p>
            <p>Desenvolvido com carinho para momentos memoráveis.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App

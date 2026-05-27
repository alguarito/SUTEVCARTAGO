/* ===== SUTEV CARTAGO - Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initParticles();
  initCalendar();
  initScrollReveal();
  initForms();
  initGalleryLightbox();
  initCountUp();
  initServicesAccordion();
});

/* ===== HEADER SCROLL ===== */
function initHeader() {
  const header = document.querySelector('.header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 50);
    lastScroll = y;
  });
}

/* ===== MOBILE NAV ===== */
function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const list = document.querySelector('.nav__list');
  if (!toggle || !list) return;
  
  toggle.addEventListener('click', () => {
    const isOpen = list.classList.toggle('open');
    toggle.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Handle all dropdown toggles on mobile
  list.querySelectorAll('.nav__dropdown').forEach(dropdown => {
    const dropToggle = dropdown.querySelector('.nav__dropdown-toggle');
    if (dropToggle) {
      dropToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          e.stopPropagation();
          
          // Close other active dropdowns
          list.querySelectorAll('.nav__dropdown').forEach(other => {
            if (other !== dropdown) other.classList.remove('active');
          });
          
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  // Close nav on click of simple links, but not the dropdown toggle
  list.querySelectorAll('.nav__link:not(.nav__dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      list.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
      list.querySelectorAll('.nav__dropdown').forEach(d => d.classList.remove('active'));
    });
  });

  // Close mobile nav when clicking a dropdown item
  list.querySelectorAll('.nav__dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      list.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
      list.querySelectorAll('.nav__dropdown').forEach(d => d.classList.remove('active'));
    });
  });
}

/* ===== HERO PARTICLES ===== */
function initParticles() {
  const container = document.querySelector('.hero__particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'hero__particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    container.appendChild(p);
  }
}

/* ===== CALENDAR ===== */
function initCalendar() {
  const calendarGrid = document.getElementById('calendarGrid');
  const monthLabel = document.getElementById('calendarMonth');
  const prevBtn = document.getElementById('calPrev');
  const nextBtn = document.getElementById('calNext');
  const eventsList = document.getElementById('calendarEvents');
  if (!calendarGrid) return;

  let currentDate = new Date();
  const events = [
    { date: '2026-05-15', title: 'Asamblea General de Delegados', desc: 'Casa del Maestro - 2:00 PM', type: 'asamblea' },
    { date: '2026-05-20', title: 'Asesoría Jurídica Abierta', desc: 'Consultas laborales y prestacionales', type: 'juridica' },
    { date: '2026-05-22', title: 'Taller CEID: Pedagogía Crítica', desc: 'Formación docente - 8:00 AM', type: 'ceid' },
    { date: '2026-05-28', title: 'Jornada Deportiva', desc: 'Encuentro de integración deportiva', type: 'deporte' },
    { date: '2026-06-03', title: 'Comité de Bienestar', desc: 'Planificación actividades semestrales', type: 'bienestar' },
    { date: '2026-06-10', title: 'Asesoría Jurídica', desc: 'Temas: Cesantías y pensiones', type: 'juridica' },
    { date: '2026-06-18', title: 'Seminario CEID: Innovación Educativa', desc: 'Inscripciones abiertas', type: 'ceid' },
    { date: '2026-06-25', title: 'Asamblea Extraordinaria', desc: 'Revisión pliego de solicitudes', type: 'asamblea' },
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    monthLabel.textContent = `${months[month]} ${year}`;

    calendarGrid.innerHTML = '';
    dayNames.forEach(d => {
      const el = document.createElement('div');
      el.className = 'calendar__day-name';
      el.textContent = d;
      calendarGrid.appendChild(el);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    for (let i = 0; i < firstDay; i++) {
      const el = document.createElement('div');
      el.className = 'calendar__day empty';
      calendarGrid.appendChild(el);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const el = document.createElement('div');
      el.className = 'calendar__day';
      el.textContent = d;
      const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const hasEvent = events.find(e => e.date === dateStr);
      if (hasEvent) el.classList.add('has-event');
      if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        el.classList.add('today');
      }
      el.addEventListener('click', () => {
        if (hasEvent) showEventDetail(hasEvent);
      });
      calendarGrid.appendChild(el);
    }

    renderUpcomingEvents(month, year);
  }

  function renderUpcomingEvents(month, year) {
    const monthStr = String(month + 1).padStart(2, '0');
    const filtered = events.filter(e => e.date.startsWith(`${year}-${monthStr}`));
    if (filtered.length === 0) {
      eventsList.innerHTML = '<p style="color: var(--gray-500); font-size: 0.9rem;">No hay eventos programados este mes.</p>';
      return;
    }
    eventsList.innerHTML = filtered.map(e => `
      <div class="calendar__event">
        <div class="calendar__event-date">${e.date.split('-')[2]}/${monthStr}</div>
        <div>
          <div class="calendar__event-title">${e.title}</div>
          <div class="calendar__event-desc">${e.desc}</div>
        </div>
      </div>
    `).join('');
  }

  function showEventDetail(event) {
    showToast(`📅 ${event.title} — ${event.desc}`);
  }

  prevBtn.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); });
  nextBtn.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); });
  renderCalendar();
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

/* ===== FORMS ===== */
function initForms() {
  // Affiliation form
  const afilForm = document.getElementById('affiliationForm');
  if (afilForm) {
    afilForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(afilForm);
      const name = data.get('nombre');
      showToast(`✅ ¡Gracias ${name}! Tu solicitud de afiliación ha sido recibida.`);
      afilForm.reset();
    });
  }

  // Reservation form
  const resForm = document.getElementById('reservationForm');
  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(resForm);
      const servicio = data.get('servicio');
      showToast(`✅ Reserva de ${servicio} registrada exitosamente. Te contactaremos pronto.`);
      resForm.reset();
    });
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✅ Mensaje enviado correctamente. Te responderemos pronto.');
      contactForm.reset();
    });
  }
}

/* ===== GALLERY LIGHTBOX ===== */
function initGalleryLightbox() {
  const items = document.querySelectorAll('.gallery__item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lightbox) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

/* ===== COUNT UP ANIMATION ===== */
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current.toLocaleString() + suffix;
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

/* ===== TOAST ===== */
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ===== SMOOTH NAV ACTIVE STATE ===== */
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${id}"]`);
    if (link) {
      const isActive = scrollY >= top && scrollY < top + height;
      if (isActive) {
        if (window.innerWidth > 900) {
          link.style.color = 'var(--green-700)';
          link.style.background = 'var(--green-50)';
        } else {
          link.classList.add('active');
        }
      } else {
        link.style.color = '';
        link.style.background = '';
        link.classList.remove('active');
      }
    }
  });
});

/* ===== SERVICES & TOOLS COLLAPSIBLE DRAWERS ===== */
function initServicesAccordion() {
  // Services Drawer Toggle
  const servicesBtn = document.getElementById('toggleServicesBtn');
  const servicesDrawer = document.getElementById('servicesDrawer');
  
  if (servicesBtn && servicesDrawer) {
    servicesBtn.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        const isOpen = servicesDrawer.classList.toggle('open');
        servicesBtn.classList.toggle('active', isOpen);
      }
    });
  }

  // Tools Dropdown Selector
  const toolsSelector = document.getElementById('toolsSelector');
  const selectedToolLabel = document.getElementById('selectedToolLabel');
  const placeholderCard = document.getElementById('toolsPlaceholderCard');
  const toolsGrid = document.querySelector('.tools__grid');
  
  if (toolsSelector && selectedToolLabel) {
    toolsSelector.addEventListener('change', function() {
      if (window.innerWidth <= 900) {
        const val = this.value;
        const txt = this.options[this.selectedIndex].text;
        
        // Update label text
        selectedToolLabel.textContent = txt;
        
        // Hide placeholder card
        if (placeholderCard) {
          placeholderCard.style.setProperty('display', 'none', 'important');
        }
        
        // Hide all tool cards
        if (toolsGrid) {
          toolsGrid.querySelectorAll('.service-card').forEach(card => {
            card.classList.remove('active-mobile');
          });
          
          // Show chosen tool card
          const activeCard = toolsGrid.querySelector(`.service-card[data-tool="${val}"]`);
          if (activeCard) {
            activeCard.classList.add('active-mobile');
            // Trigger quick CSS transition
            activeCard.style.opacity = '0';
            setTimeout(() => {
              activeCard.style.opacity = '1';
            }, 30);
          }
        }
      }
    });
  }
}

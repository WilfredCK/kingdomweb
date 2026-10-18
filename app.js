(() => {
  "use strict";
  const data = window.KC_DATA || {services:[],steps:[],impactAreas:[]};
  const $ = (selector, root=document) => root.querySelector(selector);
  const serviceGrid = $("#serviceGrid");
  const stepsGrid = $("#stepsGrid");
  const impactGrid = $("#impactGrid");
  const interest = $("#interest");

  serviceGrid.innerHTML = data.services.map(s => `
    <article class="service-card" tabindex="0" role="button" aria-label="Learn more about ${s.title}" data-service="${s.id}">
      <span class="service-index">${s.number} / 06</span><span class="service-icon" aria-hidden="true">${s.icon}</span>
      <h3>${s.title}</h3><p>${s.short}</p><span class="card-link">EXPLORE SERVICE <span>↗</span></span>
    </article>`).join("");
  stepsGrid.innerHTML = data.steps.map(s => `<article class="step"><span class="step-number">${s.number} / 04</span><h3>${s.title}</h3><p>${s.text}</p></article>`).join("");
  impactGrid.innerHTML = data.impactAreas.map(a => `<article class="impact-item"><span aria-hidden="true">${a.icon}</span><h3>${a.title}</h3><p>${a.text}</p></article>`).join("");
  data.services.forEach(s => interest.add(new Option(s.title, s.title)));

  const menuToggle = $("#menuToggle"), mainNav = $("#mainNav");
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    mainNav.classList.remove("open"); menuToggle.setAttribute("aria-expanded","false");
  }));

  const modal = $("#serviceModal"), modalTitle = $("#modalTitle"), modalDescription = $("#modalDescription"), modalList = $("#modalList");
  function openService(id) {
    const s = data.services.find(item => item.id === id);
    if (!s) return;
    modalTitle.textContent = s.title;
    modalDescription.textContent = s.description;
    $("#modalKicker").textContent = `SOLUTION ${s.number} / 06`;
    modalList.replaceChildren(...s.deliverables.map(item => { const li=document.createElement("li"); li.textContent=item; return li; }));
    modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
    $("#modalClose").focus();
  }
  function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";}
  serviceGrid.addEventListener("click", e => {const card=e.target.closest("[data-service]");if(card)openService(card.dataset.service);});
  serviceGrid.addEventListener("keydown", e => {if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-service]")){e.preventDefault();openService(e.target.dataset.service);}});
  $("#modalClose").addEventListener("click",closeModal);
  modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("open"))closeModal();});
  $("#modalCta").addEventListener("click",closeModal);

  $("#contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const form=e.currentTarget;
    if(!form.reportValidity()) return;
    const values=Object.fromEntries(new FormData(form).entries());
    const status=$("#formStatus");
    status.textContent=`Thank you, ${values.name.trim()}! Your demo enquiry has been prepared. Connect this form to your email or backend to receive real submissions.`;
    status.scrollIntoView({behavior:"smooth",block:"nearest"});
    form.reset();
  });
  $("#year").textContent = new Date().getFullYear();

  // Scroll reveal, progress, active navigation, pointer glow, and tactile interactions.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const progress = document.createElement("div"); progress.id = "kcScrollProgress"; progress.setAttribute("aria-hidden","true"); document.body.append(progress);
  const glow = document.createElement("div"); glow.id = "kcPointerGlow"; glow.setAttribute("aria-hidden","true"); document.body.append(glow);
  let scrollTick = false;
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, window.scrollY / max * 100) : 0}%`;
    scrollTick = false;
  };
  window.addEventListener("scroll", () => { if(!scrollTick){window.requestAnimationFrame(updateScroll);scrollTick=true;} }, {passive:true});
  updateScroll();

  const revealTargets = document.querySelectorAll(
    ".section-kicker,.intro-grid > *, .principles article,.services-heading > *, .service-card,.services-footer,.diagnostic-art,.diagnostic-copy > *, .approach-heading > *, .step,.impact-top > *, .impact-item,.impact-statement,.contact-left > *, .contact-form,.site-footer > *"
  );
  if (!reduceMotion && "IntersectionObserver" in window) {
    revealTargets.forEach(el=>el.classList.add("reveal-ready"));
    const revealObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("in-view");revealObserver.unobserve(entry.target);}
    }),{threshold:.12,rootMargin:"0px 0px -35px 0px"});
    revealTargets.forEach(el=>revealObserver.observe(el));
  }

  // Navigation reflects the section currently on screen.
  const navLinks = [...mainNav.querySelectorAll('a[href^="#"]')];
  const navSections = navLinks.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if("IntersectionObserver" in window){
    const navObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));}
    }),{rootMargin:"-28% 0px -62% 0px",threshold:0});
    navSections.forEach(section=>navObserver.observe(section));
  }

  if(window.matchMedia("(hover: hover) and (pointer: fine)").matches){
    window.addEventListener("pointermove",e=>{
      glow.style.opacity="1";glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";
    },{passive:true});
    document.addEventListener("pointerleave",()=>glow.style.opacity="0");
  }

  // Give cards a gentle 3D response on desktop; use a visible pressed state on touch.
  serviceGrid.addEventListener("pointermove",e=>{
    const card=e.target.closest(".service-card");if(!card||!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;
    const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) translateY(-6px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*3).toFixed(2)}deg)`;
  });
  serviceGrid.addEventListener("pointerout",e=>{const card=e.target.closest(".service-card");if(card&&!card.contains(e.relatedTarget))card.style.transform="";});
  serviceGrid.addEventListener("touchstart",e=>{const card=e.target.closest(".service-card");if(card){card.classList.add("is-touched");setTimeout(()=>card.classList.remove("is-touched"),650);}},{passive:true});

  // Small click ripples on interactive controls (purely decorative, no layout impact).
  document.addEventListener("click",e=>{
    const target=e.target.closest(".button,.nav-cta,.service-card,.underlined-link,.contact-symbol");
    if(!target||target.closest(".modal-backdrop"))return;
    const rect=target.getBoundingClientRect(),size=Math.max(rect.width,rect.height)*1.25;
    const ripple=document.createElement("span");ripple.className="kc-ripple";ripple.style.width=size+"px";ripple.style.height=size+"px";
    ripple.style.left=(e.clientX ? e.clientX-rect.left-size/2 : rect.width/2-size/2)+"px";
    ripple.style.top=(e.clientY ? e.clientY-rect.top-size/2 : rect.height/2-size/2)+"px";
    if(getComputedStyle(target).position==="static")target.style.position="relative";
    target.style.overflow="hidden";target.append(ripple);setTimeout(()=>ripple.remove(),700);
  });

  // Small parallax response on the featured diagnostic illustration.
  const diagnosticArt = $(".diagnostic-art");
  if(diagnosticArt && !reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches){
    diagnosticArt.addEventListener("pointermove",e=>{const r=diagnosticArt.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;diagnosticArt.style.backgroundPosition=`${50+x*5}% ${50+y*5}%`;});
    diagnosticArt.addEventListener("pointerleave",()=>diagnosticArt.style.backgroundPosition="center");
  }

})();
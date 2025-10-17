// Minimal interactive behavior for the demo site
document.getElementById('year').textContent = new Date().getFullYear();

function submitContact(e){
  e.preventDefault();
  const form = e.target;
  const data = Array.from(new FormData(form)).reduce((o,[k,v])=> (o[k]=v,o),{});
  // Simulate submit
  alert('Thanks, ' + (data.name||'friend') + '! Your message was sent.');
  form.reset();
}

// Small: smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      document.querySelector(href).scrollIntoView({behavior:'smooth'});
    }
  })
});

// Sticky header: add/remove class when scrolled
(() => {
  const header = document.querySelector('.site-header');
  if(!header) return;
  const threshold = 60;
  const onScroll = () => {
    if(window.scrollY > threshold) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  // run once to set initial state
  onScroll();
})();

// Mobile navigation toggle
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(!toggle || !nav) return;
  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(!!open));
  };
  toggle.addEventListener('click', ()=> setOpen(!nav.classList.contains('open')));
  // close when a link is clicked
  nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> setOpen(false)));
  // close on overlay/escape
  window.addEventListener('keydown', (e)=> { if(e.key === 'Escape') setOpen(false); });
})();

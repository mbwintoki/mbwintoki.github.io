(function(){
  var els = document.querySelectorAll('.reveal');
  if(!els.length) return;

  function revealAll(){ els.forEach(function(e){ e.classList.add('in'); }); }

  // No observer support or reduced motion: show everything immediately.
  if(!('IntersectionObserver' in window) ||
     (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
    revealAll();
    return;
  }

  // Reveal as soon as ANY part of an element enters the viewport (threshold 0).
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { root:null, rootMargin:'0px 0px 10% 0px', threshold:0 });

  els.forEach(function(e){ io.observe(e); });

  // Safety net: anything already in (or above) the initial viewport shows right
  // away, even a very tall block whose intersection ratio stays small on mobile.
  function revealInView(){
    var vh = window.innerHeight || document.documentElement.clientHeight;
    els.forEach(function(e){
      if(e.classList.contains('in')) return;
      if(e.getBoundingClientRect().top < vh){ e.classList.add('in'); io.unobserve(e); }
    });
  }
  if(document.readyState === 'complete'){ revealInView(); }
  else { window.addEventListener('load', revealInView); }
  setTimeout(revealInView, 400);
})();

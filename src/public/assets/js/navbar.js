window.addEventListener('scroll', function () {
  let barraNavegacion = document.getElementById('nav');
  let umbralScroll = 100;

  if (window.scrollY > umbralScroll) {
    barraNavegacion.classList.add("sticky")
  } else {
    barraNavegacion.classList.remove("sticky")

  };
  
  barraNavegacion.addEventListener("mouseover", () => {
    barraNavegacion.classList.remove("sticky");
  });  
});


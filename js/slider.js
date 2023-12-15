// Hent DOM-elementer
const slideContainer = document.querySelector('.container');
const slide = document.querySelector('.slides');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const interval = 6000; // Tidsinterval for automatisk billedeskift

// Initialiser variabler
let slides = document.querySelectorAll('.slide');
let index = 1; // Startindeks for visning af slides
let slideId;

// Klon de første og sidste slides for at oprette en "loop" effekt
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

// Initialiser slideposition
slide.style.transform = `translateX(${-slideWidth * index}px)`;

// Funktion til at starte automatisk billedeskift
const startSlide = () => {
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

// Funktion til at hente aktuelle slides
const getSlides = () => document.querySelectorAll('.slide');

// Lyt efter slutningen af overgangen mellem slides
slide.addEventListener('transitionend', () => {
  slides = getSlides();

  // Hvis det viseslide er det klonede første slide
  if (slides[index].id === firstClone.id) {
    // Fjern overgang for øjeblikkelig positionssætning
    slide.style.transition = 'none';
    index = 1;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    
    // Genaktiver overgang for en glat animation
    setTimeout(() => {
      slide.style.transition = `.7s`;
    });
  }

  // Hvis det viseslide er det klonede sidste slide
  if (slides[index].id === lastClone.id) {
    // Fjern overgang for øjeblikkelig positionssætning
    slide.style.transition = 'none';
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    
    // Genaktiver overgang for en glat animation
    setTimeout(() => {
      slide.style.transition = `.7s`;
    });
  }
});

// Funktion til at skifte til næste slide
const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = `.7s`;
};

// Funktion til at skifte til forrige slide
const moveToPrevSlide = () => {
  slides = getSlides();
  if (index <= 0) return;
  index--;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = `.7s`;
};

// Stop automatisk billedeskift ved at rykke musen over containeren
slideContainer.addEventListener('mouseenter', () => {
  clearInterval(slideId);
});

// Genstart automatisk billedeskift ved at tage musen væk fra containeren
slideContainer.addEventListener('mouseleave', startSlide);

// Lyt efter klik på næste og forrige knapper
nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPrevSlide);

// Start automatisk billedeskift ved indlæsning af siden
startSlide();

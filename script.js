document.addEventListener('DOMContentLoaded', () => {
    const cardsData = [
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/bobbi.jpg",
        altText: "Photo of Bobbi enjoying a cookie from Samir",
        quote: "\"I had a cookie and it was 🔥🔥\" - Bobbi",
        isGlutenFree: false
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/justin.jpg",
        altText: "Photo of Justin enjoying a gluten free cookie from Samir",
        quote: "\"10/10. The majority of the cookies remained eaten and popular\" - Justin",
        isGlutenFree: true
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/brian.jpg",
        altText: "Photo of Brian enjoying a cookie from Samir",
        quote: "\"Perfectly gooey and salty. S-tier cookie. Period.\" - Brian",
        isGlutenFree: false
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/ryder.jpg",
        altText: "Photo of Ryder enjoying a cookie from Samir",
        quote: "\"These cookies were the best birthday gift I got this year!\" - Ryder",
        isGlutenFree: false
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/surbhi-rect.jpg",
        altText: "Photo of Surbhi enjoying a cookie from Samir",
        quote: "\"These cookies help you get those race PRs\" - Surbhi",
        isGlutenFree: false
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/jesse-birthday.jpg",
        altText: "Photo of Jesse enjoying a cookie from Samir",
        quote: "\"Samir makes great cookies, but why does he keep spelling my name like that?\" - Jeese",
        isGlutenFree: false
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/geoffrey.jpg",
        altText: "Photo of Geoffrey enjoying a cookie from Samir",
        quote: "\"Even after reading all the other testimonials I was not prepared for how good this cookie was.\" - Geoffrey",
        isGlutenFree: false
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/doug.jpg",
        altText: "Photo of Doug enjoying a gluten free cookie from Samir",
        quote: "*Speechless* - Doug",
        isGlutenFree: true
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/liz.jpg",
        altText: "Photo of Liz enjoying a cookie from Samir",
        quote: "\"A+++ would cookie from Samir again\" - Liz",
        isGlutenFree: false
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/nora.jpg",
        altText: "Photo of Nora enjoying a cookie from Samir",
        quote: "\"More chocolate than I ever thought possible!!!\" - Nora",
        isGlutenFree: false
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/ishani.jpg",
        altText: "Photo of Ishani enjoying a cookie from Samir",
        quote: "\"These cookies are heaven\" - Ishani",
        isGlutenFree: false
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/dan.jpg",
        altText: "Photo of Dan enjoying a gluten free cookie from Samir",
        quote: "\"mmm cookie so good yum yum yum\" - Dan",
        isGlutenFree: true
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/matt.jpg",
        altText: "Photo of Matt enjoying a cookie from Samir",
        quote: "\"Omnomnomnom\" - Matt",
        isGlutenFree: false
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/olivia.jpg",
        altText: "Photo of Olivia enjoying a cookie from Samir",
        quote: "*Speechless*- Olivia",
        isGlutenFree: false
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/jeremy.jpg",
        altText: "Photo of Jeremy enjoying a gluten free cookie from Samir",
        quote: "Amazing - Jeremy",
        isGlutenFree: true
      },
      {
        imageSrc: "https://storage.googleapis.com/cookieboi.com/photos/emilia-syringe-2.jpg",
        altText: "Photo of Émilia imagining a delicious cookie from Samir",
        quote: "\"I haven't had a cookie yet but they seem really good\" - Émilia",
        isGlutenFree: false
      }
    ];
  
    const cardsContainer = document.querySelector('.cards');
    
    cardsData.forEach(card => {
      cardsContainer.appendChild(createCard(card));
    });
  });
  
  function createCard({ imageSrc, altText, quote, isGlutenFree }) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
  
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
  
    const img = document.createElement('img');
    img.classList.add('photo');
    img.src = imageSrc;
    img.alt = altText;
  
    imageContainer.appendChild(img);
  
    if (isGlutenFree) {
      const glutenFreeText = document.createElement('div');
      glutenFreeText.classList.add('gluten-free-text');
      glutenFreeText.textContent = "Gluten Free";
      imageContainer.appendChild(glutenFreeText);
    }
  
    cardDiv.appendChild(imageContainer);
  
    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
  
    const paragraph = document.createElement('p');
    paragraph.textContent = quote;
  
    textDiv.appendChild(paragraph);
    cardDiv.appendChild(textDiv);
  
    return cardDiv;
  }
  
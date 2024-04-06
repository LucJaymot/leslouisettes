const Boxlayout = (() => {
    const wrapper = document.body,
      sections = [...document.querySelectorAll(".section")],
      closeButtons = [...document.querySelectorAll(".close-section")],
      expandedClass = "is-expanded",
      hasExpandedClass = "has-expanded-item";
  
    const logo = document.querySelector('.logo');  // Ajouté pour gérer le logo
    let originalContent = []; // Ajouté pour stocker le contenu original
  
    const initEvents = () => {
      sections.forEach((element, index) => {
        originalContent[index] = element.innerHTML; // Stocker le contenu original
        element.addEventListener("click", () => {
          openSection(element);
          logo.style.display = 'none';  // Ajouté pour cacher le logo lors du clic
          fetch(`page${index + 1}.html`) // Remplacer par l'URL réelle de vos pages
            .then(response => response.text())
            .then(html => {
              element.innerHTML = html;
              attachCloseEvent(element.querySelector(".close-section"), element); // Attach close event to the new close button
            })
            .catch(error => console.warn(error));
        });
      });
      closeButtons.forEach((element) => {
        attachCloseEvent(element, element.parentElement);
      });
    };
  
    const attachCloseEvent = (element, section) => {
      element.addEventListener("click", (event) => {
        event.stopPropagation();
        closeSection(section);
        logo.style.display = 'block';  // Ajouté pour montrer le logo lors de la fermeture
      });
    }
  
    const openSection = (element) => {
      if (!element.classList.contains(expandedClass)) {
        element.classList.add(expandedClass);
        wrapper.classList.add(hasExpandedClass);
      }
    };
  
    const closeSection = (element) => {
      if (element.classList.contains(expandedClass)) {
        element.classList.remove(expandedClass);
        wrapper.classList.remove(hasExpandedClass);
        const index = sections.indexOf(element); // Get index of the section
        element.innerHTML = originalContent[index]; // Restore original content
    
        // Ecouter l'evenement de fin de transition
        element.addEventListener('transitionend', function callback() {
          logo.style.display = 'block';  // Montrer le logo après la fermeture complète
          element.removeEventListener('transitionend', callback); // Enlever le listener une fois terminé
        });
      }
    };    
    return { init: initEvents };
  })();
  
  Boxlayout.init();


//const logo = document.getElementById('logo');
//const text = 'Les Louisettes';

let index = 0;

function writeText() {
  if (index < text.length) {
    logo.innerHTML += text.charAt(index);
    index += 1;

    // Attendez 100ms avant d'ajouter la prochaine lettre
    setTimeout(writeText, 100);
  }
}

// Commencer l'animation
writeText();

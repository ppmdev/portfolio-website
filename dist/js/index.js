const main = document.getElementById('main-content');

// Nav Menu DOM selection
const header = document.querySelector('header');
const menuBtn = document.querySelector('.menu-btn');
const menuTitle = document.querySelector('.menu-titles');
const menu = document.querySelector('.menu');
const navItems = document.querySelector('.nav-items');
const navItem = document.querySelectorAll('.nav-item');
const menuBtnLines = document.querySelectorAll('.btn-line');
const socialIcons = document.querySelector('.social-icons');
const githubIcon = document.querySelector('#github-icon');

// Full pages DOM selection
const home = document.querySelector('#home');
const about = document.querySelector('#about');
const projects = document.querySelector('#projects');
const courses = document.querySelector('#courses');
const contact = document.querySelector('#contact');

// Card DOM selectors
const moreBtn = document.querySelectorAll('.card-more');

// Action button selector
const actionButton = document.querySelector('.action-btn');

// Set initial navbar state

let showNav = false;

// Navbar animation Functions

const toggleNav = function() {

    if (!showNav) {
        navItem.forEach(function(item){
            item.classList.add('nav-open');
        });
        menuBtnLines.forEach(function(line){
            line.classList.add('btn-close'); // Menu button animation class
        });
        header.classList.add('nav-open');
        main.classList.add('nav-open');
        
        navItems.classList.add('nav-open');
        menuBtn.classList.add('btn-close');  // Menu button animation class
        socialIcons.classList.add('nav-open'); 
        showNav = true;

    } else {
        
        navItem.forEach(function(item){
            item.classList.remove('nav-open');
        });
        menuBtnLines.forEach(function(line){
            line.classList.remove('btn-close');
        });
        header.classList.remove('nav-open');
        main.classList.remove('nav-open');
        navItems.classList.remove('nav-open');
        socialIcons.classList.remove('nav-open');
        // Menu button class manipulation
        menuBtn.classList.remove('btn-close');
        showNav = false;
    }

}

const FocusOut = function(e) {

    if(e.target === header && showNav) {
        toggleNav();
    } 

}

// Page scrolling function - Smooth behaviour not supported in safari or on IOS. Instant scroll will instead be the fallback behaviour.

const smoothScroll = function(e, element) {
    
    // Smooth scroll functionality for opening of project cards, the element passed in is the card that was clicked.

    if(element){
        element.scrollIntoView({behaviour: "smooth"});
    } else {

        const name = e.target.getAttribute('name');

        switch(name){
        case 'home':
            home.scrollIntoView({behavior: "smooth" /* Default: 'auto' */, block:"start"/* Default */, inline:"nearest" /* Default */});
            break;
        case 'about':
            about.scrollIntoView({behavior: "smooth"});
            break;
        case 'projects':
            projects.scrollIntoView({behavior: "smooth"});
            break;
        case 'courses':
            courses.scrollIntoView({behavior: "smooth"});
            break;
        case 'contact':
            contact.scrollIntoView({behavior: "smooth"});
            break;
        }
    
        if(showNav){
            toggleNav();
        }

    }

    
}

// Card manipulation Function

const toggleCard = function(e) {


    // Fire the event if the button icon is clicked
    if(e.target.classList.contains('card-btn')){

        const selectedCard = e.target.parentElement.parentElement;
        const allCards = selectedCard.parentElement.children;

    // Before opening a card. Check if any of the other cards in the div are open.
    // If a card is open, close it and then open the selected card.

        if(!selectedCard.classList.contains('card-open')) {

            
            
            for(var i = 0; i < allCards.length; i++){
                if(allCards[i].classList.contains('card-open')){ 
                    const openCard = allCards[i];
                    const openCardIcon = openCard.children[2].firstElementChild;
                    const openCardText = openCard.children[1].lastElementChild;
                    openCardText.scrollTo(0, 0);
                    openCardIcon.classList.add('fa-caret-down');
                    openCardIcon.classList.remove('fa-times');
                    openCard.classList.remove('card-open');
                    break;
                }
            }
            
            selectedCard.classList.add('card-open');
            e.target.classList.add('fa-times');
            e.target.classList.remove('fa-caret-down');
            smoothScroll(e = null, selectedCard);
        
        } else {
        
            // Close the selected card
            selectedCard.classList.remove('card-open');
            
            // Scroll text div back to top
            selectedCard.children[1].lastElementChild.scrollTo(0, 0);

            // Scroll the card that was closed back into view;
            selectedCard.scrollIntoView({behavior: "instant", block:"center"});

            // Toggle button icon
            e.target.classList.add('fa-caret-down');
            e.target.classList.remove('fa-times');
        

        }
    }
}

////////// Event Listeners //////////

// Toggle Nav open/closed when menu button is clicked
menuBtn.addEventListener('click', toggleNav);

// Close Nav when cursor leaves the containing div.
header.addEventListener('mouseleave', FocusOut);

// Scroll to corresponding page when nav option is clicked
navItem.forEach(function(item){
    item.addEventListener('click', smoothScroll);
});

// Toggle card open/closed
moreBtn.forEach(function(button){
    button.addEventListener('click', toggleCard);
});

// Action Button

actionButton.addEventListener('click', smoothScroll);


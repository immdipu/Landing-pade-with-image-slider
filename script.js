const slide = document.querySelectorAll(".slides");
const btns = document.querySelectorAll(".btn");
const btnleft = document.querySelector(".leftarrow");
const btnright = document.querySelector(".rightarrow");
const dotContainer = document.querySelector(".dotcontainer");
const allSection = document.querySelectorAll('.section')

slide.forEach((item, i) => (item.style.transform = `translateX(${100 * i}%)`));

let currentSlide = 0;
maxSlide = slide.length;

const goToSlide = function (slides) {
    slide.forEach(
        (item, i) => (item.style.transform = `translateX(${100 * (i - slides)}%)`)
    );
};

const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    goToSlide(currentSlide);
    dotactivate(currentSlide);
};

const previousSlide = function () {
    if (currentSlide === 0) {
        currentSlide = maxSlide - 1;
    } else {
        currentSlide--;
    }
    goToSlide(currentSlide);
    dotactivate(currentSlide);
};

//BUTTON TO CHANGE THE SLIDE

btnright.addEventListener("click", nextSlide);

btnleft.addEventListener("click", previousSlide);

//REMOVE THE CLICKED ANIMATION OF ARROW AFTER TIMEOUT

function btneffect() {
    btns.forEach((btn) => btn.classList.remove("active"));
}

btns.forEach(function (target) {
    target.addEventListener("click", function () {
        timeoutfunc();
        target.classList.add("active");
    });
});

function timeoutfunc() {
    const timeout = setTimeout(btneffect, 200);
}

// DOT creating, dot activation

const dotCreator = function () {
    slide.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
            "beforeend",
            ` <div class="dot" data-slide="${i}"></div>`
        );
    });
};

dotCreator();

const dotactivate = function (slide) {
    dot.forEach((item) => item.classList.remove("dotactivate"));

    document
        .querySelector(`.dot[data-slide="${slide}"`)
        .classList.add("dotactivate");
};

const dot = document.querySelectorAll(".dot");
dot.forEach(function (m) {
    m.addEventListener("click", function () {
        const currentdotvalue = m.dataset.slide;
        goToSlide(currentdotvalue);
        dotactivate(currentdotvalue);
    });
});

dotactivate(0);




/* SECTION REVEALING*/


const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('hidden');
    observer.unobserve(entry.target);
}



const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.07,

});


allSection.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('hidden');

});
(() => {
    "use strict";

    let isLocked = true;

    const unlockBody = (delay = 500) => {
        const body = document.querySelector("body");
        if (isLocked) {
            const elements = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
                elements.forEach(el => {
                    el.style.paddingRight = "0px";
                });
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }, delay);
            isLocked = false;
            setTimeout(() => {
                isLocked = true;
            }, delay);
        }
    };

    const lockBody = (delay = 500) => {
        const body = document.querySelector("body");
        if (isLocked) {
            const elements = document.querySelectorAll("[data-lp]");
            const paddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            elements.forEach(el => {
                el.style.paddingRight = paddingValue;
            });
            body.style.paddingRight = paddingValue;
            document.documentElement.classList.add("lock");
            isLocked = false;
            setTimeout(() => {
                isLocked = true;
            }, delay);
        }
    };

    // Відкриття/закриття бургер-меню з перевіркою на блокування скролу
    document.querySelector(".icon-menu")?.addEventListener("click", () => {
        if (document.documentElement.classList.contains("lock")) {
            unlockBody();
        } else {
            lockBody();
        }
        document.documentElement.classList.toggle("menu-open");
    });

    // Перехід по посиланням в меню та розблокування скролу після переходу
    const menuLinks = document.querySelectorAll(".menu__link");
    menuLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
            // Закриття меню та розблокування скролу після переходу
            document.documentElement.classList.remove("menu-open");
            unlockBody();
        });
    });

    // Підтримка webp
    function testWebP(callback) {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
            callback(webP.height === 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP((supportsWebP) => {
        document.documentElement.classList.add(supportsWebP ? "webp" : "no-webp");
    });

    // Динамічний адаптив (переміщення блоків)
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }

        init() {
            this.objects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [...document.querySelectorAll("[data-da]")];

            this.nodes.forEach(node => {
                const data = node.dataset.da.trim().split(",");
                const obj = {
                    element: node,
                    parent: node.parentNode,
                    destination: document.querySelector(data[0].trim()),
                    breakpoint: data[1] ? data[1].trim() : "767",
                    place: data[2] ? data[2].trim() : "last",
                    index: this.indexInParent(node.parentNode, node),
                };
                this.objects.push(obj);
            });

            this.arraySort(this.objects);

            this.mediaQueries = this.objects
                .map(({ breakpoint }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
                .filter((v, i, self) => self.indexOf(v) === i);

            this.mediaQueries.forEach(media => {
                const [query, breakpoint] = media.split(",");
                const matchMedia = window.matchMedia(query);
                const objects = this.objects.filter(({ breakpoint: bp }) => bp === breakpoint);

                matchMedia.addEventListener("change", () => {
                    this.mediaHandler(matchMedia, objects);
                });

                this.mediaHandler(matchMedia, objects);
            });
        }

        mediaHandler(matchMedia, objects) {
            if (matchMedia.matches) {
                objects.forEach(obj => {
                    this.moveTo(obj.place, obj.element, obj.destination);
                });
            } else {
                objects.forEach(({ parent, element, index }) => {
                    if (element.classList.contains(this.daClassname)) {
                        this.moveBack(parent, element, index);
                    }
                });
            }
        }

        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.append(element);
            } else if (place === "first") {
                destination.prepend(element);
            } else {
                destination.children[place].before(element);
            }
        }

        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index]) {
                parent.children[index].before(element);
            } else {
                parent.append(element);
            }
        }

        indexInParent(parent, element) {
            return [...parent.children].indexOf(element);
        }

        arraySort(arr) {
            if (this.type === "min") {
                arr.sort((a, b) => (a.breakpoint === b.breakpoint ? (a.place === b.place ? 0 : a.place === "first" || b.place === "last" ? -1 : 1) : a.breakpoint - b.breakpoint));
            } else {
                arr.sort((a, b) => (a.breakpoint === b.breakpoint ? (a.place === b.place ? 0 : a.place === "first" || b.place === "last" ? 1 : -1) : b.breakpoint - a.breakpoint));
            }
        }
    }

    const dynamicAdapt = new DynamicAdapt("max");
    dynamicAdapt.init();

    // Відстеження скролу для запуску анімацій
    class ScrollWatcher {
        constructor() {
            this.observer = null;
            this.init();
        }

        init() {
            this.observer = new IntersectionObserver(this.callback.bind(this), {
                threshold: [0.1, 0.5, 0.9]  // Додаткові пороги для більш плавних анімацій
            });
            this.observeElements();
        }

        observeElements() {
            const elements = document.querySelectorAll("[data-watch]");
            elements.forEach(el => {
                this.observer.observe(el);
            });
        }

        callback(entries, observer) {
            entries.forEach(entry => {
                const element = entry.target;
                if (entry.isIntersecting) {
                    element.classList.add("_watcher-view");
                    // Вимикаємо спостереження після першого спрацювання
                    observer.unobserve(element);
                }
            });
        }
    }

    new ScrollWatcher();

    // Подія на скрол для кастомних анімацій
    let customScrollEvent = false;
    setTimeout(() => {
        if (customScrollEvent) {
            const scrollEvent = new Event("windowScroll");
            window.addEventListener("scroll", () => {
                document.dispatchEvent(scrollEvent);
            });
        }
    }, 0);
})();

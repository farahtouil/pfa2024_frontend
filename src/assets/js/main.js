
(function() {
//===== Preloader

	window.onload = function () {
		window.setTimeout(fadeout, 500);
	}

	/*function fadeout() {
		document.querySelector('.preloader').style.opacity = '0';
		document.querySelector('.preloader').style.display = 'none';
	}*/
    function fadeout() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.display = 'none';
        }
    }


    /*=====================================
    Sticky
    ======================================= */
    /*window.onscroll = function () {
        const header_navbar = document.querySelector(".navbar-area");
        const sticky = header_navbar.offsetTop;
        const logo = document.querySelector('.navbar-brand img');


        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
            logo.src = 'assets/images/logo/logo-2.svg';
        } else {
            header_navbar.classList.remove("sticky");
            logo.src = 'assets/images/logo/logo.svg';
        }

        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    };*/
    window.onscroll = function () {
        const header_navbar = document.querySelector(".navbar-area");
        if (header_navbar) {
            const sticky = header_navbar.offsetTop;
            const logo = document.querySelector('.navbar-brand img');

            if (window.pageYOffset > sticky) {
                header_navbar.classList.add("sticky");
                if (logo) logo.src = 'assets/images/logo/logo-2.svg';
            } else {
                header_navbar.classList.remove("sticky");
                if (logo) logo.src = 'assets/images/logo/logo.svg';
            }
        }

        const backToTo = document.querySelector(".scroll-top");
        if (backToTo) {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                backToTo.style.display = "flex";
            } else {
                backToTo.style.display = "none";
            }
        }
    };

    // Get the navbar


    // for menu scroll 
    /*var pageLink = document.querySelectorAll('.page-scroll');
    
    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(elem.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                offsetTop: 1 - 60,
            });
        });
    });*/

    const pageLinks = document.querySelectorAll('.page-scroll');
    pageLinks.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(elem.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    offsetTop: 1 - 60,
                });
            }
        });
    });


    // section menu active
	/*function onScroll(event) {
		var sections = document.querySelectorAll('.page-scroll');
		var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		for (var i = 0; i < sections.length; i++) {
			var currLink = sections[i];
			var val = currLink.getAttribute('href');
			var refElement = document.querySelector(val);
			var scrollTopMinus = scrollPos + 73;
			if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
				document.querySelector('.page-scroll').classList.remove('active');
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};*/

    function onScroll(event) {
        const sections = document.querySelectorAll('.page-scroll');
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        sections.forEach(currLink => {
            const val = currLink.getAttribute('href');
            const refElement = document.querySelector(val);
            const scrollTopMinus = scrollPos + 73;

            if (refElement && refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
                document.querySelector('.page-scroll.active')?.classList.remove('active');
                currLink.classList.add('active');
            } else {
                currLink.classList.remove('active');
            }
        });
    };

	window.document.addEventListener('scroll', onScroll);


    //===== close navbar-collapse when a  clicked
    let navbarToggler = document.querySelector(".navbar-toggler");    
    var navbarCollapse = document.querySelector(".navbar-collapse");

   /* document.querySelectorAll(".page-scroll").forEach(e =>
        e.addEventListener("click", () => {
            navbarToggler.classList.remove("active");
            navbarCollapse.classList.remove('show')
        })
    );
    navbarToggler.addEventListener('click', function() {
        navbarToggler.classList.toggle("active");
    }) */

        if (navbarToggler && navbarCollapse) {
            document.querySelectorAll(".page-scroll").forEach(e =>
                e.addEventListener("click", () => {
                    navbarToggler.classList.remove("active");
                    navbarCollapse.classList.remove('show');
                })
            );
            navbarToggler.addEventListener('click', function () {
                navbarToggler.classList.toggle("active");
            });
        }


	// WOW active
    //new WOW().init();

    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }


    // ====== scroll top js
    function scrollTo(element, to = 0, duration= 1000) {

        const start = element.scrollTop;
        const change = to - start;
        const increment = 20;
        let currentTime = 0;

        const animateScroll = (() => {

            currentTime += increment;

            const val = Math.easeInOutQuad(currentTime, start, change, duration);

            element.scrollTop = val;

            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        });

        animateScroll();
    };

    Math.easeInOutQuad = function (t, b, c, d) {

        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

   /* document.querySelector('.scroll-top').onclick = function () {
        scrollTo(document.documentElement); 
    }*/

        const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.onclick = function () {
            scrollTo(document.documentElement);
        };
    }

})();
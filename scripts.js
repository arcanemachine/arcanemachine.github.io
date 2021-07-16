/* eslint no-unused-vars: 0 */

function delay(t) {
	return new Promise(function (resolve) {
		setTimeout(resolve, t);
	});
}

function mainComponent() {
  return {
    categoriesShow: false,
    categoryCurrent: undefined,
    isDarkMode: undefined,
    transitionDuration: 1000,
    taglineText: 'Bringing the web to life.',
    taglineCursorShow: false,
    taglineCursorBlinkDuration: 400,

    init() {
      // localStorage.clear(); // always play intro animation

      // apply the proper theme
      if (!localStorage.getItem('introSeen')) {
        this.isDarkMode = true;
      } else {
        this.isDarkMode = localStorage.getItem('isDarkMode') ? true : false;
      }

      this.$nextTick(() => {
        let htmlEl = document.documentElement;
        htmlEl.style.transitionProperty = 'background-color, color';
        htmlEl.style.transitionDuration = '300ms';
      });
      this.themeApply();

      // show intro animation to first-time visitors
      if (!localStorage.getItem('introSeen')) {
        this.introAnimationPlay();
      } else {
        this.categoriesShow = true;
        setTimeout(() => {
          this.categorySelect('about');
        }, 750);
      }

    },

    categorySelect(categoryName) {
      this.categoriesShow = true;

      // if selecting same category, do nothing
      if (categoryName === this.categoryCurrent) {
        return false;
      }

      this.categoryCurrent = undefined;
      setTimeout(() => {
        this.categoryCurrent = categoryName;
      }, 500);
    },

    addyGenerate() {
      let username = 'arc' + 'ane' + 'mac' + 'hine';
      let domain = 'tu' + 'ta' + 'no' + 'ta' + '.' + 'c' + 'o' + 'm';
      return 'ma' + 'il' + `to:${username}@${domain}`;
    },

    introAnimationPlay() {
      let pageTitle = this.$refs.pageTitle;
      let tagline = this.$refs.tagline;
      let darkModeIcon = this.$refs.darkModeIcon;
      let categories = this.$refs.categories;

      // set initial styles
        // title and subheading
      let pageTitleStyle = getComputedStyle(pageTitle);
      let pageTitleMarginTop = pageTitleStyle['marginTop'];
      let pageTitleHeight = pageTitleStyle['height'];
      pageTitle.style.marginTop =
        `calc(50vh - ${pageTitleMarginTop} - ${pageTitleHeight} - 5rem)`;
      pageTitle.classList.add('opacity-0');

        // tagline
      tagline.classList.add('opacity-0');

        // footer
      document.querySelectorAll('.footer-item:not(#icon-dark-mode)')
        .forEach((item) => { // hide the footer
          item.style.opacity = '0';  
          item.style.bottom = '-5rem';
        })

        // action icon - email
      this.$refs.actionIconEmail.classList.remove('wiggle');

        // action icon - dark mode
      let darkModeIconStyle = getComputedStyle(darkModeIcon);
      let darkModeIconHeight = darkModeIconStyle['height'];
      let darkModeIconWidth = darkModeIconStyle['width'];
      darkModeIcon.classList.add('opacity-0');
      darkModeIcon.style.right = `calc(50vw - (${darkModeIconHeight} / 2))`;
      darkModeIcon.style.bottom =
        `calc(50vh - (${darkModeIconHeight} / 2) - 5rem)`;

      // add transition properties after setting default styles
      this.$nextTick(() => {
        pageTitle.style.transitionProperty = 'color, margin-top, opacity';
        pageTitle.style.transitionDuration = `${this.transitionDuration}ms`;
        tagline.style.transitionProperty = 'color';
        tagline.style.transitionDuration = `${this.transitionDuration}ms`;
        darkModeIcon.style.transitionProperty = 'right, bottom, opacity';
        darkModeIcon.style.transitionDuration = `${this.transitionDuration}ms`;
      });

      // perform animations
      Promise.resolve()
        // delay before fade-in
        .then(() => delay(750))
        // show title
        .then(() => { pageTitle.classList.remove('opacity-0'); })
        .then(() => delay(this.transitionDuration + 250))
        // fade in tagline
        .then(() => { tagline.classList.remove('opacity-0'); }) 
        // tagline animation
        /* 
          .then(() => { this.writingEffectAdd("", "Bringing the web to you..."); })
          .then(() => delay(3500))
          .then(() => { this.writingEffectDelete("Bringing the web to you...", "Bringing the web"); })
          .then(() => delay(1250))
          .then(() => { this.writingEffectAdd("Bringing the web", "Bringing the web to the future..."); })
          .then(() => delay(3000))
          .then(() => { this.writingEffectDelete("Bringing the web to the future...", "Bringing the web"); })
          .then(() => delay(1500))
          .then(() => { this.writingEffectAdd("Bringing the web", "Bringing the web to life."); })
        */
        .then(() => { this.writingEffectAdd("", "Bringing the web to life."); })
        .then(() => delay(3500))
        .then(() => { darkModeIcon.classList.remove('opacity-0'); })
        .then(() => delay(1500))
        .then(() => { this.themeToggle(); }) // toggle dark theme
        .then(() => { this.taglineCursorHide(); }) // disable tagline cursor
        .then(() => delay(1500))
        .then(() => {

          // show the footer
          document.querySelectorAll('.footer-item:not(#icon-dark-mode)')
            .forEach((item) => {
              item.style.opacity = '1';
              item.style.bottom = '';
            })

          // move the dark mode toggle icon into the footer
          darkModeIcon.style.right = '';
          darkModeIcon.style.bottom = ''; })
        .then(() => { pageTitle.style.marginTop = ""; })
        .then(() => delay(1000))
        .then(() => { this.categorySelect('about'); })
        .then(() => { this.$refs.actionIconEmail.classList.add('wiggle'); })
        .then(() => delay(1000))
      
      localStorage.setItem('introSeen', '1');
    },

    taglineCursorBlinkEnable() {
      this.taglineCursorBlink = setInterval(() => {
        this.taglineCursorShow = true;
        this.$refs.taglineCursor.style.opacity = '1';

        setTimeout(() => {
          // disable the cursor, creating a blink effect when repeated
          this.taglineCursorShow = false
        }, this.taglineCursorBlinkDuration);

      }, this.taglineCursorBlinkDuration * 2);
    },
    taglineCursorBlinkDisable() {
      clearInterval(this.taglineCursorBlink);
      this.taglineCursorShow = true;
    },
    taglineCursorHide() {
      this.taglineCursorBlinkDisable();
      this.taglineCursorShow = false;
    },

    themeApply() {
      let htmlEl = document.querySelector('html');
      if (this.isDarkMode) {
        htmlEl.classList.add('bg-black');
        document.body.classList.add('uk-light');
        document.querySelector('#page-footer').classList.add('is-dark-mode');
      } else {
        htmlEl.classList.remove('bg-black');
        document.body.classList.remove('uk-light');
        document.querySelector('#page-footer').classList.remove('is-dark-mode');
      }
    },
    themeToggle() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('isDarkMode', this.isDarkMode ? '1' : '');
      this.themeApply();
    },

    writingEffectAdd(startText, endText, currentPosition=undefined) {
      this.taglineCursorBlinkDisable();
          
      if (!currentPosition) {
        currentPosition = startText.length;
      }
      this.taglineText = endText.substring(0, currentPosition);
      Promise.resolve()
        .then(() => delay(70))
        .then(() => {
          if (this.taglineText !== endText) {
            // console.log(this.taglineText);
            this.writingEffectAdd(startText, endText, currentPosition + 1);
          } else {
            this.taglineCursorBlinkEnable();
          }
        })
    },

    writingEffectDelete(startText, endText) {
      this.taglineCursorBlinkDisable();

      this.taglineText = startText;
      Promise.resolve()
        .then(() => delay(60))
        .then(() => {
          if (this.taglineText !== endText) {
            // console.log(this.taglineText);
            startText = startText.slice(0, -1);
            this.writingEffectDelete(startText, endText);
          } else {
            this.taglineCursorBlinkEnable();
          }
        })
    },

  };
}

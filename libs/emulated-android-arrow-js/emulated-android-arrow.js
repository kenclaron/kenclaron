/****************************\
| Emulated Android Arrow     |
| version: 1.0               |
|                            |
| author: KenClaron          |
| website: kenclaron.ru      |
| mail: kenclaron@gmail.com  |
\****************************/

console.info("[emulated-android-arrow.js] Version - 1.0");

class EmulatedAndroidArrow
{
  /**
   * Create emulated android arrow (from dockbar on Google Pixel)
   * @param {HTMLElement} parent Parent element of html document
   * @param {Boolean} crossSupport 180 degree rotation on mobile devices when true
   * @param {Number} direction Starting direction (0: none, 1: top, -1: bottom)
   */
  constructor(parent, crossSupport, mobile = false, direction = 0) 
  {
    this.recentlyScrollY = window.scrollY ? window.scrollY : 0;
    this.crossSupport = crossSupport;
    this.mobile = mobile;
    this.direction = direction;
    this.pathLeft = undefined;
    this.pathRight = undefined;

    if(this.crossSupport) {
      this.direction = -this.direction;
    }

    this.element = this.Create(parent, this.direction, this);

    return this.element;
  }

  /**
   * Create emulated android arrow (from dockbar on Google Pixel)
   * @param {HTMLElement} parent Parent element of html document
   * @param {Number} direction Starting direction (0: none, 1: top, -1: bottom)
   * @param {EmulatedAndroidArrow} that 
   */
  Create(parent, direction, that)
  {
    if(!this.crossSupport) direction *= -1;
    
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "emulated-android-arrow";
    svg.setAttribute("width", 32);
    svg.setAttribute("height", 32);
    svg.setAttribute("viewBox", "0 0 32 32");
    svg.setAttribute("baseProfile", "full");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("stroke", "black");
    g.setAttribute("fill", "white");
    g.setAttribute("stroke-width", 1);
    
    let pathLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathLeft.setAttribute("name", "slider-rect-left");
    if(direction == 1) {
      pathLeft.setAttribute("d", "M13.1,14 28,14 S30,14 30,16 S28,18 28,18 L17.025,18");
      pathLeft.setAttribute("transform", "rotate(45 18 16)");
    }
    else if(direction == -1) {
      pathLeft.setAttribute("d", "M18.9,14 28,14 S30,14 30,16 S28,18 28,18 L14.975,18");
      pathLeft.setAttribute("transform", "rotate(-45 18 16)");
    }
    else if(direction == 0) {
      pathLeft.setAttribute("d", "M16,14 28,14 S30,14 30,16 S28,18 28,18 L16,18");
      pathLeft.setAttribute("transform", "rotate(0 18 16)");
    }
    pathLeft.style.transition = "0.1s ease-in-out";

    let pathRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathRight.setAttribute("name", "slider-rect-right");
    if(direction == 1) {
      pathRight.setAttribute("d", "M18.9,14 4,14 S2,14 2,16 S4,18 4,18 L14.975,18");
      pathRight.setAttribute("transform", "rotate(-45 14 16)");
    }
    else if(direction == -1) {
      pathRight.setAttribute("d", "M13.1,14 4,14 S2,14 2,16 S4,18 4,18 L17.025,18");
      pathRight.setAttribute("transform", "rotate(45 14 16)");
    }
    else if(direction == 0) {
      pathRight.setAttribute("d", "M16,14 4,14 S2,14 2,16 S4,18 4,18 L16,18");
      pathRight.setAttribute("transform", "rotate(0 14 16)");
    }
    pathRight.style.transition = "0.1s ease-in-out";

    g.append(pathLeft, pathRight);
    svg.append(g);

    parent.append(svg);

    this.pathLeft = pathLeft;
    this.pathRight = pathRight;

    if(!this.mobile || (this.mobile && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
      window.addEventListener("scroll", function(e) { 
        that.Update(e)
      });
    }

    that.Update(null, direction)

    return svg;
  }

  /**
   * Main event-function 
   * @param {Event} event 
   * @param {Number} direction Starting direction (0: none, 1: top, -1: bottom)
   */
  Update(event, direction)
  {

    if(event && event.timeStamp < 100) return;

    let difference = (window.scrollY - ((this.recentlyScrollY == 0 || this.recentlyScrollY === undefined) ? 0 : this.recentlyScrollY)) * 2;
    
    if(difference == 0 && window.scrollY == 0 && this.recentlyScrollY == 0 && (direction || direction == 0)) {
      difference = 45 * direction;
    }

    if(difference > 45) difference = 45;
    else if(difference < -45) difference = -45;

    if(this.crossSupport) {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if(direction == 1 || document.documentElement.scrollHeight - document.documentElement.clientHeight <= window.pageYOffset + 1) {
          difference = -45;
        }
        else if(direction == -1 || window.scrollY == 0) {
          difference = 45;
        }
        else if(direction == 0) {
          difference = 0;
        }
      }
      else {
        if(direction == 1 || document.documentElement.scrollHeight - document.documentElement.clientHeight <= window.pageYOffset + 1) {
          difference = 45;
        }
        else if(direction == -1 || window.scrollY == 0) {
          difference = -45;
        }
        else if(direction == 0) {
          difference = 0;
        }
      }
    }
    else {
      if(direction == 1 || document.documentElement.scrollHeight - document.documentElement.clientHeight <= window.pageYOffset + 1) {
        difference = 45;
      }
      else if(direction == -1 || window.scrollY == 0) {
        difference = -45;
      }
      else if(direction == 0) {
        difference = 0;
      }
    }

    let paths = {
      left: {
        start: 16 + 2.9 * difference / 45,
        end: 16 - 1.025 * difference / 45
      },
      right: {
        start: 16 - 2.9 * difference / 45,
        end: 16 + 1.025 * difference / 45
      }
    }

    if(difference > 0) {
      this.pathRight.setAttribute("d", `M${paths.left.start},14 4,14 S2,14 2,16 S4,18 4,18 L${paths.left.end},18`);
      this.pathLeft.setAttribute("d", `M${paths.right.start},14 28,14 S30,14 30,16 S28,18 28,18 L${paths.right.end},18`);
    }
    else if(difference < 0) {
      this.pathRight.setAttribute("d", `M${paths.right.end},14 4,14 S2,14 2,16 S4,18 4,18 L${paths.right.start},18`);
      this.pathLeft.setAttribute("d", `M${paths.left.end},14 28,14 S30,14 30,16 S28,18 28,18 L${paths.left.start},18`);
    }
    else {
      this.pathRight.setAttribute("d", `M16,14 4,14 S2,14 2,16 S4,18 4,18 L16,18`);
      this.pathLeft.setAttribute("d", `M16,14 28,14 S30,14 30,16 S28,18 28,18 L16,18`);
    }

    this.pathRight.setAttribute("transform", "rotate(" + -difference + " 14 16)");
    this.pathLeft.setAttribute("transform", "rotate(" + difference + " 18 16)");


    this.recentlyScrollY = window.scrollY;

    return;
  }
}
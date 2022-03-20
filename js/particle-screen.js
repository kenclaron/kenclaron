particlesJS("parallax", {
  "particles": {
    "number": {
      "value": 60,
      "density": {
        "enable": true,
        "value_area": 1000
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": { 
      "value": 0.1, 
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 4,
      "random": true,
      "anim": {
        "enable": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 300,
      "color": "#ffffff",
      "opacity": 0.0,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse" 
      },
      "resize": true
    },
    "modes": {
      "bubble": {
        "opacity": 1,
        "distance": 200,
        "size": 10,
      }
    }
  },
  "retina_detect": true
});
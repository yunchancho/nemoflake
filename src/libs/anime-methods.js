import anime from 'animejs';

// define animations which can be handle by animejs

export function enterSample1(flake, metadata = {}, finishCallback) {
  anime({
    targets: flake,
    translateX: function(el, i) {
      return anime.random(-500, 500);
    },
    translateY: function(el, i) {
      return anime.random(-500, 500);
    },
    scale: function(el, i, l) {
      return anime.random(0.5, 2.0);
    },
    duration: function() { return anime.random(1200, 1800); },
    delay: function() { return 500 + anime.random(0, 1000); },
    elasticity: function(target, index, totalTargets) {
      // Elasticity multiplied by every div index, in descending order
      return 100 + ((totalTargets - index) * 150);
    },
    direction: 'alternate', 
    loop: metadata.loop | 1,
    complete: finishCallback
  });
}

export function enterSample2(flake, metadata = {}, finishCallback) {
  let timeline = anime.timeline({ 
    loop: true,
  })

  for (let item of flake) {
    timeline.add({
      targets: item,
      translateY: [
        { value: -100, elasticity: 250 },
        { value: 0 }
      ],
      scaleX: [
        { value: 0.5, duration: 300, easing: 'easeOutExpo' },
        { value: 1, duration: 500, easing: 'easeOutExpo' }
      ],
      scaleY: [
        { value: 0.5, duration: 300, easing: 'easeOutExpo' },
        { value: 1, duration: 500, easing: 'easeOutExpo' }
      ],
      direction: 'alternate',
      duration: 3000,
      offest: '-=1000'
    });
  }
}

export function enterSample3(flake, metadata = {}, finishCallback) {
  const timeline = anime.timeline();
  timeline.add({
    targets: flake,
    opacity: [ 0, 1],
    duration: 5000,
    delay: function (el, i, l) {
      return i * 2000
    },
    direction: 'alternate', 
    loop: true
  });
}

export function leaveSample1(flake, metadata = {}, finishCallback) {
  anime.timeline().add({
    targets: flake,
    duration: 700,
    opacity: [1, 0],
    translateY: -30,
    delay: function (el, i, l) {
      return i * 100
    }
  })
  .add({
    targets: flake,
    translateX: 1000,
    opacity: [1, 0],
    duration: 1000,
    complete: finishCallback,
    offset: '-=200'
  });
}

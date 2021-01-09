import './sass/main.scss'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import $ from 'jquery'

gsap.registerPlugin(ScrollTrigger); 

const fadeInElements = gsap.utils.toArray('.fade-in')
fadeInElements.forEach(element =>
  gsap.from(element, {
  scrollTrigger: {
      trigger: element,
      start: 'top center',
  },
  y: 50,
  opacity: 0.0,
  duration: 1.5,
}))

$('.download-btn').on('click', function() {
  console.log('Click')
  $('html,body').animate({
      scrollTop: $('.download').offset().top
    },
    'fast',
  )
})
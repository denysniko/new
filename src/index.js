import './index.html'
import './sass/style.scss'
import './assets/sprites/arrow-left-solid.svg'
import './assets/sprites/arrow-right-solid.svg'

document.addEventListener('DOMContentLoaded', () => {
	const getSlides = document.querySelectorAll('.slider__slide')
	const prevSlide = document.querySelector('.slider__prev')
	const nextSlide = document.querySelector('.slider__next')
	const currentSlide = document.querySelector('#current')
	const totalSlides = document.querySelector('#total')

	let currentSlideIndex = 0

	const addZero = num => (num < 10 ? `0${num}` : num)

	const hideSlides = () => {
		getSlides.forEach(slide => {
			slide.classList.add('hide')
			slide.classList.remove('show', 'fade')
		})
	}

	const showSlide = (i = 0) => {
		hideSlides()

		getSlides[i].classList.add('show', 'fade')
		getSlides[i].classList.remove('hide')

		currentSlide.textContent = addZero(i + 1)
		totalSlides.textContent = addZero(getSlides.length)
	}

	const togglingSlider = num => {
		currentSlideIndex =
			(currentSlideIndex + num + getSlides.length) % getSlides.length

		showSlide(currentSlideIndex)
	}

	showSlide(currentSlideIndex)
	prevSlide.addEventListener('click', () => togglingSlider(-1))
	nextSlide.addEventListener('click', () => togglingSlider(1))
})

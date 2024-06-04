function myFunction() {
	document.getElementById('myDropdown').classList.toggle('show');
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
	if (!e.target.matches('.dropbtn')) {
		let myDropdown = document.getElementById('myDropdown');
		if (myDropdown.classList.contains('show')) {
			myDropdown.classList.remove('show');
		}
	}
};

const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryItems = [...document.querySelectorAll('.gallery-item')];
const galleryNavDots = [...document.querySelectorAll('.gallery-nav-dot')];
const dropdownLinks = document.querySelectorAll('.dropdown-content a');

let autoSlideTimeout;

const createCarousel = () => {
	let carouselArray = [...galleryItems];
	const controls = ['previous', 'next'];

	const updateGallery = () => {
		carouselArray.forEach((el, index) => {
			el.classList.remove(
				'gallery-item-1',
				'gallery-item-2',
				'gallery-item-3',
				'gallery-item-4',
				'gallery-item-5'
			);
			el.classList.add(`gallery-item-${index + 1}`);
		});
		updateDots();
	};

	const updateDots = () => {
		const activeIndex = parseInt(carouselArray[2].dataset.index) - 1;
		galleryNavDots.forEach((dot, index) => {
			dot.classList.toggle(
				'gallery-nav-dot-selected',
				index === activeIndex
			);
		});
	};

	const setCurrentState = (direction) => {
		if (direction === 'previous') {
			carouselArray.unshift(carouselArray.pop());
		} else if (direction === 'next') {
			carouselArray.push(carouselArray.shift());
		}
		updateGallery();
		restartAutoSlide();
	};

	const setCurrentSlide = (index) => {
		carouselArray = [...galleryItems];
		const offset = index - 3;
		for (let i = 0; i < Math.abs(offset); i++) {
			if (offset > 0) {
				carouselArray.push(carouselArray.shift());
			} else {
				carouselArray.unshift(carouselArray.pop());
			}
		}
		updateGallery();
		restartAutoSlide();
	};

	const addControls = () => {
		controls.forEach((control) => {
			const button = document.createElement('button');
			button.className = `gallery-controls-${control}`;
			button.innerText = control;
			galleryControlsContainer.appendChild(button);
		});
	};

	const useControls = () => {
		galleryControlsContainer.addEventListener('click', (e) => {
			const { target } = e;
			if (target.classList.contains('gallery-controls-previous')) {
				setCurrentState('previous');
			} else if (target.classList.contains('gallery-controls-next')) {
				setCurrentState('next');
			}
		});
	};

	const useDots = () => {
		galleryNavDots.forEach((dot) => {
			dot.addEventListener('click', (e) => {
				const index = parseInt(e.target.dataset.index);
				setCurrentSlide(index);
			});
		});
	};

	const useDropdownLinks = () => {
		dropdownLinks.forEach((link) => {
			link.addEventListener('click', (e) => {
				const index = parseInt(e.target.dataset.index);
				setCurrentSlide(index);
			});
		});
	};

	const startAutoSlide = () => {
		autoSlideTimeout = setInterval(() => {
			setCurrentState('next');
		}, 5000);
	};

	const restartAutoSlide = () => {
		clearInterval(autoSlideTimeout);
		startAutoSlide();
	};

	addControls();
	useControls();
	useDots();
	useDropdownLinks();
	startAutoSlide();
	updateGallery();
};

createCarousel();

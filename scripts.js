const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryItems = [...document.querySelectorAll('.gallery-item')];

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
	};

	const setCurrentState = (direction) => {
		if (direction === 'previous') {
			carouselArray.unshift(carouselArray.pop());
		} else {
			carouselArray.push(carouselArray.shift());
		}
		updateGallery();
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

	addControls();
	useControls();
};

createCarousel();

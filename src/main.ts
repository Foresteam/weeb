import './styles/reset.css';
import './styles/fonts.css';
import './styles/main.scss';
import './styles/index.scss';
import { Logo } from './components/logo/Logo';
import { TitledSection } from './components/sections/TitledSection';
import { type TComponent } from '@foresteam/proactive';
import { Renderer } from '@foresteam/proactive';
import { Bicycle } from './components/bicycle/Bicycle';
import { DescribedImage } from './components/described-image/DescribedImage';
import { Carousel } from './components/carousel/Carousel';
import { CarouselImage } from './components/carousel/image/CarouselImage';
import { IconedButton } from './components/iconed-button/IconedButton';
import { NavMenu } from './components/nav-menu/NavMenu';
import { Getter } from '@foresteam/proactive';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app)
	throw new Error();

const mount = () => app.innerHTML = Renderer(/*html*/
	`
		<section class="header">
			<div class="nav">
				<logo mobile="${isMobile.value}"></logo>
				<nav-menu mobile="${isMobile.value}"></nav-menu>
			</div>
			<div class="content">
				${!isMobile.value ? /*html*/`
					<div class="title">
						Explore the beauty of
						the World
					</div>
					<div class="subtitle">
						Receive personalized recommendations for countries, hotels, activities and more
					</div>
				` : ''}
				<div class="like-form">
					What would you like to do?
					<input type="button" value="Start Planning">
				</div>
			</div>
		</section>
		<titled-section name="3 STEPS TO THE PERFECT TRIP">
			<div class="bicycle-wrapper">
				<bicycle img="/icons/bicycle.svg" text="Tell us what you want to do"></bicycle>
				<bicycle img="/icons/calendar.svg" text="Share us preferable dates"></bicycle>
				<bicycle img="/icons/plane.svg" text="We will give you recommendations"></bicycle>
			</div>
		</titled-section>
		<titled-section name="POPULAR DESTINATIONS">
			<carousel mobile="${isMobile.value}">
				<carousel-image src="/img/rocks_sea_${isMobile.value ? 'm' : 'd'}.png.webp" title="SPAIN"></carousel-image>
				<carousel-image src="/img/gate_${isMobile.value ? 'm' : 'd'}.png.webp" title="JAPAN"></carousel-image>
				<carousel-image src="/img/bridge_${isMobile.value ? 'm' : 'd'}.png.webp" title="USA"></carousel-image>
			</carousel>
			<div class="flex-row" style="margin-top: ${isMobile.value ? 10 : 40}px">
				<i-button icon="/icons/arrow-right.svg">Find More</i-button>
			</div>
		</titled-section>
		<titled-section name="TRAVEL STORIES" class="travel-stories">
			<div class="stories-footer">
				<section class="stories">
					${images().map(i => i.render()).join('\n')}
					<div class="flex-row see-more-stories">
						<i-button icon="/icons/arrow-right.svg">See More</i-button>
					</div>
				</section>
				<section class="footer">
					<p>
						${!isMobile.value ? 'All Rights Reserved ?? Travel Portal' : ''}
					</p>
					<div class="social">
						<img src="/icons/insta.svg">
						<img src="/icons/youtube.svg">
						<img src="/icons/birder.svg">
					</div>
				</section>
			</div>
		</titled-section>
	`,
	{
		logo: Logo as TComponent,
		'titled-section': TitledSection as TComponent,
		bicycle: Bicycle as TComponent,
		carousel: Carousel as TComponent,
		'carousel-image': CarouselImage as TComponent,
		'i-button': IconedButton as TComponent,
		'nav-menu': NavMenu as TComponent,
	}
);

const images = () => [
	DescribedImage({
		picture: `/img/rift_boat_${isMobile.value ? 'm' : 'd'}.png.webp`,
		title: '10 Photos of Attractive Thailand',
		description:
			(!isMobile.value ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
				: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.Lorem ipsum dolor sit a...'),
		furtherRead: { link: '/' }
	}),
	DescribedImage({
		picture: `/img/road_${isMobile.value ? 'm' : 'd'}.png.webp`,
		title: 'Canyonlands National Park, Utah',
		description:
			(!isMobile.value ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
				: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.Lorem ipsum dolor sit a...'),
		furtherRead: { link: '/' }
	}),
	DescribedImage({
		picture: `/img/snow_hills_${isMobile.value ? 'm' : 'd'}.png.webp`,
		title: 'I left my heart in the Mountains!',
		description:
			(!isMobile.value ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
				: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.Lorem ipsum dolor sit a...'),
		furtherRead: { link: '/' }
	}),
	DescribedImage({
		picture: `/img/car_${isMobile.value ? 'm' : 'd'}.png.webp`,
		title: 'The Longest journey in my life!',
		description:
			(!isMobile.value ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
				: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.Lorem ipsum dolor sit a...'),
		furtherRead: { link: '/' }
	})
];

const isMobile = Getter(() => window.innerWidth <= window.innerHeight);

mount();
Array.from(document.querySelectorAll('*')).forEach(n => n.classList.add(isMobile.value ? 'mobile' : 'desktop'));

const scale = () => {
	const siteWidth = 390;
	const scale = screen.width / siteWidth;

	document.querySelector('meta[name="viewport"]')?.setAttribute('content', `width=${siteWidth}, initial-scale=${scale}`);
};
if (isMobile.value)
	scale();
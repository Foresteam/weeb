import './styles/reset.css';
import './styles/fonts.css';
import './styles/main.scss';
import './styles/index.scss';
import { Logo } from './components/logo/Logo';
import { TitledSection } from './components/sections/TitledSection';
import { TComponent } from 'lib/Component';
import { Renderer } from 'lib/Renderer';
import { Bicycle } from './components/bicycle/Bicycle';
import { DescribedImage } from './components/described-image/DescribedImage';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app)
	throw new Error();

const images = [
	DescribedImage({
		picture: '/img/rift_boat_d.png.webp',
		title: '10 Photos of Attractive Thailand',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
		furtherRead: { link: '/' }
	}),
	DescribedImage({
		picture: '/img/road_d.png.webp',
		title: 'Canyonlands National Park, Utah',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
		furtherRead: { link: '/' }
	}),
	DescribedImage({
		picture: '/img/snow_hills_d.png.webp',
		title: 'I left my heart in the Mountains!',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
		furtherRead: { link: '/' }
	}),
	DescribedImage({
		picture: '/img/car_d.png.webp',
		title: 'The Longest journey in my life!',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
		furtherRead: { link: '/' }
	})
];

app.innerHTML = Renderer(/*html*/
	`
		<section class="header">
			<div class="nav">
				<logo></logo>
				<nav>
					<div>How It Works</div>
					<div>Plan Your Tip</div>
					<div>Destinations</div>
					<div>Travel Stories</div>
				</nav>
				<input type="button" class="login" value="Login">
			</div>
			<div class="content">
				<div class="title">
					Explore the beauty of
					the World
				</div>
				<div class="subtitle">
					Receive personalized recommendations for countries, hotels, activities and more
				</div>
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
		<titled-section name="POPULAR DESTINATIONS"></titled-section>
		<titled-section name="TRAVEL STORIES" class="travel-stories">
			<div class="stories-footer">
				<section class="stories">
					${images.map(i => i.render()).join('\n')}
					<div class="flex-row" style="margin-top: 10px">
						<button>
							<img src="/icons/arrow-right.svg">
							See More
						</button>
					</div>
				</section>
				<section class="footer">
					All Rights Reserved © Travel Portal
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
		bicycle: Bicycle as TComponent
	}
);
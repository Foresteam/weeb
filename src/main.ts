import './styles/reset.css';
import './styles/fonts.css';
import './styles/main.scss';
import './styles/index.scss';
import { Logo } from './components/logo/Logo';
import { TitledSection } from './components/sections/TitledSection';
import { TComponent } from 'lib/Component';
import { Renderer } from 'lib/Renderer';
import { Bicycle } from './components/bicycle/Bicycle';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app)
	throw new Error();

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
				<bicycle img="/img/bicycle.svg" text="Tell us what you want to do"></bicycle>
				<bicycle img="/img/calendar.svg" text="Share us preferable dates"></bicycle>
				<bicycle img="/img/plane.svg" text="We will give you recommendations"></bicycle>
			</div>
		</titled-section>
		<titled-section name="POPULAR DESTINATIONS"></titled-section>
		<titled-section name="TRAVEL STORIES"></titled-section>
	`,
	{
		logo: Logo as TComponent,
		'titled-section': TitledSection as TComponent,
		bicycle: Bicycle as TComponent
	}
);
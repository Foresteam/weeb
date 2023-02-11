import typescriptLogo from './typescript.svg';
import { Image } from './components/image/Image';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app)
	throw new Error();
	
app.innerHTML = /*html*/`
	<div class="div123">
		hello<br>
		sdfsdfsd
	</div>
	<a href="https://vitejs.dev" target="_blank">
		<img src="/vite.svg" class="logo" alt="Vite logo" />
	</a>
	<a href="https://www.typescriptlang.org/" target="_blank">
		<img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
	</a>
	<h1>Vite + TypeScript</h1>
	<div class="card">
		<button id="counter" type="button"></button>
	</div>
	<p class="read-the-docs">
		Click on the Vite and TypeScript logos to learn more
	</p>
	${Image({ src: '/img/bridge_d.png', style: 'width: 100%' }).render()}
	${Image({ src: '/img/bridge_d.png' }).render()}
`;
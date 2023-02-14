import './main.sass';
import { App } from 'lib/App';
import { Image } from './components/image/Image';
import { TComponent } from 'lib/Component';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app)
	throw new Error();
	
app.innerHTML = App(
	/*html*/`
		<h1>12345</h1>
		<jimage src="/img/bridge_d.png" />
	`,
	{
		jimage: Image as TComponent
	}
);
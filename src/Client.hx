package;

import js.Browser.document;
import js.Browser.alert;

class Client {
	// static entrypoint
	static function main()
		new Client();

	// constructor
	function new() {
		trace("DOM example");

		// import App from './App.svelte';

		final app = new App({
			target: document.body,
			props: {
				name: 'world'
			}
		});

		export default app;

		document.addEventListener("DOMContentLoaded", function(event) {
			trace("DOM ready");

			var p = document.createElement("p");
			p.innerText = 'DOM ready';

			var button = document.createElement("button");
			button.textContent = "Click me!";
			// button.onclick = (event) -> alert("Haxe is great");
			button.onclick = function(event) {
				alert("Haxe is great");
			}

			document.querySelector(".container").appendChild(p);
			p.appendChild(button);
		});
	}
}

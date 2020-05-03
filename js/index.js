const search = document.getElementById("text");

const output = document.getElementById("output");

async function searchState(value) {
	const response = await fetch("data/states.json");
	const states = await response.json();
	
	// Match the json file with what is gotten from the input field
	let matches = states.filter(state => {
		const regex = new RegExp(`^${value}`, 'gi');
		return state.name.match(regex) || state.abbr.match(regex);
	});

	if (value.length === 0) {
		matches = [];
		output.innerHTML = "";
	}

	outputHTML(matches);
}

const outputHTML = matches => {
	if (matches.length > 0) {
		const html = matches.map(match => `
			<div class="container card card-body mb-2" style="background-color: #ddd; color: darkblue;">
				<h4>${match.name}, ${match.abbr}</h4>
				<h4>Long: ${match.lat}, Lat: ${match.long}</h4>
			</div>
		`).join('');
		output.innerHTML = html;
	}
}

search.addEventListener('input', () => searchState(search.value));
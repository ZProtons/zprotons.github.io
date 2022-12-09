url = "https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=charity";

function returnText() {
	let input = document.getElementById("userInput").value;
	finalurl = url.replace("charity", input);
	console.log(input)

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '3f5fd37933mshc14a4901bb7ee71p15d6bfjsndbf5d4b518ef',
			'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
		}
	};
	fetch(finalurl, options)
		.then(response => response.json())
		.then((response) => {
			console.log(response)


			definition.innerHTML = response.definition
			word.innerHTML = response.word
			valid.innerHTML = response.valid

		})
		.catch(err => console.error(err));
}
	

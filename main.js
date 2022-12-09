const encodedParams = new URLSearchParams();
encodedParams.append("source_language", "en-us");
encodedParams.append("target_language", "ar-sa");
encodedParams.append("sources", "<REQUIRED>");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '3f5fd37933mshc14a4901bb7ee71p15d6bfjsndbf5d4b518ef',
		'X-RapidAPI-Host': 'community-onehourtranslation.p.rapidapi.com'
	},
	body: encodedParams
};

fetch('https://community-onehourtranslation.p.rapidapi.com/projects/translation?secret_key=undefined&public_key=undefined', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
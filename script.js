const outputElement = document.getElementById('WeatherContainer');
async function Reload() {
  try {
    const TypedLocalization = document.getElementById('Localization').value;
    const apiUrl = `http://api.weatherapi.com/v1/current.xml?key=b2aeee39e72b4774b7b151153240912&q=${TypedLocalization}&aqi=no`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Data not found');
      } else if (response.status === 500) {
        throw new Error('Server error');
      } else {
        throw new Error('Network response was not ok');
      }
    }
	
    const textData = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(textData, 'text/xml');
    const Temeperature = xmlDoc.getElementsByTagName('temp_c')[0]?.textContent || 'N/A';
    const feelslike_c = xmlDoc.getElementsByTagName('feelslike_c')[0]?.textContent || 'N/A';
    const Condition = xmlDoc.getElementsByTagName('text')[0]?.textContent || 'N/A';
	const Icon = xmlDoc.getElementsByTagName('icon')[0]?.textContent || 'N/A';

	let image = new Image();
	image.src = "";
	image.id ="child";
	image.src = "https:"+Icon;
	if(document.getElementById("icon").firstChild){
			document.getElementById("child").remove();
	}
	document.getElementById("icon").appendChild(image);
    const wind_kph = xmlDoc.getElementsByTagName('wind_kph')[0]?.textContent || 'N/A';
    const pressure_mb = xmlDoc.getElementsByTagName('pressure_mb')[0]?.textContent || 'N/A';
    document.getElementById('Localization').value = '';
    document.getElementById('temp_c').innerText = Temeperature+"°C";
    document.getElementById('feelslike_c').innerText = feelslike_c+"°C";
    document.getElementById('text').innerText = Condition;
    document.getElementById('wind_kph').innerText = wind_kph+" kph";
    document.getElementById('pressure_mb').innerText = pressure_mb +" mbar";

  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    alert('Blednie podana lokalizacja');
  }
}

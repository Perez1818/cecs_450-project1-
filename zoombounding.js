//National Obesity Percentages by State. Explanation of Field Attributes:
// Obesity - The percent of the state population that is considered obese from the 2015 CDC BRFSS Survey.
// https://services3.arcgis.com/HESxeTbDliKKvec2/arcgis/rest/services/LakeCounty_Health/FeatureServer/8?f=pjson
import fetch from 'node-fetch';


// check file json exists from the server
fetch('https://services3.arcgis.com/HESxeTbDliKKvec2/arcgis/rest/services/LakeCounty_Health/FeatureServer/8/query?where=1=1&outFields=NAME,Obesity&f=json')
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    }).then(data => {
        const first20Rows = data.features.slice(0, 5);//show 5 first rows of the data
        first20Rows.forEach((features, index) => {
            console.log(`Row ${index + 1}: 
                State = ${features.attributes.NAME}, 
                Obesity = ${features.attributes.Obesity}`);
        })
    }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    })


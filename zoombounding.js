//National Obesity Percentages by State. Explanation of Field Attributes:
// Obesity - The percent of the state population that is considered obese from the 2015 CDC BRFSS Survey.
// https://services3.arcgis.com/HESxeTbDliKKvec2/arcgis/rest/services/LakeCounty_Health/FeatureServer/8?f=pjson
//import fetch from 'node-fetch';
export let stateAndObe = {};
// check file json exists from the server
fetch('https://services3.arcgis.com/HESxeTbDliKKvec2/arcgis/rest/services/LakeCounty_Health/FeatureServer/8/query?where=1=1&outFields=NAME,Obesity&f=json')
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    }).then(data => {

        //const stateAndObe = {};
        const mappingdata = data.features;
        mappingdata.forEach(features => {
                const State = features.attributes.NAME;
                const Obesity = features.attributes.Obesity;
                stateAndObe[State] = Obesity;
        });
        console.log(stateAndObe);
    }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

   

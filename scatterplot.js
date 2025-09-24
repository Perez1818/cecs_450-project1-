// scatterplot.js
let stateAndObe = {};

// Fetch obesity data from the server
async function fetchObesityData() {
    try {
        const response = await fetch('https://services3.arcgis.com/HESxeTbDliKKvec2/arcgis/rest/services/LakeCounty_Health/FeatureServer/8/query?where=1=1&outFields=NAME,Obesity&f=json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        data.features.forEach(feature => {
            const state = feature.attributes.NAME.toLowerCase();
            const obesity = feature.attributes.Obesity;
            stateAndObe[state] = obesity;
        });
    } catch (error) {
        console.error('Error fetching obesity data:', error);
    }
}

// Fetch scatter data and merge with obesity data
async function getScatterData() {
    await fetchObesityData();
    return fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSHuZSymB6pmsvDrPTHMEE-5PLXUURV8te3iUzQLAo0AXllfhgoSSw7-WlIUi7ZesKn6JnrmVHd2a2F/pub?output=csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('No response from server');
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').map(row => row.split(','));
            const headers = rows[0];
            const stateIndex = headers.indexOf('State');
            const householdIndex = headers.indexOf('Households - Median income (dollars)');
            const familyIndex = headers.indexOf('Families - Median income (dollars)');
            const marriedIndex = headers.indexOf('Married-couple families - Median income (dollars)');
            const nonfamilyIndex = headers.indexOf('Nonfamily households - Median income (dollars)');

            const result = [];
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (row[stateIndex]) {
                    const state = row[stateIndex].toLowerCase();
                    const obesity = stateAndObe[state] || 0; //stateAndObe
                    result.push(
                        { incomeType: "Households", value: parseFloat(row[householdIndex] || 0), obesity: obesity, state: row[stateIndex] },
                        { incomeType: "Families", value: parseFloat(row[familyIndex] || 0), obesity: obesity, state: row[stateIndex] },
                        { incomeType: "Married-couple", value: parseFloat(row[marriedIndex] || 0), obesity: obesity, state: row[stateIndex] },
                        { incomeType: "Nonfamily", value: parseFloat(row[nonfamilyIndex]) || 0, obesity: obesity, state: row[stateIndex] }
                    );
                }
            }
            return result;
        })
        .catch(error => {
            console.error('Error Fetch in scatterchart', error);
            return null;
        });
}

// Test function to verify data fetching
async function testGetScatterData() {
    console.log('Starting test...');
    const data = await getScatterData();
    if (data) {
        console.log('Scatter Data:', data);
    } else {
        console.log('Failed to fetch scatter data');
    }
}

// Run the test
testGetScatterData();

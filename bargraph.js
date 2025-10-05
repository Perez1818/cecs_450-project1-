// bargraph.js is using reference from 
// https://medium.com/@ryan_forrester_/read-csv-files-in-javascript-how-to-guide-8d0ac6df082a
// to use asynchonous function to fetch data in csv file

let regionData = {};

// Fetch bar data from the CSV
async function fetchBarData() {
    try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSHuZSymB6pmsvDrPTHMEE-5PLXUURV8te3iUzQLAo0AXllfhgoSSw7-WlIUi7ZesKn6JnrmVHd2a2F/pub?output=csv');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const csvText = await response.text();
        const rows = csvText.split('\n').map(row => row.split(','));
        const headers = rows[0];

        // Find column indices
        const stateIndex = headers.indexOf('State');
        const incomeIndex = headers.indexOf('Median household income');
        const regionIndex = headers.indexOf('Region');
        const obesityIndex = headers.indexOf('Obesity %');

        // Group by Region and total up
        regionData = {};
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row[stateIndex] && row[regionIndex]) {
                const region = row[regionIndex].trim() || 'Unknown';
                const obesity = parseFloat(row[obesityIndex]) || 0;
                const incomeStr = row[incomeIndex]?.replace(/[\$,]/g, '') || '0';
                const income = parseFloat(incomeStr) || 0;

                if (!regionData[region]) {
                    regionData[region] = { obesity: 0, income: 0, count: 0 };
                }
                regionData[region].obesity += obesity;
                regionData[region].income += income;
                regionData[region].count += 1;
            }
        }

        // Calculate averages
        Object.keys(regionData).forEach(region => {
            const vals = regionData[region];
            regionData[region].obesity = (vals.obesity / vals.count).toFixed(1); // one decimal place
            regionData[region].income = (vals.income / vals.count).toFixed(0); // no decimal placce
        });

        return Object.entries(regionData).map(([region, vals]) => ({
            region,
            obesity: +vals.obesity,
            income: +vals.income
        }));
    } catch (error) {
        console.error('Error fetching bar data:', error);
        return null;
    }
}

// Export function to get processed bar data
async function getBarData() {
    await fetchBarData();
    return Object.entries(regionData).map(([region, vals]) => ({
        region,
        obesity: +vals.obesity,
        income: +vals.income
    }));
}

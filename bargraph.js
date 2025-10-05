// bargraph.js is using same reference from piechart.js

let regionData = {};

// Fetch bar data from the CSV
async function fetchBarData() {
    try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/1zZrav-m7Iiusnop32WciLK8b4uKGTyTwUM-wvTPTVZI/export?format=csv&gid=1025716626');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const csvText = await response.text();
        const rows = csvText.split('\n').map(row => row.split(','));
        const headers = rows[0];

        // Find column indices
        const stateIndex = headers.indexOf('State');
        const regionIndex = headers.indexOf('Region');
        const obesityIndex = headers.indexOf('1st Obesity %');
        const incomeIndex = headers.indexOf('1st Income');

        // Group by Region and aggregate averages
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


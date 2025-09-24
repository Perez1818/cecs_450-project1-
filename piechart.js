// piechart.js
function getRaceData(stateName) {
    return fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSHuZSymB6pmsvDrPTHMEE-5PLXUURV8te3iUzQLAo0AXllfhgoSSw7-WlIUi7ZesKn6JnrmVHd2a2F/pub?output=csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('No response from server');
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').map(row => row.split(','));
            const headers = rows[0]; // Headers row => ["State",
            const stateIndex = headers.indexOf('State'); // find State
            const firstIndex = headers.indexOf('1st Race'); // 1st Race name
            const firstPercentIndex = headers.indexOf('1st Race %'); // 1st Race %
            const secondIndex = headers.indexOf('2nd Race'); // 2nd Race name
            const secondPercentIndex = headers.indexOf('2nd Race %'); // 2nd Race %
            const thirdIndex = headers.indexOf('3rd Race'); // 3rd Race name
            const thirdPercentIndex = headers.indexOf('3rd Race %'); // 3rd Race %
            // match state name case insensitive
            const stateLower = stateName.toLowerCase();
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (row[stateIndex] && row[stateIndex].toLowerCase() === stateLower) {
                    return [
                        { name: row[firstIndex] || 'Unknown', value: parseFloat(row[firstPercentIndex]) || 0 },
                        { name: row[secondIndex] || 'Unknown', value: parseFloat(row[secondPercentIndex]) || 0 },
                        { name: row[thirdIndex] || 'Unknown', value: parseFloat(row[thirdPercentIndex]) || 0 }
                    ]
                }
            }

            if (database) {
                console.log("Get data for ", stateName);
                return database;
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error('Error Fetch in piechart', error);
            return null;
        });
}



function getAgeData(stateName) {
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
            const firstIndex = headers.indexOf('1st Age Group'); 
            const firstPercentIndex = headers.indexOf('1st Age %');
            const secondIndex = headers.indexOf('2nd Age Group');
            const secondPercentIndex = headers.indexOf('2nd Age %');
            const thirdIndex = headers.indexOf('3rd Age Group');
            const thirdPercentIndex = headers.indexOf('3rd Age %');
            // match state name case insensitive
            const stateLower = stateName.toLowerCase();
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (row[stateIndex] && row[stateIndex].toLowerCase() === stateLower) {
                    return [
                        { name: row[firstIndex] || 'Unknown', value: parseFloat(row[firstPercentIndex]) || 0 },
                        { name: row[secondIndex] || 'Unknown', value: parseFloat(row[secondPercentIndex]) || 0 },
                        { name: row[thirdIndex] || 'Unknown', value: parseFloat(row[thirdPercentIndex]) || 0 }
                    ]
                }
            }

            if (database) {
                console.log("Get data for ", stateName);
                return database;
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error('Error Fetch in piechart', error);
            return null;
        });
}


function getIncomeData(stateName) {
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
            const householdsIndex = headers.indexOf('Households - Median income (dollars)');
            const familiesIndex = headers.indexOf('Families - Median income (dollars)');
            const marriedIndex = headers.indexOf('Married-couple families - Median income (dollars)');
            const nonfamilyIndex = headers.indexOf('Nonfamily households - Median income (dollars)');
            const stateLower = stateName.toLowerCase();
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (row[stateIndex] && row[stateIndex].toLowerCase() === stateLower) {
                    return [
                        { name: 'Households', value: parseFloat(row[householdsIndex]?.replace(/[\$,]/g, '')) || 0 },
                        { name: 'Families', value: parseFloat(row[familiesIndex]?.replace(/[\$,]/g, '')) || 0 },
                        { name: 'Married-couple families', value: parseFloat(row[marriedIndex]?.replace(/[\$,]/g, '')) || 0 },
                        { name: 'Nonfamily households', value: parseFloat(row[nonfamilyIndex]?.replace(/[\$,]/g, '')) || 0 }
                    ];
                }
            }
            if (database) {
                console.log("Get data for ", stateName);
                return database;
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error('Error Fetch in getIncomeData', error);
            return null;
        });
}
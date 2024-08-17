document.getElementById('fetchNumbers').addEventListener('click', () => {
    const numberType = document.getElementById('numberType').value;
    
    fetch(/numbers/$,{numberType})
        .then(response => response.json())
        .then(data => {
            document.getElementById('prevState').innerText ='Previous State: ${data.windowPrevState.join(', ')}';
            document.getElementById('currState').innerText ='Current State: ${data.windowCurrState.join(', ')}';
            document.getElementById('numbers').innerText ='Numbers: ${data.numbers.join(', ')}';
            document.getElementById('average').innerText ='Average: ${data.avg}';

        })
        .catch(error => console.error('Error:', error));
});
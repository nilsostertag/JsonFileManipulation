const content = document.querySelector('.content');

function addContentFooter() {
    const contentFooter = document.createElement('div');
    contentFooter.className = 'contentFooter';

    const btnDownload = document.createElement('button');
    
    btnDownload.className = 'btn_download';

    contentFooter.appendChild(btnDownload);
}

function displayData(data) {
    //var inputident = 0;

    for(const key in data) {
        if(data.hasOwnProperty(key)) {
            const bracket = document.createElement('div');
            bracket.className = 'bracket';

            const label = document.createElement('label');
            label.innerText = key + ': ';

            const input = document.createElement('input');
            input.type = 'text';
            input.value = data[key];
            input.id = "val_" + key.toString();

            bracket.appendChild(label);
            bracket.appendChild(input);
            content.appendChild(bracket);
        }
        //inputident++;
    }
}

function fetchJson(e) {
    content.innerHTML = '';
    addContentFooter();

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        try{
            const data = JSON.parse(reader.result);
            console.log(data);
            try{
                displayData(data);
            } catch(error) {
                console.log('Error: Failed to display Json data.')
            }
            
        } catch(error) {
            console.error('Error: The uploaded file is not in Json format.');
            //alert('Error: The uploaded file is not in Json format.')
        }
    };
    reader.readAsText(file);
}

const input = document.querySelector('input[type="file"]');
input.addEventListener('change', e => fetchJson(e.target));
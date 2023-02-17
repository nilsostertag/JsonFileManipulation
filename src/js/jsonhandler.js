const content = document.querySelector('.content');

function addContentFooter() {
    const contentFooter = document.createElement('div');
    contentFooter.className = 'contentFooter';

    const btnDownload = document.createElement('button');
    btnDownload.textContent = 'Download';
    btnDownload.onclick = '';

    contentFooter.appendChild(btnDownload);
    content.appendChild(contentFooter);
}

function displayData(data) {
    const fileName = document.createElement('label');
    fn = upload.value.split('\\');
    fileName.innerText = fn[fn.length-1];
    fileName.className = 'fileName';
    content.appendChild(fileName);
    
    const dataWrap = document.createElement('div');
    dataWrap.className = 'dataWrap';
    for(const key in data) {
        if(data.hasOwnProperty(key)) {
            const bracket = document.createElement('div');
            bracket.className = 'bracket';

            const label = document.createElement('label');
            label.innerText = key + ' ';

            const input = document.createElement('input');
            input.type = 'text';
            input.value = data[key];
            input.id = "val_" + key.toString();

            bracket.appendChild(label);
            bracket.appendChild(input);
            dataWrap.appendChild(bracket);
        }
    }
    content.appendChild(dataWrap);
    addContentFooter();
}

function fetchJson(e) {
    content.innerHTML = '';

    const file = upload.files[0];
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

const upload = document.querySelector('input[type="file"]');
upload.addEventListener('change', e => fetchJson(e.target));
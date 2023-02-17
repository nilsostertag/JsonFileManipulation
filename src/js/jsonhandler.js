const content = document.querySelector('.content');

function parseData() {
    const dataFields = document.querySelector('.dataWrap');
    const keyArray = Array.from(dataFields.querySelectorAll('label'));
    const valArray = Array.from(dataFields.querySelectorAll('input'));

    let dataset = {};
    let key;
    let val;
    for(let i = 0; i < keyArray.length; i++) {
        key = keyArray[i].innerText;
        val = valArray[i].value;
        dataset[key] = val;
    }
    return dataset;
}

function downloadFile(dataset) {
    fn = upload.value.split('\\');
    filename = fn[fn.length-1];
    const jsonBlob = new Blob([JSON.stringify(dataset, null, 2)], {type: 'application/json'});
    const jsonUrl = URL.createObjectURL(jsonBlob);

    const link = document.createElement('a');
    link.href = jsonUrl;
    link.download = filename.toString();

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(jsonUrl);
}

function addContentFooter() {
    const contentFooter = document.createElement('div');
    contentFooter.className = 'contentFooter';
    const btnDownload = document.createElement('button');
    btnDownload.textContent = 'Download';
    btnDownload.id = "btn_download";
    
    contentFooter.appendChild(btnDownload);
    content.appendChild(contentFooter);

    document.getElementById("btn_download").addEventListener("click", function() {
        downloadFile(parseData());
    });
    //btnDownload.onclick = downloadFile(parseData);
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
            label.id = "key~" + key.toString();
            const input = document.createElement('input');
            input.type = 'text';
            input.value = data[key];
            input.id = "val~" + key.toString();

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
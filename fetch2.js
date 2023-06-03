async function fetchText() {
    var url = document.URL;
    var id = url.substring(url.lastIndexOf('/') + 1);

    let response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtppqpaKXMQDu0XXOBXMWjY1oKrwpUQ5idlJegovc2yo9Wvr58Mcxz72dvwf31KQOMV946pLpMBMT7/pubhtml');

    if (response.status === 200) {
      let data = await response.text();
      let container = document.querySelector('.container');
      container.innerHTML = data;
      const tables = document.querySelectorAll("table");
      for (let t = 0; t < tables.length; t++) { 
        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.setAttribute('id', tables[t].children[1].children[0].cells[1].innerHTML.replaceAll(' ', '_').slice(0, 10));
        document.body.appendChild(wrapper);
        for (let i = 0; i < tables[t].children[1].children.length; i++) {
          for (let j = 1; j < tables[t].children[1].children[i].cells.length; j++) {
            const newDiv = document.createElement("div");
            const header = document.createElement("div");
            
            if (j == 1 && i == 0){
              header.innerHTML = `<div class="name">${tables[t].children[1].children[0].cells[1].innerHTML}</div> <div class="class">${tables[t].children[1].children[0].cells[2].innerHTML}</div>`;             
            }
            header.classList.add("header");
            if (j == 1 && i != 0){
              newDiv.classList.add("subject");
              newDiv.innerHTML = tables[t].children[1].children[i].cells[j].innerHTML;
            }
            if (j == 2 && i != 0){
              newDiv.classList.add("title");
              newDiv.innerHTML = tables[t].children[1].children[i].cells[j].innerHTML;
            }
            if (j == 3 && i != 0){
              newDiv.classList.add("description");
              newDiv.innerHTML = tables[t].children[1].children[i].cells[j].innerHTML;
            }
            if (i == 1){
              newDiv.classList.add("hidden");
            }
            wrapper.appendChild(newDiv);
            wrapper.appendChild(header);
          }
        }
      }
      if (id?.includes('#')){
        window.location.href = id;
      }
    }
}

fetchText();
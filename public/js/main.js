import {getTrashBinList, setTrashList} from "./trash_bins.mjs";
import Modal from './modal.mjs';


const modal = new Modal("modal");


function trashBinDivSetup(data, div) {

    div.innerHTML = `
    <details>
        <summary>
        <div>
        ${data.name}
        <div class="info">
            PET: ${Math.floor(data.pet) || "-"}%<br> 
            CAN : ${Math.floor(data.can) || "-"}% <br>
        </div>
    </div>
    <div class="buttons">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
    </div>
        </summary>
        
        <h2>${data.name}</h2>
        <h4>${data.location}</h4>
        <p>PET: ${Math.floor(data.pet) || "-"}%</p>
        <p>CAN : ${Math.floor(data.can) || "-"}%</p>
        <p>WEIGHT : ${Math.floor(data.weight) || "-"} g</p> 
    </details>
    
    `;



}


let rid = null;
async function setPage() {
    let start = 0;
    let end = 30;

    const data = await getTrashBinList(start, end);
    setTrashList(data, "trash-bin-list", trashBinDivSetup);

    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    prevButton.onclick = async () => {
        if (start <= 0) return;

        start -= 30;
        end -= 30;
        const data = await getTrashBinList(start, end);
        setTrashList(data, "trash-bin-list", trashBinDivSetup);
    }

    nextButton.onclick = async () => {
        start += 30;
        end += 30;
        const data = await getTrashBinList(start, end);
        setTrashList(data, "trash-bin-list", trashBinDivSetup);
    }

    if (rid != null) {
        clearInterval(rid);
        rid = setInterval(async ()=> {
            const data = await getTrashBinList(start, end);
            setTrashList(data, "trash-bin-list", trashBinDivSetup);
        }, 5 * 60 * 1000);
    }

}

setPage();


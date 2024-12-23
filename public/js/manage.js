import {getTrashBinList, setTrashList} from "./trash_bins.mjs";
import Modal from './modal.mjs';


const trashBinAddConfig = {
    content : `
        <span class="close-button" id="closeModalButton">&times;</span>
        <h2>쓰레기통 등록</h2>
        <form id="submitForm">
            <label for="name">이름:</label>
            <input type="text" id="name" name="name" required>
            <br><br>
            <label for="location">위치:</label>
            <input type="text" id="location" name="location" required>
            <br><br>
            <label for="key">인증키:</label>
            <input type="text" id="key" name="key" required>

            <button type="submit">등록</button>
        </form>
    `,
    submitfn : async (event) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지
        const formData = {
            location: document.getElementById('location').value,
            name: document.getElementById('name').value,
            key: document.getElementById('key').value
        };

        // console.log('폼 데이터 전송:', formData);
        const res = await axios.post('/trashbin/add', formData);

        alert(res?.data.message);

        // 모달 닫기 및 폼 초기화
        modal.close();
        modal.reset();
        setPage();
    }
}

const modal = new Modal("modal");
modal.setModal(trashBinAddConfig);

document.getElementById('add-trash-bin').onclick = ()=> {
    modal.setModal(trashBinAddConfig);
    modal.open()
};

function trashBinDivSetup(data, div) {

    div.innerHTML = `
    <details>
        <summary>
        <div>
        ${data.name}
        <div class="info">
            PET: ${Math.floor(data.pet) || "0"}%<br> 
            CAN : ${Math.floor(data.can) || "0"}% <br>
        </div>
    </div>
    <div class="buttons">
        <!--button>자세히</button>-->
        <button class="update">수정</button>
        <button class="delete">삭제</button>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
    </div>
        </summary>
        
        <h2>${data.name}</h2>
        <h4>${data.location}</h4>
        <p>PET: ${Math.floor(data.pet) || "0"}%</p>
        <p>CAN : ${Math.floor(data.can) || "0"}%</p>
        <p>WEIGHT : ${Math.floor(data.weight) || "0"} g</p> 
    </details>
    
    `;

    div.querySelector('.delete').onclick = async () => {
        const res = await axios.post('/trashbin/delete', {id : data.id});
        alert(res?.data.message);
        setPage();
    }

    div.querySelector('.update').onclick = async () => {
        modal.setModal({
            content : `
        <span class="close-button" id="closeModalButton">&times;</span>
        <h2>쓰레기통 업데이트</h2>
        <form id="submitForm">
            <label for="name">이름:</label>
            <input type="text" id="name" name="name" value="${data.name}" required>
            <br><br>
            <label for="location">위치:</label>
            <input type="text" id="location" name="location" value="${data.location}"required>
            <button type="submit">업데이트</button>
        </form>
    `,
            submitfn : async (event) => {
                event.preventDefault(); // 기본 폼 제출 동작 방지
                const formData = {
                    id : data.id,
                    location: document.getElementById('location').value,
                    name: document.getElementById('name').value,
                };

                // console.log('폼 데이터 전송:', formData);
                const res = await axios.post('/trashbin/update', formData);
                alert(res?.data.message);

                // 모달 닫기 및 폼 초기화
                modal.close();
                modal.reset();
                setPage();
            }
        });
        modal.open();
    }
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



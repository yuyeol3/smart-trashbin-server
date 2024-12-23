export async function getTrashBinList(from, to) {

    const res = await axios.get(`/trashbin/lists?from=${from}&to=${to}`);
    console.log(res.data);
    return res?.data;
}

export async function setTrashList(data, toAttach, fn) {
    const attachDiv = document.getElementById(toAttach);

    if (data.length <= 0) {
        attachDiv.innerHTML = `데이터가 없음`;
        return;
    }
    attachDiv.innerHTML = '';

    for (const trashbin of data) {
        const div = document.createElement('div');
        div.classList.add('trash-bin');
        fn(trashbin, div);
        attachDiv.appendChild(div);
    }
}
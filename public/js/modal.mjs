export default class Modal {
    constructor(modal_id) {
        this.modal_id = modal_id;
        this.modalHtml = document.getElementById(this.modal_id);
        this.modalContent = this.modalHtml.querySelector('.modal-content');
    }

    /**
     *
     * @param{ { content : string, submitfn : (event)=>{} }  } configuration
     */
    setModal(configuration) {
        this.modalContent.innerHTML = configuration.content;
        this.closeModalbutton = this.modalHtml.querySelector('#closeModalButton');
        this.submitForm = this.modalHtml.querySelector('#submitForm');
        this.submitfn = configuration.submitfn;
        this.submitForm.onsubmit = this.submitfn;
        this.submitfn = (event) => {
            event.preventDefault();
        };

        this.closeModalbutton.onclick = ()=> {this.close()};

        window.addEventListener('click', (event) => {
            if (event.target === this.modalHtml) {
                this.close();
            }
        });

    }

    open() {
        this.modalHtml.style.display = 'block';
    }

    close() {
        this.modalHtml.style.display = 'none';
    }

    reset() {
        this.submitForm.reset();
    }


}
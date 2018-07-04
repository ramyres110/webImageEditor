class ImageEditor {

    constructor() {
        this.imageSaved = false;
        this.filters = {};
        //-
        this.inputImage = document.querySelector('#inputImage');
        this.imageEdit = document.querySelector('#imageEdit');
        //--
        this.btnSave = document.querySelector('#btnSave');
        this.btnReset = document.querySelector('#btnReset');
        this.btnCancel = document.querySelector('#btnCancel');
        //--
        this.rangeBrightness = document.querySelector('#rangeBrightness');
        this.rangeContrast = document.querySelector('#rangeContrast');
        this.rangeGrayscale = document.querySelector('#rangeGrayscale');

        this.changeView();
        this.loadEvents();
    }

    loadEvents() {
        this.inputImage.addEventListener('change', (event) => {
            event.preventDefault();
            this.loadImageFromFile(this.inputImage.files[0]);
            this.changeView('edit');
        });
        this.btnSave.addEventListener('click', (event) => {
            this.preventDefault();
            this.saveImage();
        })
        this.btnReset.addEventListener('click', (event) => {
            event.preventDefault();
            this.resetEditor();
        })
        this.btnCancel.addEventListener('click', (event) => {
            event.preventDefault();
            this.cancelEdition();
        })
        this.rangeBrightness.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilter('brightness', event.target.value + '');
        })
        this.rangeContrast.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilter('contrast', event.target.value + '%');
        })
        this.rangeGrayscale.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilter('grayscale', event.target.value + '%');
        })
    }

    changeView(view = 'input') {
        document.querySelector('form').reset();
        if (view === 'input') {
            document.querySelector('#rowInputImage').classList.remove('d-none');
            document.querySelector('#rowEditImage').classList.add('d-none');
        } else {
            document.querySelector('#rowInputImage').classList.add('d-none');
            document.querySelector('#rowEditImage').classList.remove('d-none');
        }
    }

    loadImageFromFile(file) {
        this.imageEdit.src = window.URL.createObjectURL(file);
        this.initFilters();
    }

    initFilters() {
        this.filters = {
            brightness: '1.0',
            contrast: '200%',
            grayscale: '50%'
        };
        this.updateFilters()
    }

    applyFilter(name, value) {
        this.filters[name] = value;
        this.updateFilters()
    }

    updateFilters() {
        let filterString = 'filter: ';
        for (const key of Object.keys(this.filters)) {
            filterString = filterString + `${key}(${this.filters[key]}) `;
        }
        this.imageEdit.setAttribute('style', filterString);
    }

    saveImage() { }

    resetEditor() { }

    cancelEdition() {
        let resp = true;
        if (!this.imageSaved) {
            resp = window.confirm('You really want cancel this edition without save?');
        }
        if (resp) {
            this.imageEdit.src = "";
            this.changeView();
        }
    }
}

const app = new ImageEditor();
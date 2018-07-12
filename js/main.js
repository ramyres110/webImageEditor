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
        this.rangeHUE = document.querySelector('#rangeHUE');
        this.rangeInvert = document.querySelector('#rangeInvert');
        this.rangeSaturate = document.querySelector('#rangeSaturate');
        this.rangeSepia = document.querySelector('#rangeSepia');
        this.rangeOpacity = document.querySelector('#rangeOpacity');
        //--
        this.rangeDropShadowsHorizontal = document.querySelector('#rangeDropShadows');
        this.rangeDropShadowsVertical = document.querySelector('#rangeDropShadows');
        this.rangeDropShadowsBlur = document.querySelector('#rangeDropShadows');
        this.rangeDropShadowsColor = document.querySelector('#rangeDropShadows');

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
            event.preventDefault();
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
        //-
        this.rangeBrightness.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilter('brightness', event.target.value);
        })
        this.rangeContrast.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilter('contrast', event.target.value);
        })
        this.rangeGrayscale.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilter('grayscale', event.target.value);
        })
        this.rangeHUE.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilter('hue-rotate', event.target.value);
        })
        this.rangeInvert.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilter('invert', event.target.value);
        })
        this.rangeSaturate.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilter('saturate', event.target.value);
        })
        this.rangeSepia.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilter('sepia', event.target.value);
        })
        this.rangeOpacity.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilter('opacity', event.target.value);
        })
        //-
        this.rangeDropShadowsHorizontal.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilterDropShadow('h', event.target.value);
        })
        this.rangeDropShadowsVertical.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilterDropShadow('v', event.target.value);
        })
        this.rangeDropShadowsBlur.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilterDropShadow('b', event.target.value);
        })
        this.rangeDropShadowsColor.addEventListener('change', (event) => {
            event.preventDefault();
            this.applyFilterDropShadow('c', event.target.value);
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
        this.filters = {};
        this.updateFilters()
    }

    applyFilter(name, value) {
        this.filters[name] = value;
        this.updateFilters()
    }

    applyFilterDropShadow(){

    }

    updateFilters() {
        let metric = '%';
        let filterString = '';
        this.imageEdit.removeAttribute('style');

        for (const key of Object.keys(this.filters)) {
            if (key === "drop-shadow") return;
            if (key === 'hue-rotate') metric = "deg";
            filterString = filterString + `${key}(${this.filters[key] + metric}) `;
            metric = "%";
        }

        if (filterString !== '') {
            this.imageEdit.setAttribute('style', 'filter: ' + filterString + ';');
        }
    }

    saveImage() {
        let canvas = document.createElement('canvas');
        canvas.id = "canvasPhoto";
        canvas.width = this.imageEdit.width;
        canvas.height = this.imageEdit.height;
        canvas.classList.add('d-none');
        document.body.appendChild(canvas);

        var ctx = canvas.getContext('2d');
        ctx.drawImage(this.imageEdit, 0, 0, canvas.width, canvas.height);

        this.download(canvas);
    }


    download(canvas) {
        let strWindowFeatures = "menubar=no,location=no,resizable=no,scrollbars=no,status=no";
        let data = canvas.toDataURL("image/png");
        if (!window.open(data, "", strWindowFeatures)) {
            document.location.href = data;
        }
    }

    resetEditor() {
        document.querySelector('#formTools').reset();
        this.filters = {};
        this.updateFilters();
    }

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
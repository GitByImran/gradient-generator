document.addEventListener('DOMContentLoaded', function () {
    const colorPicker = document.getElementById('color-picker');
    const addColorButton = document.getElementById('add-color');
    const colorStopsContainer = document.getElementById('color-stops');
    const generateButton = document.getElementById('generate-gradient');
    const gradientPreview = document.getElementById('gradient-preview');
    const directionInput = document.getElementById('direction');
    const gradientTypeSelect = document.getElementById('gradient-type');

    let colorStops = [{ color: '#ff0000', position: 0 }, { color: '#0000ff', position: 100 }];
    renderColorStops();
    generateGradientPreview();

    addColorButton.addEventListener('click', function () {
        colorStops.push({ color: colorPicker.value, position: 50 });
        renderColorStops();
        generateGradientPreview();
    });

    colorPicker.addEventListener('input', function () {
        colorStops[0].color = this.value;
        renderColorStops();
        generateGradientPreview();
    });

    directionInput.addEventListener('input', function () {
        generateGradientPreview();
    });

    gradientTypeSelect.addEventListener('change', function () {
        generateGradientPreview();
    });

    function renderColorStops() {
        colorStopsContainer.innerHTML = '';
        colorStops.forEach(function (stop, index) {
            const input = document.createElement('input');
            input.type = 'color';
            input.value = stop.color;
            input.addEventListener('input', function () {
                colorStops[index].color = this.value;
                generateGradientPreview();
            });

            const positionInput = document.createElement('input');
            positionInput.type = 'range';
            positionInput.min = 0;
            positionInput.max = 100;
            positionInput.value = stop.position;
            positionInput.addEventListener('input', function () {
                colorStops[index].position = parseInt(this.value);
                generateGradientPreview();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.addEventListener('click', function () {
                colorStops.splice(index, 1);
                renderColorStops();
                generateGradientPreview();
            });

            const colorStop = document.createElement('div');
            colorStop.classList.add('color-stop');
            colorStop.appendChild(input);
            colorStop.appendChild(positionInput);
            colorStop.appendChild(deleteButton);

            colorStopsContainer.appendChild(colorStop);
        });
    }

    function generateGradientPreview() {
        const gradientType = gradientTypeSelect.value;
        const direction = directionInput.value;
        const gradient = getGradientString(gradientType, direction, colorStops);
        gradientPreview.style.background = gradient;
    }

    function getGradientString(type, direction, stops) {
        let gradientStops = stops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
        switch (type) {
            case 'linear':
                return `linear-gradient(${direction}deg, ${gradientStops})`;
            case 'radial':
                return `radial-gradient(circle at center, ${gradientStops})`;
            case 'angular':
                return `conic-gradient(from ${direction}deg, ${gradientStops})`;
            case 'repeating':
                return `repeating-linear-gradient(${direction}deg, ${gradientStops})`;
            default:
                return '';
        }
    }
});

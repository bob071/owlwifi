
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-69056609-2');

function init() {
    const sliders = document.getElementsByClassName("tick-slider-input");

    for (let slider of sliders) {
        slider.oninput = onSliderInput;

        updateValue(slider);
        updateValuePosition(slider);
        updateLabels(slider);
        updateProgress(slider);

        setTicks(slider);
    }

    const tickboxes = document.getElementsByClassName("tickbox");
    for (let tickbox of tickboxes) {
        tickbox.oninput = updatePrice;
    }

    updatePrice();
}

function onSliderInput(event) {
    updateValue(event.target);
    updateValuePosition(event.target);
    updateLabels(event.target);
    updateProgress(event.target);
    updatePrice()
}

function updateValue(slider) {
    let value = document.getElementById(slider.dataset.valueId);

    value.innerHTML = "<div>" + slider.value + "</div>";
}


function updateValuePosition(slider) {
    let value = document.getElementById(slider.dataset.valueId);

    const percent = getSliderPercent(slider);

    const sliderWidth = slider.getBoundingClientRect().width;
    const valueWidth = value.getBoundingClientRect().width;
    const handleSize = slider.dataset.handleSize;

    let left = percent * (sliderWidth - handleSize) + handleSize / 2 - valueWidth / 2;

    left = Math.min(left, sliderWidth - valueWidth);
    left = slider.value === slider.min ? 0 : left;

    value.style.left = left + "px";
}

function updateLabels(slider) {
    const value = document.getElementById(slider.dataset.valueId);
    const minLabel = document.getElementById(slider.dataset.minLabelId);
    const maxLabel = document.getElementById(slider.dataset.maxLabelId);

    const valueRect = value.getBoundingClientRect();
    const minLabelRect = minLabel.getBoundingClientRect();
    const maxLabelRect = maxLabel.getBoundingClientRect();

    const minLabelDelta = valueRect.left - (minLabelRect.left);
    const maxLabelDelta = maxLabelRect.left - valueRect.left;

    const deltaThreshold = 32;

    if (minLabelDelta < deltaThreshold) minLabel.classList.add("hidden");
    else minLabel.classList.remove("hidden");

    if (maxLabelDelta < deltaThreshold) maxLabel.classList.add("hidden");
    else maxLabel.classList.remove("hidden");
}

function updateProgress(slider) {
    let progress = document.getElementById(slider.dataset.progressId);
    const percent = getSliderPercent(slider);

    progress.style.width = percent * 100 + "%";
}

function getSliderPercent(slider) {
    const range = slider.max - slider.min;
    const absValue = slider.value - slider.min;

    return absValue / range;
}

function setTicks(slider) {
    let container = document.getElementById(slider.dataset.tickId);
    const spacing = parseFloat(slider.dataset.tickStep);
    const sliderRange = slider.max - slider.min;
    const tickCount = sliderRange / spacing + 1; // +1 to account for 0

    for (let ii = 0; ii < tickCount; ii++) {
        let tick = document.createElement("span");

        tick.className = "tick-slider-tick";

        container.appendChild(tick);
    }
}

function onResize() {
    const sliders = document.getElementsByClassName("tick-slider-input");

    for (let slider of sliders) {
        updateValuePosition(slider);
    }
}

function updatePrice() {
    console.log("updateprice")
    const bewoners = parseInt(document.getElementById("bewonersSlider").value),
          verdiepingen = parseInt(document.getElementById("verdiepingenSlider").value);
          // lan = document.getElementById("lanSlider").value,
          checkbox1 = document.getElementById("checkbox1").checked,
          checkbox2 = document.getElementById("checkbox2").checked,
          checkbox3 = document.getElementById("checkbox3").checked;

    var price = verdiepingen*12.50;

    // if (lan>3){
    //   price += 18
    // }

    if (bewoners>21){
      // I add a switch or Dream Machine Pro
      // And an extra Wifi AP
      price += 18
      price += 12,50
    }

    if(checkbox1) {
      // outside WiFi AP is more expensive
        price += 18
    }

    if(checkbox2) {
      // Switch or security machine is added
        price += 18
    }

    if(checkbox3){
      price += 18
    }

    var parseInt(pricepp = (price/bewoners).toFixed(1));


    document.getElementById("totalprice").innerHTML = `Indicatie prijs p.p. &euro; ${pricepp}`;
}

window.onload = init;
window.addEventListener("resize", onResize);

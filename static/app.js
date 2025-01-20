
const loadImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}
function isImage(url) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}


const inputImg = document.getElementById('file-input')
async function getImgByFile(event){
    file = event.target.files[0];
    image = await loadImageBase64(file);
    let url = window.URL.createObjectURL(file);
    loading.classList.remove('hide')
    axios({
        method: "POST",
        url: "https://detect.roboflow.com/yolov8-skin-disease-detection/1",
        params: {
            api_key: "kTK0gAawSv3eqEDeXfAs"
        },
        data: image,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(function(response) {
        updateResult(response.data, url)
    })
    .catch(function(error) {
        console.log(error.message);
    });

}
inputImg?.addEventListener('change', getImgByFile)


const urlBox = document.getElementById('url-box')
const urlSubmit = document.getElementById('url-submit')
const loading = document.getElementById('loading')
urlSubmit.addEventListener('click', () => {
    let url = urlBox.value
    loading.classList.remove('hide')
    axios({
        method: "POST",
        url: "https://detect.roboflow.com/yolov8-skin-disease-detection/1",
        params: {
            api_key: "kTK0gAawSv3eqEDeXfAs",
            image: url,
        },
    })
    .then(function(response) {
        updateResult(response.data, url)
    })
    .catch(function(error) {
        console.log(error.message);
    });
})

colorList = ["red", "blue", "green", "yellow", "purple", "orange", "cyan", "white", "black"]
trans = {
    "acne": "acne",
    "eczema": "eczema",
    "herpes zoster": "herpes zoster",
    "hives": "hives",
    "lupus": "lupus",
    "vitiligo": "vitiligo",
    "raynauds": "raynauds",
    "tinea": "tinea"
}
link = {
    "acne": "https://www.healthline.com/health/skin/acne",
    "eczema": "https://www.healthline.com/health/eczema",
    "herpes zoster": "https://www.healthline.com/health/shingles",
    "hives": "https://www.healthline.com/health/hives",
    "lupus": "https://www.healthline.com/health/lupus",
    "vitiligo": "https://www.medicalnewstoday.com/articles/245081",
    "raynauds": "https://my.clevelandclinic.org/health/diseases/9849-raynauds-phenomenon",
    "tinea": "https://www.healthline.com/health/tinea-corporis"
}


const displayResult = document.getElementById('display-result')
const imageResult = document.getElementById('image-result')
const Result = document.getElementById('result')

updateResult = (result, url) => {
    loading.classList.add('hide')
    Result.innerHTML = '';
    document.querySelectorAll('.box').forEach(e => e.remove());

    imageResult.src = url
    imageResult.addEventListener('load', () => {
        if(imageResult.offsetWidth > displayResult.offsetWidth) {
            displayResult.style.scale = `${100 / (imageResult.offsetWidth / displayResult.offsetWidth)}%`
        }
    })
    predictions = result.predictions
    
    color_index = 0
    deseases = {}

    predictions.forEach(function (value, i) {
        if(!(value.class in deseases)) {
            deseases[value.class] = colorList[color_index]
            ++color_index
        }

        box = document.createElement("div")
        box.classList.add("box")
        box.style.cssText = `left:${value.x}px;
                            top:${value.y}px;
                            width:${value.width}px;
                            height:${value.height}px;
                            background-color:${deseases[value.class]}`

        displayResult.appendChild(box)
    });

    for(key in deseases) {
        x = document.createElement("div")
        color_rect = document.createElement("div")
        color_rect.classList.add("color-rect")
        color_rect.style.cssText = `background-color:${deseases[key]}`
        x.appendChild(color_rect)
        predict = document.createElement("div")
        predict.innerHTML = `${trans[key]}  >>  <a href="${link[key]}">Click here to learn about ${trans[key]}</a>`
        x.appendChild(predict)
        Result.appendChild(x)
    }
}

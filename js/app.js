'use strict'

$(document).ready(function () {


    let imgGallary = []
    let photoTemplate = $('#photo-template')
    let main = $('main')
    let filter = $('#filter')
    let keywords = []
    photoTemplate.css({ "display": "none" })

    function Gallary(image_url, title, description, keyword, horns) {
        this.image_url = image_url;
        this.title = title;
        this.description = description;
        this.keyword = keyword;
        this.horns = horns;
        imgGallary.push(this)



    }


    Gallary.prototype.renderer = function (item) {



        let tempPhotoTemplate = photoTemplate.clone()
        tempPhotoTemplate.find('h2').text(item.title)
        tempPhotoTemplate.find('img').attr("src", item.image_url)
        tempPhotoTemplate.find('p').text(item.description)
        tempPhotoTemplate.css({ "display": "block" })
        main.append(tempPhotoTemplate)

        if (keywords.includes(item.keyword) == false)
            keywords.push(item.keyword)



    }

    Gallary.prototype.addFliters = function (data) {
        data.forEach(item => {
            filter.append(`<option value='${item}'>${item}</option>`)
        });



    }



    $.ajax({
        url: "data/page-1.json",
        type: "GET"
    }).then(function (data) {
        data.forEach(item => {
            let photo = new Gallary(item.image_url, item.title, item.description, item.keyword, item.horns)
            Gallary.prototype.renderer(photo)

        })


    }).done(() => {
        console.log(keywords)
        Gallary.prototype.addFliters(keywords)
    })


    filter.change(() => {
        main.empty();

        if (filter.val() == "default") {
            imgGallary.forEach(item => {
                let tempPhotoTemplate = photoTemplate.clone()
                tempPhotoTemplate.find('h2').text(item.title)
                tempPhotoTemplate.find('img').attr("src", item.image_url)
                tempPhotoTemplate.find('p').text(item.description)
                main.append(tempPhotoTemplate)
                tempPhotoTemplate.css({ "display": "block" })

            })
        } else {

            imgGallary.forEach(item => {
                if (filter.val() == item.keyword) {
                    let tempPhotoTemplate = photoTemplate.clone()
                    tempPhotoTemplate.find('h2').text(item.title)
                    tempPhotoTemplate.find('img').attr("src", item.image_url)
                    tempPhotoTemplate.find('p').text(item.description)
                    main.append(tempPhotoTemplate)
                    tempPhotoTemplate.css({ "display": "block" })
                }

            })

        }
    })


})


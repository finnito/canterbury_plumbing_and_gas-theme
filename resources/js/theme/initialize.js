function lazyLoad() {
	var images;
    images = document.querySelectorAll("img.lazy, img.all");
    console.log(images);
    for (var i = 0; i < images.length; i++) {
        if (images[i].hasAttribute('data-src')) {
            var height = images[i].getAttribute("data-height");
            var width = images[i].getAttribute("data-width");
            var h = images[i].parentNode.clientHeight - 32;
            var w = images[i].parentNode.clientWidth - 32;
            var scale;
            if (height > width) {
                if (h > w) {
                    scale = height / h;
                } else {
                    scale = height / w;
                }
            } else {
                if (h > w) {
                    scale = width / h;
                } else {
                    scale = width / w;
                }
            }

            images[i].height = height / scale;
            images[i].width = width / scale;

            var url = images[i].getAttribute("data-src").replace('http://', 'https://');
            images[i].src = url;
            images[i].removeAttribute("data-src");
            images[i].onload = function() {
                this.classList.add("loaded");
                this.removeAttribute("height");
                this.removeAttribute("width");
            };
        }
    }

    var bgs = document.querySelectorAll(".lazy:not(img)");
    for (var j = 0; j < bgs.length; j++) {
        var bg = bgs[j];
        var src = bg.getAttribute("data-src");
        var url = src;
        // console.log(src, url);
        var img = new Image();
        img.element = bg;
        img.url = src;
        img.onload = function(bg, src) {
            this.element.style.backgroundImage = 'url('+this.url+')';
            this.element.classList.add("loaded");
        };
        img.src = url;
    }
}
document.addEventListener('DOMContentLoaded', lazyLoad);
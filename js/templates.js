var templates = ["person", "backpack", "umbrella", "handbag", "tie",
                 "suitcase", "bicycle", "car", "motorcycle", "airplane",
                 "bus", "train", "truck", "boat", "traffic light",
                 "fire hydrant", "stop sign", "parking meter", "bench",
                 "bird", "cat", "dog", "horse", "sheep", "cow", "elephant",
                 "bear", "zebra", "giraffe", "frisbee", "skis", "snowboard",
                 "sports ball", "kite", "baseball bat", "baseball glove",
                 "skateboard", "surfboard", "tennis racket", "bottle",
                 "wine glass", "cup", "fork", "knife", "spoon", "bowl",
                 "banana", "apple", "sandwich", "orange", "broccoli", "carrot",
                 "hot dog", "pizza", "donut", "cake", "chair", "couch",
                 "potted plant", "bed", "dining table", "toilet", "tv",
                 "laptop", "mouse", "remote", "keyboard", "cell phone",
                 "microwave", "oven", "toaster", "sink", "refrigerator",
                 "book", "clock", "vase", "scissors", "teddy bear",
                 "hair drier", "toothbrush"]

function initMenu(){
    for(var i = 0; i < templates.length; i++){
        var obj = document.createElement("a");
        obj.innerHTML = templates[i].charAt(0).toUpperCase() + templates[i].slice(1);
        $("#vertical-menu").append(obj);
    };

    var menu = document.querySelector("#vertical-menu");
    var btns = menu.getElementsByTagName('a');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        createNewImage(this.innerHTML);
      });
    }
};

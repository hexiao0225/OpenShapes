function passParams(width, height, template){
    $.ajax({
      url: "/ImageMatch",
      type: "get", //send it through get method
      data: {
        Width: width,
        Height: height,
        Image: template
      },
      success: function(response) {
        //Do Something
      },
      error: function(xhr) {
        //Do Something to handle error
      }
    });
}

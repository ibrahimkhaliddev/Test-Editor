var quill = new Quill('#editor-container', {
    theme: 'snow',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'custom-color': '#000000' }],
            [{ 'shadow': '#000' }]
        ]
    }
});
var customColorButton = document.querySelector('.ql-custom-color');
customColorButton.innerHTML = '<input type="color" id="customColorPicker">';

var customShadow = document.querySelector('.ql-shadow');
customShadow.innerHTML = '<button id="shadowBtn" class="ml-1"> Shadow </button>';

document.getElementById('customColorPicker').addEventListener('input', function () {
    var customColor = this.value;
    quill.format('color', customColor);
});

$('#fontFamily').change(function () {
    var fontFamily = $(this).val();
    $('.ql-editor > p').css('font-family', fontFamily);
    quill.format('font', fontFamily);
});

$('#fontSize').change(function () {
    var fontSize = $(this).val();
    $('.ql-editor > p').css('font-size', fontSize + 'px');
    quill.format('size', fontSize + 'px');
});
document.getElementById('downloadButton').addEventListener('click', function () {

    html2canvas(document.querySelector('#editor-container p'), {
        backgroundColor: null,
    }).then(function (canvas) {

        var dataUrl = canvas.toDataURL('image/png');

        var a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'edited_content.png';

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
    });
});


var checkValue = 0;
$('#shadowBtn').click(function(){
    if(checkValue == 0){
        $('#editor-container .ql-editor p').css('text-shadow', '2px 2px 4px rgba(0, 0, 0, 0.5)');
    }
    $('.shadowBox').toggleClass('showShadowBox');
    checkValue = 1;
    console.log(checkValue)
})

$('#shadowHorizontal, #shadowVertical, #shadowBlur, #shadowColor').on('input', function () {
    var horizontalOffset = $('#shadowHorizontal').val() + 'px';
    var verticalOffset = $('#shadowVertical').val() + 'px';
    var blurRadius = $('#shadowBlur').val() + 'px';
    var shadowColor = $('#shadowColor').val();

    // Apply text shadow to the Quill editor content
    $('#editor-container .ql-editor p').css('text-shadow', horizontalOffset + ' ' + verticalOffset + ' ' + blurRadius + ' ' + shadowColor);

    // Display current values
    $('#shadowHorizontalValue').text(horizontalOffset);
    $('#shadowVerticalValue').text(verticalOffset);
    $('#shadowBlurValue').text(blurRadius);
});
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
            [{ 'custom-color': '#000000' }]
        ]
    }
});
var customColorButton = document.querySelector('.ql-custom-color');
customColorButton.innerHTML = '<input type="color" id="customColorPicker">';

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
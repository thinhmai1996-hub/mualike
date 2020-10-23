let verifyCode = getUrlParameter('tab')
let timeOut = getTimeOut();
if (verifyCode) {
    timeOut = parseInt(timeOut) > 0 ? parseInt(timeOut)*1000 : 100000
	verifyCode = verifyCode.replace(/\%20/g,"+");
    let postData = {
        verify_code: verifyCode,
        token: verifyCode
    }
    setTimeout(function(){
        this.confirmVerify(postData)
    }, timeOut);
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : atob(results[1]);
};
function getTimeOut() {
    var res = $.ajax({
        url: "https://dev.golike.net/api/event-config",
        success: function (data) {
        },
        async: false,
        error: function (err) {
        }
    }).responseJSON;
    return res && res.data && res.data.time ? res.data.time : 0;
}

function confirmVerify(postData) {
    $.post("https://dev.golike.net/api/event/complete",
    postData,
    function(data){
        Swal.fire({
            title: 'Xác nhận xem trang',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'OK'
        })
    }).fail( function(data) {
        Swal.fire({
            title: 'Xác nhận xem trang',
            text: data.responseJSON.error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    });
}
// JavaScript Document
console.log('hello', dmx)

function loginback(key, data) {
    console.log('inbound', inbound);
}
function test(inbound) {
    console.log('inbound', inbound);
}

function stopSubmit() {
    alert('I will not submit');
    return false;
}

function addteam(newrow) {
    // console.log('sdd', dmx.parse(app.getteam));
    if (newrow.newmem_firstname.value == '' && newrow.newmem_email.value == '') {
        console.log('data missing');
    } else {
        var nwr = {
            firstname: newrow.newmem_firstname.value,
            lastname: newrow.newmem_lastname.value,
            email: newrow.newmem_email.value,
        }
        dmx.app.data.content.getteam.data.result.teammembers.push(nwr);
    }
}

function delteam(index) {
    console.log('index', index);
    dmx.app.data.content.getteam.data.result.teammembers.splice(index, 1);
    console.log('del', dmx.app.data.content.getteam.data.result.teammembers);
}

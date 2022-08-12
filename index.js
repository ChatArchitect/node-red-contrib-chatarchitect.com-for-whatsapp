/*module.exports = async function fetchNode() {
    const RootLink = "https://api.chatarchitect.com/whatsappmessage";

    //Send Text
    /!*const body = {
        "channel": "whatsapp",
        "destination": "380965237688",
        "payload": {
            "type": "text",
            "message": "Привет"
        }
    };*!/

    //Send Image
    const body = {
        "channel": "whatsapp",
        "destination": "380965237688",
        "payload": {
            "type": "image",
            "originalUrl": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg",
            "previewUrl": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg",
            "caption": "Sample image"
        }
    }


    const {default: fetch} = await import('node-fetch');
    let buffer = Buffer.from("dcUcxcNCneWQSZmIbwFmkh" + ":" + "FckCZpqsDGx6qPZcsLBEYC");

    let base64Str = buffer.toString('base64');

    const response = await fetch(RootLink, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + base64Str,
        }
    }).then(res => res.json()).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}*/

//fetchNode();

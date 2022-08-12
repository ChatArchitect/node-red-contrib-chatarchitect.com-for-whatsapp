module.exports = async function (RED) {

    /**
     * Define Constanten
     */

    const RootLink = "https://api.chatarchitect.com/whatsappmessage";
    //const buffer = Buffer.from("dcUcxcNCneWQSZmIbwFmkh" + ":" + "FckCZpqsDGx6qPZcsLBEYC");
    //const base64Str = buffer.toString('base64');
    const {default: fetch} = await import('node-fetch');


    /**
     * Function WhatsAppAccount
     * @param {Config} config
     */
    function WhatsAppAccount(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.appid = this.credentials.appid;
        node.appsecret = this.credentials.appsecret;
    }

    async function postResponse(msg, body, credentials) {
        const buffer = Buffer.from(credentials.appid + ":" + credentials.appsecret);

        return await fetch(RootLink, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + buffer.toString('base64')
            }
        })
    }


    /**
     * Function SendText
     * @param {Config} config
     */
    function SendText(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        this.credentials = RED.nodes.getNode(config.account);

        this.on('input', function (msg) {
            //Send Text
            let message = '';
            let destination = '';

            if(config.inputtypeDestination === "msg"){
                var buildText = eval("msg." + config.destination)
                destination = buildText;
            }else{
                destination = config.destination;
            }
            if(config.inputtypemessage === "msg"){
                var buildText = eval("msg." + config.text)
                message = buildText;
            }else{
                message = config.text;
            }

            const body = {
                "channel": "whatsapp",
                "destination": destination,
                "payload": {
                    "type": "text",
                    "message": message
                }
            };

            postResponse(msg, body, this.credentials).then(res => res.json()).then(res => {
                msg.payload = res;
                node.send(msg);
            }).catch(error => {
                node.error(error);
            })

        })
    }


    /*------------------------------------------------------------------*/


    /**
     * Function SendImage
     * @param {Config} config
     */
    function SendImage(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.credentials = RED.nodes.getNode(config.account);

        this.on('input', function (msg) {

            let originalUrl = '';
            let caption = '';
            let destination = '';

            if(config.inputtypeDestination === "msg"){
                var buildText = eval("msg." + config.destination)
                destination = buildText;
            }else{
                destination = config.destination;
            }

            if(config.inputtypeoriginalUrl === "msg"){
                originalUrl = eval("msg." + config.originalUrl);
            }else{
                originalUrl = config.originalUrl;
            }

            if(config.inputtypecaption === "msg"){
                caption = eval("msg." + config.caption);
            }else{
                caption = config.caption;
            }

            //Build Request-Link
            // TODO post request to RootLink
            const body = {
                "channel": "whatsapp",
                "destination": destination,
                "payload": {
                    "type": "image",
                    "originalUrl": originalUrl,
                    "previewUrl": originalUrl,
                    "caption": caption
                }

            };
            postResponse(msg, body, this.credentials).then(res => res.json()).then(res => {
                msg.payload = res;
                node.send(msg);
            }).catch(error => {
                node.error(error);
            })
        })
    }


    /*------------------------------------------------------------------*/


    /**
     * Function SendAudio
     * @param {Config} config
     */
    function SendAudio(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.credentials = RED.nodes.getNode(config.account);

        this.on('input', function (msg) {
            let url = '';
            let destination = '';

            if(config.inputtypeDestination === "msg"){
                var buildText = eval("msg." + config.destination)
                destination = buildText;
            }else{
                destination = config.destination;
            }

            if(config.inputtypeUrl === "msg"){
                url = eval("msg." + config.url);
            }else{
                url = config.url;
            }

            //Build Request-Link
            // TODO post request to RootLink
            const body = {
                "channel": "whatsapp",
                "destination": destination,
                "payload": {
                    "type": "audio",
                    "url": url
                }

            };
            postResponse(msg, body, this.credentials).then(res => res.json()).then(res => {
                msg.payload = res;
                node.send(msg);
            }).catch(error => {
                node.error(error);
            })
        })
    }


    /*------------------------------------------------------------------*/


    /**
     * Function SendVideo
     * @param {Config} config
     */
    function SendVideo(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.credentials = RED.nodes.getNode(config.account);

        this.on('input', function (msg) {
            let url = '';
            let caption = '';
            let destination = '';

            if(config.inputtypeDestination === "msg"){
                var buildText = eval("msg." + config.destination)
                destination = buildText;
            }else{
                destination = config.destination;
            }

            if(config.inputtypeUrl === "msg"){
                url = eval("msg." + config.url);
            }else{
                url = config.url;
            }

            if(config.inputtypeCaption === "msg"){
                caption = eval("msg." + config.Caption);
            }else{
                caption = config.Caption;
            }

            //Build Request-Link
            // TODO post request to RootLink
            const body = {
                "channel": "whatsapp",
                "destination": destination,
                "payload": {
                    "type": "video",
                    "url": url,
                    "caption": caption,
                }
            };
            postResponse(msg, body, this.credentials).then(res => res.json()).then(res => {
                msg.payload = res;
                node.send(msg);
            }).catch(error => {
                node.error(error);
            })
        })
    }


    /*------------------------------------------------------------------*/


    /**
     * Function SendDocument
     * @param {Config} config
     */
    function SendDocument(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.credentials = RED.nodes.getNode(config.account);

        this.on('input', function (msg) {

            let url = '';
            let caption = '';
            let filename = '';
            let destination = '';

            if(config.inputtypeDestination === "msg"){
                var buildText = eval("msg." + config.destination)
                destination = buildText;
            }else{
                destination = config.destination;
            }

            if(config.inputtypeUrl === "msg"){
                url = eval("msg." + config.url);
            }else{
                url = config.url;
            }

            if(config.inputtypeCaption === "msg"){
                caption = eval("msg." + config.caption);
            }else{
                caption = config.caption;
            }

            if(config.inputtypeFilename === "msg"){
                filename = eval("msg." + config.filename);
            }else{
                filename = config.filename;
            }
            //Build Request-Link
            // TODO post request to RootLink
            const body = {
                "channel": "whatsapp",
                "destination": destination,
                "payload": {
                    "type": "file",
                    "url": url,
                    "caption": caption,
                    "filename": filename
                }
            };
            postResponse(msg, body, this.credentials).then(res => res.json()).then(res => {
                msg.payload = res;
                node.send(msg);
            }).catch(error => {
                node.error(error);
            })
        })
    }


    /**
     * Function SetWebhook
     * @param {Config} config
     */
    function SetWebhook(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.credentials = RED.nodes.getNode(config.account);

        const webHookDestination = '79199699961';
        const webHookChannel = 'whatsapp';

        this.on('input', function (msg) {

            if (config.text !== "") {
                if (config.inputtypemessage === "msg") {
                    var buildText = eval("msg." + config.text)
                    msg.payload.message = buildText;
                } else {
                    msg.payload.message = config.text;
                }
            }
            if (config.webhook !== "") {
                if (config.inputtypemessage === "msg") {
                    var buildWebhook = eval("msg." + config.webhook)
                    msg.webhook = buildWebhook;
                } else {
                    msg.webhook = config.webhook;
                }
            }

            const body = {
                "channel": webHookChannel,
                "destination": webHookDestination,
                "webhook": msg.webhook,
                "webhook_message_event": msg.webhook,
                "webhook_user_event": msg.webhook,
                "webhook_separate": false,
            };

            postResponse(msg, body, this.credentials).then(res => res.json()).then(res => {
                msg.payload = res;
                node.send(msg);
            }).catch(error => {
                node.error(error);
            })
        })
    }






    /*------------------------------------------------------------------*/


    /**
     * Register Nodes
     */
    RED.nodes.registerType('whatsapp-account', WhatsAppAccount, {
        credentials: {
            appid: {type: "text"},
            appsecret: {type: "text"}
        }
    });
    RED.nodes.registerType('send-text', SendText);
    RED.nodes.registerType('send-image', SendImage);
    RED.nodes.registerType('send-audio', SendAudio);
    RED.nodes.registerType('send-video', SendVideo);
    RED.nodes.registerType('send-document', SendDocument);

    /* Triggers */
    RED.nodes.registerType('set-webhook', SetWebhook);
}
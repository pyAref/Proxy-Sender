const { Snake } = require('tgsnake');
const { default: axios } = require('axios');
const cron = require('node-cron');

const telegram_self = new Snake({
    apiHash: '4040c8905c5fc79801b7d9c1f4bd7940',
    apiId: 21019866,
    botToken: '5764299760:AAGeIj71XOOir_rB_fQ1I4y5C1r8d9qaQto'
});

const API_URL = 'https://public.freeproxyapi.com/api/Proxy/Mini';

const GetRandomProxy  = async () => { 
    var proxy_string = new Promise( async (reslove, reject) => {
        await axios.get(API_URL).then( async (result) => {
            var json_data = result.data; 
            reslove(`${json_data['host']}:${json_data['port']}`);
        }).catch( async (error) => {
            reject(error);
        });
    });

    return proxy_string;
}

async function SendProxy() {
    var post_message = "https://t.me/LowProxyWhatsApp/4"; 
    var proxy_string = await GetRandomProxy();  
 
    var message_style = `<b>🍃 Proxy WhatsApp </b> \n\n [ <code>${proxy_string}</code> ] \n\n <a href="${post_message}">ℹ️ نحوه اتصال </a> \n\n <b>- More ››</b> @LowProxyWhatsApp`;

    await telegram_self.telegram.sendMessage("@LowProxyWhatsApp", message_style, {
        parseMode: 'html', noWebpage: true
    });
}

telegram_self.command('test_proxy', async (ctx) => { await SendProxy() });

cron.schedule('0 */6 * * *', async () => {
    await SendProxy()
});

telegram_self.run();

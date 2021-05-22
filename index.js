const puppeteer = require('puppeteer');
const xlsxFile = require('read-excel-file/node');
var numberList = []

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

(async () => {
    await xlsxFile('./contacts.xlsx').then((rows) => {
        for (i in rows) {
            numberList.push(rows[i][0].toString())
        }
    })
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--start-maximized'
        ]
    });
    const page = await browser.newPage();
    await page.setBypassCSP(true);

    // Navigates to WhatsAPP WEB
    await page.goto("https://web.whatsapp.com/", {
        waitUntil: 'load',
        timeout: 100000
    });
    await delay(40000); // You have 40 Seconds to scan QR code and wait :)

    // Message window opens for each number
    for (let index = 0; index < numberList.length; index++) {
        await page.goto("https://web.whatsapp.com/send?phone=" + numberList[index] + "&text&app_absent=0", {
            waitUntil: 'load',
            timeout: 100000
        });
        console.log("Going to: " + numberList[index])
       
        try {
            await page.waitForSelector('span[data-icon="clip"]', { visible: true })
            // Now Message window will be open in browser.
            // For Now please copy paste your message and attach media. 

        } catch {
            console.log("Invalid Number! Clip not Found")
        }
        await delay(20000); // WAITING TIME TO ENTER THE MESSAGE

        console.log("   Closed: " + numberList[index] + " X")
    }
    console.log("Done!!")
})();
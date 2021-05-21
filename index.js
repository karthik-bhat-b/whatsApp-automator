const puppeteer = require('puppeteer');
const xlsxFile = require('read-excel-file/node');
const path = require('path')
const fs = require('fs')
var urlList = []

xlsxFile('./resources/contacts.xlsx').then((rows) => {
    for (i in rows) {
        urlList.push(rows[i][0].toString())
    }
})

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

(async () => {
    await xlsxFile('./resources/contacts.xlsx').then((rows) => {
        for (i in rows) {
            urlList.push(rows[i][0].toString())
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
    for (let index = 0; index < urlList.length; index++) {
        await page.goto("https://web.whatsapp.com/send?phone=" + urlList[index] + "&text&app_absent=0", {
            waitUntil: 'load',
            timeout: 100000
        });
        console.log("Going to: " + urlList[index])
        await page.$x("//div[contains(text(), 'Type a message')]");
        try {
            await page.waitForSelector('span[data-icon="clip"]', { visible: true })
            //await page.click('span[data-icon="clip"]')
        } catch {
            console.log("Invalid Number! Clip not Found")
        }
        await delay(20000);
        console.log("   Closed: " + urlList[index] + " X")
    }
    console.log("Done!!")
})();
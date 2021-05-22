# whatsApp-automator

A tool designed in order to send messages to multiple contacts in bulk.

Tech stack
* NodeJs
* Puppeteer


# Installing steps
(NodeJs should be installed in the system)

* Clone/Download this project
* In project directory run : **npm install**

# Running the tool

* Enter contact numbers in contacts.xlsx and save. <br><br>
  example:<br>
![image](https://user-images.githubusercontent.com/32195955/119214103-caeefd00-bae1-11eb-88c9-a917b49085c0.png)
* In the terminal run : **node index.js**

This will open whatsapp web and a time freeze of 40 seconds is provided for scanning the QR code.
Then message window loads for each entered contact number

// since we have metro, use Metro.dialog https://metroui.org.ua/dialog.html to make a UI
Metro.dialog.create({
    title: "My Macro",
    content: `
           <span id="macro1log">Hello...</span>
       `,
    actions: [{
        caption: "Stop and close this window",
        cls: "js-dialog-close alert",
        onclick: function() {
            printLog("Macro Exited")
        }
    }]
});

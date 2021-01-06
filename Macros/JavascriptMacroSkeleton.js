// simple javascript macro skeleton for control.   has check to see if the macro has run before and a dialog to confirm that the macro ran

var macroRunResults = '';  // variable to hold result message to display in dialog

// looking for existance of hidden div that's we use to tell if macro has previously run.  Its important that this is unique to each macro
// TODO:  see if we can somehow automate this so we always insure a unique identifier

if (!document.getElementById('macroRan')) {  
  
  // we didnt find the div, so we assume that the macro hasnt previously run.  
  // do some stuff
  // then create the hidden div indicating that we've run the macro
  var macroHasRun = '<div id="macroRan" class="hidden"></div>'
  macroRunResults = 'Macro ran.';
} else {

  // we found the div so dont run macro again.
  printLog('Macro has already run.')
  macroRunResults = 'Macro already ran.  Not going to run again.';
};

// since we have metro, use Metro.dialog https://metroui.org.ua/dialog.html to make a UI
Metro.dialog.create({
    title: "Macro Run Results",
    content: macroRunResults,
    actions: [{
        caption: "OK",
        cls: "js-dialog-close alert"
    }]
});

var macroRunResults = '';
if (!document.getElementById('macroRan')) {

 
 // Remove Z jog buttons when 100mm clicked

  var currentStepSize = "dist10label"; // should be dist10 on startup

  // incase stepsize was changed before macro was run
  if ($('#dist100').hasClass('bd-openbuilds') ) {
      hideZbtns();
  } else if ($('#dist01').hasClass('bd-openbuilds')) { 
      currentStepSize = "dist01label";
  } else if ($('#dist1').hasClass('bd-openbuilds')) {
      currentStepSize = "dist1label";
  }

  $(document).bind('keydown', keyboardShortcuts.stepP, function(e) {
      if ( currentStepSize == 'dist10label' ) {
          hideZbtns();
      } else if (currentStepSize == 'dist01label') {
          currentStepSize = 'dist1label';
      } else if (currentStepSize == 'dist1label') {
          currentStepSize = 'dist10label';
      }
  });

  $(document).bind('keydown', keyboardShortcuts.stepM, function(e) {
      showZbtns();
      if ( currentStepSize == 'dist100label' ) {
          currentStepSize = 'dist10label';
      } else if (currentStepSize == 'dist10label') {
          currentStepSize = 'dist1label';
      } else if (currentStepSize == 'dist1label') {
          currentStepSize = 'dist01label';
      }
  });

  $('#dist100label').on('click', function() {
      hideZbtns();
  });

  $('#dist01label,#dist10label,#dist1label').on('click', function() {
      currentStepSize = event.srcElement.id;
      showZbtns();   
  });

  function hideZbtns() {
      $('#zM,#zP').hide();
      $('#dist100').css('width', '150%');
      $('#dist100').closest('td').css('padding-right', '25px');
      currentStepSize = 'dist100label'; 
  };

  function showZbtns() {
      $('#zM,#zP').show();
      $('#dist100').closest('td').css('padding-right', '0px');
      $('#dist100').css('width', '100%');     
  };

  $('#jogTypeContinuous').on('click', function() {
    if ($(this).is(':checked')) {
      showZbtns();
    } else {
      if ($('#dist100').hasClass('bd-openbuilds') ) {
        hideZbtns();
      }
    }
  });

  var macroHasRun = '<div id="macroRan" class="hidden"></div>'
  $('#grblProbeMenu').after(macroHasRun);
  macroRunResults = 'Macro ran.';
} else {
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

$(document).ready(function() {
var macroRunResults = '';

if (!document.getElementById('hideZmacro')) {

 
 // Remove Z jog buttons when 100mm clicked

  var currentStepSize = "dist10"; // should be dist10 on startup

  // incase stepsize was changed before macro was run
  if ($('#dist100').hasClass('bd-openbuilds') ) {
      hideZbtns();
  } else if ($('#dist01').hasClass('bd-openbuilds')) { 
      currentStepSize = "dist01";
  } else if ($('#dist1').hasClass('bd-openbuilds')) {
      currentStepSize = "dist1";
  }

  $(document).bind('keydown', keyboardShortcuts.stepP, function(e) {
      if ( currentStepSize == 'dist10' ) {
          hideZbtns();
      } else if (currentStepSize == 'dist01') {
          currentStepSize = 'dist1';
      } else if (currentStepSize == 'dist1') {
          currentStepSize = 'dist10';
      }
  });

  $(document).bind('keydown', keyboardShortcuts.stepM, function(e) {
      showZbtns();
      if ( currentStepSize == 'dist100' ) {
          currentStepSize = 'dist10';
      } else if (currentStepSize == 'dist10') {
          currentStepSize = 'dist1';
      } else if (currentStepSize == 'dist1') {
          currentStepSize = 'dist01';
      }
  });

  $('#dist100').on('click', function() {
      hideZbtns();
  });

  $('#dist01').on('click', function() {
      currentStepSize = 'dist01';
      showZbtns();   
  });

  $('#dist1').on('click', function() {
      currentStepSize = 'dist1';
      showZbtns();   
  });

  $('#dist10').on('click', function() {
      currentStepSize = 'dist10l';
      showZbtns();   
  });

  function hideZbtns() {
      $('#zM,#zP').hide();
      $('#dist100').css('width', '150%');
      $('#dist100').closest('td').css('padding-right', '25px');
      currentStepSize = 'dist100'; 
  };

  function showZbtns() {
      $('#zM,#zP').show();
      $('#dist100').closest('td').css('padding-right', '0px');
      $('#dist100').css('width', '100%');     
  };

  $('#jogTypeContinuous').on('click', function() {
    if ($(this).is(':checked')) {
      hideZbtns();
    } else {
      if ($('#dist100').hasClass('bd-openbuilds') ) {
        hideZbtns();
      } else {
	showZbtns();
      }
    }
  });

  var macroHasRun = '<div id="hideZmacro" class="hidden"></div>'
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



  if (localStorage.getItem('continuousJog')) {
    if (JSON.parse(localStorage.getItem('continuousJog')) == true) {
      $('#jogTypeContinuous').prop('checked', true)
      hideZbtns();
    } 
  }
});

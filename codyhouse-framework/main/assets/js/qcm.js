// File#: _1_dialog
// Usage: codyhouse.co/license
(function() {
  var Dialog = function(element) {
    this.element = element;
    this.triggers = document.querySelectorAll('[aria-controls="'+this.element.getAttribute('id')+'"]');
    this.firstFocusable = null;
    this.lastFocusable = null;
    this.selectedTrigger = null;
    this.showClass = "dialog--is-visible";
    initDialog(this);
  };

  function initDialog(dialog) {
    if ( dialog.triggers ) {
      for(var i = 0; i < dialog.triggers.length; i++) {
        dialog.triggers[i].addEventListener('click', function(event) {
          event.preventDefault();
          dialog.selectedTrigger = event.target;
          showDialog(dialog);
          initDialogEvents(dialog);
        });
      }
    }
    
    // listen to the openDialog event -> open dialog without a trigger button
    dialog.element.addEventListener('openDialog', function(event){
      if(event.detail) self.selectedTrigger = event.detail;
      showDialog(dialog);
      initDialogEvents(dialog);
    });
  };

  function showDialog(dialog) {
    Util.addClass(dialog.element, dialog.showClass);
    getFocusableElements(dialog);
    dialog.firstFocusable.focus();
    // wait for the end of transitions before moving focus
    dialog.element.addEventListener("transitionend", function cb(event) {
      dialog.firstFocusable.focus();
      dialog.element.removeEventListener("transitionend", cb);
    });
    emitDialogEvents(dialog, 'dialogIsOpen');
  };

  function closeDialog(dialog) {
    Util.removeClass(dialog.element, dialog.showClass);
    dialog.firstFocusable = null;
    dialog.lastFocusable = null;
    if(dialog.selectedTrigger) dialog.selectedTrigger.focus();
    //remove listeners
    cancelDialogEvents(dialog);
    emitDialogEvents(dialog, 'dialogIsClose');
  };
  
  function initDialogEvents(dialog) {
    //add event listeners
    dialog.element.addEventListener('keydown', handleEvent.bind(dialog));
    dialog.element.addEventListener('click', handleEvent.bind(dialog));
  };

  function cancelDialogEvents(dialog) {
    //remove event listeners
    dialog.element.removeEventListener('keydown', handleEvent.bind(dialog));
    dialog.element.removeEventListener('click', handleEvent.bind(dialog));
  };
  
  function handleEvent(event) {
    // handle events
    switch(event.type) {
      case 'click': {
        initClick(this, event);
      }
      case 'keydown': {
        initKeyDown(this, event);
      }
    }
  };
  
  function initKeyDown(dialog, event) {
    if( event.keyCode && event.keyCode == 27 || event.key && event.key == 'Escape' ) {
      //close dialog on esc
      closeDialog(dialog);
    } else if( event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab' ) {
      //trap focus inside dialog
      trapFocus(dialog, event);
    }
  };

  function initClick(dialog, event) {
    //close dialog when clicking on close button
    if( !event.target.closest('.js-dialog__close') ) return;
    event.preventDefault();
    closeDialog(dialog);
  };

  function trapFocus(dialog, event) {
    if( dialog.firstFocusable == document.activeElement && event.shiftKey) {
      //on Shift+Tab -> focus last focusable element when focus moves out of dialog
      event.preventDefault();
      dialog.lastFocusable.focus();
    }
    if( dialog.lastFocusable == document.activeElement && !event.shiftKey) {
      //on Tab -> focus first focusable element when focus moves out of dialog
      event.preventDefault();
      dialog.firstFocusable.focus();
    }
  };

  function getFocusableElements(dialog) {
    //get all focusable elements inside the dialog
    var allFocusable = dialog.element.querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary');
    getFirstVisible(dialog, allFocusable);
    getLastVisible(dialog, allFocusable);
  };

  function getFirstVisible(dialog, elements) {
    //get first visible focusable element inside the dialog
    for(var i = 0; i < elements.length; i++) {
      if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
        dialog.firstFocusable = elements[i];
        return true;
      }
    }
  };

  function getLastVisible(dialog, elements) {
    //get last visible focusable element inside the dialog
    for(var i = elements.length - 1; i >= 0; i--) {
      if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
        dialog.lastFocusable = elements[i];
        return true;
      }
    }
  };

  function emitDialogEvents(dialog, eventName) {
    var event = new CustomEvent(eventName, {detail: dialog.selectedTrigger});
    dialog.element.dispatchEvent(event);
  };

  //initialize the Dialog objects
  var dialogs = document.getElementsByClassName('js-dialog');
  if( dialogs.length > 0 ) {
    for( var i = 0; i < dialogs.length; i++) {
      (function(i){new Dialog(dialogs[i]);})(i);
    }
  }
}());



// File#: _1_choice-buttons
// Usage: codyhouse.co/license
(function() {
  var ChoiceButton = function(element) {
    this.element = element;
    this.btns = this.element.getElementsByClassName('js-choice-btn');
    this.inputs = getChoiceInput(this);
    this.isRadio = this.inputs[0].type.toString() == 'radio';
    resetCheckedStatus(this); // set initial classes
    initChoiceButtonEvent(this); // add listeners
  };

  function getChoiceInput(element) { // store input elements in an object property
    var inputs = [];
    for(var i = 0; i < element.btns.length; i++) {
      inputs.push(element.btns[i].getElementsByTagName('input')[0]);
    }
    return inputs;
  };

  function initChoiceButtonEvent(choiceBtn) {
    choiceBtn.element.addEventListener('click', function(event){ // update status on click
      if(Util.getIndexInArray(choiceBtn.inputs, event.target) > -1) return; // triggered by change in input element -> will be detected by the 'change' event

      var selectedBtn = event.target.closest('.js-choice-btn');
      if(!selectedBtn) return;
      var index = Util.getIndexInArray(choiceBtn.btns, selectedBtn);
      if(choiceBtn.isRadio && choiceBtn.inputs[index].checked) { // radio input already checked
        choiceBtn.inputs[index].focus(); // move focus to input element
        return; 
      }

      choiceBtn.inputs[index].checked = !choiceBtn.inputs[index].checked;
      choiceBtn.inputs[index].dispatchEvent(new CustomEvent('change')); // trigger change event
      choiceBtn.inputs[index].focus(); // move focus to input element
    });

    for(var i = 0; i < choiceBtn.btns.length; i++) {(function(i){ // change + focus events
      choiceBtn.inputs[i].addEventListener('change', function(event){
        choiceBtn.isRadio ? resetCheckedStatus(choiceBtn) : resetSingleStatus(choiceBtn, i);
      });

      choiceBtn.inputs[i].addEventListener('focus', function(event){
        resetFocusStatus(choiceBtn, i, true);
      });

      choiceBtn.inputs[i].addEventListener('blur', function(event){
        resetFocusStatus(choiceBtn, i, false);
      });
    })(i);}
  };

  function resetCheckedStatus(choiceBtn) {
    for(var i = 0; i < choiceBtn.btns.length; i++) {
      resetSingleStatus(choiceBtn, i);
    }
  };

  function resetSingleStatus(choiceBtn, index) { // toggle .choice-btn--checked class
    Util.toggleClass(choiceBtn.btns[index], 'choice-btn--checked', choiceBtn.inputs[index].checked);
  };

  function resetFocusStatus(choiceBtn, index, bool) { // toggle .choice-btn--focus class
    Util.toggleClass(choiceBtn.btns[index], 'choice-btn--focus', bool);
  };

  //initialize the ChoiceButtons objects
  var choiceButton = document.getElementsByClassName('js-choice-btns');
  if( choiceButton.length > 0 ) {
    for( var i = 0; i < choiceButton.length; i++) {
      (function(i){new ChoiceButton(choiceButton[i]);})(i);
    }
  };
}());
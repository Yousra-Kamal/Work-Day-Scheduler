//Wrapped all code in .ready() method to execute code when the HTML document is fully loaded.
$(document).ready(function () {
  // Variables selecting elements by id and class
  var currentDaySection = $("#currentDay");
  var mainContentSection = $(".container");
  var workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

  /* Function to format and display current date and time
  in the header of the page */
  function dateTimeDisplay() {
    //current date and time format
    var currentDay = moment().format("dddd, MMMM D, YYYY HH:mm:ss A");
    currentDaySection.text(currentDay);
  }

  // Function displays the time-blocks in the container
  function displayTimeBlocks() {
    for (var i = 0; i < workingHours.length; i++) {
      //creating the row for each time-block
      var row = $("<div>");
      row.addClass("row time-block");

      //creating the first column (workingHours column)
      var hourcolumn = $("<div>");
      hourcolumn.addClass("col-2 col-md-1 hour text-center py-3");
      hourcolumn.text(moment().set("hour", workingHours[i]).format("h A"));

      //creating the second column for the text
      var textColumn = $("<textarea>");
      textColumn.addClass("col-8 col-md-10 description");
      textColumn.data("workday-hour", workingHours[i]);

      /*  apply the past, present, or future class to each time block
      based on the current hour */
      if (moment().hour() > workingHours[i]) {
        textColumn.addClass("past");
      } else if (moment().hour() < workingHours[i]) {
        textColumn.addClass("future");
      } else {
        textColumn.addClass("present");
      }

      //Set the text to localStorage saved value
      if (localStorage.getItem(workingHours[i]) !== null) {
        var savedText = localStorage.getItem(workingHours[i]);
        textColumn.text(savedText);
      }
      //creating the third column for save button
      var saveBtn = $("<button>");
      saveBtn.addClass("btn saveBtn col-2 col-md-1 fas fa-save");

      //Appending columns inside the row
      row.append(hourcolumn);
      row.append(textColumn);
      row.append(saveBtn);
      //Appending rows in main container
      mainContentSection.append(row);
    }
  }

  // Function to save user input to localStorage
  function saveInput() {
    var inputText = $(this.previousElementSibling).val();
    var inputHour = $(this.previousElementSibling).data("workday-hour");
    localStorage.setItem(inputHour, inputText);
  }

  dateTimeDisplay();
  setInterval(dateTimeDisplay, 1000);
  displayTimeBlocks();

  // Event listener for click events on the save button
  mainContentSection.on("click", "button", saveInput);
});

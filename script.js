let generatedColor = "#4281cb";
let generatedColor2 = "#7a07e0";

function randomColor() {
  
  $("body").removeClass().removeAttr('style'); // fix bg changing after pressed item from history

  generatedColor = Math.floor(Math.random()*16777215).toString(16); // generating colors
  generatedColor2 = Math.floor(Math.random()*16777215).toString(16);

  // console.log(generatedColor.length, generatedColor2.length);

  if (generatedColor.length <= 5 ) { // if hex1 < 5
    // console.log('Заменяю', generatedColor);
      generatedColor = generatedColor + ('1'.repeat(6-generatedColor.length)) // repeat function for completing a string of up to 6 characters
    // console.log(' на', generatedColor);
  }
  if (generatedColor2.length <= 5 ) { // if hex2 < 5
    // console.log('Заменяю', generatedColor2);
      generatedColor2 = generatedColor2 + ('1'.repeat(6-generatedColor2.length))
    // console.log(' на', generatedColor2);
  }

  if ( // contrast font color
    getContras(generatedColor) === "black" &&
    getContras(generatedColor2) === "black"
  )
    document.documentElement.style.setProperty(`--primary`, "black");
  else document.documentElement.style.setProperty(`--primary`, "white");

  generatedColor = "#" + generatedColor; // adding # symbol
  generatedColor2 = "#" + generatedColor2;
  refactorText(generatedColor, generatedColor2); // printing colors on the page

  document.documentElement.style.setProperty(`--random-color`, generatedColor); // setting vars in css
  document.documentElement.style.setProperty(`--random-color-2`, generatedColor2);
  document.documentElement.style.setProperty(`--degree`, $('.deg_value').val() + 'deg');

  var el = document.createElement("textarea");
  var deg = $('.deg_value').val()
  el.value = `background-image: linear-gradient(${deg}deg, ${generatedColor}, ${generatedColor2});` // Set value (string to be copied)
  // console.log(history)

  count = $('li').length // max history length
  if (count <= 9) {
    $('.history').append(`<li><a>` + ` <i style="background-image: linear-gradient(${-deg}deg, ${generatedColor}, ${generatedColor2});"></i> ` + el.value + '</a></li>')
  } else {
    $('li:first-child').remove();
    $('.history').append(`<li>` + ` <i style="background-image: linear-gradient(${-deg}deg, ${generatedColor}, ${generatedColor2});"></i> ` + el.value + '</li>')
  }

  $('li').click(function(){ // interacting with history
    bg = $(this).find('i').css('background-image')
    
    $('body').css('background-image', bg) // setting background

    li_el = $(this)
    val = li_el.text()
    // console.log(val);
    if (val.length == 61) { // if degree value.length == 2 digits
      el_deg = val.slice(36, 38) // degree value
      el_clr1 = val.slice(43,50) // color1 value
      el_clr2 = val.slice(52, 59) // color2 value
      // console.log('DEG:' + el_deg, ' CLR1:', el_clr1 + ' CLR2:', el_clr2);
    } else if (val.length == 62) { // if degree value.length == 3 digits
      el_deg = val.slice(36, 39)
      el_clr1 = val.slice(44,51)
      el_clr2 = val.slice(53, 60)
      // console.log('DEG:' + el_deg, ' CLR1:', el_clr1 + ' CLR2:', el_clr2);
    }

    generatedColor = el_clr1
    generatedColor2 = el_clr2
    refactorText(generatedColor, generatedColor2) // printing color codes on the page
    $('.deg_value').val(el_deg)

  })
}


function refactorText(text, text2) {
  let element = document.querySelector("#random-color");
  element.textContent = text;
  let element2 = document.querySelector("#random-color-2");
  element2.textContent = text2;
}

function copyColors() {
  var el = document.createElement("textarea");
  var deg = $('.deg_value').val()
  el.value = `background-image: linear-gradient(${deg}deg, ${generatedColor}, ${generatedColor2});`; // Set value (string to be copied)

  el.setAttribute("readonly", ""); // Set non-editable to avoid focus and move outside of view
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  alert("Color was successfully copied!");
}

// It takes the hex value and compares it to the value halfway between
// pure black and pure white. If the hex value is less than half, meaning it is
// on the darker side of the spectrum, it returns white as the text color. If
// the result is greater than half, it’s on the lighter side of the spectrum and returns black as the text value.

function getContras(hexcolor) {
  return parseInt(hexcolor, 16) > 0xffffff / 2 ? "black" : "white";
}


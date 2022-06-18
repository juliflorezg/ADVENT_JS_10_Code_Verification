const $codeForm = document.getElementById('codeForm')
const CODE = '1234' // this should be obtained from a third party provider

function getCode() {
  let code = ''
  const $inputs = Array.from(document.querySelectorAll("input[type='text']"))

  $inputs.forEach(input => (code += input.value))
  console.log(code)
  return code
}

function verifyCode(code){
  if(code === CODE){
    console.log("Yes! that's correct");
    return true
  }else{
    console.log("Sorry, try again");
    return false
  }
}

async function getCodeFromClipboardAndPaste() {
  const $inputs = Array.from($codeForm.querySelectorAll("input[type='text']"))
  const text = await navigator.clipboard.readText()
  const textAsCharacters = text.split('')
  let code = ''
  console.log(text);
  console.log(textAsCharacters);
  $inputs.forEach((input, index) =>{
    input.value = textAsCharacters[index]
    code += input.value
  })

  verifyCode(code)
}

$codeForm.addEventListener('keyup', e => {
  if (e.ctrlKey && e.key.toLowerCase() === 'v') {
    console.log('paste code!!!')
    getCodeFromClipboardAndPaste()
    return
  }

  if(e.key === 'Control') return
  
  if (e.target.matches("input[type='text']") && !( e.target.matches("input[type='text']:last-of-type:last-of-type"))) {
    console.log(e.target)
    e.target.value = e.key
    // e.target.nextElementSibling.value = ''
    if (e.target.nextElementSibling !== null)
      e.target.nextElementSibling.focus()
  } else if (e.target.matches("input[type='text']:last-of-type")) {
    console.log(e.target)
    e.target.value = e.key
    
    let code = getCode()
    verifyCode(code)
  }
})

//handle ctrl+v for pasting the code we've got on clipboard
document.addEventListener('keydown', e =>{
  if(e.ctrlKey && e.key.toLowerCase() === 'v'){
    console.log('paste code!!!');
    getCodeFromClipboardAndPaste()
  }
})

setTimeout(() => {
  console.clear()
  console.log(document.activeElement)
}, 500);

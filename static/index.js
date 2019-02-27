[].forEach.call(document.querySelectorAll('p'), paragraph => {
  let sentences = paragraph.innerHTML.split('<br>')
  paragraph.innerHTML = `<span>${sentences.join('</span><br><span>')}</span>`
})

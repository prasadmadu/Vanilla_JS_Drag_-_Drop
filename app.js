const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElemet = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    console.log(afterElemet)
    if (afterElemet == null){
      container.appendChild(draggable)
    }else{
      container.insertBefore(draggable, afterElemet)
    }
  })
})

function getDragAfterElement(container, y){
  const draggableElemments = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElemments.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height/2
    if (offset < 0 && closest.offset){
      return{
        offset : offset, element: child
      }
    } else {
        return closest
      }
  }, { offset:Number.NEGATIVE_INFINITY }).element
}
// helper function to hide tooltip window
window.addEventListener('click', (e)=>{
    

    const tooltipText = document.getElementById('tooltipText');
    
    if(tooltipText){
        if(tooltipText.style.visibility === 'visible'){
            tooltipText.style.visibility = 'hidden';
        }
    }
    e.stopPropagation();
})
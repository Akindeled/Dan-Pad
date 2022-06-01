console.log("Akindele Daniel || Notepad")
// The work to do is to add functionality to the search button

function home(){
    document.querySelector('section.note_input').style.display = 'none'
    document.querySelector('section.note_list').style.display = 'block' 
}

function del_Notes(){
    // console.log(document.querySelector('.title').value);
    // console.log(document.querySelector('.noteArea').value);
    // localStorage.getItem('alltitle')
    // console.log(localStorage.getItem('alltitle'))
    // console.log(localStorage.getItem('alltitle').split(','))
    const mytitles = localStorage.getItem('alltitle').split(',');
    console.log(document.querySelector('.title').value)
    mytitles.forEach(title => {
        if(title === document.querySelector('.title').value){
            delete mytitles[title]
            console.log(mytitles)
            localStorage.setItem('alltitle',mytitles)
            localStorage.removeItem(title)
            home()
            location.reload()
        }
        else{
            console.log(title)
        }
    });
}

function displayTitle(){
    // alert("I want to display to home...")
    if(localStorage.getItem('alltitle')){
        var alltitle = localStorage.getItem('alltitle').split(',');
        alltitle.forEach(title => {
                if(localStorage.getItem(title)){
                    li = document.createElement('li');
                    li.appendChild(document.createTextNode(title))
                    document.querySelector('#items_List').appendChild(li);
                    const nodis = document.querySelector('.clrbtn')
                    nodis.style.display = 'block'
                }
        });
    }
}

function Daniel_alert(message){
    msgContainer = document.createElement('p')
    msgContainer.className = 'Daniel_alert'
    msgContainer.innerHTML = message;
}

function clearAll(){
    localStorage.removeItem('alltitle');
    location.reload()
}
 

function donebtn_one(){
       // alert('Alright....So where do we go from here...')
       let notes,title;
       notes = document.querySelector('.noteArea').value;
       title = document.querySelector('.title').value
       if(notes && title){
               if(localStorage.getItem('alltitle')){
                   var alltitle = localStorage.getItem('alltitle').split(',');//To get from localStorage and convert to an array.
                   alltitle.push(title);//Update with the new title
                   localStorage.setItem('alltitle',alltitle)//To store data after it has been updated
               }
               else{
                   localStorage.setItem('alltitle',title) 
                //    var alltitle = localStorage.getItem('alltitle').split(',');//To get from localStorage and convert to an array.
               }
               // After we are sure that alltitle exist then we begin to work with it
                   displayTitle ()//Run the display function to always update the list...
                   
              // For all notes and their storage...
                   localStorage.setItem(title,notes);
                   home();//to take us back home...
                   notes = '';
                   title = ''; 
                   window.location.reload()
       }
       else{
           let message = 'Oops no notes here Man...'
           alert(message);
           // Daniel_alert(message);
       }
}


document.addEventListener("DOMContentLoaded",function(){
    // To display list of notes stored on localstorage
    displayTitle();
    // Logic condition for display of search box
    if(document.querySelectorAll('li').length === 0){
        document.querySelector('#search').style.display = 'none';
        document.querySelector('.noList').style.display = 'block'
    }
    else{
        document.querySelector('#search').style.display = 'block';
    }

    // Triggering the add note button
    document.querySelector('button.addbtn').addEventListener('click',function(){
        console.log("Yes it is working..")
        document.querySelector('section.note_list').style.display = 'none'
        document.querySelector('section.note_input').style.display = 'block'
    });

    // Adding functionality to the button iin thr note_list section

    const donebtn = document.querySelector('button#done');
    const cancelbtn = document.querySelector('button#cancel');
    
    donebtn.addEventListener('click',donebtn_one);
    cancelbtn.addEventListener('click',home)


    const allListTags = document.querySelectorAll('li');
    allListTags.forEach(Listtags => {
        // console.log(Listtags)
        Listtags.addEventListener('click',function(e){
            if(localStorage.getItem(e.target.innerHTML)){
              
                document.querySelector('section.note_list').style.display = 'none';
                document.querySelector('section.note_input').style.display = 'block';

                const tit = document.querySelector('.title')
                const note = document.querySelector('.noteArea')
                tit.value = e.target.innerHTML
                note.value = localStorage.getItem(e.target.innerHTML)
         
                const donebtn = document.querySelector("#done");
                donebtn.removeEventListener('click',donebtn_one)
                donebtn.addEventListener('click',function(){
                    // Assumption that changes has been made to the title and notes...
                    // Let us re grab the DOM content
                    // console.log(document.querySelector('.noteArea').value)
                    localStorage.setItem(e.target.innerHTML,document.querySelector('.noteArea').value)
                    // displayTitle()
                    home()
                    location.reload()
                })
                // How do I display the 
            }
            else{
                alert("Sorry! it wasn't saved")
                // localStorage.remove(e.target.innerHTML)
            }
        })
    });
});
// For now...I want to say PEACE...

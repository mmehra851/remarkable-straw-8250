let passwordIcon=document.querySelectorAll('.icon-eye-slash');
let passwordText=document.querySelectorAll('.inp-pass');
let formData=document.getElementById('formData');

// let name1=formData.firstName.value;
// let name2=formData.lastName.value;
// let pass1=formData.pass1.value;
// let pass2=formData.pass2.value;
// let emailData=formData.email.value;
// password visibility program

passwordIcon.forEach(icon=>
icon.addEventListener('click',()=>{
    passwordText.forEach(passwordInput=>{
    if(passwordInput.type==='password'){
        passwordInput.type ='text';
        icon.classList.replace('uil-eye-slash','uil-eye');
        // .replace('uil-eye-slash','uil-eye')
    }else{
        passwordInput.type='password'; 
        icon.classList.replace('uil-eye','uil-eye-slash');
    }
})
})
)
   

// capturing user data

let usersData=JSON.parse(localStorage.getItem('users'))||[];

formData.addEventListener('submit',(event)=>{
    event.preventDefault();

    let user={
        name:`${formData.firstName.value} ${formData.lastName.value}`,
        email:formData.email.value,
        password:formData.pass2.value
    }

        if(verifyUsers(user.email,usersData)){
            // alert('Already have an account please login')
            Swal.fire(
                '',
                'Already Have an account PLEASE LOGIN',
                'question'
              )
        }else{
            usersData.push(user);
            localStorage.setItem('users',JSON.stringify(usersData));
            // alert('Account created successfully')
            Swal.fire('Account created successfully');
            setTimeout(()=>{
                window.location.href='login.html';
            },1000)
            
        }
    })
   
function verifyUsers(email,arr){
    for(let i=0;i<arr.length;i++){
        if(email===arr[i].email){
          return true;
        }
    }
 return false;
}

// let name1=formData.firstName.value;
// let name2=formData.lastName.value;
// let pass1=formData.pass1.value;
// let pass2=formData.pass2.value;
// let emailData=formData.email.value;

// formData.addEventListener('submit',(event)=>{
//     event.preventDefault();
//     validateform();
//     function validateform(){
//         let flag=true;
//         clearErrors();
//         if(name1.length<3){
//             popupError('pfirstName','!Length of first name is too short');
//             flag=false;
//         }
//         if(name2.length<3){
//             popupError('plastName','!Length of last name is too short');
//             flag=false;
//         }
//         if(pass1.length<6){
//             popupError('ppass1','!Length of password should be less than 6 characters');
//             flag=false;
//         }
//         if(pass1 !==pass2){
//             popupError('ppass2','! Passwords are not same');
//             flag=false;
//         }
//         if(emailData.length>14){
//             popupError('pemail','!Email length should be less than 15 characters');
//             flag=false;
//         }
//         if(verifyUsers(user.email,usersData)){
//             alert('Already have an account please login');
//             flag=false;
//         }
//         if(!verifyUsers(user.email,usersData)){
//         usersData.push(user);

//                 localStorage.setItem('users',JSON.stringify(usersData));
//             alert('Account created successfully');
//             window.location.href='login.html';
//         }
//         }       // return flag;
//     })
// function validateform(){
//     let flag=true;
//     clearErrors();
//     if(name1.length<3){
//         popupError('firstName','!Length of first name is too short');
//         flag=false;
//         event.preventDefault()
//     }
//     if(name2.length<3){
//         popupError('lastName','!Length of last name is too short');
//         flag=false;
//     }
//     if(pass1.length<6){
//         popupError('pass1','!Length of password should be less than 6 characters');
//         flag=false;
//     }
//     if(pass1 !==pass2){
//         popupError('pass2','! Passwords are not same');
//         flag=false;
//     }
//     if(emailData.length>14){
//         popupError('email','!Email length should be less than 15 characters');
//         flag=false;
//     }
//     if(verifyUsers(user.email,usersData)){
//         alert('Already have an account please login');
//         flag=false;
//     }
//             usersData.push(user);
//         localStorage.setItem('users',JSON.stringify(usersData));
//         alert('Account created successfully');
//         // window.location.href='login.html';

//         return flag;

//   }
    


// function clearErrors(){
//     let errors=document.getElementsByClassName('error');
//     for (let item of errors){
//         item.innerHTML='';
//     }
// }


// function popupError(id,message){
//     element = document.getElementById(id);
//     element.getElementsByClassName('error')[0].innerHTML = message;
// }
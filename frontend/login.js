let passwordIcon=document.querySelector('.icon-eye-slash');
let passwordInput=document.getElementById('inp-pass');
let formData=document.getElementById('formData');
let email=document.getElementById('inp-email');
let password=document.getElementById('inp-pass');


// show hide password
passwordIcon.addEventListener('click',()=>{
    if(passwordInput.type==='password'){
        passwordInput.type ='text';
        passwordIcon.classList.replace('uil-eye-slash','uil-eye');
        // .replace('uil-eye-slash','uil-eye')
    }else{
        passwordInput.type='password'; 
        passwordIcon.classList.replace('uil-eye','uil-eye-slash');
    }
})

// verifying userdata
let loginStatus=localStorage.getItem('loginStatus')
if(loginStatus===undefined){
  loginStatus='false';
}
let usersData=JSON.parse(localStorage.getItem('users'))||[];
formData.addEventListener('submit',(event)=>{
    event.preventDefault();
// let use=verifyUsers(email.value,password.value,usersData);

if(email.value==='admin@gmail.com'&&password.value==='admin'){
    // alert('Admin login successful');
    Swal.fire({
        title: 'Admin login successful',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      setTimeout(()=>{
        window.location.href='adminDashboard.html';
      },2000)
   
}else if(verifyUsers(email.value,password.value,usersData)){
    localStorage.setItem('loginStatus','true');

//  alert('');

 Swal.fire({
    title: 'Login Successful',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })

 let loginStatus=localStorage.getItem('loginStatus');
localStorage.setItem('loginStatus','true');
  setTimeout(()=>{
    window.location.href='Women.html';
  },2000)
 
}else{
    // alert('invalid credintials')
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Credintials!!',
        footer: '<a href=""></a>'
      })
}
})

 var userName;
function verifyUsers(email,password,arr){
    let flag=false;
    for(let i=0;i<arr.length;i++){
       
        if(email===arr[i].email&&password===arr[i].password){
        (userName=arr[i].name);
          localStorage.setItem('userName',userName);
         flag=true;
          break;
        }
    }
if(flag){
    return true
}else{
    return false;
}
    
}

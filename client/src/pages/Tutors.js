import React from 'react'

export const Tutors = () => {
    return (
        <div>
             <h1>Tutors</h1>
         <div class="w-100" class="d-flex justify-content-center">
         <div class="w-15 p-3"   ></div>
           
            <div class="card" >
  <img src="/img/tutorpic.png" class="card-img-top" alt="Tutor" height="400"/>
  <div class="card-body">
    <h5 class="card-title">Tutor Bio</h5>
    <p class="card-text">Information regarding the tutors skills and education</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Classes Offered</li>
    <li class="list-group-item">Availability</li>
    <li class="list-group-item">Contacts</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">EMAIL</a>
    <a href="#" class="card-link">Phone</a>
  </div>
</div>
</div>


   
        </div>
    )
}

export default Tutors;
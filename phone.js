const loadPhone = async(searchText,isShowAll) =>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones=data.data;
    displayPhones(phones,isShowAll)
}

const displayPhones = (phones,isShowAll) =>{
    // 1.catch the id
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before adding new card
    phoneContainer.textContent= ''

    // display show all button if there are more than 12 button
    const showAllContainer =document.getElementById('show-all-container')
    if(phones.length>12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
      showAllContainer.classList.add('hidden')
    }

    // display only first 12 phones if not  show all
    if(!isShowAll){
        phones =phones.slice(0,12)
    }


    phones.forEach(phone =>{
        //console.log(phone)
        // 2.create a div
        const phoneCard=document.createElement('div')
        phoneCard.classList=`card p-4 bg-gray-100`
        // 3.set inner html
        phoneCard.innerHTML=`
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-accent">Show Details</button>
              </div>
            </div>
        `
        // 4.append child
        phoneContainer.appendChild(phoneCard)
    });
    // hide Loading spinner
    toggleLoadingSpinner(false)
}

// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true)
    const searchField=document.getElementById('search-field')
    const searchText=searchField.value;
    loadPhone(searchText,isShowAll)

}

const toggleLoadingSpinner =(isLoading)=>{
   const loadingSpinner=document.getElementById('loading-spinner')
   if(isLoading){
      loadingSpinner.classList.remove('hidden')
   }
   else{
      loadingSpinner.classList.add('hidden')
   }
}

// handle show all
const handleShowAll=()=>{
    handleSearch(true);
}

// card button show details
const handleShowDetail = async(id) =>{
   console.log(id)
   const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data = await res.json();
   console.log(data);
   const phone=data.data
   showPhoneDetails(phone)
}

const showPhoneDetails=(phone)=>{
    console.log(phone)
    const phoneName=document.getElementById('phone-name');
    phoneName.innerText=phone.name;
    const showDetailsContainer=document.getElementById('show-details-container')
    showDetailsContainer.innerHTML=`
        <img class="mx-auto" src="${phone.image}" alt="">
        <p class="my-2"><span class="text-xl text-black">storage: </span>${phone?.mainFeatures?.storage}</p>
        <p class="my-2"><span class="text-xl text-black">GPS: </span>${phone?.others?.GPS || 'No GPS available'}</p>
        <p class="my-2"><span class="text-xl text-black">Display: </span>${phone?.mainFeatures?.displaySize
        }</p>
    `
    show_details_modal.showModal()
}




//displayPhones('iphone')
loadPhone('iphone',true);





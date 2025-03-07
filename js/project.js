const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
        const data = await res.json();
        createCategories(data.categories);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const createCategories = (categories) => {
    const container = document.getElementById('btn-container');

    for (const item of categories) {
        const creatediv = document.createElement('div');
        creatediv.innerHTML = `
            <button onclick="filterPets('${item.category}')" id="pet-${item.id}" class="text-2xl font-bold btn px-8 py-5 hover:rounded-2xl hover:bg-gray-300">
                <img class="h-10 w-10" src="${item.category_icon}" alt="Category Icon">
                ${item.category}
            </button>
        `;
        container.appendChild(creatediv);
    }
};

const loadCard = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const data = await res.json();
        showAllCard(data.pets);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const loadDetails=async(id)=>{
    
    const res=await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    
    const data=await res.json();

    displayDetails(data.petData)
  
  }

const displayDetails=(video)=>{
    

    
    const detailContainer=document.getElementById("modal-content");
    
    detailContainer.innerHTML=
    `      
           <a href="#"><img class="rounded-t-lg h-full w-full object-center" src="${video.image}" alt="" />
                    </a>
                    
                    <div class="p-5 ">
                        <h1 class="font-bold text-2xl">${video.pet_name}</h1>
                        <div class="grid grid-cols-2 gap-3">
                        <div class="flex">
                            <img class="h-7 w-7" src="https://img.icons8.com/?size=100&id=WMFu0wNVuAX1&format=png&color=000000">
                            <p class="font-bold">Breed: ${video.breed}</p>
                        </div>
                        <div class="flex">
                            <img class="h-7 w-7" src="https://img.icons8.com/?size=100&id=uoyCtvkEyY6A&format=png&color=000000">
                            <p class="font-bold">Birth: ${video.date_of_birth}</p>
                        </div>
                        <div class="flex">
                            <img class="h-7 w-7" src="https://img.icons8.com/?size=100&id=85801&format=png&color=000000">
                            <p class="font-bold">Price: ${video.price}</p>
                        </div>
                    </div>
                    <h1 class="font-bold text-xl my-2">Details Information</h1>
                    <p>${video.pet_details}</p>
    `
    
    document.getElementById("showModal").click();
    
    
    
    }

    
const hiddenItem=async(id)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    
    const data=await res.json();

    const divCatch=document.getElementById(`dynamic-${id}`);
    const selectContainer=document.getElementById('right-grid');
    const divbana=document.createElement('div');
    
    divbana.innerHTML=
    `
    <img class="p-1 " src="${data.petData.image}">

    `
    divbana.classList.add('p-2')
    selectContainer.appendChild(divbana);
    divCatch.classList.add('hidden')

}




const showAllCard = (pets) => {
    const cardContainer = document.getElementById('img-container');
    cardContainer.innerHTML = ''; 

    if (pets.length === 0) {
        
        cardContainer.innerHTML = `
            <div class=" flex flex-col item object-center text-2xl font-bold text-gray-500 ">
               <img class="h-full w-full " src="./images/error.webp" alt="">
               <h1>No Information Available</h1>
               <p> It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        `;
    } else {
       
        for (const item of pets) {
            
            const makeDiv = document.createElement('div');
            makeDiv.setAttribute("id", `dynamic-${item.petId}`);
            makeDiv.innerHTML = `
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="rounded-t-lg h-full w-full object-center" src="${item.image}" alt="" />
                    </a>
                    <div class="p-5">
                        <h1 class="font-bold text-2xl">${item.pet_name}</h1>
                        <div class="flex">
                            <img class="h-7 w-7" src="https://img.icons8.com/?size=100&id=WMFu0wNVuAX1&format=png&color=000000">
                            <p class="font-bold">Breed: ${item.breed}</p>
                        </div>
                        <div class="flex">
                            <img class="h-7 w-7" src="https://img.icons8.com/?size=100&id=uoyCtvkEyY6A&format=png&color=000000">
                            <p class="font-bold">Birth: ${item.date_of_birth}</p>
                        </div>
                        <div class="flex">
                            <img class="h-7 w-7" src="https://img.icons8.com/?size=100&id=85801&format=png&color=000000">
                            <p class="font-bold">Price: ${item.price}</p>
                        </div>

                        <div class="flex justify-between mt-1">
                         <div> <img class="h-10 w-10" src="https://img.icons8.com/?size=100&id=88589&format=png&color=000000" ></div>
                         <div><button onclick="hiddenItem('${item.petId}')" id="adapt-${item.petId}" class="text-[#0E7A81] text-xl font-bold bg-white px-2 py-1 border rounded-xl">Adapt</button></div>
                         <div><button onclick="loadDetails('${item.petId}')"  id="details-${item.petId}" class="text-[#0E7A81] text-xl font-bold bg-white px-2 py-1 border rounded-xl"">Details</button></div>
                       </div>
                        
                    </div>
                </div>
            `;
            cardContainer.appendChild(makeDiv);
        }
    }
};




const filterPets = async (category) => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const data = await res.json();
        const filteredPets = data.pets.filter(pet => pet.category === category);
        showAllCard(filteredPets); 
    } catch (error) {
        console.error("Error filtering pets:", error);
    }
};


loadCategories();
loadCard();



const loadCategories= async () => {
    try {
        const res = await fetch(' https://openapi.programming-hero.com/api/peddy/categories');
        const data = await res.json();
        createCategories(data.categories);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};



const createCategories=(para)=>{
    const contain=document.getElementById('btn-container')

    for (const item of para) {
        const creatediv = document.createElement('div');
      
        creatediv.innerHTML = `
           
            <button onclick="loadCard()" id="pet-${item.id}"  class="text-2xl font-bold btn px-8 py-5  hover:rounded-2xl hover:bg-gray-300">
             <img class="h-10 w-10" src="${item.category_icon}" alt="Category Icon">
            ${item.category}</button>
        `;

        contain.appendChild(creatediv);
        
    }
}
const loadCard=async()=>
{
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const data = await res.json();
        
        showAllCard(data);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
const showAllCard=(card)=>{

    const cardContainer=document.getElementById('img-container');
    for(const item of card.pets){
        
        const makeDiv=document.createElement('div');
        
        
    


        makeDiv.innerHTML=
        `
        

<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg h-full w-full object-center" src="${item.image}" alt="" />
    </a>
    <div class="p-5">
       <h1 class="font-bold text-2xl">${item.pet_name}</h1>

       <div class="flex">
        <img class="h-7 w-7" src=" https://img.icons8.com/?size=100&id=WMFu0wNVuAX1&format=png&color=000000">
        <p class=" font-bold">Breed: ${item.breed}</p>
       </div>
       
       <div class="flex">
        <img class="h-7 w-7" src="https://img.icons8.com/?size=100&id=uoyCtvkEyY6A&format=png&color=000000">
       <p class=" font-bold">Birth: ${item.date_of_birth}</p>
       
       </div>
       <div class="flex">
        <img class="h-7 w-7" src="https://img.icons8.com/?size=100&id=85801&format=png&color=000000">
       <p class=" font-bold">Price: ${item.price}</p>
       
       </div>
      
    </div>
</div>

        
        `
        cardContainer.appendChild(makeDiv);
    }
}
loadCard();











loadCategories();
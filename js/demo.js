const demoLoadCard=async()=>
    {
        try {
            const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
            const data = await res.json();
            
            demoShow(data);
    
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    const demoShow=(data)=>{
        console.log(data.pets[0].category);
    }

demoLoadCard();
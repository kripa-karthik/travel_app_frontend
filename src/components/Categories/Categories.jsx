import { useEffect, useState } from "react";
import axios from 'axios';
import './Categories.css';
import { useCategory } from "../../context";

export const Categories=()=>{

    const [categories,setCategories]= useState([]);
    const [numOfCategoriesToShow,setNumOfCategoriesToShow]=useState(0);
    const {hotelCategory,setHotelCategory}=useCategory();

    const handleShowMoreLeftClick=()=>{
        setNumOfCategoriesToShow((prev)=>prev-8);
    }

    const handleShowMoreRightClick=()=>{
        setNumOfCategoriesToShow((prev)=>prev+8);
    }

    const handleCategoryClick=(category)=>{
        setHotelCategory(category);
        localStorage.setItem('hotelCategory', category);

    }

    useEffect(()=>{
        (async()=>{
            try{
                const { data }=await axios.get("https://travelin.cyclic.app/api/category");
                const categoriesToShow=data.slice(
                    numOfCategoriesToShow + 8 > data.length ? data.length-8 : numOfCategoriesToShow,
                    numOfCategoriesToShow > data.length ? data.length : numOfCategoriesToShow+8);
                setCategories(categoriesToShow); 
            }catch(err){
                console.log(err)
            }
        })()
    },[numOfCategoriesToShow])

    return(
        <section className="categories d-flex align-center gap-large cursor-pointer">
            {
                numOfCategoriesToShow >=8 && (
                <button className="button btn-category btn-left fixed cursor-pointer" 
                onClick={handleShowMoreLeftClick}>
                    <span className="material-icons-outlined">navigate_before</span>
                </button>)
            }
            {
                categories && categories.map(({_id,category})=>(
                    <span key={_id} className={`${category === hotelCategory ? "border-bottom" : ""}`}
                        onClick={()=>handleCategoryClick(category)} >{category}
                    </span>

                ))
            }
            {
                numOfCategoriesToShow-8 < categories.length && (
                    <button className="button btn-category btn-right fixed cursor-pointer"
                     onClick={handleShowMoreRightClick}>
                    <span className="material-icons-outlined">navigate_next</span>
                    </button>
                )
            }
            
        </section>
    )

}
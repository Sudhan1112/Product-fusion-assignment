import React, {useState, useEffect} from "react";
import DropdownSelector from "./DropdownSelector"
import WeightInput from "./WeightInput" 
import {validateWeight} from "../utils/validateWeight"

function ChildTask({child, siblings, onUpdate, onDelete, parentUnit}) {
    const [title, setTitle] = useState(child.title);
    const [unit, setUnit] = useState(child.unit || parentUnit);
    const [weight, setWeight] = useState(child.weight);

    useEffect(()=> {
        if(parentUnit && parentUnit !== unit) {
            setUnit(parentUnit);
        }
    }, [parentUnit])

    useEffect(() => {
        onUpdate({...child, title, unit, weight});
    }, [title, unit, weight]);

    const handleWeightChange = (newWeight) => {
        if (validateWeight(newWeight, siblings, child.id)) {
            setWeight(newWeight);
            onUpdate({...child, title, unit, weight: newWeight});
        }
    }
    return(
        <>
        <div className="flex items-center gap-2 mb-2 pl-4 py-1 hover:bg-gray-50 rounded-md group">
            <input type="text" placeholder= "Sub-activity Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 p-2 rounded-md flex-1"/>

            <div className="text-gray-700">{unit || parentUnit || "No unit"}</div>
            <WeightInput value={weight} onChange={handleWeightChange} siblings={siblings} currentId={child.id} />
            
            <button 
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 p-1"
          title="Delete Activity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        </div>
        </>
    )
}      

export default ChildTask;
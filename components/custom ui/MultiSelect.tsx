import React, { useState } from 'react';
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  collections,
  value,
  onChange,
  onRemove,
}) => {
 
  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }

  const selectables = collections.filter((collection) => !selected.includes(collection)); 

  return (
    <div>
      
     <select 
  onChange={(e) => onChange(e.target.value)}
  style={{
    padding: '9px',
    borderRadius: '6px',
    border: '1px solid #e1e1e1',
    width: '100%',
    color: 'grey', 
  }}
>
  <option value="">Select Collection</option>
  {selectables.map((collection) => (
    <option 
      key={collection._id} 
      value={collection._id}
      style={{ padding: '8px' }}
    >
      {collection.title}
    </option>
  ))}
</select>
{selected.map(collection => (
        <Badge className="bg-grey-1 text-white" style={{ marginTop:'4px'}} key={collection._id}>
          {collection.title}
          <button  className="ml-1 rounded-full outline-none hover:bg-red-1" onClick={() => onRemove(collection._id)}>
            <X className="h-3 w-3"  />
          </button>
        </Badge>
      ))}
    </div>
  );
};

export default MultiSelect;
